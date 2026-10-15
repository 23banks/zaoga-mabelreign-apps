'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Tv, CalendarCheck, HandHeart, BookOpen, CalendarDays, UserCog, ArrowRight } from 'lucide-react';
import { useAuthContext } from '@/hooks/AuthContext';
import { announcementAPI } from '@/lib/api';
import { formatDate } from '@/lib/format';

const stats = [
  { label: 'Sermons Watched', value: 12, Icon: Tv },
  { label: 'Events Attended', value: 5, Icon: CalendarCheck },
  { label: 'Prayer Requests', value: 3, Icon: HandHeart },
];

const actions = [
  { title: 'Latest Sermons', text: 'Watch our most recent teachings', href: '/sermons', Icon: BookOpen },
  { title: 'Upcoming Events', text: "Check out what's coming up", href: '/events', Icon: CalendarDays },
  { title: 'Prayer Requests', text: 'Share your prayer needs', href: '/prayers', Icon: HandHeart },
  { title: 'Your Profile', text: 'Manage your account settings', href: '/profile', Icon: UserCog },
];

export default function DashboardPage() {
  const { user } = useAuthContext();
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    announcementAPI
      .getAll()
      .then((res) => setAnnouncements(res.data))
      .catch(() => setAnnouncements([]));
  }, []);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-ink via-primary to-secondary text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-40"
          style={{ backgroundImage: 'radial-gradient(circle at 85% 30%, rgba(201,151,43,0.45), transparent 45%)' }}
        />
        <div className="container relative py-12 animate-fade-up">
          <p className="text-accent text-xs font-semibold uppercase tracking-[0.22em] mb-2">Your dashboard</p>
          <h1 className="text-4xl md:text-5xl font-bold">
            Welcome{user?.firstName ? `, ${user.firstName}` : ''}!
          </h1>
          <p className="text-white/80 mt-2">Here&apos;s your spiritual hub.</p>
        </div>
      </section>

      <div className="container py-12">
        <div className="grid sm:grid-cols-3 gap-5 mb-12 -mt-16 relative">
          {stats.map(({ label, value, Icon }) => (
            <div key={label} className="card flex items-center justify-between shadow-lg">
              <div>
                <p className="text-gray-500 text-sm">{label}</p>
                <p className="font-display text-4xl font-bold text-primary">{value}</p>
              </div>
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-light text-accent">
                <Icon size={24} />
              </span>
            </div>
          ))}
        </div>

        <div className="mb-14">
          <h2 className="text-2xl font-bold text-ink mb-5">Announcements</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {announcements.map((a) => (
              <div key={a.id} className="card border-l-4 border-l-accent">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-lg text-ink">{a.title}</h3>
                  {a.urgent && <span className="badge bg-red-100 text-red-700 shrink-0">Urgent</span>}
                </div>
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">{a.body}</p>
                <p className="text-gray-400 text-xs mt-3">{formatDate(a.date)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {actions.map(({ title, text, href, Icon }) => (
            <Link key={title} href={href} className="card group flex items-center gap-5">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-md shadow-primary/25">
                <Icon size={26} strokeWidth={1.7} />
              </span>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-ink">{title}</h3>
                <p className="text-gray-600 text-sm">{text}</p>
              </div>
              <ArrowRight size={20} className="text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
