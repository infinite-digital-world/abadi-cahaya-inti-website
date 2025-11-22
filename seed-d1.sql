-- Seed script untuk Cloudflare D1 Database
-- Jalankan via: wrangler d1 execute abadi-cahaya-inti-db --file=./seed-d1.sql

-- ⚠️ PENTING: Generate password hash terlebih dahulu!
-- Jalankan: node scripts/generate-password-hash.js admin123
-- Copy hash yang dihasilkan dan ganti di bawah ini

-- Insert Admin User (password: admin123 - HASHED dengan bcrypt)
-- Generate hash dengan: node scripts/generate-password-hash.js admin123
INSERT INTO "User" (id, name, email, "passwordHash", "createdAt", "updatedAt")
VALUES (
  'clx00000000000000000000001',
  'Admin',
  'admin@abadicahayainti.co.id',
  '$2a$10$JVfh/up0/mFr6zg8Nqnsy.4Gzir2.EQCu.s5kvjD8qeme1B.PZkR2',  -- Password: admin123
  datetime('now'),
  datetime('now')
);

-- Insert Product Categories
INSERT INTO "ProductCategory" (id, name, slug, description, "createdAt", "updatedAt")
VALUES
  ('clx00000000000000000000002', 'Lifting Equipment', 'lifting-equipment', 'Peralatan angkat dan material handling', datetime('now'), datetime('now')),
  ('clx00000000000000000000003', 'Safety Equipment', 'safety-equipment', 'Alat keselamatan kerja dan APD', datetime('now'), datetime('now')),
  ('clx00000000000000000000004', 'Material Supply', 'material-supply', 'Material pendukung industri', datetime('now'), datetime('now'));

-- Insert Sample Products
INSERT INTO "Product" (id, "categoryId", name, slug, "shortDescription", description, "createdAt", "updatedAt")
VALUES
  ('clx00000000000000000000005', 'clx00000000000000000000002', 'Chain Block 1 Ton', 'chain-block-1-ton', 'Chain block kapasitas 1 ton untuk material handling', 'Chain block berkualitas tinggi dengan kapasitas 1 ton, cocok untuk berbagai aplikasi industri.', datetime('now'), datetime('now')),
  ('clx00000000000000000000006', 'clx00000000000000000000003', 'Safety Helmet', 'safety-helmet', 'Helm keselamatan standar industri', 'Helm keselamatan dengan sertifikasi SNI, nyaman dan tahan lama.', datetime('now'), datetime('now'));

-- Insert Sample Post
INSERT INTO "Post" (id, title, slug, excerpt, content, "publishedAt", "createdAt", "updatedAt")
VALUES
  ('clx00000000000000000000007', 'Pentingnya Safety Equipment di Industri', 'pentingnya-safety-equipment', 'Artikel tentang pentingnya menggunakan alat keselamatan di tempat kerja', 'Konten artikel lengkap tentang safety equipment...', datetime('now'), datetime('now'), datetime('now'));

-- Insert Sample Document
INSERT INTO "Document" (id, title, description, "filePath", "fileType", "fileSize", category, "createdAt", "updatedAt")
VALUES
  ('clx00000000000000000000008', 'Company Profile', 'Company profile PT Abadi Cahaya Inti', '/uploads/company-profile.pdf', 'pdf', 1024000, 'Company Profile', datetime('now'), datetime('now'));

-- Insert Sample Testimonial
INSERT INTO "Testimonial" (id, "clientName", "clientCompany", message, "createdAt")
VALUES
  ('clx00000000000000000000009', 'Budi Santoso', 'PT Konstruksi Makassar', 'Pelayanan sangat baik, produk berkualitas tinggi!', datetime('now'));

-- ============================================
-- CARA MENGGUNAKAN:
-- ============================================
-- 1. Generate password hash:
--    node scripts/generate-password-hash.js admin123
--
-- 2. Copy hash yang dihasilkan
--
-- 3. Ganti 'REPLACE_WITH_GENERATED_HASH' di atas dengan hash tersebut
--
-- 4. Jalankan seed:
--    wrangler d1 execute abadi-cahaya-inti-db --file=./seed-d1.sql
--
-- ============================================
