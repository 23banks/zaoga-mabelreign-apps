import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/v1';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== 'undefined') {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      if (error.response?.status === 500) {
        toast.error('Server error. Please try again.');
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: async (data) => apiClient.post('/auth/register', data),
  login: async (email, password) => apiClient.post('/auth/login', { email, password }),
  logout: async () => apiClient.post('/auth/logout'),
  refreshToken: async (refreshToken) => apiClient.post('/auth/refresh-token', { refreshToken }),
};

export const userAPI = {
  getProfile: async () => apiClient.get('/users/me'),
  updateProfile: async (data) => apiClient.put('/users/me', data),
  getAll: async () => apiClient.get('/users'),
  updateRole: async (id, role) => apiClient.put(`/users/${id}/role`, { role }),
};

export const sermonAPI = {
  getAll: async () => apiClient.get('/sermons'),
  getById: async (id) => apiClient.get(`/sermons/${id}`),
  create: async (data) => apiClient.post('/sermons', data),
  update: async (id, data) => apiClient.put(`/sermons/${id}`, data),
  delete: async (id) => apiClient.delete(`/sermons/${id}`),
};

export const eventAPI = {
  getAll: async () => apiClient.get('/events'),
  getById: async (id) => apiClient.get(`/events/${id}`),
  create: async (data) => apiClient.post('/events', data),
  update: async (id, data) => apiClient.put(`/events/${id}`, data),
  delete: async (id) => apiClient.delete(`/events/${id}`),
  register: async (id) => apiClient.post(`/events/${id}/register`),
  unregister: async (id) => apiClient.post(`/events/${id}/unregister`),
};

export const prayerAPI = {
  getAll: async () => apiClient.get('/prayer-requests'),
  create: async (data) => apiClient.post('/prayer-requests', data),
  pray: async (id) => apiClient.post(`/prayer-requests/${id}/pray`),
  delete: async (id) => apiClient.delete(`/prayer-requests/${id}`),
};

export const testimonyAPI = {
  getAll: async () => apiClient.get('/testimonies'),
  create: async (data) => apiClient.post('/testimonies', data),
  like: async (id) => apiClient.post(`/testimonies/${id}/like`),
  delete: async (id) => apiClient.delete(`/testimonies/${id}`),
};

export const devotionAPI = {
  getAll: async () => apiClient.get('/devotions'),
  getToday: async () => apiClient.get('/devotions/today'),
  create: async (data) => apiClient.post('/devotions', data),
  delete: async (id) => apiClient.delete(`/devotions/${id}`),
};

export const mediaAPI = {
  getAll: async () => apiClient.get('/media'),
  upload: async ({ file, title, event }) => {
    const formData = new FormData();
    formData.append('file', file);
    if (title) formData.append('title', title);
    if (event) formData.append('event', event);
    return apiClient.post('/media', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  delete: async (id) => apiClient.delete(`/media/${id}`),
};

export const announcementAPI = {
  getAll: async () => apiClient.get('/announcements'),
  create: async (data) => apiClient.post('/announcements', data),
  delete: async (id) => apiClient.delete(`/announcements/${id}`),
};

export default apiClient;
