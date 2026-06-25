# RESEARCH_REPORT — cookiecutter-django-tailwind

> **Type:** Project research report | **Updated:** 2026-06-25

---

**Type:** Django project template / Cookiecutter generator
**Tech Stack:** Django 5.x, django-tailwind, PostgreSQL, Docker, Celery, pytest, pre-commit, Black, ruff, mypy, djlint
**Status:** Active

---

## Similar Projects

| Project | URL | Why Relevant |
| ------- | --- | ------------ |
| django-cookiecutter | https://github.com/cookiecutter/cookiecutter-django | Reference — the most starred Django project template; this project is a Tailwind-specific fork |
| django-tailwind-cli | https://pypi.org/project/django-tailwind-cli | Standalone Tailwind CSS CLI integration for Django (2026 update) |

---

## Key Findings

### Django 5.x Project Structure

- Layered settings pattern (`base.py` → `local.py` → `production.py`) is the industry standard for 2026; never use a single `settings.py` in production (dev.to, 2026)
- Twelve-Factor App methodology is the guiding principle — config from environment, strict separation of build/release/run (dev.to)
- Cookiecutter-Django remains the top-referenced project template structure; this project extends it with Tailwind-specific frontend tooling (Reddit r/django)

### django-tailwind Integration

- `django-tailwind-cli` (May 2026) now provides standalone Tailwind CSS binary integration, eliminating npm as a build dependency (PyPI)
- django-tailwind v2.0 recommends `python manage.py tailwind start` for development and `honcho` for running Django + Tailwind servers concurrently (django-tailwind.readthedocs.io)
- Tailwind utility-first CSS approach pairs naturally with Django templates — minimal custom CSS, HTML class composition (project README)

### Production Security Hardening

- `python manage.py check --deploy` must run before every production deployment — audits HTTPS enforcement, cookie flags, secret key strength (softaims.com, 2026)
- Content Security Policy (CSP) via `django-csp` with REPORT_ONLY mode first is the recommended XSS prevention approach (softaims.com)
- Django 6.0 deployment checklist mandates HSTS, secure cookie flags, DEBUG=False, and proper ALLOWED_HOSTS (docs.djangoproject.com)

---

## Cheatsheets & Quick Reference

| Topic | Resource | Type |
| ----- | -------- | ---- |
| Django 5.x settings layering | https://docs.djangoproject.com/en/5.2/topics/settings/ | Docs |
| django-tailwind CLI | https://django-tailwind.readthedocs.io/en/latest/installation.html | Guide |
| Django deploy checklist | https://docs.djangoproject.com/en/6.0/howto/deployment/checklist | Checklist |

---

## Best Practices

1. **Settings layering** — Split settings into base/local/production with django-environ for secrets; never commit `.env`
2. **pre-commit hooks** — Enforce Black, ruff, mypy, djlint before every commit to catch issues early
3. **Docker Compose** — Use `docker compose -f production.yml` for reproducible production deployments
4. **Sentry monitoring** — Integrate Sentry SDK for error tracking in production from day one
5. **Type hints** — Require type hints in all new Django code for mypy validation in CI

---

## Common Pitfalls

| Pitfall | Impact | Avoidance |
| ------- | ------ | --------- |
| Single settings.py | Security leaks, env confusion | Use 3-tier settings (base/local/production) |
| django-tailwind npm version drift | Broken Tailwind builds | Use `django-tailwind-cli` standalone binary |
| Missing `check --deploy` | Production config regressions | Run `check --deploy` in CI/deploy pipeline |
| No CSP headers | XSS vulnerabilities | Add django-csp with REPORT_ONLY first |

---

## Performance

1. **django-tailwind standalone CLI** — Eliminates node_modules overhead; faster build times than npm-based setup
2. **WhiteNoise with cache headers** — Serve static files efficiently with far-future Cache-Control headers
3. **PostgreSQL connection pooling** — Use pgbouncer or Django's CONN_MAX_AGE for persistent connections
4. **Gunicorn workers** — Set workers to 2–4 × CPU cores for optimal throughput

---

## Security

1. **CSRF + XSS** — Django's built-in CSRF and XSS escaping are strong by default; enforce CSP via django-csp
2. **Secret management** — django-environ with `.env` never committed; SECRET_KEY rotated regularly
3. **Production checklist** — `manage.py check --deploy` catches 90% of common misconfigurations
4. **HSTS** — Force HTTPS with Strict-Transport-Security header in production

---

## Related Projects (in workspace)

- **ecom** — Also uses DRF + layered Django settings pattern
- **profile** — Django monolith with similar settings layering; media storage on GCS

---

## Resources

| Resource | URL | Description |
| -------- | --- | ----------- |
| Official Docs | https://docs.djangoproject.com/en/5.2/ | Django 5.x official documentation |
| django-tailwind | https://django-tailwind.readthedocs.io/ | Tailwind CSS integration for Django |
| Cookiecutter Django | https://github.com/cookiecutter/cookiecutter-django | Reference Django project template |
| Community | https://www.reddit.com/r/django/ | Django community discussions |

---