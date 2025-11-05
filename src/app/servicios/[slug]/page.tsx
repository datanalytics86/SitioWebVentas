'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

// Mock service data
const mockService = {
  id: '1',
  slug: 'clases-ingles-conversacional',
  title: 'Clases de Inglés Conversacional',
  description:
    'Aprende inglés práctico con profesor nativo. Clases personalizadas adaptadas a tu nivel y objetivos. Metodología comunicativa enfocada en la conversación real.',
  fullDescription: `
    🎯 **¿Qué incluye el servicio?**
    - Evaluación inicial de nivel
    - Material didáctico incluido
    - Clases en línea o presenciales
    - Acceso a plataforma de recursos
    - Certificado al finalizar el curso

    📚 **Metodología**
    Utilizamos el método comunicativo, enfocándonos en situaciones reales de conversación.
    Cada clase está diseñada para que practiques desde el primer día.

    ⏰ **Duración y Horarios**
    - Sesiones de 1 hora
    - Horarios flexibles de lunes a sábado
    - Clases matutinas y vespertinas disponibles

    🎓 **Niveles disponibles**
    - Básico (A1-A2)
    - Intermedio (B1-B2)
    - Avanzado (C1-C2)
  `,
  price: 25.0,
  category: 'Clases y Educación',
  city: 'Ciudad de México',
  rating: 4.8,
  totalReviews: 42,
  featured: true,
  provider: {
    id: 'p1',
    name: 'John Smith English Academy',
    bio: 'Academia de inglés con más de 10 años de experiencia. Profesores nativos certificados.',
    avatar: '👨‍🏫',
    memberSince: '2020',
    totalServices: 3,
    responseTime: '2 horas',
    responseRate: '98%',
  },
  features: [
    'Profesor nativo certificado',
    'Material incluido',
    'Horarios flexibles',
    'Primera clase gratis',
    'Satisfacción garantizada',
  ],
};

// Mock reviews data
const mockReviews = [
  {
    id: 'r1',
    user: 'María García',
    avatar: '👩',
    rating: 5,
    date: '2025-10-15',
    comment:
      'Excelente profesor! En solo 3 meses he mejorado muchísimo mi nivel de conversación. Las clases son muy dinámicas y adaptadas a mis necesidades. 100% recomendado.',
    helpful: 12,
  },
  {
    id: 'r2',
    user: 'Carlos Rodríguez',
    avatar: '👨',
    rating: 5,
    date: '2025-10-08',
    comment:
      'Muy profesional y paciente. Me ayudó a preparar mi entrevista de trabajo en inglés y conseguí el puesto. Vale cada peso invertido.',
    helpful: 8,
  },
  {
    id: 'r3',
    user: 'Ana Martínez',
    avatar: '👩‍💼',
    rating: 4,
    date: '2025-09-22',
    comment:
      'Buen servicio, aunque a veces hay que esperar un poco para agendar. El profesor es excelente y el material muy completo.',
    helpful: 5,
  },
  {
    id: 'r4',
    user: 'Pedro López',
    avatar: '👨‍💻',
    rating: 5,
    date: '2025-09-10',
    comment:
      'Fantástico! He tomado clases con varios profesores y este es sin duda el mejor. Muy recomendado para nivel intermedio-avanzado.',
    helpful: 15,
  },
];

export default function ServiceDetailPage() {
  const [selectedTab, setSelectedTab] = useState<'description' | 'reviews'>('description');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular llamada a API
    setTimeout(() => {
      alert('¡Gracias por tu reseña!');
      setShowReviewForm(false);
      setReviewForm({ rating: 5, comment: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  const ratingDistribution = [
    { stars: 5, count: 28, percentage: 67 },
    { stars: 4, count: 10, percentage: 24 },
    { stars: 3, count: 3, percentage: 7 },
    { stars: 2, count: 1, percentage: 2 },
    { stars: 1, count: 0, percentage: 0 },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm">
            <ol className="flex items-center space-x-2 text-gray-600">
              <li>
                <Link href="/" className="hover:text-primary-600">
                  Inicio
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/servicios" className="hover:text-primary-600">
                  Servicios
                </Link>
              </li>
              <li>/</li>
              <li className="text-gray-900 font-medium">{mockService.title}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Service Header */}
              <Card>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {mockService.featured && (
                        <Badge variant="warning">Destacado</Badge>
                      )}
                      <Badge variant="info">{mockService.category}</Badge>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {mockService.title}
                    </h1>
                    <p className="text-lg text-gray-600 mb-4">
                      {mockService.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400 text-lg">★</span>
                        <span className="font-bold text-gray-900">
                          {mockService.rating}
                        </span>
                        <span className="text-gray-500">
                          ({mockService.totalReviews} reseñas)
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                        </svg>
                        {mockService.city}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Service Image Placeholder */}
                <div className="relative h-96 bg-gradient-to-br from-primary-100 via-purple-100 to-blue-100 rounded-xl overflow-hidden mb-6">
                  <div className="absolute inset-0 flex items-center justify-center text-9xl">
                    📚
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {mockService.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <svg
                        className="w-5 h-5 text-green-500 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Tabs */}
              <Card padding="none">
                <div className="border-b border-gray-200">
                  <div className="flex">
                    <button
                      onClick={() => setSelectedTab('description')}
                      className={`px-6 py-4 font-semibold transition-colors ${
                        selectedTab === 'description'
                          ? 'text-primary-600 border-b-2 border-primary-600'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Descripción
                    </button>
                    <button
                      onClick={() => setSelectedTab('reviews')}
                      className={`px-6 py-4 font-semibold transition-colors ${
                        selectedTab === 'reviews'
                          ? 'text-primary-600 border-b-2 border-primary-600'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Reseñas ({mockService.totalReviews})
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {selectedTab === 'description' && (
                    <div className="prose prose-primary max-w-none">
                      <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                        {mockService.fullDescription}
                      </div>
                    </div>
                  )}

                  {selectedTab === 'reviews' && (
                    <div className="space-y-6">
                      {/* Rating Summary */}
                      <div className="bg-gray-50 rounded-xl p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="text-center md:text-left">
                            <div className="text-5xl font-bold text-gray-900 mb-2">
                              {mockService.rating}
                            </div>
                            <div className="flex items-center justify-center md:justify-start gap-1 mb-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                  key={star}
                                  className={
                                    star <= Math.round(mockService.rating)
                                      ? 'text-yellow-400 text-xl'
                                      : 'text-gray-300 text-xl'
                                  }
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                            <div className="text-sm text-gray-600">
                              Basado en {mockService.totalReviews} reseñas
                            </div>
                          </div>

                          <div className="space-y-2">
                            {ratingDistribution.map((item) => (
                              <div key={item.stars} className="flex items-center gap-3">
                                <div className="text-sm text-gray-600 w-8">
                                  {item.stars}★
                                </div>
                                <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                                  <div
                                    className="bg-yellow-400 h-full"
                                    style={{ width: `${item.percentage}%` }}
                                  />
                                </div>
                                <div className="text-sm text-gray-600 w-12 text-right">
                                  {item.count}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Review Form Toggle */}
                      {!showReviewForm && (
                        <Button
                          onClick={() => setShowReviewForm(true)}
                          className="w-full md:w-auto"
                        >
                          Escribir una reseña
                        </Button>
                      )}

                      {/* Review Form */}
                      {showReviewForm && (
                        <Card className="bg-primary-50 border-2 border-primary-200">
                          <h3 className="text-lg font-bold text-gray-900 mb-4">
                            Deja tu reseña
                          </h3>
                          <form onSubmit={handleSubmitReview} className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Calificación
                              </label>
                              <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <button
                                    key={star}
                                    type="button"
                                    onClick={() =>
                                      setReviewForm({ ...reviewForm, rating: star })
                                    }
                                    className="text-3xl transition-transform hover:scale-110"
                                  >
                                    <span
                                      className={
                                        star <= reviewForm.rating
                                          ? 'text-yellow-400'
                                          : 'text-gray-300'
                                      }
                                    >
                                      ★
                                    </span>
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tu opinión
                              </label>
                              <textarea
                                value={reviewForm.comment}
                                onChange={(e) =>
                                  setReviewForm({
                                    ...reviewForm,
                                    comment: e.target.value,
                                  })
                                }
                                placeholder="Comparte tu experiencia con este servicio..."
                                rows={4}
                                required
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
                              />
                            </div>

                            <div className="flex gap-3">
                              <Button type="submit" isLoading={isSubmitting}>
                                {isSubmitting ? 'Publicando...' : 'Publicar reseña'}
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => setShowReviewForm(false)}
                              >
                                Cancelar
                              </Button>
                            </div>
                          </form>
                        </Card>
                      )}

                      {/* Reviews List */}
                      <div className="space-y-4">
                        {mockReviews.map((review) => (
                          <Card key={review.id} className="hover:shadow-lg transition-shadow">
                            <div className="flex items-start gap-4">
                              <div className="text-4xl">{review.avatar}</div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <div>
                                    <div className="font-semibold text-gray-900">
                                      {review.user}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {new Date(review.date).toLocaleDateString('es-ES', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                      })}
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <span
                                        key={star}
                                        className={
                                          star <= review.rating
                                            ? 'text-yellow-400'
                                            : 'text-gray-300'
                                        }
                                      >
                                        ★
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                <p className="text-gray-700 leading-relaxed mb-3">
                                  {review.comment}
                                </p>
                                <button className="text-sm text-gray-500 hover:text-primary-600 flex items-center gap-1">
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                                    />
                                  </svg>
                                  Útil ({review.helpful})
                                </button>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Booking Card */}
              <Card className="sticky top-4">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-primary-600 mb-1">
                    ${mockService.price}
                  </div>
                  <div className="text-sm text-gray-600">por hora</div>
                </div>

                <div className="space-y-3 mb-6">
                  <Button size="lg" className="w-full">
                    Contactar Proveedor
                  </Button>
                  <Button variant="outline" size="lg" className="w-full">
                    💾 Guardar
                  </Button>
                </div>

                <div className="border-t pt-4 space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Respuesta en 2 horas
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Pago seguro
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Satisfacción garantizada
                  </div>
                </div>
              </Card>

              {/* Provider Card */}
              <Card>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Sobre el proveedor
                </h3>
                <div className="flex items-start gap-3 mb-4">
                  <div className="text-5xl">{mockService.provider.avatar}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 mb-1">
                      {mockService.provider.name}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      Miembro desde {mockService.provider.memberSince}
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-yellow-400">★</span>
                      <span className="font-semibold">{mockService.rating}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {mockService.provider.bio}
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Servicios publicados</span>
                    <span className="font-semibold">
                      {mockService.provider.totalServices}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tiempo de respuesta</span>
                    <span className="font-semibold">
                      {mockService.provider.responseTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tasa de respuesta</span>
                    <span className="font-semibold">
                      {mockService.provider.responseRate}
                    </span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Ver perfil completo
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
