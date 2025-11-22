import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'

export function Hero() {
  return (
    <Section className="bg-gradient-to-br from-primary to-primary-dark text-white">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          PT Abadi Cahaya Inti
        </h1>
        <p className="text-xl md:text-2xl mb-4 text-gray-100">
          Your Trusted Partner for Lifting, Safety & Material Supply
        </p>
        <p className="text-lg mb-8 text-gray-200 max-w-2xl mx-auto">
          Supplier B2B terpercaya di Makassar untuk peralatan lifting, safety
          equipment (APD), dan material pendukung industri konstruksi, marine,
          mining, dan infrastruktur.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products">
            <Button size="lg" variant="accent" className="w-full sm:w-auto">
              Lihat Katalog Produk
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

