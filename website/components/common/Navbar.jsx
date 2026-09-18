'use client';

import Link from 'next/link';
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
  const { isAuthenticated, logout } = useAuthContext();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">Z</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline text-gray-900">
              ZAOGA FIF
            </span>
          </Link>

          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-primary transition text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link href="/login" className="text-gray-600 hover:text-primary transition text-sm font-medium">
                  Login
                </Link>
                <Link href="/register" className="btn-primary">
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link href="/dashboard" className="text-gray-600 hover:text-primary text-sm font-medium">
                  Dashboard
                </Link>
                <button onClick={logout} className="text-red-600 hover:text-red-700 text-sm font-medium">
                  Logout
                </button>
              </>
            )}
          </div>

          <button className="lg:hidden p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-gray-600 hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {!isAuthenticated ? (
              <div className="flex space-x-2 pt-2">
                <Link href="/login" className="flex-1 btn-secondary text-center" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
                <Link href="/register" className="flex-1 btn-primary text-center" onClick={() => setIsOpen(false)}>
                  Register
                </Link>
              </div>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className="block text-gray-600 hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  className="w-full text-left text-red-600"
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
