import { Calendar, MapPin, Heart, Users, Palette, Zap, Flag, ArrowRight, Mountain, Check } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-ualg-navy to-orange-800 text-white py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-black mb-4">
               Majigam Na Raja
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-orange-200">A Legacy of Faith, Unity & Tradition Since 1967</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* Overview Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                Majigam Na Raja is a prominent <strong>Bal Ganesh Yuvak Mandal</strong> from Majigam, Chhapra Faliya, Chikhli, Navsari, Gujarat. Established in <strong>1967</strong>, the Mandal has built a legacy of devotion, community participation, cultural celebration, and service spanning generations.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                What began as a community celebration has grown into one of the most eagerly awaited Ganeshotsav celebrations in the region. Every year, devotees from Chikhli and surrounding areas, as well as visitors from <strong>Navsari, Valsad, Surat, Bardoli</strong> and nearby towns, come together to experience the devotion and grandeur of Majigam Na Raja.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed">
                The celebration represents more than the installation of Lord Ganesha. It brings together youth, families, devotees, artists, volunteers, and the wider community under one shared spirit of faith.
              </p>
            </div>
          </div>

          {/* Legacy Banner */}
          <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl shadow-xl p-8 md:p-12 text-white text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="text-4xl md:text-6xl font-black">1967</span>
              <ArrowRight className="w-8 h-8 md:w-12 md:h-12" />
              <span className="text-4xl md:text-6xl font-black">2026</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-4">59 Years of Legacy</h2>
            <p className="text-xl md:text-2xl italic opacity-90">"A journey that began with devotion continues to inspire generations."</p>
          </div>

          {/* Journey Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-black text-ualg-navy mb-8 flex items-center gap-3">
              <Calendar className="w-10 h-10 text-orange-500" />
              Our Journey Since 1967
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                Since 1967, Majigam Na Raja has continued to grow while preserving the spirit and traditions of Ganeshotsav.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                Over the decades, generations of devotees and young volunteers have contributed their time, creativity, and dedication to making the festival memorable.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed">
                Today, the Mandal is recognized for its <strong>grand Ganpati celebrations, Aagman Yatra, artistic decorations, cultural programs, energetic community participation, and large-scale festival arrangements.</strong>
              </p>
            </div>

            <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Heart, title: 'Devotion', desc: 'Deep faith and spiritual connection' },
                { icon: Users, title: 'Community', desc: 'Bringing people together' },
                { icon: Palette, title: 'Creativity', desc: 'Artistic expressions and themes' },
                { icon: Zap, title: 'Energy', desc: 'Youth power and dedication' },
                { icon: Calendar, title: 'Tradition', desc: 'Preserving cultural heritage' },
                { icon: Flag, title: 'Celebration', desc: 'Grand festival arrangements' },
              ].map((item, index) => (
                <div key={index} className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border border-orange-100">
                  <item.icon className="w-8 h-8 text-orange-600 mb-3" />
                  <h3 className="font-bold text-lg text-ualg-navy mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Kedarnath Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                <Mountain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-ualg-navy">2024 — The Kedarnath Dham Theme</h2>
                <p className="text-orange-600 font-bold text-lg">A Spectacular Himalayan Pilgrimage Experience</p>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                One of the major highlights in the Mandal's journey was the <strong>2024 Ganeshotsav</strong>, when Majigam Na Raja presented a spectacular <strong>Kedarnath Dham-inspired pandal</strong>.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                The grand structure became a major attraction during the festival, featuring an approximately <strong>70-foot-tall replica/facade inspired by Kedarnath Dham</strong>.
              </p>
            </div>

            {/* Special Highlight Box */}
            <div className="mt-8 bg-gradient-to-r from-amber-100 to-yellow-100 p-8 rounded-xl border-2 border-amber-300 shadow-lg">
              <p className="text-2xl font-bold text-ualg-navy mb-4 text-center">Special Recognition</p>
              <p className="text-xl text-gray-800 leading-relaxed font-bold text-center">
                Shri Harsh Sanghavi, Deputy Chief Minister of Gujarat, also visited the grand pandal and appreciated the creativity and hard work of the local youth.
              </p>
              <p className="text-xl text-gray-800 leading-relaxed font-bold text-center mt-4">
                A memorable chapter in the Majigam Na Raja.
              </p>
            </div>

            <div className="prose prose-lg max-w-none mt-8">
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                The concept was created with a beautiful purpose — to give elderly residents and devotees who may not be physically or financially able to travel to Uttarakhand an opportunity to experience the atmosphere of a Himalayan pilgrimage closer to home.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                During the 10-day Ganeshotsav, <strong>Chhapra Faliya in Majigam transformed into a major attraction</strong>, drawing visitors from surrounding cities and towns.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed">
                The project also showcased the <strong>creativity, engineering skills, teamwork, and dedication of the local youth</strong>.
              </p>
            </div>

            {/* Photo Gallery */}
            <div className="mt-10">
              <h3 className="text-2xl font-bold text-ualg-navy mb-6 text-center">Photo Gallery</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <img src="/majigamnaraja2024 (1).jpeg" alt="Kedarnath Dham 2024" className="rounded-xl h-64 w-full object-cover shadow-lg hover:shadow-xl transition-shadow" />
                <img src="/majigamnaraja2024 (2).jpeg" alt="Kedarnath Dham 2024" className="rounded-xl h-64 w-full object-cover shadow-lg hover:shadow-xl transition-shadow" />
                <img src="/majigamnaraja2024 (3).jpeg" alt="Kedarnath Dham 2024" className="rounded-xl h-64 w-full object-cover shadow-lg hover:shadow-xl transition-shadow" />
                <img src="/majigamnaraja2024 (4).jpeg" alt="Kedarnath Dham 2024" className="rounded-xl h-64 w-full object-cover shadow-lg hover:shadow-xl transition-shadow" />
                <img src="/majigamnaraja2024 (5).jpeg" alt="Kedarnath Dham 2024" className="rounded-xl h-64 w-full object-cover shadow-lg hover:shadow-xl transition-shadow" />
                <img src="/majigamnaraja2024 (6).jpeg" alt="Kedarnath Dham 2024" className="rounded-xl h-64 w-full object-cover shadow-lg hover:shadow-xl transition-shadow" />
                <img src="/majigamnaraja2024 (7).jpeg" alt="Kedarnath Dham 2024" className="rounded-xl h-64 w-full object-cover shadow-lg hover:shadow-xl transition-shadow" />
                <img src="/majigamnaraja2024 (8).jpeg" alt="Kedarnath Dham 2024" className="rounded-xl h-64 w-full object-cover shadow-lg hover:shadow-xl transition-shadow" />
                <img src="/majigamnaraja2024 (9).jpeg" alt="Kedarnath Dham 2024" className="rounded-xl h-64 w-full object-cover shadow-lg hover:shadow-xl transition-shadow" />
                <img src="/majigamnaraja2024 (10).jpeg" alt="Kedarnath Dham 2024" className="rounded-xl h-64 w-full object-cover shadow-lg hover:shadow-xl transition-shadow" />
              </div>
            </div>
          </div>

          {/* What Makes Us Special Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-black text-ualg-navy mb-4 flex items-center gap-3">
              <Users className="w-10 h-10 text-orange-500" />
              What Makes Majigam Na Raja Special?
            </h2>
            <p className="text-xl text-gray-600 italic mb-8">
              More Than a Celebration — A Legacy of Faith and Unity
            </p>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              Majigam Na Raja is not just a Ganpati idol; it is a symbol of faith, unity, tradition, creativity, and community spirit. Since 1967, generations of devotees and volunteers have come together to celebrate Ganesh Utsav with the same devotion while creating new memories every year.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { 
                  icon: Heart, 
                  title: 'Faith & Devotion', 
                  desc: 'For generations, devotees have gathered to seek the blessings of Ganpati Bappa and celebrate the festival with deep faith and devotion.'
                },
                { 
                  icon: Users, 
                  title: 'Unity & Togetherness', 
                  desc: 'Majigam Na Raja brings the entire community together. Families, youth, elders, devotees, and volunteers all become part of one celebration.'
                },
                { 
                  icon: Calendar, 
                  title: 'Culture & Celebration', 
                  desc: 'From the grand Aagman Yatra to music, traditional performances, and festive activities, every moment reflects the vibrant spirit of Ganeshotsav.'
                },
                { 
                  icon: Palette, 
                  title: 'Creativity & Grand Themes', 
                  desc: 'Our celebrations showcase the creativity and imagination of our community through beautiful decorations, artistic pandals, and inspiring themes.'
                },
                { 
                  icon: Zap, 
                  title: 'Youth Power & Dedication', 
                  desc: 'The energy and dedication of our young volunteers play an important role in making every celebration successful. Their teamwork, hard work, and creativity continue to take the Mandal forward.'
                },
                { 
                  icon: Heart, 
                  title: 'Community Spirit', 
                  desc: 'Above all, Majigam Na Raja represents the spirit of togetherness — where everyone comes together with one heart and one purpose: to celebrate and welcome Ganpati Bappa.'
                },
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow">
                  <item.icon className="w-10 h-10 text-orange-600 mb-4" />
                  <h3 className="font-bold text-xl text-ualg-navy mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Banner */}
          <div className="bg-gradient-to-r from-ualg-navy to-orange-800 rounded-2xl shadow-xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl md:text-5xl font-black mb-4 flex items-center justify-center gap-3">
              <Flag className="w-10 h-10 md:w-12 md:h-12" />
              "One Faith. One Community. One Bappa."
            </h2>
            <p className="text-2xl md:text-3xl font-bold text-orange-200">Majigam Na Raja — A Legacy Since 1967.</p>
          </div>

          {/* Location Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-black text-ualg-navy mb-8 flex items-center gap-3">
              <MapPin className="w-10 h-10 text-orange-500" />
              Where We Are
            </h2>
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-xl border border-orange-100">
              <p className="text-2xl md:text-3xl font-bold text-ualg-navy mb-2">Majigam Na Raja</p>
              <p className="text-xl text-gray-700">Chhapra Faliya, Majigam</p>
              <p className="text-xl text-gray-700">Chikhli, Navsari</p>
              <p className="text-xl text-gray-700">Gujarat – 396521, India</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
