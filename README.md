# PT Abadi Cahaya Inti - Marketing Website

Website marketing dan katalog produk untuk PT Abadi Cahaya Inti dengan admin panel untuk mengelola konten.

## Teknologi

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite (via Prisma)
- **Authentication**: NextAuth.js
- **ORM**: Prisma

## Fitur

### Frontend (Customer-Facing)
- ✅ Homepage dengan hero, value propositions, kategori produk, dan testimonials
- ✅ Katalog produk dengan filter kategori
- ✅ Halaman detail produk
- ✅ Halaman layanan
- ✅ Halaman download dokumen
- ✅ Halaman tentang kami
- ✅ Halaman dukungan vendor & tender
- ✅ Form permintaan penawaran dengan inquiry cart
- ✅ Form kontak
- ✅ Blog/Insights
- ✅ Responsive design
- ✅ SEO-friendly dengan metadata dan schema.org

### Backend (Admin Panel)
- ✅ Admin dashboard
- ✅ CRUD untuk produk
- ✅ CRUD untuk artikel/blog
- ✅ CRUD untuk dokumen dengan file upload
- ✅ Authentication dengan NextAuth
- ✅ Protected admin routes

## Setup & Instalasi

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

Buat file `.env` di root directory:

```env
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-in-production"
```

**Penting**: Ganti `NEXTAUTH_SECRET` dengan secret key yang aman untuk production. Anda bisa generate dengan:

```bash
openssl rand -base64 32
```

### 3. Setup Database

Jalankan migrasi Prisma:

```bash
npx prisma migrate dev
```

### 4. Seed Database

Jalankan seed script untuk menambahkan data awal:

```bash
npm run db:seed
```

Ini akan membuat:
- Admin user (email: `admin@abadicahayainti.co.id`, password: `admin123`)
- Kategori produk (Lifting Equipment, Safety Equipment, Material Supply)
- Sample products
- Sample posts
- Sample documents
- Sample testimonials

**Penting**: Ganti password admin default setelah pertama kali login!

### 5. Run Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## Struktur Project

```
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin panel pages
│   ├── api/               # API routes
│   ├── products/          # Product pages
│   ├── services/          # Services page
│   ├── downloads/         # Downloads page
│   ├── about/             # About page
│   ├── vendor-support/    # Vendor support page
│   ├── inquiry/           # Inquiry/quote request page
│   ├── contact/           # Contact page
│   └── insights/          # Blog/insights pages
├── components/            # React components
│   ├── admin/             # Admin components
│   ├── forms/             # Form components
│   ├── layout/            # Layout components
│   ├── products/          # Product components
│   ├── sections/          # Homepage sections
│   └── ui/                # Reusable UI components
├── contexts/              # React contexts (InquiryCart)
├── lib/                   # Utility functions
├── prisma/                # Prisma schema and migrations
└── public/                # Static files
    └── uploads/           # Uploaded documents
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:migrate` - Run Prisma migrations
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio

## Default Admin Credentials

**Hanya untuk development!** Ganti segera setelah setup.

- **Email**: admin@abadicahayainti.co.id
- **Password**: admin123

## File Upload

File upload saat ini disimpan di `/public/uploads`. Untuk production, disarankan untuk:

1. Menggunakan cloud storage (AWS S3, Google Cloud Storage, dll)
2. Update `/app/api/upload/route.ts` untuk upload ke cloud storage
3. Update `/app/api/admin/documents/[id]/route.ts` untuk delete file dari cloud storage

TODOs sudah ditambahkan di kode untuk implementasi ini.

## Email Integration

Form contact dan inquiry saat ini hanya log ke console. Untuk production, implementasikan:

1. Email service (Nodemailer, SendGrid, dll)
2. Update `/app/api/contact/route.ts` dan `/app/api/inquiry/route.ts`
3. Tambahkan environment variables untuk email config

TODOs sudah ditambahkan di kode untuk implementasi ini.

## Deployment to Cloudflare Pages

**📘 Complete Tutorial**: See [CLOUDFLARE-TUTORIAL.md](./CLOUDFLARE-TUTORIAL.md) for step-by-step deployment guide in Bahasa Indonesia.

**Quick Reference**: See [DEPLOYMENT.md](./DEPLOYMENT.md) for technical deployment instructions.

**Key Points:**
- ✅ **Database is ready!** Current SQLite schema works perfectly with Cloudflare D1 (SQLite-compatible)
- Use **Cloudflare D1** database (SQLite-compatible, free tier)
- Use **Cloudflare R2** for file uploads (S3-compatible, free tier)
- Subdomain routing (`admin.abadicahayainti.co.id`) works automatically
- Free tier supports small to medium traffic ($0/month!)

## Production Deployment

### Subdomain Setup (Admin Panel)

Website ini menggunakan subdomain untuk memisahkan admin panel dari client-facing site:
- **Main Site**: `https://abadicahayainti.co.id` (client-facing)
- **Admin Panel**: `https://admin.abadicahayainti.co.id` (admin only)

**Note**: Di local development, Anda masih bisa mengakses admin melalui `http://localhost:3000/admin`. Subdomain routing hanya aktif di production.

#### DNS Configuration

1. **Main Domain** (`abadicahayainti.co.id`):
   - A Record atau CNAME pointing ke server IP/CDN

2. **Admin Subdomain** (`admin.abadicahayainti.co.id`):
   - CNAME record pointing ke same server/CDN as main domain
   - Atau A record dengan same IP

#### Deployment Platforms

**Cloudflare Pages (Recommended - Free Tier Available)**:
See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete guide.

Quick steps:
1. Setup Cloudflare D1 database (SQLite-compatible, free)
2. Deploy to Cloudflare Pages via GitHub
3. Add custom domains: `abadicahayainti.co.id` and `admin.abadicahayainti.co.id`
4. Middleware automatically handles subdomain routing
5. Use Cloudflare R2 for file uploads (free tier available)

**Vercel**:
1. Deploy project to Vercel
2. Add custom domain: `abadicahayainti.co.id`
3. Add subdomain: `admin.abadicahayainti.co.id`
4. Both will point to same deployment
5. Middleware will automatically route based on subdomain

**Other Platforms**:
- Ensure both domains point to same deployment
- Middleware handles subdomain detection automatically
- For platforms that don't support subdomains natively, use reverse proxy (nginx, Cloudflare, etc.)

#### Environment Variables for Production

```env
DATABASE_URL="postgresql://user:password@host:5432/dbname"
NEXTAUTH_URL="https://admin.abadicahayainti.co.id"
NEXTAUTH_SECRET="your-secure-secret-here"
NEXT_PUBLIC_SITE_URL="https://abadicahayainti.co.id"
```

### SEO Management

Admin panel includes SEO management at `/admin/seo`:
- Configure meta titles, descriptions, keywords per page
- Set Open Graph images and descriptions
- Manage canonical URLs
- SEO settings also available for Products and Posts

### General Deployment Steps

1. **Environment Variables**: Pastikan semua environment variables di-set dengan benar
2. **Database**: Migrate ke PostgreSQL atau database production lainnya
   ```bash
   npx prisma migrate deploy
   ```
3. **File Storage**: Setup cloud storage untuk file uploads
4. **Email**: Setup email service untuk form submissions
5. **Security**: 
   - Ganti `NEXTAUTH_SECRET` dengan secret yang aman
   - Ganti password admin default
   - Enable HTTPS
6. **Performance**: 
   - Enable Next.js Image Optimization
   - Setup CDN untuk static assets
   - Enable caching

## License

Copyright © PT Abadi Cahaya Inti. All rights reserved.

