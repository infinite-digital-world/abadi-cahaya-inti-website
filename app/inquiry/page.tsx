import { InquiryForm } from '@/components/forms/InquiryForm'
import { Section } from '@/components/ui/Section'
import { generatePageMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = generatePageMetadata(
  'Permintaan Penawaran',
  'Ajukan permintaan penawaran untuk produk lifting equipment, safety equipment, dan material pendukung dari PT Abadi Cahaya Inti.'
)

export default function InquiryPage() {
  return (
    <Section>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Permintaan Penawaran</h1>
        <p className="text-gray-600 text-lg">
          Lengkapi form di bawah ini untuk mengajukan permintaan penawaran.
          Tim kami akan menghubungi Anda segera setelah menerima permintaan
          Anda.
        </p>
      </div>
      <InquiryForm />
    </Section>
  )
}

