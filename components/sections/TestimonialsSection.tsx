import { Card, CardContent } from '@/components/ui/Card'
import { Section } from '@/components/ui/Section'
import { prisma } from '@/lib/db'
import { Quote } from 'lucide-react'

export async function TestimonialsSection() {
  const testimonials = await prisma.testimonial.findMany({
    take: 3,
    orderBy: { createdAt: 'desc' },
  })

  if (testimonials.length === 0) {
    return null
  }

  return (
    <Section>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Apa Kata Klien Kami?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Testimoni dari klien yang telah mempercayai layanan kami.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Quote className="h-8 w-8 text-primary mb-4" />
              <p className="text-gray-700 mb-4 italic">
                &ldquo;{testimonial.message}&rdquo;
              </p>
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900">
                  {testimonial.clientName}
                </p>
                <p className="text-sm text-gray-500">
                  {testimonial.clientCompany}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  )
}

