'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Trash2 } from 'lucide-react';
import { testimonyAPI } from '@/lib/api';
import { formatDate } from '@/lib/format';

export default function AdminTestimoniesPage() {
  const [testimonies, setTestimonies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    testimonyAPI
      .getAll()
      .then((res) => setTestimonies(res.data))
      .catch(() => toast.error('Failed to load testimonies'))
      .finally(() => setIsLoading(false));
  }, []);

  const handleDelete = async (id) => {
    try {
      await testimonyAPI.delete(id);
      setTestimonies((prev) => prev.filter((t) => t.id !== id));
      toast.success('Testimony removed');
    } catch {
      toast.error('Failed to remove testimony');
    }
  };

  return (
    <div className="space-y-3">
      <p className="text-gray-600 mb-2">Moderate testimonies shared by members.</p>
      {isLoading && <p className="text-gray-500">Loading...</p>}
      {!isLoading && testimonies.length === 0 && <p className="text-gray-500">No testimonies yet.</p>}
      {testimonies.map((t) => (
        <div key={t.id} className="card flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900">{t.title}</h3>
              <p className="text-xs text-gray-400">{formatDate(t.date)}</p>
            </div>
            <p className="text-sm text-gray-600 mt-1">{t.story}</p>
            <p className="text-xs text-gray-400 mt-2">— {t.name} &middot; {t.likes} likes</p>
          </div>
          <button onClick={() => handleDelete(t.id)} className="p-2 text-gray-500 hover:text-red-600 shrink-0" aria-label="Delete">
            <Trash2 size={18} />
          </button>
        </div>
      ))}
    </div>
  );
}
