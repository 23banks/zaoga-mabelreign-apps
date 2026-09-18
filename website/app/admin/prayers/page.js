'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Trash2 } from 'lucide-react';
import { prayerAPI } from '@/lib/api';
import { formatDate } from '@/lib/format';

export default function AdminPrayersPage() {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    prayerAPI
      .getAll()
      .then((res) => setRequests(res.data))
      .catch(() => toast.error('Failed to load prayer requests'))
      .finally(() => setIsLoading(false));
  }, []);

  const handleDelete = async (id) => {
    try {
      await prayerAPI.delete(id);
      setRequests((prev) => prev.filter((r) => r.id !== id));
      toast.success('Prayer request removed');
    } catch {
      toast.error('Failed to remove prayer request');
    }
  };

  return (
    <div className="space-y-3">
      <p className="text-gray-600 mb-2">Moderate prayer requests submitted by members.</p>
      {isLoading && <p className="text-gray-500">Loading...</p>}
      {!isLoading && requests.length === 0 && <p className="text-gray-500">No prayer requests yet.</p>}
      {requests.map((r) => (
        <div key={r.id} className="card flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-gray-900">{r.name}</p>
              <p className="text-xs text-gray-400">{formatDate(r.date)}</p>
            </div>
            <p className="text-sm text-gray-600 mt-1">{r.request}</p>
            <p className="text-xs text-gray-400 mt-2">{r.prayedFor} praying for this</p>
          </div>
          <button onClick={() => handleDelete(r.id)} className="p-2 text-gray-500 hover:text-red-600 shrink-0" aria-label="Delete">
            <Trash2 size={18} />
          </button>
        </div>
      ))}
    </div>
  );
}
