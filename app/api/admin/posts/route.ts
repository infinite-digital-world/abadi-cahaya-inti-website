import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { title, slug, excerpt, content, publishedAt } = body

    // Check if slug already exists
    const existing = await prisma.post.findUnique({
      where: { slug },
    })

    if (existing) {
      return NextResponse.json(
        { message: 'Slug sudah digunakan' },
        { status: 400 }
      )
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        publishedAt: publishedAt ? new Date(publishedAt) : null,
      },
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error('Create post error:', error)
    return NextResponse.json(
      { message: 'Terjadi kesalahan' },
      { status: 500 }
    )
  }
}

