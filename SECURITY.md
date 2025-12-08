# Security Policy

## Supported Versions

We currently support the latest version of T-Vault deployed on the `main` branch.

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability in T-Vault, please report it responsibly:

### Private Disclosure

**DO NOT** open a public GitHub issue for security vulnerabilities.

Instead, please:

1. **Email the maintainer** at: [Create an issue with "Security" label privately]
2. **Use GitHub Security Advisories**: 
   - Go to the [Security tab](https://github.com/yellareddymaheshreddy/tvault/security)
   - Click "Report a vulnerability"
   - Provide details about the vulnerability

### What to Include

- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact
- Suggested fix (if you have one)

### Response Time

- We aim to respond to security reports within **48 hours**
- We'll keep you updated on the fix progress
- We'll credit you in the fix announcement (unless you prefer to remain anonymous)

## Security Best Practices for Users

Since T-Vault stores data in plain text:

- **Do not** store passwords, API keys, or secrets
- **Do not** store personal identifiable information (PII)
- **Use strong, unique keys** that are hard to guess
- **Remember** all data is deleted after 24 hours
- **Assume** anyone with your key can access your data

## Known Limitations

- Data is stored in **plain text** (not encrypted at rest)
- Keys are **not hashed** (by design for retrieval)
- No rate limiting on API endpoints (may be abused)
- No user authentication (anyone can create/retrieve data)

These are design choices for simplicity, not bugs. Use T-Vault only for temporary, low-risk data sharing.

## Third-Party Dependencies

We regularly update dependencies to patch known vulnerabilities. To check for updates:

```bash
npm audit
npm audit fix
```

## Questions?

For general security questions (not vulnerability reports), open a public GitHub issue or discussion.

---

Thank you for helping keep T-Vault secure!
