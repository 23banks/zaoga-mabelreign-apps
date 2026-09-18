'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Trash2 } from 'lucide-react';
import { announcementAPI } from '@/lib/api';
import { formatDate } from '@/lib/format';
import Input from '@/components/common/Input';
import Textarea from '@/components/common/Textarea';
import Button from '@/components/common/Button';

const emptyForm = { title: '', body: '', urgent: false };

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [isSaving, setIsSaving] = useState(false);

  const load = () => {
    setIsLoading(true);
    announcementAPI
      .getAll()
      .then((res) => setAnnouncements(res.data))
      .catch(() => toast.error('Failed to load announcements'))
      .finally(() => setIsLoading(false));
  };

  useEffect(load, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await announcementAPI.create(form);
      toast.success('Announcement posted');
      setForm(emptyForm);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to post announcement');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await announcementAPI.delete(id);
      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
      toast.success('Announcement deleted');
    } catch {
      toast.error('Failed to delete announcement');
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <form onSubmit={handleSubmit} className="card lg:col-span-1 h-fit">
        <h2 className="text-lg font-bold mb-4">New Announcement</h2>
        <Input label="Title" name="title" value={form.title} onChange={handleChange} required />
        <Textarea label="Body" name="body" value={form.body} onChange={handleChange} required />
        <label className="flex items-center gap-2 mb-4 text-sm text-gray-600">
          <input type="checkbox" name="urgent" checked={form.urgent} onChange={handleChange} />
          Mark as urgent
        </label>
        <Button type="submit" variant="primary" isLoading={isSaving} className="w-full">
          Post Announcement
        </Button>
      </form>

      <div className="lg:col-span-2 space-y-3">
        {isLoading && <p className="text-gray-500">Loading...</p>}
        {!isLoading && announcements.length === 0 && <p className="text-gray-500">No announcements yet.</p>}
        {announcements.map((a) => (
          <div key={a.id} className="card flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900">{a.title}</h3>
                {a.urgent && <span className="badge bg-red-100 text-red-700">Urgent</span>}
              </div>
              <p className="text-sm text-gray-600 mt-1">{a.body}</p>
              <p className="text-xs text-gray-400 mt-2">{formatDate(a.date)}</p>
            </div>
            <button onClick={() => handleDelete(a.id)} className="p-2 text-gray-500 hover:text-red-600 shrink-0" aria-label="Delete">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
