import { z } from 'zod';

// User validation schemas
export const userRegisterSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  full_name: z.string().min(2, 'Full name must be at least 2 characters'),
  phone: z.string().optional(),
  role: z.enum(['client', 'provider', 'admin']).optional(),
});

export const userLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Provider validation schemas
export const providerCreateSchema = z.object({
  business_name: z.string().min(2, 'Business name must be at least 2 characters').optional(),
  description: z.string().max(2000, 'Description must be less than 2000 characters').optional(),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postal_code: z.string().optional(),
  country: z.string().optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
});

// Service validation schemas
export const serviceCreateSchema = z.object({
  category_id: z.string().uuid('Invalid category ID'),
  title: z.string().min(5, 'Title must be at least 5 characters').max(255),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  short_description: z.string().max(500).optional(),
  price: z.number().min(0).optional(),
  price_type: z.enum(['fixed', 'hourly', 'daily', 'custom']).optional(),
  duration_minutes: z.number().min(1).optional(),
});

export const serviceUpdateSchema = serviceCreateSchema.partial();

// Booking validation schemas
export const bookingCreateSchema = z.object({
  service_id: z.string().uuid('Invalid service ID'),
  booking_date: z.string().datetime('Invalid date format'),
  duration_minutes: z.number().min(1).optional(),
  notes: z.string().max(1000).optional(),
});

// Review validation schemas
export const reviewCreateSchema = z.object({
  service_id: z.string().uuid('Invalid service ID'),
  booking_id: z.string().uuid('Invalid booking ID').optional(),
  rating: z.number().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
  comment: z.string().max(2000, 'Comment must be less than 2000 characters').optional(),
});

// Search filters validation
export const searchFiltersSchema = z.object({
  query: z.string().optional(),
  category_id: z.string().uuid().optional(),
  city: z.string().optional(),
  min_price: z.number().min(0).optional(),
  max_price: z.number().min(0).optional(),
  min_rating: z.number().min(0).max(5).optional(),
  verified_only: z.boolean().optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  radius_km: z.number().min(0).optional(),
  sort_by: z.enum(['relevance', 'rating', 'price_asc', 'price_desc', 'newest']).optional(),
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional(),
});

// Helper function to validate data against a schema
export const validate = <T>(schema: z.ZodSchema<T>, data: unknown): {
  success: boolean;
  data?: T;
  errors?: z.ZodError;
} => {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error };
    }
    throw error;
  }
};
