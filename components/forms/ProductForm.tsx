'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Product, ProductCategory } from '@prisma/client'

interface ProductFormProps {
  product?: Product & { category: ProductCategory }
  categories: ProductCategory[]
}

interface ProductFormData {
  name: string
  categoryId: string
  slug: string
  shortDescription: string
  description: string
  specs: string
}

export function ProductForm({ product, categories }: ProductFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, watch, setValue } = useForm<ProductFormData>({
    defaultValues: product
      ? {
          name: product.name,
          categoryId: product.categoryId,
          slug: product.slug,
          shortDescription: product.shortDescription || '',
          description: product.description || '',
          specs: product.specs || '',
        }
      : {
          name: '',
          categoryId: categories[0]?.id || '',
          slug: '',
          shortDescription: '',
          description: '',
          specs: '',
        },
  })

  // Auto-generate slug from name
  const name = watch('name')
  if (name && !product) {
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    if (slug !== watch('slug')) {
      setValue('slug', slug)
    }
  }

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const url = product
        ? `/api/admin/products/${product.id}`
        : '/api/admin/products'
      const method = product ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        router.push('/admin/products')
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
        <CardTitle>{product ? 'Edit Produk' : 'Tambah Produk Baru'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-50 text-red-800 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Produk <span className="text-red-500">*</span>
              </label>
              <Input {...register('name', { required: true })} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori <span className="text-red-500">*</span>
              </label>
              <select
                {...register('categoryId', { required: true })}
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug (URL) <span className="text-red-500">*</span>
              </label>
              <Input {...register('slug', { required: true })} />
              <p className="text-xs text-gray-500 mt-1">
                Akan otomatis dibuat dari nama produk
              </p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi Singkat
              </label>
              <Textarea
                {...register('shortDescription')}
                rows={2}
                placeholder="Deskripsi singkat produk..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi Lengkap
              </label>
              <Textarea
                {...register('description')}
                rows={6}
                placeholder="Deskripsi lengkap produk..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Spesifikasi Teknis (JSON)
              </label>
              <Textarea
                {...register('specs')}
                rows={6}
                placeholder='{"Kapasitas": "1-10 ton", "Material": "Baja", ...}'
              />
              <p className="text-xs text-gray-500 mt-1">
                Format JSON untuk spesifikasi teknis
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Menyimpan...' : product ? 'Update' : 'Simpan'}
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

