'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { HeartHandshake } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';
import Textarea from '@/components/common/Textarea';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { prayerRequests as initialRequests } from '@/lib/mockData';

export default function PrayersPage() {
  const [requests, setRequests] = useState(initialRequests);
  const [form, setForm] = useState({ name: '', request: '', isAnonymous: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prayedIds, setPrayedIds] = useState([]);

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
    // TODO: replace with prayerAPI.create(form) once the backend is connected
    await new Promise((r) => setTimeout(r, 400));

    setRequests((prev) => [
      {
        id: Date.now(),
        name: form.isAnonymous || !form.name ? 'Anonymous Member' : form.name,
        request: form.request,
        date: new Date().toISOString().slice(0, 10),
        prayedFor: 0,
        status: 'open',
      },
      ...prev,
    ]);
    setForm({ name: '', request: '', isAnonymous: false });
    setIsSubmitting(false);
    toast.success('Your prayer request has been submitted');
  };

  const handlePray = (id) => {
    if (prayedIds.includes(id)) return;
    setPrayedIds((prev) => [...prev, id]);
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, prayedFor: r.prayedFor + 1 } : r))
    );
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <SectionHeading
        eyebrow="Prayer Requests"
        title="We're Praying With You"
        description="A secure platform to submit prayer requests to church leadership and stand with others in prayer."
      />

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <form onSubmit={handleSubmit} className="card">
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
          {requests.map((r) => (
            <div key={r.id} className="card">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-gray-900">{r.name}</p>
                <p className="text-xs text-gray-400">{r.date}</p>
              </div>
              <p className="text-gray-700 mb-4">{r.request}</p>
              <button
                onClick={() => handlePray(r.id)}
                disabled={prayedIds.includes(r.id)}
                className={`inline-flex items-center gap-2 text-sm font-medium ${
                  prayedIds.includes(r.id) ? 'text-primary' : 'text-gray-500 hover:text-primary'
                }`}
              >
                <HeartHandshake size={16} />
                {prayedIds.includes(r.id) ? "You're praying for this" : "I'm praying for this"}
                <span className="text-gray-400">&middot; {r.prayedFor}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
