# cookiecutter-django-tailwind — Django Project Generator

> **Stack:** Django 5.x + Tailwind CSS | **Type:** Project Generator / Template | **Status:** Active

A cookiecutter project template for generating Django 5.x projects with Tailwind CSS, providing a modern, production-ready starting point with best practices baked in.

---

## Technology Stack

### Languages & Runtimes

| Technology | Version | Usage |
|---|---|---|
| **Python** | ^3.12 | Backend language |
| **Django** | ^5.x | Web framework |
| **JavaScript** | — | Frontend (Tailwind) |
| **HTML/CSS** | — | Server-rendered templates |

### Generated Project Dependencies

| Category | Technologies |
|---|---|
| **Web Framework** | Django 5.x |
| **API Framework** | Django REST Framework (optional) |
| **Frontend** | Tailwind CSS (via django-tailwind), Alpine.js, htmx |
| **Database** | PostgreSQL (production), SQLite (development) |
| **ASGI/WSGI** | Gunicorn, uvicorn |
| **Static Files** | WhiteNoise |
| **Monitoring** | Sentry SDK |
| **Security** | django-environ |

### Development Tools

| Tool | Purpose |
|---|---|
| **pytest + pytest-cov** | Testing & coverage |
| **pre-commit** | Git hook management |
| **Black** | Code formatting |
| **ruff** | Linting |
| **mypy** | Type checking |
| **djlint** | Django template linting |
| **isort** | Import sorting |

## Architecture

```
┌─────────────────────────────────────────────────────┐
│           Generated Django Project                    │
├─────────────────────────────────────────────────────┤
│  Django 5.x                                          │
│  ├── Apps (modular Django applications)              │
│  ├── REST API (optional DRF)                         │
│  └── Admin Interface                                 │
├─────────────────────────────────────────────────────┤
│  Frontend                                            │
│  ├── Tailwind CSS (utility-first)                    │
│  ├── Alpine.js / htmx (optional interactivity)       │
│  └── Django Templates (server-rendered)              │
├─────────────────────────────────────────────────────┤
│  Infrastructure                                      │
│  ├── PostgreSQL (prod) / SQLite (dev)               │
│  ├── Gunicorn + WhiteNoise                          │
│  ├── Docker Compose                                 │
│  └── Sentry (error monitoring)                      │
├─────────────────────────────────────────────────────┤
│  Quality                                            │
│  ├── pytest + coverage                               │
│  ├── Black + ruff + mypy                            │
│  ├── pre-commit hooks                               │
│  └── djlint (template linting)                      │
└─────────────────────────────────────────────────────┘
```

## Generated Project Structure

```
my_project/
├── config/
│   ├── settings/
│   │   ├── base.py         # Shared settings
│   │   ├── local.py        # Development settings
│   │   └── production.py   # Production settings
│   ├── urls.py
│   └── wsgi.py
├── apps/                    # Django applications
├── static/                  # Static assets
├── templates/               # Django templates
├── requirements/
│   ├── base.txt
│   ├── local.txt
│   └── production.txt
├── Dockerfile
├── docker-compose.yml
└── pyproject.toml
```

## Getting Started

```bash
# Generate a new project
cookiecutter gh:your-org/cookiecutter-django-tailwind

# Navigate to your project
cd my_project

# Set up virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements/local.txt

# Set up database
python manage.py migrate
python manage.py createsuperuser

# Start development
python manage.py runserver
python manage.py tailwind start  # Start Tailwind CSS watcher

# Run tests
pytest --cov
```

## Production Deployment

```bash
# Production readiness check
python manage.py check --deploy
python manage.py collectstatic

# Deploy with Docker
docker compose -f production.yml build
docker compose -f production.yml up -d
```

## Key Features

- **Modern Django 5.x setup** with best practices
- **Tailwind CSS** utility-first styling out of the box
- **Optional DRF** for REST API development
- **Alpine.js / htmx** for lightweight interactivity
- **Layered settings** (base → local → production)
- **django-environ** for secret management
- **Docker Compose** for consistent development/deployment
- **Quality tooling** (pytest, Black, ruff, mypy, pre-commit)

## Coding Standards

- **Settings layering**: `base.py` → `local.py` → `production.py`
- **Environment variables**: Via django-environ (never commit secrets)
- **Tailwind utility-first**: Minimal custom CSS
- **PEP 8**: Python code style
- **Type hints**: Modern Python typing
- **12-factor app principles**: Config from environment
- **Black line length**: 88 characters

## Template Configuration

| Aspect | Details |
|---|---|
| **Template Engine** | Cookiecutter (Jinja2-based) |
| **Variables** | `project_slug`, `author_name`, etc. |
| **Post-generation hooks** | Git init, pip install, migrations |

## License

Varies per generated project. Template distributed under open-source license.
