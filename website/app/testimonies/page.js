'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Heart } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import Input from '@/components/common/Input';
import Textarea from '@/components/common/Textarea';
import Button from '@/components/common/Button';
import { testimonyAPI } from '@/lib/api';
import { formatDate } from '@/lib/format';

export default function TestimoniesPage() {
  const [testimonies, setTestimonies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [likedIds, setLikedIds] = useState([]);
  const [form, setForm] = useState({ name: '', title: '', story: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    testimonyAPI
      .getAll()
      .then((res) => setTestimonies(res.data))
      .catch(() => toast.error('Failed to load testimonies'))
      .finally(() => setIsLoading(false));
  }, []);

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
    try {
      const res = await testimonyAPI.create(form);
      setTestimonies((prev) => [res.data, ...prev]);
      setForm({ name: '', title: '', story: '' });
      toast.success("Thank you for sharing your testimony!");
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to share testimony');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = async (id) => {
    if (likedIds.includes(id)) return;
    setLikedIds((prev) => [...prev, id]);
    try {
      const res = await testimonyAPI.like(id);
      setTestimonies((prev) => prev.map((t) => (t.id === id ? res.data : t)));
    } catch {
      setLikedIds((prev) => prev.filter((i) => i !== id));
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Testimonies"
        title="Stories of God's Faithfulness"
        description="Members share testimonies for encouragement and spiritual growth."
      />

      <div className="container py-12">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <form onSubmit={handleSubmit} className="card lg:sticky lg:top-24">
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
          {isLoading && <p className="text-gray-500">Loading testimonies...</p>}
          {!isLoading &&
            testimonies.map((t) => (
              <div key={t.id} className="card border-l-4 border-l-accent">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <h3 className="font-bold text-xl text-ink">{t.title}</h3>
                  <p className="text-xs text-gray-400 shrink-0">{formatDate(t.date)}</p>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed font-display italic">&ldquo;{t.story}&rdquo;</p>
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
          {!isLoading && testimonies.length === 0 && (
            <p className="text-gray-500">No testimonies yet. Be the first to share one.</p>
          )}
        </div>
      </div>
      </div>
    </>
  );
}
