'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Document } from '@prisma/client'

interface DocumentFormProps {
  document?: Document
}

interface DocumentFormData {
  title: string
  description: string
  category: string
  filePath: string
}

export function DocumentForm({ document }: DocumentFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadedFilePath, setUploadedFilePath] = useState<string>(
    document?.filePath || ''
  )

  const { register, handleSubmit, setValue } = useForm<DocumentFormData>({
    defaultValues: document
      ? {
          title: document.title,
          description: document.description || '',
          category: document.category,
          filePath: document.filePath,
        }
      : {
          title: '',
          description: '',
          category: 'Company Profile',
          filePath: '',
        },
  })

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        setUploadedFilePath(result.filePath)
        setValue('filePath', result.filePath)
      } else {
        setError(result.message || 'Gagal mengupload file')
      }
    } catch (error) {
      setError('Terjadi kesalahan saat upload')
    } finally {
      setIsUploading(false)
    }
  }

  const onSubmit = async (data: DocumentFormData) => {
    if (!uploadedFilePath) {
      setError('Silakan upload file terlebih dahulu')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const url = document
        ? `/api/admin/documents/${document.id}`
        : '/api/admin/documents'
      const method = document ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          filePath: uploadedFilePath,
        }),
      })

      if (response.ok) {
        router.push('/admin/documents')
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
        <CardTitle>
          {document ? 'Edit Dokumen' : 'Tambah Dokumen Baru'}
        </CardTitle>
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
              Deskripsi
            </label>
            <Textarea
              {...register('description')}
              rows={3}
              placeholder="Deskripsi dokumen..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kategori <span className="text-red-500">*</span>
            </label>
            <select
              {...register('category', { required: true })}
              className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
            >
              <option value="Company Profile">Company Profile</option>
              <option value="Legal Document">Legal Document</option>
              <option value="Product Catalog">Product Catalog</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              File PDF <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              disabled={isUploading}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark"
            />
            {isUploading && (
              <p className="text-sm text-gray-500 mt-2">Mengupload...</p>
            )}
            {uploadedFilePath && (
              <p className="text-sm text-green-600 mt-2">
                File terupload: {uploadedFilePath}
              </p>
            )}
            {document && (
              <p className="text-xs text-gray-500 mt-2">
                File saat ini: {document.filePath}
              </p>
            )}
            <input
              type="hidden"
              {...register('filePath', { required: true })}
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isSubmitting || !uploadedFilePath}>
              {isSubmitting ? 'Menyimpan...' : document ? 'Update' : 'Simpan'}
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

