import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card from '@/components/ui/Card';

export default function TerminosPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card>
              <div className="prose prose-primary max-w-none">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Términos y Condiciones
                </h1>
                <p className="text-gray-600 mb-8">
                  Última actualización: {new Date().toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  1. Aceptación de los Términos
                </h2>
                <p className="text-gray-700 mb-4">
                  Al acceder y utilizar Directorio de Servicios, usted acepta estar
                  sujeto a estos Términos y Condiciones. Si no está de acuerdo con
                  alguna parte de estos términos, no debe utilizar nuestros servicios.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  2. Descripción del Servicio
                </h2>
                <p className="text-gray-700 mb-4">
                  Directorio de Servicios es una plataforma que conecta a clientes
                  con proveedores de servicios profesionales. Actuamos como
                  intermediario facilitando el contacto entre ambas partes.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  3. Registro y Cuenta de Usuario
                </h2>
                <p className="text-gray-700 mb-4">
                  Para utilizar ciertas funcionalidades de la plataforma, debe
                  registrarse y crear una cuenta. Usted es responsable de:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                  <li>Proporcionar información veraz y actualizada</li>
                  <li>Mantener la confidencialidad de su contraseña</li>
                  <li>Todas las actividades que ocurran bajo su cuenta</li>
                  <li>Notificarnos inmediatamente sobre cualquier uso no autorizado</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  4. Responsabilidades de los Usuarios
                </h2>

                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
                  4.1 Para Clientes
                </h3>
                <p className="text-gray-700 mb-4">
                  Los clientes se comprometen a:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                  <li>Proporcionar información precisa sobre sus necesidades</li>
                  <li>Tratar a los proveedores con respeto</li>
                  <li>Cumplir con los acuerdos de pago establecidos</li>
                  <li>Dejar reseñas honestas y constructivas</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
                  4.2 Para Proveedores
                </h3>
                <p className="text-gray-700 mb-4">
                  Los proveedores se comprometen a:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                  <li>Proporcionar servicios de calidad conforme a lo ofrecido</li>
                  <li>Responder a las consultas de manera oportuna</li>
                  <li>Mantener actualizada la información de sus servicios</li>
                  <li>Cumplir con todas las leyes y regulaciones aplicables</li>
                  <li>Ser transparentes sobre precios y condiciones</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  5. Transacciones y Pagos
                </h2>
                <p className="text-gray-700 mb-4">
                  Los acuerdos de pago se realizan directamente entre clientes y
                  proveedores. Directorio de Servicios no participa en las
                  transacciones financieras y no se hace responsable de disputas de
                  pago entre las partes.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  6. Contenido del Usuario
                </h2>
                <p className="text-gray-700 mb-4">
                  Los usuarios son responsables del contenido que publican en la
                  plataforma. Al publicar contenido, usted otorga a Directorio de
                  Servicios una licencia no exclusiva para usar, reproducir y
                  mostrar dicho contenido.
                </p>
                <p className="text-gray-700 mb-4">
                  Nos reservamos el derecho de eliminar cualquier contenido que:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                  <li>Viole estos términos</li>
                  <li>Sea ofensivo o inapropiado</li>
                  <li>Infrinja derechos de propiedad intelectual</li>
                  <li>Contenga información falsa o engañosa</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  7. Limitación de Responsabilidad
                </h2>
                <p className="text-gray-700 mb-4">
                  Directorio de Servicios actúa como intermediario y no garantiza:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                  <li>La calidad de los servicios prestados por los proveedores</li>
                  <li>La veracidad de la información proporcionada por los usuarios</li>
                  <li>La disponibilidad ininterrumpida de la plataforma</li>
                  <li>Resultados específicos del uso de nuestros servicios</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  8. Propiedad Intelectual
                </h2>
                <p className="text-gray-700 mb-4">
                  Todo el contenido de la plataforma, incluyendo diseño, logotipos,
                  texto y software, es propiedad de Directorio de Servicios y está
                  protegido por leyes de propiedad intelectual.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  9. Modificaciones
                </h2>
                <p className="text-gray-700 mb-4">
                  Nos reservamos el derecho de modificar estos términos en cualquier
                  momento. Los cambios serán efectivos al publicarse en la
                  plataforma. El uso continuado de nuestros servicios constituye la
                  aceptación de los términos modificados.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  10. Terminación
                </h2>
                <p className="text-gray-700 mb-4">
                  Podemos suspender o terminar su cuenta si:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                  <li>Viola estos términos y condiciones</li>
                  <li>Participa en actividades fraudulentas</li>
                  <li>No cumple con las leyes aplicables</li>
                  <li>Recibimos quejas repetidas sobre su conducta</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  11. Ley Aplicable
                </h2>
                <p className="text-gray-700 mb-4">
                  Estos términos se regirán e interpretarán de acuerdo con las leyes
                  de México. Cualquier disputa se resolverá en los tribunales
                  competentes de México.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  12. Contacto
                </h2>
                <p className="text-gray-700 mb-4">
                  Si tiene preguntas sobre estos Términos y Condiciones, puede
                  contactarnos en:
                </p>
                <ul className="list-none text-gray-700 mb-4 space-y-2">
                  <li>Email: legal@directorioservicios.com</li>
                  <li>Teléfono: +52 55 1234 5678</li>
                </ul>

                <div className="mt-12 p-6 bg-primary-50 rounded-lg border-2 border-primary-200">
                  <p className="text-sm text-gray-700">
                    <strong>Nota importante:</strong> Estos términos y condiciones
                    son un modelo general. Se recomienda consultar con un abogado
                    para adaptar estos términos a su situación específica y
                    asegurarse de que cumplan con todas las leyes aplicables.
                  </p>
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
