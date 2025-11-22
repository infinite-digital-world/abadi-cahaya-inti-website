import { prisma } from '@/lib/db'
import { ProductCardServer } from '@/components/products/ProductCardServer'
import { Section } from '@/components/ui/Section'
import { generatePageMetadata } from '@/lib/seo'
import type { Metadata } from 'next'
import { ProductWithCategory } from '@/lib/types'

export const metadata: Metadata = generatePageMetadata(
  'Katalog Produk',
  'Jelajahi katalog lengkap produk lifting equipment, safety equipment (APD), dan material pendukung industri dari PT Abadi Cahaya Inti.'
)

async function getProducts(categorySlug?: string) {
  const where = categorySlug
    ? { category: { slug: categorySlug } }
    : undefined

  const products = await prisma.product.findMany({
    where,
    include: {
      category: true,
    },
    orderBy: {
      name: 'asc',
    },
  })

  return products as ProductWithCategory[]
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  const products = await getProducts(searchParams.category)
  const categories = await prisma.productCategory.findMany()

  return (
    <Section>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Katalog Produk</h1>
        <p className="text-gray-600 text-lg">
          Jelajahi katalog lengkap produk lifting equipment, safety equipment
          (APD), dan material pendukung industri kami.
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        <a
          href="/products"
          className={`px-4 py-2 rounded-md border transition-colors ${
            !searchParams.category
              ? 'bg-primary text-white border-primary'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          Semua Kategori
        </a>
        {categories.map((category) => (
          <a
            key={category.id}
            href={`/products?category=${category.slug}`}
            className={`px-4 py-2 rounded-md border transition-colors ${
              searchParams.category === category.slug
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            {category.name}
          </a>
        ))}
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCardServer key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Tidak ada produk ditemukan untuk kategori ini.
          </p>
        </div>
      )}
    </Section>
  )
}

