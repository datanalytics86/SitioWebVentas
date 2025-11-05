import { NextResponse } from 'next/server';
import { ApiResponse } from '@/types';

/**
 * Create a success response
 */
export const successResponse = <T>(
  data: T,
  message?: string,
  status: number = 200
): NextResponse<ApiResponse<T>> => {
  return NextResponse.json(
    {
      success: true,
      data,
      message,
    },
    { status }
  );
};

/**
 * Create an error response
 */
export const errorResponse = (
  error: string,
  status: number = 400
): NextResponse<ApiResponse> => {
  return NextResponse.json(
    {
      success: false,
      error,
    },
    { status }
  );
};

/**
 * Handle API errors
 */
export const handleApiError = (error: unknown): NextResponse<ApiResponse> => {
  console.error('API Error:', error);

  if (error instanceof Error) {
    return errorResponse(error.message, 500);
  }

  return errorResponse('An unexpected error occurred', 500);
};
