# RESEARCH_REPORT — cookiecutter-django-tailwind

> **Type:** Project research report | **Updated:** 2026-07-28

**Type:** Django project template / Cookiecutter generator
**Tech Stack:** Django 5.x, django-tailwind, PostgreSQL, Docker, Celery, pytest, pre-commit, Black, ruff, mypy, djlint
**Status:** Active

---

## Similar Projects

| Project | Relevance |
|---------|-----------|
| django-cookiecutter | Most-starred Django project template |
| django-tailwind-cli | Standalone Tailwind CSS binary (2026) |

---

## Key Findings

### Django 5.x Project Structure

- Layered settings (`base.py` → `local.py` → `production.py`) is 2026 industry standard
- Always start with a custom user model (impossible to add later without migrations)
- `django-environ` for all secrets; separate Compose files per environment
- Pre-configure Ruff (supersedes flake8+isort+pycodestyle), bandit, mypy via pre-commit
- Cookiecutter is one-shot scaffold — treat generated projects as standalone after creation

### django-tailwind Integration

- `django-tailwind-cli` (2026) provides standalone Tailwind binary — eliminates npm dependency
- django-tailwind v2.0 recommends `honcho` for running Django + Tailwind concurrently
- Production caching: `ManifestStaticFilesStorage` for cache-busting

---

## Cheatsheets & Quick Reference

| Topic | Resource | Type |
|-------|----------|------|
| Django 5.x settings | <https://docs.djangoproject.com/en/5.2/topics/settings/> | Docs |
| django-tailwind CLI | <https://django-tailwind.readthedocs.io/en/latest/installation.html> | Guide |
| Django deploy checklist | <https://docs.djangoproject.com/en/6.0/howto/deployment/checklist> | Checklist |

---

## Best Practices

1. **Settings split** — `base.py`, `local.py`, `production.py`, `test.py` in `config/settings/`
2. **Custom user model from day one** — set `AUTH_USER_MODEL` before first migration
3. **Separate Docker Compose files** — `local.yml` for dev, `production.yml` for prod
4. **Pre-commit hooks** — Ruff, end-of-file-fixer, trailing-whitespace, detect-private-key
5. **12-factor app** — config from environment, build/release/run separation

---

## Common Pitfalls

| Pitfall | Impact | Avoidance |
|---------|--------|-----------|
| Cookiecutter upgrade path | Stuck on old template | Treat generated project as standalone; patch manually |
| Feature sprawl | Unnecessary complexity | Only enable needed options during cookiecutter prompts |
| Missing custom user model | Migration nightmare | Set `AUTH_USER_MODEL` before first migration |
| Django version lock-in | Security gaps | Pin versions carefully; plan upgrades quarterly |

---

## Performance

1. **`ManifestStaticFilesStorage`** — cache-busting; invalidates on content change
2. **`select_related`/`prefetch_related`** — prevent N+1 queries in templates
3. **PostgreSQL connection pooling** — `CONN_MAX_AGE` or pgbouncer for production
4. **Gunicorn workers** — `2-4 × CPU cores` for sync; Uvicorn for async workloads
5. **Template caching** — `django.core.cache.backends` for fragment caching

---

## Security

1. **`python manage.py check --deploy`** — mandatory before every production deployment
2. **CSP via `django-csp`** — start in REPORT_ONLY mode first
3. **HSTS** — `SECURE_HSTS_SECONDS` with `includeSubDomains` preload
4. **Secure cookies** — `SESSION_COOKIE_SECURE`, `CSRF_COOKIE_SECURE`
5. **Rate limit auth endpoints** — protect against brute force; 64% of sites lack CSP headers in 2026

---

## Testing & Quality Assurance

1. **pytest + pytest-cov** — standard Django test runner; enforce `--cov-fail-under=80` in CI
2. **pre-commit CI** — run Ruff, mypy, djlint, Black before every PR
3. **Matrix testing** — test against Python 3.10–3.13 to catch compatibility regressions
4. **Factory Boy + pytest-django** — maintainable test fixtures; avoid fixture interdependency
5. **CI pipeline** — GitHub Actions with parallel workers, coverage combination, artifact upload

---

## Related Projects (in workspace)

- **ecom** — shared DRF + Django patterns
- **profile** — shared Django + PostgreSQL conventions
- **Django-Scrapy-Selenium** — shared Django architecture
- **xamehi** — shared Django/DRF conventions

---

## Resources

| Resource | URL |
|----------|-----|
| Django Docs | <https://docs.djangoproject.com/en/5.2/> |
| Cookiecutter Django | <https://github.com/cookiecutter/cookiecutter-django> |
| django-tailwind | <https://django-tailwind.readthedocs.io> |

### Research Methodology

- **Web search:** web_search (2026 Django patterns, deploy hardening)
- **Documentation:** web_extract (Django docs, cookiecutter-django repo)
- **Tool research:** django-tailwind-cli, Ruff migration patterns
- **Last verified:** 2026-07-28
