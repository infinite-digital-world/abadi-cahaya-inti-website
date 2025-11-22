import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'

export function CTASection() {
  return (
    <Section className="bg-primary text-white">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Siap Memulai Proyek Anda?
        </h2>
        <p className="text-lg mb-8 text-gray-100">
          Diskusikan kebutuhan lifting, safety equipment, dan material pendukung
          untuk proyek Anda. Tim kami siap membantu memberikan solusi terbaik.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/inquiry">
            <Button size="lg" variant="accent" className="w-full sm:w-auto">
              Diskusikan Kebutuhan Anda
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary"
            >
              Hubungi Kami
            </Button>
          </Link>
        </div>
      </div>
    </Section>
  )
}

