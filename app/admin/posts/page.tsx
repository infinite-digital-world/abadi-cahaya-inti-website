import { prisma } from '@/lib/db'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { PostActions } from '@/components/admin/PostActions'

async function getPosts() {
  return prisma.post.findMany({
    orderBy: {
      updatedAt: 'desc',
    },
  })
}

export default async function AdminPostsPage() {
  const posts = await getPosts()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Kelola Artikel</h1>
        <Link href="/admin/posts/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Tambah Artikel
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Artikel</CardTitle>
        </CardHeader>
        <CardContent>
          {posts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 text-gray-900 font-semibold">Judul</th>
                    <th className="text-left p-3 text-gray-900 font-semibold">Slug</th>
                    <th className="text-left p-3 text-gray-900 font-semibold">Tanggal Publikasi</th>
                    <th className="text-left p-3 text-gray-900 font-semibold">Diperbarui</th>
                    <th className="text-right p-3 text-gray-900 font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-semibold text-gray-900">{post.title}</td>
                      <td className="p-3 text-sm text-gray-500">{post.slug}</td>
                      <td className="p-3 text-sm text-gray-500">
                        {post.publishedAt
                          ? new Date(post.publishedAt).toLocaleDateString('id-ID')
                          : 'Belum dipublikasikan'}
                      </td>
                      <td className="p-3 text-sm text-gray-500">
                        {new Date(post.updatedAt).toLocaleDateString('id-ID')}
                      </td>
                      <td className="p-3">
                        <div className="flex justify-end gap-2">
                          <Link href={`/admin/posts/${post.id}`}>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <PostActions postId={post.id} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              Belum ada artikel. Tambahkan artikel pertama Anda.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

