import { prisma } from '@/lib/db'
import { notFound, redirect } from 'next/navigation'
import { ProductForm } from '@/components/forms/ProductForm'

async function getProduct(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: { category: true },
  })
}

async function getCategories() {
  return prisma.productCategory.findMany({
    orderBy: { name: 'asc' },
  })
}

export default async function EditProductPage({
  params,
}: {
  params: { id: string }
}) {
  const product = await getProduct(params.id)
  const categories = await getCategories()

  if (!product) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Edit Produk</h1>
      <ProductForm product={product} categories={categories} />
    </div>
  )
}

