# RESEARCH_REPORT — cookiecutter-django-tailwind

> **Type:** Project research report | **Updated:** 2026-06-29

**Type:** Django project template / Cookiecutter generator
**Tech Stack:** Django 5.x, django-tailwind, PostgreSQL, Docker, Celery, pytest, pre-commit, Black, ruff, mypy, djlint
**Status:** Active

---

## Similar Projects

| Project | URL | Why Relevant |
|---------|-----|--------------|
| django-cookiecutter | https://github.com/cookiecutter/cookiecutter-django | Most-starred Django project template |
| django-tailwind-cli | https://pypi.org/project/django-tailwind-cli | Standalone Tailwind CSS CLI (2026) |

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
| Django 5.x settings | https://docs.djangoproject.com/en/5.2/topics/settings/ | Docs |
| django-tailwind CLI | https://django-tailwind.readthedocs.io/en/latest/installation.html | Guide |
| Django deploy checklist | https://docs.djangoproject.com/en/6.0/howto/deployment/checklist | Checklist |

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
| Official Docs | https://docs.djangoproject.com/en/5.2/ | Django 5.x documentation |
| django-tailwind | https://django-tailwind.readthedocs.io/ | Tailwind CSS integration |
| Cookiecutter Django | https://github.com/cookiecutter/cookiecutter-django | Reference template |
| Community | https://www.reddit.com/r/django/ | Django community discussions |
