# Security Policy

## Supported Versions

| Version | Supported |
| ------- | --------- |
| latest (main) | :white_check_mark: |
| develop | :white_check_mark: |
| older | :x: |

## Reporting a Vulnerability

**Please do NOT report security vulnerabilities through public GitHub issues.**

If you discover a security vulnerability, please report it responsibly:

1. **Email**: Send a detailed report to **security@fitflow.app** (or via GitHub's private vulnerability reporting)
2. **Include**:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Any suggested fixes (optional)

## Response Timeline

| Stage | Timeline |
|-------|----------|
| Acknowledgement | Within 48 hours |
| Initial assessment | Within 5 business days |
| Fix & disclosure | Within 30 days |

## Scope

### In Scope:
- Security vulnerabilities in the FitFlow web application
- Data privacy issues affecting user data
- Authentication/authorization bypass
- XSS, CSRF, injection vulnerabilities

### Out of Scope:
- Social engineering attacks
- Vulnerabilities in third-party dependencies (report those upstream)
- Issues already publicly disclosed

## Disclosure Policy

We follow **Coordinated Vulnerability Disclosure**. We will:
- Work with you to understand and fix the issue
- Credit you in the fix commit and release notes (unless you prefer anonymity)
- Not take legal action against researchers acting in good faith

## Security Best Practices for Contributors

- Never commit secrets, API keys, or tokens to the repo
- Use environment variables for all configuration
- Follow OWASP Top 10 guidelines
- All third-party dependencies must be reviewed before merging
- Run `npm audit` before submitting PRs
