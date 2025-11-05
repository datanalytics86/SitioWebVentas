# 🏪 Directorio de Servicios - MVP

Plataforma marketplace para conectar clientes con proveedores de servicios profesionales. Especializado en clases, carpintería y servicios profesionales.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Stack Tecnológico](#stack-tecnológico)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [API Endpoints](#api-endpoints)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Testing](#testing)
- [Despliegue](#despliegue)
- [Roadmap](#roadmap)

## ✨ Características

### Funcionalidades Principales

- ✅ **Autenticación y Autorización**
  - Registro y login con JWT
  - Roles de usuario (cliente, proveedor, admin)
  - Refresh tokens para sesiones persistentes

- ✅ **Gestión de Servicios**
  - CRUD completo de servicios
  - Categorías y subcategorías jerárquicas
  - Imágenes múltiples por servicio
  - Estados de servicio (borrador, activo, pausado, archivado)

- ✅ **Búsqueda Avanzada**
  - Búsqueda por texto (título, descripción, proveedor)
  - Filtros por categoría, ciudad, precio, rating
  - Búsqueda geográfica por radio (distancia)
  - Ordenamiento por relevancia, rating, precio, fecha

- ✅ **Perfiles de Proveedor**
  - Información de negocio
  - Ubicación geográfica
  - Sistema de verificación
  - Estadísticas (rating promedio, total de reseñas)

- ✅ **Sistema de Seguridad**
  - Rate limiting en APIs
  - Validación de datos con Zod
  - Sanitización de inputs
  - CORS configurado
  - Middleware de autenticación

## 🚀 Stack Tecnológico

### Backend
- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Base de datos**: PostgreSQL 15
- **Cache**: Redis 7
- **Búsqueda**: Elasticsearch 8 (ready para implementar)

### Frontend
- **Framework**: React 18 + Next.js 14
- **Estilos**: Tailwind CSS
- **Fuentes**: Inter (Google Fonts)

### Infraestructura
- **Contenedores**: Docker + Docker Compose
- **Autenticación**: JWT (jsonwebtoken)
- **Validación**: Zod
- **Password Hashing**: bcryptjs

## 📦 Requisitos Previos

- Node.js 18+ y npm
- Docker y Docker Compose
- Git

## 🔧 Instalación

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd SitioWebVentas
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia el archivo de ejemplo y edita con tus valores:

```bash
cp .env.example .env.local
```

Variables críticas a configurar:

```env
# Database
DATABASE_URL=postgresql://servicios_user:dev_password_change_in_prod@localhost:5432/servicios_db

# Redis
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=dev_redis_password

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
REFRESH_TOKEN_SECRET=your_refresh_token_secret

# Next.js
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NODE_ENV=development
```

### 4. Iniciar servicios de infraestructura

```bash
docker-compose up -d
```

Esto iniciará:
- PostgreSQL en puerto 5432
- Redis en puerto 6379
- Elasticsearch en puerto 9200

### 5. Verificar que los servicios estén corriendo

```bash
# PostgreSQL
docker exec -it servicios_postgres pg_isready

# Redis
docker exec -it servicios_redis redis-cli ping

# Elasticsearch
curl http://localhost:9200/_cluster/health
```

### 6. Ejecutar migraciones de base de datos

Las migraciones se ejecutan automáticamente al iniciar Docker. Para verificar:

```bash
docker exec -it servicios_postgres psql -U servicios_user -d servicios_db -c "\dt"
```

### 7. Iniciar el servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: http://localhost:3000

## ⚙️ Configuración

### Configuración de Base de Datos

El esquema de base de datos se inicializa automáticamente desde `init-db/01-init.sql`.

Para resetear la base de datos:

```bash
docker-compose down -v
docker-compose up -d
```

### Configuración de Elasticsearch (Opcional)

Para habilitar búsqueda avanzada con Elasticsearch:

1. Asegúrate de que Elasticsearch esté corriendo
2. Crea el índice de servicios:

```bash
curl -X PUT "localhost:9200/services" -H 'Content-Type: application/json' -d'
{
  "mappings": {
    "properties": {
      "title": { "type": "text" },
      "description": { "type": "text" },
      "category": { "type": "keyword" },
      "price": { "type": "float" },
      "location": { "type": "geo_point" }
    }
  }
}
'
```

## 📖 Uso

### Registro de Usuario

**Cliente:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "cliente@example.com",
    "password": "Password123!",
    "full_name": "Juan Pérez",
    "role": "client"
  }'
```

**Proveedor:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "proveedor@example.com",
    "password": "Password123!",
    "full_name": "María García",
    "role": "provider"
  }'
```

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "proveedor@example.com",
    "password": "Password123!"
  }'
```

Respuesta:
```json
{
  "success": true,
  "data": {
    "user": { ... },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Crear un Servicio

```bash
curl -X POST http://localhost:3000/api/services/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "category_id": "uuid-de-categoria",
    "title": "Clases de Piano para Principiantes",
    "description": "Clases personalizadas de piano...",
    "short_description": "Aprende piano desde cero",
    "price": 250,
    "price_type": "hourly",
    "duration_minutes": 60
  }'
```

### Buscar Servicios

```bash
curl "http://localhost:3000/api/search?query=piano&city=Madrid&min_rating=4&sort_by=rating"
```

## 🔌 API Endpoints

### Autenticación

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Registrar nuevo usuario | No |
| POST | `/api/auth/login` | Iniciar sesión | No |
| POST | `/api/auth/refresh` | Refrescar token | No |
| GET | `/api/auth/me` | Obtener perfil actual | Sí |

### Categorías

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/categories` | Listar categorías | No |
| GET | `/api/categories/[slug]` | Obtener categoría por slug | No |

### Servicios

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/services` | Listar servicios | No |
| GET | `/api/services/[id]` | Obtener servicio por ID | No |
| POST | `/api/services/create` | Crear nuevo servicio | Sí (Provider) |
| PATCH | `/api/services/[id]` | Actualizar servicio | Sí (Owner) |
| DELETE | `/api/services/[id]` | Eliminar servicio | Sí (Owner/Admin) |

### Búsqueda

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/search` | Búsqueda avanzada de servicios | No |

**Parámetros de búsqueda:**
- `query` - Texto a buscar
- `category_id` - ID de categoría
- `city` - Ciudad
- `min_price`, `max_price` - Rango de precio
- `min_rating` - Rating mínimo
- `verified_only` - Solo proveedores verificados
- `latitude`, `longitude`, `radius_km` - Búsqueda geográfica
- `sort_by` - Ordenar por: relevance, rating, price_asc, price_desc, newest
- `page`, `limit` - Paginación

## 📁 Estructura del Proyecto

```
SitioWebVentas/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API Routes
│   │   │   ├── auth/         # Autenticación
│   │   │   ├── categories/   # Categorías
│   │   │   ├── services/     # Servicios
│   │   │   └── search/       # Búsqueda
│   │   ├── globals.css       # Estilos globales
│   │   ├── layout.tsx        # Layout principal
│   │   └── page.tsx          # Página de inicio
│   ├── components/            # Componentes React (próximamente)
│   ├── lib/                   # Utilidades y configuración
│   │   ├── auth/             # JWT, password hashing
│   │   ├── db/               # Configuración de BD
│   │   ├── utils/            # Helpers
│   │   └── validation/       # Schemas de validación
│   ├── middleware.ts          # Middleware de Next.js
│   └── types/                 # TypeScript types
├── init-db/                   # Scripts SQL
│   ├── 01-init.sql           # Schema inicial
│   └── 02-seed.sql           # Datos de prueba
├── public/                    # Archivos estáticos
├── docker-compose.yml         # Configuración Docker
├── next.config.js            # Configuración Next.js
├── tailwind.config.js        # Configuración Tailwind
├── tsconfig.json             # Configuración TypeScript
└── package.json              # Dependencias
```

## 🧪 Testing

### Configuración de Jest (Próximamente)

```bash
npm run test          # Ejecutar tests
npm run test:watch    # Modo watch
npm run test:coverage # Cobertura
```

### Tests Manuales con curl

Ver sección [Uso](#uso) para ejemplos de pruebas manuales de la API.

## 🚢 Despliegue

### Despliegue en Vercel

1. Conecta tu repositorio con Vercel
2. Configura las variables de entorno en el dashboard
3. Despliega:

```bash
npm run build
```

### Despliegue en Heroku

```bash
heroku create your-app-name
heroku addons:create heroku-postgresql:hobby-dev
heroku addons:create heroku-redis:hobby-dev
heroku config:set JWT_SECRET=your_secret
git push heroku main
```

### Checklist Pre-Despliegue

- [ ] Actualizar `JWT_SECRET` y `REFRESH_TOKEN_SECRET` con valores seguros
- [ ] Configurar `DATABASE_URL` de producción
- [ ] Habilitar SSL en PostgreSQL
- [ ] Configurar CORS para dominio de producción
- [ ] Ejecutar `npm audit` y resolver vulnerabilidades
- [ ] Verificar que `npm run build` funcione sin errores
- [ ] Configurar backups de base de datos
- [ ] Configurar monitoring (Sentry, LogRocket, etc.)

## 🗺️ Roadmap

### ✅ Fase 1 - MVP Completado
- [x] Setup inicial del proyecto
- [x] Base de datos y migraciones
- [x] Autenticación JWT
- [x] API de servicios (CRUD)
- [x] Búsqueda avanzada
- [x] Frontend básico (landing page)

### 🔄 Fase 2 - En Desarrollo
- [ ] Componentes React reutilizables
- [ ] Páginas de listado de servicios
- [ ] Página de detalle de servicio
- [ ] Perfil de proveedor
- [ ] Dashboard de usuario

### 📅 Fase 3 - Próximas Features
- [ ] Sistema de reservas/bookings
- [ ] Sistema de reseñas y ratings
- [ ] Sistema de favoritos
- [ ] Integración de pagos (Stripe)
- [ ] Chat en tiempo real
- [ ] Notificaciones por email
- [ ] Sistema de mensajería interna

### 🔮 Fase 4 - Optimizaciones
- [ ] Integración completa de Elasticsearch
- [ ] Caché avanzado con Redis
- [ ] Optimización de imágenes
- [ ] PWA (Progressive Web App)
- [ ] Tests automatizados (Jest + Testing Library)
- [ ] CI/CD con GitHub Actions
- [ ] Monitoreo y analytics

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es privado y no está disponible bajo ninguna licencia open-source.

## 📞 Contacto

Para preguntas o soporte, contacta a: admin@servicios.com

---

**Estado del Proyecto**: 🟢 MVP Funcional

**Última actualización**: Noviembre 2025
