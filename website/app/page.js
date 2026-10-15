import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen, Calendar, HeartHandshake, Bell, Clock, MapPin } from 'lucide-react';
import Button from '@/components/common/Button';
import SectionHeading from '@/components/common/SectionHeading';
import Thumb from '@/components/common/Thumb';
import { getJSON } from '@/lib/serverApi';
import { formatDate } from '@/lib/format';

const offerings = [
  {
    Icon: BookOpen,
    title: 'Sermons & Teachings',
    text: 'Access our library of inspiring sermons, biblical teachings, and spiritual resources anytime.',
    href: '/sermons',
  },
  {
    Icon: Calendar,
    title: 'Events & Activities',
    text: 'Stay updated with upcoming services, conferences, meetings, and special events.',
    href: '/events',
  },
  {
    Icon: HeartHandshake,
    title: 'Prayer & Community',
    text: 'Submit prayer requests, share testimonies, and grow together in faith.',
    href: '/prayers',
  },
];

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
      {/* ---------------------------------------------------------- hero */}
      <section className="relative overflow-hidden text-white">
        <Image
          src="/images/hero-worship.jpg"
          alt="Members of ZAOGA FIF worshipping together"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center -z-10"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-ink/95 via-primary/85 to-secondary/70 -z-10" />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(201,151,43,0.28), transparent 45%)' }}
        />
        <div className="container py-24 md:py-36 text-center animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full border border-accent/50 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent backdrop-blur mb-6">
            Welcome home
          </p>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] mb-6">
            Welcome to <span className="text-accent">ZAOGA FIF</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-white/85 max-w-2xl mx-auto">
            Mabelreign Kingdom District — connecting hearts, growing faith
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register">
              <Button size="lg" variant="accent" className="w-full sm:w-auto">
                Join Us Today
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-white/10 text-white border border-white/40 backdrop-blur hover:bg-white/20"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ scripture band */}
      <section className="bg-accent-light border-y border-accent/20">
        <div className="container py-6 text-center">
          <p className="font-display text-lg md:text-xl italic text-ink">
            &ldquo;How good and pleasant it is when God&rsquo;s people live together in unity!&rdquo;
            <span className="not-italic text-sm font-sans font-semibold text-accent ml-3">Psalm 133:1</span>
          </p>
        </div>
      </section>

      {/* ------------------------------------------------ announcements */}
      {latestAnnouncements.length > 0 && (
        <section className="py-14 bg-white">
          <div className="container">
            <div className="flex items-center gap-2.5 mb-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-light text-accent">
                <Bell size={18} />
              </span>
              <h2 className="text-2xl font-bold text-ink">Latest Announcements</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {latestAnnouncements.map((a) => (
                <div key={a.id} className="card border-l-4 border-l-accent">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-lg text-ink">{a.title}</h3>
                    {a.urgent && <span className="badge bg-red-100 text-red-700 shrink-0">Urgent</span>}
                  </div>
                  <p className="text-gray-600 text-sm mt-2 leading-relaxed">{a.body}</p>
                  <p className="text-gray-400 text-xs mt-3">{formatDate(a.date)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------- what we offer */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <SectionHeading
            eyebrow="What We Offer"
            title="A Digital Home for Our District"
            description="Everything you need to stay connected, grow spiritually, and take part in district life."
          />
          <div className="grid md:grid-cols-3 gap-8">
            {offerings.map(({ Icon, title, text, href }) => (
              <Link key={title} href={href} className="card text-center group">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/25 transition-transform duration-200 group-hover:scale-110">
                  <Icon size={30} strokeWidth={1.7} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-ink">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- community */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -inset-3 rounded-3xl bg-accent/20 -rotate-2" aria-hidden="true" />
              <div className="relative h-72 md:h-[26rem] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/community.jpg"
                  alt="Members of ZAOGA FIF Mabelreign Kingdom District fellowshipping together"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <p className="text-accent font-semibold text-xs uppercase tracking-[0.22em] mb-3">Our Community</p>
              <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">A District United in Faith</h2>
              <div className="h-0.5 w-14 rounded bg-accent mb-5" />
              <p className="text-gray-600 mb-6 leading-relaxed">
                From Sunday services to cell group meetings, ZAOGA FIF Mabelreign Kingdom District is a
                family that prays, celebrates, and grows together — now connected digitally too.
              </p>
              <Link href="/about" className="inline-flex items-center gap-2 font-semibold text-primary hover:text-accent transition-colors">
                Learn more about us <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- sermons */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-accent font-semibold text-xs uppercase tracking-[0.22em] mb-2">Latest teachings</p>
              <h2 className="text-3xl md:text-4xl font-bold text-ink">Featured Sermons</h2>
            </div>
            <Link href="/sermons" className="hidden sm:inline-flex items-center gap-1.5 font-semibold text-primary hover:text-accent transition-colors">
              View all <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredSermons.map((s) => (
              <Link key={s.id} href={`/sermons/${s.id}`} className="card block p-4">
                <Thumb type={s.type} className="h-40 mb-4" />
                <div className="px-2 pb-2">
                  <h3 className="font-bold text-lg text-ink mb-1">{s.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{s.speaker} &middot; {s.duration}</p>
                  <p className="text-gray-600 text-sm line-clamp-2">{s.description}</p>
                </div>
              </Link>
            ))}
          </div>
          {featuredSermons.length === 0 && (
            <p className="text-center text-gray-500">No sermons published yet.</p>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------ events */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-accent font-semibold text-xs uppercase tracking-[0.22em] mb-2">Mark your calendar</p>
              <h2 className="text-3xl md:text-4xl font-bold text-ink">Upcoming Events</h2>
            </div>
            <Link href="/events" className="hidden sm:inline-flex items-center gap-1.5 font-semibold text-primary hover:text-accent transition-colors">
              View all <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((e) => {
              const d = new Date(e.date);
              return (
                <Link key={e.id} href={`/events/${e.id}`} className="card block">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-16 rounded-xl bg-gradient-to-b from-primary to-ink text-white text-center overflow-hidden shadow-md">
                      <div className="bg-accent text-ink text-[10px] font-bold uppercase tracking-wider py-0.5">
                        {d.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' })}
                      </div>
                      <div className="font-display text-2xl font-bold py-1.5">
                        {d.toLocaleDateString('en-US', { day: 'numeric', timeZone: 'UTC' })}
                      </div>
                    </div>
                    <div className="min-w-0">
                      <span className="badge bg-primary/10 text-primary mb-2">{e.category}</span>
                      <h3 className="font-bold text-lg text-ink leading-snug">{e.title}</h3>
                    </div>
                  </div>
                  <div className="mt-4 space-y-1.5 text-sm text-gray-500">
                    <p className="flex items-center gap-2"><Clock size={14} className="text-accent" /> {e.time}</p>
                    <p className="flex items-center gap-2"><MapPin size={14} className="text-accent" /> {e.location}</p>
                  </div>
                </Link>
              );
            })}
          </div>
          {upcomingEvents.length === 0 && (
            <p className="text-center text-gray-500">No upcoming events yet.</p>
          )}
        </div>
      </section>

      {/* ---------------------------------------------------------- cta */}
      <section className="relative overflow-hidden bg-gradient-to-br from-ink via-primary to-secondary text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-50"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(201,151,43,0.4), transparent 40%)' }}
        />
        <div className="container relative py-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Connect?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/80">
            Join our digital spiritual community and stay close to everything happening in the district.
          </p>
          <Link href="/register">
            <Button size="lg" variant="accent">
              Get Started
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
