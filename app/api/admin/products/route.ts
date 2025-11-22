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
    const { name, categoryId, slug, shortDescription, description, specs } = body

    // Check if slug already exists
    const existing = await prisma.product.findUnique({
      where: { slug },
    })

    if (existing) {
      return NextResponse.json(
        { message: 'Slug sudah digunakan' },
        { status: 400 }
      )
    }

    const product = await prisma.product.create({
      data: {
        name,
        categoryId,
        slug,
        shortDescription,
        description,
        specs,
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error('Create product error:', error)
    return NextResponse.json(
      { message: 'Terjadi kesalahan' },
      { status: 500 }
    )
  }
}

