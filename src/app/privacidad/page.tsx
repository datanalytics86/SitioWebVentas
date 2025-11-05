import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card from '@/components/ui/Card';

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card>
              <div className="prose prose-primary max-w-none">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Política de Privacidad
                </h1>
                <p className="text-gray-600 mb-8">
                  Última actualización: {new Date().toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>

                <p className="text-gray-700 mb-6">
                  En Directorio de Servicios, valoramos y respetamos su privacidad.
                  Esta Política de Privacidad describe cómo recopilamos, usamos,
                  compartimos y protegemos su información personal.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  1. Información que Recopilamos
                </h2>

                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
                  1.1 Información que usted proporciona
                </h3>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                  <li>
                    <strong>Datos de registro:</strong> Nombre, correo electrónico,
                    teléfono, contraseña
                  </li>
                  <li>
                    <strong>Información de perfil:</strong> Foto de perfil,
                    ubicación, descripción del negocio (para proveedores)
                  </li>
                  <li>
                    <strong>Información de servicios:</strong> Descripciones,
                    precios, fotos, categorías
                  </li>
                  <li>
                    <strong>Comunicaciones:</strong> Mensajes, reseñas, comentarios
                  </li>
                  <li>
                    <strong>Información de pago:</strong> Aunque no procesamos pagos
                    directamente, podemos recibir información de confirmación
                  </li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
                  1.2 Información recopilada automáticamente
                </h3>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                  <li>Dirección IP y ubicación geográfica</li>
                  <li>Tipo de dispositivo y navegador</li>
                  <li>Páginas visitadas y tiempo de navegación</li>
                  <li>Cookies y tecnologías similares</li>
                  <li>Datos de uso de la plataforma</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  2. Cómo Usamos su Información
                </h2>
                <p className="text-gray-700 mb-4">
                  Utilizamos su información personal para:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                  <li>Proporcionar, mantener y mejorar nuestros servicios</li>
                  <li>Crear y gestionar su cuenta de usuario</li>
                  <li>Facilitar la conexión entre clientes y proveedores</li>
                  <li>Procesar y responder a sus consultas</li>
                  <li>Enviar notificaciones importantes sobre el servicio</li>
                  <li>Personalizar su experiencia en la plataforma</li>
                  <li>Detectar y prevenir fraudes y abusos</li>
                  <li>Cumplir con obligaciones legales</li>
                  <li>Enviar comunicaciones de marketing (con su consentimiento)</li>
                  <li>Analizar el uso de la plataforma y generar estadísticas</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  3. Cómo Compartimos su Información
                </h2>
                <p className="text-gray-700 mb-4">
                  Compartimos su información en las siguientes circunstancias:
                </p>

                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
                  3.1 Con otros usuarios
                </h3>
                <p className="text-gray-700 mb-4">
                  Su información de perfil público (nombre, foto, servicios, reseñas)
                  es visible para otros usuarios de la plataforma.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
                  3.2 Con proveedores de servicios
                </h3>
                <p className="text-gray-700 mb-4">
                  Compartimos información con terceros que nos ayudan a operar la
                  plataforma, como:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                  <li>Servicios de hosting y almacenamiento</li>
                  <li>Servicios de análisis y estadísticas</li>
                  <li>Servicios de email y notificaciones</li>
                  <li>Servicios de seguridad y prevención de fraudes</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
                  3.3 Por requisitos legales
                </h3>
                <p className="text-gray-700 mb-4">
                  Podemos divulgar su información si es requerido por ley o para:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                  <li>Cumplir con procesos legales</li>
                  <li>Proteger nuestros derechos y propiedad</li>
                  <li>Prevenir fraudes o actividades ilegales</li>
                  <li>Proteger la seguridad de los usuarios</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  4. Cookies y Tecnologías Similares
                </h2>
                <p className="text-gray-700 mb-4">
                  Utilizamos cookies y tecnologías similares para:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                  <li>Mantener su sesión iniciada</li>
                  <li>Recordar sus preferencias</li>
                  <li>Analizar el uso de la plataforma</li>
                  <li>Personalizar el contenido y los anuncios</li>
                  <li>Mejorar la seguridad</li>
                </ul>
                <p className="text-gray-700 mb-4">
                  Puede configurar su navegador para rechazar cookies, pero esto puede
                  afectar la funcionalidad de la plataforma.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  5. Sus Derechos de Privacidad
                </h2>
                <p className="text-gray-700 mb-4">
                  Usted tiene derecho a:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                  <li>
                    <strong>Acceder:</strong> Solicitar una copia de su información
                    personal
                  </li>
                  <li>
                    <strong>Rectificar:</strong> Corregir información inexacta o
                    incompleta
                  </li>
                  <li>
                    <strong>Eliminar:</strong> Solicitar la eliminación de su
                    información
                  </li>
                  <li>
                    <strong>Portabilidad:</strong> Recibir su información en un
                    formato estructurado
                  </li>
                  <li>
                    <strong>Oposición:</strong> Oponerse al procesamiento de su
                    información
                  </li>
                  <li>
                    <strong>Restricción:</strong> Solicitar la limitación del
                    procesamiento
                  </li>
                  <li>
                    <strong>Retirar consentimiento:</strong> Cuando el procesamiento
                    se base en su consentimiento
                  </li>
                </ul>
                <p className="text-gray-700 mb-4">
                  Para ejercer estos derechos, contáctenos en
                  privacidad@directorioservicios.com
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  6. Seguridad de la Información
                </h2>
                <p className="text-gray-700 mb-4">
                  Implementamos medidas de seguridad técnicas y organizativas para
                  proteger su información, incluyendo:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                  <li>Encriptación de datos en tránsito y en reposo</li>
                  <li>Controles de acceso estrictos</li>
                  <li>Monitoreo de seguridad continuo</li>
                  <li>Auditorías de seguridad regulares</li>
                  <li>Capacitación del personal en protección de datos</li>
                </ul>
                <p className="text-gray-700 mb-4">
                  Sin embargo, ningún sistema es completamente seguro. Le recomendamos
                  usar contraseñas fuertes y mantener su información de inicio de
                  sesión confidencial.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  7. Retención de Datos
                </h2>
                <p className="text-gray-700 mb-4">
                  Conservamos su información personal mientras:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                  <li>Mantenga una cuenta activa con nosotros</li>
                  <li>Sea necesario para proporcionar nuestros servicios</li>
                  <li>Sea requerido por ley</li>
                  <li>Sea necesario para resolver disputas</li>
                  <li>Sea necesario para hacer cumplir nuestros acuerdos</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  8. Privacidad de Menores
                </h2>
                <p className="text-gray-700 mb-4">
                  Nuestros servicios no están dirigidos a menores de 18 años. No
                  recopilamos intencionalmente información de menores. Si descubrimos
                  que hemos recopilado información de un menor, la eliminaremos de
                  inmediato.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  9. Transferencias Internacionales
                </h2>
                <p className="text-gray-700 mb-4">
                  Su información puede ser transferida y procesada en países distintos
                  al suyo. Nos aseguramos de que estas transferencias cumplan con las
                  leyes aplicables de protección de datos.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  10. Cambios a esta Política
                </h2>
                <p className="text-gray-700 mb-4">
                  Podemos actualizar esta Política de Privacidad periódicamente. Le
                  notificaremos sobre cambios significativos mediante un aviso en la
                  plataforma o por correo electrónico. La fecha de la última
                  actualización se mostrará al inicio de esta política.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  11. Contacto
                </h2>
                <p className="text-gray-700 mb-4">
                  Si tiene preguntas o inquietudes sobre esta Política de Privacidad o
                  nuestras prácticas de privacidad, contáctenos en:
                </p>
                <ul className="list-none text-gray-700 mb-4 space-y-2">
                  <li>Email: privacidad@directorioservicios.com</li>
                  <li>Teléfono: +52 55 1234 5678</li>
                  <li>
                    Dirección: Av. Reforma 123, Ciudad de México, CDMX, México
                  </li>
                </ul>

                <div className="mt-12 p-6 bg-primary-50 rounded-lg border-2 border-primary-200">
                  <p className="text-sm text-gray-700">
                    <strong>Nota importante:</strong> Esta política de privacidad es
                    un modelo general. Se recomienda consultar con un abogado
                    especializado en protección de datos para adaptar esta política a
                    su situación específica y asegurarse de que cumpla con todas las
                    leyes aplicables (GDPR, CCPA, LFPDPPP, etc.).
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
