# ZAOGA Webapp Setup & Build Guide

## Phase 1: Initial Setup (30 minutes)

### Step 1: Create Next.js Project

```bash
# Navigate to your project directory
cd zaoga-project

# Create the website
npx create-next-app@latest website

# When prompted, select:
# ✅ TypeScript? → No (use JavaScript for simplicity)
# ✅ ESLint? → Yes
# ✅ Tailwind CSS? → Yes
# ✅ App Router? → Yes
# ✅ Import alias? → Yes (@/*)

cd website
```

### Step 2: Install Additional Dependencies

```bash
npm install axios react-hook-form zod clsx date-fns react-toastify lucide-react
```

**What each package does:**
- `axios` - API requests to backend
- `react-hook-form` - Form management
- `zod` - Form validation
- `clsx` - Conditional CSS classes
- `date-fns` - Date formatting
- `react-toastify` - Notifications/alerts
- `lucide-react` - Beautiful icons

### Step 3: Project Structure

```bash
# Create folder structure
mkdir -p src/{components,hooks,lib,app}

# The structure will be:
website/
├── app/
│   ├── (public)/
│   │   ├── page.js              (Home page)
│   │   ├── about/
│   │   │   └── page.js
│   │   └── contact/
│   │       └── page.js
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.js
│   │   ├── register/
│   │   │   └── page.js
│   │   └── layout.js
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   │   └── page.js
│   │   ├── sermons/
│   │   │   ├── page.js
│   │   │   └── [id]/
│   │   │       └── page.js
│   │   ├── events/
│   │   │   ├── page.js
│   │   │   └── [id]/
│   │   │       └── page.js
│   │   ├── prayers/
│   │   │   └── page.js
│   │   ├── profile/
│   │   │   └── page.js
│   │   └── layout.js
│   ├── layout.js                (Root layout)
│   ├── globals.css
│   └── page.js                  (Redirects to home)
├── components/
│   ├── common/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Card.jsx
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Loading.jsx
│   │   └── Toast.jsx
│   ├── auth/
│   │   ├── LoginForm.jsx
│   │   └── RegisterForm.jsx
│   ├── home/
│   │   ├── Hero.jsx
│   │   ├── FeaturedSermons.jsx
│   │   └── UpcomingEvents.jsx
│   └── sermons/
│       ├── SermonCard.jsx
│       └── SermonList.jsx
├── hooks/
│   ├── useAuth.js
│   ├── useSermons.js
│   └── useFetch.js
├── lib/
│   ├── api.js                   (API client)
│   └── utils.js                 (Utility functions)
├── public/
├── .env.local
├── next.config.js
├── tailwind.config.js
└── package.json
```

### Step 4: Environment Configuration

Create `.env.local` in the website root:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_APP_NAME=ZAOGA FIF Mabelreign Kingdom District
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Feature Flags
NEXT_PUBLIC_ENABLE_GIVING=true
NEXT_PUBLIC_ENABLE_TESTIMONIES=true
```

Create `.env.example`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_APP_NAME=ZAOGA FIF Mabelreign Kingdom District
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_ENABLE_GIVING=true
NEXT_PUBLIC_ENABLE_TESTIMONIES=true
```

### Step 5: Update Tailwind Config

**tailwind.config.js**

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',      // Indigo
        secondary: '#8b5cf6',    // Violet
        success: '#10b981',      // Green
        warning: '#f59e0b',      // Amber
        danger: '#ef4444',       // Red
        dark: '#1f2937',         // Gray-800
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

### Step 6: Root Layout

**app/layout.js**

```javascript
import './globals.css';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME,
  description: 'Digital platform for spiritual growth and church engagement',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
        />
      </body>
    </html>
  );
}
```

### Step 7: Global Styles

**app/globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Custom Components */
.container {
  @apply mx-auto px-4 sm:px-6 lg:px-8;
}

.btn-primary {
  @apply inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors;
}

.btn-secondary {
  @apply inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors;
}

.card {
  @apply bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6;
}

.form-input {
  @apply w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0 transition-all;
}

.form-label {
  @apply block text-sm font-medium text-gray-700 mb-2;
}

/* Loading animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
```

---

## Phase 2: Build Core Components (1 hour)

### Component 1: Navbar

**components/common/Navbar.jsx**

```javascript
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // TODO: Get auth state from context/store later
  const isLoggedIn = false;

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">Z</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline text-gray-900">
              ZAOGA FIF
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-primary transition">
              Home
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-primary transition">
              About
            </Link>
            <Link href="/sermons" className="text-gray-600 hover:text-primary transition">
              Sermons
            </Link>
            <Link href="/events" className="text-gray-600 hover:text-primary transition">
              Events
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-primary transition"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="btn-primary"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link href="/dashboard" className="text-gray-600 hover:text-primary">
                  Dashboard
                </Link>
                <button className="text-red-600 hover:text-red-700">
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            <Link
              href="/"
              className="block text-gray-600 hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block text-gray-600 hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/sermons"
              className="block text-gray-600 hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Sermons
            </Link>
            <Link
              href="/events"
              className="block text-gray-600 hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Events
            </Link>
            {!isLoggedIn ? (
              <div className="flex space-x-2 pt-2">
                <Link href="/login" className="flex-1 btn-secondary text-center">
                  Login
                </Link>
                <Link href="/register" className="flex-1 btn-primary text-center">
                  Register
                </Link>
              </div>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className="block text-gray-600 hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <button className="w-full text-left text-red-600">Logout</button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
```

### Component 2: Footer

**components/common/Footer.jsx**

```javascript
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-100 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">ZAOGA FIF</h3>
            <p className="text-gray-400 text-sm">
              Mabelreign Kingdom District - Connecting hearts through digital ministry
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/sermons" className="text-gray-400 hover:text-white transition">
                  Sermons
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-400 hover:text-white transition">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/ministries" className="text-gray-400 hover:text-white transition">
                  Ministries
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-primary" />
                <span className="text-gray-400">Harare, Zimbabwe</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-primary" />
                <a href="mailto:info@zaoga.church" className="text-gray-400 hover:text-white">
                  info@zaoga.church
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-primary" />
                <a href="tel:+263123456789" className="text-gray-400 hover:text-white">
                  +263 1 234 567
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; {currentYear} ZAOGA FIF. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

### Component 3: Button Component

**components/common/Button.jsx**

```javascript
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  className = '',
  ...props
}) {
  const baseClasses = 'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 focus:ring-primary disabled:bg-gray-400',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-300 disabled:bg-gray-200',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600 disabled:bg-red-400',
    ghost: 'text-primary hover:bg-primary/10 focus:ring-primary',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center">
          <span className="animate-spin mr-2">⏳</span>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
```

### Component 4: Input Component

**components/common/Input.jsx**

```javascript
export default function Input({
  label,
  error,
  type = 'text',
  className = '',
  ...props
}) {
  return (
    <div className="mb-4">
      {label && (
        <label className="form-label">
          {label}
          {props.required && <span className="text-red-600">*</span>}
        </label>
      )}
      <input
        type={type}
        className={`form-input ${error ? 'ring-2 ring-red-500' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
}
```

---

## Phase 3: Create Pages (1 hour)

### Home Page

**app/(public)/page.js**

```javascript
import Link from 'next/link';
import { ArrowRight, Users, BookOpen, Calendar } from 'lucide-react';
import Button from '@/components/common/Button';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to ZAOGA FIF
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-2xl mx-auto">
            Mabelreign Kingdom District - Connecting hearts, growing faith
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register">
              <Button size="lg" variant="primary" className="w-full sm:w-auto">
                Join Us Today
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">What We Offer</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <BookOpen className="text-primary" size={48} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Sermons & Teachings</h3>
              <p className="text-gray-600">
                Access our library of inspiring sermons, biblical teachings, and spiritual resources anytime.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <Calendar className="text-primary" size={48} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Events & Activities</h3>
              <p className="text-gray-600">
                Stay updated with upcoming services, conferences, meetings, and special events.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <Users className="text-primary" size={48} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Community</h3>
              <p className="text-gray-600">
                Connect with members, share prayer requests, and grow together in faith.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Connect?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of members in our digital spiritual community
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary">
              Get Started
              <ArrowRight className="inline ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
```

### Login Page

**app/(auth)/login/page.js**

```javascript
'use client';

import Link from 'next/link';
import { useState } from 'react';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // TODO: Replace with actual API call
      console.log('Login attempt:', formData);
      
      // Simulated API call
      // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      
      // For now, just redirect
      router.push('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your ZAOGA FIF account</p>
        </div>

        {/* Login Form */}
        <div className="card">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
              {error}
            </div>
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

            {/* Remember & Forgot */}
            <div className="flex justify-between items-center mb-6 text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 rounded"
                  defaultChecked
                />
                <span className="text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-primary hover:text-primary/80">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full"
            >
              Sign In
            </Button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-gray-600 mt-6">
            Don't have an account?{' '}
            <Link href="/register" className="text-primary hover:text-primary/80 font-semibold">
              Sign up here
            </Link>
          </p>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>For support, email: support@zaoga.church</p>
        </div>
      </div>
    </div>
  );
}
```

### Register Page

**app/(auth)/register/page.js**

```javascript
'use client';

import Link from 'next/link';
import { useState } from 'react';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      console.log('Register attempt:', formData);
      
      // Simulated API call
      // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     firstName: formData.firstName,
      //     lastName: formData.lastName,
      //     email: formData.email,
      //     password: formData.password,
      //   }),
      // });
      
      // For now, redirect to login
      router.push('/login?registered=true');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Join ZAOGA FIF</h1>
          <p className="text-gray-600">Create your account to get started</p>
        </div>

        {/* Register Form */}
        <div className="card">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                required
              />
              <Input
                label="Last Name"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                required
              />
            </div>

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
              placeholder="At least 8 characters"
              required
            />

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />

            {/* Terms */}
            <div className="mb-6">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  className="mt-1 mr-3 rounded"
                  required
                />
                <span className="text-sm text-gray-600">
                  I agree to the{' '}
                  <a href="#" className="text-primary hover:text-primary/80">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-primary hover:text-primary/80">
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full"
            >
              Create Account
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-center text-gray-600 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:text-primary/80 font-semibold">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
```

### Dashboard Page (Placeholder)

**app/(dashboard)/dashboard/page.js**

```javascript
'use client';

import Link from 'next/link';
import Button from '@/components/common/Button';

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your spiritual hub.</p>
      </div>

      {/* Dashboard Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {/* Quick Stats */}
        <div className="card">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm">Sermons Watched</p>
              <p className="text-3xl font-bold text-primary">12</p>
            </div>
            <div className="text-4xl">📺</div>
          </div>
        </div>

        <div className="card">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm">Events Attended</p>
              <p className="text-3xl font-bold text-primary">5</p>
            </div>
            <div className="text-4xl">📅</div>
          </div>
        </div>

        <div className="card">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm">Prayer Requests</p>
              <p className="text-3xl font-bold text-primary">3</p>
            </div>
            <div className="text-4xl">🙏</div>
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-2xl font-bold mb-3">Latest Sermons</h3>
          <p className="text-gray-600 mb-4">Watch our most recent teachings</p>
          <Link href="/sermons">
            <Button variant="primary">Browse Sermons</Button>
          </Link>
        </div>

        <div className="card">
          <h3 className="text-2xl font-bold mb-3">Upcoming Events</h3>
          <p className="text-gray-600 mb-4">Check out what's coming up</p>
          <Link href="/events">
            <Button variant="primary">View Events</Button>
          </Link>
        </div>

        <div className="card">
          <h3 className="text-2xl font-bold mb-3">Prayer Requests</h3>
          <p className="text-gray-600 mb-4">Share your prayer needs</p>
          <Link href="/prayers">
            <Button variant="primary">Submit Prayer</Button>
          </Link>
        </div>

        <div className="card">
          <h3 className="text-2xl font-bold mb-3">Your Profile</h3>
          <p className="text-gray-600 mb-4">Manage your account settings</p>
          <Link href="/profile">
            <Button variant="primary">Edit Profile</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
```

---

## Phase 4: Run Your App

### Start Development Server

```bash
cd website
npm run dev
```

**Should see:**
```
  ➜  Local:   http://localhost:3000
  ➜  press h + enter to show help
```

### Test in Browser

1. Open http://localhost:3000
2. Click around - everything should work!
3. Try:
   - ✅ Click "Register" button
   - ✅ Go to login page
   - ✅ Mobile responsive menu
   - ✅ Footer links

---

## Next Steps

1. ✅ Setup API client (lib/api.js) to connect to backend
2. ✅ Add useAuth hook for authentication
3. ✅ Create Sermons page + components
4. ✅ Create Events page + calendar
5. ✅ Create Prayer Requests page
6. ✅ Add error handling & loading states

## File Structure Overview

```
✅ website/
  ✅ app/
    ✅ (public)/
      ✅ page.js              ← Home page
    ✅ (auth)/
      ✅ login/page.js        ← Login
      ✅ register/page.js     ← Register
    ✅ (dashboard)/
      ✅ dashboard/page.js    ← Dashboard
    ✅ layout.js              ← Root layout
    ✅ globals.css            ← Global styles
  ✅ components/
    ✅ common/
      ✅ Navbar.jsx           ← Navigation
      ✅ Footer.jsx           ← Footer
      ✅ Button.jsx           ← Button component
      ✅ Input.jsx            ← Input component
  ✅ lib/
  ✅ .env.local              ← Environment
  ✅ package.json
```

You've got a working webapp! 🎉
