# Changelog

All notable changes to T-Vault are documented here.

## [Unreleased] - 2025-12-08

### Added - Professional Enhancements

#### New Pages
- **Privacy Policy** (`/privacy`) - Comprehensive data handling disclosure
- **Terms of Service** (`/terms`) - User agreement and acceptable use policy
- **Settings** (`/settings`) - App info, GitHub link, feature overview, and FAQ
- **About** (`/about`) - Project story, use cases, and background

#### Site-Wide Improvements
- **Navigation Bar** - Sticky header with logo, links, and GitHub button
- **Footer** - Site-wide footer with copyright and quick links
- **Gradient Background** - Subtle gradient backdrop for professional appearance
- **Mobile Responsive Navigation** - Adaptive menu for small screens
- **Visual Enhancements** - Feature cards with icons on home page

#### Documentation
- **README.md** - Comprehensive project documentation with setup guide
- **API.md** - Complete API reference with examples
- **CONTRIBUTING.md** - Contribution guidelines
- **DEPLOYMENT.md** - Step-by-step deployment guide for Vercel/Netlify
- **SECURITY.md** - Security policy and vulnerability reporting
- **LICENSE** - MIT License
- **.env.example** - Environment variable template

#### GitHub Repository Structure
- **Issue Templates** - Bug report and feature request templates
- **Pull Request Template** - PR checklist and guidelines
- **GitHub Actions Ready** - Structured for CI/CD workflows

#### SEO & Accessibility
- **Updated Sitemap** - All pages indexed with proper priority
- **Enhanced robots.txt** - API routes excluded from crawling
- **Open Graph Metadata** - Social media sharing optimization
- **Semantic HTML** - Proper heading hierarchy and ARIA labels

#### User Experience
- **Visual Feature Cards** - No Login, Auto-Delete, QR Codes highlights
- **FAQ Section** - Common questions in Settings page
- **Developer Resources** - Links to API docs, contributing guide, security policy
- **Use Case Examples** - Study, development, quick links, collaboration scenarios

### Enhanced
- **Home Page** - Added feature showcase cards and improved hero section
- **Keyboard Shortcuts** - Documented in README and on-page help
- **Error Handling** - Clear error messages across all API endpoints
- **Typography** - Improved font sizes, spacing, and hierarchy

### Fixed
- **TypeScript Setup** - Added `next-env.d.ts` for proper type resolution
- **Mobile Layout** - Better responsive behavior on small screens
- **Link Accessibility** - Added aria-labels where needed

---

## Initial Release - 2024

### Core Features
- Text vault with unique key storage
- URL shortener with custom aliases
- QR code generation for short URLs
- Keyboard shortcuts (Ctrl+K, Ctrl+S, Ctrl+R, etc.)
- 24-hour auto-deletion via Redis TTL
- No login or authentication required
- Clean, modern UI with dark mode support

---

## Future Roadmap

### Planned Features
- [ ] Rate limiting for API endpoints
- [ ] Analytics dashboard (privacy-focused)
- [ ] Custom expiration times (1hr, 6hr, 12hr, 24hr)
- [ ] Markdown rendering for text vault
- [ ] File upload support (small files only)
- [ ] Browser extension for quick sharing
- [ ] Mobile app (PWA)
- [ ] Multi-language support

### Under Consideration
- [ ] Optional encryption at rest
- [ ] Password-protected keys
- [ ] Read receipts (optional)
- [ ] Custom short domains
- [ ] API key authentication for rate limiting

---

**Legend:**
- ✅ Complete
- 🚧 In Progress
- 📋 Planned
- 💡 Under Consideration

For detailed changes, see the [commit history](https://github.com/yellareddymaheshreddy/tvault/commits/main).
