import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { InquiryCartProvider } from '@/contexts/InquiryCartContext'
import { defaultMetadata } from '@/lib/seo'
import { ConditionalLayout } from '@/components/layout/ConditionalLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = defaultMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <InquiryCartProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </InquiryCartProvider>
      </body>
    </html>
  )
}

