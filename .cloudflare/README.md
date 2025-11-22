# Cloudflare Deployment Files

This directory contains Cloudflare-specific configuration files.

## Quick Start

1. **Setup D1 Database**:
   ```bash
   wrangler d1 create abadi-cahaya-inti-db
   ```

2. **Update wrangler.toml** with your D1 database ID

3. **Run migrations**:
   ```bash
   npx prisma migrate deploy
   # Or manually:
   wrangler d1 execute abadi-cahaya-inti-db --file=./prisma/migrations/XXXXX_init/migration.sql
   ```

4. **Deploy to Cloudflare Pages**:
   - Connect GitHub repo to Cloudflare Pages
   - Or use: `wrangler pages deploy .next`

## Environment Variables

Set these in Cloudflare Pages Dashboard:

- `DATABASE_URL` - D1 database URL (auto-provided via binding)
- `NEXTAUTH_URL` - `https://admin.abadicahayainti.co.id`
- `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
- `NEXT_PUBLIC_SITE_URL` - `https://abadicahayainti.co.id`

