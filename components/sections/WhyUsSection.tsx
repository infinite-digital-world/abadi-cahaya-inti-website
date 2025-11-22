import { Section } from '@/components/ui/Section'
import { CheckCircle2 } from 'lucide-react'

const reasons = [
  'Legal & Compliant - Dokumen legal lengkap dan terpercaya',
  'Reliable Brands - Produk dari brand terpercaya dengan standar internasional',
  'Competitive Pricing - Harga kompetitif dengan kualitas terjamin',
  'Fast Response - Respon cepat untuk kebutuhan mendesak',
  'Dedicated B2B Support - Tim khusus untuk dukungan B2B dan tender',
]

export function WhyUsSection() {
  return (
    <Section className="bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Mengapa Memilih PT Abadi Cahaya Inti?
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reasons.map((reason, index) => (
            <div key={index} className="flex items-start space-x-3">
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-gray-700">{reason}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

