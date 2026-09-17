// frontend/src/gallery/services/galleryApi.js
import api from '../../services/api.js';

export async function fetchGallery({ page = 1, limit = 20, type, year } = {}) {
  const params = { page, limit };
  if (type && type !== 'all') params.type = type;
  if (year && year !== 'all') params.year = year;
  const res = await api.get('/api/gallery', { params });
  return res.data;
}

export async function fetchGalleryYears() {
  const res = await api.get('/api/gallery/years');
  return res.data;
}

export async function uploadGalleryImage(formData) {
  const res = await api.post('/api/admin/gallery/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
}

export async function deleteGalleryImage(id) {
  const res = await api.delete(`/api/admin/gallery/${id}`);
  return res.data;
}
