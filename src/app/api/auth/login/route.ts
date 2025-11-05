import { NextRequest } from 'next/server';
import { query } from '@/lib/db/config';
import { verifyPassword } from '@/lib/auth/password';
import { generateToken, generateRefreshToken } from '@/lib/auth/jwt';
import { validate } from '@/lib/validation/schemas';
import { userLoginSchema } from '@/lib/validation/schemas';
import { successResponse, errorResponse, handleApiError } from '@/lib/utils/api-response';
import { User, AuthResponse } from '@/types';

/**
 * POST /api/auth/login
 * Login a user
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = validate(userLoginSchema, body);
    if (!validation.success || !validation.data) {
      return errorResponse(
        validation.errors?.errors[0].message || 'Validation failed',
        400
      );
    }

    const { email, password } = validation.data;

    // Get user with password hash
    const result = await query(
      `SELECT id, email, password_hash, full_name, phone, role, avatar_url,
              email_verified, is_active, created_at, updated_at
       FROM users
       WHERE email = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      return errorResponse('Invalid email or password', 401);
    }

    const userWithPassword = result.rows[0];

    // Check if user is active
    if (!userWithPassword.is_active) {
      return errorResponse('Account is disabled', 403);
    }

    // Verify password
    const isValidPassword = await verifyPassword(
      password,
      userWithPassword.password_hash
    );

    if (!isValidPassword) {
      return errorResponse('Invalid email or password', 401);
    }

    // Remove password_hash from user object
    const { password_hash, ...user } = userWithPassword;

    // Generate tokens
    const token = generateToken(user as User);
    const refreshToken = generateRefreshToken(user as User);

    const response: AuthResponse = {
      user: user as User,
      token,
      refresh_token: refreshToken,
    };

    return successResponse(response, 'Login successful');
  } catch (error) {
    return handleApiError(error);
  }
}
