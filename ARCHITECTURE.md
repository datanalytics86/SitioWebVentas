# Architecture Overview - Directorio de Servicios
*Living document to provide rapid and comprehensive understanding of the codebase architecture.*

**Last Updated:** 2025-11-05

---

## 1. Project Structure

```
SitioWebVentas/
├── src/
│   ├── app/                          # Next.js 14 App Router
│   │   ├── (auth)/                   # Auth route group (login, registro)
│   │   ├── (dashboard)/              # Protected routes (dashboard, servicios)
│   │   ├── servicios/                # Public service pages
│   │   ├── api/                      # API Routes (REST endpoints)
│   │   ├── globals.css               # Global styles + Tailwind
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Landing page
│   ├── components/
│   │   ├── ui/                       # Base UI components (Button, Input, Card)
│   │   ├── layout/                   # Layout components (Header, Footer)
│   │   ├── services/                 # Service-specific components
│   │   ├── search/                   # Search and filter components
│   │   └── auth/                     # Authentication forms
│   ├── lib/
│   │   ├── auth/                     # JWT, password hashing
│   │   ├── db/                       # Database config (PostgreSQL, Redis, ES)
│   │   ├── utils/                    # Helper functions
│   │   └── validation/               # Zod schemas
│   ├── hooks/                        # React custom hooks
│   ├── context/                      # React Context providers
│   ├── middleware.ts                 # Next.js middleware (auth, rate limiting)
│   └── types/                        # TypeScript type definitions
├── init-db/                          # SQL migrations and seeds
├── public/                           # Static assets
├── docker-compose.yml                # Local infrastructure
└── [config files]                    # Next, TS, Tailwind, ESLint configs
```

**Key Organizational Principles:**
- **Colocation:** Components near their usage
- **Route groups:** `(auth)`, `(dashboard)` for layouts without URL segments
- **API Routes:** RESTful structure under `/api`
- **Type safety:** Shared types in `/src/types`

---

## 2. High-Level System Diagram

```
┌─────────────┐
│   Cliente   │
│  (Browser)  │
└──────┬──────┘
       │ HTTPS
       ▼
┌─────────────────────────────────────────────┐
│          Next.js Application                │
│  ┌──────────────┐     ┌─────────────────┐  │
│  │   Frontend   │────▶│   API Routes    │  │
│  │  (React/TSX) │     │  (/api/*)       │  │
│  └──────────────┘     └────────┬────────┘  │
│                                 │           │
└─────────────────────────────────┼───────────┘
                                  │
                ┌─────────────────┼─────────────────┐
                ▼                 ▼                 ▼
         ┌─────────────┐   ┌──────────┐    ┌──────────────┐
         │ PostgreSQL  │   │  Redis   │    │ Elasticsearch│
         │   (+PostGIS)│   │ (Cache)  │    │  (Search)    │
         └─────────────┘   └──────────┘    └──────────────┘
                │
                ▼
        [Supabase Storage]
         (Images/Files)
```

**Data Flow:**
1. User interacts with React frontend
2. Frontend calls `/api/*` endpoints
3. API routes validate (Zod) → authenticate (JWT) → query DB
4. PostgreSQL stores relational data
5. Redis caches frequently accessed data
6. Elasticsearch powers full-text search
7. Supabase Storage hosts images

---

## 3. Core Components

### 3.1. Frontend Application

**Name:** Next.js 14 React Application

**Description:** Server-side rendered (SSR) and statically generated (SSG) web application providing the user interface for browsing services, authentication, and provider dashboard.

**Technologies:**
- Next.js 14 (App Router, React Server Components)
- TypeScript 5.4
- Tailwind CSS 3.4
- Framer Motion (animations)
- React Hook Form + Zod (forms)

**Key Features:**
- Hybrid rendering (SSR + SSG + CSR)
- Optimized images with `next/image`
- API routes for backend logic
- Middleware for auth and rate limiting

**Deployment:** Vercel (auto-deploy from Git)

---

### 3.2. Backend Services

#### 3.2.1. Authentication Service

**Endpoints:**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Token refresh
- `GET /api/auth/me` - Current user profile

**Technologies:**
- JWT (jsonwebtoken)
- bcryptjs (password hashing)
- Zod (validation)

**Security:**
- Passwords hashed with bcrypt (10 rounds)
- JWT with 7-day expiration
- Refresh tokens (30-day expiration)
- HttpOnly cookies for tokens (future)

---

#### 3.2.2. Services Management API

**Endpoints:**
- `GET /api/services` - List services (with filters)
- `GET /api/services/[id]` - Service details
- `POST /api/services/create` - Create service (auth required)
- `PATCH /api/services/[id]` - Update service (owner only)
- `DELETE /api/services/[id]` - Delete service (owner/admin)

**Technologies:**
- PostgreSQL (primary storage)
- Elasticsearch (search indexing)
- Zod (input validation)

**Business Logic:**
- Auto-generate unique slugs
- Increment view counts
- Calculate average ratings
- Validate ownership before mutations

---

#### 3.2.3. Search API

**Endpoint:** `GET /api/search`

**Query Parameters:**
- `query` - Text search
- `category_id` - Filter by category
- `city` - Filter by city
- `min_price`, `max_price` - Price range
- `min_rating` - Minimum rating
- `verified_only` - Only verified providers
- `latitude`, `longitude`, `radius_km` - Geo search
- `sort_by` - Sort order
- `page`, `limit` - Pagination

**Technologies:**
- PostgreSQL (primary query)
- PostGIS (geospatial queries)
- Elasticsearch (future: full-text search)

**Performance:**
- Indexed queries (<100ms)
- Cursor-based pagination (future)

---

#### 3.2.4. Categories API

**Endpoints:**
- `GET /api/categories` - List all categories
- `GET /api/categories/[slug]` - Category by slug

**Features:**
- Hierarchical structure (parent/child)
- Pre-seeded with common categories
- Subcategories support

---

## 4. Data Stores

### 4.1. PostgreSQL 15

**Type:** Relational Database

**Purpose:** Primary data storage for all entities

**Key Schemas:**
- `users` - User accounts
- `providers` - Provider profiles
- `services` - Service listings
- `categories` - Service categories (hierarchical)
- `bookings` - Service reservations
- `reviews` - User reviews and ratings
- `favorites` - User saved services
- `service_images` - Service image URLs

**Extensions:**
- `uuid-ossp` - UUID generation
- `pgcrypto` - Cryptographic functions
- `postgis` - Geospatial data (lat/lng)

**Deployment:** Supabase (managed PostgreSQL)

---

### 4.2. Redis 7

**Type:** In-memory key-value store

**Purpose:** Caching layer for frequently accessed data

**Use Cases:**
- Session storage
- API response caching
- Rate limiting counters
- Recently viewed services

**Deployment:** Docker (local), Redis Cloud or Upstash (production)

---

### 4.3. Elasticsearch 8.12

**Type:** Search engine

**Purpose:** Full-text search and advanced queries

**Index Structure:**
```json
{
  "services": {
    "title": "text (Spanish analyzer)",
    "description": "text",
    "category": "keyword",
    "city": "keyword",
    "location": "geo_point",
    "price": "float",
    "rating": "float"
  }
}
```

**Deployment:** Docker (local), Elastic Cloud (production)

**Status:** Configured but not yet integrated (future phase)

---

### 4.4. Supabase Storage

**Type:** Object storage (S3-compatible)

**Purpose:** Image and file storage

**Buckets:**
- `service-images` - Service photos (public read, authenticated write)
- `avatars` - User profile pictures
- `documents` - PDFs, contracts (private)

**Features:**
- Automatic image optimization
- CDN delivery
- Access control via RLS

---

## 5. External Integrations / APIs

### 5.1. Vercel Analytics
**Purpose:** Web vitals and performance monitoring
**Integration:** Environment variable + Script tag

### 5.2. Sentry (Planned)
**Purpose:** Error tracking and monitoring
**Integration:** SDK + DSN configuration

### 5.3. Resend / SendGrid (Planned)
**Purpose:** Transactional emails
**Integration:** REST API

### 5.4. Stripe (Planned)
**Purpose:** Payment processing
**Integration:** Stripe SDK + Webhooks

---

## 6. Deployment & Infrastructure

**Cloud Provider:** Vercel (frontend + API) + Supabase (database)

**Architecture:**
```
GitHub Repo
    │
    ├─▶ Vercel (auto-deploy on push to main)
    │       ├─ Next.js App (SSR + Edge Functions)
    │       └─ API Routes
    │
    └─▶ Supabase
            ├─ PostgreSQL (PostGIS enabled)
            ├─ Storage (images)
            └─ Auth (future integration)
```

**CI/CD Pipeline:**
- **Trigger:** Push to `main` branch
- **Build:** `npm run build` (Next.js)
- **Checks:** ESLint, TypeScript, Build success
- **Deploy:** Vercel automatic deployment
- **Rollback:** Instant rollback via Vercel dashboard

**Environments:**
- **Development:** Local (Docker Compose)
- **Preview:** Vercel preview deployments (per PR)
- **Production:** Vercel production domain

**Monitoring & Logging:**
- Vercel Analytics (performance)
- Vercel Logs (runtime errors)
- Sentry (future: error tracking)

---

## 7. Security Considerations

**Authentication:**
- JWT tokens (stateless)
- Refresh token rotation
- Role-based access control (RBAC)

**Authorization:**
- Middleware checks on protected routes
- Ownership validation (user can only edit their own services)
- Admin-only endpoints

**Data Protection:**
- TLS 1.3 in transit (HTTPS)
- Password hashing with bcrypt
- Prepared statements (SQL injection prevention)
- Input validation with Zod
- CORS configured (allowed origins)

**Rate Limiting:**
- 100 requests per 15 minutes per IP
- Stored in-memory (development) / Redis (production)

**Security Headers:**
- CSP (Content Security Policy)
- HSTS (HTTP Strict Transport Security)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff

---

## 8. Development & Testing Environment

**Local Setup:**
```bash
# Clone repo
git clone <repo-url>
cd SitioWebVentas

# Install dependencies
npm install

# Start infrastructure (PostgreSQL, Redis, Elasticsearch)
docker-compose up -d

# Run migrations
# (Auto-run via Docker init-db)

# Start dev server
npm run dev
```

**Environment Variables:**
- `.env.example` - Template with all required vars
- `.env.local` - Local development (gitignored)

**Testing Frameworks:**
- **Unit:** Jest + React Testing Library (planned)
- **Integration:** Supertest for API routes (planned)
- **E2E:** Playwright (future)

**Code Quality:**
- **Linter:** ESLint (Next.js config)
- **Formatter:** Prettier (planned)
- **Type Checker:** TypeScript strict mode

---

## 9. Future Considerations / Roadmap

### Short-term (1-2 months)
- [ ] Elasticsearch integration for advanced search
- [ ] Redis caching layer
- [ ] Image optimization pipeline
- [ ] Email notifications (booking confirmations)

### Mid-term (3-6 months)
- [ ] Real-time chat (WebSockets)
- [ ] Payment integration (Stripe)
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard

### Long-term (6+ months)
- [ ] Multi-language support (i18n)
- [ ] AI-powered service recommendations
- [ ] Video testimonials
- [ ] Subscription plans for providers

### Technical Debt
- Migrate to Server Actions (Next.js 14 feature)
- Implement proper caching strategy
- Add comprehensive test suite
- Set up automated performance monitoring

---

## 10. Project Identification

**Project Name:** Directorio de Servicios Profesionales

**Repository:** https://github.com/datanalytics86/SitioWebVentas

**Branch:** `claude/stelace-services-directory-mvp-011CUptSdFrDbXEM7c4K32Bf`

**Primary Contact:** Development Team

**Tech Stack Summary:**
- Frontend: Next.js 14 + TypeScript + Tailwind
- Backend: Next.js API Routes
- Database: PostgreSQL 15 + PostGIS
- Cache: Redis 7
- Search: Elasticsearch 8.12
- Deployment: Vercel + Supabase

**Current Phase:** MVP Implementation (Phase 2: Visual Design)

**Date of Last Update:** 2025-11-05

---

## 11. Glossary / Acronyms

| Term | Definition |
|------|------------|
| **MVP** | Minimum Viable Product |
| **SSR** | Server-Side Rendering |
| **SSG** | Static Site Generation |
| **CSR** | Client-Side Rendering |
| **JWT** | JSON Web Token |
| **RBAC** | Role-Based Access Control |
| **RLS** | Row Level Security (Supabase) |
| **PostGIS** | PostgreSQL extension for geographic objects |
| **CORS** | Cross-Origin Resource Sharing |
| **CDN** | Content Delivery Network |
| **ORM** | Object-Relational Mapping |
| **API** | Application Programming Interface |
| **CRUD** | Create, Read, Update, Delete |
| **ESLint** | JavaScript/TypeScript linter |
| **PWA** | Progressive Web App |

---

## 12. Architecture Decision Records (ADRs)

### ADR-001: Why Next.js App Router?
**Decision:** Use Next.js 14 App Router instead of Pages Router

**Rationale:**
- Built-in Server Components (better performance)
- Streaming and Suspense support
- Simplified data fetching
- Better TypeScript support
- Colocation of components and routes

**Consequences:**
- Learning curve for new paradigm
- Some third-party libs may not support RSC yet
- Migration from Pages Router requires refactoring

**Status:** Accepted

---

### ADR-002: Why PostgreSQL over MongoDB?
**Decision:** Use PostgreSQL as primary database

**Rationale:**
- Relational data model fits our domain (users, services, bookings)
- ACID compliance for transactional data
- PostGIS for geospatial queries
- Strong ecosystem and tooling
- Better for complex queries and joins

**Consequences:**
- Schema migrations required for changes
- Less flexibility than document stores
- Need to manage indexes carefully

**Status:** Accepted

---

### ADR-003: JWT vs Session-based Auth
**Decision:** Use JWT tokens for authentication

**Rationale:**
- Stateless (no session store required initially)
- Works well with API routes
- Easier to scale horizontally
- Refresh token strategy for security

**Consequences:**
- Token size larger than session IDs
- Cannot instantly revoke tokens (need blacklist)
- Requires secure storage on client

**Status:** Accepted

---

## 13. Performance Targets

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| **Lighthouse Score** | >90 | TBD | 🟡 Pending |
| **LCP** | <2.5s | TBD | 🟡 Pending |
| **FID** | <100ms | TBD | 🟡 Pending |
| **CLS** | <0.1 | TBD | 🟡 Pending |
| **API Response (p95)** | <500ms | ~200ms | ✅ Good |
| **Build Time** | <2min | 45s | ✅ Excellent |
| **Bundle Size (First Load)** | <200KB | 87KB | ✅ Excellent |

---

## 14. Team & Responsibilities

| Role | Responsibilities |
|------|------------------|
| **Full-Stack Developer** | All features, API, DB, Frontend |
| **DevOps** | Deployment, monitoring, infrastructure |
| **QA** | Testing, bug reporting, quality assurance |

**Current Team Size:** Solo developer (Claude-assisted)

---

## 15. Dependencies Map

```
Critical Dependencies:
├─ next (14.2.33)
├─ react (18.3.0)
├─ typescript (5.4.0)
├─ pg (8.11.0)                  [PostgreSQL client]
├─ redis (4.6.0)                [Redis client]
├─ @elastic/elasticsearch (8.12.0)
├─ jsonwebtoken (9.0.2)         [JWT auth]
├─ bcryptjs (2.4.3)             [Password hashing]
├─ zod (3.22.0)                 [Validation]
└─ tailwindcss (3.4.0)          [Styling]

Dev Dependencies:
├─ jest (29.7.0)
├─ @testing-library/react (14.2.0)
└─ eslint (8.57.0)
```

---

## 16. Data Flow Diagrams

### User Registration Flow
```
Client                API Route              Database
  │                      │                      │
  ├─ POST /api/auth/register ─▶               │
  │                      │                      │
  │                      ├─ Validate (Zod)     │
  │                      │                      │
  │                      ├─ Check email exists ▶
  │                      │                      │
  │                      ◀─ Email available ────┤
  │                      │                      │
  │                      ├─ Hash password       │
  │                      │                      │
  │                      ├─ INSERT user + provider ▶
  │                      │                      │
  │                      ◀─ User created ────────┤
  │                      │                      │
  │                      ├─ Generate JWT        │
  │                      │                      │
  │◀─ Return { user, token } ─┤                │
```

### Service Search Flow
```
Client                API Route              PostgreSQL        Elasticsearch
  │                      │                      │                    │
  ├─ GET /api/search?query=piano&city=Madrid ─▶│                   │
  │                      │                      │                    │
  │                      ├─ Parse & validate    │                    │
  │                      │                      │                    │
  │                      ├─ Build SQL query ───▶│                   │
  │                      │                      │                    │
  │                      │        (Future: Query Elasticsearch) ────▶│
  │                      │                      │                    │
  │                      ◀─ Results ─────────────┤                   │
  │                      │                      │                    │
  │                      ├─ Format response     │                    │
  │                      │                      │                    │
  │◀─ Return paginated results ─┤              │                    │
```

---

## 17. Monitoring & Observability

**Metrics Collected:**
- Request count by endpoint
- Response time (p50, p95, p99)
- Error rate
- Active users
- Database query performance
- Cache hit/miss ratio

**Tools:**
- Vercel Analytics (built-in)
- Sentry (error tracking - planned)
- Custom logging in API routes

**Alerts:**
- Error rate > 1%
- Response time p95 > 1s
- Database connection failures

---

**End of Architecture Document**

*This document should be updated whenever significant architectural changes are made.*
