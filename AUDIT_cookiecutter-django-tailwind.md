# AUDIT_cookiecutter-django-tailwind.md

> Read-only repo-management audit — Phases 0, 2, 3.
> Destructive phases (1: branch delete/push, 4: create CI) HELD for user approval.
> Generated: 2026-07-16

## Overview
- **Type**: Cookiecutter template that scaffolds a Django + Tailwind project.
- **Docs present**: `README.md`, `AGENTS.md`, `CONTRIBUTING.md`, `CONTRIBUTORS.md`, large `CHANGELOG.md`, `docs/` directory.
- **Tooling**: Python (setup.py, pyproject.toml, tox.ini), pre-commit, flake8, readthedocs, pyup.
- **Manifest**: `pyproject.toml` (build-system) + `setup.py`; `requirements.txt` for dev tooling; `cookiecutter.json` defines template variables. Template body lives in `{{cookiecutter.project_slug}}/`.

## Disk Usage
- `2.8M` (excludes `.git`, `node_modules`, `venv`, `__pycache__`, `dist`, `build`, `target`).
- Largest non-source artifact: `CHANGELOG.md` (~234 KB). No `node_modules`.

## Entrypoint
- Detected: `setup.py` present (Python package install entry for the cookiecutter template itself).
- No `package.json` `main`/`start`, no `main.py`/`def main` in root.
- Template is invoked via `cookiecutter` CLI using `cookiecutter.json`.

## Gitignore Audit (missing entries)
`.gitignore` EXISTS (3555 bytes). Coverage check against the standard baseline:

| Entry | Status |
|-------|--------|
| `node_modules/` | **MISSING** |
| `.env` | PRESENT |
| `*.pyc` | **MISSING** |
| `__pycache__/` | PRESENT |
| `dist/` | PRESENT |
| `build/` | PRESENT |
| `.next/` | **MISSING** |
| `venv/` | PRESENT |
| `.DS_Store` | PRESENT |

**Missing entries:** `node_modules/`, `*.pyc`, `.next/`
- Impact: low. This is a Python template; the generated project (not this repo) would use `node_modules/`/`.next/`. `*.pyc` gap is minor but should ideally be covered. Verified `.env` is NOT currently tracked.

## Dependency Audit (manifest type, top deps, audit-tool availability)
- **Manifest type**: `requirements.txt` (Python dev tooling) + `pyproject.toml` (build). No JS manifest.
- **Top deps (from requirements.txt)**: `cookiecutter==2.6.0`, `ruff==0.5.5`, `django-upgrade==1.20.0`, `djlint==1.34.1`, `pre-commit==3.8.0`, `tox==4.16.0`, `pytest==8.3.2`, `PyGithub==2.3.0`, `gitpython==3.1.43`, `jinja2==3.1.4`, `requests==2.32.3`.
- **Audit tool availability**: `pip-audit` NOT installed in this environment (note only). `pip list` available. Recommend `pip install pip-audit` then audit under user approval.
- **Outdated/known-bad flags**: none flagged from manifest names only. Versions appear current/maintained (e.g. requests 2.32.3, jinja2 3.1.4).

## Branch State
```
* development
  production
```
- Two branches: `development` (current) and `production`.
- No stray `master` or orphan branches. Branch naming follows the `development`/`production` convention.

## Destructive Phases HELD (pending approval)
- **Phase 1** (branch deletion / push): HELD. No branches slated for deletion; nothing pushed.
- **Phase 4** (create CI): HELD. No CI workflow file created (note: repo already has `.github/` workflows; not modified).

> Next step (approval required): install & run `pip-audit`, then optionally proceed to Phase 1/4.
