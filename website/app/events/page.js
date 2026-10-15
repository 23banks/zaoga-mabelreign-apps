import Link from 'next/link';
import { Clock, MapPin, Users } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import { getJSON } from '@/lib/serverApi';

export default async function EventsPage() {
  const events = (await getJSON('/events')) || [];
  const sorted = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <>
      <PageHeader
        eyebrow="Events Calendar"
        title="Upcoming Services & Activities"
        description="Conferences, services, and district activities — never miss what's happening next."
      />

      <div className="container py-12">
        <div className="space-y-5 max-w-3xl mx-auto">
          {sorted.map((e) => {
            const d = new Date(e.date);
            return (
              <Link key={e.id} href={`/events/${e.id}`} className="card flex items-start gap-5">
                <div className="shrink-0 w-[4.5rem] rounded-xl bg-gradient-to-b from-primary to-ink text-white text-center overflow-hidden shadow-md">
                  <div className="bg-accent text-ink text-[11px] font-bold uppercase tracking-wider py-1">
                    {d.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' })}
                  </div>
                  <div className="font-display text-3xl font-bold py-2">
                    {d.toLocaleDateString('en-US', { day: 'numeric', timeZone: 'UTC' })}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h3 className="font-bold text-xl text-ink">{e.title}</h3>
                    <span className="badge bg-primary/10 text-primary shrink-0">{e.category}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{e.description}</p>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5"><Clock size={14} className="text-accent" /> {e.time}</span>
                    <span className="flex items-center gap-1.5"><MapPin size={14} className="text-accent" /> {e.location}</span>
                    {e.attendeeCount > 0 && (
                      <span className="flex items-center gap-1.5"><Users size={14} className="text-accent" /> {e.attendeeCount} registered</span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {sorted.length === 0 && (
          <p className="text-center text-gray-500 mt-12">No events scheduled yet.</p>
        )}
      </div>
    </>
  );
}
