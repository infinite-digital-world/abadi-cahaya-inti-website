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
    const { path, title, description, keywords, ogTitle, ogDescription, ogImage, canonicalUrl } = body

    // Check if path already exists
    const existing = await prisma.pageSEO.findUnique({
      where: { path },
    })

    if (existing) {
      return NextResponse.json(
        { message: 'SEO untuk path ini sudah ada' },
        { status: 400 }
      )
    }

    const pageSEO = await prisma.pageSEO.create({
      data: {
        path,
        title,
        description,
        keywords,
        ogTitle,
        ogDescription,
        ogImage,
        canonicalUrl,
      },
    })

    return NextResponse.json(pageSEO)
  } catch (error) {
    console.error('Create SEO error:', error)
    return NextResponse.json(
      { message: 'Terjadi kesalahan' },
      { status: 500 }
    )
  }
}

