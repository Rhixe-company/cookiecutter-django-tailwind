# Cookiecutter Django + Tailwind Project Documentation

## Overview

A reusable project template for rapidly scaffolding Django web applications with Tailwind CSS integration. Uses Cookiecutter to generate a fully configured Django project with authentication, responsive design, and optional Docker/Celery support.

**Template Type:** Cookiecutter  
**Stack:** Django 4.x | Tailwind CSS 3.x | Python 3.10+ | PostgreSQL  
**Status:** Stable / Production-Ready Template

---

## Architecture

### Template Generation Flow

```
User runs: cookiecutter gh:rhixecompany/cookiecutter-django-tailwind
                        │
                        ▼
            ┌─────────────────────┐
            │  cookiecutter.json   │
            │  (User Prompts)      │
            └──────────┬──────────┘
                       │ Variables
                       ▼
            ┌─────────────────────┐
            │  pre_gen_project.py │
            │  (Validate inputs)  │
            └──────────┬──────────┘
                       │ Pass/Fail
                       ▼
            ┌─────────────────────┐
            │  Jinja2 Rendering   │
            │  (Template → Output)│
            └──────────┬──────────┘
                       │ Generated
                       ▼
            ┌─────────────────────┐
            │  Scaffolded Django  │
            │  Project + Tailwind │
            │  + Auth + Docker    │
            └─────────────────────┘
```

### Generated Project Architecture

```
┌──────────────────────────────────────────────────┐
│                   Django Backend                   │
│  ┌──────────┐  ┌──────────┐  ┌────────────────┐   │
│  │ config/   │  │ accounts/│  │ pages/         │   │
│  │ settings  │  │ auth     │  │ home, about    │   │
│  │ urls      │  │ views    │  │ contact        │   │
│  │ wsgi/asgi │  │ forms    │  │                │   │
│  └──────────┘  └──────────┘  └────────────────┘   │
├──────────────────────────────────────────────────┤
│               Tailwind CSS Frontend                │
│  ┌──────────────────────────────────────────────┐  │
│  │  postcss.config.js → tailwind.config.js      │  │
│  │  src/styles.css → static/css/main.css        │  │
│  └──────────────────────────────────────────────┘  │
├──────────────────────────────────────────────────┤
│                 Infrastructure                     │
│  ┌──────────────┐  ┌──────────────────────────┐   │
│  │  Docker       │  │  PostgreSQL              │   │
│  │  Compose      │  │  (Production)            │   │
│  └──────────────┘  └──────────────────────────┘   │
└──────────────────────────────────────────────────┘
```

---

## Setup Guide

### Prerequisites

- Python 3.10+
- Cookiecutter: `pip install cookiecutter`
- Node.js 18+ (for Tailwind CSS build tooling)
- PostgreSQL 14+ (production) or SQLite (development)

### Generating a New Project

```bash
# Install Cookiecutter
pip install cookiecutter

# Generate a new project
cookiecutter gh:rhixecompany/cookiecutter-django-tailwind

# Answer prompts:
#   project_name [Django Tailwind Project]: My App
#   description [A Django project with Tailwind CSS]:
#   author_name [Your Name]: Jane Doe
#   domain_name [example.com]: myapp.com
#   use_docker [y]: y
#   use_celery [n]: n

cd my_app

# Create virtualenv and install dependencies
python -m venv venv
source venv/bin/activate
pip install -r requirements/local.txt

# Apply migrations
python manage.py migrate

# Install frontend dependencies and build CSS
cd frontend
npm install
npm run build
cd ..

# Create superuser
python manage.py createsuperuser

# Run development server
python manage.py runserver
```

### Quick Start with Docker

```bash
# If use_docker was set to "y"
docker-compose up --build

# The application will be available at http://localhost:8000
```

### Environment Variables (Production)

```env
DJANGO_SECRET_KEY=your-secret-key
DATABASE_URL=postgres://user:pass@host:5432/dbname
DJANGO_DEBUG=False
DJANGO_ALLOWED_HOSTS=.yourdomain.com
SENTRY_DSN=your-sentry-dsn  # optional
```

---

## Feature Guide

### Authentication

- **Registration** — Email + password signup with validation
- **Login/Logout** — Session-based authentication
- **Password Management** — Change, reset via email, confirmation
- **Templates** — Tailwind-styled auth pages with responsive design

### Content Pages

- **Home Page** — Landing page template
- **About/Contact** — Extendable static page structure
- **Base Template** — Consistent layout with header, footer, navigation

### Tailwind CSS

- **Utility-First** — Full Tailwind utility classes available
- **Custom Design** — Configure `tailwind.config.js` with project colors, fonts
- **Optimized Build** — Production build purges unused CSS (avg. 10KB gzipped)
- **Live Reload** — Watch mode for development: `npm run dev`

---

## Project Customization

### Adding a New Django App

```bash
python manage.py startapp myapp
```

Add `myapp` to `INSTALLED_APPS` in `config/settings/base.py`.

### Extending Templates

```html
{% extends "base.html" %}
{% block content %}
<div class="prose max-w-none">
  {{ page_content }}
</div>
{% endblock %}
```

### Customizing Tailwind

Edit `frontend/tailwind.config.js`:

```javascript
module.exports = {
  content: ['../**/templates/**/*.html'],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

---

## Deployment

### Docker Deployment

```bash
# Build and start services
docker-compose up --build -d

# Run migrations
docker-compose exec web python manage.py migrate

# Collect static files
docker-compose exec web python manage.py collectstatic --noinput
```

### Manual Deployment (VPS)

```bash
# Set up PostgreSQL database
createdb myapp

# Clone and configure
git clone https://github.com/yourorg/myapp.git
cd myapp
cp .env.example .env
# Edit .env with production values

# Install and build
python -m venv venv
source venv/bin/activate
pip install -r requirements/production.txt
cd frontend && npm install && npm run build && cd ..
python manage.py migrate
python manage.py collectstatic --noinput

# Run with Gunicorn
gunicorn config.wsgi:application --workers 4 --bind 0.0.0.0:8000
```

### Deployment Checklist

- [ ] `DEBUG=False` in production
- [ ] Unique `SECRET_KEY` via environment variable
- [ ] PostgreSQL database configured (not SQLite)
- [ ] `ALLOWED_HOSTS` set to production domain
- [ ] HTTPS configured (nginx + Let's Encrypt)
- [ ] Static files served via CDN or nginx
- [ ] Database backups configured
- [ ] Sentry or error monitoring enabled

---

## Testing

```bash
# Run all tests
python manage.py test

# Run with coverage
coverage run --source='.' manage.py test
coverage report
coverage html  # View in browser: htmlcov/index.html
```

---

## Contributing

1. Fork the template repository
2. Update `cookiecutter.json` with new variables if needed
3. Modify template files in the `{{cookiecutter.project_slug}}/` directory
4. Test template generation: `cookiecutter . --no-input`
5. Submit pull request with description of changes
