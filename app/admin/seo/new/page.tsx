import { SEOForm } from '@/components/forms/SEOForm'
import { headers } from 'next/headers'

export default async function NewSEOPage({
  searchParams,
}: {
  searchParams: { path?: string }
}) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Tambah SEO Halaman</h1>
      <SEOForm defaultPath={searchParams.path} />
    </div>
  )
}

