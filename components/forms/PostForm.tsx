'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Post } from '@prisma/client'

interface PostFormProps {
  post?: Post
}

interface PostFormData {
  title: string
  slug: string
  excerpt: string
  content: string
  publishedAt: string
}

export function PostForm({ post }: PostFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, watch, setValue } = useForm<PostFormData>({
    defaultValues: post
      ? {
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt || '',
          content: post.content,
          publishedAt: post.publishedAt
            ? new Date(post.publishedAt).toISOString().slice(0, 16)
            : '',
        }
      : {
          title: '',
          slug: '',
          excerpt: '',
          content: '',
          publishedAt: '',
        },
  })

  // Auto-generate slug from title
  const title = watch('title')
  if (title && !post) {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    if (slug !== watch('slug')) {
      setValue('slug', slug)
    }
  }

  const onSubmit = async (data: PostFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const url = post ? `/api/admin/posts/${post.id}` : '/api/admin/posts'
      const method = post ? 'PUT' : 'POST'

      const payload = {
        ...data,
        publishedAt: data.publishedAt ? new Date(data.publishedAt).toISOString() : null,
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        router.push('/admin/posts')
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
        <CardTitle>{post ? 'Edit Artikel' : 'Tambah Artikel Baru'}</CardTitle>
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
              Judul <span className="text-red-500">*</span>
            </label>
            <Input {...register('title', { required: true })} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug (URL) <span className="text-red-500">*</span>
            </label>
            <Input {...register('slug', { required: true })} />
            <p className="text-xs text-gray-500 mt-1">
              Akan otomatis dibuat dari judul
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ringkasan (Excerpt)
            </label>
            <Textarea
              {...register('excerpt')}
              rows={3}
              placeholder="Ringkasan artikel..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Konten <span className="text-red-500">*</span>
            </label>
            <Textarea
              {...register('content', { required: true })}
              rows={15}
              placeholder="Konten artikel..."
            />
            <p className="text-xs text-gray-500 mt-1">
              Gunakan baris baru untuk paragraf
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tanggal Publikasi
            </label>
            <Input
              type="datetime-local"
              {...register('publishedAt')}
            />
            <p className="text-xs text-gray-500 mt-1">
              Kosongkan untuk menyimpan sebagai draft
            </p>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Menyimpan...' : post ? 'Update' : 'Simpan'}
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

