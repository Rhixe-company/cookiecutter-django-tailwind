# 🏗 Technology Stack Blueprint - cookiecutter-django-tailwind

**Project Path:** `projects/cookiecutter-django-tailwind`
**Generated:** 2026-07-28
**Type:** Django Project Template (Cookiecutter Generator)

---

## Core Technologies

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Template Engine** | Cookiecutter | 2.6.0 | Project generation |
| **Language** | Python | 3.12+ | Template logic & generated projects |
| **Framework** | Django | 5.x | Generated project framework |
| **Frontend** | django-tailwind + Tailwind CSS | Latest | Utility-first CSS |
| **Optional JS** | Alpine.js / htmx | Latest | Lightweight interactivity |
| **Database** | PostgreSQL (prod) / SQLite (dev) | 15+ / 3.x | Relational database |
| **WSGI** | Gunicorn | Latest | Production server |
| **Static Files** | WhiteNoise | Latest | Static file serving |
| **Error Tracking** | Sentry SDK | Latest | Error monitoring |
| **Env Config** | django-environ | Latest | 12-factor config |

---

## Development & Quality Tools (Template Deps)

| Tool | Version | Purpose |
|------|---------|---------|
| **ruff** | 0.5.5 | Python linting & formatting |
| **django-upgrade** | 1.20.0 | Auto-upgrade Django code |
| **djlint** | 1.34.1 | Django template linting |
| **pre-commit** | 3.8.0 | Git hooks |
| **tox** | 4.16.0 | Multi-env testing |
| **pytest** | 8.3.2 | Testing framework |
| **pytest-xdist** | 3.6.1 | Parallel test execution |
| **pytest-cookies** | 0.7.0 | Cookiecutter template testing |
| **pytest-instafail** | 0.5.0 | Fast test failure output |
| **PyYAML** | 6.0.1 | YAML parsing |
| **PyGithub** | 2.3.0 | GitHub API |
| **GitPython** | 3.1.43 | Git operations |
| **Jinja2** | 3.1.4 | Template rendering (internal) |
| **requests** | 2.32.3 | HTTP requests |

---

## Generated Project Stack

When a user runs `cookiecutter gh:.../cookiecutter-django-tailwind`, the generated project includes:

### Backend (Django)
| Component | Technology |
|-----------|------------|
| **Framework** | Django 5.x |
| **API (optional)** | Django REST Framework |
| **Auth** | Django Allauth (social + email) |
| **Database** | PostgreSQL (prod), SQLite (dev) |
| **Migrations** | Django built-in |
| **Admin** | Django Admin (customized) |
| **Static Files** | WhiteNoise + Tailwind |
| **Media Files** | Configurable (local/S3/GCS) |
| **Caching** | Redis (optional) |
| **Task Queue** | Celery + Redis (optional) |

### Frontend
| Component | Technology |
|-----------|------------|
| **CSS** | Tailwind CSS via django-tailwind |
| **JS Runtime** | Node.js (for Tailwind build) |
| **Interactivity** | Alpine.js / htmx (optional) |
| **Components** | Tailwind + custom |

### DevOps
| Component | Technology |
|-----------|------------|
| **Container** | Docker + Docker Compose |
| **WSGI** | Gunicorn |
| **Process Manager** | systemd (prod) / Docker Compose |
| **Reverse Proxy** | Nginx (in Docker) |
| **SSL** | Let's Encrypt / Traefik |
| **Monitoring** | Sentry |
| **CI/CD** | GitHub Actions (generated) |

---

## Settings Hierarchy

```
config/
├── settings/
│   ├── base.py          # Shared settings
│   ├── local.py         # Development overrides
│   ├── production.py    # Production settings
│   └── test.py          # Test settings
```

- **django-environ** loads from `.env` (never committed)
- `DEBUG=False` by default in production
- `SECRET_KEY` from environment
- Database URL from `DATABASE_URL` env var

---

## Quality Configuration

### Ruff (`pyproject.toml`)
```toml
[tool.ruff]
target-version = "py312"
line-length = 119
select = ["E", "F", "I", "N", "W", "UP", "B", "SIM", "ARG", "RUF"]
ignore = ["E501", "N818"]
```

### djLint
```toml
[tool.djlint]
profile = "jinja"
indent = 2
max_line_length = 119
ignore = ["H006", "H030", "H031", "T002", "T028"]
include = ["H017", "H035"]
```

### MyPy
```toml
[tool.mypy]
python_version = "3.12"
check_untyped_defs = true
warn_unused_ignores = true
plugins = ["mypy_django_plugin.main"]
```

### pytest
```toml
[tool.pytest.ini_options]
addopts = "-v --tb=short"
norecursedirs = [".tox", ".git", "*/migrations/*", "*/static/*", "docs", "venv"]
python_files = ["tests.py", "test_*.py"]
```

---

## Template Structure

```
cookiecutter-django-tailwind/
├── {{cookiecutter.project_slug}}/     # Generated project template
│   ├── config/                       # Django settings
│   ├── apps/                         # App templates
│   ├── static/                       # Static files
│   ├── templates/                    # Base templates
│   ├── docker/                       # Docker files
│   ├── .github/workflows/            # CI/CD templates
│   ├── pyproject.toml                # Tool config
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── README.md
├── hooks/
│   ├── pre_gen_project.py            # Pre-generation validation
│   └── post_gen_project.py           # Post-generation setup
├── cookiecutter.json                 # Template variables
├── pyproject.toml                    # Template's own config
└── requirements.txt                  # Template dependencies
```

---

## Key Template Variables (`cookiecutter.json`)

```json
{
  "project_name": "My Project",
  "project_slug": "my_project",
  "description": "A Django project",
  "author_name": "Your Name",
  "author_email": "you@example.com",
  "domain_name": "example.com",
  "use_docker": "y",
  "use_drf": "n",
  "use_celery": "n",
  "use_redis": "n",
  "use_sentry": "y",
  "use_whitenoise": "y",
  "use_tailwind": "y",
  "use_alpine": "y",
  "use_htmx": "n",
  "cloud_provider": "AWS",
  "postgresql_version": "15",
  "python_version": "3.12"
}
```

---

## Commands

### Template Development
```bash
# Install template deps
pip install -r requirements.txt

# Test template generation
pytest --cookies

# Lint template code
ruff check .
djlint .
```

### Generated Project
```bash
# Create project
cookiecutter gh:your-org/cookiecutter-django-tailwind

# Setup generated project
cd my_project
python -m venv .venv && source .venv/bin/activate
pip install -r requirements/local.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py tailwind install
python manage.py tailwind start
python manage.py runserver
```

---

## CI/CD (Generated)

**GitHub Actions workflow template includes:**
- Python matrix testing (3.11, 3.12, 3.13)
- Ruff + djLint + MyPy
- pytest with coverage
- Docker build verification
- Security scanning (bandit, safety)

---

## License

| Component | License |
|-----------|---------|
| Cookiecutter | BSD-3-Clause |
| Django | BSD-3-Clause |
| Tailwind CSS | MIT |
| All quality tools | MIT / BSD |

**Template itself:** MIT (configurable in `cookiecutter.json`)

---

*Generated by Hermes Agent Technology Stack Blueprint Generator*