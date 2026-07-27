# The Story of Cookiecutter Django Tailwind

*The template that learned to generate production apps*

---

## Prologue: The Third Rewrite

The first Django project in the workspace (`profile`) was hand-crafted. The second (`ecom`) copied and modified the first. The third (`xamehi.tv`) copied and modified the second.

By the fourth, the pattern was clear: **every project repeated 80% of the same boilerplate.**

- Settings hierarchy (base → local → production)
- Docker Compose with Gunicorn + WhiteNoise
- Tailwind via `django-tailwind`
- Quality tool configs (ruff, Black, mypy, djlint, pre-commit)
- Requirements split (base/local/production)
- CI workflow template

The fourth time, instead of copying, they built a **cookiecutter template**.

---

## Chapter 1: The Cookiecutter Architecture

Cookiecutter isn't just variable substitution. It's a **templating engine with logic**:

```jinja
{# cookiecutter.json #}
{
  "project_name": "My Project",
  "project_slug": "{{ cookiecutter.project_name.lower().replace(' ', '_') }}",
  "use_drf": "y",
  "use_allauth": "n",
  "database": "postgresql"
}
```

```jinja
{# {{cookiecutter.project_slug}}/requirements/base.txt #}
Django>=5.0,<6.0
{% if cookiecutter.use_drf == 'y' %}
djangorestframework>=3.15
{% endif %}
{% if cookiecutter.use_allauth == 'y' %}
django-allauth>=65.0
{% endif %}
```

The template generates **different projects** from the same source — not just different names.

---

## Chapter 2: The Settings Hierarchy

The generated project's crown jewel:

```
settings/
├── base.py          # Everything shared
├── local.py         # DEBUG=True, SQLite, dev tools
└── production.py    # DEBUG=False, PostgreSQL, security
```

`local.py` imports `base.py` and overrides. `production.py` imports `base.py` and overrides differently. **Single source of truth, environment-specific values.**

This pattern came from `profile` (the first project) and was refined through `ecom` and `xamehi.tv`. The template codified tribal knowledge.

---

## Chapter 3: Quality Gates as Defaults

Every generated project gets:

```yaml
# .github/workflows/ci.yml (generated)
- ruff check .
- black --check .
- mypy .
- djlint templates/
- pytest --cov
- python manage.py check --deploy
```

No "add CI later." It's there on day one. The template *is* the standard.

---

## Chapter 4: The Docker Standard

```dockerfile
# Generated Dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements/production.txt .
RUN pip install --no-cache-dir -r production.txt
COPY . .
RUN python manage.py collectstatic --noinput
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"]
```

```yaml
# docker-compose.yml (generated)
services:
  web:
    build: .
    ports: ["8000:8000"]
    env_file: .env
    depends_on: [db]
  db:
    image: postgres:16
    volumes: [postgres_data:/var/lib/postgresql/data]
```

Zero-config production deploy. `docker compose -f production.yml up -d` works.

---

## Chapter 5: The Template That Generates Templates

The meta-moment: the template repo *itself* uses the same tooling it generates.

- `pyproject.toml` with ruff/Black/mypy/djlint
- `pre-commit` hooks
- `pytest` for template tests (generate → build → test)

```bash
# Test the template
cookiecutter . --no-input project_name="Test Project" use_drf=y
cd test-project
pytest  # Runs generated project's tests
```

The template tests itself by generating a project and testing the output.

---

## Chapter 6: Adoption & Drift

| Project | Used Template? | Drift |
|---------|---------------|-------|
| `profile` | No (pre-template) | High |
| `ecom` | No (pre-template) | High |
| `xamehi.tv` | No (pre-template) | High |
| `rhixecompany-comics` (backend) | **Yes** | Low |
| Future projects | **Yes** | Zero (by default) |

The template didn't retrofit — it only applies forward. But `rhixecompany-comics/backend` matches the template 95%. The 5% drift is intentional (Celery config, custom apps).

---

## Chapter 7: Current State (July 2025)

The template sits at `projects/cookiecutter-django-tailwind/`. It's **not deployed** — it's a **generator**.

**Contents:**
- `cookiecutter.json` — 12 variables
- `{{cookiecutter.project_slug}}/` — 47 template files
- `hooks/` — pre/post generation scripts
- `tests/` — template validation

**Maintenance:**
- Update Django version in `cookiecutter.json` + `requirements/base.txt`
- Sync tool configs with workspace standards (ruff, mypy, etc.)
- Test by generating → running generated project's test suite

---

## Epilogue: The Template Paradox

A good template is **opinionated enough to save time, flexible enough to not fight you.**

This template:
- ✅ Enforces settings hierarchy, quality tools, Docker
- ✅ Makes DRF/allauth/database optional
- ❌ Doesn't dictate app structure, API design, business logic

The next Django project in this workspace will use it. The one after that will too. Each generated project starts at "week 3" of the old manual process.

**The template is the workspace's memory of how to start a Django project correctly.**

---

*Written by the workspace chronicler, July 25, 2025.  
Filed at `projects/cookiecutter-django-tailwind/THE_STORY_OF_THIS_REPO.md`.*