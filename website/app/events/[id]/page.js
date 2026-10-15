import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CalendarDays, MapPin, Clock } from 'lucide-react';
import { getJSON } from '@/lib/serverApi';
import { formatDate } from '@/lib/format';
import EventRegisterButton from '@/components/events/EventRegisterButton';

export default async function EventDetailPage({ params }) {
  const { id } = await params;
  const event = await getJSON(`/events/${id}`);

  if (!event) {
    notFound();
  }

  return (
    <div className="container py-12 max-w-3xl">
      <Link href="/events" className="inline-flex items-center gap-2 font-semibold text-primary hover:text-accent transition-colors mb-6">
        <ArrowLeft size={18} />
        Back to Events
      </Link>

      <article className="card p-0 overflow-hidden">
        <div className="relative bg-gradient-to-br from-ink via-primary to-secondary text-white p-8 md:p-10">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-40"
            style={{ backgroundImage: 'radial-gradient(circle at 85% 20%, rgba(201,151,43,0.45), transparent 45%)' }}
          />
          <div className="relative">
            <span className="badge bg-accent text-ink mb-4">{event.category}</span>
            <h1 className="text-3xl md:text-4xl font-bold">{event.title}</h1>
          </div>
        </div>

        <div className="p-8 md:p-10">
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {[
              { Icon: CalendarDays, label: 'Date', value: formatDate(event.date) },
              { Icon: Clock, label: 'Time', value: event.time },
              { Icon: MapPin, label: 'Location', value: event.location },
            ].map(({ Icon, label, value }) => (
              <div key={label} className="rounded-xl bg-gray-50 border border-gray-200 p-4">
                <Icon size={20} className="text-accent mb-2" />
                <p className="text-xs uppercase tracking-wider text-gray-500">{label}</p>
                <p className="font-semibold text-ink">{value}</p>
              </div>
            ))}
          </div>

          <p className="text-gray-700 leading-relaxed text-lg mb-8">{event.description}</p>

          <EventRegisterButton
            eventId={event.id}
            eventTitle={event.title}
            initialAttendeeCount={event.attendeeCount}
          />
        </div>
      </article>
    </div>
  );
}
