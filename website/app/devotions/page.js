import SectionHeading from '@/components/common/SectionHeading';
import { getJSON } from '@/lib/serverApi';
import { formatDate } from '@/lib/format';

export default async function DevotionsPage() {
  const devotions = (await getJSON('/devotions')) || [];
  const [today, ...previous] = devotions;

  return (
    <div className="container mx-auto px-4 py-16">
      <SectionHeading
        eyebrow="Daily Devotions"
        title="Scripture & Reflection"
        description="Regular inspirational content to promote spiritual development."
      />

      {today && (
        <div className="max-w-2xl mx-auto mb-12">
          <div className="card bg-gradient-to-br from-primary to-secondary text-white">
            <p className="text-sm uppercase tracking-wide text-white/80 mb-2">
              {formatDate(today.date)}
            </p>
            <h2 className="text-2xl font-bold mb-4">{today.title}</h2>
            <p className="italic mb-4 text-white/90">{today.verse}</p>
            <p className="text-white/90 leading-relaxed">{today.reflection}</p>
          </div>
        </div>
      )}

      {previous.length > 0 && (
        <div className="max-w-2xl mx-auto space-y-4">
          <h3 className="text-lg font-bold text-gray-900">Previous Devotions</h3>
          {previous.map((d) => (
            <div key={d.id} className="card">
              <p className="text-sm text-gray-400 mb-2">{formatDate(d.date)}</p>
              <h4 className="font-bold text-gray-900 mb-2">{d.title}</h4>
              <p className="italic text-gray-600 mb-3">{d.verse}</p>
              <p className="text-gray-700 leading-relaxed">{d.reflection}</p>
            </div>
          ))}
        </div>
      )}

      {devotions.length === 0 && (
        <p className="text-center text-gray-500">No devotions published yet.</p>
      )}
    </div>
  );
}
