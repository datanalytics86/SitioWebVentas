'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

// Mock data - En producción vendría de la API
const mockServices = [
  {
    id: '1',
    slug: 'clases-ingles-conversacional',
    title: 'Clases de Inglés Conversacional',
    description: 'Aprende inglés práctico con profesor nativo. Clases personalizadas.',
    price: 25.0,
    category: 'Clases y Educación',
    provider: 'John Smith English Academy',
    rating: 4.8,
    reviews: 42,
    city: 'Ciudad de México',
    image: '/images/services/english-class.jpg',
    featured: true,
  },
  {
    id: '2',
    slug: 'carpinteria-muebles-medida',
    title: 'Carpintería y Muebles a Medida',
    description: 'Fabricación de muebles personalizados en madera de alta calidad.',
    price: 150.0,
    category: 'Carpintería',
    provider: 'Carpintería Artesanal López',
    rating: 4.9,
    reviews: 28,
    city: 'Guadalajara',
    image: '/images/services/carpentry.jpg',
    featured: true,
  },
  {
    id: '3',
    slug: 'diseno-grafico-logotipos',
    title: 'Diseño Gráfico y Logotipos',
    description: 'Diseño profesional de identidad corporativa y materiales publicitarios.',
    price: 80.0,
    category: 'Servicios Profesionales',
    provider: 'Creative Studio MX',
    rating: 4.7,
    reviews: 56,
    city: 'Monterrey',
    image: '/images/services/graphic-design.jpg',
    featured: false,
  },
  {
    id: '4',
    slug: 'clases-piano-domicilio',
    title: 'Clases de Piano a Domicilio',
    description: 'Aprende piano desde cero o perfecciona tu técnica. Todos los niveles.',
    price: 30.0,
    category: 'Clases y Educación',
    provider: 'Academia Musical Harmony',
    rating: 4.9,
    reviews: 34,
    city: 'Ciudad de México',
    image: '/images/services/piano-lessons.jpg',
    featured: false,
  },
  {
    id: '5',
    slug: 'reparacion-computadoras',
    title: 'Reparación de Computadoras',
    description: 'Servicio técnico especializado en PC y laptops. Diagnóstico gratuito.',
    price: 40.0,
    category: 'Tecnología',
    provider: 'TechFix Solutions',
    rating: 4.6,
    reviews: 89,
    city: 'Puebla',
    image: '/images/services/computer-repair.jpg',
    featured: false,
  },
  {
    id: '6',
    slug: 'plomeria-residencial',
    title: 'Plomería Residencial',
    description: 'Instalación, reparación y mantenimiento de sistemas de plomería.',
    price: 35.0,
    category: 'Hogar y Reparaciones',
    provider: 'Plomería Express 24/7',
    rating: 4.5,
    reviews: 67,
    city: 'Querétaro',
    image: '/images/services/plumbing.jpg',
    featured: false,
  },
];

const categories = [
  'Todas',
  'Clases y Educación',
  'Carpintería',
  'Servicios Profesionales',
  'Hogar y Reparaciones',
  'Belleza y Bienestar',
  'Tecnología',
];

const sortOptions = [
  { value: 'relevance', label: 'Relevancia' },
  { value: 'rating', label: 'Mejor valorados' },
  { value: 'price-asc', label: 'Precio: Menor a Mayor' },
  { value: 'price-desc', label: 'Precio: Mayor a Menor' },
];

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [sortBy, setSortBy] = useState('relevance');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [showFilters, setShowFilters] = useState(false);

  const filteredServices = mockServices.filter((service) => {
    const matchesSearch =
      searchQuery === '' ||
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'Todas' || service.category === selectedCategory;

    const matchesPrice =
      (priceRange.min === '' || service.price >= parseFloat(priceRange.min)) &&
      (priceRange.max === '' || service.price <= parseFloat(priceRange.max));

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gray-50">
        {/* Search Header */}
        <div className="bg-gradient-to-r from-primary-600 to-purple-600 text-white py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6">
              Explora nuestros servicios
            </h1>
            <div className="max-w-3xl">
              <div className="relative">
                <svg
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Buscar servicios..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-0 text-gray-900 shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside
              className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}
            >
              <Card>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Categorías
                    </h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                            selectedCategory === category
                              ? 'bg-primary-100 text-primary-700 font-semibold'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Rango de precio
                    </h3>
                    <div className="space-y-3">
                      <input
                        type="number"
                        placeholder="Mínimo"
                        value={priceRange.min}
                        onChange={(e) =>
                          setPriceRange({ ...priceRange, min: e.target.value })
                        }
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
                      />
                      <input
                        type="number"
                        placeholder="Máximo"
                        value={priceRange.max}
                        onChange={(e) =>
                          setPriceRange({ ...priceRange, max: e.target.value })
                        }
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSelectedCategory('Todas');
                      setPriceRange({ min: '', max: '' });
                      setSearchQuery('');
                    }}
                  >
                    Limpiar filtros
                  </Button>
                </div>
              </Card>
            </aside>

            {/* Services Grid */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <p className="text-gray-600">
                    <span className="font-semibold text-gray-900">
                      {filteredServices.length}
                    </span>{' '}
                    servicios encontrados
                  </p>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden px-3 py-2 border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                  >
                    Filtros
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <label htmlFor="sort" className="text-sm text-gray-600">
                    Ordenar por:
                  </label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Services List */}
              {filteredServices.length === 0 ? (
                <Card className="text-center py-12">
                  <svg
                    className="w-16 h-16 text-gray-300 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    No se encontraron servicios
                  </h3>
                  <p className="text-gray-600">
                    Intenta ajustar los filtros o realizar una búsqueda diferente
                  </p>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredServices.map((service) => (
                    <Link key={service.id} href={`/servicios/${service.slug}`}>
                      <Card hover className="h-full group">
                        <div className="flex flex-col h-full">
                          {/* Service Image Placeholder */}
                          <div className="relative h-48 bg-gradient-to-br from-primary-100 to-purple-100 rounded-xl mb-4 overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center text-6xl">
                              {service.category === 'Clases y Educación' && '📚'}
                              {service.category === 'Carpintería' && '🔨'}
                              {service.category === 'Servicios Profesionales' && '💼'}
                              {service.category === 'Hogar y Reparaciones' && '🏠'}
                              {service.category === 'Tecnología' && '💻'}
                            </div>
                            {service.featured && (
                              <Badge
                                variant="warning"
                                className="absolute top-3 right-3"
                              >
                                Destacado
                              </Badge>
                            )}
                          </div>

                          {/* Service Info */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                                {service.title}
                              </h3>
                            </div>

                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                              {service.description}
                            </p>

                            <div className="flex items-center gap-2 mb-3">
                              <Badge variant="info" size="sm">
                                {service.category}
                              </Badge>
                              <span className="text-sm text-gray-500 flex items-center gap-1">
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
                                {service.city}
                              </span>
                            </div>

                            <div className="flex items-center gap-1 mb-3">
                              <span className="text-yellow-400">★</span>
                              <span className="font-semibold text-gray-900">
                                {service.rating}
                              </span>
                              <span className="text-sm text-gray-500">
                                ({service.reviews} reseñas)
                              </span>
                            </div>

                            <div className="text-sm text-gray-600 mb-4">
                              por <span className="font-medium">{service.provider}</span>
                            </div>
                          </div>

                          {/* Footer */}
                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div>
                              <div className="text-2xl font-bold text-primary-600">
                                ${service.price}
                              </div>
                              <div className="text-xs text-gray-500">por hora</div>
                            </div>
                            <Button size="sm" className="group-hover:shadow-lg">
                              Ver detalles →
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {filteredServices.length > 0 && (
                <div className="flex justify-center mt-12">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Anterior
                    </Button>
                    <Button size="sm">1</Button>
                    <Button variant="outline" size="sm">
                      2
                    </Button>
                    <Button variant="outline" size="sm">
                      3
                    </Button>
                    <Button variant="outline" size="sm">
                      Siguiente
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
