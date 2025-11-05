import { NextRequest } from 'next/server';
import { query } from '@/lib/db/config';
import { verifyRefreshToken, generateToken, generateRefreshToken } from '@/lib/auth/jwt';
import { successResponse, errorResponse, handleApiError } from '@/lib/utils/api-response';
import { User, AuthResponse } from '@/types';

/**
 * POST /api/auth/refresh
 * Refresh access token using refresh token
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { refresh_token } = body;

    if (!refresh_token) {
      return errorResponse('Refresh token is required', 400);
    }

    // Verify refresh token
    const payload = verifyRefreshToken(refresh_token);

    if (!payload) {
      return errorResponse('Invalid or expired refresh token', 401);
    }

    // Get user from database
    const result = await query(
      `SELECT id, email, full_name, phone, role, avatar_url,
              email_verified, is_active, created_at, updated_at
       FROM users
       WHERE id = $1 AND is_active = true`,
      [payload.userId]
    );

    if (result.rows.length === 0) {
      return errorResponse('User not found or inactive', 404);
    }

    const user = result.rows[0] as User;

    // Generate new tokens
    const token = generateToken(user);
    const newRefreshToken = generateRefreshToken(user);

    const response: AuthResponse = {
      user,
      token,
      refresh_token: newRefreshToken,
    };

    return successResponse(response, 'Token refreshed successfully');
  } catch (error) {
    return handleApiError(error);
  }
}
