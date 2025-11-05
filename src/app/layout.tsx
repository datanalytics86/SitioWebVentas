import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Directorio de Servicios - Encuentra profesionales en tu área',
  description:
    'Plataforma para conectar clientes con proveedores de servicios profesionales. Clases, carpintería, servicios profesionales y más.',
  keywords:
    'servicios, directorio, profesionales, clases, carpintería, servicios locales',
  authors: [{ name: 'Directorio de Servicios' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#2563eb',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
