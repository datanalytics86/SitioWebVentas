import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function AyudaPage() {
  const faqs = [
    {
      category: 'General',
      questions: [
        {
          q: '¿Qué es Directorio de Servicios?',
          a: 'Es una plataforma que conecta a clientes con proveedores de servicios profesionales en diversas categorías como clases, carpintería, tecnología y más.',
        },
        {
          q: '¿Es gratis usar la plataforma?',
          a: 'Sí, tanto el registro como el uso básico de la plataforma son completamente gratuitos para clientes y proveedores.',
        },
        {
          q: '¿Cómo funciona la plataforma?',
          a: 'Los clientes buscan servicios, comparan opciones, leen reseñas y contactan directamente con los proveedores. Los proveedores publican sus servicios y reciben solicitudes de clientes interesados.',
        },
      ],
    },
    {
      category: 'Para Clientes',
      questions: [
        {
          q: '¿Cómo busco un servicio?',
          a: 'Puedes usar la barra de búsqueda en la página principal, navegar por categorías o aplicar filtros como ubicación, precio y calificación.',
        },
        {
          q: '¿Cómo contacto a un proveedor?',
          a: 'En la página del servicio, haz clic en "Contactar Proveedor" para ver sus datos de contacto y enviarle un mensaje.',
        },
        {
          q: '¿Puedo dejar una reseña?',
          a: 'Sí, después de contratar un servicio, puedes dejar una reseña con calificación y comentarios para ayudar a otros usuarios.',
        },
        {
          q: '¿Cómo sé si un proveedor es confiable?',
          a: 'Todos los proveedores son verificados. Además, puedes ver sus calificaciones, reseñas de otros clientes y su historial en la plataforma.',
        },
      ],
    },
    {
      category: 'Para Proveedores',
      questions: [
        {
          q: '¿Cómo me registro como proveedor?',
          a: 'Haz clic en "Registrarse" y selecciona "Soy Proveedor". Completa el formulario con tu información y la de tu negocio.',
        },
        {
          q: '¿Cómo publico un servicio?',
          a: 'Desde tu panel de proveedor, haz clic en "Agregar Servicio", completa la información, agrega fotos y establece tu precio.',
        },
        {
          q: '¿Cuánto cuesta publicar servicios?',
          a: 'Publicar servicios es completamente gratuito. No cobramos comisiones por las transacciones que realices.',
        },
        {
          q: '¿Cómo recibo pagos?',
          a: 'Los pagos se acuerdan directamente entre tú y el cliente. Recomendamos usar métodos de pago seguros y obtener comprobantes.',
        },
      ],
    },
    {
      category: 'Pagos y Facturación',
      questions: [
        {
          q: '¿Cómo se procesan los pagos?',
          a: 'Los pagos se realizan directamente entre cliente y proveedor. La plataforma no procesa pagos ni cobra comisiones.',
        },
        {
          q: '¿Puedo obtener una factura?',
          a: 'La facturación depende de cada proveedor. Asegúrate de solicitarla al momento de contratar el servicio.',
        },
        {
          q: '¿Qué métodos de pago puedo usar?',
          a: 'Los métodos de pago se acuerdan entre cliente y proveedor. Recomendamos usar transferencias bancarias, PayPal o plataformas de pago reconocidas.',
        },
      ],
    },
    {
      category: 'Seguridad y Privacidad',
      questions: [
        {
          q: '¿Mis datos están seguros?',
          a: 'Sí, utilizamos encriptación y medidas de seguridad avanzadas para proteger tu información. Lee nuestra Política de Privacidad para más detalles.',
        },
        {
          q: '¿Qué hago si tengo un problema?',
          a: 'Contacta a nuestro equipo de soporte a través de la página de contacto. Mediamos en conflictos y tomamos medidas cuando es necesario.',
        },
        {
          q: '¿Puedo reportar un proveedor?',
          a: 'Sí, si encuentras comportamiento inapropiado o servicios fraudulentos, repórtalos inmediatamente a través del botón "Reportar" o contáctanos.',
        },
      ],
    },
    {
      category: 'Cuenta y Perfil',
      questions: [
        {
          q: '¿Cómo cambio mi contraseña?',
          a: 'Ve a tu perfil, selecciona "Configuración" y luego "Cambiar contraseña". También puedes usar "Olvidé mi contraseña" en el login.',
        },
        {
          q: '¿Puedo eliminar mi cuenta?',
          a: 'Sí, en la configuración de tu cuenta hay una opción para eliminar permanentemente tu perfil y datos.',
        },
        {
          q: '¿Cómo actualizo mi información?',
          a: 'Ve a tu perfil y haz clic en "Editar perfil" para actualizar tu información personal y de negocio.',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-r from-primary-600 to-purple-600 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Centro de Ayuda
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Encuentra respuestas rápidas a tus preguntas
            </p>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link href="/como-funciona">
                <Card hover className="text-center h-full">
                  <div className="text-4xl mb-3">📖</div>
                  <h3 className="font-bold text-gray-900 mb-1">Cómo funciona</h3>
                  <p className="text-sm text-gray-600">Aprende a usar la plataforma</p>
                </Card>
              </Link>
              <Link href="/contacto">
                <Card hover className="text-center h-full">
                  <div className="text-4xl mb-3">💬</div>
                  <h3 className="font-bold text-gray-900 mb-1">Contáctanos</h3>
                  <p className="text-sm text-gray-600">Habla con nuestro equipo</p>
                </Card>
              </Link>
              <Link href="/terminos">
                <Card hover className="text-center h-full">
                  <div className="text-4xl mb-3">📄</div>
                  <h3 className="font-bold text-gray-900 mb-1">Términos legales</h3>
                  <p className="text-sm text-gray-600">Políticas y términos</p>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Preguntas Frecuentes
              </h2>

              <div className="space-y-8">
                {faqs.map((section, sectionIndex) => (
                  <div key={sectionIndex}>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary-200">
                      {section.category}
                    </h3>
                    <div className="space-y-4">
                      {section.questions.map((faq, faqIndex) => (
                        <Card key={faqIndex}>
                          <h4 className="font-bold text-gray-900 mb-2 text-lg">
                            {faq.q}
                          </h4>
                          <p className="text-gray-600">{faq.a}</p>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿No encontraste lo que buscabas?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Nuestro equipo está listo para ayudarte
            </p>
            <Link href="/contacto">
              <Button size="lg">Contactar soporte</Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
