import { Section } from '@/components/ui/Section'
import { Badge } from '@/components/ui/Badge'

const sectors = [
  'Konstruksi',
  'Marine',
  'Mining',
  'Oil & Gas',
  'Manufacturing',
  'Infrastruktur',
  'Power Plant',
  'Logistics',
]

export function SectorsSection() {
  return (
    <Section>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Sektor yang Kami Layani
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Melayani berbagai sektor industri dengan solusi peralatan lifting,
          safety, dan material pendukung yang tepat.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {sectors.map((sector) => (
          <Badge key={sector} variant="outline" className="text-base px-4 py-2">
            {sector}
          </Badge>
        ))}
      </div>
    </Section>
  )
}

