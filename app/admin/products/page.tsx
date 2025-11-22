import { prisma } from '@/lib/db'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { ProductActions } from '@/components/admin/ProductActions'

async function getProducts() {
  return prisma.product.findMany({
    include: {
      category: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })
}

export default async function AdminProductsPage() {
  const products = await getProducts()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Kelola Produk</h1>
        <Link href="/admin/products/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Tambah Produk
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Produk</CardTitle>
        </CardHeader>
        <CardContent>
          {products.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 text-gray-900 font-semibold">Nama</th>
                    <th className="text-left p-3 text-gray-900 font-semibold">Kategori</th>
                    <th className="text-left p-3 text-gray-900 font-semibold">Slug</th>
                    <th className="text-left p-3 text-gray-900 font-semibold">Diperbarui</th>
                    <th className="text-right p-3 text-gray-900 font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-semibold text-gray-900">{product.name}</td>
                      <td className="p-3">{product.category.name}</td>
                      <td className="p-3 text-sm text-gray-500">
                        {product.slug}
                      </td>
                      <td className="p-3 text-sm text-gray-500">
                        {new Date(product.updatedAt).toLocaleDateString('id-ID')}
                      </td>
                      <td className="p-3">
                        <div className="flex justify-end gap-2">
                          <Link href={`/admin/products/${product.id}`}>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <ProductActions productId={product.id} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              Belum ada produk. Tambahkan produk pertama Anda.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

