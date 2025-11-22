import { Metadata } from 'next'

export const defaultMetadata: Metadata = {
  title: 'PT Abadi Cahaya Inti - Your Trusted Partner for Lifting, Safety & Material Supply',
  description: 'PT Abadi Cahaya Inti adalah supplier B2B terpercaya di Makassar untuk peralatan lifting, safety equipment (APD), dan material pendukung industri konstruksi, marine, mining, dan infrastruktur.',
  keywords: 'lifting equipment, safety equipment, APD, peralatan angkat, alat keselamatan, Makassar, Sulawesi Selatan',
}

export function generatePageMetadata(
  title: string,
  description?: string
): Metadata {
  return {
    title: `${title} | PT Abadi Cahaya Inti`,
    description: description || defaultMetadata.description,
  }
}

