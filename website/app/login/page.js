'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
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
    <div className="min-h-[80vh] bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your ZAOGA FIF account</p>
        </div>

        <div className="card">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">{error}</div>
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
                <input type="checkbox" className="mr-2 rounded" defaultChecked />
                <span className="text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-primary hover:text-primary/80">
                Forgot password?
              </a>
            </div>

            <Button type="submit" variant="primary" size="lg" isLoading={isLoading} className="w-full">
              Sign In
            </Button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-primary hover:text-primary/80 font-semibold">
              Sign up here
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>For support, email: support@zaogafifmabelreign.org</p>
        </div>
      </div>
    </div>
  );
}
