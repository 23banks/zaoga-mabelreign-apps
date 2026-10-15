import { Quote } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import { getJSON } from '@/lib/serverApi';
import { formatDate } from '@/lib/format';

export default async function DevotionsPage() {
  const devotions = (await getJSON('/devotions')) || [];
  const [today, ...previous] = devotions;

  return (
    <>
      <PageHeader
        eyebrow="Daily Devotions"
        title="Scripture & Reflection"
        description="Regular inspirational content to promote spiritual development."
      />

      <div className="container py-12">
        {today && (
          <div className="max-w-2xl mx-auto mb-14">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ink via-primary to-secondary text-white p-8 md:p-10 shadow-2xl shadow-primary/25">
              <Quote aria-hidden="true" size={120} className="absolute -top-2 -right-2 text-white/10" />
              <div className="relative">
                <p className="text-accent text-xs font-semibold uppercase tracking-[0.2em] mb-3">
                  Today &middot; {formatDate(today.date)}
                </p>
                <h2 className="text-3xl font-bold mb-5">{today.title}</h2>
                <p className="font-display italic text-xl text-white/95 mb-5 leading-relaxed">{today.verse}</p>
                <div className="h-px w-16 bg-accent mb-5" />
                <p className="text-white/85 leading-relaxed">{today.reflection}</p>
              </div>
            </div>
          </div>
        )}

        {previous.length > 0 && (
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold text-ink">Previous Devotions</h2>
            {previous.map((d) => (
              <div key={d.id} className="card border-l-4 border-l-accent">
                <p className="text-xs text-gray-400 mb-1">{formatDate(d.date)}</p>
                <h3 className="font-bold text-xl text-ink mb-2">{d.title}</h3>
                <p className="font-display italic text-gray-600 mb-3">{d.verse}</p>
                <p className="text-gray-700 leading-relaxed">{d.reflection}</p>
              </div>
            ))}
          </div>
        )}

        {devotions.length === 0 && (
          <p className="text-center text-gray-500">No devotions published yet.</p>
        )}
      </div>
    </>
  );
}
