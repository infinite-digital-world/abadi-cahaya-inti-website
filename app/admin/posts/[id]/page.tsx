import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import { PostForm } from '@/components/forms/PostForm'

async function getPost(id: string) {
  return prisma.post.findUnique({
    where: { id },
  })
}

export default async function EditPostPage({
  params,
}: {
  params: { id: string }
}) {
  const post = await getPost(params.id)

  if (!post) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Edit Artikel</h1>
      <PostForm post={post} />
    </div>
  )
}

