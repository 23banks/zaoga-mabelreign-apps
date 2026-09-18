import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Play, Headphones } from 'lucide-react';
import { getJSON } from '@/lib/serverApi';
import { sermonEmoji, formatDate } from '@/lib/format';

export default async function SermonDetailPage({ params }) {
  const { id } = await params;
  const sermon = await getJSON(`/sermons/${id}`);

  if (!sermon) {
    notFound();
  }

  const allSermons = (await getJSON('/sermons')) || [];
  const related = allSermons.filter((s) => s.id !== sermon.id && s.category === sermon.category).slice(0, 2);

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <Link href="/sermons" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
        <ArrowLeft size={20} className="mr-2" />
        Back to Sermons
      </Link>

      <div className="card">
        <div className="flex items-center justify-center bg-gray-100 rounded-lg h-56 text-7xl mb-6">
          {sermonEmoji(sermon.type)}
        </div>
        <span className="badge bg-primary/10 text-primary flex items-center gap-1 w-fit mb-3">
          {sermon.type === 'video' ? <Play size={12} /> : <Headphones size={12} />}
          {sermon.type} &middot; {sermon.duration}
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{sermon.title}</h1>
        <p className="text-gray-500 mb-6">
          {sermon.speaker} &middot; {formatDate(sermon.date)} &middot; {sermon.category}
        </p>
        <p className="text-gray-700 leading-relaxed">{sermon.description}</p>
      </div>

      {related.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">More in {sermon.category}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {related.map((s) => (
              <Link key={s.id} href={`/sermons/${s.id}`} className="card block">
                <h3 className="font-semibold text-gray-900">{s.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{s.speaker}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
