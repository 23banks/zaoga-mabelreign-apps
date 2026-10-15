'use client';

import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { Trash2, Upload } from 'lucide-react';
import { mediaAPI } from '@/lib/api';
import Thumb from '@/components/common/Thumb';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

export default function AdminMediaPage() {
  const [media, setMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [event, setEvent] = useState('');
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const load = () => {
    setIsLoading(true);
    mediaAPI
      .getAll()
      .then((res) => setMedia(res.data))
      .catch(() => toast.error('Failed to load media'))
      .finally(() => setIsLoading(false));
  };

  useEffect(load, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please choose a photo or video to upload');
      return;
    }

    setIsUploading(true);
    try {
      const res = await mediaAPI.upload({ file, title, event });
      setMedia((prev) => [res.data, ...prev]);
      setTitle('');
      setEvent('');
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      toast.success('Uploaded successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await mediaAPI.delete(id);
      setMedia((prev) => prev.filter((m) => m.id !== id));
      toast.success('Deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <form onSubmit={handleSubmit} className="card lg:col-span-1 h-fit">
        <h2 className="text-lg font-bold mb-4">Upload Photo or Video</h2>
        <div className="mb-4">
          <label className="form-label">File</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:font-medium hover:file:bg-primary/20"
            required
          />
        </div>
        <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Sunday Service" />
        <Input label="Event" value={event} onChange={(e) => setEvent(e.target.value)} placeholder="e.g. Prayer Conference" />
        <Button type="submit" variant="primary" isLoading={isUploading} className="w-full">
          <Upload size={16} className="inline mr-1" /> Upload
        </Button>
      </form>

      <div className="lg:col-span-2">
        {isLoading && <p className="text-gray-500">Loading...</p>}
        {!isLoading && media.length === 0 && <p className="text-gray-500">No media uploaded yet.</p>}
        <div className="grid sm:grid-cols-2 gap-4">
          {media.map((m) => (
            <div key={m.id} className="card">
              {m.url ? (
                m.type === 'video' ? (
                  <video src={m.url} controls className="w-full h-40 object-cover rounded-lg mb-3 bg-black" />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.url} alt={m.title} className="w-full h-40 object-cover rounded-lg mb-3" />
                )
              ) : (
                <Thumb type={m.type} className="h-40 mb-3" />
              )}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-gray-900">{m.title}</h3>
                  <p className="text-sm text-gray-500">{m.event}</p>
                </div>
                <button onClick={() => handleDelete(m.id)} className="p-2 text-gray-500 hover:text-red-600 shrink-0" aria-label="Delete">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
