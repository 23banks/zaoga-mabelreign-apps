import { Target, Eye, HeartHandshake } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';

const pillars = [
  {
    Icon: Target,
    title: 'Our Mission',
    text: 'To improve communication between leadership and members, and to strengthen member engagement and discipleship across the district.',
  },
  {
    Icon: Eye,
    title: 'Our Vision',
    text: 'A district equipped to minister effectively in a digital world, reaching every member with the Gospel and spiritual resources.',
  },
  {
    Icon: HeartHandshake,
    title: 'Our Community',
    text: 'A centralized platform for district information, prayer, testimonies, and cell group life — connecting members throughout the week.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="ZAOGA FIF Mabelreign Kingdom District"
        description="Extending the ministry of ZAOGA Forward in Faith beyond the church walls and into the daily lives of our members."
      />

      <div className="container py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pillars.map(({ Icon, title, text }) => (
            <div key={title} className="card text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/25">
                <Icon size={30} strokeWidth={1.7} />
              </div>
              <h3 className="text-xl font-bold text-ink mb-2">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <div className="card max-w-3xl mx-auto border-l-4 border-l-accent">
          <h2 className="text-2xl font-bold text-ink mb-4">Why This App Exists</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            As technology continues to shape how people communicate and access information, churches are
            increasingly adopting digital platforms to reach members effectively and extend their ministry
            beyond physical gatherings.
          </p>
          <p className="text-gray-600 leading-relaxed">
            This application gives every member of ZAOGA FIF Mabelreign Kingdom District instant access to
            church information, sermons, events, announcements, and spiritual resources — directly from
            their smartphone.
          </p>
        </div>
      </div>
    </>
  );
}
