'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { InquiryItem } from '@/lib/types'

interface InquiryCartContextType {
  items: InquiryItem[]
  addItem: (item: Omit<InquiryItem, 'quantity'> & { quantity?: number }) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  updateNotes: (productId: string, notes: string) => void
  clearCart: () => void
  itemCount: number
}

const InquiryCartContext = createContext<InquiryCartContextType | undefined>(undefined)

export function InquiryCartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<InquiryItem[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('inquiryCart')
    if (stored) {
      try {
        setItems(JSON.parse(stored))
      } catch (e) {
        console.error('Failed to load cart from localStorage', e)
      }
    }
  }, [])

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('inquiryCart', JSON.stringify(items))
  }, [items])

  const addItem = (item: Omit<InquiryItem, 'quantity'> & { quantity?: number }) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === item.productId)
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + (item.quantity || 1) }
            : i
        )
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }]
    })
  }

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }
    setItems((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity } : i))
    )
  }

  const updateNotes = (productId: string, notes: string) => {
    setItems((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, notes } : i))
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <InquiryCartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        updateNotes,
        clearCart,
        itemCount,
      }}
    >
      {children}
    </InquiryCartContext.Provider>
  )
}

export function useInquiryCart() {
  const context = useContext(InquiryCartContext)
  if (context === undefined) {
    throw new Error('useInquiryCart must be used within InquiryCartProvider')
  }
  return context
}

