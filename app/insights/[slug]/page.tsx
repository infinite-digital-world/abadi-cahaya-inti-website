import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import { Section } from '@/components/ui/Section'
import { generatePageMetadata } from '@/lib/seo'
import type { Metadata } from 'next'
import { Calendar, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

function formatDate(date: Date | null) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

async function getPost(slug: string) {
  return prisma.post.findUnique({
    where: { slug },
  })
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) {
    return {}
  }
  return generatePageMetadata(post.title, post.excerpt || undefined)
}

export default async function PostDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getPost(params.slug)

  if (!post || !post.publishedAt || post.publishedAt > new Date()) {
    notFound()
  }

  return (
    <Section>
      <div className="mb-6">
        <Link
          href="/insights"
          className="inline-flex items-center text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali ke Insights
        </Link>
      </div>

      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
          {post.excerpt && (
            <p className="text-xl text-gray-600 mb-4">{post.excerpt}</p>
          )}
          <div className="flex items-center text-gray-500">
            <Calendar className="h-5 w-5 mr-2" />
            <time dateTime={post.publishedAt.toISOString()}>
              {formatDate(post.publishedAt)}
            </time>
          </div>
        </header>

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{
            __html: post.content.replace(/\n/g, '<br />'),
          }}
        />
      </article>
    </Section>
  )
}

