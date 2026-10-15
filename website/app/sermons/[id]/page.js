import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Play, Headphones, User, CalendarDays } from 'lucide-react';
import { getJSON } from '@/lib/serverApi';
import { formatDate } from '@/lib/format';
import Thumb from '@/components/common/Thumb';

export default async function SermonDetailPage({ params }) {
  const { id } = await params;
  const sermon = await getJSON(`/sermons/${id}`);

  if (!sermon) {
    notFound();
  }

  const allSermons = (await getJSON('/sermons')) || [];
  const related = allSermons.filter((s) => s.id !== sermon.id && s.category === sermon.category).slice(0, 2);

  return (
    <div className="container py-12 max-w-3xl">
      <Link href="/sermons" className="inline-flex items-center gap-2 font-semibold text-primary hover:text-accent transition-colors mb-6">
        <ArrowLeft size={18} />
        Back to Sermons
      </Link>

      <article className="card p-0 overflow-hidden">
        <Thumb type={sermon.type} className="h-64 rounded-none" iconSize={64} />
        <div className="p-8">
          <span className="badge bg-primary/10 text-primary gap-1 mb-4">
            {sermon.type === 'video' ? <Play size={12} /> : <Headphones size={12} />}
            {sermon.type} &middot; {sermon.duration}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-ink mb-4">{sermon.title}</h1>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-200">
            <span className="flex items-center gap-2"><User size={15} className="text-accent" /> {sermon.speaker}</span>
            <span className="flex items-center gap-2"><CalendarDays size={15} className="text-accent" /> {formatDate(sermon.date)}</span>
            <span className="badge bg-accent-light text-ink">{sermon.category}</span>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">{sermon.description}</p>
        </div>
      </article>

      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-ink mb-4">More in {sermon.category}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {related.map((s) => (
              <Link key={s.id} href={`/sermons/${s.id}`} className="card block">
                <h3 className="font-bold text-ink">{s.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{s.speaker}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
