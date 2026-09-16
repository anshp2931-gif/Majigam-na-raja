// frontend/src/pages/AllRegistrations.jsx
// One-page view showing every registration member in a single admin list with Add & Edit support

import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Eye,
  ExternalLink,
  LogOut,
  RefreshCw,
  Search,
  User,
  Users,
  Plus,
  Pencil,
} from 'lucide-react';
import { ButtonLoading } from '../components/Loading.jsx';
import AdminMemberModal from '../components/AdminMemberModal.jsx';
import { adminLogout, getRegistrations } from '../services/api.js';

export default function AllRegistrations() {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState('');

  const [memberModalOpen, setMemberModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  const loadMembers = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await getRegistrations({ page: 1, limit: 1000, search: '', bloodGroup: '', city: '' });
      if (res.success) {
        setMembers(res.data || []);
      } else {
        setError(res.message || 'Could not load registrations.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load registrations.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const filteredMembers = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return members;

    return members.filter((member) => {
      return (
        member.fullName?.toLowerCase().includes(term) ||
        member.uniqueId?.toLowerCase().includes(term) ||
        member.mobileNumber?.toLowerCase().includes(term) ||
        member.email?.toLowerCase().includes(term)
      );
    });
  }, [members, search]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await adminLogout();
    } catch {}
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 overflow-x-hidden">
      <header className="bg-ualg-navy shadow-lg sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="મજીગામ ના રાજા Logo"
              className="w-9 h-9 rounded-full object-cover border-2 border-ualg-gold flex-shrink-0 bg-white"
            />
            <div>
              <p className="text-white font-black text-sm leading-none">મજીગામ ના રાજા</p>
              <p className="text-ualg-gold text-[10px] font-bold tracking-wider uppercase">MAJIGAM NA RAJA • Admin Portal</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/members"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 text-xs text-blue-200 hover:text-white transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" /> View Public Directory
            </Link>

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-2 text-sm text-blue-300 hover:text-white transition-colors disabled:opacity-50"
            >
              {loggingOut ? <ButtonLoading text="Logging out..." /> : <><LogOut className="w-4 h-4" /> Logout</>}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Users className="w-6 h-6 text-ualg-navy" />
              <h1 className="text-2xl font-black text-ualg-navy">All Registration Members</h1>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {members.length} member{members.length === 1 ? '' : 's'} registered
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setEditingMember(null);
                setMemberModalOpen(true);
              }}
              className="btn-primary bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 text-sm px-4 py-2.5 shadow-sm"
            >
              <Plus className="w-4 h-4" /> Add Member
            </button>

            <button
              onClick={() => navigate('/admin/dashboard')}
              className="btn-outline flex items-center gap-2 text-sm px-4 py-2.5"
            >
              <ArrowLeft className="w-4 h-4" /> Dashboard
            </button>

            <button
              onClick={loadMembers}
              className="btn-outline flex items-center gap-2 text-sm px-4 py-2.5"
            >
              <RefreshCw className="w-4 h-4" /> Refresh
            </button>
          </div>
        </div>

        <div className="card shadow-sm mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by member name, ID, mobile or email..."
              className="input-field pl-9 text-sm"
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="card text-center py-12">
            <RefreshCw className="w-6 h-6 text-ualg-blue animate-spin mx-auto mb-3" />
            <p className="text-gray-500">Loading registrations...</p>
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="card text-center py-12">
            <Users className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No registrations found.</p>
          </div>
        ) : (
          <div className="card shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {['Photo', 'Member ID', 'Full Name', 'Position', 'Age', 'Mobile', 'Date of Birth', 'Gender', 'Email', 'Registered On', 'Actions'].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredMembers.map((r) => (
                    <tr key={r.uniqueId} className="hover:bg-blue-50/40 transition-colors">
                      <td className="px-4 py-3">
                        <img
                          src={r.photoUrl}
                          alt={r.fullName}
                          className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                          onError={(e) => { e.target.src = 'https://via.placeholder.com/40?text=?'; }}
                        />
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-ualg-blue font-semibold whitespace-nowrap">
                        {r.uniqueId}
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">{r.fullName}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-full uppercase">
                          {r.position || 'Member'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{r.age}</td>
                      <td className="px-4 py-3 text-gray-600 font-mono text-xs whitespace-nowrap">{r.mobileNumber}</td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                        {r.dateOfBirth ? new Date(r.dateOfBirth).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                      </td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{r.gender || '—'}</td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{r.email || '—'}</td>
                      <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                        {new Date(r.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              setEditingMember(r);
                              setMemberModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-500 hover:text-white transition-colors"
                            title="Edit member"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <Link
                            to={`/admin/registration/${r.uniqueId}`}
                            className="p-1.5 rounded-lg bg-ualg-blue/10 text-ualg-blue hover:bg-ualg-blue hover:text-white transition-colors"
                            title="View details"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Add / Edit Member Modal */}
      <AdminMemberModal
        isOpen={memberModalOpen}
        onClose={() => setMemberModalOpen(false)}
        member={editingMember}
        onSuccess={() => {
          loadMembers();
        }}
      />
    </div>
  );
}
