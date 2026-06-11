# Cookiecutter Django + Tailwind Security Audit Report

**Repository:** Rhixe-company/cookiecutter-django-tailwind  
**Audit Date:** 2026-05-21  
**Priority:** MEDIUM  
**Auditor:** Automated Security Scan  

---

## Executive Summary

The Cookiecutter Django + Tailwind template has **moderate security concerns** primarily around default credentials and configuration defaults. As a project template, secrets are expected to be replaced during project generation, but insecure defaults could lead to production deployments with weak settings.

**Risk Score: 4.5/10** — Template has insecure defaults but prompts users to customize.

---

## Medium Findings

### MEDIUM: Default PostgreSQL Credentials in Template

**Category:** Secret Exposure  
**Severity:** 🟡 MEDIUM  
**Status:** ❌ Unresolved  
**Location:** `cookiecutter.json` (and generated `docker-compose.yml`)

```json
{
  "postgres_user": "postgres",
  "postgres_password": "postgres"
}
```

Default credentials are `postgres:postgres` — these are publicly known defaults. If a generated project is deployed without changing these values:
- Anyone with network access to the database can authenticate
- Docker-exposed PostgreSQL ports become vulnerable
- Data in transit could be intercepted (no TLS enforcement)

**Impact:** Database takeover if deployed with defaults.

**Remediation:**
1. Change cookiecutter.json defaults to placeholder values like `"CHANGE_ME_DB_USER"` and `"CHANGE_ME_DB_PASSWORD"`
2. Add validation in `pre_gen_project.py` to reject default values
3. Include a post-generation prompt requiring password changes

### MEDIUM: Hardcoded SECRET_KEY in Template Settings

**Category:** Secret Exposure  
**Severity:** 🟡 MEDIUM  
**Status:** ⚠️ Needs Investigation  

The Django `SECRET_KEY` in generated settings files may be hardcoded. The template should:
- Generate a random SECRET_KEY during project creation
- Read SECRET_KEY from environment variables in production settings
- Warn users to change the key before production deployment

**Remediation:**
1. Add post-generation hook to generate a random SECRET_KEY
2. Use `from django.core.management.utils import get_random_secret_key` in settings
3. Set `SECRET_KEY = os.getenv('DJANGO_SECRET_KEY')` in production settings

### MEDIUM: DEBUG = True Default in Template

**Category:** Information Disclosure  
**Severity:** 🟡 MEDIUM  
**Status:** ⚠️ Needs Investigation  

The generated `local.py` settings file has `DEBUG = True`, which is correct for development. However, if the production template inherits this or lacks explicit DEBUG=False:
- Stack traces displayed on production errors
- Sensitive configuration details leaked
- SQL query exposure in debug toolbar responses

**Remediation:**
1. Ensure `production.py` explicitly sets `DEBUG = False`
2. Add DEBUG check: `DEBUG = os.getenv('DJANGO_DEBUG', 'False') == 'True'`

---

## Low Findings

### LOW: Docker Compose Exposes PostgreSQL Port

**Category:** Network Security  
**Severity:** 🟢 LOW  
**Status:** ❌ Unresolved  

The generated `docker-compose.yml` may expose PostgreSQL port `5432` publicly without restricted access:
- External network access to database
- Brute-force attacks on default credentials

**Remediation:** Do not expose the database port in docker-compose; use internal Docker network only.

### LOW: No CSRF Configuration Warnings

**Category:** Configuration  
**Severity:** 🟢 LOW  
**Status:** ❌ Unresolved  

The generated settings don't explicitly configure:
- `CSRF_COOKIE_SECURE` (should be True in production)
- `SESSION_COOKIE_SECURE` (should be True in production)
- `CSRF_TRUSTED_ORIGINS` (should be set for production domain)

**Remediation:** Add secure cookie defaults in `production.py` template.

### LOW: No Content Security Policy

**Category:** Security Headers  
**Severity:** 🟢 LOW  
**Status:** ❌ Unresolved  

Generated projects lack:
- `Content-Security-Policy` header
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Strict-Transport-Security` header

**Remediation:** Add `django-csp` or security middleware recommendations to production settings template.

### LOW: Example .env File May Contain Placeholder Secrets

**Category:** Documentation  
**Severity:** 🟢 LOW  
**Status:** ✅ Accepted  

The `.env.example` contains placeholder values like `postgres:postgres`. While expected for a template, users may copy it directly without changing values.

**Remediation:** Use obviously invalid placeholders: `CHANGE_ME` prefix on all placeholder values.

---

## Template Hygiene

### Pre-Generation Validation

Current `pre_gen_project.py` checks:
- ✅ `project_slug` is a valid Python identifier

Missing validations:
- ❌ Default password detection and rejection
- ❌ Empty author name rejection
- ❌ Invalid domain format detection
- ❌ Minimum project name length

### Post-Generation Best Practices

Consider adding post-generation hooks to:
1. Generate a random Django SECRET_KEY
2. Initialize git repository
3. Create initial `.env` file with generated secrets
4. Print security checklist for the developer

---

## Recommendations

### Short-term (before next template release)
1. Change `postgres_password` default to `CHANGE_ME_DB_PASSWORD`
2. Add password validation in `pre_gen_project.py`
3. Ensure production settings have `DEBUG=False` enforced
4. Add secure cookie defaults to production settings

### Medium-term (1 month)
5. Add post-generation secret key generation
6. Include `django-csp` and security headers configuration
7. Add pre-commit hook template to generated projects
8. Produce security checklist in generated README

### Long-term (3 months)
9. Add CI/CD security scanning configuration
10. Create migration guide with security hardening steps
11. Consider adding Auth0 or social auth as optional dependency

---

## Best Practices for Users

When using this template to generate a project:

1. **Always change default passwords** before going to production
2. **Generate a unique SECRET_KEY** for each deployment
3. **Set `DEBUG=False`** and configure `ALLOWED_HOSTS`
4. **Use HTTPS** with HSTS headers in production
5. **Keep dependencies updated** — run `pip-audit` regularly
6. **Limit database access** — don't expose PostgreSQL publicly
7. **Use environment variables** for all sensitive configuration
8. **Enable CSRF protection** with `CSRF_COOKIE_SECURE=True` over HTTPS

---

## References

- [OWASP Template Injection](https://owasp.org/www-community/attacks/Server-Side_Template_Injection)
- [Django Deployment Checklist](https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/)
- [Cookiecutter Security](https://cookiecutter.readthedocs.io/en/stable/advanced/dict_and_list_variables.html)
