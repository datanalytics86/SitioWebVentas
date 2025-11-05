'use client';

import Link from 'next/link';
import Image from 'next/image';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { ServiceWithDetails } from '@/types';

interface ServiceCardProps {
  service: Partial<ServiceWithDetails>;
  onFavoriteClick?: () => void;
  isFavorite?: boolean;
}

export default function ServiceCard({
  service,
  onFavoriteClick,
  isFavorite = false,
}: ServiceCardProps) {
  const {
    id,
    title,
    short_description,
    price,
    price_type,
    slug,
    provider,
    category,
    average_rating = 0,
    total_reviews = 0,
    featured,
  } = service;

  const imageUrl = service.images?.[0]?.url || '/images/placeholders/service.jpg';
  const providerName = provider?.business_name || 'Proveedor';
  const providerCity = provider?.city || 'Ciudad';
  const categoryName = category?.name || 'General';

  return (
    <Card hover padding="none" className="group overflow-hidden">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <Image
          src={imageUrl}
          alt={title || 'Servicio'}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {/* Featured badge */}
        {featured && (
          <div className="absolute top-3 left-3">
            <Badge variant="warning" size="sm">
              ⭐ Destacado
            </Badge>
          </div>
        )}

        {/* Favorite button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            onFavoriteClick?.();
          }}
          className="absolute top-3 right-3 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
          aria-label="Agregar a favoritos"
        >
          <svg
            className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
            fill={isFavorite ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category badge */}
        <Badge variant="info" size="sm" className="mb-2">
          {categoryName}
        </Badge>

        {/* Title and Price */}
        <div className="flex items-start justify-between mb-2">
          <Link href={`/servicios/${slug}`} className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
              {title}
            </h3>
          </Link>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {short_description || 'Servicio profesional de calidad'}
        </p>

        {/* Rating and Location */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span className="text-sm font-medium text-gray-700">
              {average_rating.toFixed(1)}
            </span>
            <span className="text-sm text-gray-500">({total_reviews})</span>
          </div>
          <span className="text-sm text-gray-500 flex items-center gap-1">
            📍 {providerCity}
          </span>
        </div>

        {/* Provider and Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
              <span className="text-primary-600 text-sm font-semibold">
                {providerName.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="text-sm text-gray-700 font-medium truncate max-w-[120px]">
              {providerName}
            </span>
          </div>

          <div className="text-right">
            {price ? (
              <>
                <div className="text-2xl font-bold text-primary-600">
                  ${price.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">
                  {price_type === 'hourly' && '/ hora'}
                  {price_type === 'daily' && '/ día'}
                  {price_type === 'fixed' && 'fijo'}
                </div>
              </>
            ) : (
              <div className="text-sm text-gray-600">Consultar</div>
            )}
          </div>
        </div>

        {/* CTA */}
        <Link href={`/servicios/${slug}`} className="block mt-4">
          <Button className="w-full" variant="outline">
            Ver detalles →
          </Button>
        </Link>
      </div>
    </Card>
  );
}
