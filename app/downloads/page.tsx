import { prisma } from '@/lib/db'
import { Section } from '@/components/ui/Section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { FileText, Download } from 'lucide-react'
import { generatePageMetadata } from '@/lib/seo'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = generatePageMetadata(
  'Dokumen & Download',
  'Download company profile, dokumen legal, dan katalog produk dari PT Abadi Cahaya Inti.'
)

function formatFileSize(bytes?: number | null): string {
  if (!bytes) return 'Unknown'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default async function DownloadsPage() {
  const documents = await prisma.document.findMany({
    orderBy: { createdAt: 'desc' },
  })

  const groupedDocs = documents.reduce((acc, doc) => {
    if (!acc[doc.category]) {
      acc[doc.category] = []
    }
    acc[doc.category].push(doc)
    return acc
  }, {} as Record<string, typeof documents>)

  return (
    <Section>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Dokumen & Download
        </h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Download company profile, dokumen legal, dan katalog produk untuk
          kebutuhan vendor registration dan tender Anda.
        </p>
      </div>

      {Object.keys(groupedDocs).length > 0 ? (
        <div className="space-y-8">
          {Object.entries(groupedDocs).map(([category, docs]) => (
            <div key={category}>
              <h2 className="text-2xl font-bold mb-4">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {docs.map((doc) => (
                  <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <FileText className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <Badge variant="secondary">{doc.fileType.toUpperCase()}</Badge>
                      </div>
                      <CardTitle className="text-xl">{doc.title}</CardTitle>
                      {doc.description && (
                        <CardDescription className="text-base">
                          {doc.description}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      {doc.fileSize && (
                        <p className="text-sm text-gray-500 mb-4">
                          Ukuran: {formatFileSize(doc.fileSize)}
                        </p>
                      )}
                      <Link href={doc.filePath} target="_blank" download>
                        <Button variant="default" className="w-full">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Belum ada dokumen yang tersedia saat ini.
          </p>
        </div>
      )}

      <div className="mt-12 bg-gray-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Butuh Dokumen Khusus?
        </h2>
        <p className="text-gray-600 mb-6">
          Jika Anda membutuhkan dokumen khusus untuk vendor registration atau
          tender, silakan hubungi kami.
        </p>
        <Link href="/vendor-support">
          <Button size="lg" variant="default">
            Dukungan Vendor & Tender
          </Button>
        </Link>
      </div>
    </Section>
  )
}

