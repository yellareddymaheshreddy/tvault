# 🔐 T-Vault — Temporary Text & URL Sharing (No Login Required)

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15.2-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Redis](https://img.shields.io/badge/Redis-Cloud-red?logo=redis)](https://redis.com/)

**T-Vault** is a minimalist Next.js web app that enables quick, no-login sharing of text and URLs via unique keys. Perfect for passing code snippets, notes, or short links between devices—especially useful in exam scenarios or when you need fast cross-device access. All data is stored in Redis Cloud and automatically expires after 24 hours.

🔗 **Live Demo:** [https://tvault.mahs.me](https://tvault.mahs.me)  
📦 **Repository:** [github.com/yellareddymaheshreddy/tvault](https://github.com/yellareddymaheshreddy/tvault)  
📖 **API Docs:** [API.md](API.md)

---

## ✨ Features

- **Text Vault**: Save and retrieve plain text snippets with a custom key
- **URL Shortener**: Generate short links with optional custom aliases and QR codes
- **No Authentication**: Zero signup, no passwords, no tracking
- **Auto-Expiration**: All data deleted after ~24 hours
- **Keyboard Shortcuts**: Power-user friendly (Ctrl+K, Ctrl+S, Ctrl+R, etc.)
- **Accessible & Responsive**: Works on any device, optimized for mobile and desktop

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or newer recommended)
- **Redis Cloud** account (free tier works great) or local Redis instance

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yellareddymaheshreddy/tvault.git
   cd tvault
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Configure Redis:**
   Create a `.env.local` file at the project root:
   ```env
   REDIS_URL=redis://default:yourpassword@your-redis-host:port
   ```
   Replace with your Redis Cloud connection string or local Redis URL.

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for production:**
   ```bash
   npm run build
   npm run start
   ```

---

## 📂 Project Structure

```
tvault/
├── app/
│   ├── page.tsx            # Main landing page (text vault + URL shortener)
│   ├── layout.tsx          # Site-wide layout with nav and footer
│   ├── privacy/page.tsx    # Privacy policy
│   ├── terms/page.tsx      # Terms of service
│   ├── settings/page.tsx   # About & settings page
│   ├── api/
│   │   ├── text/route.ts   # POST & GET endpoints for text vault
│   │   ├── shorten/route.ts # POST endpoint to shorten URLs
│   │   └── t/[id]/route.ts # Retrieve text via /api/t/:id
│   └── u/[id]/route.ts     # Redirect to original URL via /u/:id
├── components/
│   ├── ui/                 # Reusable UI components (Button, Card, etc.)
│   ├── copy-button.tsx     # One-click copy to clipboard
│   └── keyboard-shortcuts.tsx # Modal with keyboard shortcuts
├── lib/
│   ├── redis.ts            # Redis client setup
│   └── utils.ts            # Utility functions (cn, etc.)
└── public/
    ├── robots.txt
    └── sitemap.xml
```

---

## 🔌 API Reference

### Text Vault

**Store text:**
```bash
curl -X POST http://localhost:3000/api/text \
  -H "Content-Type: application/json" \
  -d '{"key":"mykey","text":"Hello World"}'
```

**Retrieve text:**
```bash
curl http://localhost:3000/api/text?key=mykey
# or via the short alias:
curl http://localhost:3000/api/t/mykey
```

### URL Shortener

**Shorten a URL:**
```bash
curl -X POST http://localhost:3000/api/shorten \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com/very/long/path","key":"short"}'
```
Returns `{"code":"short"}` if custom key provided, or auto-generated code.

**Access the short URL:**
```
http://localhost:3000/u/short
```
Redirects to the original URL.

---

## ⌨️ Keyboard Shortcuts

Press **Ctrl+?** (or **Ctrl+/**) to view all shortcuts:

| Shortcut   | Action                      |
|------------|-----------------------------|
| Ctrl+K     | Focus storage key input     |
| Ctrl+S     | Save text                   |
| Ctrl+R     | Retrieve text               |
| Ctrl+L     | Shorten URL                 |
| Ctrl+1     | Switch to Text Vault tab    |
| Ctrl+2     | Switch to URL Shortener tab |
| Esc        | Close dialogs               |

---

## 🛡️ Privacy & Terms

- **Privacy Policy**: [/privacy](https://tvault.mahs.me/privacy) — Details how data is stored and auto-deleted.
- **Terms of Service**: [/terms](https://tvault.mahs.me/terms) — Guidelines for acceptable use.

> ⚠️ **Important:** Data is stored in **plain text** on Redis Cloud. Do not store passwords, personal information, or anything sensitive.

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Open an issue for bugs or feature requests
- Submit a pull request with improvements or fixes
- Share feedback and ideas

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 💬 Contact & Support

- **GitHub Issues**: [github.com/yellareddymaheshreddy/tvault/issues](https://github.com/yellareddymaheshreddy/tvault/issues)
- **Author**: [Mahesh Reddy](https://github.com/yellareddymaheshreddy)

---

**Built with Next.js, Redis, and shadcn/ui. Designed for speed and simplicity.**
