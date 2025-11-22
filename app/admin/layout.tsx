import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { AdminSidebar } from '@/components/admin/AdminSidebar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  // If no session, the middleware will handle redirect
  // We just render the login page content if no session
  if (!session) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar - Fixed */}
        <AdminSidebar userEmail={session.user?.email} />

        {/* Main Content - Offset by sidebar width */}
        <main className="flex-1 ml-64">
          <div className="bg-white border-b px-6 py-4 flex items-center justify-between sticky top-0 z-10">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <Link href="/">
              <Button variant="outline" size="sm">
                Kembali ke Situs
              </Button>
            </Link>
          </div>
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}

