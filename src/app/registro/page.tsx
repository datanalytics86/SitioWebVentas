'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

type UserType = 'client' | 'provider';

export default function RegisterPage() {
  const [userType, setUserType] = useState<UserType>('client');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    phone: '',
    // Provider specific
    business_name: '',
    business_description: '',
    city: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Implementar llamada a API
    setTimeout(() => {
      setIsLoading(false);
      alert('Registro exitoso (simulado)');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-br from-gray-50 to-primary-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Crea tu cuenta
            </h1>
            <p className="text-lg text-gray-600">
              Únete a nuestra comunidad y comienza hoy
            </p>
          </div>

          {/* User Type Selector */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-xl border-2 border-gray-200 bg-white p-1">
              <button
                type="button"
                onClick={() => setUserType('client')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  userType === 'client'
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Soy Cliente
              </button>
              <button
                type="button"
                onClick={() => setUserType('provider')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  userType === 'provider'
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Soy Proveedor
              </button>
            </div>
          </div>

          {/* Registration Form */}
          <Card className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Common Fields */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Información personal
                </h3>

                <Input
                  label="Nombre completo"
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="Juan Pérez"
                  required
                />

                <Input
                  label="Correo electrónico"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  required
                  leftIcon={
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  }
                />

                <Input
                  label="Teléfono"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 234 567 8900"
                  required
                  leftIcon={
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  }
                />

                <Input
                  label="Contraseña"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Mínimo 8 caracteres"
                  required
                  helperText="Debe contener al menos 8 caracteres"
                />

                <Input
                  label="Confirmar contraseña"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repite tu contraseña"
                  required
                  error={
                    formData.confirmPassword && formData.password !== formData.confirmPassword
                      ? 'Las contraseñas no coinciden'
                      : undefined
                  }
                />
              </div>

              {/* Provider Specific Fields */}
              {userType === 'provider' && (
                <div className="space-y-4 pt-4 border-t-2 border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Información del negocio
                  </h3>

                  <Input
                    label="Nombre del negocio"
                    type="text"
                    name="business_name"
                    value={formData.business_name}
                    onChange={handleChange}
                    placeholder="Mi Empresa S.A."
                    required={userType === 'provider'}
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descripción del negocio
                    </label>
                    <textarea
                      name="business_description"
                      value={formData.business_description}
                      onChange={handleChange}
                      placeholder="Describe tu negocio y los servicios que ofreces..."
                      rows={4}
                      required={userType === 'provider'}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <Input
                    label="Ciudad"
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Ciudad de México"
                    required={userType === 'provider'}
                    leftIcon={
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    }
                  />
                </div>
              )}

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="mt-1 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  Acepto los{' '}
                  <Link href="/terminos" className="text-primary-600 hover:underline">
                    términos y condiciones
                  </Link>{' '}
                  y la{' '}
                  <Link href="/privacidad" className="text-primary-600 hover:underline">
                    política de privacidad
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full"
                isLoading={isLoading}
              >
                {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
              </Button>

              {/* Login Link */}
              <p className="text-center text-sm text-gray-600">
                ¿Ya tienes una cuenta?{' '}
                <Link href="/login" className="font-semibold text-primary-600 hover:text-primary-700">
                  Inicia sesión aquí
                </Link>
              </p>
            </form>
          </Card>

          {/* Benefits Section */}
          {userType === 'provider' && (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  icon: '🚀',
                  title: 'Crece tu negocio',
                  description: 'Accede a miles de clientes potenciales',
                },
                {
                  icon: '⭐',
                  title: 'Construye reputación',
                  description: 'Recibe reseñas y aumenta tu credibilidad',
                },
                {
                  icon: '💰',
                  title: 'Sin comisiones',
                  description: 'Registro gratuito y sin costos ocultos',
                },
              ].map((benefit, index) => (
                <Card key={index} className="text-center">
                  <div className="text-4xl mb-3">{benefit.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
