import { prisma } from '@/lib/db'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Plus, Edit } from 'lucide-react'

const commonPages = [
  { path: '/', label: 'Homepage' },
  { path: '/products', label: 'Products' },
  { path: '/services', label: 'Services' },
  { path: '/downloads', label: 'Downloads' },
  { path: '/about', label: 'About Us' },
  { path: '/vendor-support', label: 'Vendor Support' },
  { path: '/contact', label: 'Contact' },
  { path: '/inquiry', label: 'Inquiry' },
  { path: '/insights', label: 'Insights/Blog' },
]

async function getPageSEOList() {
  return prisma.pageSEO.findMany({
    orderBy: { path: 'asc' },
  })
}

export default async function AdminSEOPage() {
  const pageSEOList = await getPageSEOList()
  const existingPaths = new Set(pageSEOList.map((p) => p.path))

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Kelola SEO Halaman</h1>
        <Link href="/admin/seo/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Tambah SEO Halaman
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {commonPages.map((page) => {
          const exists = existingPaths.has(page.path)
          return (
            <Card key={page.path} className={exists ? 'border-green-200' : ''}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{page.label}</CardTitle>
                  {exists && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      SEO Configured
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">{page.path}</p>
              </CardHeader>
              <CardContent>
                <Link href={exists ? `/admin/seo/${page.path.replace(/\//g, '~')}` : `/admin/seo/new?path=${encodeURIComponent(page.path)}`}>
                  <Button variant={exists ? 'outline' : 'default'} size="sm" className="w-full">
                    <Edit className="h-4 w-4 mr-2" />
                    {exists ? 'Edit SEO' : 'Setup SEO'}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {pageSEOList.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Semua Halaman dengan SEO</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 text-gray-900 font-semibold">Path</th>
                    <th className="text-left p-3 text-gray-900 font-semibold">Title</th>
                    <th className="text-left p-3 text-gray-900 font-semibold">Description</th>
                    <th className="text-right p-3 text-gray-900 font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {pageSEOList.map((seo) => (
                    <tr key={seo.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-mono text-sm text-gray-900">{seo.path}</td>
                      <td className="p-3 text-gray-900">{seo.title || '-'}</td>
                      <td className="p-3 text-sm text-gray-600">
                        {seo.description ? (seo.description.substring(0, 60) + '...') : '-'}
                      </td>
                      <td className="p-3">
                        <div className="flex justify-end">
                          <Link href={`/admin/seo/${seo.path.replace(/\//g, '~')}`}>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

