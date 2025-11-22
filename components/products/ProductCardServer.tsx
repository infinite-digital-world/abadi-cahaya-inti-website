import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ProductWithCategory } from '@/lib/types'
import { AddToInquiryButton } from './AddToInquiryButton'

export function ProductCardServer({ product }: { product: ProductWithCategory }) {
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
          <AddToInquiryButton product={product} />
        </div>
      </CardContent>
    </Card>
  )
}

