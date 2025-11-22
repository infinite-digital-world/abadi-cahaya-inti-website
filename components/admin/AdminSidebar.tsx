'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { Package, FileText, BookOpen, LayoutDashboard, LogOut, Search } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const adminNavItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Produk', icon: Package },
  { href: '/admin/posts', label: 'Artikel', icon: BookOpen },
  { href: '/admin/documents', label: 'Dokumen', icon: FileText },
  { href: '/admin/seo', label: 'SEO', icon: Search },
]

export function AdminSidebar({ userEmail }: { userEmail?: string | null }) {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-gray-900 text-white fixed left-0 top-0 h-screen overflow-y-auto">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
        <nav className="space-y-2">
          {adminNavItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || 
              (item.href !== '/admin' && pathname?.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                  isActive
                    ? 'bg-gray-800 text-white'
                    : 'hover:bg-gray-800 text-gray-300'
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="p-6 border-t border-gray-800">
        <div className="mb-4">
          <p className="text-sm text-gray-400">Logged in as</p>
          <p className="font-semibold">{userEmail}</p>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none border border-gray-700 text-white hover:bg-gray-800 h-9 px-3"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </button>
      </div>
    </aside>
  )
}

