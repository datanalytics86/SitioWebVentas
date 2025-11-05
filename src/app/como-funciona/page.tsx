import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function ComoFuncionaPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-600 via-purple-600 to-blue-600 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                ¿Cómo funciona Directorio de Servicios?
              </h1>
              <p className="text-xl text-primary-100">
                Conectar con el profesional perfecto es fácil, rápido y seguro
              </p>
            </div>
          </div>
        </section>

        {/* For Clients */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full font-semibold mb-4">
                Para Clientes
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Encuentra el servicio que necesitas
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                En solo 3 pasos puedes encontrar y contratar al profesional ideal
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
              <Card className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  1. Busca y explora
                </h3>
                <p className="text-gray-600">
                  Utiliza nuestra búsqueda avanzada o navega por categorías.
                  Filtra por ubicación, precio y calificación.
                </p>
              </Card>

              <Card className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  2. Compara y elige
                </h3>
                <p className="text-gray-600">
                  Lee reseñas reales de otros clientes, compara precios y revisa
                  los perfiles de proveedores verificados.
                </p>
              </Card>

              <Card className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  3. Contacta y contrata
                </h3>
                <p className="text-gray-600">
                  Contacta directamente con el proveedor, acuerda los detalles
                  y disfruta de un servicio de calidad.
                </p>
              </Card>
            </div>

            <div className="text-center">
              <Link href="/servicios">
                <Button size="lg">
                  Explorar servicios ahora
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* For Providers */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-semibold mb-4">
                Para Proveedores
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Haz crecer tu negocio
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Únete a miles de profesionales que confían en nosotros
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
              <Card className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  1. Regístrate gratis
                </h3>
                <p className="text-gray-600">
                  Crea tu perfil de proveedor en minutos. Sin costos ocultos,
                  sin comisiones por servicio.
                </p>
              </Card>

              <Card className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  2. Publica tus servicios
                </h3>
                <p className="text-gray-600">
                  Describe tus servicios, establece tus precios y muestra tu
                  experiencia con fotos y certificaciones.
                </p>
              </Card>

              <Card className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  3. Recibe clientes
                </h3>
                <p className="text-gray-600">
                  Los clientes te contactan directamente. Construye tu reputación
                  con reseñas y haz crecer tu negocio.
                </p>
              </Card>
            </div>

            <div className="text-center">
              <Link href="/registro?role=provider">
                <Button size="lg" variant="secondary">
                  Registrarme como proveedor
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                ¿Por qué elegirnos?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Beneficios que marcan la diferencia
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <Card className="text-center">
                <div className="text-4xl mb-3">✅</div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Verificación de proveedores
                </h3>
                <p className="text-sm text-gray-600">
                  Todos los proveedores son verificados antes de unirse
                </p>
              </Card>

              <Card className="text-center">
                <div className="text-4xl mb-3">⭐</div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Reseñas reales
                </h3>
                <p className="text-sm text-gray-600">
                  Solo clientes reales pueden dejar opiniones
                </p>
              </Card>

              <Card className="text-center">
                <div className="text-4xl mb-3">🔒</div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Seguridad garantizada
                </h3>
                <p className="text-sm text-gray-600">
                  Tus datos están protegidos en todo momento
                </p>
              </Card>

              <Card className="text-center">
                <div className="text-4xl mb-3">💬</div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Soporte 24/7
                </h3>
                <p className="text-sm text-gray-600">
                  Nuestro equipo está siempre disponible para ayudarte
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Preguntas frecuentes
                </h2>
              </div>

              <div className="space-y-4">
                {[
                  {
                    q: '¿Es gratis usar la plataforma?',
                    a: 'Sí, tanto para clientes como para proveedores, el registro y uso básico de la plataforma es completamente gratuito. No cobramos comisiones por transacciones.',
                  },
                  {
                    q: '¿Cómo sé que los proveedores son confiables?',
                    a: 'Verificamos la identidad de todos los proveedores y fomentamos un sistema robusto de reseñas. Los clientes pueden ver calificaciones, comentarios y el historial de cada proveedor.',
                  },
                  {
                    q: '¿Puedo cancelar un servicio?',
                    a: 'Las políticas de cancelación dependen de cada proveedor. Te recomendamos acordar los términos de cancelación antes de contratar el servicio.',
                  },
                  {
                    q: '¿Cómo se procesan los pagos?',
                    a: 'Los pagos se acuerdan directamente entre el cliente y el proveedor. Recomendamos siempre usar métodos de pago seguros y obtener comprobantes.',
                  },
                  {
                    q: '¿Qué hago si tengo un problema con un servicio?',
                    a: 'Puedes contactar a nuestro equipo de soporte en cualquier momento. Mediamos en conflictos y tomamos medidas contra proveedores que no cumplan con nuestros estándares.',
                  },
                ].map((faq, index) => (
                  <Card key={index}>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">
                      {faq.q}
                    </h3>
                    <p className="text-gray-600">{faq.a}</p>
                  </Card>
                ))}
              </div>

              <div className="mt-12 text-center">
                <p className="text-gray-600 mb-4">¿Tienes más preguntas?</p>
                <Link href="/ayuda">
                  <Button variant="outline">
                    Visitar centro de ayuda
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-r from-primary-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              ¿Listo para comenzar?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Únete a nuestra comunidad y descubre cómo podemos ayudarte
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/servicios">
                <Button size="lg" variant="secondary" className="bg-white text-primary-700 hover:bg-gray-100">
                  Buscar servicios
                </Button>
              </Link>
              <Link href="/registro">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary-700">
                  Ofrecer servicios
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
