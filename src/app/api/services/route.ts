import { NextRequest } from 'next/server';
import { query } from '@/lib/db/config';
import { successResponse, handleApiError } from '@/lib/utils/api-response';
import { Service, PaginatedResponse } from '@/types';

/**
 * GET /api/services
 * Get all services with filtering and pagination
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = Math.min(parseInt(searchParams.get('limit') || '20', 10), 100);
    const categoryId = searchParams.get('category_id');
    const providerId = searchParams.get('provider_id');
    const status = searchParams.get('status') || 'active';
    const featured = searchParams.get('featured') === 'true';
    const sortBy = searchParams.get('sort_by') || 'newest';

    const offset = (page - 1) * limit;

    // Build query
    let queryText = `
      SELECT s.*,
             p.business_name, p.verified as provider_verified,
             c.name as category_name, c.slug as category_slug,
             COALESCE(AVG(r.rating), 0) as average_rating,
             COUNT(DISTINCT r.id) as total_reviews
      FROM services s
      JOIN providers p ON s.provider_id = p.id
      JOIN categories c ON s.category_id = c.id
      LEFT JOIN reviews r ON s.id = r.service_id
      WHERE s.status = $1
    `;

    const params: any[] = [status];
    let paramCount = 2;

    if (categoryId) {
      queryText += ` AND s.category_id = $${paramCount}`;
      params.push(categoryId);
      paramCount++;
    }

    if (providerId) {
      queryText += ` AND s.provider_id = $${paramCount}`;
      params.push(providerId);
      paramCount++;
    }

    if (featured) {
      queryText += ` AND s.featured = true`;
    }

    queryText += ` GROUP BY s.id, p.id, p.business_name, p.verified, c.name, c.slug`;

    // Add sorting
    switch (sortBy) {
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
      default:
        queryText += ` ORDER BY s.created_at DESC`;
    }

    queryText += ` LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    params.push(limit, offset);

    // Execute query
    const result = await query(queryText, params);

    // Get total count
    let countQuery = `
      SELECT COUNT(*) as total
      FROM services s
      WHERE s.status = $1
    `;
    const countParams: any[] = [status];
    let countParamNum = 2;

    if (categoryId) {
      countQuery += ` AND s.category_id = $${countParamNum}`;
      countParams.push(categoryId);
      countParamNum++;
    }

    if (providerId) {
      countQuery += ` AND s.provider_id = $${countParamNum}`;
      countParams.push(providerId);
      countParamNum++;
    }

    if (featured) {
      countQuery += ` AND s.featured = true`;
    }

    const countResult = await query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].total, 10);

    const response: PaginatedResponse<Service> = {
      data: result.rows,
      pagination: {
        page,
        limit,
        total,
        total_pages: Math.ceil(total / limit),
      },
    };

    return successResponse(response);
  } catch (error) {
    return handleApiError(error);
  }
}
