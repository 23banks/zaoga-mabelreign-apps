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
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <Link href="/events" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
        <ArrowLeft size={20} className="mr-2" />
        Back to Events
      </Link>

      <div className="card">
        <span className="badge bg-primary/10 text-primary mb-3">{event.category}</span>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h1>

        <div className="space-y-2 text-gray-600 mb-6">
          <p className="flex items-center gap-2">
            <CalendarDays size={18} className="text-primary" /> {formatDate(event.date)}
          </p>
          <p className="flex items-center gap-2">
            <Clock size={18} className="text-primary" /> {event.time}
          </p>
          <p className="flex items-center gap-2">
            <MapPin size={18} className="text-primary" /> {event.location}
          </p>
        </div>

        <p className="text-gray-700 leading-relaxed mb-6">{event.description}</p>

        <EventRegisterButton eventTitle={event.title} />
      </div>
    </div>
  );
}
