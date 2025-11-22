import { Metadata } from 'next'
import { prisma } from './db'

export interface SEOData {
  title?: string | null
  description?: string | null
  keywords?: string | null
  ogTitle?: string | null
  ogDescription?: string | null
  ogImage?: string | null
  canonicalUrl?: string | null
}

const defaultSiteName = 'PT Abadi Cahaya Inti'
const defaultSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://abadicahayainti.co.id'

export async function getPageSEO(path: string): Promise<SEOData | null> {
  try {
    if (!prisma || !prisma.pageSEO) {
      console.warn('Prisma client not initialized, skipping SEO fetch')
      return null
    }
    const pageSEO = await prisma.pageSEO.findUnique({
      where: { path },
    })
    return pageSEO
  } catch (error) {
    console.error('Error fetching page SEO:', error)
    return null
  }
}

export function generateMetadata(
  title?: string | null,
  description?: string | null,
  keywords?: string | null,
  ogImage?: string | null,
  canonicalUrl?: string | null
): Metadata {
  const metaTitle = title 
    ? `${title} | ${defaultSiteName}`
    : defaultSiteName

  const metaDescription = description || 
    'PT Abadi Cahaya Inti adalah supplier B2B terpercaya di Makassar untuk peralatan lifting, safety equipment (APD), dan material pendukung industri.'

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: keywords || 'lifting equipment, safety equipment, APD, peralatan angkat, alat keselamatan, Makassar, Sulawesi Selatan',
    openGraph: {
      title: title || metaTitle,
      description: metaDescription,
      url: canonicalUrl || defaultSiteUrl,
      siteName: defaultSiteName,
      images: ogImage ? [{ url: ogImage }] : undefined,
      locale: 'id_ID',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title || metaTitle,
      description: metaDescription,
      images: ogImage ? [ogImage] : undefined,
    },
    alternates: {
      canonical: canonicalUrl || defaultSiteUrl,
    },
  }
}

export function generateProductSchema(product: {
  name: string
  description?: string | null
  category: { name: string }
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description || '',
    category: product.category.name,
    brand: {
      '@type': 'Brand',
      name: defaultSiteName,
    },
  }
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: defaultSiteName,
    description: 'Your Trusted Partner for Lifting, Safety & Material Supply',
    url: defaultSiteUrl,
    logo: `${defaultSiteUrl}/logo.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jalan Palapa VII No. 17, Paccerakang, Biringkanaya',
      addressLocality: 'Kota Makassar',
      addressRegion: 'Sulawesi Selatan',
      postalCode: '90245',
      addressCountry: 'ID',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+62-851-2132-1332',
      contactType: 'Customer Service',
      email: 'info@abadicahayainti.co.id',
    },
  }
}

export function generateArticleSchema(post: {
  title: string
  excerpt?: string | null
  publishedAt: Date | null
  slug: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || '',
    datePublished: post.publishedAt?.toISOString(),
    author: {
      '@type': 'Organization',
      name: defaultSiteName,
    },
    publisher: {
      '@type': 'Organization',
      name: defaultSiteName,
    },
    url: `${defaultSiteUrl}/insights/${post.slug}`,
  }
}

