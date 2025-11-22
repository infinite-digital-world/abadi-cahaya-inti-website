import { Hero } from '@/components/sections/Hero'
import { ValueProps } from '@/components/sections/ValueProps'
import { ProductCategoriesSection } from '@/components/sections/ProductCategoriesSection'
import { SectorsSection } from '@/components/sections/SectorsSection'
import { WhyUsSection } from '@/components/sections/WhyUsSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { CTASection } from '@/components/sections/CTASection'
import { getPageSEO, generateMetadata as generateSEOMetadata, generateOrganizationSchema } from '@/lib/seo-helpers'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const pageSEO = await getPageSEO('/')
  
  return generateSEOMetadata(
    pageSEO?.title,
    pageSEO?.description,
    pageSEO?.keywords,
    pageSEO?.ogImage || undefined,
    pageSEO?.canonicalUrl || undefined
  )
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProps />
      <ProductCategoriesSection />
      <SectorsSection />
      <WhyUsSection />
      <TestimonialsSection />
      <CTASection />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateOrganizationSchema()),
        }}
      />
    </>
  )
}

