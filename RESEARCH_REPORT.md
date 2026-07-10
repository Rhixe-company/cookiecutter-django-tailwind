# RESEARCH_REPORT — cookiecutter-django-tailwind

> **Type:** Project research report | **Updated:** 2026-07-10

**Type:** Django project template / Cookiecutter generator
**Tech Stack:** Django 5.x, django-tailwind, PostgreSQL, Docker, Celery, pytest, pre-commit, Black, ruff, mypy, djlint
**Status:** Active

---

## Similar Projects

| Project | URL | Why Relevant |
|---------|-----|--------------|
| django-cookiecutter | <https://github.com/cookiecutter/cookiecutter-django> | Most-starred Django project template |
| django-tailwind-cli | <https://pypi.org/project/django-tailwind-cli> | Standalone Tailwind CSS CLI (2026) |

---

## Key Findings

### Django 5.x Project Structure

- Layered settings pattern (`base.py` → `local.py` → `production.py`) is the industry standard; never use single `settings.py` in production
- Twelve-Factor App: config from environment, strict separation of build/release/run
- Cookiecutter-Django remains top-referenced template structure

### django-tailwind Integration

- `django-tailwind-cli` (May 2026) provides standalone Tailwind binary — eliminates npm as build dependency
- django-tailwind v2.0 recommends `honcho` for running Django + Tailwind concurrently
- Tailwind utility-first CSS pairs naturally with Django templates

### Production Security Hardening

- `python manage.py check --deploy` must run before every production deployment
- CSP via `django-csp` with REPORT_ONLY mode first is recommended XSS prevention
- Django 6.0 checklist: HSTS, secure cookies, DEBUG=False, proper ALLOWED_HOSTS

---

## Cheatsheets & Quick Reference

| Topic | Resource | Type |
|-------|----------|------|
| Django 5.x settings | <https://docs.djangoproject.com/en/5.2/topics/settings/> | Docs |
| django-tailwind CLI | <https://django-tailwind.readthedocs.io/en/latest/installation.html> | Guide |
| Django deploy checklist | <https://docs.djangoproject.com/en/6.0/howto/deployment/checklist> | Checklist |

---

## Best Practices

1. **Settings layering** — base/local/production with django-environ; never commit secrets
2. **pre-commit hooks** — enforce Black, ruff, mypy, djlint before every commit
3. **Docker Compose** — reproducible production deployments
4. **Sentry monitoring** — error tracking from day one
5. **Type hints** — required in all new code for mypy validation

---

## Common Pitfalls

| Pitfall | Impact | Avoidance |
|---------|--------|-----------|
| Single settings.py | Security leaks, env confusion | Use 3-tier settings |
| django-tailwind npm drift | Broken builds | Use standalone CLI binary |
| Missing `check --deploy` | Production regressions | Run in CI/deploy pipeline |
| No CSP headers | XSS vulnerabilities | Add django-csp with REPORT_ONLY |

---

## Performance

1. **django-tailwind CLI** — eliminates node_modules overhead; faster builds than npm
2. **WhiteNoise with cache headers** — far-future Cache-Control for static files
3. **PostgreSQL connection pooling** — pgbouncer or CONN_MAX_AGE
4. **Gunicorn workers** — 2–4 × CPU cores

---

## Security

1. **CSRF + XSS** — Django strong by default; enforce CSP via django-csp
2. **Secret management** — django-environ with `.env` never committed; rotate regularly
3. **Production checklist** — `check --deploy` catches 90% of misconfigurations
4. **HSTS** — force HTTPS in production

---

## Related Projects (in workspace)

- **ecom** — uses DRF + layered Django settings pattern
- **profile** — Django monolith with similar settings layering; GCS for media
- **rhixecompany-comics** — Django project baseline patterns

---

## Resources

| Resource | URL | Description |
|----------|-----|-------------|
| Official Docs | <https://docs.djangoproject.com/en/5.2/> | Django 5.x documentation |
| django-tailwind | <https://django-tailwind.readthedocs.io/> | Tailwind CSS integration |
| Cookiecutter Django | <https://github.com/cookiecutter/cookiecutter-django> | Reference template |
| Community | <https://www.reddit.com/r/django/> | Django community discussions |

---

## New Research Findings (2026-07-10)

### 1. Django 5.x Cookiecutter Template Best Practices 2026

**Cookiecutter-Django 2026.07.03 (Latest Release — Jul 4, 2026):**
- Supports Django 6.0 (latest), Python 3.14
- 12-Factor settings via `django-environ` — base/local/production layering is default
- Docker Compose for dev + production (Traefik + Let's Encrypt)
- Optional DRF or Django Ninja for REST API
- Optional Celery + Flower for async tasks
- Optional Sentry, WhiteNoise, Mailpit integrations
- Pre-commit hooks included by default (ruff, ruff-format, prettier, pyproject-fmt, trailing-whitespace, etc.)
- Cookiecutter JSON options drive feature flags: cloud storage (AWS/GCP/Azure), email provider, CI (GitHub Actions/GitLab/Drone), etc.
- 100% starting test coverage
- Active maintenance: 842 releases, 13.6k stars, 3.1k forks

**Key Template Structure (from cookiecutter-django):**
```
{{cookiecutter.project_slug}}/
├── config/
│   ├── settings/
│   │   ├── base.py
│   │   ├── local.py
│   │   └── production.py
│   ├── wsgi.py
│   └── asgi.py
├── {{cookiecutter.project_slug}}/
├── templates/
├── static/
├── docker-compose.yml
├── production.yml
├── .pre-commit-config.yaml
├── pyproject.toml
└── requirements/
    ├── base.txt
    ├── local.txt
    └── production.txt
```

**Versioning Strategy:** Calendar versioning (YYYY.MM.DD) — matches cookiecutter-django's release cadence. Template version bumps with each Django release.

**Maintenance Best Practices:**
- Fork and customize rather than modify upstream
- Track upstream releases via GitHub releases/RSS
- Use `cookiecutter --checkout` to test new template versions
- Maintain a `CHANGELOG.md` for downstream customizations
- Run `cookiecutter-django`'s test suite against generated projects

---

### 2. django-tailwind + Alpine.js + htmx Integration Patterns

**django-tailwind-cli (May 2026 Release):**
- Standalone Tailwind CSS CLI binary — **eliminates npm/node_modules entirely**
- Install via `pip install django-tailwind-cli`
- Runs via `python manage.py tailwind build` or `python manage.py tailwind start` (watch mode)
- Uses pre-built binary from `@tailwindcss/cli` — no Node.js required
- Recommended for 2026+ projects to avoid npm drift/breakage

**Integration Patterns (from TestDriven.io, dev.to, DjangoCon 2024):**

1. **HTMX for server-driven interactions:**
   - Use `hx-get`, `hx-post`, `hx-target`, `hx-swap` on Django template elements
   - Return partial HTML fragments from Django views (not JSON)
   - CSRF: Include `{% csrf_token %}` in forms; add `hx-headers='{"X-CSRFToken": "{{ csrf_token }}"}`` for AJAX

2. **Alpine.js for client-side state:**
   - Use `x-data`, `x-show`, `x-on:click`, `x-transition` for modals, dropdowns, tabs
   - Alpine v3 has built-in state management (no Spruce needed)
   - Works seamlessly with HTMX-swapped content (no VDOM conflicts)

3. **Tailwind for styling:**
   - Utility-first classes directly in Django templates
   - Use `django-tailwind-cli` for build — `python manage.py tailwind build --minify` for production
   - Configure `content` paths in `tailwind.config.js` to include Django template dirs

4. **Project Structure for HTMX/Alpine:**
   ```
   templates/
   ├── base.html          # Alpine x-data, HTMX config, Tailwind base
   ├── partials/          # HTMX partial templates
   │   ├── _modal.html
   │   ├── _table_row.html
   │   └── _form_field.html
   └── components/        # Reusable Alpine components
       ├── dropdown.html
       └── tabs.html
   ```

5. **django-htmx package:** `pip install django-htmx` — adds `request.htmx` boolean, `HtmxMiddleware`, `HtmxResponse`

6. **django-components + Alpine/HTMX:** Consider `django-components` for reusable template components that work with Alpine/HTMX

---

### 3. Django Project Template Maintenance & Versioning Strategies

**Cookiecutter-Django Versioning:**
- Calendar versioning: `YYYY.MM.DD` (e.g., `2026.07.03`)
- Tracks Django LTS releases — template updates with each Django version
- Changelog at: https://github.com/cookiecutter/cookiecutter-django/blob/main/CHANGELOG.md

**Template Maintenance Strategies:**

1. **Fork & Customize:** Fork cookiecutter-django, add project-specific options to `cookiecutter.json`, customize template files
2. **Upstream Sync:** Periodically rebase fork against upstream `main` branch
3. **Generated Project Upgrades:** 
   - No automated upgrade path for generated projects
   - Best practice: Generate new project from updated template, diff against existing, apply changes manually
   - Use `cookiecutter --replay` to regenerate with same inputs
4. **Version Pinning:** Pin template version in project docs: `cookiecutter gh:org/template --checkout 2026.07.03`
5. **Testing Template Changes:** Use cookiecutter-django's `tests/` with pytest + `pytest-cookies` for template validation

**Django Project Versioning:**
- Use `versioneer` or `setuptools-scm` for auto-versioning from git tags
- Semantic versioning for the generated project (not the template)
- Template version tracked separately in project README

---

### 4. WhiteNoise + Gunicorn Production Deployment Django 5

**WhiteNoise 6.12+ (Latest 2026) Configuration:**

```python
# settings/production.py
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",  # Right after SecurityMiddleware
    # ... other middleware
]

STORAGES = {
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}

# Optional: Brotli compression (pip install whitenoise[brotli])
# WHITENOISE_MAX_AGE = 31536000  # 1 year for cache headers
```

**Gunicorn Configuration (Django 5 + WhiteNoise):**

```bash
# gunicorn.conf.py
import multiprocessing

bind = "0.0.0.0:8000"
workers = multiprocessing.cpu_count() * 2 + 1  # 2-4 × CPU cores
worker_class = "gthread"
threads = 4
worker_connections = 1000
max_requests = 1000
max_requests_jitter = 100
timeout = 30
keepalive = 5

# Preload app for memory efficiency
preload_app = True

# Access log format
accesslog = "-"
errorlog = "-"
loglevel = "info"
```

**Docker Production Setup:**
```dockerfile
# Multi-stage build
FROM python:3.14-slim AS builder
WORKDIR /app
COPY requirements/production.txt .
RUN pip install --no-cache-dir -r production.txt

FROM python:3.14-slim
WORKDIR /app
COPY --from=builder /usr/local/lib/python3.14/site-packages /usr/local/lib/python3.14/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin
COPY . .
RUN python manage.py collectstatic --noinput

CMD ["gunicorn", "--config", "gunicorn.conf.py", "config.wsgi:application"]
```

**Key Production Settings (Django 5/6 Checklist):**
- `DEBUG = False`
- `ALLOWED_HOSTS` from environment
- `SECURE_SSL_REDIRECT = True`
- `SECURE_HSTS_SECONDS = 31536000`
- `SECURE_HSTS_INCLUDE_SUBDOMAINS = True`
- `SECURE_HSTS_PRELOAD = True`
- `SESSION_COOKIE_SECURE = True`
- `CSRF_COOKIE_SECURE = True`
- `SECURE_CONTENT_TYPE_NOSNIFF = True`
- `SECURE_BROWSER_XSS_FILTER = True`
- `X_FRAME_OPTIONS = "DENY"`
- Run `python manage.py check --deploy` in CI/CD pipeline

**WhiteNoise + CDN (CloudFront/Cloudflare):**
- Set `STATIC_HOST` from env var
- Configure CDN to cache based on `Accept-Encoding` for Brotli/Gzip
- WhiteNoise sets `Cache-Control: max-age=31536000, immutable` for hashed files

---

### 5. Sentry SDK Django Integration Patterns

**Sentry SDK 2.x (2026) Django Integration:**

```python
# settings/production.py
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration
from sentry_sdk.integrations.logging import LoggingIntegration

sentry_logging = LoggingIntegration(
    level=logging.INFO,
    event_level=logging.ERROR
)

sentry_sdk.init(
    dsn=os.environ.get("SENTRY_DSN"),
    integrations=[
        DjangoIntegration(
            transaction_style="url",  # or "function_name"
            middleware_spans=True,
            signals_spans=True,
            cache_spans=True,
        ),
        sentry_logging,
    ],
    traces_sample_rate=0.1,  # 10% of transactions for performance
    profiles_sample_rate=0.1,
    send_default_pii=True,  # Include user info in errors
    environment=os.environ.get("SENTRY_ENVIRONMENT", "production"),
    release=os.environ.get("SENTRY_RELEASE", "unknown"),
)
```

**Advanced Patterns:**

1. **Error filtering:** Use `before_send` to filter noise
   ```python
   def before_send(event, hint):
       if "DisallowedHost" in str(event.get("exception", {})):
           return None  # Drop ALLOWED_HOSTS errors
       return event
   
   sentry_sdk.init(..., before_send=before_send)
   ```

2. **Custom context:** Add request/user data
   ```python
   sentry_sdk.set_context("request", {"method": request.method, "path": request.path})
   sentry_sdk.set_user({"id": request.user.id, "email": request.user.email})
   ```

3. **Performance monitoring:** Enable `traces_sample_rate` for transaction tracing

4. **Django + Frontend (HTMX/Alpine) tracing:** Use Sentry's browser SDK alongside Python SDK for full-stack traces

5. **Sentry in Cookiecutter-Django:** Built-in option during project generation — selects Sentry

---

### 6. Pre-commit Hooks for Django: Black, Ruff, mypy, djlint

**Cookiecutter-Django 2026.07.03 Default `.pre-commit-config.yaml`:**

```yaml
exclude: "{{cookiecutter.project_slug}}|.github/contributors.json|CHANGELOG.md|CONTRIBUTORS.md"
default_stages: [pre-commit]
minimum_pre_commit_version: "3.2.0"
default_language_version:
    python: python3.14

repos:
- repo: https://github.com/pre-commit/pre-commit-hooks
  rev: v6.0.0
  hooks:
  - id: trailing-whitespace
  - id: end-of-file-fixer
  - id: check-json
  - id: check-toml
  - id: check-xml
  - id: check-yaml
  - id: debug-statements
  - id: check-builtin-literals
  - id: check-case-conflict
  - id: check-merge-conflict
  - id: detect-private-key

- repo: https://github.com/pre-commit/mirrors-prettier
  rev: v4.0.0-alpha.8
  hooks:
  - id: prettier
    args: ["--tab-width", "2"]

- repo: https://github.com/astral-sh/ruff-pre-commit
  rev: v0.15.21
  hooks:
  - id: ruff
    args: [--fix, --exit-non-zero-on-fix]
  - id: ruff-format

- repo: https://github.com/tox-dev/pyproject-fmt
  rev: v2.25.1
  hooks:
  - id: pyproject-fmt

ci:
  autoupdate_schedule: weekly
  skip: []
  submodules: false
```

**Recommended Additions for Django + Tailwind + HTMX Projects:**

```yaml
# Add to repos:

- repo: https://github.com/psf/black
  rev: 24.10.0
  hooks:
  - id: black
    # Ruff-format replaces Black, but keep for compatibility

- repo: https://github.com/pre-commit/mirrors-mypy
  rev: v1.13.0
  hooks:
  - id: mypy
    additional_dependencies: [django-stubs, types-requests]
    args: [--config-file=pyproject.toml]

- repo: https://github.com/djlint/djlint
  rev: v2.3.0
  hooks:
  - id: djlint-django
    args: [--profile=django, --format]
  - id: djlint-reformat-django
    args: [--profile=django]

- repo: local
  hooks:
  - id: django-check
    name: Django System Check
    entry: python manage.py check --deploy
    language: system
    pass_filenames: false
    always_run: true
    stages: [pre-push]
```

**pyproject.toml Configuration (Ruff + mypy + djlint):**

```toml
[tool.ruff]
target-version = "py314"
line-length = 100
select = ["E", "F", "I", "UP", "W", "C4", "C90", "DJ", "PL", "PTH", "RUF", "SIM", "T20", "TID", "TRY"]
ignore = ["DJ01"]  # Django-specific: allow `objects.all()` in migrations
fixable = ["ALL"]

[tool.ruff.format]
quote-style = "double"
indent-style = "space"

[tool.mypy]
python_version = "3.14"
django_version = "5.2"
strict = true
warn_unused_ignores = true
plugins = ["mypy_django_plugin.main"]

[tool.djlint]
profile = "django"
extensions = ["html"]
```

**Pre-commit Workflow:**
1. `pip install pre-commit`
2. `pre-commit install`
3. `pre-commit install --hook-type pre-push` (for django check --deploy)
4. Runs on every commit; `pre-commit run --all-files` for full check

---

## Updated Resources

| Resource | URL | Description |
|----------|-----|-------------|
| Cookiecutter-Django Repo | <https://github.com/cookiecutter/cookiecutter-django> | Reference template (2026.07.03) |
| Cookiecutter-Django Docs | <https://cookiecutter-django.readthedocs.io/> | Project generation options |
| django-tailwind-cli | <https://pypi.org/project/django-tailwind-cli/> | Standalone Tailwind CLI |
| WhiteNoise Docs | <https://whitenoise.readthedocs.io/en/stable/django.html> | Static file serving |
| Sentry Django Docs | <https://docs.sentry.io/platforms/python/integrations/django/> | Sentry integration |
| Ruff Docs | <https://docs.astral.sh/ruff/> | Python linter/formatter |
| djLint Integrations | <https://djlint.com/docs/integrations> | Template linting |
| TestDriven.io Django HTMX | <https://www.testdriven.io/courses/django-htmx/> | HTMX + Alpine + Django course |
| Django HTMX Alpine.dev | <https://dev.to/nicholas_moen/what-i-learned-while-using-django-with-htmx-and-alpine-js-24jg> | Integration patterns |

---

*Report updated: 2026-07-10 | Source: Web research pipeline + official docs*