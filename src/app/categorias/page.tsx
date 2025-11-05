import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card from '@/components/ui/Card';
import { CATEGORIES } from '@/lib/constants/categories';

export default function CategoriasPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-600 to-purple-600 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                Explora todas las categorías
              </h1>
              <p className="text-xl text-primary-100">
                Encuentra el servicio perfecto navegando por nuestras categorías especializadas
              </p>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={`/servicios?categoria=${category.slug}`}
              >
                <Card hover className="h-full group">
                  {/* Icon and Title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}
                    >
                      {category.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600">{category.description}</p>
                    </div>
                  </div>

                  {/* Service Count */}
                  <div className="mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-semibold">
                      {category.count} servicios
                    </span>
                  </div>

                  {/* Subcategories */}
                  {category.subcategories && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">
                        Subcategorías:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {category.subcategories.map((sub, index) => (
                          <span
                            key={index}
                            className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Arrow */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="text-sm text-primary-600 font-semibold group-hover:translate-x-2 inline-block transition-transform">
                      Ver servicios →
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <Card className="bg-gradient-to-br from-primary-50 to-purple-50 border-2 border-primary-200">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  ¿No encuentras lo que buscas?
                </h2>
                <p className="text-gray-600 mb-6">
                  Navega por todos los servicios disponibles o contacta con nosotros
                  para ayudarte a encontrar lo que necesitas
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/servicios"
                    className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                  >
                    Ver todos los servicios
                  </Link>
                  <Link
                    href="/contacto"
                    className="px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold border-2 border-primary-600 hover:bg-primary-50 transition-colors"
                  >
                    Contactar soporte
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
