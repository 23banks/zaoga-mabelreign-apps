'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { Heart } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';
import Input from '@/components/common/Input';
import Textarea from '@/components/common/Textarea';
import Button from '@/components/common/Button';
import { testimonies as initialTestimonies } from '@/lib/mockData';

export default function TestimoniesPage() {
  const [testimonies, setTestimonies] = useState(initialTestimonies);
  const [likedIds, setLikedIds] = useState([]);
  const [form, setForm] = useState({ name: '', title: '', story: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.story.trim()) {
      toast.error('Please fill in a title and your testimony');
      return;
    }

    setIsSubmitting(true);
    // TODO: replace with testimonyAPI.create(form) once the backend is connected
    await new Promise((r) => setTimeout(r, 400));

    setTestimonies((prev) => [
      {
        id: Date.now(),
        name: form.name || 'Anonymous Member',
        title: form.title,
        story: form.story,
        date: new Date().toISOString().slice(0, 10),
        likes: 0,
      },
      ...prev,
    ]);
    setForm({ name: '', title: '', story: '' });
    setIsSubmitting(false);
    toast.success('Thank you for sharing your testimony!');
  };

  const handleLike = (id) => {
    if (likedIds.includes(id)) return;
    setLikedIds((prev) => [...prev, id]);
    setTestimonies((prev) => prev.map((t) => (t.id === id ? { ...t, likes: t.likes + 1 } : t)));
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <SectionHeading
        eyebrow="Testimonies"
        title="Stories of God's Faithfulness"
        description="Members share testimonies for encouragement and spiritual growth."
      />

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <form onSubmit={handleSubmit} className="card">
            <h3 className="text-lg font-bold mb-4">Share Your Testimony</h3>
            <Input
              label="Your Name (optional)"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Leave blank to stay anonymous"
            />
            <Input
              label="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. God's Faithfulness in My Storm"
              required
            />
            <Textarea
              label="Your Story"
              name="story"
              value={form.story}
              onChange={handleChange}
              placeholder="Tell us what God has done..."
              required
            />
            <Button type="submit" variant="primary" isLoading={isSubmitting} className="w-full">
              Share Testimony
            </Button>
          </form>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {testimonies.map((t) => (
            <div key={t.id} className="card">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-900">{t.title}</h3>
                <p className="text-xs text-gray-400">{t.date}</p>
              </div>
              <p className="text-gray-700 mb-4">{t.story}</p>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">— {t.name}</p>
                <button
                  onClick={() => handleLike(t.id)}
                  disabled={likedIds.includes(t.id)}
                  className={`inline-flex items-center gap-1 text-sm font-medium ${
                    likedIds.includes(t.id) ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
                  }`}
                >
                  <Heart size={16} fill={likedIds.includes(t.id) ? 'currentColor' : 'none'} />
                  {t.likes}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
