import { NextRequest } from 'next/server';
import { query, transaction } from '@/lib/db/config';
import { hashPassword } from '@/lib/auth/password';
import { generateToken, generateRefreshToken } from '@/lib/auth/jwt';
import { validate } from '@/lib/validation/schemas';
import { userRegisterSchema } from '@/lib/validation/schemas';
import { successResponse, errorResponse, handleApiError } from '@/lib/utils/api-response';
import { User, AuthResponse } from '@/types';

/**
 * POST /api/auth/register
 * Register a new user
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = validate(userRegisterSchema, body);
    if (!validation.success || !validation.data) {
      return errorResponse(
        validation.errors?.errors[0].message || 'Validation failed',
        400
      );
    }

    const { email, password, full_name, phone, role } = validation.data;

    // Check if user already exists
    const existingUser = await query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return errorResponse('Email already registered', 409);
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user and provider profile in a transaction
    const result = await transaction(async (client) => {
      // Insert user
      const userResult = await client.query(
        `INSERT INTO users (email, password_hash, full_name, phone, role)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id, email, full_name, phone, role, avatar_url, email_verified, is_active, created_at, updated_at`,
        [email, passwordHash, full_name, phone || null, role || 'client']
      );

      const user = userResult.rows[0] as User;

      // If user is a provider, create provider profile
      if (user.role === 'provider') {
        await client.query(
          `INSERT INTO providers (user_id) VALUES ($1)`,
          [user.id]
        );
      }

      return user;
    });

    // Generate tokens
    const token = generateToken(result);
    const refreshToken = generateRefreshToken(result);

    const response: AuthResponse = {
      user: result,
      token,
      refresh_token: refreshToken,
    };

    return successResponse(response, 'User registered successfully', 201);
  } catch (error) {
    return handleApiError(error);
  }
}
