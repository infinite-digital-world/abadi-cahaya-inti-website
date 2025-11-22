# 📘 Tutorial Lengkap: Deploy ke Cloudflare Pages

Panduan langkah demi langkah untuk deploy website PT Abadi Cahaya Inti ke Cloudflare Pages.

## ✅ Apakah Database Sudah Siap untuk Cloudflare?

**YA! Database Anda sudah siap!** 🎉

- Database saat ini menggunakan **SQLite** (di `prisma/schema.prisma`)
- Cloudflare D1 adalah database **SQLite-compatible**
- Schema Prisma Anda **tidak perlu diubah** - langsung bisa digunakan dengan D1
- Semua model (User, Product, Post, Document, dll) akan bekerja dengan sempurna

**Yang perlu dilakukan:**
- Ganti dari SQLite file lokal → Cloudflare D1 (cloud database)
- Semua kode Prisma tetap sama!

---

## 📋 Prerequisites (Yang Diperlukan)

Sebelum mulai, pastikan Anda punya:

1. ✅ **Akun Cloudflare** (gratis) - Daftar di [cloudflare.com](https://cloudflare.com)
2. ✅ **Domain** `abadicahayainti.co.id` sudah di-manage oleh Cloudflare
3. ✅ **GitHub/GitLab repository** untuk project ini
4. ✅ **Node.js** terinstall di komputer Anda

---

## 🚀 Langkah 1: Setup Cloudflare D1 Database

### 1.1 Install Wrangler CLI

Wrangler adalah tool command-line untuk Cloudflare:

```bash
npm install -g wrangler
```

### 1.2 Login ke Cloudflare

```bash
wrangler login
```

Ini akan membuka browser untuk login ke akun Cloudflare Anda.

### 1.3 Buat D1 Database

```bash
wrangler d1 create abadi-cahaya-inti-db
```

**Output yang akan muncul:**
```
✅ Successfully created DB 'abadi-cahaya-inti-db'!

[[d1_databases]]
binding = "DB"
database_name = "abadi-cahaya-inti-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"  ← SALIN INI!
```

**⚠️ PENTING:** Salin `database_id` yang muncul! Anda akan membutuhkannya di langkah berikutnya.

---

## 🔧 Langkah 2: Konfigurasi Wrangler

### 2.1 Buat File `wrangler.toml`

Di root project, buat file `wrangler.toml`:

```bash
cp wrangler.toml.example wrangler.toml
```

### 2.2 Edit `wrangler.toml`

Buka `wrangler.toml` dan ganti `YOUR_D1_DATABASE_ID` dengan `database_id` yang Anda salin tadi:

```toml
name = "abadi-cahaya-inti"
compatibility_date = "2024-01-01"

[[d1_databases]]
binding = "DB"
database_name = "abadi-cahaya-inti-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"  ← Ganti dengan ID Anda
```

**Simpan file ini!**

---

## 📦 Langkah 3: Setup Database Migrations

### 3.1 Jalankan Migrations ke D1

Setelah database dibuat, jalankan migrations:

```bash
# Cari file migration terbaru
ls prisma/migrations/

# Jalankan migration (ganti XXXXX dengan nama folder migration Anda)
wrangler d1 execute abadi-cahaya-inti-db --file=./prisma/migrations/XXXXX_init/migration.sql
```

**Atau gunakan Prisma langsung:**

```bash
# Set DATABASE_URL untuk D1
export DATABASE_URL="file:./prisma/dev.db"  # Untuk development lokal
# Di production, Cloudflare akan handle ini otomatis

# Generate Prisma Client
npx prisma generate
```

### 3.2 Seed Database (Opsional)

Untuk menambahkan data awal (admin user, sample products, dll):

**Cara 1: Menggunakan seed-d1.sql (Recommended)**

```bash
# 1. Generate password hash untuk admin user
node scripts/generate-password-hash.js admin123

# 2. Copy hash yang dihasilkan
# 3. Buka file seed-d1.sql dan ganti 'REPLACE_WITH_GENERATED_HASH' dengan hash tersebut

# 4. Jalankan seed
wrangler d1 execute abadi-cahaya-inti-db --file=./seed-d1.sql
```

**Cara 2: Via Cloudflare Dashboard**

1. Buka **Cloudflare Dashboard → Workers & Pages → D1**
2. Pilih database **"abadi-cahaya-inti-db"**
3. Klik **"Execute SQL"**
4. Copy-paste isi dari `seed-d1.sql` (setelah generate password hash)
5. Klik **"Run"**

---

## 🌐 Langkah 4: Setup Cloudflare Pages

### 4.1 Via Cloudflare Dashboard (Recommended)

1. **Buka Cloudflare Dashboard**
   - Login ke [dash.cloudflare.com](https://dash.cloudflare.com)
   - Pilih akun Anda

2. **Buka Workers & Pages**
   - Klik menu **"Workers & Pages"** di sidebar
   - Klik **"Pages"**
   - Klik tombol **"Create a project"**

3. **Connect Git Repository**
   - Pilih **"Connect to Git"**
   - Pilih provider (GitHub/GitLab)
   - Authorize Cloudflare untuk akses repository
   - Pilih repository project Anda

4. **Configure Build Settings**
   - **Project name**: `abadi-cahaya-inti` (atau nama lain)
   - **Framework preset**: `Next.js`
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Root directory**: `/` (kosongkan)
   - **Node version**: `20` (atau `18`)

5. **Klik "Save and Deploy"**

### 4.2 Setup Environment Variables

Setelah project dibuat, setup environment variables:

1. Di halaman project, klik **"Settings"**
2. Klik **"Environment Variables"**
3. Tambahkan variables berikut:

**Production Environment:**
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

**⚠️ PENTING:** 
- Ganti `NEXTAUTH_SECRET` dengan hasil dari command di atas
- Jangan share secret ini ke siapa pun!

4. Klik **"Save"**

---

## 🌍 Langkah 5: Setup Custom Domains

### 5.1 Tambahkan Domain Utama

1. Di halaman project, klik **"Custom domains"**
2. Klik **"Set up a custom domain"**
3. Masukkan: `abadicahayainti.co.id`
4. Cloudflare akan otomatis setup DNS records

### 5.2 Tambahkan Subdomain Admin

1. Klik **"Set up a custom domain"** lagi
2. Masukkan: `admin.abadicahayainti.co.id`
3. Cloudflare akan otomatis setup DNS records

### 5.3 Verifikasi DNS (Jika Perlu)

Jika domain tidak otomatis terkonfigurasi, setup manual:

1. Buka **Cloudflare Dashboard → DNS**
2. Tambahkan records berikut:

**Record 1:**
- **Type**: `CNAME`
- **Name**: `@` (atau `abadicahayainti.co.id`)
- **Target**: `abadi-cahaya-inti.pages.dev` (atau URL project Anda)
- **Proxy**: ✅ Enabled (orange cloud)

**Record 2:**
- **Type**: `CNAME`
- **Name**: `admin`
- **Target**: `abadi-cahaya-inti.pages.dev` (sama dengan di atas)
- **Proxy**: ✅ Enabled (orange cloud)

---

## 📤 Langkah 6: Setup File Uploads (Cloudflare R2)

Karena Cloudflare Pages tidak support file upload lokal, kita perlu menggunakan R2.

### 6.1 Buat R2 Bucket

1. Buka **Cloudflare Dashboard → R2**
2. Klik **"Create bucket"**
3. Nama bucket: `abadi-uploads`
4. Klik **"Create bucket"**

### 6.2 Buat API Token

1. Di halaman R2, klik **"Manage R2 API Tokens"**
2. Klik **"Create API Token"**
3. **Permissions**: 
   - ✅ Object Read & Write
4. **TTL**: `No expiration` (atau sesuai kebutuhan)
5. Klik **"Create API Token"**
6. **⚠️ SALIN** `Access Key ID` dan `Secret Access Key` - ini hanya muncul sekali!

### 6.3 Update Environment Variables

Tambahkan ke Cloudflare Pages environment variables:

```
R2_ACCOUNT_ID=<your-cloudflare-account-id>
R2_ACCESS_KEY_ID=<access-key-dari-step-6.2>
R2_SECRET_ACCESS_KEY=<secret-key-dari-step-6.2>
R2_BUCKET_NAME=abadi-uploads
```

**Cara cari Account ID:**
- Di Cloudflare Dashboard, lihat URL: `https://dash.cloudflare.com/xxxxxxxxxxxxx/...`
- `xxxxxxxxxxxxx` adalah Account ID Anda

### 6.4 Update Upload Route (Opsional - Untuk Nanti)

File upload saat ini masih menggunakan local storage. Untuk production, perlu update ke R2. Ini bisa dilakukan setelah deployment pertama berhasil.

---

## 🎯 Langkah 7: Deploy Pertama Kali

### 7.1 Trigger Deployment

Setelah semua setup selesai:

1. **Via Git Push** (Recommended):
   ```bash
   git add .
   git commit -m "Setup for Cloudflare deployment"
   git push origin main
   ```
   Cloudflare akan otomatis deploy setiap ada push ke branch `main`.

2. **Via Cloudflare Dashboard**:
   - Di halaman project, klik **"Retry deployment"** atau **"Redeploy"**

### 7.2 Monitor Build Process

1. Klik pada deployment yang sedang berjalan
2. Lihat build logs untuk memastikan tidak ada error
3. Tunggu sampai status menjadi **"Success"**

### 7.3 Verifikasi Deployment

Setelah deployment selesai, test:

1. ✅ Buka `https://abadicahayainti.co.id` - harus load homepage
2. ✅ Buka `https://admin.abadicahayainti.co.id` - harus redirect ke login
3. ✅ Test admin login (email: `admin@abadicahayainti.co.id`, password: `admin123`)

---

## 🔄 Langkah 8: Setup Database Connection di Production

### 8.1 Update Prisma untuk D1

Untuk production, Prisma perlu tahu bahwa kita menggunakan D1. Update `lib/db.ts` (opsional, biasanya sudah otomatis):

```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Di Cloudflare, DATABASE_URL akan di-set otomatis oleh D1 binding
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### 8.2 Seed Database Production

Setelah deployment pertama, seed database dengan data awal:

**Via Cloudflare Dashboard:**
1. Buka **Workers & Pages → D1 → abadi-cahaya-inti-db**
2. Klik **"Execute SQL"**
3. Jalankan query untuk insert admin user (lihat `prisma/seed.ts` untuk referensi)

**Atau via Wrangler:**
```bash
# Buat file seed.sql dengan query insert
wrangler d1 execute abadi-cahaya-inti-db --file=./seed.sql
```

---

## ✅ Checklist Deployment

Pastikan semua sudah dilakukan:

- [ ] ✅ Cloudflare account dibuat
- [ ] ✅ Domain `abadicahayainti.co.id` di-manage oleh Cloudflare
- [ ] ✅ Wrangler CLI terinstall dan login
- [ ] ✅ D1 database dibuat (`abadi-cahaya-inti-db`)
- [ ] ✅ `wrangler.toml` dikonfigurasi dengan database ID
- [ ] ✅ Database migrations dijalankan
- [ ] ✅ Cloudflare Pages project dibuat
- [ ] ✅ Git repository terhubung
- [ ] ✅ Environment variables di-set (NEXTAUTH_SECRET, dll)
- [ ] ✅ Custom domains ditambahkan (main + admin subdomain)
- [ ] ✅ R2 bucket dibuat (untuk file uploads)
- [ ] ✅ R2 API tokens dibuat dan ditambahkan ke env vars
- [ ] ✅ Deployment pertama berhasil
- [ ] ✅ Website bisa diakses di domain utama
- [ ] ✅ Admin panel bisa diakses di subdomain
- [ ] ✅ Admin login berfungsi
- [ ] ✅ Database queries bekerja

---

## 🐛 Troubleshooting

### Error: "Cannot connect to database"

**Solusi:**
- Pastikan D1 database sudah dibuat
- Pastikan `wrangler.toml` sudah dikonfigurasi dengan benar
- Pastikan migrations sudah dijalankan
- Check environment variables di Cloudflare Pages

### Error: "Subdomain not working"

**Solusi:**
- Pastikan DNS records sudah dibuat (CNAME untuk `admin`)
- Pastikan kedua domain ditambahkan di Custom domains
- Tunggu beberapa menit untuk DNS propagation
- Check `middleware.ts` untuk subdomain detection logic

### Error: "Build failed"

**Solusi:**
- Check build logs di Cloudflare Dashboard
- Pastikan Node.js version sesuai (18 atau 20)
- Pastikan semua dependencies ada di `package.json`
- Pastikan `DATABASE_URL` di-set (meskipun D1 akan handle ini)

### Error: "File upload not working"

**Solusi:**
- Pastikan R2 bucket sudah dibuat
- Pastikan R2 API tokens sudah dibuat dan ditambahkan ke env vars
- Update `/app/api/upload/route.ts` untuk menggunakan R2 (lihat langkah 6.4)

---

## 💰 Biaya (Cloudflare Free Tier)

**Total: $0/bulan** untuk traffic kecil-sedang! 🎉

- ✅ **Pages**: Unlimited requests (gratis)
- ✅ **D1**: 5GB storage, 5M reads/hari, 100K writes/hari (gratis)
- ✅ **R2**: 10GB storage, 1M Class A operations/bulan (gratis)
- ✅ **Custom Domains**: Unlimited (gratis)
- ✅ **SSL**: Automatic (gratis)
- ✅ **Bandwidth**: Unlimited (gratis)

**Upgrade ke Paid Tier** hanya jika:
- Traffic sangat tinggi (>5M reads/hari)
- Storage > 5GB
- Butuh lebih banyak writes

---

## 📚 Resources & Support

- **Cloudflare Docs**: https://developers.cloudflare.com/pages/
- **Next.js on Cloudflare**: https://developers.cloudflare.com/pages/framework-guides/nextjs/
- **D1 Database Docs**: https://developers.cloudflare.com/d1/
- **R2 Storage Docs**: https://developers.cloudflare.com/r2/

---

## 🎉 Selesai!

Setelah semua langkah selesai, website Anda akan:
- ✅ Online di `https://abadicahayainti.co.id`
- ✅ Admin panel di `https://admin.abadicahayainti.co.id`
- ✅ Database di Cloudflare D1 (cloud, reliable)
- ✅ File uploads di Cloudflare R2 (jika sudah dikonfigurasi)
- ✅ SSL otomatis (HTTPS)
- ✅ CDN global (cepat di seluruh dunia)

**Selamat! Website Anda sudah live! 🚀**

