# cookiecutter-django-tailwind Triage Context

**Date:** 2026-05-20
**Priority:** MEDIUM
**Stack:** Django, Tailwind CSS, Cookiecutter template, Heroku, Docker, PostgreSQL
**Branch:** main
**Repo path:** `Rhixe-company/cookiecutter-django-tailwind`

## Summary

Cookiecutter project template for Django + Tailwind CSS applications. The repository
generates a fully configured Django project with optional Heroku, Docker, and PostgreSQL
support. Has comprehensive Sphinx-based RST documentation in `docs/`.

## Issues Found & Fixed

| # | Issue | Action | Commit |
|---|-------|--------|--------|
| 1 | Stale `{{cookiecutter.project_slug}}/bin/post_compile` Heroku build script deleted from disk but not staged | Staged removal, committed clean | `855f921` |

## Final State

- **Working tree:** Clean
- **Last commit:** `855f921` — chore: remove stale bin/post_compile heroku script
- **Docs:** Full Sphinx RST documentation in `docs/` (contributing, deployment, FAQ, settings)
- **CI/CD:** No active workflow files observed

## Recommendations

- Add `.github/workflows/` CI workflow (lint + test on push)
- Verify Heroku `Procfile` / `app.json` are still current with latest Django/Tailwind versions
- Consider adding a GitHub Actions workflow to build the Sphinx docs
