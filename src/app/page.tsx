import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-50 via-purple-50 to-blue-50 py-20 lg:py-28 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Encuentra los{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">
                  mejores servicios
                </span>{' '}
                profesionales
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                Conecta con expertos verificados en clases, carpintería y servicios
                profesionales en tu área. Calidad garantizada.
              </p>

              {/* Enhanced Search Bar */}
              <div className="bg-white rounded-2xl shadow-2xl p-2 sm:p-3 max-w-3xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1 relative">
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
                      placeholder="¿Qué servicio buscas?"
                      className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl border-2 border-transparent focus:border-primary-500 focus:outline-none transition-colors text-base"
                    />
                  </div>
                  <div className="flex-1 relative">
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
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <input
                      type="text"
                      placeholder="Ciudad o código postal"
                      className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl border-2 border-transparent focus:border-primary-500 focus:outline-none transition-colors text-base"
                    />
                  </div>
                  <Button size="lg" className="sm:px-8">
                    Buscar
                  </Button>
                </div>
              </div>

              {/* Popular searches */}
              <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm">
                <span className="text-gray-600">Popular:</span>
                {['Clases de inglés', 'Carpintero', 'Diseño gráfico', 'Plomero'].map((tag) => (
                  <Link
                    key={tag}
                    href={`/servicios?q=${encodeURIComponent(tag)}`}
                    className="px-3 py-1 bg-white rounded-full text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors shadow-sm"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '10,000+', label: 'Servicios' },
                { number: '5,000+', label: 'Profesionales' },
                { number: '50+', label: 'Categorías' },
                { number: '4.8/5', label: 'Calificación' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-primary-600 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm sm:text-base text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 lg:py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Categorías Populares
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explora nuestra amplia variedad de servicios profesionales
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: 'Clases y Educación',
                  icon: '📚',
                  description: 'Tutorías, idiomas, música y más',
                  count: '120+ servicios',
                  color: 'from-blue-500 to-cyan-500',
                },
                {
                  name: 'Carpintería',
                  icon: '🔨',
                  description: 'Muebles a medida, restauración',
                  count: '85+ servicios',
                  color: 'from-amber-500 to-orange-500',
                },
                {
                  name: 'Servicios Profesionales',
                  icon: '💼',
                  description: 'Consultoría, diseño, marketing',
                  count: '200+ servicios',
                  color: 'from-purple-500 to-pink-500',
                },
                {
                  name: 'Hogar y Reparaciones',
                  icon: '🏠',
                  description: 'Plomería, electricidad, pintura',
                  count: '150+ servicios',
                  color: 'from-green-500 to-emerald-500',
                },
                {
                  name: 'Belleza y Bienestar',
                  icon: '💅',
                  description: 'Peluquería, spa, masajes',
                  count: '95+ servicios',
                  color: 'from-pink-500 to-rose-500',
                },
                {
                  name: 'Tecnología',
                  icon: '💻',
                  description: 'Reparación, desarrollo, soporte',
                  count: '110+ servicios',
                  color: 'from-indigo-500 to-blue-500',
                },
              ].map((category, index) => (
                <Link
                  key={index}
                  href={`/servicios?categoria=${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <Card hover className="h-full group">
                    <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-200`}>
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <p className="text-sm text-primary-600 font-semibold">
                      {category.count} →
                    </p>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href="/categorias">
                <Button variant="outline" size="lg">
                  Ver todas las categorías
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                ¿Cómo funciona?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Encontrar el servicio perfecto es fácil y rápido
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
              {[
                {
                  step: '1',
                  title: 'Busca el servicio',
                  description:
                    'Explora nuestra amplia variedad de servicios profesionales y encuentra el que necesitas',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  ),
                },
                {
                  step: '2',
                  title: 'Compara opciones',
                  description:
                    'Lee reseñas verificadas, compara precios y revisa perfiles detallados de proveedores',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  ),
                },
                {
                  step: '3',
                  title: 'Contrata con confianza',
                  description:
                    'Contacta directamente con el proveedor y agenda tu servicio de forma segura',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                },
              ].map((item, index) => (
                <div key={index} className="text-center relative">
                  {/* Connector line - hidden on mobile */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary-200 to-primary-300 z-0"></div>
                  )}

                  <div className="relative z-10">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-purple-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      {item.icon}
                    </div>
                    <div className="absolute top-0 right-1/2 transform translate-x-1/2 -translate-y-3 bg-white px-3 py-1 rounded-full border-2 border-primary-600 text-primary-600 font-bold text-sm">
                      Paso {item.step}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 mt-2">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-16 lg:py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-purple-700 text-white overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-300 rounded-full filter blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                ¿Eres proveedor de servicios?
              </h2>
              <p className="text-lg sm:text-xl mb-8 text-primary-50 max-w-2xl mx-auto">
                Únete a nuestra plataforma y conecta con miles de clientes
                potenciales. Aumenta tu visibilidad y haz crecer tu negocio.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/registro?role=provider">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="bg-white text-primary-700 hover:bg-gray-50 shadow-xl"
                  >
                    Registrar mi negocio
                  </Button>
                </Link>
                <Link href="/como-funciona">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-white text-white hover:bg-white hover:text-primary-700"
                  >
                    Conocer más
                  </Button>
                </Link>
              </div>

              <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                {[
                  { icon: '⚡', text: 'Registro gratuito' },
                  { icon: '📈', text: 'Aumenta tus ventas' },
                  { icon: '🎯', text: 'Clientes verificados' },
                ].map((feature, index) => (
                  <div key={index} className="flex items-center justify-center gap-2 text-primary-50">
                    <span className="text-2xl">{feature.icon}</span>
                    <span className="font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
