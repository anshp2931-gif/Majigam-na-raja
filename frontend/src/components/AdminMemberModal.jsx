// frontend/src/components/AdminMemberModal.jsx
// Modal for Admin to Register a new member or Edit an existing member

import { useState, useEffect } from 'react';
import {
  X,
  User,
  Hash,
  Phone,
  Calendar,
  Mail,
  MapPin,
  Camera,
  AlertCircle,
  CheckCircle2,
  Award,
} from 'lucide-react';
import { ButtonLoading } from './Loading.jsx';
import { adminCreateMember, adminUpdateMember } from '../services/api.js';

export default function AdminMemberModal({ isOpen, onClose, member = null, onSuccess }) {
  const isEdit = Boolean(member && member.uniqueId);

  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    mobileNumber: '',
    dateOfBirth: '',
    gender: 'Male',
    email: '',
    city: '',
    position: 'Member',
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (member) {
        setFormData({
          fullName: member.fullName || '',
          age: member.age ? String(member.age) : '',
          mobileNumber: member.mobileNumber || '',
          dateOfBirth: member.dateOfBirth ? member.dateOfBirth.slice(0, 10) : '',
          gender: member.gender || 'Male',
          email: member.email || '',
          city: member.city || '',
          position: member.position || 'Member',
        });
        setPhotoPreview(member.photoUrl || '');
      } else {
        setFormData({
          fullName: '',
          age: '',
          mobileNumber: '',
          dateOfBirth: '',
          gender: 'Male',
          email: '',
          city: '',
          position: 'Member',
        });
        setPhotoPreview('');
      }
      setPhotoFile(null);
      setError('');
      setFieldErrors({});
    }
  }, [isOpen, member]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.type)) {
      setFieldErrors((prev) => ({ ...prev, photo: 'Photo must be JPG, PNG, or WEBP' }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFieldErrors((prev) => ({ ...prev, photo: 'Photo size must not exceed 5MB' }));
      return;
    }

    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
    setFieldErrors((prev) => ({ ...prev, photo: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    // Client-side quick checks
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.age || Number(formData.age) < 1 || Number(formData.age) > 120) {
      errs.age = 'Enter a valid age (1-120)';
    }
    if (!formData.mobileNumber.trim() || !/^[6-9]\d{9}$/.test(formData.mobileNumber.trim())) {
      errs.mobileNumber = 'Enter a valid 10-digit Indian mobile number';
    }
    if (!formData.dateOfBirth) errs.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) errs.gender = 'Please select a gender';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Enter a valid email address';
    }
    if (!isEdit && !photoFile) {
      errs.photo = 'Profile photo is required for new registration';
    }

    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append('fullName', formData.fullName.trim());
      data.append('age', formData.age);
      data.append('mobileNumber', formData.mobileNumber.trim());
      data.append('dateOfBirth', formData.dateOfBirth);
      data.append('gender', formData.gender);
      data.append('email', formData.email.trim());
      data.append('city', formData.city.trim());
      data.append('position', (formData.position || 'Member').trim());

      if (photoFile) {
        data.append('photo', photoFile);
      }

      let res;
      if (isEdit) {
        res = await adminUpdateMember(member.uniqueId, data);
      } else {
        res = await adminCreateMember(data);
      }

      if (res.success) {
        onSuccess?.(res.data, isEdit ? 'Member updated successfully!' : 'Member registered successfully!');
        onClose();
      } else {
        setError(res.message || 'Operation failed. Please try again.');
        if (res.errors) setFieldErrors(res.errors);
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to save member. Please check details.';
      setError(msg);
      if (err.response?.data?.errors) {
        setFieldErrors(err.response.data.errors);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-ualg-navy text-white px-6 py-5 flex items-center justify-between border-b border-white/10">
          <div>
            <h2 className="text-lg font-black tracking-wide">
              {isEdit ? 'Edit Member Details' : 'Register New Member'}
            </h2>
            <p className="text-ualg-gold text-xs font-semibold tracking-wider uppercase">
              {isEdit ? `Editing ID: ${member?.uniqueId}` : 'Admin Membership Creation'}
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="p-2 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl p-3 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Photo Upload Area */}
          <div className="flex flex-col items-center justify-center pb-2">
            <div className="relative">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover border-4 border-ualg-gold shadow-md"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                  <User className="w-10 h-10" />
                </div>
              )}
              <label
                htmlFor="modal-photo"
                className="absolute bottom-0 right-0 p-2 bg-ualg-navy text-white rounded-full shadow hover:bg-ualg-blue cursor-pointer transition-colors"
                title="Upload Photo"
              >
                <Camera className="w-4 h-4" />
                <input
                  id="modal-photo"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-[11px] text-gray-400 mt-2 font-medium">
              {isEdit ? 'Click camera icon to change photo (optional)' : 'Upload member profile photo (JPG, PNG, max 5MB)'}
            </p>
            {fieldErrors.photo && (
              <p className="text-red-500 text-xs mt-1 font-semibold">⚠ {fieldErrors.photo}</p>
            )}
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter member's full name"
                className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-ualg-navy/20 ${
                  fieldErrors.fullName ? 'border-red-400 bg-red-50/20' : 'border-gray-200'
                }`}
              />
            </div>
            {fieldErrors.fullName && (
              <p className="text-red-500 text-xs mt-1">⚠ {fieldErrors.fullName}</p>
            )}
          </div>

          {/* Age & Gender Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Age <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="1"
                  max="120"
                  placeholder="e.g. 25"
                  className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-ualg-navy/20 ${
                    fieldErrors.age ? 'border-red-400 bg-red-50/20' : 'border-gray-200'
                  }`}
                />
              </div>
              {fieldErrors.age && (
                <p className="text-red-500 text-xs mt-1">⚠ {fieldErrors.age}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-ualg-navy/20 bg-white"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Mobile & Date of Birth Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <span className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-semibold">+91</span>
                <input
                  type="tel"
                  name="mobileNumber"
                  maxLength={10}
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="10-digit mobile"
                  className={`w-full pl-16 pr-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-ualg-navy/20 ${
                    fieldErrors.mobileNumber ? 'border-red-400 bg-red-50/20' : 'border-gray-200'
                  }`}
                />
              </div>
              {fieldErrors.mobileNumber && (
                <p className="text-red-500 text-xs mt-1">⚠ {fieldErrors.mobileNumber}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-ualg-navy/20 ${
                    fieldErrors.dateOfBirth ? 'border-red-400 bg-red-50/20' : 'border-gray-200'
                  }`}
                />
              </div>
              {fieldErrors.dateOfBirth && (
                <p className="text-red-500 text-xs mt-1">⚠ {fieldErrors.dateOfBirth}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-ualg-navy/20 ${
                  fieldErrors.email ? 'border-red-400 bg-red-50/20' : 'border-gray-200'
                }`}
              />
            </div>
            {fieldErrors.email && (
              <p className="text-red-500 text-xs mt-1">⚠ {fieldErrors.email}</p>
            )}
          </div>

          {/* City & Position Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">City / Village</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g. Majigam"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-ualg-navy/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Position / Role</label>
              <div className="relative">
                <Award className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="e.g. Member, President"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-ualg-navy/20"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold text-xs hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary py-2.5 px-6 text-xs font-bold flex items-center justify-center gap-2 shadow-md"
            >
              {loading ? (
                <ButtonLoading text={isEdit ? 'Updating...' : 'Registering...'} />
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isEdit ? 'Save Changes' : 'Create Member'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
