import { prisma } from '@/lib/db'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Plus, Edit, Trash2, Download } from 'lucide-react'
import { DocumentActions } from '@/components/admin/DocumentActions'

async function getDocuments() {
  return prisma.document.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export default async function AdminDocumentsPage() {
  const documents = await getDocuments()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Kelola Dokumen</h1>
        <Link href="/admin/documents/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Tambah Dokumen
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Dokumen</CardTitle>
        </CardHeader>
        <CardContent>
          {documents.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 text-gray-900 font-semibold">Judul</th>
                    <th className="text-left p-3 text-gray-900 font-semibold">Kategori</th>
                    <th className="text-left p-3 text-gray-900 font-semibold">File</th>
                    <th className="text-left p-3 text-gray-900 font-semibold">Dibuat</th>
                    <th className="text-right p-3 text-gray-900 font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc) => (
                    <tr key={doc.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-semibold text-gray-900">{doc.title}</td>
                      <td className="p-3">{doc.category}</td>
                      <td className="p-3">
                        <a
                          href={doc.filePath}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-primary hover:underline"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          {doc.filePath.split('/').pop()}
                        </a>
                      </td>
                      <td className="p-3 text-sm text-gray-500">
                        {new Date(doc.createdAt).toLocaleDateString('id-ID')}
                      </td>
                      <td className="p-3">
                        <div className="flex justify-end gap-2">
                          <Link href={`/admin/documents/${doc.id}`}>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <DocumentActions documentId={doc.id} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              Belum ada dokumen. Tambahkan dokumen pertama Anda.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

