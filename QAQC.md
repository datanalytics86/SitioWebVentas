# Quality Assurance & Quality Control - Directorio de Servicios

Este documento define los estándares de calidad, checklists de validación y procesos de testing para garantizar un producto robusto y libre de errores.

**Última actualización:** 2025-11-05

---

## 📋 Índice

1. [Checklist Pre-Commit](#1-checklist-pre-commit)
2. [Checklist Pre-Deploy](#2-checklist-pre-deploy)
3. [Testing Estrategia](#3-testing-estrategia)
4. [Performance Benchmarks](#4-performance-benchmarks)
5. [Seguridad Checklist](#5-seguridad-checklist)
6. [Accesibilidad (a11y)](#6-accesibilidad-a11y)
7. [SEO Checklist](#7-seo-checklist)
8. [Cross-Browser Testing](#8-cross-browser-testing)
9. [Responsive Design Validation](#9-responsive-design-validation)
10. [Code Quality Metrics](#10-code-quality-metrics)

---

## 1. Checklist Pre-Commit

Verificar **antes de cada commit** al repositorio:

### Código
- [ ] ✅ No hay errores de TypeScript (`npm run build`)
- [ ] ✅ ESLint pasa sin errores (`npm run lint`)
- [ ] ✅ No hay `console.log()` o debuggers olvidados
- [ ] ✅ Imports organizados y sin duplicados
- [ ] ✅ Variables sin usar eliminadas
- [ ] ✅ Nombres descriptivos en funciones y variables

### Funcionalidad
- [ ] ✅ Feature probada manualmente en navegador
- [ ] ✅ Flujo completo funciona (happy path)
- [ ] ✅ Edge cases manejados (validaciones, errores)
- [ ] ✅ Mensajes de error claros y útiles
- [ ] ✅ Loading states implementados

### Estilos
- [ ] ✅ Responsive en mobile (320px), tablet (768px), desktop (1280px)
- [ ] ✅ No hay estilos inline (usar Tailwind/CSS modules)
- [ ] ✅ Colores de diseño system usados (no hardcoded)
- [ ] ✅ Espaciado consistente (múltiplos de 4px)

### Seguridad
- [ ] ✅ No hay API keys o secrets en código
- [ ] ✅ Inputs validados con Zod
- [ ] ✅ SQL queries usan prepared statements
- [ ] ✅ Auth checks en rutas protegidas

### Documentación
- [ ] ✅ Comentarios JSDoc en funciones complejas
- [ ] ✅ README actualizado si cambia setup
- [ ] ✅ SPECIFICATIONS actualizado si cambian requisitos

---

## 2. Checklist Pre-Deploy

Verificar **antes de deployment a producción**:

### Build & Compilation
- [ ] 🚀 `npm run build` completa sin errores
- [ ] 🚀 `npm run build` completa sin warnings críticos
- [ ] 🚀 Bundle size < 200KB (First Load JS)
- [ ] 🚀 Todas las env vars de producción configuradas
- [ ] 🚀 `.env.example` actualizado con nuevas variables

### Testing
- [ ] 🚀 Tests unitarios pasan (`npm test`)
- [ ] 🚀 Tests de integración pasan
- [ ] 🚀 Tests E2E críticos pasan (futuro)
- [ ] 🚀 No hay tests skipeados sin justificación

### Database
- [ ] 🚀 Migraciones de BD ejecutadas en staging
- [ ] 🚀 Seeds de producción listos (categorías, admin user)
- [ ] 🚀 Backup de BD realizado
- [ ] 🚀 Índices de BD optimizados
- [ ] 🚀 RLS policies configuradas (si usa Supabase)

### Seguridad
- [ ] 🚀 `npm audit` no muestra vulnerabilidades críticas
- [ ] 🚀 Dependencias actualizadas (major versions testeadas)
- [ ] 🚀 HTTPS habilitado en producción
- [ ] 🚀 CORS configurado correctamente
- [ ] 🚀 Rate limiting activo
- [ ] 🚀 Headers de seguridad configurados (CSP, HSTS)
- [ ] 🚀 Secrets rotados (JWT_SECRET, DB passwords)

### Performance
- [ ] 🚀 Lighthouse Score > 90 (Performance)
- [ ] 🚀 LCP < 2.5s
- [ ] 🚀 FID < 100ms
- [ ] 🚀 CLS < 0.1
- [ ] 🚀 Imágenes optimizadas (WebP, lazy loading)
- [ ] 🚀 Caché configurado (Redis si aplica)

### Monitoring
- [ ] 🚀 Sentry configurado (error tracking)
- [ ] 🚀 Vercel Analytics activo
- [ ] 🚀 Logs centralizados configurados
- [ ] 🚀 Alertas de uptime configuradas

### Funcionalidad
- [ ] 🚀 Flujos críticos testeados end-to-end:
  - [ ] Registro de usuario
  - [ ] Login
  - [ ] Crear servicio
  - [ ] Búsqueda de servicios
  - [ ] Detalle de servicio
- [ ] 🚀 Emails transaccionales funcionando (si aplica)
- [ ] 🚀 Pagos funcionando en modo sandbox (si aplica)

### UX
- [ ] 🚀 Loading spinners en todas las acciones async
- [ ] 🚀 Mensajes de error user-friendly
- [ ] 🚀 404 page custom
- [ ] 🚀 500 page custom
- [ ] 🚀 Favicon y metadata correctos

### Legal
- [ ] 🚀 Política de privacidad visible
- [ ] 🚀 Términos y condiciones actualizados
- [ ] 🚀 GDPR compliance (si aplica)
- [ ] 🚀 Cookie banner (si necesario)

### Rollback Plan
- [ ] 🚀 Plan de rollback documentado
- [ ] 🚀 Backup de código (Git tag)
- [ ] 🚀 Backup de base de datos
- [ ] 🚀 Proceso de rollback testeado en staging

---

## 3. Testing Estrategia

### 3.1 Unit Tests (Jest)

**Objetivo:** Testear funciones puras y lógica de negocio

**Cobertura mínima:** 80% en archivos de `/lib`

**Ejemplos:**
```typescript
// src/lib/utils/slugify.test.ts
describe('slugify', () => {
  it('should convert text to slug', () => {
    expect(slugify('Clases de Piano')).toBe('clases-de-piano');
  });

  it('should handle special characters', () => {
    expect(slugify('Café & Té')).toBe('cafe-te');
  });
});

// src/lib/auth/password.test.ts
describe('validatePasswordStrength', () => {
  it('should reject weak passwords', () => {
    const result = validatePasswordStrength('12345');
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Password must be at least 8 characters');
  });
});
```

**Archivos a testear:**
- `/lib/utils/*`
- `/lib/auth/*`
- `/lib/validation/*`
- Funciones helpers

---

### 3.2 Integration Tests

**Objetivo:** Testear endpoints de API completos

**Herramienta:** Supertest + Jest

**Ejemplos:**
```typescript
// __tests__/api/auth/register.test.ts
describe('POST /api/auth/register', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'Test123!',
        full_name: 'Test User'
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.token).toBeDefined();
  });

  it('should reject duplicate email', async () => {
    // ... duplicate email test
  });
});
```

**Endpoints críticos a testear:**
- Auth (register, login, refresh)
- Services CRUD
- Search API
- Bookings
- Reviews

---

### 3.3 E2E Tests (Playwright - Futuro)

**Objetivo:** Testear flujos de usuario completos en navegador real

**Herramienta:** Playwright

**Flujos críticos:**
```typescript
test('User can register and create a service', async ({ page }) => {
  // 1. Go to home
  await page.goto('/');

  // 2. Click "Registrarse"
  await page.click('text=Registrarse');

  // 3. Fill form
  await page.fill('[name=email]', 'provider@test.com');
  await page.fill('[name=password]', 'Test123!');
  // ...

  // 4. Submit
  await page.click('button[type=submit]');

  // 5. Verify redirect to dashboard
  await expect(page).toHaveURL('/dashboard');

  // 6. Create service
  await page.click('text=Nuevo Servicio');
  // ... fill service form

  // 7. Verify service appears in list
  await expect(page.locator('text=Mi Nuevo Servicio')).toBeVisible();
});
```

**Flujos a implementar:**
- [ ] Registro de usuario
- [ ] Login
- [ ] Crear servicio
- [ ] Editar servicio
- [ ] Búsqueda de servicios
- [ ] Agregar a favoritos
- [ ] Crear reserva
- [ ] Escribir reseña

---

## 4. Performance Benchmarks

### 4.1 Métricas Objetivo

| Métrica | Objetivo | Crítico | Método de medición |
|---------|----------|---------|-------------------|
| **Lighthouse Performance** | >90 | >70 | Chrome DevTools |
| **LCP** (Largest Contentful Paint) | <2.5s | <4s | Web Vitals |
| **FID** (First Input Delay) | <100ms | <300ms | Web Vitals |
| **CLS** (Cumulative Layout Shift) | <0.1 | <0.25 | Web Vitals |
| **TTI** (Time to Interactive) | <3.5s | <5s | Lighthouse |
| **Bundle Size (First Load)** | <200KB | <500KB | Next.js build output |
| **API Response Time (p95)** | <500ms | <1s | Manual testing |

### 4.2 Cómo medir

**Lighthouse:**
```bash
# Instalar lighthouse CLI
npm install -g lighthouse

# Correr en producción
lighthouse https://tu-sitio.com --view
```

**Web Vitals:**
```tsx
// Agregar en _app.tsx
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

export function reportWebVitals(metric) {
  console.log(metric);
  // Enviar a analytics
}
```

**Bundle Size:**
```bash
npm run build
# Ver output: "First Load JS shared by all"
```

### 4.3 Optimizaciones si no cumple

**Si LCP > 2.5s:**
- Optimizar imágenes hero (usar WebP, blur placeholder)
- Preload fonts críticas
- Lazy load imágenes below the fold
- Server-side rendering (SSR) para contenido above the fold

**Si FID > 100ms:**
- Code splitting más agresivo
- Defer JavaScript no crítico
- Optimizar event handlers

**Si CLS > 0.1:**
- Definir `width` y `height` en imágenes
- Reservar espacio para ads/embeds
- Evitar insertar contenido dinámico above the fold

**Si Bundle > 200KB:**
- Tree shaking (eliminar código no usado)
- Code splitting por ruta
- Lazy load componentes pesados
- Optimizar dependencias (usar alternativas más ligeras)

---

## 5. Seguridad Checklist

### 5.1 Autenticación & Autorización
- [x] Passwords hasheados con bcrypt (≥10 rounds)
- [x] JWT con expiración (7 días access, 30 días refresh)
- [ ] HttpOnly cookies para tokens (más seguro que localStorage)
- [x] Refresh token rotation
- [ ] Account lockout tras 5 intentos fallidos
- [ ] Email verification requerida
- [ ] Password reset flow seguro (token de un solo uso)

### 5.2 Input Validation
- [x] Todos los inputs validados con Zod
- [x] Sanitización de HTML en descripciones
- [x] File upload validado (tipo, tamaño)
- [ ] Image upload verificado (no executable code en EXIF)
- [x] SQL Injection prevenido (prepared statements)
- [ ] XSS prevenido (React escapa por defecto, validar `dangerouslySetInnerHTML`)

### 5.3 API Security
- [x] Rate limiting implementado (100 req/15min)
- [ ] CSRF protection (para forms con cookies)
- [x] CORS configurado (allowlist de origins)
- [ ] API keys rotados regularmente
- [ ] Secrets en variables de entorno (nunca en código)
- [ ] Logs no contienen información sensible

### 5.4 Database Security
- [ ] RLS (Row Level Security) habilitado en Supabase
- [x] Prepared statements para todas las queries
- [ ] Backups automáticos diarios
- [ ] Encriptación at-rest (PostgreSQL TDE)
- [ ] Conexiones con SSL/TLS
- [ ] Principio de menor privilegio (usuario BD con permisos mínimos)

### 5.5 Headers de Seguridad
```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; ..."
  }
];
```

### 5.6 Dependency Security
```bash
# Auditar dependencias
npm audit

# Fix vulnerabilidades automáticamente
npm audit fix

# Revisar dependencias desactualizadas
npm outdated

# Usar Snyk para monitoreo continuo
npx snyk test
```

---

## 6. Accesibilidad (a11y)

### 6.1 WCAG 2.1 Level AA

**Objetivo:** Cumplir con WCAG 2.1 AA en todas las páginas

**Herramientas:**
- Axe DevTools (Chrome extension)
- Lighthouse Accessibility score
- WAVE (Web Accessibility Evaluation Tool)

### 6.2 Checklist

#### Semántica HTML
- [ ] Uso correcto de headings (h1, h2, h3 jerárquico)
- [ ] Landmarks ARIA (nav, main, aside, footer)
- [ ] Listas para contenido de lista (ul, ol)
- [ ] Botones son `<button>`, no `<div onclick>`
- [ ] Links son `<a>`, no `<div>` con cursor pointer

#### Keyboard Navigation
- [ ] Todos los elementos interactivos accesibles con Tab
- [ ] Orden de tab lógico
- [ ] Focus visible (outline no removido)
- [ ] Modals trapean focus
- [ ] Escape cierra modals
- [ ] Enter/Space activan botones

#### Contraste de Colores
- [ ] Texto > 4.5:1 con fondo (AA)
- [ ] Texto grande > 3:1 (AA)
- [ ] Componentes UI > 3:1 (AA)
- [ ] Herramienta: WebAIM Contrast Checker

#### Imágenes
- [ ] Todas las imágenes tienen `alt` descriptivo
- [ ] Imágenes decorativas tienen `alt=""`
- [ ] Iconos tienen `aria-label` si no hay texto

#### Formularios
- [ ] Todos los inputs tienen `<label>` asociado
- [ ] Errores descriptivos
- [ ] Atributo `aria-invalid` en inputs con error
- [ ] `aria-describedby` para hint text

#### Responsive
- [ ] Zoom hasta 200% no rompe layout
- [ ] No scroll horizontal en mobile
- [ ] Touch targets ≥44x44px (iOS guidelines)

#### Screen Readers
- [ ] Loading states anunciados (`aria-live="polite"`)
- [ ] Cambios dinámicos anunciados
- [ ] Skip to main content link
- [ ] No reliance on color alone

### 6.3 Testing con Screen Reader

**Herramientas:**
- **macOS:** VoiceOver (Cmd+F5)
- **Windows:** NVDA (free)
- **iOS:** VoiceOver
- **Android:** TalkBack

**Flujos a testear:**
- [ ] Navegación por página con Tab
- [ ] Lectura completa de página
- [ ] Completar un formulario
- [ ] Interactuar con modal/dropdown

---

## 7. SEO Checklist

### 7.1 On-Page SEO

#### Meta Tags
- [ ] `<title>` único y descriptivo (50-60 caracteres)
- [ ] Meta description (150-160 caracteres)
- [ ] Meta viewport configurado
- [ ] Canonical URL definido
- [ ] Open Graph tags (Facebook/LinkedIn)
  ```html
  <meta property="og:title" content="..." />
  <meta property="og:description" content="..." />
  <meta property="og:image" content="..." />
  <meta property="og:url" content="..." />
  ```
- [ ] Twitter Card tags
  ```html
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="..." />
  ```

#### Contenido
- [ ] H1 único por página
- [ ] Jerarquía de headings lógica
- [ ] URLs amigables (slugs legibles)
- [ ] Internal linking
- [ ] Alt text en imágenes (también ayuda SEO)

#### Technical SEO
- [ ] Sitemap.xml generado
  ```typescript
  // src/app/sitemap.ts
  export default function sitemap() {
    return [
      {
        url: 'https://tu-sitio.com',
        lastModified: new Date(),
      },
      {
        url: 'https://tu-sitio.com/servicios',
        lastModified: new Date(),
      },
      // ...
    ];
  }
  ```
- [ ] Robots.txt configurado
  ```
  # public/robots.txt
  User-agent: *
  Allow: /
  Sitemap: https://tu-sitio.com/sitemap.xml
  ```
- [ ] 404 pages con código 404 (no 200)
- [ ] Redirects 301 (no 302) para URLs antiguas
- [ ] HTTPS habilitado
- [ ] Velocidad de carga < 3s

#### Structured Data (Schema.org)
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Clases de Piano",
  "description": "...",
  "provider": {
    "@type": "Organization",
    "name": "Academia Musical XYZ"
  },
  "offers": {
    "@type": "Offer",
    "price": "250",
    "priceCurrency": "MXN"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "42"
  }
}
```

### 7.2 SEO Testing

**Google Search Console:**
- [ ] Sitio verificado
- [ ] Sitemap enviado
- [ ] Cobertura de índice monitoreado
- [ ] Core Web Vitals revisados

**Tools:**
- [ ] Google PageSpeed Insights
- [ ] Ahrefs/SEMrush (keywords)
- [ ] Screaming Frog (crawl analysis)

---

## 8. Cross-Browser Testing

### 8.1 Navegadores Objetivo

| Navegador | Versión mínima | Market Share | Prioridad |
|-----------|---------------|--------------|-----------|
| Chrome | Últimas 2 | 65% | 🔴 Alta |
| Safari | Últimas 2 | 18% | 🔴 Alta |
| Firefox | Últimas 2 | 8% | 🟡 Media |
| Edge | Últimas 2 | 5% | 🟡 Media |
| Safari iOS | iOS 14+ | 12% | 🔴 Alta |
| Chrome Android | Últimas 2 | 10% | 🟡 Media |

### 8.2 Features a verificar

- [ ] Layout (flexbox, grid)
- [ ] Animations (CSS, Framer Motion)
- [ ] Forms (validation, autofill)
- [ ] Image loading (lazy, srcset)
- [ ] JavaScript features (async/await, optional chaining)
- [ ] Web fonts
- [ ] Service Worker (PWA - futuro)

### 8.3 Herramientas

**BrowserStack:** Testing en navegadores reales
**Sauce Labs:** Automated cross-browser testing
**Polyfills:** core-js para features modernas

---

## 9. Responsive Design Validation

### 9.1 Breakpoints

```css
/* Tailwind defaults */
sm:  640px  /* Tablet portrait */
md:  768px  /* Tablet landscape */
lg:  1024px /* Desktop */
xl:  1280px /* Large desktop */
2xl: 1536px /* Extra large */
```

### 9.2 Dispositivos a testear

| Dispositivo | Resolución | Viewport | Prioridad |
|-------------|-----------|----------|-----------|
| iPhone SE | 375x667 | 375x553 | 🔴 Alta |
| iPhone 12/13/14 | 390x844 | 390x664 | 🔴 Alta |
| iPad | 768x1024 | 768x954 | 🟡 Media |
| iPad Pro | 1024x1366 | 1024x1296 | 🟠 Baja |
| Desktop 1080p | 1920x1080 | 1920x969 | 🔴 Alta |
| Desktop 4K | 3840x2160 | 3840x2049 | 🟠 Baja |

### 9.3 Checklist por dispositivo

**Mobile (320px - 767px)**
- [ ] Texto legible sin zoom
- [ ] Botones ≥44x44px (touch target)
- [ ] Menú hamburguesa funcional
- [ ] Imágenes no se desbordan
- [ ] Forms usables sin zoom
- [ ] No scroll horizontal

**Tablet (768px - 1023px)**
- [ ] Layout optimizado (2 columnas)
- [ ] Navegación apropiada
- [ ] Imágenes tamaño adecuado

**Desktop (1024px+)**
- [ ] Max-width container (1280px)
- [ ] Sidebar visible
- [ ] Hover states funcionan
- [ ] Multi-columna donde tenga sentido

---

## 10. Code Quality Metrics

### 10.1 Métricas objetivo

| Métrica | Objetivo | Herramienta |
|---------|----------|-------------|
| **Test Coverage** | >80% | Jest |
| **Cyclomatic Complexity** | <10 per function | ESLint complexity rule |
| **Duplicación de código** | <3% | SonarQube |
| **TypeScript strict** | 100% | tsconfig.json |
| **ESLint errors** | 0 | ESLint |
| **Bundle size** | <200KB | Next.js build |

### 10.2 Code Review Checklist

**Arquitectura:**
- [ ] Sigue arquitectura establecida (App Router)
- [ ] Componentes en carpeta correcta
- [ ] No hay lógica de negocio en componentes (usar hooks/services)
- [ ] Server Components vs Client Components bien usados

**TypeScript:**
- [ ] No uso de `any` (usar `unknown` si necesario)
- [ ] Tipos definidos para props
- [ ] Interfaces exportadas en `/types`
- [ ] Enums para valores fijos

**React:**
- [ ] No hay prop drilling >2 niveles (usar Context/Zustand)
- [ ] Keys en listas son únicas y estables
- [ ] useEffect con dependencias correctas
- [ ] Memoization apropiada (useMemo, useCallback, React.memo)
- [ ] No hay re-renders innecesarios

**Performance:**
- [ ] Imágenes optimizadas (next/image)
- [ ] Lazy loading de componentes pesados
- [ ] Debounce en búsquedas
- [ ] Infinite scroll o paginación (no cargar todo)

**Seguridad:**
- [ ] No hay secrets en código
- [ ] Inputs validados
- [ ] Auth checks en lugar correcto

**Accesibilidad:**
- [ ] Elementos semánticos
- [ ] ARIA labels donde necesario
- [ ] Keyboard navigation

**Estilo:**
- [ ] Tailwind classes ordenadas (usar prettier-plugin-tailwindcss)
- [ ] No estilos inline
- [ ] Consistente con design system

---

## 11. Definition of Done (DoD)

Una feature está **DONE** cuando:

### Desarrollo
- [x] Código escrito siguiendo estándares del proyecto
- [x] TypeScript compila sin errores
- [x] ESLint pasa
- [x] Tests unitarios escritos y pasando
- [x] Tests de integración escritos (si aplica)
- [x] Code review aprobado

### Funcionalidad
- [x] Feature funciona en desarrollo
- [x] Feature funciona en staging
- [x] Edge cases manejados
- [x] Errores tienen mensajes claros
- [x] Loading states implementados

### UX/UI
- [x] Diseño match con mockups/wireframes
- [x] Responsive en mobile/tablet/desktop
- [x] Animaciones suaves (no janky)
- [x] Accesible (keyboard + screen reader)

### Performance
- [x] No degrada performance (Lighthouse)
- [x] Imágenes optimizadas
- [x] No memory leaks

### Documentación
- [x] README actualizado (si cambió setup)
- [x] Componente documentado (si es reutilizable)
- [x] API endpoint documentado (si es nuevo)
- [x] SPECIFICATIONS actualizado (si cambió requisito)

### Deploy
- [x] Merged a `main`
- [x] Deployed a producción
- [x] Smoke test en producción pasó
- [x] Monitoreo activo (sin errores nuevos)

---

## 12. Bug Report Template

Cuando encuentres un bug, reporta así:

```markdown
### Bug: [Título descriptivo]

**Severidad:** 🔴 Crítico | 🟡 Alto | 🟢 Medio | 🔵 Bajo

**Descripción:**
Descripción clara del problema.

**Pasos para reproducir:**
1. Ir a `/servicios`
2. Click en "Filtrar por categoría"
3. Seleccionar "Clases"
4. Observar que no filtra

**Comportamiento esperado:**
Debería filtrar servicios de categoría "Clases"

**Comportamiento actual:**
No filtra nada, muestra todos los servicios

**Entorno:**
- Browser: Chrome 120
- OS: macOS 14
- Device: MacBook Pro
- URL: https://sitio.com/servicios

**Screenshots/Video:**
[Adjuntar si posible]

**Console errors:**
```
TypeError: Cannot read property 'id' of undefined
  at FilterPanel.tsx:42
```

**Posible causa:**
Variable `selectedCategory` no inicializada

**Prioridad:**
Alta - bloquea funcionalidad principal
```

---

## 13. Continuous Improvement

### 13.1 Retrospectivas

**Cada 2 semanas:**
- ¿Qué funcionó bien?
- ¿Qué puede mejorar?
- ¿Qué bloqueos hubo?
- ¿Deuda técnica a abordar?

### 13.2 Métricas a trackear

**Semanalmente:**
- Bugs creados vs bugs cerrados
- Test coverage trend
- Build time trend
- Deploy frequency
- Mean time to recovery (MTTR)

**Mensualmente:**
- Lighthouse scores trend
- User satisfaction (NPS)
- Performance metrics (p95 response time)
- Security audit results

---

## 14. Resources & Tools

### Testing
- **Jest:** https://jestjs.io/
- **Testing Library:** https://testing-library.com/
- **Playwright:** https://playwright.dev/

### Performance
- **Lighthouse:** https://developers.google.com/web/tools/lighthouse
- **WebPageTest:** https://webpagetest.org/
- **Bundle Analyzer:** https://www.npmjs.com/package/@next/bundle-analyzer

### Accessibility
- **axe DevTools:** https://www.deque.com/axe/devtools/
- **WAVE:** https://wave.webaim.org/
- **Contrast Checker:** https://webaim.org/resources/contrastchecker/

### Security
- **npm audit:** Built-in
- **Snyk:** https://snyk.io/
- **OWASP ZAP:** https://www.zaproxy.org/

### SEO
- **Google Search Console:** https://search.google.com/search-console
- **Screaming Frog:** https://www.screamingfrog.co.uk/seo-spider/

---

**End of QA/QC Document**

*Mantener este documento actualizado con nuevos checks conforme el proyecto evoluciona.*
