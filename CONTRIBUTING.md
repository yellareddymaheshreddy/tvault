# Contributing to T-Vault

Thank you for your interest in contributing to T-Vault! This document provides guidelines for contributing to the project.

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue on GitHub with:
- A clear, descriptive title
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots if applicable
- Your environment (browser, OS, etc.)

### Suggesting Features

Feature suggestions are welcome! Open an issue with:
- A clear description of the feature
- Use cases and benefits
- Any implementation ideas (optional)

### Submitting Pull Requests

1. **Fork the repository** and create a new branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes:**
   - Follow the existing code style
   - Write clear, descriptive commit messages
   - Add comments for complex logic
   - Update documentation if needed

3. **Test your changes:**
   ```bash
   npm run dev
   npm run build
   npm run lint
   ```

4. **Submit a pull request:**
   - Reference any related issues
   - Describe what your PR does and why
   - Include screenshots for UI changes

## Code Style

- Use TypeScript for type safety
- Follow existing formatting (Prettier/ESLint)
- Use descriptive variable and function names
- Keep components small and focused
- Write accessible HTML (ARIA labels, semantic elements)

## Project Structure

- `app/` - Next.js app directory (pages, layouts, API routes)
- `components/` - Reusable React components
- `lib/` - Utility functions and shared logic
- `public/` - Static assets

## Development Setup

1. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/tvault.git
   cd tvault
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env.local` with your Redis URL:
   ```env
   REDIS_URL=redis://...
   ```

4. Start the dev server:
   ```bash
   npm run dev
   ```

## Questions?

Feel free to open an issue or discussion if you have questions about contributing!

---

Thank you for helping make T-Vault better! 🎉
