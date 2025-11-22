import { prisma } from '@/lib/db'
import { ProductForm } from '@/components/forms/ProductForm'

async function getCategories() {
  return prisma.productCategory.findMany({
    orderBy: { name: 'asc' },
  })
}

export default async function NewProductPage() {
  const categories = await getCategories()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Tambah Produk Baru</h1>
      <ProductForm categories={categories} />
    </div>
  )
}

