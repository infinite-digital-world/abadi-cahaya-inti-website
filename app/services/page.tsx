import { Section } from '@/components/ui/Section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { generatePageMetadata } from '@/lib/seo'
import type { Metadata } from 'next'
import { Package, Shield, Wrench, FileText, HeadphonesIcon } from 'lucide-react'

export const metadata: Metadata = generatePageMetadata(
  'Layanan',
  'Layanan lengkap dari PT Abadi Cahaya Inti: pengadaan lifting equipment, safety equipment, material pendukung, dukungan vendor & tender, dan konsultasi teknis.'
)

const services = [
  {
    icon: Package,
    title: 'Pengadaan Lifting Equipment',
    description:
      'Menyediakan peralatan lifting dan rigging berkualitas tinggi untuk berbagai aplikasi industri. Dari shackle hingga wire rope, kami menyediakan solusi lengkap untuk kebutuhan angkat beban Anda.',
    examples: [
      'Shackle, wire rope, dan aksesori',
      'Chain sling dan komponen',
      'Hooks, connectors, dan turnbuckles',
      'Load binder dan lifting points',
    ],
  },
  {
    icon: Shield,
    title: 'Pengadaan Safety Equipment (APD)',
    description:
      'Alat Pelindung Diri (APD) standar industri untuk memastikan keselamatan pekerja di berbagai lingkungan kerja. Produk berkualitas dengan sertifikasi yang sesuai.',
    examples: [
      'Safety helmet, glasses, dan face shield',
      'Full body harness dan lanyard',
      'Safety shoes, boots, dan gloves',
      'Reflective vests dan protective clothing',
      'Respirators, masks, dan hearing protection',
    ],
  },
  {
    icon: Wrench,
    title: 'Penyediaan Material Pendukung Industri',
    description:
      'Material pendukung dan aksesori industri untuk melengkapi kebutuhan proyek konstruksi, marine, mining, dan infrastruktur.',
    examples: [
      'General industrial tools',
      'Rigging accessories',
      'Handling dan packaging accessories',
    ],
  },
  {
    icon: FileText,
    title: 'Dukungan Vendor & Tender',
    description:
      'Layanan lengkap untuk mendukung proses vendor registration dan tender. Dokumen legal, profil perusahaan, dan katalog siap dikirim dengan cepat.',
    examples: [
      'Company profile dan legal documents',
      'SIUP, NPWP, NIB, dan dokumen lainnya',
      'Product catalogs per kategori',
      'Fast response untuk kebutuhan mendesak',
    ],
  },
  {
    icon: HeadphonesIcon,
    title: 'Konsultasi & Rekomendasi Produk',
    description:
      'Tim ahli siap membantu memilih peralatan lifting dan APD yang sesuai dengan standar dan kebutuhan pekerjaan spesifik Anda.',
    examples: [
      'Konsultasi pemilihan peralatan',
      'Rekomendasi sesuai standar industri',
      'Technical support dan guidance',
    ],
  },
]

export default function ServicesPage() {
  return (
    <Section>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Layanan Kami</h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          PT Abadi Cahaya Inti menyediakan layanan lengkap untuk kebutuhan
          lifting equipment, safety equipment, dan material pendukung industri
          Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {services.map((service, index) => {
          const Icon = service.icon
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                </div>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold mb-2 text-gray-900">
                  Contoh Layanan:
                </h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {service.examples.map((example, i) => (
                    <li key={i}>{example}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="text-center bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">
          Tertarik dengan Layanan Kami?
        </h2>
        <p className="text-gray-600 mb-6">
          Hubungi kami untuk diskusi lebih lanjut tentang kebutuhan proyek Anda.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/inquiry">
            <Button size="lg" variant="default">
              Ajukan Permintaan Penawaran
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline">
              Hubungi Kami
            </Button>
          </Link>
        </div>
      </div>
    </Section>
  )
}

