# Deployment Guide for T-Vault

This guide covers deploying T-Vault to popular hosting platforms.

## Prerequisites

- A Redis database (Redis Cloud, Upstash, or self-hosted)
- A Vercel, Netlify, or similar account for hosting

---

## Deploying to Vercel (Recommended)

Vercel is the easiest way to deploy Next.js apps.

### Steps:

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Add Environment Variables**
   In Vercel dashboard → Settings → Environment Variables:
   ```
   REDIS_URL=redis://your-redis-connection-string
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your app
   - You'll get a live URL like `https://tvault.vercel.app`

5. **Add Custom Domain (Optional)**
   - Go to Settings → Domains
   - Add your custom domain
   - Follow DNS setup instructions

---

## Deploying to Netlify

### Steps:

1. **Build Command Setup**
   Netlify needs explicit configuration for Next.js.

2. **Create `netlify.toml`**
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

3. **Connect Repository**
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Select your Git provider and repository

4. **Environment Variables**
   Add in Netlify dashboard → Site settings → Environment variables:
   ```
   REDIS_URL=redis://your-redis-connection-string
   ```

5. **Deploy**
   - Click "Deploy site"
   - Netlify will build and deploy

---

## Setting Up Redis Cloud (Free)

1. **Sign Up**
   - Go to [redis.com/try-free](https://redis.com/try-free/)
   - Create a free account

2. **Create Database**
   - Create a new subscription (free tier: 30MB)
   - Select a cloud provider and region
   - Create a database

3. **Get Connection String**
   - Go to your database → Configuration
   - Copy the "Public endpoint" URL
   - Format: `redis://default:password@hostname:port`

4. **Add to Environment**
   - Add `REDIS_URL` to your `.env.local` (local dev)
   - Add to Vercel/Netlify environment variables (production)

---

## Alternative Redis Options

### Upstash (Serverless Redis)
- [upstash.com](https://upstash.com)
- Great for serverless deployments
- Free tier available
- Get connection string from dashboard

### Self-Hosted Redis
- Use Docker: `docker run -d -p 6379:6379 redis`
- Local URL: `redis://localhost:6379`
- Not recommended for production without proper security

---

## Post-Deployment Checklist

- [ ] Test all features (text save/retrieve, URL shortening)
- [ ] Verify Redis connection is working
- [ ] Check Privacy and Terms pages are accessible
- [ ] Update `metadataBase` in `app/layout.tsx` with your domain
- [ ] Update sitemap URLs in `public/sitemap.xml`
- [ ] Update robots.txt if needed
- [ ] Set up monitoring (optional)
- [ ] Configure custom domain (optional)

---

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `REDIS_URL` | Redis connection string | `redis://default:pass@host:port` |

---

## Troubleshooting

### Build Fails
- Check Node.js version (v18+ recommended)
- Run `npm install` to ensure dependencies are installed
- Check for TypeScript errors: `npm run build` locally

### Redis Connection Issues
- Verify `REDIS_URL` format is correct
- Check Redis database is active and accessible
- Test connection locally with Redis CLI

### 404 Errors
- Ensure all routes are in `app/` directory
- Clear `.next` cache: `rm -rf .next && npm run build`

---

## Performance Tips

1. **Enable Caching**
   - Vercel automatically caches static assets
   - Use `Cache-Control` headers for API routes if needed

2. **Monitor Usage**
   - Check Redis memory usage in dashboard
   - Set up alerts for high traffic

3. **Rate Limiting** (Optional)
   - Consider adding rate limiting for abuse prevention
   - Use Vercel Edge Config or Upstash Rate Limiting

---

For more help, see [Next.js Deployment Docs](https://nextjs.org/docs/deployment) or open an issue on GitHub.
