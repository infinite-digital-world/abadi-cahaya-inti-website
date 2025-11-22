import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import { ProductDetail } from '@/components/products/ProductDetail'
import { generatePageMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

async function getProduct(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
    },
  })

  return product
}

async function getRelatedProducts(categoryId: string, excludeId: string) {
  return prisma.product.findMany({
    where: {
      categoryId,
      id: { not: excludeId },
    },
    include: {
      category: true,
    },
    take: 3,
  })
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const product = await getProduct(params.slug)
  if (!product) {
    return {}
  }
  return generatePageMetadata(
    product.name,
    product.shortDescription || product.description || undefined
  )
}

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const product = await getProduct(params.slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(
    product.categoryId,
    product.id
  )

  return (
    <ProductDetail
      product={product}
      relatedProducts={relatedProducts as any}
    />
  )
}

