import { Product, ProductCategory, Document, Post, Testimonial } from '@prisma/client'

export type ProductWithCategory = Product & {
  category: ProductCategory
}

export type InquiryItem = {
  productId: string
  productName: string
  categoryName: string
  quantity: number
  notes?: string
}

export interface ContactFormData {
  name: string
  company: string
  email: string
  phone: string
  location?: string
  message: string
  honeypot?: string
}

export interface InquiryFormData {
  companyName: string
  contactPerson: string
  email: string
  phone: string
  projectLocation?: string
  tenderReference?: string
  message?: string
  honeypot?: string
}

