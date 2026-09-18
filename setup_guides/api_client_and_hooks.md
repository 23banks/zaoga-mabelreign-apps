# API Client & Custom Hooks Setup

## 1. API Client (lib/api.js)

Create `app/lib/api.js`:

```javascript
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Create axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle responses and errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

    if (error.response?.status === 500) {
      toast.error('Server error. Please try again.');
    }

    return Promise.reject(error);
  }
);

// ========================
// AUTH API CALLS
// ========================
export const authAPI = {
  register: async (data) => {
    return apiClient.post('/auth/register', data);
  },

  login: async (email, password) => {
    return apiClient.post('/auth/login', { email, password });
  },

  logout: async () => {
    return apiClient.post('/auth/logout');
  },

  refreshToken: async (refreshToken) => {
    return apiClient.post('/auth/refresh-token', { refreshToken });
  },
};

// ========================
// USER API CALLS
// ========================
export const userAPI = {
  getProfile: async () => {
    return apiClient.get('/users/me');
  },

  updateProfile: async (data) => {
    return apiClient.put('/users/me', data);
  },

  uploadAvatar: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post('/users/me/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  getUser: async (id) => {
    return apiClient.get(`/users/${id}`);
  },
};

// ========================
// SERMON API CALLS
// ========================
export const sermonAPI = {
  getAll: async (page = 1, limit = 10, category = null) => {
    const params = { page, limit };
    if (category) params.category = category;
    return apiClient.get('/sermons', { params });
  },

  getById: async (id) => {
    return apiClient.get(`/sermons/${id}`);
  },

  getRelated: async (id, limit = 5) => {
    return apiClient.get(`/sermons/${id}/related`, { params: { limit } });
  },

  create: async (data) => {
    return apiClient.post('/sermons', data);
  },

  update: async (id, data) => {
    return apiClient.put(`/sermons/${id}`, data);
  },

  delete: async (id) => {
    return apiClient.delete(`/sermons/${id}`);
  },

  recordView: async (id) => {
    return apiClient.post(`/sermons/${id}/view`);
  },
};

// ========================
// EVENT API CALLS
// ========================
export const eventAPI = {
  getAll: async (page = 1, limit = 10, type = null) => {
    const params = { page, limit };
    if (type) params.type = type;
    return apiClient.get('/events', { params });
  },

  getById: async (id) => {
    return apiClient.get(`/events/${id}`);
  },

  create: async (data) => {
    return apiClient.post('/events', data);
  },

  update: async (id, data) => {
    return apiClient.put(`/events/${id}`, data);
  },

  delete: async (id) => {
    return apiClient.delete(`/events/${id}`);
  },

  register: async (id) => {
    return apiClient.post(`/events/${id}/register`);
  },

  unregister: async (id) => {
    return apiClient.post(`/events/${id}/unregister`);
  },

  getAttendees: async (id) => {
    return apiClient.get(`/events/${id}/attendees`);
  },
};

// ========================
// PRAYER REQUEST API CALLS
// ========================
export const prayerAPI = {
  getAll: async (page = 1, limit = 10, status = null) => {
    const params = { page, limit };
    if (status) params.status = status;
    return apiClient.get('/prayer-requests', { params });
  },

  getById: async (id) => {
    return apiClient.get(`/prayer-requests/${id}`);
  },

  create: async (data) => {
    return apiClient.post('/prayer-requests', data);
  },

  update: async (id, data) => {
    return apiClient.put(`/prayer-requests/${id}`, data);
  },

  delete: async (id) => {
    return apiClient.delete(`/prayer-requests/${id}`);
  },

  pray: async (id) => {
    return apiClient.post(`/prayer-requests/${id}/pray`);
  },

  close: async (id) => {
    return apiClient.post(`/prayer-requests/${id}/close`);
  },
};

// ========================
// TESTIMONY API CALLS
// ========================
export const testimonyAPI = {
  getAll: async (page = 1, limit = 10) => {
    return apiClient.get('/testimonies', { params: { page, limit } });
  },

  getById: async (id) => {
    return apiClient.get(`/testimonies/${id}`);
  },

  create: async (data) => {
    return apiClient.post('/testimonies', data);
  },

  update: async (id, data) => {
    return apiClient.put(`/testimonies/${id}`, data);
  },

  delete: async (id) => {
    return apiClient.delete(`/testimonies/${id}`);
  },

  like: async (id) => {
    return apiClient.post(`/testimonies/${id}/like`);
  },
};

// ========================
// DEVOTION API CALLS
// ========================
export const devotionAPI = {
  getAll: async (page = 1, limit = 10) => {
    return apiClient.get('/devotions', { params: { page, limit } });
  },

  getToday: async () => {
    return apiClient.get('/devotions/today');
  },

  getById: async (id) => {
    return apiClient.get(`/devotions/${id}`);
  },
};

// ========================
// MEDIA API CALLS
// ========================
export const mediaAPI = {
  getAll: async (page = 1, limit = 12, type = null) => {
    const params = { page, limit };
    if (type) params.type = type;
    return apiClient.get('/media', { params });
  },

  getById: async (id) => {
    return apiClient.get(`/media/${id}`);
  },

  upload: async (file, eventId = null) => {
    const formData = new FormData();
    formData.append('file', file);
    if (eventId) formData.append('eventId', eventId);
    return apiClient.post('/media/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  delete: async (id) => {
    return apiClient.delete(`/media/${id}`);
  },

  like: async (id) => {
    return apiClient.post(`/media/${id}/like`);
  },
};

// ========================
// DONATION API CALLS
// ========================
export const donationAPI = {
  create: async (data) => {
    return apiClient.post('/donations', data);
  },

  getHistory: async () => {
    return apiClient.get('/donations/history');
  },

  getStats: async () => {
    return apiClient.get('/donations/stats');
  },
};

// ========================
// ANNOUNCEMENT API CALLS
// ========================
export const announcementAPI = {
  getAll: async (page = 1, limit = 10) => {
    return apiClient.get('/announcements', { params: { page, limit } });
  },

  getById: async (id) => {
    return apiClient.get(`/announcements/${id}`);
  },

  create: async (data) => {
    return apiClient.post('/announcements', data);
  },

  update: async (id, data) => {
    return apiClient.put(`/announcements/${id}`, data);
  },

  delete: async (id) => {
    return apiClient.delete(`/announcements/${id}`);
  },
};

export default apiClient;
```

---

## 2. useAuth Hook

Create `app/hooks/useAuth.js`:

```javascript
'use client';

import { useState, useEffect, useCallback } from 'react';
import { authAPI, userAPI } from '@/lib/api';
import { toast } from 'react-toastify';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load auth from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }

    setIsLoading(false);
  }, []);

  const register = useCallback(async (firstName, lastName, email, password) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await authAPI.register({
        firstName,
        lastName,
        email,
        password,
      });

      const { user: userData, token: newToken } = response.data;

      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(userData));

      setUser(userData);
      setToken(newToken);
      toast.success('Registration successful!');

      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      setError(message);
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await authAPI.login(email, password);
      const { user: userData, token: newToken } = response.data;

      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(userData));

      setUser(userData);
      setToken(newToken);
      toast.success('Login successful!');

      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authAPI.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      setToken(null);
      toast.success('Logged out successfully');
    }
  }, []);

  const updateProfile = useCallback(async (profileData) => {
    try {
      setIsLoading(true);
      await userAPI.updateProfile(profileData);
      
      const updatedUser = { ...user, ...profileData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      toast.success('Profile updated successfully');
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update profile';
      setError(message);
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const isAuthenticated = !!token && !!user;

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    register,
    login,
    logout,
    updateProfile,
  };
}
```

---

## 3. useFetch Hook

Create `app/hooks/useFetch.js`:

```javascript
'use client';

import { useState, useEffect } from 'react';

export function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const token = localStorage.getItem('token');
        const headers = {
          'Content-Type': 'application/json',
          ...options.headers,
        };

        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(url, {
          ...options,
          headers,
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`);
        }

        const result = await response.json();

        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url, options]);

  const refetch = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, refetch };
}
```

---

## 4. Example Usage in Components

### Example: Login Form with API

**components/auth/LoginForm.jsx**

```javascript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

export default function LoginForm() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const result = await login(formData.email, formData.password);

    if (result.success) {
      router.push('/dashboard');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="your@email.com"
        disabled={isLoading}
      />

      <Input
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="••••••••"
        disabled={isLoading}
      />

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
  );
}
```

### Example: Sermons List with API

**components/sermons/SermonList.jsx**

```javascript
'use client';

import { useState, useEffect } from 'react';
import { sermonAPI } from '@/lib/api';
import SermonCard from './SermonCard';
import Button from '@/components/common/Button';

export default function SermonList() {
  const [sermons, setSermons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchSermons();
  }, [page]);

  const fetchSermons = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await sermonAPI.getAll(page, 10);
      setSermons(response.data.sermons);
      setTotalPages(response.data.pages);
    } catch (err) {
      setError(err.message || 'Failed to load sermons');
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={fetchSermons}>Try Again</Button>
      </div>
    );
  }

  return (
    <div>
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading sermons...</p>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {sermons.map((sermon) => (
              <SermonCard key={sermon.id} sermon={sermon} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-4 items-center">
            <Button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              variant="secondary"
            >
              ← Previous
            </Button>
            <span className="text-gray-600">
              Page {page} of {totalPages}
            </span>
            <Button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page >= totalPages}
              variant="secondary"
            >
              Next →
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
```

---

## 5. Protected Route Component

Create `app/components/ProtectedRoute.jsx`:

```javascript
'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
}
```

---

## Usage in Pages

**app/(dashboard)/layout.js**

```javascript
import ProtectedRoute from '@/components/ProtectedRoute';

export default function DashboardLayout({ children }) {
  return (
    <ProtectedRoute>
      {children}
    </ProtectedRoute>
  );
}
```

---

## Testing the API Connection

After the backend is running, test the connection:

```bash
# Backend running on http://localhost:5000
# Website running on http://localhost:3000

# Test API from browser console:
# fetch('http://localhost:5000/health')
#   .then(r => r.json())
#   .then(d => console.log(d))
```

If you see a response with status "OK", the connection is working! ✅
