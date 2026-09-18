'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Pencil, Trash2 } from 'lucide-react';
import { sermonAPI } from '@/lib/api';
import { formatDate } from '@/lib/format';
import Input from '@/components/common/Input';
import Textarea from '@/components/common/Textarea';
import Button from '@/components/common/Button';

const emptyForm = { title: '', speaker: '', date: '', category: '', duration: '', type: 'video', description: '' };

export default function AdminSermonsPage() {
  const [sermons, setSermons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const load = () => {
    setIsLoading(true);
    sermonAPI
      .getAll()
      .then((res) => setSermons(res.data))
      .catch(() => toast.error('Failed to load sermons'))
      .finally(() => setIsLoading(false));
  };

  useEffect(load, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const startEdit = (s) => {
    setEditingId(s.id);
    setForm({
      title: s.title,
      speaker: s.speaker,
      date: formatDate(s.date),
      category: s.category,
      duration: s.duration,
      type: s.type,
      description: s.description,
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
        await sermonAPI.update(editingId, form);
        toast.success('Sermon updated');
      } else {
        await sermonAPI.create(form);
        toast.success('Sermon created');
      }
      cancelEdit();
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save sermon');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await sermonAPI.delete(id);
      setSermons((prev) => prev.filter((s) => s.id !== id));
      toast.success('Sermon deleted');
    } catch {
      toast.error('Failed to delete sermon');
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <form onSubmit={handleSubmit} className="card lg:col-span-1 h-fit">
        <h2 className="text-lg font-bold mb-4">{editingId ? 'Edit Sermon' : 'New Sermon'}</h2>
        <Input label="Title" name="title" value={form.title} onChange={handleChange} required />
        <Input label="Speaker" name="speaker" value={form.speaker} onChange={handleChange} required />
        <Input label="Date" type="date" name="date" value={form.date} onChange={handleChange} required />
        <Input label="Category" name="category" value={form.category} onChange={handleChange} required />
        <Input label="Duration" name="duration" placeholder="45 min" value={form.duration} onChange={handleChange} required />
        <div className="mb-4">
          <label className="form-label">Type</label>
          <select name="type" value={form.type} onChange={handleChange} className="form-input">
            <option value="video">Video</option>
            <option value="audio">Audio</option>
          </select>
        </div>
        <Textarea label="Description" name="description" value={form.description} onChange={handleChange} required />
        <div className="flex gap-2">
          <Button type="submit" variant="primary" isLoading={isSaving} className="flex-1">
            {editingId ? 'Save Changes' : 'Create Sermon'}
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
        {!isLoading && sermons.length === 0 && <p className="text-gray-500">No sermons yet.</p>}
        {sermons.map((s) => (
          <div key={s.id} className="card flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold text-gray-900">{s.title}</h3>
              <p className="text-sm text-gray-500">
                {s.speaker} &middot; {formatDate(s.date)} &middot; {s.category} &middot; {s.type}
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => startEdit(s)} className="p-2 text-gray-500 hover:text-primary" aria-label="Edit">
                <Pencil size={18} />
              </button>
              <button onClick={() => handleDelete(s.id)} className="p-2 text-gray-500 hover:text-red-600" aria-label="Delete">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
