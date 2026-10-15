'use client';

import { useState, useMemo, useEffect } from 'react';
import PageHeader from '@/components/common/PageHeader';
import Thumb from '@/components/common/Thumb';
import { mediaAPI } from '@/lib/api';

const types = ['All', 'photo', 'video'];

export default function GalleryPage() {
  const [media, setMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [type, setType] = useState('All');

  useEffect(() => {
    mediaAPI
      .getAll()
      .then((res) => setMedia(res.data))
      .catch(() => setMedia([]))
      .finally(() => setIsLoading(false));
  }, []);

  const filtered = useMemo(
    () => (type === 'All' ? media : media.filter((m) => m.type === type)),
    [media, type]
  );

  return (
    <>
      <PageHeader
        eyebrow="Media Gallery"
        title="Photo & Video Highlights"
        description="Relive the highlights from our church events and activities."
      />

      <div className="container py-12">
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize transition-all ${
                type === t
                  ? 'bg-primary text-white shadow-md shadow-primary/25'
                  : 'bg-white text-gray-600 hover:text-primary border border-gray-200 hover:border-primary'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {isLoading ? (
          <p className="text-center text-gray-500">Loading gallery...</p>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((m) => (
                <div key={m.id} className="card p-3 overflow-hidden">
                  {m.url ? (
                    m.type === 'video' ? (
                      <video src={m.url} controls className="w-full h-52 object-cover rounded-xl mb-3 bg-black" />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={m.url} alt={m.title} className="w-full h-52 object-cover rounded-xl mb-3" />
                    )
                  ) : (
                    <Thumb type={m.type} className="h-52 mb-3" iconSize={44} />
                  )}
                  <div className="px-2 pb-2 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-ink leading-snug">{m.title}</h3>
                      <p className="text-sm text-gray-500 mt-0.5">{m.event}</p>
                    </div>
                    <span className="badge bg-primary/10 text-primary capitalize shrink-0">{m.type}</span>
                  </div>
                </div>
              ))}
            </div>
            {filtered.length === 0 && (
              <p className="text-center text-gray-500 mt-12">No media in this category yet.</p>
            )}
          </>
        )}
      </div>
    </>
  );
}
