import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'
import { prisma } from '@/lib/db'

export async function ProductCategoriesSection() {
  const categories = await prisma.productCategory.findMany({
    include: {
      _count: {
        select: { products: true },
      },
    },
  })

  const categoryDescriptions: Record<string, string> = {
    'lifting-equipment':
      'Peralatan angkat dan rigging berkualitas tinggi untuk berbagai aplikasi industri',
    'safety-equipment':
      'Alat Pelindung Diri (APD) standar industri untuk keselamatan kerja',
    'material-supply':
      'Material pendukung dan aksesori untuk kebutuhan industri',
  }

  return (
    <Section className="bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Kategori Produk
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Jelajahi katalog lengkap produk kami untuk lifting, safety, dan
          material pendukung.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl">{category.name}</CardTitle>
              <CardDescription className="text-base">
                {categoryDescriptions[category.slug] || category.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                {category._count.products} produk tersedia
              </p>
              <Link href={`/products?category=${category.slug}`}>
                <Button variant="outline" className="w-full">
                  Lihat Produk
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  )
}

