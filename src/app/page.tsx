import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header/Navigation */}
      <header className="bg-white shadow-sm">
        <nav className="container-custom py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-primary-600">
                Directorio de Servicios
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/servicios"
                className="text-gray-700 hover:text-primary-600 font-medium"
              >
                Explorar Servicios
              </Link>
              <Link
                href="/categorias"
                className="text-gray-700 hover:text-primary-600 font-medium"
              >
                Categorías
              </Link>
              <Link href="/login" className="btn-outline">
                Iniciar Sesión
              </Link>
              <Link href="/registro" className="btn-primary">
                Registrarse
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-blue-100 py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Encuentra los mejores servicios profesionales
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Conecta con expertos en clases, carpintería y servicios
              profesionales en tu área
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="¿Qué servicio buscas?"
                className="flex-1 input-field"
              />
              <input
                type="text"
                placeholder="Ciudad o código postal"
                className="flex-1 input-field"
              />
              <button className="btn-primary whitespace-nowrap">
                Buscar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container-custom">
          <h3 className="text-3xl font-bold text-center mb-12">
            Categorías Populares
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'Clases y Educación',
                icon: '📚',
                description: 'Tutorías, idiomas, música y más',
                count: '120+ servicios',
              },
              {
                name: 'Carpintería',
                icon: '🔨',
                description: 'Muebles a medida, restauración',
                count: '85+ servicios',
              },
              {
                name: 'Servicios Profesionales',
                icon: '💼',
                description: 'Consultoría, diseño, marketing',
                count: '200+ servicios',
              },
              {
                name: 'Hogar y Reparaciones',
                icon: '🏠',
                description: 'Plomería, electricidad, pintura',
                count: '150+ servicios',
              },
              {
                name: 'Belleza y Bienestar',
                icon: '💅',
                description: 'Peluquería, spa, masajes',
                count: '95+ servicios',
              },
              {
                name: 'Tecnología',
                icon: '💻',
                description: 'Reparación, desarrollo, soporte',
                count: '110+ servicios',
              },
            ].map((category, index) => (
              <Link
                key={index}
                href={`/categorias/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="card p-6 hover:scale-105 transition-transform duration-200"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h4 className="text-xl font-bold mb-2">{category.name}</h4>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <p className="text-sm text-primary-600 font-medium">
                  {category.count}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom">
          <h3 className="text-3xl font-bold text-center mb-12">
            ¿Cómo funciona?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Busca el servicio',
                description:
                  'Explora nuestra amplia variedad de servicios profesionales',
              },
              {
                step: '2',
                title: 'Compara opciones',
                description:
                  'Lee reseñas, compara precios y revisa perfiles de proveedores',
              },
              {
                step: '3',
                title: 'Contrata con confianza',
                description:
                  'Contacta directamente con el proveedor y agenda tu servicio',
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="container-custom text-center">
          <h3 className="text-3xl font-bold mb-4">
            ¿Eres proveedor de servicios?
          </h3>
          <p className="text-xl mb-8">
            Únete a nuestra plataforma y conecta con miles de clientes
            potenciales
          </p>
          <Link href="/registro?role=provider" className="btn-secondary">
            Registrar mi negocio
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-bold mb-4">Directorio de Servicios</h4>
              <p className="text-gray-400">
                Conectando clientes con los mejores profesionales
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-4">Categorías</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/categorias" className="hover:text-white">
                    Todas las categorías
                  </Link>
                </li>
                <li>
                  <Link href="/servicios" className="hover:text-white">
                    Ver servicios
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Empresa</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/acerca" className="hover:text-white">
                    Acerca de
                  </Link>
                </li>
                <li>
                  <Link href="/contacto" className="hover:text-white">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Legal</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/privacidad" className="hover:text-white">
                    Privacidad
                  </Link>
                </li>
                <li>
                  <Link href="/terminos" className="hover:text-white">
                    Términos
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 Directorio de Servicios. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
