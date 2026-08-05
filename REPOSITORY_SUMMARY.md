# Cookiecutter Django Tailwind — Repository Summary

**Generated:** 2026-07-25  
**Project:** `projects/cookiecutter-django-tailwind/`  
**Type:** Django Project Template (Cookiecutter)  
**Status:** Maintenance (Template only)

---

## Architecture Overview

| Property | Value |
|----------|-------|
| **Type** | Cookiecutter template generator |
| **Output** | Production-ready Django 5.x projects |
| **Frontend** | django-tailwind + Tailwind CSS |
| **Database** | PostgreSQL (prod), SQLite (dev) |
| **Quality** | pytest, pre-commit, Black, ruff, mypy, djlint |

---

## Generated Project Structure

```
{{cookiecutter.project_slug}}/
├── {{cookiecutter.project_slug}}/       # Django project package
│   ├── settings/
│   │   ├── base.py                      # Shared settings
│   │   ├── local.py                     # Development
│   │   └── production.py                # Production
│   ├── urls.py
│   └── wsgi.py
├── apps/                                # Generated apps go here
├── requirements/
│   ├── base.txt
│   ├── local.txt
│   └── production.txt
├── templates/                           # Base templates
├── static/                              # Static assets
├── docker/
│   ├── docker-compose.yml
│   └── Dockerfile
├── pyproject.toml                       # Tool configs (ruff, mypy, etc.)
└── README.md
```

---

## Technologies

| Layer | Stack |
|-------|-------|
| Backend | Python 3.12+, Django 5.x, optional DRF |
| Frontend | django-tailwind, Tailwind CSS, optional Alpine.js/htmx |
| Database | PostgreSQL (prod), SQLite (dev) |
| Auth | Django auth (extendable to allauth) |
| Quality | pytest, Black, ruff, mypy, djlint, pre-commit |
| Container | Docker Compose, Gunicorn, WhiteNoise |
| Monitoring | Sentry (optional) |

---

## Configuration Highlights

**Settings Hierarchy:**

```python
# base.py → local.py (dev) OR production.py (prod)
from .base import *
DEBUG = True  # local.py
DEBUG = False  # production.py
```

**Quality Tools (pyproject.toml):**

```toml
[tool.ruff]          # Line length 119, target py312
[tool.black]         # Same line length
[tool.mypy]          # Strict, django-stubs plugin
[tool.djlint]        # Django template linting
```

---

## Commands

```bash
# Generate new project
cookiecutter gh:your-org/cookiecutter-django-tailwind

# In generated project
python -m venv .venv && source .venv/bin/activate
pip install -r requirements/local.txt
python manage.py migrate && python manage.py createsuperuser
python manage.py runserver
python manage.py tailwind start

# Quality
pytest --cov
ruff check . && black --check . && mypy . && djlint .

# Production
python manage.py check --deploy && python manage.py collectstatic
docker compose -f production.yml build && docker compose -f production.yml up -d
```

---

## CI/CD

**Workflow:** `.github/workflows/cookiecutter-django-tailwind-ci.yml` (not yet created)  
**Note:** Template repos typically don't need CI — generated projects do.

---

## Related Projects

- **Django-Scrapy-Selenium** — Uses similar Django patterns
- **ecom** — Django + React, separate patterns
- **profile** — Django + GCS, simpler stack
- **xamehi.tv** — DRF backend patterns

---

## Maintenance Notes

- Template-only — no deployment, no runtime
- Update Django/Tailwind versions in `cookiecutter.json` and `requirements/`
- Test by generating a project and running its test suite
- Keep `pyproject.toml` tool configs synchronized with workspace standards
