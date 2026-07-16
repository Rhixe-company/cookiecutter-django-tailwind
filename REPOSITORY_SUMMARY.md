# REPOSITORY_SUMMARY.md — cookiecutter-django-tailwind

> Generated from actual git history and repository files. Evidence-based; nothing fabricated.

## Overview

**cookiecutter-django-tailwind** is a **Django 5.x project generator** (a Cookiecutter template), not a runnable application. It scaffolds production-ready Django projects with Tailwind CSS, modern frontend tooling, and best-practice configuration baked in. Per `AGENTS.md`, it is "meant to be forked/used as a starting point, not run directly."

Distinct from the other four repos, this one is a **Python template project** with a genuine upstream lineage:
- A large `CHANGELOG.md` (~234 KB) and `CONTRIBUTORS.md` (~45 KB) indicate it tracks a real open-source project's history.
- It uses the Cookiecutter engine: `cookiecutter.json`, `{{cookiecutter.project_slug}}/` template tree, `hooks/`, `scripts/`, `tests/`.
- Despite the local git submodule having only 5 commits, the bundled `CHANGELOG.md`/`CONTRIBUTORS.md` reflect a far larger original project.

Generated projects get: Django 5.x, optional Django REST Framework, Tailwind CSS (via django-tailwind), optional Alpine.js/htmx, PostgreSQL (prod)/SQLite (dev), layered settings (base→local→production), django-environ, Docker Compose, and quality tooling (pytest, Black, ruff, mypy, djlint, pre-commit).

## Architecture

- **Type:** Cookiecutter template (Jinja2-based) — generates Django projects
- **Template variables:** `project_slug`, `author_name`, etc.
- **Post-generation hooks:** git init, pip install, migrations
- **Generated project layout:**
  ```
  my_project/
  ├── config/settings/{base,local,production}.py
  ├── config/urls.py, wsgi.py
  ├── apps/                    # Django applications
  ├── static/  templates/
  ├── requirements/{base,local,production}.txt
  ├── Dockerfile  docker-compose.yml  pyproject.toml
  ```

### Layer map (of a generated project, from `README.md`)
```
Generated Django Project
├── Django 5.x (apps, optional DRF, admin)
├── Frontend: Tailwind CSS, Alpine.js/htmx, Django templates
├── Infra: PostgreSQL/SQLite, Gunicorn + WhiteNoise, Docker Compose, Sentry
└── Quality: pytest+coverage, Black+ruff+mypy, pre-commit, djlint
```

## Key Components

- **`cookiecutter.json`** — template variables/config.
- **`{{cookiecutter.project_slug}}/`** — the project skeleton emitted on generation (contains its own `README.md`).
- **`hooks/`** — Cookiecutter pre/post-gen hooks.
- **`scripts/`** — helper scripts.
- **`tests/`** — template test suite.
- **`docs/`** — `audit-report.md`, `CODE_DOCS.md`, `contributing.md`, `cookiecutter-triage-context.md`, `maintainer-guide.md`, `PROJECT_DOCS.md`.
- **`.github/`** — `changelog-template.md`, `CONTRIBUTORS-template.md`, `PULL_REQUEST_TEMPLATE.md`, `copilot-instructions.md`.
- **Root config:** `pyproject.toml`, `setup.py`, `tox.ini`, `.pre-commit-config.yaml`, `.flake8`, `.pyup.yml`, `.readthedocs.yaml`, `requirements.txt`.
- **Signaling artifacts:** `CHANGELOG.md` (233 KB), `CONTRIBUTORS.md` (45 KB) — these encode the upstream project's broader history.

## Technologies

From `README.md` / `AGENTS.md`:
- **Languages/runtimes:** Python ^3.12 (backend), JavaScript (Tailwind), HTML/CSS (templates)
- **Web framework:** Django ^5.x
- **Optional API:** Django REST Framework
- **Frontend:** Tailwind CSS (via django-tailwind), Alpine.js, htmx
- **Database:** PostgreSQL (prod), SQLite (dev)
- **Serving:** Gunicorn, uvicorn; WhiteNoise for static
- **Monitoring:** Sentry SDK
- **Security:** django-environ
- **Quality:** pytest + pytest-cov, pre-commit, Black, ruff, mypy, djlint, isort

## Data Flow

As a generator, there is no runtime data flow. The "flow" is: `cookiecutter <repo>` → prompt for variables → render `{{cookiecutter.project_slug}}` → run post-gen hooks (git init, pip install, migrate). A generated project then follows standard Django request → view/DRF → ORM → PostgreSQL.

## Team

Git contributor statistics (`git shortlog -sn`):
- **Total contributors (local submodule):** 1
- **Contributor:** `rhixecompany <rhixecompany@gmail.com>` — 5 commits (100%)

> Important nuance: the local git log has 1 author, but the bundled `CONTRIBUTORS.md` (45 KB) and `CHANGELOG.md` (234 KB) attest to a much larger *upstream* contributor base. The local submodule history only records the workspace setup — it does not reproduce the template's original open-source lineage. See `THE_STORY_OF_THIS_REPO.md`.

## Evidence Appendix (git)

- `git rev-list --count HEAD` = **5** commits total (all within the last year).
- Commit dates span **2026-06-12 → 2026-07-16**, all authored by `rhixecompany`.
- Unlike its siblings, this repo's *content* (CHANGELOG/CONTRIBUTORS) hints at a substantial pre-existing project that was vendored in as a submodule.
