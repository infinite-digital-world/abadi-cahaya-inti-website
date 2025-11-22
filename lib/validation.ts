import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Nama harus minimal 2 karakter'),
  company: z.string().min(2, 'Nama perusahaan harus minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  phone: z.string().min(10, 'Nomor telepon harus minimal 10 digit'),
  location: z.string().optional(),
  message: z.string().min(10, 'Pesan harus minimal 10 karakter'),
  honeypot: z.string().max(0, 'Spam detected').optional(),
})

export const inquiryFormSchema = z.object({
  companyName: z.string().min(2, 'Nama perusahaan harus minimal 2 karakter'),
  contactPerson: z.string().min(2, 'Nama PIC harus minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  phone: z.string().min(10, 'Nomor telepon harus minimal 10 digit'),
  projectLocation: z.string().optional(),
  tenderReference: z.string().optional(),
  message: z.string().optional(),
  honeypot: z.string().max(0, 'Spam detected').optional(),
})

