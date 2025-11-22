'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { inquiryFormSchema } from '@/lib/validation'
import { InquiryFormData } from '@/lib/types'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { useInquiryCart } from '@/contexts/InquiryCartContext'
import { X, Trash2 } from 'lucide-react'

export function InquiryForm() {
  const { items, removeItem, updateQuantity, updateNotes, clearCart } =
    useInquiryCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquiryFormSchema),
  })

  const onSubmit = async (data: InquiryFormData) => {
    if (items.length === 0) {
      setSubmitStatus({
        type: 'error',
        message: 'Silakan tambahkan produk ke permintaan terlebih dahulu.',
      })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          items,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message:
            'Permintaan penawaran berhasil dikirim! Tim kami akan menghubungi Anda segera.',
        })
        reset()
        clearCart()
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message || 'Terjadi kesalahan. Silakan coba lagi.',
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Terjadi kesalahan. Silakan coba lagi.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Inquiry Cart */}
      {items.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Produk dalam Permintaan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">
                      {item.productName}
                    </h4>
                    <p className="text-sm text-gray-500">{item.categoryName}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-600">Jumlah:</label>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(
                            item.productId,
                            parseInt(e.target.value) || 1
                          )
                        }
                        className="w-20"
                      />
                    </div>
                    <Textarea
                      placeholder="Catatan (opsional)"
                      value={item.notes || ''}
                      onChange={(e) =>
                        updateNotes(item.productId, e.target.value)
                      }
                      className="w-48"
                      rows={2}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.productId)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              onClick={clearCart}
              className="mt-4"
              size="sm"
            >
              Hapus Semua
            </Button>
          </CardContent>
        </Card>
      )}

      {items.length === 0 && (
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="pt-6">
            <p className="text-center text-gray-600">
              Belum ada produk dalam permintaan. Silakan tambahkan produk dari
              halaman{' '}
              <a href="/products" className="text-primary hover:underline">
                Katalog Produk
              </a>
              .
            </p>
          </CardContent>
        </Card>
      )}

      {/* Inquiry Form */}
      <Card>
        <CardHeader>
          <CardTitle>Form Permintaan Penawaran</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Honeypot */}
            <input
              type="text"
              {...register('honeypot')}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Perusahaan <span className="text-red-500">*</span>
                </label>
                <Input
                  {...register('companyName')}
                  placeholder="Nama perusahaan Anda"
                />
                {errors.companyName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.companyName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama PIC / Contact Person{' '}
                  <span className="text-red-500">*</span>
                </label>
                <Input
                  {...register('contactPerson')}
                  placeholder="Nama lengkap"
                />
                {errors.contactPerson && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.contactPerson.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <Input
                  type="email"
                  {...register('email')}
                  placeholder="email@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telepon / WhatsApp <span className="text-red-500">*</span>
                </label>
                <Input
                  {...register('phone')}
                  placeholder="08xx-xxxx-xxxx"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lokasi Proyek/Perusahaan
                </label>
                <Input
                  {...register('projectLocation')}
                  placeholder="Kota, Provinsi"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Referensi Pengadaan/Tender
                </label>
                <Input
                  {...register('tenderReference')}
                  placeholder="Nomor tender atau referensi"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pesan / Kebutuhan Tambahan
              </label>
              <Textarea
                {...register('message')}
                placeholder="Jelaskan kebutuhan atau pertanyaan Anda..."
                rows={5}
              />
            </div>

            {submitStatus.type && (
              <div
                className={`p-4 rounded-md ${
                  submitStatus.type === 'success'
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting || items.length === 0}
              size="lg"
              className="w-full"
            >
              {isSubmitting ? 'Mengirim...' : 'Kirim Permintaan Penawaran'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

