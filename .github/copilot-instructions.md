# Copilot Instructions

Project-wide guidance for the cookiecutter template.

## Source of truth

- `projects/cookiecutter-django-tailwind/AGENTS.md`
- `README.md`
- generated-template files

## Commands

Run from the template root or from a generated project:

```bash
cookiecutter gh:your-org/cookiecutter-django-tailwind
python -m venv .venv
pip install -r requirements/local.txt
python manage.py migrate
python manage.py runserver
python manage.py tailwind start
pre-commit run --all-files
pip-audit
pytest
python manage.py check --deploy
python manage.py collectstatic
```

## Architecture

- This repository defines a Django project template, not a single app.
- Generated projects should split settings into base/local/production modules.
- Tailwind, Django, and deployment defaults are baked into the template.

## Conventions

- Keep migrations additive; do not edit existing migrations.
- Favor Tailwind utilities and minimal custom JavaScript.
- Keep template, README, and generated output examples aligned.
- Use environment variables for secrets in generated projects.

