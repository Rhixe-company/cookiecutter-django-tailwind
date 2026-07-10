# Cookiecutter Django + Tailwind Code Documentation

## Overview

A Cookiecutter project template for scaffolding Django applications with Tailwind CSS integration. Provides pre-configured project structure, authentication, and modern CSS tooling.

**Template Type:** Cookiecutter | **Stack:** Django 4.x | Tailwind CSS 3.x | Python 3.10+  

---

## 1. Template Configuration

**File:** `cookiecutter.json`

```json
{
  "project_name": "Django Tailwind Project",
  "project_slug": "{{ cookiecutter.project_name.lower().replace(' ', '_').replace('-','_') }}",
  "description": "A Django project with Tailwind CSS",
  "author_name": "Your Name",
  "domain_name": "example.com",
  "email": "{{ cookiecutter.author_name.lower().replace(' ', '.') }}@{{ cookiecutter.domain_name }}",
  "version": "0.1.0",
  "use_docker": "y",
  "use_celery": "n",
  "postgres_user": "postgres",
  "postgres_password": "postgres",
  "_extensions": ["jinja2_time.TimeExtension"]
}
```

### Configuration Variables

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `project_name` | string | "Django Tailwind Project" | Human-readable project name |
| `project_slug` | derived | Auto-generated from `project_name` | Python package name, URL prefix |
| `description` | string | "A Django project with Tailwind CSS" | Project description |
| `author_name` | string | "Your Name" | Project author |
| `domain_name` | string | "example.com" | Production domain |
| `email` | derived | Auto-generated | Admin contact email |
| `version` | string | "0.1.0" | Project version |
| `use_docker` | choice | "y" | Docker configuration flag |
| `use_celery` | choice | "n" | Celery task queue flag |
| `postgres_user` | string | "postgres" | Default DB user |
| `postgres_password` | string | "postgres" | Default DB password |

### Template Extensions

- `jinja2_time.TimeExtension` — Provides `{% now 'utc' %}` and `{% now 'local' %}` for timestamp injection during project generation

---

## 2. Pre-Generation Hooks

**File:** `hooks/pre_gen_project.py`

```python
import sys

def main():
    project_slug = "{{ cookiecutter.project_slug }}"

    if not project_slug.isidentifier():
        print(f'ERROR: {project_slug} is not a valid Python identifier.')
        sys.exit(1)

    print(f"Creating project: {project_slug}")
    print(f"Description: {{ cookiecutter.description }}")

if __name__ == "__main__":
    main()
```

### Validation Logic

- **Identifier check:** Ensures `project_slug` is a valid Python identifier using `str.isidentifier()`
- Prevents generation with invalid package names
- Exit code 1 aborts template rendering on validation failure

### Post-Generation Hooks (if present)

Expected post-generation tasks:

1. Initialize git repository
2. Create initial migration
3. Install frontend dependencies (npm/pnpm)
4. Build Tailwind CSS
5. Generate SECRET_KEY

---

## 3. Template Directory Structure

```
{{cookiecutter.project_slug}}/
├── backend/
│   ├── config/
│   │   ├── settings/
│   │   │   ├── base.py          # Shared settings
│   │   │   ├── local.py         # Development settings
│   │   │   └── production.py    # Production settings
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   ├── apps/
│   │   ├── accounts/            # Auth app (login, signup, password reset)
│   │   │   ├── models.py
│   │   │   ├── views.py
│   │   │   ├── urls.py
│   │   │   ├── forms.py
│   │   │   ├── tests.py
│   │   │   └── templates/
│   │   │       └── accounts/
│   │   │           ├── login.html
│   │   │           ├── signup.html
│   │   │           ├── password_change.html
│   │   │           └── password_reset.html
│   │   └── pages/               # Main pages app
│   │       ├── models.py
│   │       ├── views.py
│   │       ├── urls.py
│   │       └── templates/
│   │           └── pages/
│   │               └── home.html
│   ├── static/
│   │   ├── css/
│   │   └── js/
│   ├── templates/
│   │   ├── base.html            # Base template with Tailwind
│   │   ├── includes/
│   │   │   ├── header.html
│   │   │   └── footer.html
│   │   └── 404.html
│   ├── manage.py
│   └── requirements/
│       ├── base.txt             # Common dependencies
│       ├── local.txt            # Dev dependencies
│       └── production.txt       # Production dependencies
├── frontend/
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── src/
│       ├── styles.css           # Tailwind entry point
│       └── app.js
├── docker-compose.yml           # (if use_docker == "y")
├── Dockerfile                   # (if use_docker == "y")
├── .env.example
├── .gitignore
└── README.md
```

---

## 4. Django Settings Architecture

Three-tier settings module:

### `settings/base.py`

Base configuration shared across environments:

- `INSTALLED_APPS` — Django defaults + accounts + pages
- `MIDDLEWARE` — Standard Django middleware stack
- `TEMPLATES` — Django template engine with `context_processors`
- `DATABASES` — SQLite default (overridden in other settings)
- `AUTH_PASSWORD_VALIDATORS` — Default Django validators
- `STATIC_URL`, `STATICFILES_DIRS`, `STATIC_ROOT`
- `LANGUAGE_CODE`, `TIME_ZONE`, `USE_I18N`, `USE_TZ`

### `settings/local.py`

Development overrides:

- `DEBUG = True`
- SQLite database (fast, no external dependency)
- Django Debug Toolbar (if installed)
- Console email backend
- CORS headers for local frontend

### `settings/production.py`

Production configuration:

- `DEBUG = False`
- `SECRET_KEY` from environment variable
- PostgreSQL via `DATABASE_URL`
- Sentry error tracking (if configured)
- HTTPS/SSL settings
- Cache with Redis/Memcached
- Static file serving via CDN or nginx

---

## 5. Authentication

**App:** `accounts/`

### Views

| View | Route | Description |
|------|-------|-------------|
| `LoginView` | `/accounts/login/` | Login with Django auth |
| `LogoutView` | `/accounts/logout/` | Logout with confirmation |
| `SignUpView` | `/accounts/signup/` | User registration |
| `PasswordChangeView` | `/accounts/password-change/` | Authenticated password change |
| `PasswordResetView` | `/accounts/password-reset/` | Email-based password reset |
| `PasswordResetConfirmView` | `/accounts/reset/<uidb64>/<token>/` | Reset confirmation |

### Templates

All auth templates extend `base.html` and use Tailwind CSS classes for styling:

```html
{% extends "base.html" %}
{% block content %}
<div class="max-w-md mx-auto mt-10">
  <form method="post" class="space-y-4">
    {% csrf_token %}
    {{ form.as_p }}
    <button type="submit" class="btn btn-primary w-full">
      Sign In
    </button>
  </form>
</div>
{% endblock %}
```

---

## 6. Frontend Integration

**File:** `frontend/`

### package.json

```json
{
  "scripts": {
    "dev": "tailwindcss -i ./src/styles.css -o ../backend/static/css/main.css --watch",
    "build": "tailwindcss -i ./src/styles.css -o ../backend/static/css/main.css --minify"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
```

### Base Template Integration

```html
{% load static %}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{% block title %}{% endblock %}</title>
  <link rel="stylesheet" href="{% static 'css/main.css' %}">
</head>
<body class="bg-gray-50 text-gray-900">
  {% include "includes/header.html" %}
  <main class="container mx-auto px-4 py-8">
    {% block content %}{% endblock %}
  </main>
  {% include "includes/footer.html" %}
</body>
</html>
```

---

## 7. Docker Configuration

### docker-compose.yml (if use_docker == "y")

```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgres://postgres:postgres@db:5432/postgres
    depends_on:
      - db
  db:
    image: postgres:15
    environment:
      - POSTGRES_PASSWORD=postgres
    volumes:
      - postgres_data:/var/lib/postgresql/data
volumes:
  postgres_data:
```

### Dockerfile

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements/production.txt .
RUN pip install -r production.txt
COPY . .
RUN python manage.py collectstatic --noinput
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"]
```

---

## 8. Testing

```bash
# Run all tests
python manage.py test

# Test specific app
python manage.py test accounts

# Test with coverage
coverage run --source='.' manage.py test
coverage html
```

### Test Coverage

- **accounts/:** Auth view behavior, form validation, template rendering
- **pages/:** Page rendering, context data
- **settings/:** Environment-specific configuration loading
