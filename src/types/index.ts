// User types
export type UserRole = 'client' | 'provider' | 'admin';

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  role: UserRole;
  avatar_url?: string;
  email_verified: boolean;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface UserCreate {
  email: string;
  password: string;
  full_name: string;
  phone?: string;
  role?: UserRole;
}

export interface UserLogin {
  email: string;
  password: string;
}

// Provider types
export interface Provider {
  id: string;
  user_id: string;
  business_name?: string;
  description?: string;
  website?: string;
  address?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country: string;
  latitude?: number;
  longitude?: number;
  verified: boolean;
  average_rating: number;
  total_reviews: number;
  total_bookings: number;
  created_at: Date;
  updated_at: Date;
}

export interface ProviderCreate {
  user_id: string;
  business_name?: string;
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
}

// Category types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  parent_id?: string;
  order_index: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

// Service types
export type ServiceStatus = 'draft' | 'active' | 'paused' | 'archived';
export type PriceType = 'fixed' | 'hourly' | 'daily' | 'custom';

export interface Service {
  id: string;
  provider_id: string;
  category_id: string;
  title: string;
  slug: string;
  description: string;
  short_description?: string;
  price?: number;
  price_type: PriceType;
  duration_minutes?: number;
  status: ServiceStatus;
  featured: boolean;
  views_count: number;
  created_at: Date;
  updated_at: Date;
}

export interface ServiceCreate {
  provider_id: string;
  category_id: string;
  title: string;
  description: string;
  short_description?: string;
  price?: number;
  price_type?: PriceType;
  duration_minutes?: number;
}

export interface ServiceWithDetails extends Service {
  provider: Provider;
  category: Category;
  images: ServiceImage[];
  average_rating?: number;
  total_reviews?: number;
}

// Service Image types
export interface ServiceImage {
  id: string;
  service_id: string;
  url: string;
  alt_text?: string;
  is_primary: boolean;
  order_index: number;
  created_at: Date;
}

// Booking types
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  service_id: string;
  client_id: string;
  provider_id: string;
  booking_date: Date;
  duration_minutes?: number;
  status: BookingStatus;
  total_amount?: number;
  notes?: string;
  created_at: Date;
  updated_at: Date;
}

export interface BookingCreate {
  service_id: string;
  client_id: string;
  booking_date: Date;
  duration_minutes?: number;
  notes?: string;
}

// Review types
export interface Review {
  id: string;
  service_id: string;
  booking_id?: string;
  user_id: string;
  provider_id: string;
  rating: number;
  comment?: string;
  response?: string;
  response_date?: Date;
  is_verified: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface ReviewCreate {
  service_id: string;
  booking_id?: string;
  user_id: string;
  provider_id: string;
  rating: number;
  comment?: string;
}

// Search and Filter types
export interface SearchFilters {
  query?: string;
  category_id?: string;
  city?: string;
  min_price?: number;
  max_price?: number;
  min_rating?: number;
  verified_only?: boolean;
  latitude?: number;
  longitude?: number;
  radius_km?: number;
  sort_by?: 'relevance' | 'rating' | 'price_asc' | 'price_desc' | 'newest';
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface AuthResponse {
  user: Omit<User, 'password_hash'>;
  token: string;
  refresh_token: string;
}
