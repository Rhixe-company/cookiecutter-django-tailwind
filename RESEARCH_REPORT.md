# Cookiecutter Django + Tailwind — Research Report

**Date**: 2026-07-16 | **Stack**: Django 5.x+/6.x, Tailwind CSS v4, PostgreSQL, Docker

---

## 1. Project Overview
**Upstream**: [cookiecutter/cookiecutter-django](https://github.com/cookiecutter/cookiecutter-django) (13.6k ★) — production-ready Django generator. Our fork adds Tailwind CSS + optional HTMX/Alpine.js while keeping 12-Factor settings, Docker Compose, Celery, and CI/CD.

**Upstream (2026):** Now targets **Django 6.0 / Python 3.14** (latest release 2026.07.15). Django 6.0 ships a built-in background-tasks framework (Celery alternative), native CSP middleware, template partials, and the modern email API.

## 2. Community & Alternatives
Reddit/HN split on opinionated vs production-ready. **Django Keel** (lighter) and **django-project-template** exist but Cookiecutter remains the "gold standard" (BugBytes, 2026). Main criticism: accumulated complexity over a decade.

## 3. Django Project Structure
**Settings layered**: `base.py` → `local.py` / `production.py` via `django-environ`. **Modular apps** as bounded contexts with `services.py` + `selectors.py`. Quality enforced via pre-commit (Black, ruff, mypy, djlint) + pytest coverage. Core principle: thin views, fat services.

## 4. Tailwind CSS Integration
**Recommended**: Tailwind CLI v4 via npm — no runtime Node dependency on Django. v4 uses `@import "tailwindcss"` (not `@tailwind`), no `tailwind.config.js` (CSS-based config), auto-detects templates. Alternative: `django-tailwind` PyPI package for `manage.py` commands.

**Critical — Cache-busting**: Single `tailwind.css` aggressively cached by browsers. Fix with `ManifestStaticFilesStorage` + `collectstatic` — hash fingerprint prevents stale CSS after deploy.

## 5. Django REST Framework
Prefer **ViewSets** for CRUD (consistent URLs, less boilerplate). Override `get_queryset()`, `perform_create()`,
`get_serializer_class()` per action. **JWT** via `simplejwt` preferred. Pagination essential (`PageNumberPagination`/`CursorPagination`). Use `select_related`/`prefetch_related` in querysets to avoid N+1. `drf-spectacular` for OpenAPI docs.

## 6. PostgreSQL Optimization
**Django 5.1+ native pooling**: `min_size: 4, max_size: 16` — 60-80% overhead reduction, replaces PgBouncer. **N+1 fix**: `select_related`(FK JOIN) + `prefetch_related`(M2M) yields 4000ms→330ms (10×). Use `.only()`/`.defer()` for field selection, composite indexes in `Meta.indexes`, `qs.explain(ANALYZE=True)` for analysis. Pitfalls: index overheads writes; `psycopg2-binary` is dev-only.

## 7. Docker & Production Deployment
**Architecture**: Nginx (SSL/static) → Gunicorn (WSGI) → PostgreSQL. Multi-stage Dockerfile (builder→slim runtime),
non-root user, dependency caching, health checks. Gunicorn: 2-4 workers/core, log to stdout. Traefik (cookiecutter default, auto SSL) vs Nginx + Certbot (more documented). Named volumes for DB persistence — anonymous volumes lost on `docker compose down`.

## 8. Security Checklist
**Essential settings**: `DEBUG=False`, `SECURE_SSL_REDIRECT`, `SESSION_COOKIE_SECURE`, `CSRF_COOKIE_SECURE`,
`SECURE_HSTS_SECONDS=31536000`, `X_FRAME_OPTIONS='DENY'`. **Argon2** password hasher, `django-axes` rate limiting (5 attempts), `django-csp` for Content Security Policy. **2026 CVEs**: CVE-2026-1207 (PostGIS input), CVE-2026-1287/1312 (`**kwargs` filter injection). Pre-deploy: `check --deploy`, `pip-audit`, `safety check`.

## 9. HTMX & Alpine.js
**HTMX** (~14KB): dynamic content/forms/partial updates, zero JS knowledge. **Alpine.js** (~15KB): client-side interactivity (modals, toggles). Combined ~30KB vs React/Vue 100-200KB+. HTMX won 2026 SaaS simplicity comparison. No API versioning headaches — server renders HTML. `django-vite` pairs well with both.

## 10. Common Pitfalls
- **Cookiecutter**: Overwhelming for small projects; Traefik learning curve; generated project won't auto-update
- **Tailwind**: Cache-busting critical; Node required for dev; JIT slow on large projects
- **Docker**: No env vars in Dockerfiles; always use named volumes for Postgres
- **DRF**: Nested serializers = N+1 traps; start API versioning early; set strict default permissions

## 11. Key Takeaways & Action Items
**Upstream provides**: Docker Compose, 12-Factor settings, split settings, custom user, allauth, Celery, Sentry,
pre-commit, PostgreSQL. **Our fork adds**: Tailwind v4 CLI integration, cache-busted static pipeline, optional HTMX/Alpine.js, multi-stage Docker for Tailwind assets, async ORM/connection pooling docs.

**Open decisions**: Tailwind v3 vs v4 default; CLI binary vs npm; Whitenoise vs Nginx vs S3 for prod static;
HTMX opt-in vs default; `django-tailwind` package vs manual CLI.

---

Full URLs in `web-research-cookiecutter-django-tailwind.md`.
## Related Projects
