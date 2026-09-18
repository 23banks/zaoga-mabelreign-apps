'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Trash2 } from 'lucide-react';
import { devotionAPI } from '@/lib/api';
import { formatDate } from '@/lib/format';
import Input from '@/components/common/Input';
import Textarea from '@/components/common/Textarea';
import Button from '@/components/common/Button';

const emptyForm = { date: '', title: '', verse: '', reflection: '' };

export default function AdminDevotionsPage() {
  const [devotions, setDevotions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [isSaving, setIsSaving] = useState(false);

  const load = () => {
    setIsLoading(true);
    devotionAPI
      .getAll()
      .then((res) => setDevotions(res.data))
      .catch(() => toast.error('Failed to load devotions'))
      .finally(() => setIsLoading(false));
  };

  useEffect(load, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await devotionAPI.create(form);
      toast.success('Devotion posted');
      setForm(emptyForm);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to post devotion');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await devotionAPI.delete(id);
      setDevotions((prev) => prev.filter((d) => d.id !== id));
      toast.success('Devotion deleted');
    } catch {
      toast.error('Failed to delete devotion');
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <form onSubmit={handleSubmit} className="card lg:col-span-1 h-fit">
        <h2 className="text-lg font-bold mb-4">New Devotion</h2>
        <Input label="Date" type="date" name="date" value={form.date} onChange={handleChange} required />
        <Input label="Title" name="title" value={form.title} onChange={handleChange} required />
        <Input
          label="Verse"
          name="verse"
          value={form.verse}
          onChange={handleChange}
          placeholder='"..." — Reference'
          required
        />
        <Textarea label="Reflection" name="reflection" value={form.reflection} onChange={handleChange} required />
        <Button type="submit" variant="primary" isLoading={isSaving} className="w-full">
          Post Devotion
        </Button>
      </form>

      <div className="lg:col-span-2 space-y-3">
        {isLoading && <p className="text-gray-500">Loading...</p>}
        {!isLoading && devotions.length === 0 && <p className="text-gray-500">No devotions yet.</p>}
        {devotions.map((d) => (
          <div key={d.id} className="card flex items-start justify-between gap-4">
            <div>
              <p className="text-xs text-gray-400">{formatDate(d.date)}</p>
              <h3 className="font-semibold text-gray-900">{d.title}</h3>
              <p className="text-sm italic text-gray-600 mt-1">{d.verse}</p>
            </div>
            <button onClick={() => handleDelete(d.id)} className="p-2 text-gray-500 hover:text-red-600 shrink-0" aria-label="Delete">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
