# Directorio de Servicios Profesionales - Especificaciones Técnicas

## 1. CONTEXTO Y OBJETIVO

Desarrollar una plataforma web moderna para conectar clientes con proveedores de servicios profesionales, especializado en tres categorías principales:
- **Clases y Educación** (tutorías, idiomas, música, programación)
- **Carpintería** (muebles a medida, restauración, instalaciones)
- **Servicios Profesionales** (consultoría, diseño, marketing, etc.)

**Diferenciadores clave:**
- Diseño visual atractivo y moderno
- Experiencia de usuario fluida y sin fricción
- Búsqueda avanzada con filtros múltiples
- Georeferenciación para encontrar servicios cercanos
- Sistema de reseñas y calificaciones transparente
- Dashboard simple pero poderoso para proveedores

**Principios de diseño:**
- Visual first: diseño llamativo y profesional
- Simple para el usuario, poderoso en funcionalidad
- Mobile-first y 100% responsive
- Escalable y mantenible
- Seguridad por diseño

---

## 2. STACK TECNOLÓGICO

### Frontend
- **Framework**: Next.js 14 con App Router
- **Lenguaje**: TypeScript (strict mode)
- **Estilos**: Tailwind CSS + CSS Modules para componentes complejos
- **UI Components**: Componentes custom + Headless UI (opcional)
- **Iconos**: Lucide React
- **Animaciones**: Framer Motion
- **Formularios**: React Hook Form + Zod

### Backend
- **API**: Next.js API Routes (App Router)
- **Base de datos**: PostgreSQL 15 + PostGIS (georeferenciación)
- **Caché**: Redis 7
- **Búsqueda**: Elasticsearch 8.12
- **Storage**: Supabase Storage o AWS S3 (imágenes de servicios)
- **Auth**: JWT con refresh tokens

### Infraestructura
- **Deployment**: Vercel (frontend + API) + Supabase (database)
- **Contenedores**: Docker Compose (desarrollo local)
- **Monitoring**: Vercel Analytics + Sentry (errores)
- **CDN**: Vercel Edge Network

### Validación y Seguridad
- **Validación**: Zod para schemas
- **Password**: bcryptjs
- **Rate Limiting**: En middleware de Next.js
- **SQL Injection**: Prepared statements (pg)

---

## 3. ARQUITECTURA DE BASE DE DATOS

### Schema PostgreSQL (Ya implementado)

```sql
-- Extensiones
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "postgis"; -- Para geolocalización

-- ENUM types
CREATE TYPE user_role AS ENUM ('client', 'provider', 'admin');
CREATE TYPE service_status AS ENUM ('draft', 'active', 'paused', 'archived');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');

-- Usuarios
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    role user_role NOT NULL DEFAULT 'client',
    avatar_url TEXT,
    email_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Proveedores (perfil extendido)
CREATE TABLE providers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    business_name VARCHAR(255),
    description TEXT,
    website VARCHAR(255),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100) DEFAULT 'México',
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    verified BOOLEAN DEFAULT FALSE,
    average_rating DECIMAL(3, 2) DEFAULT 0.00,
    total_reviews INTEGER DEFAULT 0,
    total_bookings INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Categorías jerárquicas
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Servicios
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider_id UUID NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    short_description VARCHAR(500),
    price DECIMAL(10, 2),
    price_type VARCHAR(50) DEFAULT 'fixed', -- fixed, hourly, daily, custom
    duration_minutes INTEGER,
    status service_status DEFAULT 'draft',
    featured BOOLEAN DEFAULT FALSE,
    views_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(provider_id, slug)
);

-- Imágenes de servicios
CREATE TABLE service_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    alt_text VARCHAR(255),
    is_primary BOOLEAN DEFAULT FALSE,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Reservas/Bookings
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id UUID NOT NULL REFERENCES services(id) ON DELETE RESTRICT,
    client_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider_id UUID NOT NULL REFERENCES providers(id) ON DELETE RESTRICT,
    booking_date TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_minutes INTEGER,
    status booking_status DEFAULT 'pending',
    total_amount DECIMAL(10, 2),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Reseñas
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
    booking_id UUID UNIQUE REFERENCES bookings(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider_id UUID NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    response TEXT,
    response_date TIMESTAMP WITH TIME ZONE,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Favoritos
CREATE TABLE favorites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, service_id)
);

-- Índices para performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_providers_location ON providers(latitude, longitude);
CREATE INDEX idx_services_status ON services(status);
CREATE INDEX idx_services_featured ON services(featured);
CREATE INDEX idx_reviews_service ON reviews(service_id);
```

---

## 4. ESTRUCTURA DEL PROYECTO

```
SitioWebVentas/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (auth)/                   # Grupo de rutas de autenticación
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── registro/
│   │   │       └── page.tsx
│   │   ├── (dashboard)/              # Grupo de rutas protegidas
│   │   │   └── dashboard/
│   │   │       ├── page.tsx          # Dashboard principal
│   │   │       ├── servicios/
│   │   │       │   ├── page.tsx      # Lista de servicios
│   │   │       │   ├── nuevo/
│   │   │       │   │   └── page.tsx  # Crear servicio
│   │   │       │   └── [id]/
│   │   │       │       ├── page.tsx  # Editar servicio
│   │   │       │       └── reservas/
│   │   │       │           └── page.tsx
│   │   │       ├── perfil/
│   │   │       │   └── page.tsx
│   │   │       └── estadisticas/
│   │   │           └── page.tsx
│   │   ├── servicios/                # Rutas públicas
│   │   │   ├── page.tsx              # Listado de servicios
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx          # Detalle de servicio
│   │   │   └── categoria/
│   │   │       └── [slug]/
│   │   │           └── page.tsx
│   │   ├── proveedores/
│   │   │   └── [id]/
│   │   │       └── page.tsx          # Perfil público de proveedor
│   │   ├── buscar/
│   │   │   └── page.tsx              # Página de búsqueda avanzada
│   │   ├── api/                      # API Routes
│   │   │   ├── auth/
│   │   │   │   ├── register/route.ts
│   │   │   │   ├── login/route.ts
│   │   │   │   ├── refresh/route.ts
│   │   │   │   └── me/route.ts
│   │   │   ├── categories/
│   │   │   │   ├── route.ts
│   │   │   │   └── [slug]/route.ts
│   │   │   ├── services/
│   │   │   │   ├── route.ts
│   │   │   │   ├── create/route.ts
│   │   │   │   └── [id]/route.ts
│   │   │   ├── bookings/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/route.ts
│   │   │   ├── reviews/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/route.ts
│   │   │   ├── favorites/
│   │   │   │   ├── route.ts
│   │   │   │   └── [serviceId]/route.ts
│   │   │   ├── search/route.ts
│   │   │   └── upload/route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx                  # Landing page
│   ├── components/
│   │   ├── ui/                       # Componentes UI base
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Dropdown.tsx
│   │   │   └── Spinner.tsx
│   │   ├── layout/                   # Componentes de layout
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Container.tsx
│   │   ├── services/                 # Componentes de servicios
│   │   │   ├── ServiceCard.tsx
│   │   │   ├── ServiceGrid.tsx
│   │   │   ├── ServiceDetail.tsx
│   │   │   └── ServiceForm.tsx
│   │   ├── search/
│   │   │   ├── SearchBar.tsx
│   │   │   ├── FilterPanel.tsx
│   │   │   └── SortDropdown.tsx
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   └── RegisterForm.tsx
│   │   └── providers/
│   │       └── ProviderCard.tsx
│   ├── lib/
│   │   ├── auth/
│   │   │   ├── jwt.ts
│   │   │   └── password.ts
│   │   ├── db/
│   │   │   └── config.ts
│   │   ├── utils/
│   │   │   ├── api-response.ts
│   │   │   ├── slugify.ts
│   │   │   ├── format.ts             # Formateo de fechas, precios, etc.
│   │   │   └── constants.ts
│   │   └── validation/
│   │       └── schemas.ts
│   ├── hooks/                        # React hooks custom
│   │   ├── useAuth.ts
│   │   ├── useServices.ts
│   │   ├── useSearch.ts
│   │   └── useDebounce.ts
│   ├── context/                      # React Context providers
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   ├── middleware.ts
│   └── types/
│       └── index.ts
├── public/
│   ├── images/
│   │   ├── hero/
│   │   ├── categories/
│   │   └── placeholders/
│   └── icons/
├── init-db/
│   ├── 01-init.sql
│   └── 02-seed.sql
├── docker-compose.yml
├── .env.example
├── .env.local
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
├── README.md
├── SPECIFICATIONS.md
├── ARCHITECTURE.md
└── QAQC.md
```

---

## 5. FUNCIONALIDADES DETALLADAS

### 5.1 Para Clientes/Visitantes

#### Landing Page (/)
**Elementos visuales:**
- Hero section con gradiente vibrante y CTA destacado
- Barra de búsqueda prominente con autocompletado
- Carrusel de categorías con iconos coloridos
- Grid de servicios destacados (featured)
- Sección "Cómo funciona" con animaciones
- Testimonios de clientes con estrellas
- Footer completo con links y redes sociales

**Funcionalidad:**
- Búsqueda en tiempo real (debounced)
- Filtro rápido por categoría
- Lazy loading de imágenes
- Animaciones suaves al scroll

#### Exploración de Servicios (/servicios)
**Vista:**
- Grid/Lista responsive de tarjetas de servicio
- Panel lateral de filtros (sticky)
- Barra superior con ordenamiento
- Paginación infinita o numérica
- Skeleton loaders durante carga

**Filtros disponibles:**
- Categoría (multi-select)
- Rango de precio (slider)
- Tipo de jornada (Full-time, Part-time, etc.)
- Rating mínimo (estrellas)
- Ubicación (ciudad + radio de distancia)
- Proveedores verificados

**Ordenamiento:**
- Más relevantes
- Mejor calificados
- Precio: menor a mayor
- Precio: mayor a menor
- Más recientes

#### Detalle de Servicio (/servicios/[slug])
**Secciones:**
1. **Header**:
   - Título grande
   - Rating con estrellas + número de reseñas
   - Badge de categoría
   - Botón "Agregar a favoritos" (corazón animado)

2. **Galería de imágenes**:
   - Imagen principal grande
   - Thumbnails clickeables
   - Modal de galería completa (lightbox)

3. **Información principal**:
   - Descripción completa con formato
   - Precio destacado con badge
   - Duración estimada
   - Ubicación con mini-mapa

4. **Sobre el proveedor**:
   - Avatar + nombre
   - Rating + total de reseñas
   - Servicios activos
   - Link a perfil completo

5. **Reseñas**:
   - Promedio visual con estrellas grandes
   - Distribución de ratings (gráfico de barras)
   - Lista de reseñas con paginación
   - Filtro por rating

6. **CTA fijo** (sticky al scroll):
   - Botón "Contactar" o "Reservar"
   - Precio siempre visible

#### Búsqueda Avanzada (/buscar)
**Layout:**
- Columna izquierda: filtros expandibles
- Columna derecha: resultados + mapa
- Toggle vista mapa/lista

**Features:**
- Búsqueda por texto (título, descripción, proveedor)
- Búsqueda geográfica (mapa interactivo con marcadores)
- Guardar búsquedas (si está autenticado)
- Compartir URL de búsqueda

### 5.2 Para Proveedores

#### Registro de Proveedor (/registro?role=provider)
**Pasos del formulario:**
1. Datos de usuario (email, contraseña, nombre)
2. Datos de negocio (nombre empresa, descripción, ubicación)
3. Verificación de email
4. Bienvenida + tour del dashboard

#### Dashboard (/dashboard)
**Widgets:**
- Resumen de estadísticas (cards):
  - Total de servicios activos
  - Reservas pendientes
  - Rating promedio
  - Vistas este mes

- Gráfico de vistas/reservas (últimos 7 días)
- Lista de reservas recientes
- Acciones rápidas (botones):
  - + Nuevo servicio
  - Ver todas las reservas
  - Editar perfil

**Navegación lateral:**
- Dashboard
- Mis Servicios
- Reservas
- Reseñas
- Estadísticas
- Perfil
- Configuración

#### Gestión de Servicios (/dashboard/servicios)
**Vista tabla:**
- Columnas: Imagen, Título, Categoría, Precio, Estado, Vistas, Reservas, Acciones
- Filtros: por estado, categoría
- Búsqueda interna
- Acciones en lote (activar/desactivar)

**Crear/Editar Servicio:**
- Formulario paso a paso:
  1. Información básica (título, descripción, categoría)
  2. Precio y duración
  3. Imágenes (drag & drop, crop)
  4. Preview antes de publicar

#### Gestión de Reservas (/dashboard/servicios/[id]/reservas)
**Vista:**
- Calendario mensual con reservas marcadas
- Lista lateral con detalles
- Estados con colores:
  - Pendiente (amarillo)
  - Confirmada (verde)
  - Completada (azul)
  - Cancelada (rojo)

**Acciones:**
- Confirmar reserva
- Cancelar con motivo
- Marcar como completada
- Contactar cliente

### 5.3 Para Administradores

#### Panel Admin (/admin)
**Secciones:**
- Moderación de servicios (aprobar/rechazar)
- Gestión de usuarios (suspender, verificar)
- Estadísticas globales
- Gestión de categorías
- Reportes y logs

---

## 6. DISEÑO UI/UX

### 6.1 Sistema de Diseño

**Paleta de colores:**
```css
:root {
  /* Principales */
  --primary-50: #EFF6FF;
  --primary-100: #DBEAFE;
  --primary-200: #BFDBFE;
  --primary-300: #93C5FD;
  --primary-400: #60A5FA;
  --primary-500: #3B82F6;  /* Principal */
  --primary-600: #2563EB;
  --primary-700: #1D4ED8;
  --primary-800: #1E40AF;
  --primary-900: #1E3A8A;

  /* Neutros */
  --gray-50: #F9FAFB;
  --gray-100: #F3F4F6;
  --gray-200: #E5E7EB;
  --gray-300: #D1D5DB;
  --gray-400: #9CA3AF;
  --gray-500: #6B7280;
  --gray-600: #4B5563;
  --gray-700: #374151;
  --gray-800: #1F2937;
  --gray-900: #111827;

  /* Semánticos */
  --success: #10B981;
  --warning: #F59E0B;
  --error: #EF4444;
  --info: #3B82F6;

  /* Fondos */
  --background: #FFFFFF;
  --surface: #F9FAFB;
  --overlay: rgba(0, 0, 0, 0.5);
}
```

**Tipografía:**
```css
:root {
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-display: 'Inter', sans-serif; /* Para títulos grandes */

  /* Tamaños */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
  --text-5xl: 3rem;      /* 48px */
}
```

**Espaciado:**
- Sistema de 4px: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128
- Contenedores: max-width 1280px
- Padding lateral: 16px (mobile), 24px (tablet), 32px (desktop)

**Bordes y sombras:**
```css
:root {
  --radius-sm: 0.375rem;  /* 6px */
  --radius-md: 0.5rem;    /* 8px */
  --radius-lg: 0.75rem;   /* 12px */
  --radius-xl: 1rem;      /* 16px */
  --radius-2xl: 1.5rem;   /* 24px */

  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
}
```

### 6.2 Componentes Visuales Clave

#### ServiceCard
```tsx
<div className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
  {/* Imagen con overlay en hover */}
  <div className="relative h-48 overflow-hidden">
    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
    <div className="absolute top-2 right-2">
      <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white">
        ❤️
      </button>
    </div>
    {featured && <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">⭐ Destacado</div>}
  </div>

  {/* Contenido */}
  <div className="p-5">
    <div className="flex items-start justify-between mb-2">
      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">{title}</h3>
      <span className="text-xl font-bold text-primary-600">${price}</span>
    </div>

    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>

    <div className="flex items-center gap-4 mb-3">
      <div className="flex items-center gap-1">
        <span className="text-yellow-400">★★★★★</span>
        <span className="text-sm text-gray-600">{rating} ({reviews})</span>
      </div>
      <span className="text-sm text-gray-500">📍 {city}</span>
    </div>

    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img className="w-8 h-8 rounded-full" src={providerAvatar} />
        <span className="text-sm text-gray-700">{providerName}</span>
      </div>
      <button className="btn-primary">Ver detalles →</button>
    </div>
  </div>
</div>
```

#### Hero Section
```tsx
<section className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-purple-600 text-white py-20 overflow-hidden">
  {/* Decoración de fondo */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
  </div>

  <div className="container relative z-10">
    <div className="max-w-3xl mx-auto text-center">
      <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
        Encuentra los mejores servicios profesionales
      </h1>
      <p className="text-xl mb-8 text-primary-100">
        Conecta con expertos en clases, carpintería y servicios profesionales
      </p>

      {/* Barra de búsqueda destacada */}
      <div className="bg-white rounded-2xl shadow-2xl p-2 flex flex-col md:flex-row gap-2">
        <input
          type="text"
          placeholder="¿Qué servicio buscas?"
          className="flex-1 px-6 py-4 rounded-xl text-gray-900 focus:outline-none"
        />
        <input
          type="text"
          placeholder="Ciudad o código postal"
          className="flex-1 px-6 py-4 rounded-xl text-gray-900 focus:outline-none"
        />
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors">
          Buscar
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-8 mt-12">
        <div>
          <div className="text-4xl font-bold">500+</div>
          <div className="text-primary-100">Servicios</div>
        </div>
        <div>
          <div className="text-4xl font-bold">200+</div>
          <div className="text-primary-100">Proveedores</div>
        </div>
        <div>
          <div className="text-4xl font-bold">4.8★</div>
          <div className="text-primary-100">Rating promedio</div>
        </div>
      </div>
    </div>
  </div>
</section>
```

---

## 7. FLUJOS DE USUARIO

### Flujo Cliente: Encontrar y reservar servicio

1. **Landing** → Ve hero + categorías
2. **Explora** → Filtra por "Clases de Piano" en "Santiago"
3. **Resultados** → Ve 12 resultados, ordena por rating
4. **Detalle** → Click en servicio, ve galería, lee reseñas
5. **Decisión** → Click "Contactar proveedor"
6. **Registro rápido** → Email + nombre (opcional login social)
7. **Reserva** → Selecciona fecha/hora, confirma
8. **Confirmación** → Recibe email + notificación en app

### Flujo Proveedor: Publicar servicio

1. **Registro** → Se registra como proveedor
2. **Verificación** → Confirma email
3. **Perfil** → Completa datos de negocio + ubicación
4. **Dashboard** → Ve tour guiado
5. **Crear servicio** → Click "+ Nuevo servicio"
6. **Formulario paso 1** → Título, descripción, categoría
7. **Formulario paso 2** → Precio $250/hora, duración 60min
8. **Formulario paso 3** → Sube 3 fotos
9. **Preview** → Revisa cómo se ve
10. **Publicar** → Servicio pasa a estado "activo"
11. **Compartir** → Obtiene link para redes sociales

---

## 8. ANIMACIONES Y MICROINTERACCIONES

### Animaciones con Framer Motion

**Fade in al scroll:**
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: true }}
>
  {/* Contenido */}
</motion.div>
```

**Hover en cards:**
```tsx
<motion.div
  whileHover={{ scale: 1.02, y: -5 }}
  transition={{ type: "spring", stiffness: 300 }}
>
  <ServiceCard />
</motion.div>
```

**Botón con efecto ripple:**
```tsx
<motion.button
  whileTap={{ scale: 0.95 }}
  className="relative overflow-hidden"
>
  {/* Ripple effect */}
</motion.button>
```

**Modal con backdrop:**
```tsx
<AnimatePresence>
  {isOpen && (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed inset-0 flex items-center justify-center p-4"
      >
        <div className="bg-white rounded-2xl max-w-2xl w-full p-6">
          {/* Modal content */}
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>
```

---

## 9. CONFIGURACIÓN DE ELASTICSEARCH

### Crear índice de servicios

```json
PUT /services
{
  "settings": {
    "number_of_shards": 2,
    "number_of_replicas": 1,
    "analysis": {
      "analyzer": {
        "spanish_analyzer": {
          "type": "spanish"
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "id": { "type": "keyword" },
      "title": {
        "type": "text",
        "analyzer": "spanish_analyzer",
        "fields": {
          "keyword": { "type": "keyword" }
        }
      },
      "description": {
        "type": "text",
        "analyzer": "spanish_analyzer"
      },
      "category": { "type": "keyword" },
      "provider_name": { "type": "text" },
      "city": { "type": "keyword" },
      "price": { "type": "float" },
      "rating": { "type": "float" },
      "location": { "type": "geo_point" },
      "status": { "type": "keyword" },
      "created_at": { "type": "date" },
      "views_count": { "type": "integer" }
    }
  }
}
```

### Sincronización PostgreSQL → Elasticsearch

Crear función en PostgreSQL que envíe datos a Elasticsearch cuando cambia un servicio:

```typescript
// src/lib/elasticsearch/sync.ts
export async function syncServiceToElasticsearch(service: Service) {
  const doc = {
    id: service.id,
    title: service.title,
    description: service.description,
    category: service.category_name,
    provider_name: service.provider.business_name,
    city: service.provider.city,
    price: service.price,
    rating: service.average_rating,
    location: {
      lat: service.provider.latitude,
      lon: service.provider.longitude
    },
    status: service.status,
    created_at: service.created_at,
    views_count: service.views_count
  };

  await elasticsearchClient.index({
    index: 'services',
    id: service.id,
    document: doc
  });
}
```

---

## 10. SEGURIDAD Y VALIDACIONES

### Validación de Imágenes

```typescript
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export function validateImage(file: File): { valid: boolean; error?: string } {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { valid: false, error: 'Solo se permiten imágenes JPG, PNG o WebP' };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: 'La imagen no puede superar 5MB' };
  }

  return { valid: true };
}
```

### Rate Limiting por IP

```typescript
// src/middleware.ts
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(ip: string, maxRequests = 100, windowMs = 900000): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (entry.count >= maxRequests) {
    return false;
  }

  entry.count++;
  return true;
}
```

---

## 11. VARIABLES DE ENTORNO COMPLETAS

```env
# Database
DATABASE_URL=postgresql://servicios_user:password@localhost:5432/servicios_db
POSTGRES_USER=servicios_user
POSTGRES_PASSWORD=secure_password
POSTGRES_DB=servicios_db

# Redis
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=redis_password

# Elasticsearch
ELASTICSEARCH_NODE=http://localhost:9200
ELASTICSEARCH_USERNAME=elastic
ELASTICSEARCH_PASSWORD=elastic_password

# JWT
JWT_SECRET=super_secret_key_min_32_chars_change_in_prod
JWT_EXPIRATION=7d
REFRESH_TOKEN_SECRET=refresh_secret_min_32_chars
REFRESH_TOKEN_EXPIRATION=30d

# Next.js
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development

# Storage (Supabase o S3)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# AWS S3 (alternativa)
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
AWS_REGION=us-east-1
AWS_S3_BUCKET=servicios-images

# Email (Resend, SendGrid, etc.)
EMAIL_FROM=noreply@servicios.com
RESEND_API_KEY=re_xxx

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Sentry (errores)
SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx

# Stripe
STRIPE_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_xxx

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Security
BCRYPT_ROUNDS=10
ALLOWED_ORIGINS=http://localhost:3000
```

---

## 12. ROADMAP DE IMPLEMENTACIÓN

### Fase 1: MVP Básico (✅ COMPLETADO)
- [x] Setup del proyecto
- [x] Base de datos y migraciones
- [x] Autenticación JWT
- [x] API de servicios (CRUD)
- [x] API de búsqueda
- [x] Landing page básica

### Fase 2: Diseño Visual y Componentes (🔄 EN PROGRESO)
- [ ] Sistema de diseño completo
- [ ] Componentes UI reutilizables
- [ ] Landing page mejorada con animaciones
- [ ] Página de exploración de servicios
- [ ] Página de detalle de servicio
- [ ] Componentes de formularios

### Fase 3: Dashboard de Proveedor
- [ ] Layout del dashboard
- [ ] Gestión de servicios (CRUD visual)
- [ ] Formulario de creación de servicios
- [ ] Upload de imágenes con preview
- [ ] Estadísticas básicas

### Fase 4: Sistema de Reservas
- [ ] API de bookings
- [ ] Calendario de reservas
- [ ] Notificaciones por email
- [ ] Estado de reservas
- [ ] Dashboard de reservas

### Fase 5: Reseñas y Ratings
- [ ] API de reviews
- [ ] Sistema de calificación con estrellas
- [ ] Moderación de reseñas
- [ ] Respuestas de proveedores
- [ ] Agregación de ratings

### Fase 6: Búsqueda Avanzada
- [ ] Integración con Elasticsearch
- [ ] Autocomplete en búsqueda
- [ ] Filtros avanzados
- [ ] Búsqueda geográfica
- [ ] Guardar búsquedas

### Fase 7: Optimizaciones
- [ ] Caché con Redis
- [ ] Lazy loading de imágenes
- [ ] Server-side rendering optimizado
- [ ] PWA capabilities
- [ ] Optimización de bundle

### Fase 8: Features Adicionales
- [ ] Chat en tiempo real
- [ ] Pagos con Stripe
- [ ] Favoritos
- [ ] Compartir en redes sociales
- [ ] Notificaciones push
- [ ] Panel de admin

---

## 13. MÉTRICAS DE ÉXITO

### Performance
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **Time to Interactive**: < 3.5s
- **Lighthouse Score**: > 90

### Negocio
- **Tasa de conversión** (visitante → registro): > 5%
- **Tasa de conversión** (registro → primer servicio publicado): > 30%
- **Engagement** (tiempo en sitio): > 3 minutos
- **Bounce rate**: < 40%
- **Usuarios activos mensuales**: objetivo 1000 en 3 meses

### Técnicas
- **Uptime**: > 99.9%
- **API Response Time (p95)**: < 500ms
- **Error Rate**: < 0.1%
- **Build Time**: < 2 minutos

---

## 14. TESTING

### Unit Tests (Jest)
- Utilidades (slugify, format, validation)
- Funciones de auth (JWT, password)
- Schemas de Zod

### Integration Tests
- API endpoints
- Flujo de autenticación completo
- CRUD de servicios
- Búsqueda

### E2E Tests (Playwright - futuro)
- Flujo de registro
- Crear servicio
- Buscar y reservar

---

## 15. DOCUMENTACIÓN A MANTENER

- [x] README.md - Overview y setup
- [x] SPECIFICATIONS.md - Este documento
- [ ] ARCHITECTURE.md - Diagrama de arquitectura
- [ ] QAQC.md - Checklist de calidad
- [ ] API.md - Documentación de endpoints
- [ ] COMPONENTS.md - Catálogo de componentes

---

## Notas Finales

Este documento es **living documentation** - debe actualizarse conforme el proyecto evoluciona.

**Prioridades:**
1. **Visual first**: El diseño debe ser impactante
2. **Simple pero potente**: Fácil de usar, difícil de romper
3. **Performance**: Rápido en todas las plataformas
4. **Escalable**: Preparado para crecer

**Filosofía:** "Ship fast, iterate faster" 🚀
