import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen, Calendar, HeartHandshake, Bell } from 'lucide-react';
import Button from '@/components/common/Button';
import SectionHeading from '@/components/common/SectionHeading';
import { getJSON } from '@/lib/serverApi';
import { formatDate, sermonEmoji } from '@/lib/format';

export default async function Home() {
  const [announcements, sermons, events] = await Promise.all([
    getJSON('/announcements'),
    getJSON('/sermons'),
    getJSON('/events'),
  ]);

  const latestAnnouncements = (announcements || []).slice(0, 2);
  const featuredSermons = (sermons || []).slice(0, 3);
  const upcomingEvents = (events || []).slice(0, 3);

  return (
    <div>
      <section className="relative py-28 text-white overflow-hidden">
        <Image
          src="/images/hero-worship.jpg"
          alt="Members of ZAOGA FIF worshipping together"
          fill
          priority
          className="object-cover object-center -z-10"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/85 -z-10" />
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to ZAOGA FIF</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-2xl mx-auto">
            Mabelreign Kingdom District — connecting hearts, growing faith
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Join Us Today
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-white/10 text-white hover:bg-white/20 border border-white/40"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {latestAnnouncements.length > 0 && (
        <section className="py-10 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-4">
              <Bell size={20} className="text-primary" />
              <h2 className="text-lg font-semibold text-gray-900">Latest Announcements</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {latestAnnouncements.map((a) => (
                <div key={a.id} className="card">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-gray-900">{a.title}</h3>
                    {a.urgent && <span className="badge bg-red-100 text-red-700 shrink-0">Urgent</span>}
                  </div>
                  <p className="text-gray-600 text-sm mt-2">{a.body}</p>
                  <p className="text-gray-400 text-xs mt-3">{formatDate(a.date)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="What We Offer"
            title="A Digital Home for Our District"
            description="Everything you need to stay connected, grow spiritually, and take part in district life."
          />
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <BookOpen className="text-primary" size={48} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Sermons & Teachings</h3>
              <p className="text-gray-600">
                Access our library of inspiring sermons, biblical teachings, and spiritual resources anytime.
              </p>
            </div>
            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <Calendar className="text-primary" size={48} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Events & Activities</h3>
              <p className="text-gray-600">
                Stay updated with upcoming services, conferences, meetings, and special events.
              </p>
            </div>
            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <HeartHandshake className="text-primary" size={48} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Prayer & Community</h3>
              <p className="text-gray-600">
                Submit prayer requests, share testimonies, and grow together in faith.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/community.jpg"
                alt="Members of ZAOGA FIF Mabelreign Kingdom District fellowshipping together"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-wide mb-2">Our Community</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                A District United in Faith
              </h2>
              <p className="text-gray-600 mb-4">
                From Sunday services to cell group meetings, ZAOGA FIF Mabelreign Kingdom District is a
                family that prays, celebrates, and grows together — now connected digitally too.
              </p>
              <Link href="/about" className="text-primary font-medium hover:text-primary/80">
                Learn more about us &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Sermons</h2>
            <Link href="/sermons" className="text-primary font-medium hover:text-primary/80">
              View all &rarr;
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredSermons.map((s) => (
              <Link key={s.id} href={`/sermons/${s.id}`} className="card block">
                <div className="text-4xl mb-3">{sermonEmoji(s.type)}</div>
                <h3 className="font-bold text-lg text-gray-900 mb-1">{s.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{s.speaker} &middot; {s.duration}</p>
                <p className="text-gray-600 text-sm">{s.description}</p>
              </Link>
            ))}
          </div>
          {featuredSermons.length === 0 && (
            <p className="text-center text-gray-500">No sermons published yet.</p>
          )}
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Upcoming Events</h2>
            <Link href="/events" className="text-primary font-medium hover:text-primary/80">
              View all &rarr;
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((e) => (
              <Link key={e.id} href={`/events/${e.id}`} className="card block">
                <span className="badge bg-primary/10 text-primary mb-3">{e.category}</span>
                <h3 className="font-bold text-lg text-gray-900 mb-1">{e.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{formatDate(e.date)} at {e.time}</p>
                <p className="text-gray-600 text-sm">{e.location}</p>
              </Link>
            ))}
          </div>
          {upcomingEvents.length === 0 && (
            <p className="text-center text-gray-500">No upcoming events yet.</p>
          )}
        </div>
      </section>

      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Connect?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of members in our digital spiritual community
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary">
              Get Started
              <ArrowRight className="inline ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
