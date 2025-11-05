// Categorías centralizadas - fuente única de verdad para todo el sistema
// Usar este archivo en lugar de definir categorías localmente

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  color: string;
  count: number;
  subcategories?: string[];
}

export const CATEGORIES: Category[] = [
  {
    id: 'clases-y-educacion',
    name: 'Clases y Educación',
    slug: 'clases-y-educacion',
    icon: '📚',
    description: 'Tutorías, idiomas, música y más',
    color: 'from-blue-500 to-cyan-500',
    count: 120,
    subcategories: [
      'Idiomas',
      'Música',
      'Tutorías escolares',
      'Desarrollo personal',
      'Deportes',
    ],
  },
  {
    id: 'carpinteria',
    name: 'Carpintería',
    slug: 'carpinteria',
    icon: '🔨',
    description: 'Muebles a medida, restauración',
    color: 'from-amber-500 to-orange-500',
    count: 85,
    subcategories: [
      'Muebles a medida',
      'Restauración',
      'Instalaciones',
      'Closets y cocinas',
      'Pisos de madera',
    ],
  },
  {
    id: 'servicios-profesionales',
    name: 'Servicios Profesionales',
    slug: 'servicios-profesionales',
    icon: '💼',
    description: 'Consultoría, diseño, marketing',
    color: 'from-purple-500 to-pink-500',
    count: 200,
    subcategories: [
      'Diseño gráfico',
      'Marketing digital',
      'Consultoría',
      'Fotografía',
      'Video producción',
    ],
  },
  {
    id: 'hogar-y-reparaciones',
    name: 'Hogar y Reparaciones',
    slug: 'hogar-y-reparaciones',
    icon: '🏠',
    description: 'Plomería, electricidad, pintura',
    color: 'from-green-500 to-emerald-500',
    count: 150,
    subcategories: [
      'Plomería',
      'Electricidad',
      'Pintura',
      'Aire acondicionado',
      'Jardinería',
    ],
  },
  {
    id: 'belleza-y-bienestar',
    name: 'Belleza y Bienestar',
    slug: 'belleza-y-bienestar',
    icon: '💅',
    description: 'Peluquería, spa, masajes',
    color: 'from-pink-500 to-rose-500',
    count: 95,
    subcategories: [
      'Peluquería',
      'Manicure y pedicure',
      'Masajes',
      'Spa',
      'Maquillaje',
    ],
  },
  {
    id: 'tecnologia',
    name: 'Tecnología',
    slug: 'tecnologia',
    icon: '💻',
    description: 'Reparación, desarrollo, soporte',
    color: 'from-indigo-500 to-blue-500',
    count: 110,
    subcategories: [
      'Reparación de computadoras',
      'Desarrollo web',
      'Soporte técnico',
      'Instalación de software',
      'Redes y sistemas',
    ],
  },
  {
    id: 'automotriz',
    name: 'Automotriz',
    slug: 'automotriz',
    icon: '🚗',
    description: 'Mecánica, detallado, accesorios',
    color: 'from-red-500 to-orange-500',
    count: 75,
    subcategories: [
      'Mecánica general',
      'Detallado y lavado',
      'Instalación de accesorios',
      'Pintura automotriz',
      'Hojalatería',
    ],
  },
  {
    id: 'eventos',
    name: 'Eventos',
    slug: 'eventos',
    icon: '🎉',
    description: 'Fiestas, catering, decoración',
    color: 'from-yellow-500 to-amber-500',
    count: 90,
    subcategories: [
      'Catering',
      'Decoración',
      'Fotografía de eventos',
      'DJ y música',
      'Organización',
    ],
  },
];

// Helper para obtener categoría por slug
export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((cat) => cat.slug === slug);
}

// Helper para obtener solo los nombres de las categorías
export function getCategoryNames(): string[] {
  return CATEGORIES.map((cat) => cat.name);
}

// Helper para obtener opciones de select
export function getCategoryOptions() {
  return [{ value: '', label: 'Todas las categorías' }].concat(
    CATEGORIES.map((cat) => ({
      value: cat.slug,
      label: cat.name,
    }))
  );
}
