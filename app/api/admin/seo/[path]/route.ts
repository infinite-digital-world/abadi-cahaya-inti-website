import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function PUT(
  request: Request,
  { params }: { params: { path: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const decodedPath = decodeURIComponent(params.path)
    const body = await request.json()
    const { title, description, keywords, ogTitle, ogDescription, ogImage, canonicalUrl } = body

    const pageSEO = await prisma.pageSEO.update({
      where: { path: decodedPath },
      data: {
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
    console.error('Update SEO error:', error)
    return NextResponse.json(
      { message: 'Terjadi kesalahan' },
      { status: 500 }
    )
  }
}

