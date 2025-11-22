'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ProductWithCategory } from '@/lib/types'
import { useInquiryCart } from '@/contexts/InquiryCartContext'

export function ProductCard({ product }: { product: ProductWithCategory }) {
  const { addItem } = useInquiryCart()

  const handleAddToInquiry = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      productId: product.id,
      productName: product.name,
      categoryName: product.category.name,
      quantity: 1,
    })
  }

  return (
    <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <CardTitle className="text-xl">{product.name}</CardTitle>
          <Badge variant="secondary">{product.category.name}</Badge>
        </div>
        <CardDescription className="text-base">
          {product.shortDescription || product.description?.substring(0, 100)}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-end">
        <div className="flex gap-2">
          <Link href={`/products/${product.slug}`} className="flex-1">
            <Button variant="outline" className="w-full">
              Detail
            </Button>
          </Link>
          <Button
            variant="default"
            className="flex-1"
            onClick={handleAddToInquiry}
          >
            Tambahkan
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

