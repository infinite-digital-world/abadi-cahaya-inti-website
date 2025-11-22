'use client'

import { Button } from '@/components/ui/Button'
import { useInquiryCart } from '@/contexts/InquiryCartContext'
import { ProductWithCategory } from '@/lib/types'

export function AddToInquiryButton({ product }: { product: ProductWithCategory }) {
  const { addItem } = useInquiryCart()

  const handleAddToInquiry = () => {
    addItem({
      productId: product.id,
      productName: product.name,
      categoryName: product.category.name,
      quantity: 1,
    })
  }

  return (
    <Button
      variant="default"
      className="flex-1"
      onClick={handleAddToInquiry}
    >
      Tambahkan
    </Button>
  )
}

