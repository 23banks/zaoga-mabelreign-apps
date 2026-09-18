'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AdminGuard from '@/components/AdminGuard';

const navItems = [
  { href: '/admin', label: 'Overview' },
  { href: '/admin/sermons', label: 'Sermons' },
  { href: '/admin/events', label: 'Events' },
  { href: '/admin/announcements', label: 'Announcements' },
  { href: '/admin/devotions', label: 'Devotions' },
  { href: '/admin/media', label: 'Media Gallery' },
  { href: '/admin/prayers', label: 'Prayer Requests' },
  { href: '/admin/testimonies', label: 'Testimonies' },
  { href: '/admin/users', label: 'Users' },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  return (
    <AdminGuard>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin</h1>
        <div className="grid md:grid-cols-[200px_1fr] gap-8">
          <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                    isActive ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </AdminGuard>
  );
}
