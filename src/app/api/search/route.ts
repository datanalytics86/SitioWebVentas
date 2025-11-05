import { NextRequest } from 'next/server';
import { query } from '@/lib/db/config';
import { validate } from '@/lib/validation/schemas';
import { searchFiltersSchema } from '@/lib/validation/schemas';
import { successResponse, errorResponse, handleApiError } from '@/lib/utils/api-response';
import { PaginatedResponse, Service } from '@/types';

/**
 * GET /api/search
 * Advanced search with filters for services
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse query params
    const filters = {
      query: searchParams.get('query') || undefined,
      category_id: searchParams.get('category_id') || undefined,
      city: searchParams.get('city') || undefined,
      min_price: searchParams.get('min_price')
        ? parseFloat(searchParams.get('min_price')!)
        : undefined,
      max_price: searchParams.get('max_price')
        ? parseFloat(searchParams.get('max_price')!)
        : undefined,
      min_rating: searchParams.get('min_rating')
        ? parseFloat(searchParams.get('min_rating')!)
        : undefined,
      verified_only: searchParams.get('verified_only') === 'true',
      latitude: searchParams.get('latitude')
        ? parseFloat(searchParams.get('latitude')!)
        : undefined,
      longitude: searchParams.get('longitude')
        ? parseFloat(searchParams.get('longitude')!)
        : undefined,
      radius_km: searchParams.get('radius_km')
        ? parseFloat(searchParams.get('radius_km')!)
        : undefined,
      sort_by: (searchParams.get('sort_by') as any) || 'relevance',
      page: searchParams.get('page') ? parseInt(searchParams.get('page')!, 10) : 1,
      limit: searchParams.get('limit')
        ? Math.min(parseInt(searchParams.get('limit')!, 10), 100)
        : 20,
    };

    // Validate filters
    const validation = validate(searchFiltersSchema, filters);
    if (!validation.success || !validation.data) {
      return errorResponse(
        validation.errors?.errors[0].message || 'Invalid filters',
        400
      );
    }

    const validFilters = validation.data;
    const offset = ((validFilters.page || 1) - 1) * (validFilters.limit || 20);

    // Build query
    let queryText = `
      SELECT DISTINCT s.*,
             p.business_name, p.verified as provider_verified,
             p.city as provider_city, p.latitude, p.longitude,
             c.name as category_name, c.slug as category_slug,
             COALESCE(AVG(r.rating), 0) as average_rating,
             COUNT(DISTINCT r.id) as total_reviews
    `;

    // Add distance calculation if location provided
    if (validFilters.latitude && validFilters.longitude) {
      queryText += `,
        (6371 * acos(
          cos(radians($${1})) * cos(radians(p.latitude)) *
          cos(radians(p.longitude) - radians($${2})) +
          sin(radians($${1})) * sin(radians(p.latitude))
        )) as distance_km
      `;
    }

    queryText += `
      FROM services s
      JOIN providers p ON s.provider_id = p.id
      JOIN categories c ON s.category_id = c.id
      LEFT JOIN reviews r ON s.id = r.service_id
      WHERE s.status = 'active'
    `;

    const params: any[] = [];
    let paramCount = 1;

    // Add location params first if provided
    if (validFilters.latitude && validFilters.longitude) {
      params.push(validFilters.latitude, validFilters.longitude);
      paramCount += 2;
    }

    // Text search
    if (validFilters.query) {
      queryText += ` AND (
        s.title ILIKE $${paramCount} OR
        s.description ILIKE $${paramCount} OR
        s.short_description ILIKE $${paramCount} OR
        p.business_name ILIKE $${paramCount} OR
        c.name ILIKE $${paramCount}
      )`;
      params.push(`%${validFilters.query}%`);
      paramCount++;
    }

    // Category filter
    if (validFilters.category_id) {
      queryText += ` AND s.category_id = $${paramCount}`;
      params.push(validFilters.category_id);
      paramCount++;
    }

    // City filter
    if (validFilters.city) {
      queryText += ` AND p.city ILIKE $${paramCount}`;
      params.push(`%${validFilters.city}%`);
      paramCount++;
    }

    // Price filters
    if (validFilters.min_price !== undefined) {
      queryText += ` AND s.price >= $${paramCount}`;
      params.push(validFilters.min_price);
      paramCount++;
    }

    if (validFilters.max_price !== undefined) {
      queryText += ` AND s.price <= $${paramCount}`;
      params.push(validFilters.max_price);
      paramCount++;
    }

    // Verified only
    if (validFilters.verified_only) {
      queryText += ` AND p.verified = true`;
    }

    queryText += ` GROUP BY s.id, p.id, p.business_name, p.verified, p.city, p.latitude, p.longitude, c.name, c.slug`;

    // Rating filter (applied after GROUP BY)
    if (validFilters.min_rating !== undefined) {
      queryText += ` HAVING COALESCE(AVG(r.rating), 0) >= ${validFilters.min_rating}`;
    }

    // Distance filter
    if (
      validFilters.latitude &&
      validFilters.longitude &&
      validFilters.radius_km !== undefined
    ) {
      queryText += ` ${
        validFilters.min_rating !== undefined ? 'AND' : 'HAVING'
      } (6371 * acos(
        cos(radians(${validFilters.latitude})) * cos(radians(p.latitude)) *
        cos(radians(p.longitude) - radians(${validFilters.longitude})) +
        sin(radians(${validFilters.latitude})) * sin(radians(p.latitude))
      )) <= ${validFilters.radius_km}`;
    }

    // Sorting
    switch (validFilters.sort_by) {
      case 'rating':
        queryText += ` ORDER BY average_rating DESC, s.created_at DESC`;
        break;
      case 'price_asc':
        queryText += ` ORDER BY s.price ASC NULLS LAST, s.created_at DESC`;
        break;
      case 'price_desc':
        queryText += ` ORDER BY s.price DESC NULLS LAST, s.created_at DESC`;
        break;
      case 'newest':
        queryText += ` ORDER BY s.created_at DESC`;
        break;
      case 'relevance':
      default:
        if (validFilters.latitude && validFilters.longitude) {
          queryText += ` ORDER BY distance_km ASC, average_rating DESC`;
        } else {
          queryText += ` ORDER BY average_rating DESC, s.views_count DESC, s.created_at DESC`;
        }
    }

    queryText += ` LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    params.push(validFilters.limit, offset);

    // Execute search query
    const result = await query(queryText, params);

    // Build count query
    let countQuery = `
      SELECT COUNT(DISTINCT s.id) as total
      FROM services s
      JOIN providers p ON s.provider_id = p.id
      JOIN categories c ON s.category_id = c.id
      LEFT JOIN reviews r ON s.id = r.service_id
      WHERE s.status = 'active'
    `;

    const countParams: any[] = [];
    let countParamNum = 1;

    // Apply same filters for count
    if (validFilters.query) {
      countQuery += ` AND (
        s.title ILIKE $${countParamNum} OR
        s.description ILIKE $${countParamNum} OR
        s.short_description ILIKE $${countParamNum} OR
        p.business_name ILIKE $${countParamNum} OR
        c.name ILIKE $${countParamNum}
      )`;
      countParams.push(`%${validFilters.query}%`);
      countParamNum++;
    }

    if (validFilters.category_id) {
      countQuery += ` AND s.category_id = $${countParamNum}`;
      countParams.push(validFilters.category_id);
      countParamNum++;
    }

    if (validFilters.city) {
      countQuery += ` AND p.city ILIKE $${countParamNum}`;
      countParams.push(`%${validFilters.city}%`);
      countParamNum++;
    }

    if (validFilters.min_price !== undefined) {
      countQuery += ` AND s.price >= $${countParamNum}`;
      countParams.push(validFilters.min_price);
      countParamNum++;
    }

    if (validFilters.max_price !== undefined) {
      countQuery += ` AND s.price <= $${countParamNum}`;
      countParams.push(validFilters.max_price);
      countParamNum++;
    }

    if (validFilters.verified_only) {
      countQuery += ` AND p.verified = true`;
    }

    if (
      validFilters.latitude &&
      validFilters.longitude &&
      validFilters.radius_km !== undefined
    ) {
      countQuery += ` AND (6371 * acos(
        cos(radians(${validFilters.latitude})) * cos(radians(p.latitude)) *
        cos(radians(p.longitude) - radians(${validFilters.longitude})) +
        sin(radians(${validFilters.latitude})) * sin(radians(p.latitude))
      )) <= ${validFilters.radius_km}`;
    }

    const countResult = await query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].total, 10);

    const response: PaginatedResponse<Service> = {
      data: result.rows,
      pagination: {
        page: validFilters.page || 1,
        limit: validFilters.limit || 20,
        total,
        total_pages: Math.ceil(total / (validFilters.limit || 20)),
      },
    };

    return successResponse(response);
  } catch (error) {
    return handleApiError(error);
  }
}
