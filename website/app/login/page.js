'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import AuthShell from '@/components/auth/AuthShell';
import { useAuthContext } from '@/hooks/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuthContext();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const result = await login(formData.email, formData.password);
    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.error);
    }
  };

  return (
    <AuthShell title="Welcome Back" subtitle="Sign in to your ZAOGA FIF account">
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <Input
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          required
        />

        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          required
        />

        <div className="flex justify-between items-center mb-6 text-sm">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2 rounded accent-primary" defaultChecked />
            <span className="text-gray-600">Remember me</span>
          </label>
          <a href="#" className="font-medium text-primary hover:text-accent transition-colors">
            Forgot password?
          </a>
        </div>

        <Button type="submit" variant="primary" size="lg" isLoading={isLoading} className="w-full">
          Sign In
        </Button>
      </form>

      <p className="text-center text-gray-600 mt-6 text-sm">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-primary hover:text-accent font-semibold transition-colors">
          Sign up here
        </Link>
      </p>

      <p className="mt-6 pt-5 border-t border-gray-100 text-center text-xs text-gray-500">
        For support, email: support@zaogafifmabelreign.org
      </p>
    </AuthShell>
  );
}
