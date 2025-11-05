import { NextRequest } from 'next/server';
import { query } from '@/lib/db/config';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth/jwt';
import { successResponse, errorResponse, handleApiError } from '@/lib/utils/api-response';
import { User } from '@/types';

/**
 * GET /api/auth/me
 * Get current user profile
 */
export async function GET(request: NextRequest) {
  try {
    // Extract and verify token
    const authHeader = request.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader || '');

    if (!token) {
      return errorResponse('Authentication required', 401);
    }

    const payload = verifyToken(token);

    if (!payload) {
      return errorResponse('Invalid or expired token', 401);
    }

    // Get user from database
    const result = await query(
      `SELECT u.id, u.email, u.full_name, u.phone, u.role, u.avatar_url,
              u.email_verified, u.is_active, u.created_at, u.updated_at,
              p.id as provider_id, p.business_name, p.description, p.verified,
              p.average_rating, p.total_reviews
       FROM users u
       LEFT JOIN providers p ON u.id = p.user_id
       WHERE u.id = $1 AND u.is_active = true`,
      [payload.userId]
    );

    if (result.rows.length === 0) {
      return errorResponse('User not found', 404);
    }

    const userData = result.rows[0];

    // Format response
    const user: User & { provider?: any } = {
      id: userData.id,
      email: userData.email,
      full_name: userData.full_name,
      phone: userData.phone,
      role: userData.role,
      avatar_url: userData.avatar_url,
      email_verified: userData.email_verified,
      is_active: userData.is_active,
      created_at: userData.created_at,
      updated_at: userData.updated_at,
    };

    // Add provider info if user is a provider
    if (userData.provider_id) {
      user.provider = {
        id: userData.provider_id,
        business_name: userData.business_name,
        description: userData.description,
        verified: userData.verified,
        average_rating: userData.average_rating,
        total_reviews: userData.total_reviews,
      };
    }

    return successResponse(user, 'User profile retrieved successfully');
  } catch (error) {
    return handleApiError(error);
  }
}
