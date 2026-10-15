'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { HeartHandshake } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import Textarea from '@/components/common/Textarea';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { prayerAPI } from '@/lib/api';
import { formatDate } from '@/lib/format';

export default function PrayersPage() {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState({ name: '', request: '', isAnonymous: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prayedIds, setPrayedIds] = useState([]);

  useEffect(() => {
    prayerAPI
      .getAll()
      .then((res) => setRequests(res.data))
      .catch(() => toast.error('Failed to load prayer requests'))
      .finally(() => setIsLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.request.trim()) {
      toast.error('Please enter your prayer request');
      return;
    }

    setIsSubmitting(true);
    try {
      const name = form.isAnonymous || !form.name ? '' : form.name;
      const res = await prayerAPI.create({ name, request: form.request });
      setRequests((prev) => [res.data, ...prev]);
      setForm({ name: '', request: '', isAnonymous: false });
      toast.success('Your prayer request has been submitted');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit prayer request');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePray = async (id) => {
    if (prayedIds.includes(id)) return;
    setPrayedIds((prev) => [...prev, id]);
    try {
      const res = await prayerAPI.pray(id);
      setRequests((prev) => prev.map((r) => (r.id === id ? res.data : r)));
    } catch {
      setPrayedIds((prev) => prev.filter((i) => i !== id));
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Prayer Requests"
        title="We're Praying With You"
        description="A secure platform to submit prayer requests to church leadership and stand with others in prayer."
      />

      <div className="container py-12">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <form onSubmit={handleSubmit} className="card lg:sticky lg:top-24">
            <h3 className="text-lg font-bold mb-4">Submit a Prayer Request</h3>
            <Input
              label="Your Name (optional)"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Leave blank to stay anonymous"
              disabled={form.isAnonymous}
            />
            <label className="flex items-center gap-2 mb-4 text-sm text-gray-600">
              <input type="checkbox" name="isAnonymous" checked={form.isAnonymous} onChange={handleChange} />
              Submit anonymously
            </label>
            <Textarea
              label="Your Request"
              name="request"
              value={form.request}
              onChange={handleChange}
              placeholder="Share what's on your heart..."
              required
            />
            <Button type="submit" variant="primary" isLoading={isSubmitting} className="w-full">
              Submit Request
            </Button>
          </form>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {isLoading && <p className="text-gray-500">Loading prayer requests...</p>}
          {!isLoading &&
            requests.map((r) => (
              <div key={r.id} className="card border-l-4 border-l-accent">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-bold text-ink">{r.name}</p>
                  <p className="text-xs text-gray-400">{formatDate(r.date)}</p>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">{r.request}</p>
                <button
                  onClick={() => handlePray(r.id)}
                  disabled={prayedIds.includes(r.id)}
                  className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                    prayedIds.includes(r.id)
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  <HeartHandshake size={16} />
                  {prayedIds.includes(r.id) ? "You're praying for this" : "I'm praying for this"}
                  <span className="opacity-70">&middot; {r.prayedFor}</span>
                </button>
              </div>
            ))}
          {!isLoading && requests.length === 0 && (
            <p className="text-gray-500">No prayer requests yet. Be the first to share one.</p>
          )}
        </div>
      </div>
      </div>
    </>
  );
}
