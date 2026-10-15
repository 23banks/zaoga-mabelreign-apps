'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Play, Headphones } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import Thumb from '@/components/common/Thumb';
import { sermonAPI } from '@/lib/api';
import { formatDate } from '@/lib/format';

export default function SermonsPage() {
  const [sermons, setSermons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState('All');

  useEffect(() => {
    sermonAPI
      .getAll()
      .then((res) => setSermons(res.data))
      .catch(() => setSermons([]))
      .finally(() => setIsLoading(false));
  }, []);

  const categories = useMemo(() => ['All', ...new Set(sermons.map((s) => s.category))], [sermons]);

  const filtered = useMemo(
    () => (category === 'All' ? sermons : sermons.filter((s) => s.category === category)),
    [sermons, category]
  );

  return (
    <>
      <PageHeader
        eyebrow="Sermons & Teachings"
        title="Grow Through the Word"
        description="Video sermons, audio messages, sermon notes, and archived teachings — all in one place."
      />

      <div className="container py-12">
        {!isLoading && sermons.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  category === c
                    ? 'bg-primary text-white shadow-md shadow-primary/25'
                    : 'bg-white text-gray-600 hover:text-primary border border-gray-200 hover:border-primary'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {isLoading ? (
          <p className="text-center text-gray-500">Loading sermons...</p>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((s) => (
                <Link key={s.id} href={`/sermons/${s.id}`} className="card block p-4">
                  <div className="relative mb-4">
                    <Thumb type={s.type} className="h-40" />
                    <span className="absolute top-3 right-3 badge bg-white/90 text-primary gap-1 shadow">
                      {s.type === 'video' ? <Play size={12} /> : <Headphones size={12} />}
                      {s.type}
                    </span>
                  </div>
                  <div className="px-2 pb-2">
                    <h3 className="font-bold text-lg text-ink mb-1">{s.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {s.speaker} &middot; {s.duration}
                    </p>
                    <p className="text-gray-600 text-sm line-clamp-2">{s.description}</p>
                    <p className="text-gray-400 text-xs mt-3">
                      {formatDate(s.date)} &middot; {s.category}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="text-center text-gray-500 mt-12">No sermons found in this category yet.</p>
            )}
          </>
        )}
      </div>
    </>
  );
}
