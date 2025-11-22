import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import { SEOForm } from '@/components/forms/SEOForm'

async function getPageSEO(path: string) {
  const decodedPath = path.replace(/~/g, '/')
  return prisma.pageSEO.findUnique({
    where: { path: decodedPath },
  })
}

export default async function EditSEOPage({
  params,
}: {
  params: { path: string }
}) {
  const pageSEO = await getPageSEO(params.path)

  if (!pageSEO) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Edit SEO: {pageSEO.path}</h1>
      <SEOForm pageSEO={pageSEO} />
    </div>
  )
}

