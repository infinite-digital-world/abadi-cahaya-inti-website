import { prisma } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Package, FileText, BookOpen, Clock } from 'lucide-react'

async function getStats() {
  const [productCount, postCount, documentCount, recentProducts] =
    await Promise.all([
      prisma.product.count(),
      prisma.post.count(),
      prisma.document.count(),
      prisma.product.findMany({
        take: 5,
        orderBy: { updatedAt: 'desc' },
        include: { category: true },
      }),
    ])

  return {
    productCount,
    postCount,
    documentCount,
    recentProducts,
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Produk</CardTitle>
            <Package className="h-8 w-8 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900">{stats.productCount}</p>
            <p className="text-sm text-gray-500">Total produk</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Artikel</CardTitle>
            <BookOpen className="h-8 w-8 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900">{stats.postCount}</p>
            <p className="text-sm text-gray-500">Total artikel</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Dokumen</CardTitle>
            <FileText className="h-8 w-8 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900">{stats.documentCount}</p>
            <p className="text-sm text-gray-500">Total dokumen</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <CardTitle>Produk Terbaru</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {stats.recentProducts.length > 0 ? (
            <div className="space-y-2">
              {stats.recentProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">
                      {product.category.name}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(product.updatedAt).toLocaleDateString('id-ID')}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Belum ada produk</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

