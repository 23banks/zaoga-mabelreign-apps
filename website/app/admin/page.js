'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { sermonAPI, eventAPI, prayerAPI, testimonyAPI, userAPI } from '@/lib/api';

const cards = [
  { key: 'sermons', label: 'Sermons', href: '/admin/sermons' },
  { key: 'events', label: 'Events', href: '/admin/events' },
  { key: 'prayers', label: 'Prayer Requests', href: '/admin/prayers' },
  { key: 'testimonies', label: 'Testimonies', href: '/admin/testimonies' },
  { key: 'users', label: 'Users', href: '/admin/users' },
];

export default function AdminOverviewPage() {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    Promise.all([
      sermonAPI.getAll(),
      eventAPI.getAll(),
      prayerAPI.getAll(),
      testimonyAPI.getAll(),
      userAPI.getAll(),
    ])
      .then(([sermons, events, prayers, testimonies, users]) => {
        setCounts({
          sermons: sermons.data.length,
          events: events.data.length,
          prayers: prayers.data.length,
          testimonies: testimonies.data.length,
          users: users.data.length,
        });
      })
      .catch(() => {});
  }, []);

  return (
    <div>
      <p className="text-gray-600 mb-6">Manage the district&apos;s content and members.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => (
          <Link key={c.key} href={c.href} className="card block">
            <p className="text-gray-600 text-sm">{c.label}</p>
            <p className="text-3xl font-bold text-primary">{counts[c.key] ?? '—'}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
