# Cloudflare Pages Deployment Guide

This guide will help you deploy the PT Abadi Cahaya Inti website to Cloudflare Pages.

## Prerequisites

1. Cloudflare account
2. Domain configured in Cloudflare (abadicahayainti.co.id)
3. GitHub/GitLab repository (or connect directly via Wrangler CLI)

## Important Considerations

### Database
- **SQLite will NOT work on Cloudflare Pages** (read-only filesystem)
- You **MUST** use a cloud database:
  - **Recommended**: Cloudflare D1 (SQLite-compatible, free tier available)
  - **Alternative**: PostgreSQL (Neon, Supabase, Railway, etc.)
  - **Alternative**: PlanetScale (MySQL)

### File Storage
- Local file uploads won't work on Cloudflare Pages
- Use **Cloudflare R2** (S3-compatible, free tier available)
- Or AWS S3, Google Cloud Storage, etc.

## Deployment Steps

### Option 1: Cloudflare Pages + D1 Database (Recommended)

#### Step 1: Setup Cloudflare D1 Database

1. Go to Cloudflare Dashboard → Workers & Pages → D1
2. Create a new D1 database (e.g., `abadi-cahaya-inti-db`)
3. Note the database ID

#### Step 2: Update Prisma Schema for D1

Update `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
  // For D1, use: url = env("DATABASE_URL")
}
```

D1 uses SQLite syntax, so your current schema should work!

#### Step 3: Create Migration Script

Create `wrangler.toml` in project root:

```toml
name = "abadi-cahaya-inti"
compatibility_date = "2024-01-01"

[[d1_databases]]
binding = "DB"
database_name = "abadi-cahaya-inti-db"
database_id = "YOUR_D1_DATABASE_ID"
```

#### Step 4: Deploy via Cloudflare Pages

1. Go to Cloudflare Dashboard → Workers & Pages → Pages
2. Click "Create a project"
3. Connect your Git repository
4. Build settings:
   - **Framework preset**: Next.js
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Root directory**: `/` (or leave empty)

#### Step 5: Environment Variables

In Cloudflare Pages settings, add:

```
DATABASE_URL="file:./prisma/dev.db"  # Will be replaced with D1 binding
NEXTAUTH_URL="https://admin.abadicahayainti.co.id"
NEXTAUTH_SECRET="your-secret-here"
NEXT_PUBLIC_SITE_URL="https://abadicahayainti.co.id"
```

#### Step 6: Custom Domain Setup

1. In Pages settings → Custom domains
2. Add `abadicahayainti.co.id` (main domain)
3. Add `admin.abadicahayainti.co.id` (admin subdomain)
4. Cloudflare will automatically configure DNS

#### Step 7: Run Migrations

After first deployment, run migrations:

```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Run migrations
npx prisma migrate deploy
# Or use D1 directly:
wrangler d1 execute abadi-cahaya-inti-db --file=./prisma/migrations/XXXXX_init/migration.sql
```

### Option 2: Cloudflare Pages + External PostgreSQL

If you prefer PostgreSQL (Neon, Supabase, etc.):

1. Create PostgreSQL database on your preferred provider
2. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
3. Update environment variables in Cloudflare Pages:
   ```
   DATABASE_URL="postgresql://user:pass@host:5432/dbname?sslmode=require"
   ```
4. Run migrations: `npx prisma migrate deploy`

### File Upload Setup (Cloudflare R2)

1. Create R2 bucket in Cloudflare Dashboard
2. Update `/app/api/upload/route.ts` to use R2:

```typescript
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.R2_ACCESS_KEY_ID,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY,
  },
})
```

3. Add R2 environment variables to Cloudflare Pages

## Build Configuration

Create `next.config.js` (update existing):

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  // For Cloudflare Pages
  output: 'standalone', // or 'export' for static export
}

module.exports = nextConfig
```

## Post-Deployment Checklist

- [ ] Database migrations run successfully
- [ ] Seed database with initial data
- [ ] Test admin login
- [ ] Test file uploads (if using R2)
- [ ] Verify subdomain routing works
- [ ] Test SEO metadata on pages
- [ ] Verify all environment variables are set
- [ ] Test contact/inquiry forms
- [ ] Setup email service (SendGrid, Resend, etc.)

## Troubleshooting

### Database Connection Issues
- Verify DATABASE_URL is correct
- Check D1 database binding in wrangler.toml
- Ensure migrations have run

### Subdomain Not Working
- Verify DNS records in Cloudflare
- Check middleware.ts subdomain detection
- Ensure both domains point to same Pages deployment

### Build Failures
- Check Node.js version (Cloudflare Pages uses Node 18+)
- Verify all dependencies are in package.json
- Check build logs in Cloudflare Dashboard

## Alternative: Cloudflare Workers (Advanced)

For more control, you can deploy as Cloudflare Workers using:
- `@cloudflare/next-on-pages` adapter
- Better for edge computing
- More complex setup

See: https://developers.cloudflare.com/pages/framework-guides/nextjs/

