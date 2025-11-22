import { Section } from '@/components/ui/Section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { generatePageMetadata } from '@/lib/seo'
import type { Metadata } from 'next'
import { FileText, CheckCircle2, Send, Clock } from 'lucide-react'

export const metadata: Metadata = generatePageMetadata(
  'Dukungan Vendor & Tender',
  'Layanan dukungan vendor registration dan tender dari PT Abadi Cahaya Inti. Dokumen legal lengkap, company profile, dan katalog siap untuk kebutuhan tender Anda.'
)

const steps = [
  {
    number: 1,
    title: 'Ajukan Permintaan Dokumen',
    description:
      'Hubungi kami melalui form inquiry atau kontak langsung untuk mengajukan permintaan dokumen vendor/tender yang Anda butuhkan.',
    icon: FileText,
  },
  {
    number: 2,
    title: 'Klarifikasi Kebutuhan',
    description:
      'Tim kami akan menghubungi Anda untuk mengklarifikasi kebutuhan spesifik, jenis dokumen yang diperlukan, dan timeline yang diinginkan.',
    icon: CheckCircle2,
  },
  {
    number: 3,
    title: 'Pengiriman Dokumen & Penawaran',
    description:
      'Kami akan mengirimkan dokumen lengkap (company profile, legal documents, katalog) beserta penawaran sesuai kebutuhan Anda.',
    icon: Send,
  },
]

const documents = [
  'Company Profile (Profil Perusahaan)',
  'SIUP (Surat Izin Usaha Perdagangan)',
  'NPWP (Nomor Pokok Wajib Pajak)',
  'NIB (Nomor Induk Berusaha)',
  'Akta Pendirian & Perubahan Perusahaan',
  'Katalog Produk per Kategori (PDF)',
  'Dokumen Legal Lainnya sesuai Kebutuhan',
]

export default function VendorSupportPage() {
  return (
    <Section>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Dukungan Vendor & Tender
        </h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Kami menyediakan dukungan lengkap untuk proses vendor registration dan
          tender dengan dokumen legal lengkap, company profile, dan katalog
          produk yang siap digunakan.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-12">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">
              Mengapa Memilih Dukungan Vendor Kami?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Dokumen Legal Lengkap:</strong> Semua dokumen legal
                  perusahaan tersedia dan ter-update
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Fast Response:</strong> Respon cepat untuk kebutuhan
                  vendor registration yang mendesak
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Katalog Lengkap:</strong> Katalog produk tersedia dalam
                  format PDF per kategori
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Dukungan Jangka Panjang:</strong> Kemampuan untuk
                  mendukung kontrak supply jangka panjang
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            Proses Permintaan Dokumen
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <Card key={step.number} className="relative">
                  <CardHeader>
                    <div className="absolute -top-4 -left-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-bold text-lg">
                      {step.number}
                    </div>
                    <div className="flex items-center space-x-3 mb-2 mt-4">
                      <Icon className="h-6 w-6 text-primary" />
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Dokumen yang Tersedia</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {documents.map((doc, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-gray-700">{doc}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="text-center bg-gray-50 rounded-lg p-8 max-w-3xl mx-auto">
        <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">
          Butuh Dokumen untuk Tender?
        </h2>
        <p className="text-gray-600 mb-6">
          Ajukan permintaan dokumen vendor/tender melalui form inquiry. Tim kami
          akan merespons dengan cepat untuk memenuhi kebutuhan Anda.
        </p>
        <Link href="/inquiry">
          <Button size="lg" variant="default">
            Ajukan Permintaan Dokumen
          </Button>
        </Link>
      </div>
    </Section>
  )
}

