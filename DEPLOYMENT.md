# Deployment Guide - Cloudflare Pages

Complete guide for deploying PT Abadi Cahaya Inti website to Cloudflare Pages.

## 🚀 Quick Start

### Prerequisites
- Cloudflare account (free tier works)
- Domain `abadicahayainti.co.id` managed by Cloudflare
- GitHub/GitLab repository

## Step-by-Step Deployment

### 1. Setup Cloudflare D1 Database

Cloudflare D1 is a SQLite-compatible database that works perfectly with our Prisma setup.

```bash
# Install Wrangler CLI globally
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Create D1 database
wrangler d1 create abadi-cahaya-inti-db
```

**Save the output** - you'll need the database ID for `wrangler.toml`.

### 2. Configure Wrangler

1. Copy the example file:
   ```bash
   cp wrangler.toml.example wrangler.toml
   ```

2. Edit `wrangler.toml` and replace `YOUR_D1_DATABASE_ID` with your actual database ID from step 1.

### 3. Run Database Migrations

```bash
# Option 1: Using Prisma (recommended)
npx prisma migrate deploy

# Option 2: Manual migration via Wrangler
# Find your migration file in prisma/migrations/
wrangler d1 execute abadi-cahaya-inti-db --file=./prisma/migrations/XXXXX_init/migration.sql
```

### 4. Seed the Database

```bash
# You'll need to create a seed script that works with D1
# Or manually insert data via Cloudflare Dashboard → D1 → Execute SQL
```

### 5. Setup Cloudflare Pages

**Important**: Cloudflare Pages has native Next.js support, but for full compatibility with server-side features (API routes, middleware, etc.), you may need to use the `@cloudflare/next-on-pages` adapter.

#### Option A: Native Next.js Support (Simpler)

1. Go to **Workers & Pages** → **Pages** → **Create a project**
2. Connect your Git repository (GitHub/GitLab)
3. Configure build settings:
   - **Framework preset**: Next.js
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Root directory**: `/` (leave empty)
   - **Node version**: `18` or `20`

#### Option B: Using @cloudflare/next-on-pages (More Compatible)

For better compatibility with all Next.js features:

1. Install adapter:
   ```bash
   npm install --save-dev @cloudflare/next-on-pages
   ```

2. Update `package.json`:
   ```json
   {
     "scripts": {
       "build": "next build && npx @cloudflare/next-on-pages"
     }
   }
   ```

3. In Cloudflare Pages build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `.vercel/output/static`

#### Via Wrangler CLI:

```bash
# Build the project first
npm run build

# Deploy
wrangler pages deploy .next --project-name=abadi-cahaya-inti
```

### 6. Configure Environment Variables

In Cloudflare Pages Dashboard → Your Project → Settings → Environment Variables:

**Production:**
```
DATABASE_URL="file:./prisma/dev.db"  # D1 binding handles this
NEXTAUTH_URL="https://admin.abadicahayainti.co.id"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXT_PUBLIC_SITE_URL="https://abadicahayainti.co.id"
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 7. Setup Custom Domains

1. In Pages → Your Project → Custom domains
2. Add `abadicahayainti.co.id`
3. Add `admin.abadicahayainti.co.id`
4. Cloudflare will auto-configure DNS

**DNS Records** (if not auto-configured):
- Type: `CNAME`
- Name: `@` (or `abadicahayainti.co.id`)
- Target: `your-pages-project.pages.dev`

- Type: `CNAME`
- Name: `admin`
- Target: `your-pages-project.pages.dev`

### 8. Setup File Uploads (Cloudflare R2)

1. Go to **R2** → **Create bucket** (e.g., `abadi-uploads`)
2. Create API token with read/write permissions
3. Update `/app/api/upload/route.ts` to use R2 (see code below)
4. Add environment variables:
   ```
   R2_ACCOUNT_ID="your-account-id"
   R2_ACCESS_KEY_ID="your-access-key"
   R2_SECRET_ACCESS_KEY="your-secret-key"
   R2_BUCKET_NAME="abadi-uploads"
   ```

### 9. Update Code for Cloudflare

#### Update Upload Route for R2

Create `lib/r2.ts`:
```typescript
import { S3Client } from '@aws-sdk/client-s3'

export const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})
```

Then update `/app/api/upload/route.ts` to use R2 instead of local filesystem.

## Post-Deployment

### Verify Everything Works

1. ✅ Main site loads: `https://abadicahayainti.co.id`
2. ✅ Admin panel accessible: `https://admin.abadicahayainti.co.id`
3. ✅ Admin login works
4. ✅ Database queries work
5. ✅ File uploads work (if R2 configured)
6. ✅ SEO metadata displays correctly

### Common Issues

**Database Connection Errors:**
- Verify D1 database binding in `wrangler.toml`
- Check migrations ran successfully
- Verify DATABASE_URL in environment variables

**Subdomain Not Working:**
- Check DNS records in Cloudflare
- Verify both domains added to Pages custom domains
- Check middleware.ts subdomain detection logic

**Build Failures:**
- Check Node.js version (use 18 or 20)
- Verify all dependencies in package.json
- Check build logs in Cloudflare Dashboard

## Alternative: Using External PostgreSQL

If you prefer PostgreSQL (Neon, Supabase, Railway):

1. Create PostgreSQL database
2. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
3. Run migrations: `npx prisma migrate deploy`
4. Update `DATABASE_URL` in Cloudflare Pages environment variables

## Cost Estimate (Cloudflare Free Tier)

- **Pages**: Free (unlimited requests)
- **D1**: Free (5GB storage, 5M reads/day, 100K writes/day)
- **R2**: Free (10GB storage, 1M Class A operations/month)
- **Custom Domains**: Free
- **SSL**: Free (automatic)
- **Bandwidth**: Free (unlimited)

**Total: $0/month** for small to medium traffic! 🎉

## Testing Locally Before Deployment

You can test the Cloudflare setup locally:

```bash
# Install Wrangler
npm install -g wrangler

# Login
wrangler login

# Start local D1 database
wrangler d1 execute abadi-cahaya-inti-db --local --file=./prisma/migrations/XXXXX_init/migration.sql

# Run dev server (will use local D1)
npm run dev
```

## Quick Deployment Checklist

- [ ] Cloudflare account created
- [ ] Domain added to Cloudflare
- [ ] D1 database created
- [ ] `wrangler.toml` configured
- [ ] Database migrations run
- [ ] Environment variables set in Cloudflare Pages
- [ ] Custom domains configured
- [ ] R2 bucket created (for file uploads)
- [ ] GitHub repository connected
- [ ] First deployment successful
- [ ] Admin login tested
- [ ] SEO management tested

## Support

For issues:
- Cloudflare Docs: https://developers.cloudflare.com/pages/
- Next.js on Cloudflare: https://developers.cloudflare.com/pages/framework-guides/nextjs/

