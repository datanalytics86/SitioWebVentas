import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function AcercaPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary-600 to-purple-600 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Acerca de Nosotros
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Conectando clientes con los mejores profesionales desde 2025
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestra Misión</h2>
                <p className="text-lg text-gray-700 mb-6">
                  En Directorio de Servicios, nuestra misión es simplificar la búsqueda y
                  contratación de servicios profesionales. Creamos un espacio donde clientes
                  y proveedores pueden conectar de manera segura, transparente y eficiente.
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Nuestra Visión</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Ser la plataforma líder en Latinoamérica para la conexión de servicios
                  profesionales, reconocida por nuestra calidad, confianza y compromiso con
                  la excelencia.
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Nuestros Valores</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: '🤝',
                      title: 'Confianza',
                      description: 'Verificamos a todos nuestros proveedores y fomentamos la transparencia.',
                    },
                    {
                      icon: '⭐',
                      title: 'Calidad',
                      description: 'Nos esforzamos por ofrecer solo los mejores servicios y experiencias.',
                    },
                    {
                      icon: '🚀',
                      title: 'Innovación',
                      description: 'Mejoramos constantemente nuestra plataforma con nuevas funcionalidades.',
                    },
                    {
                      icon: '💙',
                      title: 'Compromiso',
                      description: 'Estamos comprometidos con el éxito de nuestra comunidad.',
                    },
                  ].map((value, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="text-4xl flex-shrink-0">{value.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                        <p className="text-gray-600">{value.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Listo para comenzar?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Únete a miles de usuarios que ya confían en nosotros
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/servicios">
                <Button size="lg">Explorar servicios</Button>
              </Link>
              <Link href="/registro">
                <Button size="lg" variant="outline">Registrarse</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
