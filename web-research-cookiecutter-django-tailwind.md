# Web Research: cookiecutter-django-tailwind

> Compiled: 2026-07-16
> Tech Stack: PostgreSQL, JavaScript, DRF, Python, SQLite, Django, Docker, Tailwind CSS

## Table of Contents

1. [Project Overview & Similar Projects](#1-project-overview--similar-projects)
2. [Django Best Practices](#2-django-best-practices)
3. [Django REST Framework (DRF) Best Practices](#3-django-rest-framework-drf-best-practices)
4. [Tailwind CSS Integration with Django](#4-tailwind-css-integration-with-django)
5. [PostgreSQL Performance & Optimization](#5-postgresql-performance--optimization)
6. [Docker & Production Deployment](#6-docker--production-deployment)
7. [Security Checklist](#7-security-checklist)
8. [HTMX & Alpine.js (Modern Django Frontend)](#8-htmx--alpinejs-modern-django-frontend)
9. [Common Pitfalls](#9-common-pitfalls)
10. [Performance Tips Summary](#10-performance-tips-summary)
11. [Sources](#11-sources)

---

## 1. Project Overview & Similar Projects

### Cookiecutter Django (upstream)

- **GitHub**: https://github.com/cookiecutter/cookiecutter-django (13.6k ★, 3.1k forks)
- **Latest release**: 2026.07.15 (very actively maintained)
- **Description**: Framework for jumpstarting production-ready Django projects quickly. Powered by [Cookiecutter](https://github.com/cookiecutter/cookiecutter).
- **Languages**: Python 74.6%, HTML 7.5%, Shell 7.4%, Dockerfile 4.2%, JavaScript 3.9%

### Key Features (from upstream)

- Docker Compose for development and production (Traefik + Let's Encrypt)
- Pre-configured CI/CD pipelines
- Celery for async task processing
- Default integration with pre-commit hooks
- django-allauth for authentication
- Settings hierarchy: base.py → local.py → production.py
- django-environ for environment variable management

### Similar Django Templates

| Project | Stars | Notes |
|---------|-------|-------|
| [cookiecutter-django](https://github.com/cookiecutter/cookiecutter-django) | 13.6k | The original — comprehensive, actively maintained |
| [Django Keel](https://news.ycombinator.com/item?id=45655206) | — | Battle-tested patterns without accumulated complexity |
| [django-project-template](https://github.com/jackton1/django-project-template) | — | Lighter alternative with similar patterns |

### Community Sentiment

- **Reddit (r/django)**: Cookiecutter Django is widely recommended as a starting point but opinions are split — some find it too opinionated/heavy, others praise it for production-readiness.
- **Hacker News**: "10 Years of Django Best Practices in One Template" — praised for battle-tested patterns, but some note accumulated complexity over a decade.
- **BugBytes (YouTube, 2026)**: Latest video calls it the "gold standard" for kickstarting Django projects with Docker, Celery, and CI/CD pre-configured.

---

## 2. Django Best Practices

### Project Structure (Cookiecutter Pattern)

```
project_slug/
├── config/
│   ├── settings/
│   │   ├── base.py        # Shared settings
│   │   ├── local.py       # Dev-only settings (DEBUG=True)
│   │   └── production.py  # Production settings (DEBUG=False)
│   ├── urls.py
│   └── wsgi.py
├── apps/                   # Django apps
├── templates/
├── static/
├── media/
├── docker/
├── .env                    # NEVER commit this
├── docker-compose.yml
├── Dockerfile
└── requirements/
```

### Settings Management

- **django-environ** for reading `.env` files — secrets never hardcoded
- **Settings hierarchy**: `base.py` → `local.py` (development) / `production.py` (production)
- **`SECRET_KEY`** must be loaded from environment variable, never committed
- Run `python manage.py check --deploy` before going live
- Use `SECRET_KEY_FALLBACKS` for key rotation

### Code Quality

- **Pre-commit hooks** configured: Black, ruff, mypy, djlint
- **Type hints** required in all new code
- **pytest + coverage** for testing
- **pre-commit** for identifying issues before code review

### ORM Best Practices

- Use `select_related()` for ForeignKey/OneToOne relationships (SQL JOIN)
- Use `prefetch_related()` for ManyToMany/reverse FK relationships (separate query + Python join)
- Avoid N+1 queries — use Django Debug Toolbar to detect them
- Use `bulk_create()`, `bulk_update()` for batch operations
- Set `CONN_MAX_AGE` for persistent database connections

---

## 3. Django REST Framework (DRF) Best Practices

### Project Structure

- Separate concerns: models, serializers, views, permissions, and routers each in their own files
- Each app should have a single responsibility
- Use `services.py` or `utils.py` for complex business logic — don't embed in views/serializers

### View Patterns

- **Prefer ViewSets** over plain APIView for CRUD — consistent URL patterns, less boilerplate
- Override `get_queryset()` to apply filtering/per-user scoping
- Use `perform_create()` to auto-set owner/user fields
- Use `get_serializer_class()` for different serializers per action

### Serializers

- Use `ModelSerializer` for standard CRUD, manual `Serializer` for custom logic
- Validate uniqueness with `UniqueTogetherValidator`
- Handle nullable `UniqueConstraint` fields carefully (known DRF bug area)
- For field-level permissions, create different serializers per action and override `get_serializer_class()`

### Permissions & Authentication

- Use `IsAuthenticated` as default; override per-view where needed
- Custom permissions via `BasePermission` subclasses
- Dynamic permissions: change `permission_classes` based on request method (e.g., GET=AllowAny, POST=IsAdminUser)
- JWT authentication via `djangorestframework-simplejwt` (preferred over session auth for APIs)

### Performance

- Use `drf-spectacular` (or `drf-yasg`) for OpenAPI schema generation
- Pagination is essential — use `PageNumberPagination` or `CursorPagination`
- `select_related` / `prefetch_related` in querysets to avoid N+1
- Throttling with `UserRateThrottle` / `AnonRateThrottle`
- Filter backends: `django-filter` for complex filtering

---

## 4. Tailwind CSS Integration with Django

### Recommended Packages

| Package | Purpose |
|---------|---------|
| `django-tailwind` | Creates a `theme` app, manages npm lifecycle via Django commands |
| `django-tailwind-cli` | Lighter alternative — manages Tailwind CLI process, no npm/node required in production |
| `django-vite` | Integrates Vite (faster builds, HMR) — pairs with Tailwind plugins |
| `django-browser-reload` | Auto-refresh browser on file changes (development) |

### Tailwind CSS v3 → v4 Migration Notes

- Tailwind v4 uses `@import "tailwindcss"` instead of `@tailwind base/components/utilities`
- No `tailwind.config.js` needed in v4 — uses CSS-based configuration
- v4 detects HTML content automatically
- `npx @tailwindcss/cli -i input.css -o output.css --watch` for dev

### Production Cache-Busting (Critical!)

**Problem**: `django-tailwind-cli` creates a single `tailwind.css`. Browsers aggressively cache this file, so users don't see CSS updates after deploy.

**Solution — ManifestStaticFilesStorage**:

```python
# settings.py
STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage"
            if DEBUG
            else "django.contrib.staticfiles.storage.ManifestStaticFilesStorage",
    },
}
```

**Deploy script**:
```bash
./manage.py tailwind build        # Build production CSS
./manage.py collectstatic --noinput --ignore css/source.css  # Hash + collect
```

The `--ignore css/source.css` prevents `ManifestStaticFilesStorage` from processing the source template — only the built `tailwind.css` gets hashed.

### Tailwind Setup (v4 via CLI)

```bash
# Install
npm install tailwindcss @tailwindcss/cli
# OR use django-tailwind-cli
pip install django-tailwind-cli
```

---

## 5. PostgreSQL Performance & Optimization

### Connection Pooling (Django 5.1+ Native)

Django 5.1 introduced native PostgreSQL connection pooling — no more PgBouncer required.

**Before (no pooling)**: Every HTTP request creates + destroys a DB connection (50-70ms overhead)
**After (pooling)**: Connections reused (60-80% overhead reduction)

**Implementation**:
```python
# settings.py
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "...",
        "CONN_MAX_AGE": 0,  # Required — pooling handles lifetime
        "OPTIONS": {
            "pool": {
                "min_size": 4,
                "max_size": 16,
                "timeout": 10,
                "max_lifetime": 1800,  # 30 min
                "max_idle": 300,       # 5 min
            }
        },
    }
}
```

**Requirements**: Django 5.1+, PostgreSQL, `psycopg[binary,pool]` (NOT `psycopg2`)

### Indexing Strategy

- Django auto-indexes PKs and FKs
- Add custom indexes for columns frequently used in `filter()`, `order_by()`, `distinct()`
- Use `Meta.indexes` in models, avoid `db_index=True` on every field
- Composite indexes for multi-column lookups
- `EXPLAIN ANALYZE` via Django's `connection.queries` for deep analysis

### Query Optimization

- **N+1 fix**: 4,000ms → 330ms (10x improvement) in production benchmarks
- **Select only needed fields**: `.only()`, `.defer()`, `.values()`
- **Avoid COUNT(*) on large tables** — use approximate counting or cached counts
- **PostgreSQL-specific**: `ArrayField`, `JSONField`, `FullTextSearch` for advanced use cases

### Migration Best Practices

- Review migration SQL before deploying (`sqlmigrate`)
- Apply during low traffic / off-peak hours
- Wrap complex migrations in transactions
- Test on staging with production-sized data

---

## 6. Docker & Production Deployment

### Production Architecture

```
User Request
    │
    ▼
┌──────────────────────────────┐
│         Nginx (reverse proxy)│  ← handles SSL, static/media files
│  ports 80/443                │
└─────────┬────────────────────┘
          │
          ▼
┌──────────────────────────────┐
│   Gunicorn (Django app)      │  ← WSGI server
│   workers = 2-4 per CPU core │
└─────────┬────────────────────┘
          │
          ▼
┌──────────────────────────────┐
│         PostgreSQL            │
│         port 5432            │
└──────────────────────────────┘
```

### Dockerfile Best Practices

```dockerfile
# Multi-stage build
FROM python:3.12-slim as builder
# Install deps, compile wheels

FROM python:3.12-slim as final
# Copy wheels from builder
# Create non-root user (security!)
# Set PYTHONUNBUFFERED=1, PYTHONDONTWRITEBYTECODE=1
# Copy entrypoint script
# Run as non-root user
```

**Key Points**:
- Use multi-stage builds to minimize image size
- Create a non-root user: `RUN addgroup --system django && adduser --system --ingroup django django`
- Never run as root in containers
- Use `.dockerignore` to exclude `__pycache__/`, `.git/`, `.env`, `node_modules/`
- Health checks: `HEALTHCHECK --interval=30s --timeout=3s CMD python manage.py health_check`

### Gunicorn Configuration

```python
# gunicorn.conf.py
bind = "0.0.0.0:8000"
workers = 4  # 2-4 x (CPU cores)
worker_class = "sync"  # or "gevent" for async workloads
timeout = 120
keepalive = 5
accesslog = "-"  # Log to stdout for Docker
errorlog = "-"
```

### Environment Variables

- Use `.env` files for development, Docker secrets for production
- Never commit `.env` files
- `django-environ` reads from `.env` for local, environment variables for Docker

### Traefik vs Nginx

- **Cookiecutter-default**: Traefik with Let's Encrypt (auto SSL)
- **Alternative**: Nginx + Certbot (more traditional, widely documented)
- Both reverse-proxy to Gunicorn on port 8000

---

## 7. Security Checklist

### Pre-Deployment

- [ ] `python manage.py check --deploy` — no warnings
- [ ] `DEBUG = False` in production
- [ ] `SECRET_KEY` loaded from environment, long random value
- [ ] `ALLOWED_HOSTS` properly configured (no wildcards unless host validation)
- [ ] HTTPS enforced site-wide

### Critical Django Settings

```python
# settings/production.py
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_BROWSER_XSS_FILTER = True
X_FRAME_OPTIONS = 'DENY'
```

### CSRF & XSS

- Never use `@csrf_exempt` unless absolutely necessary
- `django-csp` for Content Security Policy headers (Mozilla's package)
- Enable `SECURE_BROWSER_XSS_FILTER` and `SECURE_CONTENT_TYPE_NOSNIFF`
- Use `django.middleware.security.SecurityMiddleware` (included by default in cookiecutter)

### Admin Security

- Change `/admin/` path to something non-obvious
- Use `django-admin-honeypot` or restrict by IP
- Enforce 2FA for admin logins (`django-otp`)

### Third-Party Security

- Keep dependencies updated (Dependabot / pyup.io configured in cookiecutter)
- Scan with Mozilla Observatory after deployment
- Sentry for error tracking (included in cookiecutter template)

### Container Security

- Never run containers as root
- Use read-only root filesystem where possible
- Scan images with Trivy or Snyk
- Keep base images updated

---

## 8. HTMX & Alpine.js (Modern Django Frontend)

### When to Use Which

| Tool | Best For | Pros | Cons |
|------|----------|------|------|
| **HTMX** | Dynamic content loading, form submission, partial page updates | Zero JS knowledge needed; works with Django templates; tiny (~14KB) | Server-round trips for every interaction |
| **Alpine.js** | Client-side interactivity (modals, dropdowns, toggles, tabs) | Declarative, stays in HTML, ~15KB | Need JS understanding for complex logic |
| **Both** | Building full interactive UIs while keeping Django as backend | Combined ~30KB — tiny vs React/Vue | Not ideal for highly complex SPAs |

### HTMX + Django Pattern

```html
<button hx-get="/api/items/" hx-target="#results" hx-trigger="click">
  Load Items
</button>
<div id="results">
  <!-- Replaced with server-rendered HTML fragment -->
</div>
```

### Alpine.js + Django Pattern

```html
<div x-data="{ open: false }">
  <button @click="open = !open">Toggle</button>
  <div x-show="open" class="p-4 bg-white shadow">
    <!-- Django-rendered content -->
  </div>
</div>
```

### Performance Notes

- **HTMX won** on simplicity and server integration in a 2026 SaaS comparison
- **Alpine.js excelled** at client-side interactivity
- Combined weight ~30KB — dramatically smaller than React/Vue (100-200KB+)
- No API versioning headaches — server renders HTML directly
- django-vite integrates well with both for modern tooling

---

## 9. Common Pitfalls

### Cookiecutter Django Specific

1. **Overwhelming for small projects**: The generated template includes Celery, Redis, Sentry, etc. Disable options you don't need during cookiecutter setup.
2. **Traefik complexity**: Traefik is powerful but has a steeper learning curve than nginx. Consider using `traefik.me` or switching to nginx for simpler setups.
3. **Settings file complexity**: The 3-tier settings (base/local/production) can confuse newcomers. Document which settings go where.
4. **Template updates**: Your generated project won't auto-update with the cookiecutter template. Plan for periodic manual reconciliation.

### Django + Tailwind Pitfalls

1. **Cache-busting**: As detailed above — CSS won't update without `ManifestStaticFilesStorage`.
2. **Tailwind CLI vs django-tailwind**: `django-tailwind` creates a separate `theme` app; `django-tailwind-cli` is lighter. Choose based on project needs.
3. **Purged CSS in dev**: Tailwind's JIT can be slow during development with large projects. Use `--minify` only in production.
4. **Node required for dev**: Tailwind requires Node.js for development (unless using standalone CLI binary).

### DRF Pitfalls

1. **N+1 queries in serializers**: SerializerMethodField and nested serializers easily create N+1 problems. Always use `select_related`/`prefetch_related` in ViewSet `get_queryset()`.
2. **Permission creep**: Overly permissive default `permission_classes` can expose endpoints. Set strict defaults, relax per-view.
3. **Versioning**: Start API versioning early (`/api/v1/`, `/api/v2/`) — hard to retrofit.
4. **Validation errors**: Test error responses thoroughly — DRF's default error format can be surprising to frontend consumers.

### Docker Pitfalls

1. **Environment variable leakage**: Don't put env vars in Dockerfiles — use Docker Compose `.env` files or Docker secrets.
2. **Static files**: Nginx must serve static files, NOT Gunicorn. Gunicorn is terrible at static files.
3. **Database persistence**: Always use named volumes for PostgreSQL data — anonymous volumes get lost on `docker compose down`.
4. **Debug=False in Docker**: Even for local Docker development, use a separate compose file (`docker-compose.override.yml`) for dev settings.

### SQLite → PostgreSQL Migration

- Cookiecutter configures SQLite for dev, PostgreSQL for prod
- Watch for: case-sensitive queries, date/time handling, aggregation differences
- Test all migrations on PostgreSQL before deploying

---

## 10. Performance Tips Summary

### Quick Wins (Implement First)

| Optimization | Expected Gain | Effort |
|-------------|---------------|--------|
| N+1 query fix with `select_related`/`prefetch_related` | 10x (4000ms → 330ms) | Low |
| Native PostgreSQL connection pooling (Django 5.1+) | 50-70ms latency reduction | Low (10 min) |
| Caching with Redis/Memcached | 95-99% response time improvement | Medium |
| Gunicorn worker tuning (2-4 per CPU core) | 30-50% throughput increase | Low |
| `CONN_MAX_AGE` persistent connections | 20-30% query time reduction | Low |

### Database Specific

- Set `CONN_MAX_AGE` to reuse connections (but must be 0 with native pooling)
- Add database indexes on frequently queried columns
- Use `django-debug-toolbar` to identify slow queries
- Consider `pgbouncer` if using older Django (pre-5.1)

### ASGI vs WSGI

- ASGI (Daphne/Uvicorn) delivers 6,252 RPS vs WSGI (Gunicorn) 4,000 RPS for I/O-bound workloads
- Switch to ASGI if your app has many async operations
- Django 5.x supports async views natively

### Caching Strategy

- Cache database query results with `django.core.cache`
- Use Redis as cache backend (better than Memcached for most use cases)
- Template fragment caching for expensive renders
- `cache_page` decorator for entire views
- Set low TTL for dynamic content, long TTL for stable content

---

## 11. Sources

The following sources were consulted during research (accessed 2026-07-16):

1. **cookiecutter-django GitHub** — https://github.com/cookiecutter/cookiecutter-django
2. **Django Deployment Checklist** — https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/
3. **Production-ready cache-busting for Django and Tailwind CSS** (Loopwerk) — https://www.loopwerk.io/articles/2025/django-tailwind-production/
4. **Django, HTMX and Alpine.js: Modern websites, JavaScript optional** (SaaS Pegasus) — https://www.saaspegasus.com/guides/modern-javascript-for-django-developers/htmx-alpine/
5. **HTMX vs. Alpine.js in Django: Lightweight UIs for 2026 SaaS** — https://medium.com/@yogeshkrishnanseeniraj/htmx-vs-alpine-js-in-django-lightweight-uis-for-2026-saas-code-demos-perf-tests-f5a87d38ca6a
6. **Django REST Framework Best Practices** — https://medium.com/@Tech_girlll/django-rest-framework-best-practices-419cbe6d81d6
7. **10 Best Practices for Optimizing Django with PostgreSQL in Production** — https://python.plainenglish.io/10-best-practices-for-optimizing-django-with-postgresql-in-production-fbb45bb72e0f
8. **Django Performance: 10x Faster with 7 Proven Production Tips** — https://djangocfg.com/updates/blog/django-performance-optimization-guide
9. **Cut Django Database Latency by 50-70ms with Native Connection Pooling** — https://saurabh-kumar.com/articles/2025/06/cut-django-database-latency-by-50-70ms-with-native-connection-pooling
10. **Django web security checklist before deployment** — https://dev.to/thedevtimeline/django-web-security-checklist-before-deployment-secure-your-django-app-4jb8
11. **Streamline Your Web Development with Cookie Cutter Django: A Comprehensive Review** — https://dev.to/rishitashaw/streamline-your-web-development-with-cookie-cutter-django-a-comprehensive-review-3elm
12. **HTMX, Tailwind CSS, and Django: Introduction and Setup** (Sunscrapers) — https://sunscrapers.com/blog/htmx-tailwindcss-django-intro-setup-part1/
13. **Dockerizing Django with Postgres, Gunicorn, and Nginx** (TestDriven.io) — https://testdriven.io/blog/dockerizing-django-with-postgres-gunicorn-and-nginx/
14. **Docker + Django: Containerize the Right Way** (Better Stack) — https://www.youtube.com/watch?v=1v3lqIITRJA
15. **BugBytes: cookiecutter-django - jumpstart production-ready Django projects** (YouTube, 2026) — https://www.youtube.com/watch?v=aZybyNIgv0M
16. **Django-CFG Performance Guide** — https://djangocfg.com/updates/blog/django-performance-optimization-guide
