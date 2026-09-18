import Link from 'next/link';
import { CalendarDays, MapPin } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';
import { events } from '@/lib/mockData';

export default function EventsPage() {
  const sorted = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="container mx-auto px-4 py-16">
      <SectionHeading
        eyebrow="Events Calendar"
        title="Upcoming Services & Activities"
        description="Conferences, services, and district activities — never miss what's happening next."
      />

      <div className="space-y-4 max-w-3xl mx-auto">
        {sorted.map((e) => (
          <Link key={e.id} href={`/events/${e.id}`} className="card flex items-start gap-4 block">
            <div className="shrink-0 w-16 h-16 rounded-lg bg-primary/10 flex flex-col items-center justify-center text-primary">
              <CalendarDays size={22} />
              <span className="text-xs font-semibold mt-1">
                {new Date(e.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2 mb-1">
                <h3 className="font-bold text-lg text-gray-900">{e.title}</h3>
                <span className="badge bg-primary/10 text-primary shrink-0">{e.category}</span>
              </div>
              <p className="text-gray-600 text-sm mb-2">{e.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>{e.date} at {e.time}</span>
                <span className="flex items-center gap-1">
                  <MapPin size={14} /> {e.location}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
