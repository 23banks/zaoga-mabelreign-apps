'use client';

import { useState, useMemo } from 'react';
import SectionHeading from '@/components/common/SectionHeading';
import { mediaGallery } from '@/lib/mockData';

const types = ['All', 'photo', 'video'];

export default function GalleryPage() {
  const [type, setType] = useState('All');

  const filtered = useMemo(
    () => (type === 'All' ? mediaGallery : mediaGallery.filter((m) => m.type === type)),
    [type]
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

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((m) => (
          <div key={m.id} className="card text-center">
            <div className="text-6xl mb-4">{m.emoji}</div>
            <h3 className="font-semibold text-gray-900">{m.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{m.event}</p>
            <span className="badge bg-primary/10 text-primary mt-3 capitalize">{m.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
