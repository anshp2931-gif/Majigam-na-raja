// frontend/src/pages/About.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, MapPin, Heart, Users, Palette, Zap, Flag, ArrowRight, Mountain, 
  Sparkles, Award, Flame, ShieldCheck, ExternalLink, X, ChevronLeft, ChevronRight,
  Languages, Compass, Clock, CheckCircle2, Star, ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// 10 Photographs of the Kedarnath Dham 2024 Festival
const KEDARNATH_PHOTOS = [
  { src: '/majigamnaraja2024 (1).jpeg', titleGu: '૭૦ ફૂટ ઊંચું કેદારનાથ ધામ પ્રવેશદ્વાર', titleEn: '70-Foot Kedarnath Dham Grand Entrance', tagGu: 'મુખ્ય થીમ', tagEn: 'Main Theme' },
  { src: '/majigamnaraja2024 (2).jpeg', titleGu: 'મજીગામ ના રાજા અલૌકિક દર્શન', titleEn: 'Divine Darshan of Majigam Na Raja', tagGu: 'દિવ્ય દર્શન', tagEn: 'Divine Darshan' },
  { src: '/majigamnaraja2024 (3).jpeg', titleGu: 'શ્રી હર્ષ સંઘવી દ્વારા મુલાકાત અને સન્માન', titleEn: 'Dignitary Visit by Shri Harsh Sanghavi', tagGu: 'વિશેષ મુલાકાત', tagEn: 'VIP Visit' },
  { src: '/majigamnaraja2024 (4).jpeg', titleGu: 'રાત્રિના સમયે ઝળહળતો પંડાલ', titleEn: 'Illuminated Pandal by Night', tagGu: 'લાઇટિંગ ડેકોરેશન', tagEn: 'Night View' },
  { src: '/majigamnaraja2024 (5).jpeg', titleGu: 'હિમાલયની પર્વતમાળાઓનો નજારો', titleEn: 'Himalayan Ridge Replica Aesthetics', tagGu: 'કલા કારીગરી', tagEn: 'Art & Craft' },
  { src: '/majigamnaraja2024 (6).jpeg', titleGu: 'હજારો ભક્તોની વિશાળ જનમેદની', titleEn: 'Sea of Devotees Awaiting Darshan', tagGu: 'જનમેદની', tagEn: 'Devotees' },
  { src: '/majigamnaraja2024 (7).jpeg', titleGu: 'મહા આરતી અને દિવ્ય જ્યોત', titleEn: 'Grand Maha Aarti Celebration', tagGu: 'મહા આરતી', tagEn: 'Maha Aarti' },
  { src: '/majigamnaraja2024 (8).jpeg', titleGu: 'યુવા કાર્યકરોની અદભુત ટીમવર્ક', titleEn: 'Youth Volunteers & Dedication', tagGu: 'યુવા શક્તિ', tagEn: 'Youth Power' },
  { src: '/majigamnaraja2024 (9).jpeg', titleGu: 'પંડાલની આંતરિક ભવ્યતા', titleEn: 'Interior Sanctum Architecture', tagGu: 'મંદિર પરિસર', tagEn: 'Sanctum' },
  { src: '/majigamnaraja2024 (10).jpeg', titleGu: 'શ્રી ગણેશજીની મનોહર પ્રતિમા', titleEn: 'Idol of Lord Ganesha in Kedarnath Sanctum', tagGu: 'મંગલમૂર્તિ', tagEn: 'Mangalmurti' },
];

export default function About() {
  // Primary language: 'gu' (Gujarati First), Secondary: 'en' (English)
  const [lang, setLang] = useState('gu');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev > 0 ? prev - 1 : KEDARNATH_PHOTOS.length - 1));
      }
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev < KEDARNATH_PHOTOS.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  const isGu = lang === 'gu';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      <Navbar />

      {/* Floating / Sticky Quick Language Switcher Bar */}
      <div className="sticky top-16 sm:top-20 z-40 bg-slate-900/90 backdrop-blur-md border-b border-amber-500/20 py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-300/90">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="hidden sm:inline">ભાષા પ્રાથમિકતા / Language:</span>
            <span className="font-bold text-white uppercase tracking-wider text-xs bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 rounded-full">
              {isGu ? 'ગુજરાતી મુખ્ય' : 'English Primary'}
            </span>
          </div>

          <div className="inline-flex p-1 bg-slate-950/80 rounded-full border border-amber-500/30 shadow-inner">
            <button
              type="button"
              onClick={() => setLang('gu')}
              className={`flex items-center gap-1.5 px-3.5 sm:px-5 py-1.5 rounded-full text-xs sm:text-sm font-black transition-all duration-300 ${
                isGu
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 shadow-md shadow-amber-500/30 scale-105'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <span className="text-sm">🇮🇳</span>
              <span>ગુજરાતી</span>
              <span className="hidden md:inline text-[10px] opacity-80">(મુખ્ય)</span>
            </button>

            <button
              type="button"
              onClick={() => setLang('en')}
              className={`flex items-center gap-1.5 px-3.5 sm:px-5 py-1.5 rounded-full text-xs sm:text-sm font-black transition-all duration-300 ${
                !isGu
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 shadow-md shadow-amber-500/30 scale-105'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Languages className="w-3.5 h-3.5" />
              <span>English</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1">
        {/* ========================================================================= */}
        {/* HERO SECTION WITH DIVINE AESTHETIC & GLOW */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-amber-500/20">
          {/* Background Ambient Radial Lights */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] md:w-[900px] h-[400px] md:h-[600px] bg-gradient-to-b from-orange-600/30 via-amber-500/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute top-1/3 -left-32 w-72 h-72 bg-ualg-blue/30 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute top-1/3 -right-32 w-72 h-72 bg-red-600/20 rounded-full blur-3xl pointer-events-none -z-10" />

          {/* Decorative Divine Shlok Banner */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/10 via-amber-500/25 to-amber-500/10 border border-amber-400/40 px-4 sm:px-6 py-2 rounded-full mb-6 shadow-lg shadow-amber-500/10 backdrop-blur-sm"
            >
              <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
              <span className="text-amber-300 font-black text-xs sm:text-sm tracking-widest uppercase">
                ॥ ૐ શ્રી ગણેશાય નમઃ ॥ • BAL GANESH YUVAK MANDAL
              </span>
              <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
            </motion.div>

            {/* Main Page Title (Gujarati First, English Subtitle) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-3">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-amber-200 to-amber-500 drop-shadow-[0_4px_25px_rgba(245,158,11,0.4)]">
                  મજીગામ ના રાજા
                </span>
              </h1>
              <p className="text-ualg-gold font-black text-lg sm:text-2xl md:text-3xl tracking-[0.25em] uppercase drop-shadow-md">
                MAJIGAM NA RAJA
              </p>
            </motion.div>

            {/* Subtitle / Punchline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 max-w-3xl mx-auto"
            >
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-200 leading-snug">
                {isGu ? (
                  <>
                    <span className="text-amber-400">૧૯૬૭ થી</span> શ્રદ્ધા, અખંડ ભક્તિ, યુવા એકતા અને સંસ્કૃતિનો અમર વારસો
                  </>
                ) : (
                  <>
                    A Glorious Legacy of <span className="text-amber-400">Faith, Unity & Tradition</span> Since 1967
                  </>
                )}
              </p>
              <p className="text-sm sm:text-base text-slate-400 mt-2 font-medium">
                {isGu
                  ? 'છાપરા ફળિયા, મજીગામ, ચીખલી (જિ. નવસારી, ગુજરાત) — બાલ ગણેશ યુવક મંડળ'
                  : 'Chhapra Faliya, Majigam, Chikhli, Navsari, Gujarat — Bal Ganesh Yuvak Mandal'}
              </p>
            </motion.div>

            {/* Quick Stat Pill Cards */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto"
            >
              {[
                { 
                  valueGu: '૫૯+ વર્ષ', 
                  valueEn: '59+ Years', 
                  labelGu: 'અવિરત ભવ્ય પરંપરા (૧૯૬૭)', 
                  labelEn: 'Legacy Since 1967', 
                  icon: Calendar, 
                  color: 'from-amber-500/20 to-orange-500/10',
                  border: 'border-amber-500/30'
                },
                { 
                  valueGu: '૭૦ ફૂટ', 
                  valueEn: '70 Feet', 
                  labelGu: 'કેદારનાથ ધામ રેપ્લિકા (૨૦૨૪)', 
                  labelEn: 'Kedarnath Dham 2024', 
                  icon: Mountain, 
                  color: 'from-blue-500/20 to-indigo-500/10',
                  border: 'border-blue-500/30'
                },
                { 
                  valueGu: '૧૦,૦૦૦+', 
                  valueEn: '10,000+', 
                  labelGu: 'દર વર્ષે શ્રદ્ધાળુ ભક્તો', 
                  labelEn: 'Devotees Every Year', 
                  icon: Users, 
                  color: 'from-emerald-500/20 to-teal-500/10',
                  border: 'border-emerald-500/30'
                },
                { 
                  valueGu: '૧૦૦% યુવા', 
                  valueEn: '100% Youth', 
                  labelGu: 'સમર્પિત સેવા અને એકતા', 
                  labelEn: 'Dedicated Community Service', 
                  icon: Zap, 
                  color: 'from-red-500/20 to-rose-500/10',
                  border: 'border-red-500/30'
                },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={i}
                    className={`bg-gradient-to-b ${stat.color} bg-slate-900/80 backdrop-blur-md rounded-2xl p-4 sm:p-5 border ${stat.border} shadow-xl hover:scale-[1.02] transition-transform text-left flex flex-col justify-between`}
                  >
                    <Icon className="w-6 h-6 text-amber-400 mb-2" />
                    <div>
                      <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                        {isGu ? stat.valueGu : stat.valueEn}
                      </div>
                      <div className="text-xs sm:text-sm font-medium text-slate-300 mt-0.5">
                        {isGu ? stat.labelGu : stat.labelEn}
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
          
          {/* ========================================================================= */}
          {/* SECTION 1: OVERVIEW & MANDAL INTRODUCTION (GUJARATI FIRST) */}
          {/* ========================================================================= */}
          <section className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-10 md:p-14 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
              <div className="lg:w-1/3 flex-shrink-0 flex flex-col items-center text-center">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full blur-md opacity-75 group-hover:opacity-100 transition duration-500"></div>
                  <img 
                    src="/logo.png" 
                    alt="મજીગામ ના રાજા" 
                    className="relative w-36 h-36 sm:w-48 sm:h-48 rounded-full object-cover border-4 border-amber-400 bg-slate-900 shadow-2xl"
                  />
                </div>
                <h3 className="text-2xl font-black text-white mt-6">બાલ ગણેશ યુવક મંડળ</h3>
                <p className="text-amber-400 font-bold text-sm tracking-wider uppercase">Bal Ganesh Yuvak Mandal</p>
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> સ્થાપના: ઈ.સ. ૧૯૬૭ (Est. 1967)
                </div>
              </div>

              <div className="lg:w-2/3 space-y-5">
                <div className="inline-block">
                  <span className="text-amber-400 font-black text-xs sm:text-sm tracking-widest uppercase">
                    {isGu ? '॥ અમારો પરિચય ॥' : '॥ OUR SACRED STORY ॥'}
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">
                    {isGu 
                      ? 'દક્ષિણ ગુજરાતના ગણેશોત્સવનું ગૌરવશાળી પ્રતીક' 
                      : 'The Proud Icon of South Gujarat Ganeshotsav'}
                  </h2>
                </div>

                {isGu ? (
                  <>
                    <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                      <strong>મજીગામ ના રાજા</strong> એ ગુજરાત રાજ્યના નવસારી જિલ્લાના ચીખલી તાલુકાના મજીગામ, છાપરા ફળિયા ખાતે આવેલું પ્રસિદ્ધ અને પ્રતિષ્ઠિત <strong>બાલ ગણેશ યુવક મંડળ</strong> છે. વર્ષ <strong>૧૯૬૭</strong> માં સ્થાપિત આ મંડળે પેઢી દર પેઢી ભક્તિ, સામાજિક એકતા, સાંસ્કૃતિક ગૌરવ અને નિઃસ્વાર્થ સેવાભાવનો એક અનમોલ વારસો નિર્માણ કર્યો છે.
                    </p>
                    <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                      જે ઉત્સવ એક સમયે ગામની નાની ઉજવણીથી શરૂ થયો હતો, તે આજે સમગ્ર દક્ષિણ ગુજરાતના સૌથી ઉત્સુકતાપૂર્વક રાહ જોવાતા ગણેશોત્સવોમાં સ્થાન પામ્યો છે. દર વર્ષે ચીખલી અને તેની આસપાસના ગ્રામ્ય વિસ્તારો ઉપરાંત <strong>નવસારી, વલસાડ, સુરત, બારડોલી, બિલીમોરા</strong> અને અન્ય શહેરોમાંથી હજારો ભાવિક ભક્તો દર્શન અને દિવ્ય અનુભૂતિ મેળવવા આવે છે.
                    </p>
                    <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                      આ મહોત્સવ માત્ર ગણેશ સ્થાપના સુધી સીમિત નથી; તે યુવાનો, વડીલો, પરિવારો, કલાકારો અને સ્વયંસેવકોને શ્રદ્ધાના એક જ સૂત્રમાં બાંધતી એકતાનું જીવંત પ્રતીક છે.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                      <strong>Majigam Na Raja</strong> is an illustrious and celebrated <strong>Bal Ganesh Yuvak Mandal</strong> from Majigam, Chhapra Faliya, Chikhli, Navsari, Gujarat. Established in <strong>1967</strong>, the Mandal has nurtured a 59-year legacy of unshakeable devotion, grassroots community participation, vibrant cultural celebration, and selfless service spanning generations.
                    </p>
                    <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                      What began as a close-knit neighborhood celebration has flourished into one of the most anticipated and revered Ganeshotsav festivals in South Gujarat. Every year, devotees from Chikhli and neighboring villages, along with pilgrims from <strong>Navsari, Valsad, Surat, Bardoli, and Bilimora</strong>, gather to experience the divine majesty of Majigam Na Raja.
                    </p>
                    <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                      The celebration transcends traditional idol installation — it binds youth, families, elders, artisans, and volunteers under one shared spirit of devotion, harmony, and festivity.
                    </p>
                  </>
                )}

                {/* Dual-language Quick Badge */}
                <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold text-amber-300">
                  <span className="bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">#MajigamNaRaja</span>
                  <span className="bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">#ChikhliGaneshotsav</span>
                  <span className="bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">#BalGaneshYuvakMandal</span>
                  <span className="bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">#Since1967</span>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION 2: 59 YEARS OF LEGACY TIMELINE BANNER (1967 -> 2026) */}
          {/* ========================================================================= */}
          <section className="relative rounded-3xl overflow-hidden shadow-2xl border border-amber-500/30">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-amber-600 to-red-700 opacity-95" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent pointer-events-none" />
            
            <div className="relative p-8 sm:p-12 md:p-16 text-center text-white">
              <div className="inline-flex items-center justify-center gap-3 sm:gap-6 mb-4">
                <span className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tight drop-shadow-lg">૧૯૬૭</span>
                <div className="p-2 sm:p-3 bg-white/20 backdrop-blur-md rounded-full shadow-inner">
                  <ArrowRight className="w-6 h-6 sm:w-10 sm:h-10 text-white" />
                </div>
                <span className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tight drop-shadow-lg">૨૦૨૬</span>
              </div>

              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-wide drop-shadow-md">
                {isGu ? '૫૯ વર્ષની ગૌરવશાળી યાત્રા' : '59 Glorious Years of Sacred Journey'}
              </h2>
              
              <p className="text-base sm:text-xl md:text-2xl font-semibold text-amber-100 max-w-3xl mx-auto mt-4 leading-relaxed italic">
                {isGu
                  ? '“જે યાત્રા એક નાની શ્રદ્ધાથી શરૂ થઈ હતી, તે આજે હજારો હૃદયની પ્રેરણા અને ભક્તિનું ધામ બની ચૂકી છે.”'
                  : '“A pilgrimage that began with humble devotion now inspires thousands of hearts across generations.”'}
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-bold text-slate-900">
                <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-md">
                  ✨ ૫૯+ ગણેશોત્સવ આયોજન (59+ Editions)
                </div>
                <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-md">
                  🤝 અખંડ ગ્રામીણ એકતા (Community Brotherhood)
                </div>
                <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-md">
                  🚩 અવનવી થીમ અને કલાકારી (Innovative Themes)
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION 3: 6 PILLARS OF OUR MANDAL (VALUES & STRENGTH) */}
          {/* ========================================================================= */}
          <section className="space-y-8">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-amber-400 font-black text-xs sm:text-sm tracking-widest uppercase">
                {isGu ? '॥ આપણા પ્રેરક સ્તંભો ॥' : '॥ OUR CORE FOUNDATIONS ॥'}
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white mt-1">
                {isGu ? 'મજીગામ ના રાજાની ૬ દિવ્ય શક્તિઓ' : '6 Pillars of Strength & Inspiration'}
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mt-3">
                {isGu
                  ? 'અમારી સફળતા, લોકપ્રિયતા અને ભક્તિભાવ પાછળ આ ૬ પાયાના મૂલ્યો સમાયેલા છે.'
                  : 'The enduring values that drive our passion, service, and grandeur year after year.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Heart,
                  titleGu: 'અખૂટ શ્રદ્ધા અને ભક્તિ',
                  titleEn: 'Devotion & Spiritual Faith',
                  descGu: 'ગણેશજી પ્રત્યે સમર્પિત હૃદય. દરેક કાર્યની શરૂઆત બાપ્પાના આશીર્વાદ અને શુદ્ધ ભાવનાથી થાય છે.',
                  descEn: 'An unwavering spiritual bond. Every initiative begins with the sacred blessings of Lord Ganesha.',
                  color: 'from-amber-500/15 to-orange-500/5',
                  accent: 'text-amber-400',
                  border: 'border-amber-500/20'
                },
                {
                  icon: Users,
                  titleGu: 'સર્વસમાવેશક સામાજિક એકતા',
                  titleEn: 'Community Togetherness',
                  descGu: 'બાળકો, યુવાનો, વડીલો અને સર્વ જ્ઞાતિ-સમાજના લોકો એક પરિવાર બનીને ઉત્સવને સાર્થક બનાવે છે.',
                  descEn: 'Uniting families, youth, and elders across society under one harmonious, celebratory umbrella.',
                  color: 'from-blue-500/15 to-indigo-500/5',
                  accent: 'text-blue-400',
                  border: 'border-blue-500/20'
                },
                {
                  icon: Palette,
                  titleGu: 'અનોખી સર્જનાત્મકતા અને થીમ',
                  titleEn: 'Artistic Excellence & Grandeur',
                  descGu: 'દર વર્ષે નવો વિચાર, આકર્ષક પંડાલ અને પ્રેરણાદાયી થીમ જે સમગ્ર પંથકમાં ચર્ચાનું કેન્દ્ર બને છે.',
                  descEn: 'Year after year, introducing awe-inspiring themes, breathtaking pandals, and fine craftsmanship.',
                  color: 'from-purple-500/15 to-fuchsia-500/5',
                  accent: 'text-purple-400',
                  border: 'border-purple-500/20'
                },
                {
                  icon: Zap,
                  titleGu: 'યુવા શક્તિ અને અથાક પરિશ્રમ',
                  titleEn: 'Youth Power & Tireless Service',
                  descGu: 'સ્થાનિક યુવાનોની મહેનત, રાત-દિવસનો પરિશ્રમ અને નિઃસ્વાર્થ સેવાભાવ આ મંડળનો વાસ્તવિક પાયો છે.',
                  descEn: 'The unstoppable energy, discipline, and passion of local youth working day and night.',
                  color: 'from-amber-500/15 to-yellow-500/5',
                  accent: 'text-yellow-400',
                  border: 'border-yellow-500/20'
                },
                {
                  icon: Calendar,
                  titleGu: 'પરંપરા અને સંસ્કૃતિનું જતન',
                  titleEn: 'Preserving Sacred Culture',
                  descGu: '૫૯ વર્ષ જૂની ધાર્મિક વિધિઓ, પારંપરિક આરતી, પૂજન અને સંસ્કારોનું શુદ્ધ રૂપે પાલન.',
                  descEn: 'Safeguarding traditional Vedic rituals, devotional chants, and festive Gujarati ethos.',
                  color: 'from-emerald-500/15 to-teal-500/5',
                  accent: 'text-emerald-400',
                  border: 'border-emerald-500/20'
                },
                {
                  icon: Flag,
                  titleGu: 'ભવ્ય ઉત્સવ અને આગમન યાત્રા',
                  titleEn: 'Aagman & Visarjan Splendor',
                  descGu: 'નાસિક ઢોલ, ગુલાલ અને ભક્તિમય વાતાવરણ વચ્ચે નિકળતી યાદગાર આગમન તથા વિસર્જન યાત્રાઓ.',
                  descEn: 'Mesmerizing processions filled with vibrant dhol beats, flowers, colors, and devotional joy.',
                  color: 'from-red-500/15 to-rose-500/5',
                  accent: 'text-red-400',
                  border: 'border-red-500/20'
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.2 }}
                    className={`bg-gradient-to-b ${item.color} bg-slate-900/90 rounded-2xl p-7 border ${item.border} shadow-xl flex flex-col justify-between`}
                  >
                    <div>
                      <div className={`w-12 h-12 rounded-xl bg-slate-800/90 flex items-center justify-center ${item.accent} mb-5 shadow-inner`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-black text-white mb-2">
                        {isGu ? item.titleGu : item.titleEn}
                      </h3>
                      <p className="text-xs text-amber-400/80 font-bold uppercase tracking-wider mb-3">
                        {isGu ? item.titleEn : item.titleGu}
                      </p>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {isGu ? item.descGu : item.descEn}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION 4: THE ICONIC 2024 KEDARNATH DHAM THEME & VIP RECOGNITION */}
          {/* ========================================================================= */}
          <section className="bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 rounded-3xl border-2 border-amber-500/30 p-6 sm:p-10 md:p-14 shadow-2xl relative overflow-hidden">
            {/* Top Accent Badge */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                  <Mountain className="w-6 h-6 text-slate-950" />
                </div>
                <div>
                  <span className="text-amber-400 font-black text-xs sm:text-sm tracking-widest uppercase">
                    {isGu ? 'સુવર્ણ અધ્યાય • ગણેશોત્સવ ૨૦૨૪' : 'HISTORIC CHAPTER • GANESHOTSAV 2024'}
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-black text-white">
                    {isGu ? 'ભવ્ય કેદારનાથ ધામ પ્રતિકૃતિ' : 'The Magnificent Kedarnath Dham Pandal'}
                  </h2>
                </div>
              </div>

              <span className="px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-xs sm:text-sm">
                🏔️ ૭૦ ફૂટ ઊંચાઈ (70-Foot Landmark)
              </span>
            </div>

            {/* Content & Story Behind Kedarnath Dham */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5 text-slate-300 text-base sm:text-lg leading-relaxed">
                {isGu ? (
                  <>
                    <p>
                      મંડળની યાત્રાનું સૌથી ભવ્ય અને યાદગાર શિખર એટલે <strong>ગણેશોત્સવ ૨૦૨૪</strong>, જ્યારે મજીગામ ના રાજા દ્વારા <strong>લગભગ ૭૦ ફૂટ ઊંચી કેદારનાથ ધામ-પ્રેરિત ભવ્ય પ્રતિકૃતિ (Pandal)</strong> સાકાર કરવામાં આવી હતી.
                    </p>
                    <p>
                      આ ભવ્ય થીમ પાછળનો હેતુ અત્યંત પવિત્ર હતો — <em>જે વૃદ્ધ ગ્રામજનો, માતા-પિતા કે આર્થિક રીતે સક્ષમ ન હોય તેવા શ્રદ્ધાળુઓ ઉત્તરાખંડ હિમાલય સ્થિત કેદારનાથ જઈ શકતા નથી, તેઓ પોતાના જ આંગણે બાપ્પાના સાનિધ્યમાં કેદારનાથ યાત્રાની દિવ્ય અનુભૂતિ કરી શકે!</em>
                    </p>
                    <p>
                      આ ૧૦ દિવસ દરમિયાન મજીગામનું છાપરા ફળિયું દક્ષિણ ગુજરાતના સૌથી મોટા આકર્ષણ કેન્દ્રમાં ફેરવાઈ ગયું હતું. આ ભવ્ય પ્રોજેક્ટે સ્થાનિક યુવાનોની ઈજનેરી કુશળતા, સર્જનાત્મકતા, અડગ ટીમવર્ક અને સમર્પણને ઉજાગર કર્યું.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      One of the most monumental milestones in the Mandal’s history was achieved during <strong>Ganeshotsav 2024</strong>, when Majigam Na Raja unveiled an astonishing <strong>70-foot-tall architectural replica inspired by the sacred Kedarnath Dham</strong>.
                    </p>
                    <p>
                      The noble inspiration behind this grand creation was deeply touching — <em>to provide elderly villagers and devotees who may not have the physical health or financial means to trek to the high Himalayas of Uttarakhand an authentic spiritual experience of Kedarnath right here at home!</em>
                    </p>
                    <p>
                      Throughout the 10-day celebration, Chhapra Faliya in Majigam became a major pilgrimage hotspot in South Gujarat, welcoming tens of thousands of devotees and standing as a testament to youth engineering and dedication.
                    </p>
                  </>
                )}

                {/* VIP Dignitary Visit Card */}
                <div className="bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-amber-500/10 border-2 border-amber-500/40 rounded-2xl p-5 sm:p-6 shadow-xl relative mt-6">
                  <div className="flex items-start gap-3">
                    <Award className="w-8 h-8 text-amber-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg sm:text-xl font-black text-amber-300">
                        {isGu ? 'વિશેષ સન્માન અને મુલાકાત' : 'Special Dignitary Recognition'}
                      </h4>
                      <p className="text-white font-bold text-sm sm:text-base mt-1 leading-relaxed">
                        {isGu
                          ? 'ગુજરાત રાજ્યના નાયબ મુખ્યમંત્રી / ગૃહ રાજ્યમંત્રી શ્રી હર્ષ સંઘવીએ ખાસ મજીગામ પંડાલની મુલાકાત લઈ સ્થાનિક યુવાનોની મહેનત અને અદભુત કારીગરીની મુક્તકંઠે પ્રશંસા કરી હતી.'
                          : 'Shri Harsh Sanghavi (Deputy Chief Minister / Home Minister, Govt. of Gujarat) visited the grand pandal and applauded the tireless craftsmanship and unity of the local youth.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hero Image Showcase */}
              <div className="lg:col-span-5">
                <div 
                  onClick={() => setLightboxIndex(0)}
                  className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-2xl border border-amber-500/30"
                >
                  <img 
                    src="/majigamnaraja2024 (1).jpeg" 
                    alt="Kedarnath Dham 2024 Majigam Na Raja" 
                    className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity flex flex-col justify-end p-6">
                    <span className="text-amber-400 text-xs font-black uppercase tracking-widest">
                      {isGu ? '🔍 ક્લિક કરીને મોટું જુઓ' : '🔍 Click for Full View'}
                    </span>
                    <h4 className="text-white font-black text-xl mt-1">
                      {isGu ? 'કેદારનાથ ધામ થીમ ૨૦૨૪' : 'Kedarnath Dham 2024'}
                    </h4>
                    <p className="text-slate-300 text-xs mt-1">
                      {isGu ? '૭૦ ફૂટ ઊંચી કળાત્મક પ્રતિકૃતિ' : '70-ft majestic replica at Chhapra Faliya'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 10-Photo Interactive Grid with Captions & Lightbox */}
            <div className="mt-14 pt-10 border-t border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
                    <Palette className="w-6 h-6 text-amber-400" />
                    {isGu ? 'કેદારનાથ મહોત્સવ ફોટો ગેલેરી (૧૦ ચિત્રો)' : 'Kedarnath Festival Photo Gallery (10 Images)'}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">
                    {isGu ? 'કોઈપણ ફોટો પર ક્લિક કરી પૂર્ણ કદમાં દર્શન કરો' : 'Click on any photo to open high-definition view'}
                  </p>
                </div>

                <div className="text-xs font-bold text-amber-300 bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700">
                  {isGu ? '૧૦ દિવ્ય પળો' : '10 Moments Captured'}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
                {KEDARNATH_PHOTOS.map((photo, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setLightboxIndex(index)}
                    className="relative group rounded-xl overflow-hidden cursor-pointer aspect-square bg-slate-800 border border-slate-700/80 shadow-lg"
                  >
                    <img
                      src={photo.src}
                      alt={photo.titleEn}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-2.5">
                      <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider">
                        {isGu ? photo.tagGu : photo.tagEn}
                      </span>
                      <p className="text-white text-xs font-bold truncate">
                        {isGu ? photo.titleGu : photo.titleEn}
                      </p>
                    </div>
                    {/* Index Badge */}
                    <div className="absolute top-2 left-2 bg-slate-950/70 backdrop-blur-sm text-[10px] text-amber-300 font-bold px-1.5 py-0.5 rounded">
                      #{index + 1}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION 5: WHAT MAKES US SPECIAL (DEVOTIONAL HIGHLIGHTS) */}
          {/* ========================================================================= */}
          <section className="space-y-8">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-amber-400 font-black text-xs sm:text-sm tracking-widest uppercase">
                {isGu ? '॥ વિશેષતાઓ ॥' : '॥ WHAT SETS US APART ॥'}
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white mt-1">
                {isGu ? 'શા માટે મજીગામ ના રાજા સૌના હૃદયમાં વસે છે?' : 'Why Majigam Na Raja is Truly Special'}
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mt-2">
                {isGu 
                  ? 'માત્ર એક મૂર્તિ સ્થાપના નહીં, પણ સમર્પણ, ભાવ અને ભક્તિનો જીવંત ઉત્સવ.' 
                  : 'More than an idol installation — a living celebration of faith, unity, and heritage.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: Sparkles,
                  titleGu: 'અલૌકિક મૂર્તિ અને દિવ્ય શણગાર',
                  titleEn: 'Divine Idol & Majestic Decor',
                  descGu: 'શ્રી ગણેશજીની અત્યંત મનોહર, નયનરમ્ય અને શાંત મુદ્રા ધરાવતી મંગલમૂર્તિ. શ્રદ્ધાળુઓ પ્રથમ દર્શનથી જ ભાવવિભોર બની જાય છે.',
                  descEn: 'The captivating, serene grace of Lord Ganesha’s idol touches every devotee’s soul upon first sight.'
                },
                {
                  icon: Users,
                  titleGu: 'સૌહાર્દપૂર્ણ ગ્રામીણ એકતા',
                  titleEn: 'Grassroots Village Solidarity',
                  descGu: 'મજીગામ છાપરા ફળિયાના દરેક ઘર અને પરિવારોનો સીધો સહયોગ. અહીં દરેક ભક્ત પોતાને મંડળનો અભિન્ન અંગ માને છે.',
                  descEn: 'Active participation from every household in Chhapra Faliya, fostering an unbreakable family-like bond.'
                },
                {
                  icon: ShieldCheck,
                  titleGu: 'શિસ્તબદ્ધ આયોજન અને સુરક્ષા',
                  titleEn: 'Disciplined Crowd Management & Safety',
                  descGu: 'હજારો શ્રદ્ધાળુઓના સુચારુ દર્શન, મહિલાઓ તથા વડીલો માટે વિશેષ વ્યવસ્થા અને શાંતિપૂર્ણ ભક્તિમય વાતાવરણ.',
                  descEn: 'Thoughtful queue arrangements, priority care for seniors and children, and peaceful festival management.'
                },
                {
                  icon: Flame,
                  titleGu: 'દરરોજ ભાવસભર મહા આરતી અને પ્રસાદ',
                  titleEn: 'Daily Maha Aarti & Holy Prasad',
                  descGu: 'મંત્રોચ્ચાર, શંખનાદ અને ઢોલ-નગારા વચ્ચે થતી દિવ્ય મહા આરતી અને સર્વ ભક્તો માટે પવિત્ર પ્રસાદ વિતરણ.',
                  descEn: 'Soul-stirring evening aartis resonated with conch shells and sacred chants, accompanied by prasad for all.'
                },
              ].map((card, i) => {
                const Icon = card.icon;
                return (
                  <div
                    key={i}
                    className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 flex items-start gap-4 hover:border-amber-500/40 transition-colors shadow-lg"
                  >
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {isGu ? card.titleGu : card.titleEn}
                      </h3>
                      <p className="text-xs text-amber-400/80 font-semibold mb-2">
                        {isGu ? card.titleEn : card.titleGu}
                      </p>
                      <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                        {isGu ? card.descGu : card.descEn}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION 6: SACRED MOTTO / DEVOTIONAL CHANT BANNER */}
          {/* ========================================================================= */}
          <section className="bg-gradient-to-r from-ualg-navy via-slate-900 to-amber-950 border border-amber-500/30 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
            <div className="max-w-4xl mx-auto relative z-10">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400/40 mx-auto flex items-center justify-center mb-6 text-amber-400">
                <Flag className="w-8 h-8" />
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-wide">
                {isGu
                  ? '“એક આસ્થા • એક સંસ્કૃતિ • એક મજીગામ ના રાજા”'
                  : '“One Faith • One Community • One Bappa”'}
              </h2>
              <p className="text-amber-300 font-bold text-base sm:text-xl mt-3">
                {isGu
                  ? 'મજીગામ ના રાજા — ૧૯૬૭ થી અવિરત ભક્તિ અને એકતાનો વારસો'
                  : 'Majigam Na Raja — A Proud Legacy of Faith Since 1967'}
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/"
                  className="btn-secondary px-6 py-3 text-sm sm:text-base font-black flex items-center gap-2 rounded-xl"
                >
                  <Sparkles className="w-4 h-4" />
                  {isGu ? 'ફોટો ગેલેરી જુઓ' : 'Explore Photo Gallery'}
                </Link>
                <Link
                  to="/location"
                  className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 px-6 py-3 text-sm sm:text-base font-bold rounded-xl flex items-center gap-2 transition-all"
                >
                  <MapPin className="w-4 h-4 text-amber-400" />
                  {isGu ? 'મંડળનું સરનામું અને નકશો' : 'Mandal Location & Map'}
                </Link>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION 7: PILGRIMAGE & MANDAL ADDRESS (WHERE WE ARE) */}
          {/* ========================================================================= */}
          <section className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-10 md:p-12 shadow-2xl">
            <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
              <div className="lg:w-1/2 space-y-4">
                <div className="inline-flex items-center gap-2 text-amber-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
                  <MapPin className="w-4 h-4" />
                  {isGu ? 'દર્શન સ્થળ અને સરનામું' : 'Darshan Location & Address'}
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white">
                  {isGu ? 'અહીં પધારો મજીગામ ના રાજાના દર્શને' : 'Visit Majigam Na Raja in Person'}
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {isGu
                    ? 'ગણેશોત્સવ દરમિયાન દર્શન, આરતી અને ઉત્સવનો લહાવો લેવા આપ સર્વે ભાવિક ભક્તોનું મજીગામ ખાતે હાર્દિક સ્વાગત છે.'
                    : 'We warmly welcome all devotees, families, and pilgrims to experience the divine grace, aarti, and celebrations during Ganeshotsav.'}
                </p>

                <div className="pt-2 space-y-2 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-amber-400" />
                    <span><strong>ચીખલી થી અંતર:</strong> માત્ર ૩ કિલોમીટર (3 km from Chikhli)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-amber-400" />
                    <span><strong>નવસારી / વલસાડ:</strong> સરળ હાઇવે કનેક્ટિવિટી (Easy highway access)</span>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2 w-full">
                <div className="bg-gradient-to-br from-slate-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-amber-500/30 shadow-xl space-y-4">
                  <div className="border-b border-slate-800 pb-4">
                    <h3 className="text-2xl font-black text-amber-300">મજીગામ ના રાજા</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                      BAL GANESH YUVAK MANDAL
                    </p>
                  </div>

                  <div className="space-y-1.5 text-base text-slate-200">
                    <p className="font-bold">છાપરા ફળિયા, મજીગામ (Chhapra Faliya, Majigam)</p>
                    <p>તા. ચીખલી, જિ. નવસારી (Taluka Chikhli, Dist. Navsari)</p>
                    <p>ગુજરાત – ૩૯૬૫૨૧, ભારત (Gujarat – 396521, India)</p>
                  </div>

                  <div className="pt-4 flex flex-wrap gap-3">
                    <Link
                      to="/location"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 px-5 py-2.5 rounded-xl font-black text-sm shadow-md hover:scale-[1.02] transition-transform"
                    >
                      <MapPin className="w-4 h-4" />
                      {isGu ? 'ગૂગલ મેપ ખોલો' : 'View on Google Maps'}
                    </Link>

                    <Link
                      to="/members"
                      className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-5 py-2.5 rounded-xl font-bold text-sm border border-slate-700 transition-colors"
                    >
                      <Users className="w-4 h-4 text-amber-400" />
                      {isGu ? 'મંડળ સભ્યો' : 'Mandal Members'}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* ========================================================================= */}
      {/* FULLSCREEN LIGHTBOX MODAL FOR KEDARNATH 2024 PHOTOS */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 select-none"
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto w-full">
              <div className="text-white">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  {isGu ? KEDARNATH_PHOTOS[lightboxIndex].tagGu : KEDARNATH_PHOTOS[lightboxIndex].tagEn}
                </span>
                <h4 className="text-base sm:text-xl font-black truncate max-w-xs sm:max-w-lg">
                  {isGu ? KEDARNATH_PHOTOS[lightboxIndex].titleGu : KEDARNATH_PHOTOS[lightboxIndex].titleEn}
                </h4>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-400">
                  {lightboxIndex + 1} / {KEDARNATH_PHOTOS.length}
                </span>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                  aria-label="Close Lightbox"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Main Image Stage */}
            <div className="relative flex-1 flex items-center justify-center my-4 max-w-6xl mx-auto w-full overflow-hidden">
              {/* Prev Button */}
              <button
                type="button"
                onClick={() => setLightboxIndex((prev) => (prev > 0 ? prev - 1 : KEDARNATH_PHOTOS.length - 1))}
                className="absolute left-2 sm:left-4 z-10 w-12 h-12 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-white/20 flex items-center justify-center shadow-2xl transition-all"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-7 h-7" />
              </button>

              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                src={KEDARNATH_PHOTOS[lightboxIndex].src}
                alt={KEDARNATH_PHOTOS[lightboxIndex].titleEn}
                className="max-h-[75vh] max-w-full rounded-2xl object-contain shadow-2xl border border-amber-500/20"
              />

              {/* Next Button */}
              <button
                type="button"
                onClick={() => setLightboxIndex((prev) => (prev < KEDARNATH_PHOTOS.length - 1 ? prev + 1 : 0))}
                className="absolute right-2 sm:right-4 z-10 w-12 h-12 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-white/20 flex items-center justify-center shadow-2xl transition-all"
                aria-label="Next image"
              >
                <ChevronRight className="w-7 h-7" />
              </button>
            </div>

            {/* Bottom Thumbnails Strip */}
            <div className="max-w-4xl mx-auto w-full flex items-center justify-center gap-2 overflow-x-auto py-2">
              {KEDARNATH_PHOTOS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setLightboxIndex(idx)}
                  className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                    idx === lightboxIndex ? 'border-amber-400 scale-105' : 'border-transparent opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={p.src} alt={p.titleEn} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
