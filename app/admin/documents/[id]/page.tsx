import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import { DocumentForm } from '@/components/forms/DocumentForm'

async function getDocument(id: string) {
  return prisma.document.findUnique({
    where: { id },
  })
}

export default async function EditDocumentPage({
  params,
}: {
  params: { id: string }
}) {
  const document = await getDocument(params.id)

  if (!document) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Edit Dokumen</h1>
      <DocumentForm document={document} />
    </div>
  )
}

