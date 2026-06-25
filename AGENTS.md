# cookiecutter-django-tailwind

## Architecture
- **Type:** Django project template / cookiecutter generator
- **Pattern:** Cookiecutter template with layered settings (base → local → production)
- **Reference:** [Workflow Analysis](docs/Project_Architecture/Workflow_Analysis.md), [Exemplars](docs/Project_Architecture/exemplars.md)

Django 5.x + Tailwind CSS project template. Generates production-ready Django projects with modern frontend tooling. Meant to be forked/used as a starting point, not run directly.

## Stack
- **Backend:** Python 3.12+, Django 5.x, optional Django REST Framework
- **Frontend:** django-tailwind, optional Alpine.js / htmx
- **Database:** PostgreSQL (prod), SQLite (dev)
- **Infra:** Docker Compose, Gunicorn, WhiteNoise, Sentry
- **Quality:** pytest, pre-commit, Black, ruff, mypy, djlint

## Commands
```bash
cookiecutter gh:your-org/cookiecutter-django-tailwind
cd my_project
python -m venv .venv && source .venv/bin/activate
pip install -r requirements/local.txt
python manage.py migrate && python manage.py createsuperuser
python manage.py runserver
python manage.py tailwind start
pytest --cov
```

## Production
```bash
python manage.py check --deploy && python manage.py collectstatic
docker compose -f production.yml build && docker compose -f production.yml up -d
```

## Conventions
- Settings hierarchy: `base.py` → `local.py` → `production.py`
- django-environ for secrets; never commit secrets
- Tailwind utility-first CSS; minimal custom CSS
- Type hints required in all new code
- pre-commit hooks for linting before commit

## Notes
- Template repo — customize for each new project
- Optional DRF for API needs
- Sentry for error tracking in production
