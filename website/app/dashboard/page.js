'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Button from '@/components/common/Button';
import { useAuthContext } from '@/hooks/AuthContext';
import { announcementAPI } from '@/lib/api';
import { formatDate } from '@/lib/format';

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
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Welcome{user?.firstName ? `, ${user.firstName}` : ''}!
        </h1>
        <p className="text-gray-600">Here&apos;s your spiritual hub.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="card">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm">Sermons Watched</p>
              <p className="text-3xl font-bold text-primary">12</p>
            </div>
            <div className="text-4xl">📺</div>
          </div>
        </div>

        <div className="card">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm">Events Attended</p>
              <p className="text-3xl font-bold text-primary">5</p>
            </div>
            <div className="text-4xl">📅</div>
          </div>
        </div>

        <div className="card">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm">Prayer Requests</p>
              <p className="text-3xl font-bold text-primary">3</p>
            </div>
            <div className="text-4xl">🙏</div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Announcements</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {announcements.map((a) => (
            <div key={a.id} className="card">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-gray-900">{a.title}</h3>
                {a.urgent && <span className="badge bg-red-100 text-red-700 shrink-0">Urgent</span>}
              </div>
              <p className="text-gray-600 text-sm mt-2">{a.body}</p>
              <p className="text-gray-400 text-xs mt-3">{formatDate(a.date)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-2xl font-bold mb-3">Latest Sermons</h3>
          <p className="text-gray-600 mb-4">Watch our most recent teachings</p>
          <Link href="/sermons">
            <Button variant="primary">Browse Sermons</Button>
          </Link>
        </div>

        <div className="card">
          <h3 className="text-2xl font-bold mb-3">Upcoming Events</h3>
          <p className="text-gray-600 mb-4">Check out what&apos;s coming up</p>
          <Link href="/events">
            <Button variant="primary">View Events</Button>
          </Link>
        </div>

        <div className="card">
          <h3 className="text-2xl font-bold mb-3">Prayer Requests</h3>
          <p className="text-gray-600 mb-4">Share your prayer needs</p>
          <Link href="/prayers">
            <Button variant="primary">Submit Prayer</Button>
          </Link>
        </div>

        <div className="card">
          <h3 className="text-2xl font-bold mb-3">Your Profile</h3>
          <p className="text-gray-600 mb-4">Manage your account settings</p>
          <Link href="/profile">
            <Button variant="primary">Edit Profile</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
