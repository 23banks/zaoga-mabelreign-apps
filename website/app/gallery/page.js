'use client';

import { useState, useMemo, useEffect } from 'react';
import SectionHeading from '@/components/common/SectionHeading';
import { mediaAPI } from '@/lib/api';
import { mediaEmoji } from '@/lib/format';

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
    <div className="container mx-auto px-4 py-16">
      <SectionHeading
        eyebrow="Media Gallery"
        title="Photo & Video Highlights"
        description="Relive the highlights from our church events and activities."
      />

      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
              type === t ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
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
              <div key={m.id} className="card text-center overflow-hidden">
                {m.url ? (
                  m.type === 'video' ? (
                    <video src={m.url} controls className="w-full h-48 object-cover rounded-lg mb-4 bg-black" />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={m.url} alt={m.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                  )
                ) : (
                  <div className="text-6xl mb-4">{mediaEmoji(m.type)}</div>
                )}
                <h3 className="font-semibold text-gray-900">{m.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{m.event}</p>
                <span className="badge bg-primary/10 text-primary mt-3 capitalize">{m.type}</span>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-gray-500 mt-12">No media in this category yet.</p>
          )}
        </>
      )}
    </div>
  );
}
