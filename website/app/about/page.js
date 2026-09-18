import SectionHeading from '@/components/common/SectionHeading';
import { Target, Eye, HeartHandshake } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <SectionHeading
        eyebrow="About Us"
        title="ZAOGA FIF Mabelreign Kingdom District"
        description="Extending the ministry of ZAOGA Forward in Faith beyond the church walls and into the daily lives of our members."
      />

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="card">
          <Target className="text-primary mb-4" size={40} />
          <h3 className="text-xl font-bold mb-2">Our Mission</h3>
          <p className="text-gray-600">
            To improve communication between leadership and members, and to strengthen member
            engagement and discipleship across the district.
          </p>
        </div>
        <div className="card">
          <Eye className="text-primary mb-4" size={40} />
          <h3 className="text-xl font-bold mb-2">Our Vision</h3>
          <p className="text-gray-600">
            A district equipped to minister effectively in a digital world, reaching every
            member with the Gospel and spiritual resources.
          </p>
        </div>
        <div className="card">
          <HeartHandshake className="text-primary mb-4" size={40} />
          <h3 className="text-xl font-bold mb-2">Our Community</h3>
          <p className="text-gray-600">
            A centralized platform for district information, prayer, testimonies, and cell group
            life — connecting members throughout the week.
          </p>
        </div>
      </div>

      <div className="card max-w-3xl mx-auto">
        <h3 className="text-2xl font-bold mb-4">Why This App Exists</h3>
        <p className="text-gray-600 mb-4">
          As technology continues to shape how people communicate and access information,
          churches are increasingly adopting digital platforms to reach members effectively and
          extend their ministry beyond physical gatherings.
        </p>
        <p className="text-gray-600">
          This application gives every member of ZAOGA FIF Mabelreign Kingdom District instant
          access to church information, sermons, events, announcements, and spiritual resources —
          directly from their smartphone.
        </p>
      </div>
    </div>
  );
}
