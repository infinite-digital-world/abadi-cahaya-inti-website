'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { PageSEO } from '@prisma/client'

interface SEOFormProps {
  pageSEO?: PageSEO
  defaultPath?: string
}

interface SEOFormData {
  path: string
  title: string
  description: string
  keywords: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  canonicalUrl: string
}

export function SEOForm({ pageSEO, defaultPath }: SEOFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit } = useForm<SEOFormData>({
    defaultValues: pageSEO
      ? {
          path: pageSEO.path,
          title: pageSEO.title || '',
          description: pageSEO.description || '',
          keywords: pageSEO.keywords || '',
          ogTitle: pageSEO.ogTitle || '',
          ogDescription: pageSEO.ogDescription || '',
          ogImage: pageSEO.ogImage || '',
          canonicalUrl: pageSEO.canonicalUrl || '',
        }
      : {
          path: defaultPath || '',
          title: '',
          description: '',
          keywords: '',
          ogTitle: '',
          ogDescription: '',
          ogImage: '',
          canonicalUrl: '',
        },
  })

  const onSubmit = async (data: SEOFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const url = pageSEO
        ? `/api/admin/seo/${encodeURIComponent(pageSEO.path)}`
        : '/api/admin/seo'
      const method = pageSEO ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        router.push('/admin/seo')
        router.refresh()
      } else {
        const result = await response.json()
        setError(result.message || 'Terjadi kesalahan')
      }
    } catch (error) {
      setError('Terjadi kesalahan')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{pageSEO ? 'Edit SEO' : 'Tambah SEO Halaman'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-50 text-red-800 rounded-md text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Path <span className="text-red-500">*</span>
            </label>
            <Input
              {...register('path', { required: true })}
              placeholder="/products"
              disabled={!!pageSEO}
            />
            <p className="text-xs text-gray-500 mt-1">
              Path halaman (contoh: /, /products, /about)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Title
              </label>
              <Input
                {...register('title')}
                placeholder="Judul untuk SEO"
                maxLength={60}
              />
              <p className="text-xs text-gray-500 mt-1">
                Rekomendasi: 50-60 karakter
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Description
              </label>
              <Textarea
                {...register('description')}
                rows={3}
                placeholder="Deskripsi untuk SEO"
                maxLength={160}
              />
              <p className="text-xs text-gray-500 mt-1">
                Rekomendasi: 150-160 karakter
              </p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Keywords
              </label>
              <Input
                {...register('keywords')}
                placeholder="keyword1, keyword2, keyword3"
              />
              <p className="text-xs text-gray-500 mt-1">
                Pisahkan dengan koma
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                OG Title (Open Graph)
              </label>
              <Input
                {...register('ogTitle')}
                placeholder="Judul untuk social media"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                OG Description
              </label>
              <Textarea
                {...register('ogDescription')}
                rows={2}
                placeholder="Deskripsi untuk social media"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                OG Image URL
              </label>
              <Input
                {...register('ogImage')}
                placeholder="https://example.com/image.jpg"
                type="url"
              />
              <p className="text-xs text-gray-500 mt-1">
                URL gambar untuk social media (1200x630px recommended)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Canonical URL
              </label>
              <Input
                {...register('canonicalUrl')}
                placeholder="https://abadicahayainti.co.id/products"
                type="url"
              />
              <p className="text-xs text-gray-500 mt-1">
                URL kanonik untuk halaman ini
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Menyimpan...' : pageSEO ? 'Update' : 'Simpan'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Batal
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

