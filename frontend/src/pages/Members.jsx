// frontend/src/pages/Members.jsx
// Public Member Directory (Read-only for normal users)

import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Search,
  MapPin,
  Calendar,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Award,
} from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { getPublicMembers } from '../services/api.js';

export default function Members() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selectedGender, setSelectedGender] = useState('ALL');

  const loadMembers = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getPublicMembers();
      if (res.success) {
        setMembers(res.data || []);
      } else {
        setError(res.message || 'Could not load members directory.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load members directory. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const filteredMembers = useMemo(() => {
    const q = search.trim().toLowerCase();
    return members.filter((m) => {
      const matchesSearch =
        !q ||
        m.fullName?.toLowerCase().includes(q) ||
        m.uniqueId?.toLowerCase().includes(q) ||
        m.city?.toLowerCase().includes(q);

      const matchesGender =
        selectedGender === 'ALL' ||
        (m.gender && m.gender.toUpperCase() === selectedGender);

      return matchesSearch && matchesGender;
    });
  }, [members, search, selectedGender]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Hero Banner */}
      <section
        className="relative text-white py-12 sm:py-16 px-4 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0d1b4b 0%, #1a3a8f 50%, #0d1b4b 100%)',
        }}
      >
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 shadow-xl bg-ualg-gold/20 border-2 border-ualg-gold/50">
            <Users className="w-8 h-8 text-ualg-gold" />
          </div>

          <p className="text-ualg-gold font-black tracking-widest text-xs sm:text-sm uppercase mb-2">
            મજીગામ ના રાજા • MAJIGAM NA RAJA
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 tracking-tight">
            મંડળ સભ્યો <span className="text-ualg-gold">(Members)</span>
          </h1>
          <p className="text-blue-200 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Registered Members of MAJIGAM NA RAJA. Official directory managed by mandir administration.
          </p>

          <div className="inline-flex items-center gap-2 mt-4 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-ualg-gold">
            <ShieldCheck className="w-4 h-4 text-ualg-gold" />
            <span>Official Registered Members ({members.length})</span>
          </div>
        </div>
      </section>

      {/* Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search member by name, member ID, or city..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ualg-navy/20 focus:border-ualg-navy transition-all"
              />
            </div>

            {/* Gender Filters */}
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              {['ALL', 'MALE', 'FEMALE'].map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGender(g)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap ${
                    selectedGender === g
                      ? 'bg-ualg-navy text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {g === 'ALL' ? 'All Members' : g.charAt(0) + g.slice(1).toLowerCase()}
                </button>
              ))}

              <button
                onClick={loadMembers}
                className="p-2.5 rounded-xl text-gray-600 hover:bg-gray-100 border border-gray-200 transition-colors"
                title="Refresh"
                aria-label="Refresh list"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* State displays */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-6 text-center mb-8">
            <p className="font-semibold mb-2">Error Loading Members</p>
            <p className="text-sm text-red-600 mb-4">{error}</p>
            <button
              onClick={loadMembers}
              className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div
                key={n}
                className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm animate-pulse flex flex-col items-center"
              >
                <div className="w-24 h-24 rounded-full bg-gray-200 mb-4" />
                <div className="w-3/4 h-4 bg-gray-200 rounded mb-2" />
                <div className="w-1/2 h-3 bg-gray-100 rounded mb-4" />
                <div className="w-full h-9 bg-gray-100 rounded-xl" />
              </div>
            ))}
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-sm max-w-lg mx-auto">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-800 mb-1">No Members Found</h3>
            <p className="text-sm text-gray-500 mb-6">
              {search
                ? `No registered members match "${search}". Try another keyword.`
                : 'No registered members in the directory yet.'}
            </p>
            {search && (
              <button
                onClick={() => setSearch('')}
                className="px-4 py-2 rounded-xl bg-ualg-navy text-white text-xs font-bold hover:bg-ualg-blue transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMembers.map((m) => (
              <div
                key={m.uniqueId}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col group"
              >
                {/* Card Top Accent */}
                <div className="h-1.5 bg-gradient-to-r from-ualg-navy via-ualg-blue to-ualg-gold" />

                <div className="p-5 flex flex-col items-center text-center flex-1">
                  {/* Photo with frame */}
                  <div className="relative mb-3.5">
                    <img
                      src={m.photoUrl}
                      alt={m.fullName}
                      className="w-24 h-24 rounded-full object-cover border-4 border-amber-100 shadow-md group-hover:scale-105 transition-transform duration-200 bg-gray-50"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/96?text=MNR';
                      }}
                    />
                    <div className="absolute -bottom-1 -right-1 bg-ualg-gold text-ualg-navy p-1 rounded-full shadow border-2 border-white">
                      <Award className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Name & ID */}
                  <h3 className="text-base font-black text-gray-900 leading-snug mb-1 line-clamp-1">
                    {m.fullName}
                  </h3>
                  <div className="flex items-center justify-center gap-1.5 flex-wrap mb-3">
                    <span className="font-mono text-xs text-ualg-blue bg-blue-50 px-2.5 py-0.5 rounded-full font-bold">
                      {m.uniqueId}
                    </span>
                    <span className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200/60 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      {m.position || 'Member'}
                    </span>
                  </div>

                  {/* Badges / Info */}
                  <div className="w-full grid grid-cols-2 gap-1.5 text-xs text-gray-600 mb-4 bg-gray-50/80 p-2 rounded-xl border border-gray-100">
                    <div>
                      <span className="text-[10px] text-gray-400 block font-semibold uppercase">Age</span>
                      <span className="font-bold text-gray-800">{m.age ? `${m.age} yrs` : '—'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block font-semibold uppercase">Gender</span>
                      <span className="font-bold text-gray-800">{m.gender || '—'}</span>
                    </div>
                    {m.city && (
                      <div className="col-span-2 pt-1 border-t border-gray-100 flex items-center justify-center gap-1 text-[11px] text-gray-500 font-medium">
                        <MapPin className="w-3 h-3 text-ualg-gold" />
                        <span className="truncate">{m.city}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Link: View Official ID Card */}
                  <div className="w-full mt-auto">
                    <Link
                      to={`/id/${m.uniqueId}`}
                      className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-ualg-navy text-white text-xs font-bold hover:bg-ualg-blue active:scale-98 transition-all duration-200 shadow-sm"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View ID Card</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
