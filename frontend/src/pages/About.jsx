import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, MapPin, Heart, Users, Palette, Zap, Flag, ArrowRight, Mountain, 
  X, ChevronLeft, ChevronRight, Sparkles, Award, Compass, Check
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// 10 Photos of Kedarnath Dham 2024
const KEDARNATH_PHOTOS = [
  { src: '/majigamnaraja2024 (1).jpeg', titleGu: '૭૦ ફૂટ ઊંચું કેદારનાથ પ્રવેશદ્વાર', titleEn: '70-Ft Kedarnath Entrance' },
  { src: '/majigamnaraja2024 (2).jpeg', titleGu: 'મજીગામ ના રાજા દિવ્ય દર્શન', titleEn: 'Majigam Na Raja Darshan' },
  { src: '/majigamnaraja2024 (3).jpeg', titleGu: 'શ્રી હર્ષ સંઘવી દ્વારા મુલાકાત', titleEn: 'Visit by Shri Harsh Sanghavi' },
  { src: '/majigamnaraja2024 (4).jpeg', titleGu: 'રાત્રિના સમયે ઝળહળતો પંડાલ', titleEn: 'Illuminated Pandal at Night' },
  { src: '/majigamnaraja2024 (5).jpeg', titleGu: 'હિમાલયની પર્વતમાળા નજારો', titleEn: 'Himalayan Ridge Backdrop' },
  { src: '/majigamnaraja2024 (6).jpeg', titleGu: 'હજારો ભક્તોની જનમેદની', titleEn: 'Gathering of Devotees' },
  { src: '/majigamnaraja2024 (7).jpeg', titleGu: 'મહા આરતીનો દિવ્ય લહાવો', titleEn: 'Grand Maha Aarti' },
  { src: '/majigamnaraja2024 (8).jpeg', titleGu: 'યુવા કાર્યકરોની ટીમ', titleEn: 'Youth Volunteer Team' },
  { src: '/majigamnaraja2024 (9).jpeg', titleGu: 'પંડાલની આંતરિક ભવ્યતા', titleEn: 'Interior Sanctum Decor' },
  { src: '/majigamnaraja2024 (10).jpeg', titleGu: 'શ્રી ગણેશજી મંગલમૂર્તિ', titleEn: 'Mangalmurti Lord Ganesha' },
];

export default function About() {
  // Language filter: 'both' (default, Gujarati first + English), 'gu' (Gujarati only), 'en' (English only)
  const [langMode, setLangMode] = useState('both');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Keyboard navigation for photo lightbox
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

  // Lock body scroll when lightbox is active
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

  const showGu = langMode === 'both' || langMode === 'gu';
  const showEn = langMode === 'both' || langMode === 'en';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col text-gray-900">
      <Navbar />

      <div className="flex-1">
        {/* Simple Solid Header (No Gradient) */}
        <div className="bg-ualg-navy text-white py-14 px-4 border-b border-gray-800">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-xs font-bold text-ualg-gold mb-4">
              ॥ ૐ શ્રી ગણેશાય નમઃ ॥ • BAL GANESH YUVAK MANDAL
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black mb-3 tracking-tight">
              મજીગામ ના રાજા
            </h1>
            <p className="text-lg sm:text-2xl font-bold text-ualg-gold tracking-widest uppercase">
              MAJIGAM NA RAJA
            </p>

            <p className="text-lg sm:text-xl font-semibold text-gray-200 mt-4 max-w-3xl mx-auto">
              ૧૯૬૭ થી શ્રદ્ધા, એકતા અને પરંપરાનો અમર વારસો
            </p>
            <p className="text-sm sm:text-base text-gray-300 mt-1">
              A Legacy of Faith, Unity & Tradition Since 1967
            </p>
          </div>
        </div>

        {/* Clean Language Bar */}
        <div className="bg-white border-b border-gray-200 sticky top-16 sm:top-20 z-30 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
              <span className="font-bold text-gray-900">ભાષા પ્રાથમિકતા / Language:</span>
              <span className="text-xs bg-orange-100 text-orange-800 font-bold px-2.5 py-0.5 rounded-full">
                ૧. ગુજરાતી મુખ્ય • 2. English
              </span>
            </div>

            {/* Simple solid pill buttons */}
            <div className="inline-flex rounded-lg bg-gray-100 p-1 border border-gray-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => setLangMode('both')}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  langMode === 'both'
                    ? 'bg-ualg-navy text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                બંને (Gujarati + English)
              </button>
              <button
                type="button"
                onClick={() => setLangMode('gu')}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  langMode === 'gu'
                    ? 'bg-ualg-navy text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                માત્ર ગુજરાતી
              </button>
              <button
                type="button"
                onClick={() => setLangMode('en')}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  langMode === 'en'
                    ? 'bg-ualg-navy text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                English Only
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

          {/* ======================================================================= */}
          {/* SECTION 1: OVERVIEW / મંડળ પરિચય */}
          {/* ======================================================================= */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-10 md:p-12">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-black text-xl flex-shrink-0">
                ॐ
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-ualg-navy">
                  મંડળ પરિચય
                </h2>
                <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">
                  Mandal Overview & History
                </p>
              </div>
            </div>

            {/* Gujarati Content First */}
            {showGu && (
              <div className="space-y-4 text-lg text-gray-800 leading-relaxed font-normal">
                <p>
                  <strong>મજીગામ ના રાજા</strong> એ દક્ષિણ ગુજરાતના નવસારી જિલ્લાના ચીખલી તાલુકાના મજીગામ, છાપરા ફળિયા ખાતે આવેલું પ્રતિષ્ઠિત અને લોકપ્રિય <strong>બાલ ગણેશ યુવક મંડળ</strong> છે. વર્ષ <strong>૧૯૬૭</strong> માં સ્થાપિત આ મંડળે પેઢી દર પેઢી ભક્તિ, સામાજિક એકતા, સાંસ્કૃતિક ઉજવણી અને નિઃસ્વાર્થ સેવાનો ૫૯ વર્ષનો ભવ્ય વારસો નિર્માણ કર્યો છે.
                </p>
                <p>
                  જે ઉત્સવ એક સમયે ગામના ફળિયાની નાની ઉજવણીથી શરૂ થયો હતો, તે આજે સમગ્ર દક્ષિણ ગુજરાતના સૌથી ઉત્સુકતાપૂર્વક રાહ જોવાતા ગણેશોત્સવોમાં સ્થાન પામ્યો છે. દર વર્ષે ચીખલી અને આસપાસના ગ્રામ્ય વિસ્તારો ઉપરાંત <strong>નવસારી, વલસાડ, સુરત, બારડોલી અને બિલીમોરા</strong> જેવા શહેરોમાંથી હજારો ભાવિક ભક્તો દર્શન અને દિવ્ય અનુભૂતિ માટે આવે છે.
                </p>
                <p>
                  આ ઉત્સવ માત્ર મૂર્તિ સ્થાપના સુધી સીમિત નથી. તે યુવાનો, વડીલો, પરિવારો, કલાકારો અને સ્વયંસેવકોને શ્રદ્ધાના એક જ સૂત્રમાં બાંધતી અખંડ એકતાનું પ્રતીક છે.
                </p>
              </div>
            )}

            {/* English Content Second */}
            {showEn && (
              <div className={`${showGu ? 'mt-8 pt-8 border-t border-gray-200' : ''} space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed`}>
                <p>
                  <strong>Majigam Na Raja</strong> is a prominent <strong>Bal Ganesh Yuvak Mandal</strong> from Majigam, Chhapra Faliya, Chikhli, Navsari, Gujarat. Established in <strong>1967</strong>, the Mandal has built a 59-year legacy of devotion, community participation, cultural celebration, and selfless service spanning generations.
                </p>
                <p>
                  What began as a community neighborhood celebration has grown into one of the most eagerly awaited Ganeshotsav festivals in South Gujarat. Every year, devotees from Chikhli and surrounding rural areas, as well as pilgrims from <strong>Navsari, Valsad, Surat, Bardoli, and nearby towns</strong>, gather to experience the devotion and grandeur of Majigam Na Raja.
                </p>
                <p>
                  The celebration represents far more than the installation of Lord Ganesha. It brings together youth, families, devotees, artists, volunteers, and the wider community under one shared spirit of faith and brotherhood.
                </p>
              </div>
            )}
          </div>

          {/* ======================================================================= */}
          {/* SECTION 2: 59 YEARS LEGACY BANNER (Solid Navy - NO Gradient) */}
          {/* ======================================================================= */}
          <div className="bg-ualg-navy rounded-2xl shadow-sm p-8 sm:p-12 text-white text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="text-3xl sm:text-5xl md:text-6xl font-black text-ualg-gold">૧૯૬૭</span>
              <ArrowRight className="w-6 h-6 sm:w-10 sm:h-10 text-gray-400" />
              <span className="text-3xl sm:text-5xl md:text-6xl font-black text-ualg-gold">૨૦૨૬</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black mb-3">
              ૫૯ વર્ષનો અવિરત વારસો (59 Years of Legacy)
            </h2>

            <p className="text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto italic font-medium">
              “જે યાત્રા શ્રદ્ધાથી શરૂ થઈ હતી, તે આજે પણ પેઢીઓને પ્રેરણા આપી રહી છે.”
            </p>
            <p className="text-sm sm:text-base text-gray-400 mt-1 italic">
              “A journey that began with devotion continues to inspire generations.”
            </p>
          </div>

          {/* ======================================================================= */}
          {/* SECTION 3: JOURNEY & 6 CORE PILLARS */}
          {/* ======================================================================= */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-10 md:p-12">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-ualg-navy">
                  અમારી યાત્રા અને મૂલ્યો
                </h2>
                <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">
                  Our Journey & Core Pillars Since 1967
                </p>
              </div>
            </div>

            {showGu && (
              <p className="text-lg text-gray-800 leading-relaxed mb-6 font-normal">
                ૧૯૬૭ થી આજ સુધી, મજીગામ ના રાજાએ ગણેશોત્સવની પવિત્ર પરંપરાઓને જાળવી રાખીને સતત પ્રગતિ કરી છે. દાયકાઓ દરમિયાન સ્થાનિક યુવા કાર્યકરો અને ભક્તોએ પોતાનો સમય, કલા અને સમર્પણ આપીને આ ઉત્સવને અવિસ્મરણીય બનાવ્યો છે. આજે આ મંડળ ભવ્ય આગમન યાત્રા, કલાત્મક શણગાર, સાંસ્કૃતિક કાર્યક્રમો અને શિસ્તબદ્ધ વ્યવસ્થા માટે જાણીતું છે.
              </p>
            )}

            {showEn && (
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8">
                Since 1967, Majigam Na Raja has continued to flourish while preserving the authentic spirit and traditions of Ganeshotsav. Over the decades, generations of devotees and young volunteers have contributed their time, creativity, and dedication. Today, the Mandal is celebrated for its grand Aagman Yatra, artistic decorations, cultural programs, and large-scale festival management.
              </p>
            )}

            {/* 6 Solid Pillar Cards (NO Gradient) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {[
                { 
                  icon: Heart, 
                  titleGu: 'ભક્તિ અને શ્રદ્ધા', 
                  titleEn: 'Devotion & Faith',
                  descGu: 'ગણેશજી પ્રત્યે અખંડ શ્રદ્ધા અને સમર્પણ.',
                  descEn: 'Deep faith and spiritual connection.'
                },
                { 
                  icon: Users, 
                  titleGu: 'સામાજિક એકતા', 
                  titleEn: 'Community Unity',
                  descGu: 'સર્વ જ્ઞાતિ અને પરિવારોને એક તાંતણે બાંધતો ઉત્સવ.',
                  descEn: 'Bringing people together in harmony.'
                },
                { 
                  icon: Palette, 
                  titleGu: 'કલા અને સર્જનાત્મકતા', 
                  titleEn: 'Creativity & Themes',
                  descGu: 'અવનવા વિષયો, આકર્ષક પંડાલ અને સુંદર શણગાર.',
                  descEn: 'Artistic expressions and grand themes.'
                },
                { 
                  icon: Zap, 
                  titleGu: 'યુવા શક્તિ', 
                  titleEn: 'Youth Energy',
                  descGu: 'સ્થાનિક યુવાનોની મહેનત, સેવા અને સમર્પણ.',
                  descEn: 'Youth dedication and volunteer teamwork.'
                },
                { 
                  icon: Calendar, 
                  titleGu: 'સંસ્કૃતિનું જતન', 
                  titleEn: 'Preserving Tradition',
                  descGu: '૫૯ વર્ષ જૂની ધાર્મિક અને સાંસ્કૃતિક પરંપરા.',
                  descEn: 'Preserving rich cultural heritage.'
                },
                { 
                  icon: Flag, 
                  titleGu: 'ભવ્ય ઉત્સવ આયોજન', 
                  titleEn: 'Grand Celebration',
                  descGu: 'યાદગાર આગમન યાત્રા, વિસર્જન અને મહા આરતી.',
                  descEn: 'Large-scale festive arrangements.'
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={index} 
                    className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-ualg-navy transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    {showGu && (
                      <h3 className="font-bold text-lg text-ualg-navy">
                        {item.titleGu}
                      </h3>
                    )}
                    {showEn && (
                      <h4 className={`text-sm font-semibold ${showGu ? 'text-gray-500 mb-2' : 'text-ualg-navy text-lg font-bold mb-2'}`}>
                        {item.titleEn}
                      </h4>
                    )}
                    {showGu && (
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {item.descGu}
                      </p>
                    )}
                    {showEn && (
                      <p className={`text-sm ${showGu ? 'text-gray-500 mt-1' : 'text-gray-600'}`}>
                        {item.descEn}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ======================================================================= */}
          {/* SECTION 4: 2024 KEDARNATH DHAM THEME & VIP RECOGNITION */}
          {/* ======================================================================= */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-10 md:p-12">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0">
                <Mountain className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-ualg-navy">
                  ૨૦૨૪ — કેદારનાથ ધામ થીમ
                </h2>
                <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">
                  2024 — The Kedarnath Dham Theme (70-Ft Grand Replica)
                </p>
              </div>
            </div>

            {/* Gujarati description */}
            {showGu && (
              <div className="space-y-4 text-lg text-gray-800 leading-relaxed font-normal">
                <p>
                  મંડળની યાત્રાનું સૌથી મોટું અને ઐતિહાસિક સીમાચિહ્ન <strong>ગણેશોત્સવ ૨૦૨૪</strong> રહ્યો, જ્યારે મજીગામ ના રાજા દ્વારા લગભગ <strong>૭૦ ફૂટ ઊંચી કેદારનાથ ધામ-પ્રેરિત ભવ્ય પ્રતિકૃતિ (Pandal)</strong> તૈયાર કરવામાં આવી હતી.
                </p>
                <p>
                  આ ભવ્ય થીમ પાછળનો હેતુ અત્યંત પવિત્ર હતો — <em>જે વૃદ્ધ ગ્રામજનો અને ભાવિકો ઉત્તરાખંડના હિમાલયમાં કેદારનાથ દર્શને જઈ શકતા નથી, તેઓ પોતાના જ આંગણે કેદારનાથ તીર્થની દિવ્ય અનુભૂતિ કરી શકે!</em>
                </p>
                <p>
                  ૧૦ દિવસના ગણેશોત્સવ દરમિયાન મજીગામનું છાપરા ફળિયું દક્ષિણ ગુજરાતના સૌથી મોટા આકર્ષણ કેન્દ્રમાં ફેરવાઈ ગયું હતું, જ્યાં લાખો શ્રદ્ધાળુઓએ દર્શનનો લહાવો લીધો.
                </p>
              </div>
            )}

            {/* VIP Highlight Box (Solid Cream/Amber - NO Gradient) */}
            <div className="my-8 bg-amber-50 border-2 border-amber-300 rounded-xl p-6 sm:p-8 text-center shadow-sm">
              <div className="inline-flex items-center gap-1.5 bg-amber-200/80 text-amber-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                <Award className="w-4 h-4" /> વિશેષ સન્માન / VIP Recognition
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-ualg-navy mb-2">
                માનનીય ગૃહ રાજ્યમંત્રી શ્રી હર્ષ સંઘવી દ્વારા મુલાકાત
              </h3>
              <p className="text-base sm:text-lg text-gray-800 font-semibold max-w-3xl mx-auto leading-relaxed">
                ગુજરાત રાજ્યના નાયબ મુખ્યમંત્રી / ગૃહ રાજ્યમંત્રી <strong>શ્રી હર્ષ સંઘવીએ</strong> ખાસ મજીગામ પંડાલની મુલાકાત લીધી હતી અને સ્થાનિક યુવાનોની અદભુત કારીગરી, મહેનત અને સમર્પણની મુક્તકંઠે પ્રશંસા કરી હતી.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Shri Harsh Sanghavi, Deputy Chief Minister / Home Minister of Gujarat, visited the grand pandal and applauded the creativity, teamwork, and hard work of the local youth.
              </p>
            </div>

            {/* English description */}
            {showEn && (
              <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
                <p>
                  One of the major highlights in the Mandal's journey was the <strong>2024 Ganeshotsav</strong>, when Majigam Na Raja presented a spectacular <strong>Kedarnath Dham-inspired pandal</strong> featuring an approximately <strong>70-foot-tall replica</strong>.
                </p>
                <p>
                  The concept was created with a beautiful purpose — to give elderly residents and devotees who may not be physically or financially able to travel to Uttarakhand an opportunity to experience the atmosphere of a Himalayan pilgrimage closer to home.
                </p>
                <p>
                  During the 10-day Ganeshotsav, <strong>Chhapra Faliya in Majigam transformed into a major attraction</strong>, drawing visitors from surrounding cities and towns. The project also showcased the <strong>creativity, engineering skills, teamwork, and dedication of the local youth</strong>.
                </p>
              </div>
            )}

            {/* 10 Photos Grid with Clean Click-to-Zoom */}
            <div className="mt-10 pt-8 border-t border-gray-100">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-ualg-navy">
                    કેદારનાથ ધામ ફોટો ગેલેરી (Photo Gallery)
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    ૧૦ વાસ્તવિક તસવીરો — ફોટો મોટો જોવા ક્લિક કરો
                  </p>
                </div>
                <span className="text-xs bg-gray-100 text-gray-700 font-bold px-3 py-1 rounded-full border border-gray-200">
                  10 Photos
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
                {KEDARNATH_PHOTOS.map((photo, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setLightboxIndex(index)}
                    className="relative group rounded-xl overflow-hidden aspect-square border border-gray-200 shadow-sm hover:shadow-md transition-all text-left bg-gray-100 focus:outline-none focus:ring-2 focus:ring-ualg-navy"
                  >
                    <img 
                      src={photo.src} 
                      alt={photo.titleEn} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" 
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                      <p className="text-white text-xs font-bold truncate">
                        {photo.titleGu}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ======================================================================= */}
          {/* SECTION 5: WHAT MAKES US SPECIAL / વિશેષતાઓ */}
          {/* ======================================================================= */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-10 md:p-12">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-ualg-navy">
                  મજીગામ ના રાજા શા માટે વિશેષ છે?
                </h2>
                <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">
                  What Makes Majigam Na Raja Special?
                </p>
              </div>
            </div>

            {showGu && (
              <p className="text-lg text-gray-800 leading-relaxed mb-6 font-normal">
                મજીગામ ના રાજા માત્ર એક ગણેશ મૂર્તિ નથી; તે શ્રદ્ધા, એકતા, પરંપરા, કલા અને સામાજિક ભાવનાનું જીવંત પ્રતીક છે. ૧૯૬૭ થી આજ સુધી ભાવિકો અને કાર્યકરો દર વર્ષે તે જ નિષ્ઠાથી બાપ્પાનું સ્વાગત કરે છે.
              </p>
            )}

            {showEn && (
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8">
                Majigam Na Raja is not just a Ganpati idol; it is a symbol of faith, unity, tradition, creativity, and community spirit. Since 1967, generations of devotees and volunteers have come together to celebrate Ganesh Utsav with the same devotion while creating new memories every year.
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { 
                  icon: Heart, 
                  titleGu: 'શ્રદ્ધા અને ભક્તિ', 
                  titleEn: 'Faith & Devotion',
                  descGu: 'પેઢીઓથી ભક્તો ગણપતિ બાપ્પાના આશીર્વાદ લેવા અખૂટ શ્રદ્ધા સાથે એકત્ર થાય છે.',
                  descEn: 'For generations, devotees have gathered to seek the blessings of Ganpati Bappa with deep faith.'
                },
                { 
                  icon: Users, 
                  titleGu: 'એકતા અને ભાઈચારો', 
                  titleEn: 'Unity & Togetherness',
                  descGu: 'મજીગામ ના રાજા સમગ્ર સમાજને એક પરિવાર બનાવે છે. પરિવારો, યુવાનો અને વડીલો સહભાગી બને છે.',
                  descEn: 'Majigam Na Raja brings the entire community together. Families, youth, and elders join as one.'
                },
                { 
                  icon: Calendar, 
                  titleGu: 'સંસ્કૃતિ અને ઉત્સવ', 
                  titleEn: 'Culture & Celebration',
                  descGu: 'ભવ્ય આગમન યાત્રા, પરંપરાગત સંગીત અને મહોત્સવની દરેક પળ ગણેશોત્સવનો ઉત્સાહ દર્શાવે છે.',
                  descEn: 'From the grand Aagman Yatra to traditional music, every moment reflects the festive spirit.'
                },
                { 
                  icon: Palette, 
                  titleGu: 'સર્જનાત્મકતા અને થીમ', 
                  titleEn: 'Creativity & Grand Themes',
                  descGu: 'અવનવા શણગાર, કલાત્મક પંડાલ અને પ્રેરક થીમ દ્વારા આપણી કલાનું સુંદર પ્રદર્શન થાય છે.',
                  descEn: 'Our celebrations showcase creativity through beautiful decorations and artistic pandals.'
                },
                { 
                  icon: Zap, 
                  titleGu: 'યુવા શક્તિ અને સમર્પણ', 
                  titleEn: 'Youth Power & Dedication',
                  descGu: 'સ્થાનિક યુવાનોની અથાક મહેનત, ટીમવર્ક અને નિઃસ્વાર્થ સેવા મંડળને આગળ ધપાવે છે.',
                  descEn: 'The energy and dedication of young volunteers play a vital role in every successful celebration.'
                },
                { 
                  icon: Heart, 
                  titleGu: 'સેવા ભાવના', 
                  titleEn: 'Community Spirit',
                  descGu: 'સૌથી વિશેષ, મજીગામ ના રાજા એક હૃદય અને એક ભાવથી બાપ્પાના સ્વાગતનું પ્રતીક છે.',
                  descEn: 'Above all, Majigam Na Raja represents the spirit of togetherness with one heart and one purpose.'
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    {showGu && (
                      <h3 className="font-bold text-lg text-ualg-navy">
                        {item.titleGu}
                      </h3>
                    )}
                    {showEn && (
                      <h4 className={`text-sm font-semibold ${showGu ? 'text-gray-500 mb-2' : 'text-ualg-navy text-lg font-bold mb-2'}`}>
                        {item.titleEn}
                      </h4>
                    )}
                    {showGu && (
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {item.descGu}
                      </p>
                    )}
                    {showEn && (
                      <p className={`text-sm ${showGu ? 'text-gray-500 mt-1' : 'text-gray-600'}`}>
                        {item.descEn}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ======================================================================= */}
          {/* SECTION 6: SACRED SLOGAN BANNER (Solid Navy - NO Gradient) */}
          {/* ======================================================================= */}
          <div className="bg-ualg-navy rounded-2xl shadow-sm p-8 sm:p-12 text-white text-center">
            <div className="w-12 h-12 rounded-full bg-white/10 mx-auto flex items-center justify-center mb-4 text-ualg-gold">
              <Flag className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-4xl font-black mb-2">
              “એક આસ્થા • એક સંસ્કૃતિ • એક મજીગામ ના રાજા”
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-2">
              “One Faith. One Community. One Bappa.”
            </p>
            <p className="text-ualg-gold font-bold text-sm sm:text-base">
              મજીગામ ના રાજા — ૧૯૬૭ થી વારસો (Majigam Na Raja — A Legacy Since 1967)
            </p>
          </div>

          {/* ======================================================================= */}
          {/* SECTION 7: LOCATION & CONTACT SECTION */}
          {/* ======================================================================= */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-10 md:p-12">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-ualg-navy">
                  દર્શન સ્થળ અને સરનામું
                </h2>
                <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">
                  Mandal Location & Address
                </p>
              </div>
            </div>

            {/* Simple Clean Address Box (Solid Gray - NO Gradient) */}
            <div className="bg-gray-50 p-6 sm:p-8 rounded-xl border border-gray-200">
              <p className="text-2xl sm:text-3xl font-black text-ualg-navy mb-2">
                મજીગામ ના રાજા (Majigam Na Raja)
              </p>
              <p className="text-lg text-gray-800 font-medium">
                છાપરા ફળિયા, મજીગામ (Chhapra Faliya, Majigam)
              </p>
              <p className="text-lg text-gray-800 font-medium">
                તા. ચીખલી, જિ. નવસારી (Chikhli, Navsari)
              </p>
              <p className="text-lg text-gray-800 font-medium">
                ગુજરાત – ૩૯૬૫૨૧, ભારત (Gujarat – 396521, India)
              </p>

              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  to="/location"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  ગૂગલ મેપ અને દિશાનિર્દેશ (View Map)
                </Link>
                <Link
                  to="/members"
                  className="btn-secondary inline-flex items-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  મંડળ સભ્યો (Mandal Members)
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Fullscreen Photo Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col justify-between p-4 sm:p-6">
          <div className="flex items-center justify-between text-white max-w-6xl mx-auto w-full">
            <div>
              <p className="text-sm font-bold text-ualg-gold">
                {KEDARNATH_PHOTOS[lightboxIndex].titleGu}
              </p>
              <p className="text-xs text-gray-400">
                {KEDARNATH_PHOTOS[lightboxIndex].titleEn}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-400">
                {lightboxIndex + 1} / {KEDARNATH_PHOTOS.length}
              </span>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="relative flex-1 flex items-center justify-center my-4 max-w-5xl mx-auto w-full">
            <button
              type="button"
              onClick={() => setLightboxIndex((prev) => (prev > 0 ? prev - 1 : KEDARNATH_PHOTOS.length - 1))}
              className="absolute left-2 sm:left-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-black/80 flex items-center justify-center"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <img
              src={KEDARNATH_PHOTOS[lightboxIndex].src}
              alt={KEDARNATH_PHOTOS[lightboxIndex].titleEn}
              className="max-h-[75vh] max-w-full rounded-xl object-contain shadow-2xl"
            />

            <button
              type="button"
              onClick={() => setLightboxIndex((prev) => (prev < KEDARNATH_PHOTOS.length - 1 ? prev + 1 : 0))}
              className="absolute right-2 sm:right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-black/80 flex items-center justify-center"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="max-w-3xl mx-auto w-full flex items-center justify-center gap-2 overflow-x-auto py-2">
            {KEDARNATH_PHOTOS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setLightboxIndex(idx)}
                className={`w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                  idx === lightboxIndex ? 'border-ualg-gold scale-105' : 'border-transparent opacity-50 hover:opacity-100'
                }`}
              >
                <img src={p.src} alt={p.titleEn} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
