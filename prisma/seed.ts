import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@abadicahayainti.co.id' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@abadicahayainti.co.id',
      passwordHash: hashedPassword,
    },
  })

  // Create product categories
  const liftingCategory = await prisma.productCategory.upsert({
    where: { slug: 'lifting-equipment' },
    update: {},
    create: {
      name: 'Lifting Equipment',
      slug: 'lifting-equipment',
      description: 'Peralatan angkat dan rigging untuk berbagai aplikasi industri',
    },
  })

  const safetyCategory = await prisma.productCategory.upsert({
    where: { slug: 'safety-equipment' },
    update: {},
    create: {
      name: 'Safety Equipment (APD)',
      slug: 'safety-equipment',
      description: 'Alat Pelindung Diri (APD) untuk keselamatan kerja',
    },
  })

  const materialCategory = await prisma.productCategory.upsert({
    where: { slug: 'material-supply' },
    update: {},
    create: {
      name: 'Material Supply & Supporting Items',
      slug: 'material-supply',
      description: 'Material pendukung dan aksesori industri',
    },
  })

  // Create sample products
  const products = [
    {
      name: 'Shackle',
      slug: 'shackle',
      categoryId: liftingCategory.id,
      shortDescription: 'Shackle berkualitas tinggi untuk aplikasi lifting dan rigging',
      description: 'Shackle kami tersedia dalam berbagai ukuran dan kapasitas beban. Terbuat dari material berkualitas tinggi sesuai standar industri untuk keamanan dan keandalan maksimal.',
      specs: JSON.stringify({
        'Kapasitas': '0.5 ton - 100 ton',
        'Material': 'Baja karbon tinggi / Stainless steel',
        'Standar': 'ASME B30.26, DIN 82101',
      }),
    },
    {
      name: 'Webbing Sling',
      slug: 'webbing-sling',
      categoryId: liftingCategory.id,
      shortDescription: 'Webbing sling untuk angkat beban dengan aman',
      description: 'Webbing sling ringan dan fleksibel, ideal untuk mengangkat benda dengan permukaan halus atau sensitif. Tersedia dalam berbagai konfigurasi (single, double, triple, quadruple).',
      specs: JSON.stringify({
        'Kapasitas': '1 ton - 20 ton',
        'Material': 'Polyester webbing',
        'Standar': 'ASME B30.9',
      }),
    },
    {
      name: 'Safety Helmet',
      slug: 'safety-helmet',
      categoryId: safetyCategory.id,
      shortDescription: 'Helm keselamatan standar industri',
      description: 'Safety helmet dengan sertifikasi SNI dan ANSI. Dilengkapi dengan sistem suspensi yang nyaman dan tahan lama untuk perlindungan kepala optimal.',
      specs: JSON.stringify({
        'Standar': 'SNI 1811:2007, ANSI Z89.1',
        'Material': 'HDPE / ABS',
        'Fitur': 'Adjustable suspension, ventilation',
      }),
    },
    {
      name: 'Full Body Harness',
      slug: 'full-body-harness',
      categoryId: safetyCategory.id,
      shortDescription: 'Full body harness untuk pekerjaan di ketinggian',
      description: 'Full body harness dengan D-ring belakang dan dada. Dilengkapi dengan padding yang nyaman dan sistem penyesuaian yang mudah untuk berbagai ukuran tubuh.',
      specs: JSON.stringify({
        'Standar': 'SNI 7079:2009, EN 361',
        'Kapasitas': 'Maksimal 100 kg',
        'Fitur': 'D-ring belakang & dada, padding nyaman',
      }),
    },
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    })
  }

  // Create sample documents
  await prisma.document.upsert({
    where: { id: 'doc-1' },
    update: {},
    create: {
      id: 'doc-1',
      title: 'Company Profile PT Abadi Cahaya Inti',
      description: 'Profil perusahaan lengkap dengan sejarah, layanan, dan portofolio',
      filePath: '/uploads/company-profile.pdf',
      fileType: 'pdf',
      category: 'Company Profile',
    },
  })

  // Create sample posts
  const posts = [
    {
      title: 'Tips Keselamatan dalam Penggunaan Lifting Equipment',
      slug: 'tips-keselamatan-lifting-equipment',
      excerpt: 'Panduan praktis untuk memastikan keselamatan saat menggunakan peralatan lifting di tempat kerja',
      content: 'Keselamatan adalah prioritas utama dalam penggunaan lifting equipment. Artikel ini membahas best practices dan tips penting untuk menghindari kecelakaan kerja.',
      publishedAt: new Date(),
    },
    {
      title: 'Pentingnya APD dalam Lingkungan Kerja Industri',
      slug: 'pentingnya-apd-lingkungan-kerja',
      excerpt: 'Mengapa Alat Pelindung Diri (APD) sangat penting dalam lingkungan kerja industri',
      content: 'APD bukan hanya kewajiban, tetapi investasi dalam keselamatan pekerja. Kami menjelaskan pentingnya setiap jenis APD dan kapan harus digunakan.',
      publishedAt: new Date(),
    },
  ]

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    })
  }

  // Create sample testimonials
  const testimonials = [
    {
      clientName: 'Budi Santoso',
      clientCompany: 'PT Konstruksi Makassar',
      message: 'PT Abadi Cahaya Inti telah menjadi partner terpercaya kami selama 3 tahun. Layanan cepat dan produk berkualitas tinggi.',
    },
    {
      clientName: 'Siti Nurhaliza',
      clientCompany: 'PT Marine Services Indonesia',
      message: 'Dukungan vendor yang sangat baik, dokumen lengkap, dan responsif untuk kebutuhan tender kami.',
    },
    {
      clientName: 'Ahmad Rizki',
      clientCompany: 'PT Mining Resources',
      message: 'Produk lifting equipment mereka sangat andal untuk operasi tambang kami. Harga kompetitif dan pengiriman tepat waktu.',
    },
  ]

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({
      data: testimonial,
    })
  }

  console.log('Seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

