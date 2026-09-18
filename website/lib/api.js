import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
  uploadAvatar: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post('/users/me/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  getUser: async (id) => apiClient.get(`/users/${id}`),
};

export const sermonAPI = {
  getAll: async (page = 1, limit = 10, category = null) => {
    const params = { page, limit };
    if (category) params.category = category;
    return apiClient.get('/sermons', { params });
  },
  getById: async (id) => apiClient.get(`/sermons/${id}`),
  recordView: async (id) => apiClient.post(`/sermons/${id}/view`),
};

export const eventAPI = {
  getAll: async (page = 1, limit = 10, type = null) => {
    const params = { page, limit };
    if (type) params.type = type;
    return apiClient.get('/events', { params });
  },
  getById: async (id) => apiClient.get(`/events/${id}`),
  register: async (id) => apiClient.post(`/events/${id}/register`),
  unregister: async (id) => apiClient.post(`/events/${id}/unregister`),
};

export const prayerAPI = {
  getAll: async (page = 1, limit = 10, status = null) => {
    const params = { page, limit };
    if (status) params.status = status;
    return apiClient.get('/prayer-requests', { params });
  },
  create: async (data) => apiClient.post('/prayer-requests', data),
  pray: async (id) => apiClient.post(`/prayer-requests/${id}/pray`),
};

export const testimonyAPI = {
  getAll: async (page = 1, limit = 10) => apiClient.get('/testimonies', { params: { page, limit } }),
  create: async (data) => apiClient.post('/testimonies', data),
  like: async (id) => apiClient.post(`/testimonies/${id}/like`),
};

export const devotionAPI = {
  getAll: async (page = 1, limit = 10) => apiClient.get('/devotions', { params: { page, limit } }),
  getToday: async () => apiClient.get('/devotions/today'),
};

export const mediaAPI = {
  getAll: async (page = 1, limit = 12, type = null) => {
    const params = { page, limit };
    if (type) params.type = type;
    return apiClient.get('/media', { params });
  },
  like: async (id) => apiClient.post(`/media/${id}/like`),
};

export const announcementAPI = {
  getAll: async (page = 1, limit = 10) => apiClient.get('/announcements', { params: { page, limit } }),
};

export default apiClient;
