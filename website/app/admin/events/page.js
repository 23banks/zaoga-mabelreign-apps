'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Pencil, Trash2 } from 'lucide-react';
import { eventAPI } from '@/lib/api';
import { formatDate } from '@/lib/format';
import Input from '@/components/common/Input';
import Textarea from '@/components/common/Textarea';
import Button from '@/components/common/Button';

const emptyForm = { title: '', date: '', time: '', location: '', category: '', description: '' };

export default function AdminEventsPage() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const load = () => {
    setIsLoading(true);
    eventAPI
      .getAll()
      .then((res) => setEvents(res.data))
      .catch(() => toast.error('Failed to load events'))
      .finally(() => setIsLoading(false));
  };

  useEffect(load, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const startEdit = (ev) => {
    setEditingId(ev.id);
    setForm({
      title: ev.title,
      date: formatDate(ev.date),
      time: ev.time,
      location: ev.location,
      category: ev.category,
      description: ev.description,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (editingId) {
        await eventAPI.update(editingId, form);
        toast.success('Event updated');
      } else {
        await eventAPI.create(form);
        toast.success('Event created');
      }
      cancelEdit();
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save event');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await eventAPI.delete(id);
      setEvents((prev) => prev.filter((e) => e.id !== id));
      toast.success('Event deleted');
    } catch {
      toast.error('Failed to delete event');
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <form onSubmit={handleSubmit} className="card lg:col-span-1 h-fit">
        <h2 className="text-lg font-bold mb-4">{editingId ? 'Edit Event' : 'New Event'}</h2>
        <Input label="Title" name="title" value={form.title} onChange={handleChange} required />
        <Input label="Date" type="date" name="date" value={form.date} onChange={handleChange} required />
        <Input label="Time" type="time" name="time" value={form.time} onChange={handleChange} required />
        <Input label="Location" name="location" value={form.location} onChange={handleChange} required />
        <Input label="Category" name="category" value={form.category} onChange={handleChange} required />
        <Textarea label="Description" name="description" value={form.description} onChange={handleChange} required />
        <div className="flex gap-2">
          <Button type="submit" variant="primary" isLoading={isSaving} className="flex-1">
            {editingId ? 'Save Changes' : 'Create Event'}
          </Button>
          {editingId && (
            <Button type="button" variant="secondary" onClick={cancelEdit}>
              Cancel
            </Button>
          )}
        </div>
      </form>

      <div className="lg:col-span-2 space-y-3">
        {isLoading && <p className="text-gray-500">Loading...</p>}
        {!isLoading && events.length === 0 && <p className="text-gray-500">No events yet.</p>}
        {events.map((ev) => (
          <div key={ev.id} className="card flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold text-gray-900">{ev.title}</h3>
              <p className="text-sm text-gray-500">
                {formatDate(ev.date)} at {ev.time} &middot; {ev.location} &middot; {ev.attendeeCount} registered
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => startEdit(ev)} className="p-2 text-gray-500 hover:text-primary" aria-label="Edit">
                <Pencil size={18} />
              </button>
              <button onClick={() => handleDelete(ev.id)} className="p-2 text-gray-500 hover:text-red-600" aria-label="Delete">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
