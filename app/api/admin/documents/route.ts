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
    const { title, description, category, filePath, fileType, fileSize } = body

    const document = await prisma.document.create({
      data: {
        title,
        description,
        category,
        filePath,
        fileType: fileType || 'pdf',
        fileSize: fileSize || null,
      },
    })

    return NextResponse.json(document)
  } catch (error) {
    console.error('Create document error:', error)
    return NextResponse.json(
      { message: 'Terjadi kesalahan' },
      { status: 500 }
    )
  }
}

