import { useState } from 'react';
import { MapPin, Navigation, Phone } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MandalLocation() {
  const [activeTab, setActiveTab] = useState('map');

  const mandalInfo = {
    name: 'મજીગામ ના રાજા',
    address: 'Majigam, Chhapra Faliya, Chikhli, Navsari ,Gujarat 396521',
    phone: '+91 98765 43210',
    coordinates: {
      lat: 20.746606165177194,
      lng: 73.0445694914872
    }
  };

  const getDirectionsUrl = () => {
    return 'https://maps.app.goo.gl/6WNwsxiXhPTndSZ17';
  };

  const getMapEmbedUrl = () => {
    return 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2322.2679818425772!2d73.0445694914872!3d20.746606165177194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0eda76ac8a5f5%3A0xb9b42bee6e5fcb2!2sMajigam%20Na%20Raja!5e0!3m2!1sen!2sin!4v1789290995821!5m2!1sen!2sin';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-ualg-navy to-blue-800 text-white py-12 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-black mb-4 flex items-center justify-center gap-3">
              <MapPin className="w-10 h-10 text-ualg-gold" />
              Mandal Location
            </h1>
            <p className="text-blue-200 text-lg">Find us easily with detailed directions and landmarks</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Tabs */}
          <div className="flex gap-2 mb-8 bg-white rounded-xl p-2 shadow-md">
            <button
              onClick={() => setActiveTab('map')}
              className={`flex-1 py-3 px-6 rounded-lg font-bold transition-all ${
                activeTab === 'map'
                  ? 'bg-ualg-navy text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <MapPin className="w-5 h-5 inline mr-2" />
              Map
            </button>
            <button
              onClick={() => setActiveTab('address')}
              className={`flex-1 py-3 px-6 rounded-lg font-bold transition-all ${
                activeTab === 'address'
                  ? 'bg-ualg-navy text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Navigation className="w-5 h-5 inline mr-2" />
              Address & Contact
            </button>
          </div>

          {/* Map Tab */}
          {activeTab === 'map' && (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6 border-b bg-gray-50">
                <h2 className="text-2xl font-bold text-ualg-navy mb-2">Interactive Map</h2>
                <p className="text-gray-600">Click "Get Directions" to navigate to our location</p>
              </div>
              <div className="relative h-[500px]">
                <iframe
                  src={getMapEmbedUrl()}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mandal Location Map"
                ></iframe>
                <a
                  href={getDirectionsUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 bg-ualg-navy text-white px-6 py-3 rounded-lg font-bold hover:bg-ualg-blue transition-colors shadow-lg flex items-center gap-2"
                >
                  <Navigation className="w-5 h-5" />
                  Get Directions
                </a>
              </div>
            </div>
          )}

          {/* Address Tab */}
          {activeTab === 'address' && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-ualg-navy mb-8 flex items-center gap-3">
                <Navigation className="w-8 h-8 text-ualg-gold" />
                Address & Contact Information
              </h2>

              <div className="space-y-6 max-w-2xl mx-auto">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-lg text-ualg-navy mb-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    Full Address
                  </h3>
                  <p className="text-gray-700 text-lg">{mandalInfo.address}</p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
                  <h3 className="font-bold text-lg text-ualg-navy mb-3 flex items-center gap-2">
                    <Phone className="w-5 h-5 text-green-600" />
                    Contact Number
                  </h3>
                  <p className="text-gray-700 text-lg">{mandalInfo.phone}</p>
                </div>

                <a
                  href={getDirectionsUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-ualg-navy text-white text-center py-4 rounded-xl font-bold hover:bg-ualg-blue transition-colors shadow-lg flex items-center justify-center gap-2 text-lg"
                >
                  <Navigation className="w-6 h-6" />
                  Open in Google Maps
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
