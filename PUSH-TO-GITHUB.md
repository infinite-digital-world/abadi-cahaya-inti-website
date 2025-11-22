# 🚀 Push ke GitHub - Instruksi

Repository sudah di-commit dan siap untuk push ke GitHub!

## Opsi 1: Repository Baru di GitHub

1. **Buat repository baru di GitHub:**
   - Buka [github.com](https://github.com)
   - Klik **"New repository"**
   - Nama: `abadi-cahaya-inti-website` (atau nama lain)
   - **Jangan** centang "Initialize with README"
   - Klik **"Create repository"**

2. **Copy URL repository** (misalnya: `https://github.com/username/abadi-cahaya-inti-website.git`)

3. **Jalankan command berikut** (ganti URL dengan URL repository Anda):

```bash
git remote add origin https://github.com/username/abadi-cahaya-inti-website.git
git push -u origin main
```

## Opsi 2: Repository Sudah Ada

Jika repository sudah ada, jalankan:

```bash
git remote add origin https://github.com/username/repo-name.git
git push -u origin main
```

## Opsi 3: Via GitHub CLI (gh)

Jika Anda punya GitHub CLI:

```bash
gh repo create abadi-cahaya-inti-website --public --source=. --remote=origin --push
```

## Setelah Push

Setelah push berhasil:

1. ✅ Buka repository di GitHub
2. ✅ Copy repository URL
3. ✅ Gunakan URL tersebut untuk connect ke Cloudflare Pages
4. ✅ Cloudflare akan otomatis deploy setiap push ke `main` branch

## Catatan

- ✅ Semua file sudah di-commit
- ✅ `.env` dan file sensitif sudah di-exclude via `.gitignore`
- ✅ Database local files sudah di-exclude
- ✅ Repository siap untuk deployment

