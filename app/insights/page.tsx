import { prisma } from '@/lib/db'
import { Section } from '@/components/ui/Section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import Link from 'next/link'
import { generatePageMetadata } from '@/lib/seo'
import type { Metadata } from 'next'
import { Calendar } from 'lucide-react'

export const metadata: Metadata = generatePageMetadata(
  'Insights & Artikel',
  'Artikel dan tips tentang keselamatan kerja, best practices lifting equipment, dan informasi terkini dari PT Abadi Cahaya Inti.'
)

function formatDate(date: Date | null) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function InsightsPage() {
  const posts = await prisma.post.findMany({
    where: {
      publishedAt: {
        lte: new Date(),
      },
    },
    orderBy: {
      publishedAt: 'desc',
    },
  })

  return (
    <Section>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Insights & Artikel
        </h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Tips keselamatan, best practices, dan informasi terkini tentang
          lifting equipment, safety equipment, dan industri terkait.
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl line-clamp-2">
                  {post.title}
                </CardTitle>
                {post.excerpt && (
                  <CardDescription className="text-base line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-end">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formatDate(post.publishedAt)}
                </div>
                <Link href={`/insights/${post.slug}`}>
                  <button className="text-primary hover:underline font-medium w-full text-left">
                    Baca selengkapnya →
                  </button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Belum ada artikel yang tersedia saat ini.
          </p>
        </div>
      )}
    </Section>
  )
}

