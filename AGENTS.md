# AGENTS.md

> **Refreshed by AGENTS workflow 2026-06-01**

## Project Overview

A Cookiecutter template for Django projects with Tailwind CSS integration. Generates a production-ready Django project with modern frontend tooling, Docker support, CI/CD, and best practices baked in.

**Tech Stack:**
- **Backend**: Python 3.12+, Django 5.x, Django REST Framework (optional)
- **Frontend**: Tailwind CSS via django-tailwind, Alpine.js (optional), htmx (optional)
- **Database**: PostgreSQL (production), SQLite (development)
- **Infrastructure**: Docker Compose, Gunicorn, WhiteNoise, Sentry
- **Testing**: pytest, django-test-migrations
- **Quality**: pre-commit hooks, flake8/ruff, mypy, djlint
- **CI/CD**: GitHub Actions with lint, test, security checks

## Hermes and Copilot

- Use the nearest `AGENTS.md` for files under `projects/cookiecutter-django-tailwind/`;
  this file is the local fallback.
- `projects/cookiecutter-django-tailwind/.github/copilot-instructions.md` is the
  primary Copilot guidance file for the template.
- Root Hermes orchestration assets live in `../../.github/agents/hermes.agent.md`
  and `../../.github/prompts/`.
- Keep this file, the local Copilot instructions, and the generated-project docs
  aligned whenever the template changes.

## Setup Commands

```bash
# Generate a new project from the template
cookiecutter gh:your-org/cookiecutter-django-tailwind

# Or after generating:
cd my_project

# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements/local.txt

# Run initial migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start development server
python manage.py runserver
```

## Development Workflow

```bash
# Run development server
python manage.py runserver

# Build Tailwind CSS
python manage.py tailwind start

# Run all quality checks
pre-commit run --all-files

# Check for security issues
pip-audit
```

## Testing Instructions

```bash
# Run all tests
pytest

# With coverage
pytest --cov

# Run specific app tests
pytest apps/users/tests/
```

## Code Style

- **Python**: Black (88 chars), ruff for linting, isort for imports
- **Django**: Follow Django's coding style and project conventions
- **Templates**: djlint for HTML template linting
- **CSS**: Utility-first with Tailwind, avoid custom CSS where possible
- **JavaScript**: Minimal — prefer htmx/Alpine.js over custom JS
- **Migrations**: Always create new migrations, never edit existing ones
- **Settings**: Split into `base.py`, `local.py`, `production.py`

## Build/Deployment

```bash
# Production checks
python manage.py check --deploy
python manage.py collectstatic

# Docker deployment
docker compose -f production.yml build
docker compose -f production.yml up -d
```

Deployment targets: Docker-based (DigitalOcean, Railway, Fly.io) or PaaS (Heroku).

## Security

- Never commit `SECRET_KEY`, database passwords, or API keys
- Use environment variables for all secrets via django-environ
- Always set `DEBUG=False` in production
- Enable HTTPS, HSTS, and secure cookies in production settings
- Keep Django and all dependencies updated
- Use `python manage.py check --deploy` before deployment
- Follow Django's security checklist

## Troubleshooting

- **Migration conflicts**: `python manage.py makemigrations --merge`
- **Tailwind not building**: Ensure Node.js is installed and `npm` is available
- **Docker issues**: `docker compose build --no-cache` then restart
- **Static files not loading**: Run `python manage.py collectstatic` and check `STATIC_ROOT` and `STATIC_URL`
- **Form rendering issues**: Ensure `crispy_forms` with `tailwind` or `bootstrap5` pack is configured
