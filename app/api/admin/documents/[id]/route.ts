import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { title, description, category, filePath, fileType, fileSize } = body

    const document = await prisma.document.update({
      where: { id: params.id },
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
    console.error('Update document error:', error)
    return NextResponse.json(
      { message: 'Terjadi kesalahan' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const document = await prisma.document.findUnique({
      where: { id: params.id },
    })

    if (document) {
      await prisma.document.delete({
        where: { id: params.id },
      })

      // TODO: In production, delete the actual file from disk/storage
      // const filePath = join(process.cwd(), 'public', document.filePath)
      // if (existsSync(filePath)) {
      //   await unlink(filePath)
      // }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete document error:', error)
    return NextResponse.json(
      { message: 'Terjadi kesalahan' },
      { status: 500 }
    )
  }
}

