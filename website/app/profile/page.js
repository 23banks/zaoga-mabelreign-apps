'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { useAuthContext } from '@/hooks/AuthContext';

export default function ProfilePage() {
  const { user, updateProfile, isLoading } = useAuthContext();
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '' });

  useEffect(() => {
    if (user) {
      setFormData({ firstName: user.firstName || '', lastName: user.lastName || '', email: user.email || '' });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateProfile(formData);
    if (!result.success) {
      toast.error(result.error || 'Failed to update profile');
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Profile</h1>
      <p className="text-gray-600 mb-8">Manage your account settings</p>

      <form onSubmit={handleSubmit} className="card">
        <div className="grid grid-cols-2 gap-4">
          <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
          <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
        </div>
        <Input label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} />
        <Button type="submit" variant="primary" isLoading={isLoading} className="w-full">
          Save Changes
        </Button>
      </form>
    </div>
  );
}
