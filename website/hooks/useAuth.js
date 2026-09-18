'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { authAPI, userAPI } from '@/lib/api';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

      const response = await authAPI.register({ firstName, lastName, email, password });
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
      const response = await userAPI.updateProfile(profileData);

      const updatedUser = { ...user, ...response.data };
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
