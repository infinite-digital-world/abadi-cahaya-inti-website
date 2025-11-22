import { Section } from '@/components/ui/Section'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { generatePageMetadata } from '@/lib/seo'
import type { Metadata } from 'next'
import { Target, Eye, Heart, Handshake, Shield } from 'lucide-react'

export const metadata: Metadata = generatePageMetadata(
  'Tentang Kami',
  'Tentang PT Abadi Cahaya Inti - Supplier B2B terpercaya di Makassar untuk peralatan lifting, safety equipment, dan material pendukung industri.'
)

const values = [
  {
    icon: Heart,
    title: 'Integritas',
    description:
      'Kami berkomitmen untuk menjalankan bisnis dengan integritas tinggi, transparan, dan jujur dalam setiap interaksi dengan klien.',
  },
  {
    icon: Shield,
    title: 'Keselamatan',
    description:
      'Keselamatan adalah prioritas utama. Kami menyediakan produk dan layanan yang memenuhi standar keselamatan tertinggi.',
  },
  {
    icon: Target,
    title: 'Keandalan',
    description:
      'Produk berkualitas tinggi dan layanan yang dapat diandalkan untuk memastikan kepuasan klien jangka panjang.',
  },
  {
    icon: Handshake,
    title: 'Kemitraan',
    description:
      'Membangun kemitraan jangka panjang dengan klien melalui dukungan yang berkelanjutan dan solusi yang tepat.',
  },
]

export default function AboutPage() {
  return (
    <Section>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Tentang Kami</h1>
      </div>

      <div className="max-w-4xl mx-auto mb-12">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold mb-4">PT Abadi Cahaya Inti</h2>
          <p className="text-gray-700 text-lg mb-6">
            PT Abadi Cahaya Inti adalah supplier B2B terpercaya yang berbasis di
            Makassar, Sulawesi Selatan. Kami fokus pada penyediaan{' '}
            <strong>lifting equipment</strong>,{' '}
            <strong>safety equipment (APD)</strong>, dan{' '}
            <strong>material pendukung</strong> untuk berbagai proyek konstruksi,
            industri, marine, mining, dan infrastruktur.
          </p>
          <p className="text-gray-700 text-lg mb-6">
            Dengan komitmen terhadap kualitas, keselamatan, dan keandalan, kami
            melayani kebutuhan corporate procurement, vendor registration, tender,
            dan kemitraan supply jangka panjang. Lokasi strategis kami di
            Makassar memungkinkan kami untuk memberikan layanan yang cepat dan
            responsif untuk klien di seluruh Indonesia Timur.
          </p>
          <h3 className="text-2xl font-bold mb-4">Siapa yang Kami Layani</h3>
          <p className="text-gray-700 text-lg mb-6">
            Kami melayani berbagai sektor industri termasuk:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg mb-6">
            <li>Perusahaan konstruksi dan infrastruktur</li>
            <li>Perusahaan marine dan shipping</li>
            <li>Perusahaan mining dan pertambangan</li>
            <li>Perusahaan oil & gas</li>
            <li>Perusahaan manufacturing</li>
            <li>Power plant dan utilities</li>
            <li>Logistics dan warehouse</li>
          </ul>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">Visi & Misi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3 mb-2">
                <Eye className="h-6 w-6 text-primary" />
                <CardTitle>Visi</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Menjadi partner terpercaya dan terdepan dalam penyediaan
                peralatan lifting, safety equipment, dan material pendukung
                industri di Indonesia Timur, dengan komitmen terhadap kualitas,
                keselamatan, dan kepuasan klien.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3 mb-2">
                <Target className="h-6 w-6 text-primary" />
                <CardTitle>Misi</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Menyediakan produk berkualitas tinggi dengan standar internasional,
                memberikan layanan yang cepat dan responsif, mendukung kebutuhan
                vendor registration dan tender, serta membangun kemitraan jangka
                panjang dengan klien melalui integritas dan keandalan.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-center mb-8">Nilai-Nilai Kami</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </Section>
  )
}

