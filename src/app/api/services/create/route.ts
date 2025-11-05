import { NextRequest } from 'next/server';
import { query } from '@/lib/db/config';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth/jwt';
import { validate } from '@/lib/validation/schemas';
import { serviceCreateSchema } from '@/lib/validation/schemas';
import { slugify, generateUniqueSlug } from '@/lib/utils/slugify';
import { successResponse, errorResponse, handleApiError } from '@/lib/utils/api-response';

/**
 * POST /api/services/create
 * Create a new service (requires authentication as provider)
 */
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader || '');

    if (!token) {
      return errorResponse('Authentication required', 401);
    }

    const payload = verifyToken(token);

    if (!payload || payload.role !== 'provider') {
      return errorResponse('Provider access required', 403);
    }

    // Get provider ID
    const providerResult = await query(
      'SELECT id FROM providers WHERE user_id = $1',
      [payload.userId]
    );

    if (providerResult.rows.length === 0) {
      return errorResponse('Provider profile not found', 404);
    }

    const providerId = providerResult.rows[0].id;

    // Validate input
    const body = await request.json();
    const validation = validate(serviceCreateSchema, body);

    if (!validation.success || !validation.data) {
      return errorResponse(
        validation.errors?.errors[0].message || 'Validation failed',
        400
      );
    }

    const {
      category_id,
      title,
      description,
      short_description,
      price,
      price_type,
      duration_minutes,
    } = validation.data;

    // Verify category exists
    const categoryResult = await query(
      'SELECT id FROM categories WHERE id = $1 AND is_active = true',
      [category_id]
    );

    if (categoryResult.rows.length === 0) {
      return errorResponse('Invalid category', 400);
    }

    // Generate unique slug
    const slug = await generateUniqueSlug(title, async (testSlug) => {
      const result = await query(
        'SELECT id FROM services WHERE provider_id = $1 AND slug = $2',
        [providerId, testSlug]
      );
      return result.rows.length > 0;
    });

    // Insert service
    const result = await query(
      `INSERT INTO services (
        provider_id, category_id, title, slug, description,
        short_description, price, price_type, duration_minutes, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *`,
      [
        providerId,
        category_id,
        title,
        slug,
        description,
        short_description || null,
        price || null,
        price_type || 'fixed',
        duration_minutes || null,
        'draft', // Default to draft status
      ]
    );

    return successResponse(result.rows[0], 'Service created successfully', 201);
  } catch (error) {
    return handleApiError(error);
  }
}
