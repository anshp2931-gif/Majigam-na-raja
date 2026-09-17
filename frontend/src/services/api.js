// frontend/src/services/api.js
// Centralized Axios API service

import axios from 'axios';

const envApiUrl = import.meta.env.VITE_API_URL;
const API_URL =
  (envApiUrl && !envApiUrl.includes('majigam-na-raja.anshp2931.workers.dev'))
    ? envApiUrl
    : (typeof window !== 'undefined' &&
       window.location.hostname !== 'localhost' &&
       window.location.hostname !== '127.0.0.1'
        ? 'https://majigam-na-raja-api.anshp2931.workers.dev'
        : 'http://localhost:8787');

const TOKEN_KEY = 'mnr_admin_token';

export function getAdminToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token) {
  if (typeof window === 'undefined') return;
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

export function removeAdminToken() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
}

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Required for HTTP-only cookies (admin auth)
  timeout: 30000,
});

// ─── Request interceptor ──────────────────────────────────────────────────────
api.interceptors.request.use((config) => {
  const token = getAdminToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ─── Response interceptor ─────────────────────────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeAdminToken();
      const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      const isProtectedFundsPage =
        window.location.pathname.startsWith('/admin') ||
        window.location.pathname.startsWith('/receipt') ||
        window.location.pathname === '/funds';

      if (isProtectedFundsPage && window.location.pathname !== '/admin/login') {
        window.location.href = `/admin/login?redirect=${encodeURIComponent(currentPath)}`;
      }
    }
    return Promise.reject(error);
  }
);

// ─── Public Members Directory ────────────────────────────────────────────────

/**
 * Fetches public members directory (read-only for normal users).
 */
export async function getPublicMembers(params = {}) {
  const response = await api.get('/api/members', { params });
  return response.data;
}

/**
 * Registers a new member (Admin or legacy endpoint).
 */
export async function registerMember(formData) {
  const response = await api.post('/api/register', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}

// ─── Public ID Verification ───────────────────────────────────────────────────

/**
 * Fetches public member info by uniqueId.
 */
export async function verifyMemberId(uniqueId) {
  const response = await api.get(`/api/id/${uniqueId}`);
  return response.data;
}

// ─── Admin Auth ───────────────────────────────────────────────────────────────

export async function adminLogin(username, password) {
  const response = await api.post('/api/admin/login', { username, password });
  if (response.data?.token) {
    setAdminToken(response.data.token);
  }
  return response.data;
}

export async function adminLogout() {
  try {
    const response = await api.post('/api/admin/logout');
    return response.data;
  } finally {
    removeAdminToken();
  }
}

export async function getAdminMe() {
  const response = await api.get('/api/admin/me');
  return response.data;
}

// ─── Admin Data ───────────────────────────────────────────────────────────────

export async function getAdminStats() {
  const response = await api.get('/api/admin/stats');
  return response.data;
}

export async function getRegistrations(params = {}) {
  const response = await api.get('/api/admin/registrations', { params });
  return response.data;
}

export async function getRegistrationByUniqueId(uniqueId) {
  const response = await api.get(`/api/admin/registrations/${uniqueId}`);
  return response.data;
}

export async function adminCreateMember(formData) {
  const response = await api.post('/api/admin/registrations', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}

export async function adminUpdateMember(uniqueId, formData) {
  const response = await api.put(`/api/admin/registrations/${uniqueId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}

export async function deleteRegistration(uniqueId) {
  const response = await api.delete(`/api/admin/registrations/${uniqueId}`);
  return response.data;
}

// ─── Gallery API ──────────────────────────────────────────────────────────────

export async function getGalleryImages(params = {}) {
  const response = await api.get('/api/gallery', { params });
  return response.data;
}

export async function uploadGalleryImage(formData) {
  const response = await api.post('/api/admin/gallery/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}

export async function deleteGalleryImage(id) {
  const response = await api.delete(`/api/admin/gallery/${id}`);
  return response.data;
}

export default api;
