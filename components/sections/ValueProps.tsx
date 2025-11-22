import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Section } from '@/components/ui/Section'
import { Package, Shield, Truck, HeadphonesIcon } from 'lucide-react'

const valueProps = [
  {
    icon: Package,
    title: 'Solusi Lengkap Lifting & Safety',
    description:
      'Satu tempat untuk semua kebutuhan peralatan lifting dan safety equipment dengan kualitas terjamin.',
  },
  {
    icon: Shield,
    title: 'Dukungan Vendor & Tender',
    description:
      'Dokumen legal lengkap, profil perusahaan, dan katalog siap untuk mendukung proses tender Anda.',
  },
  {
    icon: Truck,
    title: 'Pengiriman Cepat & Tepat',
    description:
      'Layanan pengiriman yang efisien untuk memastikan kebutuhan proyek Anda terpenuhi tepat waktu.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Layanan Konsultasi Teknis',
    description:
      'Tim ahli siap membantu memilih peralatan yang sesuai dengan standar dan kebutuhan pekerjaan.',
  },
]

export function ValueProps() {
  return (
    <Section>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Mengapa Memilih Kami?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Komitmen kami untuk memberikan solusi terbaik dalam peralatan lifting,
          safety, dan material pendukung industri.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {valueProps.map((prop, index) => {
          const Icon = prop.icon
          return (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{prop.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {prop.description}
                </CardDescription>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </Section>
  )
}

