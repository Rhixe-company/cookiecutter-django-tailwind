# RESEARCH_REPORT — cookiecutter-django-tailwind

> **Type:** Project research report | **Updated:** 2026-07-16

**Type:** Django project template / Cookiecutter generator
**Tech Stack:** Django 5.x, django-tailwind, PostgreSQL, Docker, Celery, pytest, pre-commit, Black, ruff, mypy, djlint
**Status:** Active

---

## Similar Projects

| Project | Relevance |
|---------|-----------|
| django-cookiecutter | Most-starred Django project template |
| django-tailwind-cli | Standalone Tailwind CSS CLI (2026) |

---

## Key Findings

### Django 5.x Project Structure
- Layered settings pattern (`base.py` → `local.py` → `production.py`) is the industry standard
- Always start with a custom user model (impossible to add later without migrations)
- Use `django-environ` for all secrets; separate `local.yml` (dev) and `production.yml` (prod)
- Pre-configure linting (Ruff, isort) and security (bandit, detect-secrets) via pre-commit
- Cookiecutter upgrade path is one-shot scaffold — treat generated projects as standalone after creation

### django-tailwind Integration
- `django-tailwind-cli` (May 2026) provides standalone Tailwind binary — eliminates npm as build dependency
- django-tailwind v2.0 recommends `honcho` for running Django + Tailwind concurrently
- Tailwind utility-first CSS pairs naturally with Django server-rendered templates
- Production caching: `ManifestStaticFilesStorage` for cache-busting static files

### Production Security Hardening
- `python manage.py check --deploy` must run before every production deployment
- CSP via `django-csp` with REPORT_ONLY mode first is recommended XSS prevention
- Django 6.0 checklist: HSTS, secure cookies, DEBUG=False, proper ALLOWED_HOSTS
- Use S3-compatible storage (django-storages + boto3) for production media files
- Rust-based Ruff supersedes flake8 + isort + pycodestyle for linting

---

## Cheatsheets & Quick Reference

| Topic | Resource | Type |
|-------|----------|------|
| Django 5.x settings | <https://docs.djangoproject.com/en/5.2/topics/settings/> | Docs |
| django-tailwind CLI | <https://django-tailwind.readthedocs.io/en/latest/installation.html> | Guide |
| Django deploy checklist | <https://docs.djangoproject.com/en/6.0/howto/deployment/checklist> | Checklist |

---

## Best Practices

1. **Settings split** — `base.py`, `local.py`, `production.py`, `test.py` in `config/settings/` package
2. **Custom user model from day one** — impossible to add later without complex migrations
3. **Separate Docker Compose files** — `local.yml` for dev, `production.yml` for prod
4. **Pre-commit hooks** — Ruff, end-of-file-fixer, trailing-whitespace, detect-private-key
5. **12-factor app** — config from environment, strict separation of build/release/run

---

## Common Pitfalls

| Pitfall | Impact | Avoidance |
|---------|--------|-----------|
| Cookiecutter upgrade path | Stuck on old template | Treat generated project as standalone; patch manually |
| Feature sprawl | Unnecessary complexity | Only enable needed options during cookiecutter prompts |
| Missing CUSTOM_USER_MODEL | Migration nightmare | Set `AUTH_USER_MODEL` before first migration |
| Django version lock-in | Security gaps | Pin versions carefully; plan upgrades quarterly |

---

## Performance

1. **`ManifestStaticFilesStorage`** — cache-busting static files; invalidates on content change
2. **Django `select_related`/`prefetch_related`** — prevent N+1 queries in template rendering
3. **PostgreSQL connection pooling** — `CONN_MAX_AGE` or pgbouncer for production
4. **Gunicorn workers** — `2-4 × CPU cores` for sync; Uvicorn for async workloads
5. **Template caching** — `django.core.cache.backends` for fragment caching

---

## Security

1. **`python manage.py check --deploy`** — run before every production deployment
2. **CSP headers** via `django-csp` — start in REPORT_ONLY mode
3. **HSTS** — `SECURE_HSTS_SECONDS` with `includeSubDomains` preload
4. **Secure cookies** — `SESSION_COOKIE_SECURE`, `CSRF_COOKIE_SECURE`
5. **Secrets in env vars** — never hardcode; use `django-environ` or 1Password CLI

---

## Related Projects (in workspace)

- **ecom** — shared DRF + Django patterns
- **profile** — shared Django 4.x + PostgreSQL conventions
- **rhixecompany-comics** — shared Django/DRF + Celery patterns
- **Django-Scrapy-Selenium** — shared Django 4.x + DRF architecture
- **xamehi** — shared Django/DRF conventions

---

## Resources

| Resource | URL |
|----------|-----|
| Django Docs | <https://docs.djangoproject.com/en/5.2/> |
| Cookiecutter Django | <https://github.com/cookiecutter/cookiecutter-django> |
| django-tailwind | <https://django-tailwind.readthedocs.io> |

### Research Methodology
- **Web search:** web_search (2026 Django patterns)
- **Documentation:** web_extract (Django docs, cookiecutter-django repo)
- **Tool research:** django-tailwind-cli, Ruff migration patterns
- **Last verified:** 2026-07-16
