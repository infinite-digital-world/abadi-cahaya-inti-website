'use client'

import { useInquiryCart } from '@/contexts/InquiryCartContext'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Section } from '@/components/ui/Section'
import { ProductWithCategory } from '@/lib/types'
import { ProductCardServer } from './ProductCardServer'
import Link from 'next/link'

export function ProductDetail({
  product,
  relatedProducts,
}: {
  product: ProductWithCategory
  relatedProducts: ProductWithCategory[]
}) {
  const { addItem } = useInquiryCart()

  const handleAddToInquiry = () => {
    addItem({
      productId: product.id,
      productName: product.name,
      categoryName: product.category.name,
      quantity: 1,
    })
  }

  let specs: Record<string, string> = {}
  try {
    if (product.specs) {
      specs = JSON.parse(product.specs)
    }
  } catch (e) {
    // Ignore parse errors
  }

  return (
    <Section>
      <div className="mb-6">
        <Link
          href="/products"
          className="text-primary hover:underline text-sm"
        >
          ← Kembali ke Katalog
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
                <Badge variant="secondary" className="text-base">
                  {product.category.name}
                </Badge>
              </div>
            </div>
            {product.shortDescription && (
              <p className="text-xl text-gray-600 mb-4">
                {product.shortDescription}
              </p>
            )}
            {product.description && (
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: product.description.replace(/\n/g, '<br />'),
                }}
              />
            )}
          </div>

          {Object.keys(specs).length > 0 && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Spesifikasi Teknis</CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full">
                  <tbody>
                    {Object.entries(specs).map(([key, value]) => (
                      <tr key={key} className="border-b">
                        <td className="py-2 font-semibold text-gray-700">
                          {key}
                        </td>
                        <td className="py-2 text-gray-600">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Permintaan Penawaran</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Tambahkan produk ini ke permintaan penawaran untuk mendapatkan
                harga dan informasi lebih lanjut.
              </p>
              <Button
                onClick={handleAddToInquiry}
                className="w-full"
                size="lg"
              >
                Tambahkan ke Permintaan
              </Button>
              <Link href="/contact" className="block mt-4">
                <Button variant="outline" className="w-full">
                  Hubungi Kami
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Produk Terkait</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((related) => (
              <ProductCardServer key={related.id} product={related} />
            ))}
          </div>
        </div>
      )}
    </Section>
  )
}

