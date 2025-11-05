'use client';

import Link from 'next/link';
import { useState } from 'react';
import Button from '../ui/Button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">DS</span>
            </div>
            <span className="hidden sm:block text-xl font-bold text-gray-900">
              Directorio de Servicios
            </span>
            <span className="sm:hidden text-xl font-bold text-gray-900">DS</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/servicios"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Explorar Servicios
            </Link>
            <Link
              href="/categorias"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Categorías
            </Link>
            <Link
              href="/como-funciona"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Cómo funciona
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link href="/login">
              <Button variant="ghost">Iniciar Sesión</Button>
            </Link>
            <Link href="/registro">
              <Button variant="primary">Registrarse</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <Link
                href="/servicios"
                className="text-gray-700 hover:text-primary-600 font-medium py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Explorar Servicios
              </Link>
              <Link
                href="/categorias"
                className="text-gray-700 hover:text-primary-600 font-medium py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Categorías
              </Link>
              <Link
                href="/como-funciona"
                className="text-gray-700 hover:text-primary-600 font-medium py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Cómo funciona
              </Link>
              <div className="pt-3 border-t border-gray-200 space-y-2">
                <Link href="/login" className="block">
                  <Button variant="ghost" className="w-full">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link href="/registro" className="block">
                  <Button variant="primary" className="w-full">
                    Registrarse
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
