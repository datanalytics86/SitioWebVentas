import { NextRequest } from 'next/server';
import { query, transaction } from '@/lib/db/config';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth/jwt';
import { validate } from '@/lib/validation/schemas';
import { serviceUpdateSchema } from '@/lib/validation/schemas';
import { successResponse, errorResponse, handleApiError } from '@/lib/utils/api-response';

/**
 * GET /api/services/[id]
 * Get a service by ID with full details
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Get service with provider and category details
    const result = await query(
      `SELECT s.*,
              p.id as provider_id, p.user_id, p.business_name, p.description as provider_description,
              p.address, p.city, p.state, p.postal_code, p.country,
              p.latitude, p.longitude, p.verified as provider_verified,
              p.average_rating as provider_rating, p.total_reviews as provider_total_reviews,
              c.name as category_name, c.slug as category_slug,
              u.full_name as provider_name, u.phone as provider_phone, u.avatar_url as provider_avatar,
              COALESCE(AVG(r.rating), 0) as average_rating,
              COUNT(DISTINCT r.id) as total_reviews
       FROM services s
       JOIN providers p ON s.provider_id = p.id
       JOIN users u ON p.user_id = u.id
       JOIN categories c ON s.category_id = c.id
       LEFT JOIN reviews r ON s.id = r.service_id
       WHERE s.id = $1
       GROUP BY s.id, p.id, p.user_id, p.business_name, p.description,
                p.address, p.city, p.state, p.postal_code, p.country,
                p.latitude, p.longitude, p.verified, p.average_rating, p.total_reviews,
                c.name, c.slug, u.full_name, u.phone, u.avatar_url`,
      [id]
    );

    if (result.rows.length === 0) {
      return errorResponse('Service not found', 404);
    }

    const service = result.rows[0];

    // Get service images
    const imagesResult = await query(
      `SELECT id, service_id, url, alt_text, is_primary, order_index, created_at
       FROM service_images
       WHERE service_id = $1
       ORDER BY is_primary DESC, order_index ASC`,
      [id]
    );

    // Increment views count
    await query(
      'UPDATE services SET views_count = views_count + 1 WHERE id = $1',
      [id]
    );

    const response = {
      ...service,
      images: imagesResult.rows,
    };

    return successResponse(response);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * PATCH /api/services/[id]
 * Update a service (requires authentication as the service owner)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Verify authentication
    const authHeader = request.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader || '');

    if (!token) {
      return errorResponse('Authentication required', 401);
    }

    const payload = verifyToken(token);

    if (!payload) {
      return errorResponse('Invalid token', 401);
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

    // Verify service ownership
    const serviceResult = await query(
      'SELECT provider_id FROM services WHERE id = $1',
      [id]
    );

    if (serviceResult.rows.length === 0) {
      return errorResponse('Service not found', 404);
    }

    if (serviceResult.rows[0].provider_id !== providerId) {
      return errorResponse('You do not have permission to update this service', 403);
    }

    // Validate input
    const body = await request.json();
    const validation = validate(serviceUpdateSchema, body);

    if (!validation.success || !validation.data) {
      return errorResponse(
        validation.errors?.errors[0].message || 'Validation failed',
        400
      );
    }

    const updates = validation.data;

    // Build update query dynamically
    const updateFields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined) {
        updateFields.push(`${key} = $${paramCount}`);
        values.push(value);
        paramCount++;
      }
    });

    if (updateFields.length === 0) {
      return errorResponse('No fields to update', 400);
    }

    values.push(id);

    const updateQuery = `
      UPDATE services
      SET ${updateFields.join(', ')}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $${paramCount}
      RETURNING *
    `;

    const result = await query(updateQuery, values);

    return successResponse(result.rows[0], 'Service updated successfully');
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * DELETE /api/services/[id]
 * Delete a service (requires authentication as the service owner or admin)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Verify authentication
    const authHeader = request.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader || '');

    if (!token) {
      return errorResponse('Authentication required', 401);
    }

    const payload = verifyToken(token);

    if (!payload) {
      return errorResponse('Invalid token', 401);
    }

    // If not admin, verify ownership
    if (payload.role !== 'admin') {
      const providerResult = await query(
        'SELECT id FROM providers WHERE user_id = $1',
        [payload.userId]
      );

      if (providerResult.rows.length === 0) {
        return errorResponse('Provider profile not found', 404);
      }

      const providerId = providerResult.rows[0].id;

      const serviceResult = await query(
        'SELECT provider_id FROM services WHERE id = $1',
        [id]
      );

      if (serviceResult.rows.length === 0) {
        return errorResponse('Service not found', 404);
      }

      if (serviceResult.rows[0].provider_id !== providerId) {
        return errorResponse('You do not have permission to delete this service', 403);
      }
    }

    // Delete service (cascade will handle related records)
    await query('DELETE FROM services WHERE id = $1', [id]);

    return successResponse(null, 'Service deleted successfully');
  } catch (error) {
    return handleApiError(error);
  }
}
