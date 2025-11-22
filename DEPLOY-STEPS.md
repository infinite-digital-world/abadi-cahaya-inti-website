# 🚀 Deployment Steps - Quick Guide

Anda sudah menyelesaikan:
- ✅ D1 Database dibuat
- ✅ wrangler.toml dikonfigurasi
- ✅ Migrations dijalankan
- ✅ Database di-seed dengan data awal

## Langkah Selanjutnya:

### 1. Setup Cloudflare Pages Project

**Via Cloudflare Dashboard:**

1. Buka [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Pilih **Workers & Pages** → **Pages**
3. Klik **"Create a project"**
4. Pilih **"Connect to Git"**
5. Pilih provider (GitHub/GitLab) dan authorize
6. Pilih repository project Anda
7. Configure build settings:
   - **Project name**: `abadi-cahaya-inti`
   - **Framework preset**: `Next.js`
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Root directory**: `/` (kosongkan)
   - **Node version**: `20`
8. Klik **"Save and Deploy"**

### 2. Setup Environment Variables

Setelah project dibuat, di halaman project:

1. Klik **"Settings"** → **"Environment Variables"**
2. Tambahkan variables berikut untuk **Production**:

```
DATABASE_URL=file:./prisma/dev.db
NEXTAUTH_URL=https://admin.abadicahayainti.co.id
NEXTAUTH_SECRET=<generate-dengan-openssl-rand-base64-32>
NEXT_PUBLIC_SITE_URL=https://abadicahayainti.co.id
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

3. Klik **"Save"**

### 3. Setup Custom Domains

1. Di halaman project, klik **"Custom domains"**
2. Klik **"Set up a custom domain"**
3. Masukkan: `abadicahayainti.co.id`
4. Klik **"Set up a custom domain"** lagi
5. Masukkan: `admin.abadicahayainti.co.id`
6. Cloudflare akan otomatis setup DNS

### 4. Connect D1 Database to Pages

**Penting:** D1 database perlu di-bind ke Pages project:

1. Di halaman project, klik **"Settings"** → **"Functions"**
2. Scroll ke **"D1 Database bindings"**
3. Klik **"Add binding"**
4. **Variable name**: `DB`
5. **D1 Database**: Pilih `abadi-cahaya-inti-db`
6. Klik **"Save"**

**Atau via wrangler.toml (sudah dikonfigurasi):**
- Binding sudah ada di `wrangler.toml` dengan nama `DB`
- Pastikan Pages project membaca `wrangler.toml`

### 5. Update Code untuk D1 (Jika Perlu)

Untuk production, pastikan Prisma menggunakan D1 binding. Update `lib/db.ts` jika perlu:

```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Di Cloudflare, DATABASE_URL akan di-set otomatis
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### 6. Deploy

**Via Git Push (Recommended):**
```bash
git add .
git commit -m "Setup for Cloudflare deployment"
git push origin main
```

Cloudflare akan otomatis deploy setiap push ke branch `main`.

**Atau via Wrangler CLI:**
```bash
npm run build
wrangler pages deploy .next --project-name=abadi-cahaya-inti
```

### 7. Verifikasi

Setelah deployment selesai:

1. ✅ Buka `https://abadicahayainti.co.id` - harus load homepage
2. ✅ Buka `https://admin.abadicahayainti.co.id` - harus redirect ke login
3. ✅ Test admin login:
   - Email: `admin@abadicahayainti.co.id`
   - Password: `admin123`
4. ✅ Test database queries (buka admin panel, lihat products/posts)

## Troubleshooting

### Database tidak connect
- Pastikan D1 binding sudah ditambahkan di Pages settings
- Pastikan `DATABASE_URL` di-set di environment variables
- Check build logs untuk error database connection

### Subdomain tidak bekerja
- Pastikan DNS records sudah dibuat
- Tunggu beberapa menit untuk DNS propagation
- Check `middleware.ts` untuk subdomain detection

### Build gagal
- Check build logs di Cloudflare Dashboard
- Pastikan Node.js version 20
- Pastikan semua dependencies ada di `package.json`

## Next Steps (Opsional)

### Setup R2 untuk File Uploads

1. Buka **Cloudflare Dashboard → R2**
2. Klik **"Create bucket"** (nama: `abadi-uploads`)
3. Buat API token dengan read/write permissions
4. Tambahkan ke environment variables:
   - `R2_ACCOUNT_ID`
   - `R2_ACCESS_KEY_ID`
   - `R2_SECRET_ACCESS_KEY`
   - `R2_BUCKET_NAME`
5. Update `/app/api/upload/route.ts` untuk menggunakan R2

---

**Selamat! Website Anda siap untuk deployment! 🎉**

