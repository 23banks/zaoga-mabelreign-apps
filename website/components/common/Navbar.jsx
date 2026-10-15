'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuthContext } from '@/hooks/AuthContext';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/sermons', label: 'Sermons' },
  { href: '/events', label: 'Events' },
  { href: '/prayers', label: 'Prayers' },
  { href: '/testimonies', label: 'Testimonies' },
  { href: '/devotions', label: 'Devotions' },
  { href: '/gallery', label: 'Gallery' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuthContext();
  const isAdmin = user?.role === 'admin';

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  const desktopLink = (href) =>
    `relative py-1 text-sm font-medium transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:rounded after:bg-accent after:transition-all ${
      isActive(href)
        ? 'text-primary after:w-full'
        : 'text-gray-600 hover:text-primary after:w-0 hover:after:w-full'
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200/70 bg-white/85 backdrop-blur-md">
      <div className="container py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-ink flex items-center justify-center shadow-md shadow-primary/30">
              <span className="font-display text-accent font-bold text-lg leading-none">Z</span>
            </div>
            <div className="leading-tight hidden sm:block">
              <span className="block font-display font-bold text-ink text-lg">ZAOGA FIF</span>
              <span className="block text-[10px] uppercase tracking-[0.18em] text-gray-500">Mabelreign Kingdom</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={desktopLink(link.href)}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-5">
            {!isAuthenticated ? (
              <>
                <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
                  Login
                </Link>
                <Link href="/register" className="btn-primary text-sm">
                  Register
                </Link>
              </>
            ) : (
              <>
                {isAdmin && (
                  <Link href="/admin" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
                    Admin
                  </Link>
                )}
                <Link href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
                  Dashboard
                </Link>
                <button onClick={logout} className="btn-secondary text-sm py-1.5">
                  Logout
                </button>
              </>
            )}
          </div>

          <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden mt-3 pb-3 border-t border-gray-100 pt-3 space-y-1 animate-fade-up">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 rounded-lg ${
                  isActive(link.href) ? 'bg-primary/10 text-primary font-semibold' : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {!isAuthenticated ? (
              <div className="flex gap-2 pt-3">
                <Link href="/login" className="flex-1 btn-secondary text-center" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
                <Link href="/register" className="flex-1 btn-primary text-center" onClick={() => setIsOpen(false)}>
                  Register
                </Link>
              </div>
            ) : (
              <div className="pt-2 space-y-1">
                {isAdmin && (
                  <Link href="/admin" className="block px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100" onClick={() => setIsOpen(false)}>
                    Admin
                  </Link>
                )}
                <Link href="/dashboard" className="block px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100" onClick={() => setIsOpen(false)}>
                  Dashboard
                </Link>
                <button
                  className="w-full text-left px-3 py-2 rounded-lg text-danger hover:bg-red-50"
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
