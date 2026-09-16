import { Instagram, Facebook, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-ualg-navy text-white py-12 border-t border-ualg-blue/30 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        <img 
          src="/logo.png" 
          alt="મજીગામ ના રાજા Logo" 
          className="w-16 h-16 rounded-full object-cover shadow-lg border-2 border-ualg-gold mb-4 bg-white" 
        />
        
        <h3 className="text-xl font-black text-white mb-1 tracking-wide">મજીગામ ના રાજા</h3>
        <p className="text-ualg-gold text-xs font-bold tracking-widest uppercase mb-2">MAJIGAM NA RAJA</p>
        <p className="text-gray-400 text-sm mb-6 text-center max-w-sm">
          Celebrating devotion, togetherness, and unforgettable moments of Ganesh Mahotsav.
        </p>

        {/* Social Media Links */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <a
            href="https://www.instagram.com/majigam_na_raja"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-white font-medium text-sm transition-opacity duration-200 hover:opacity-80"
            style={{ background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}
          >
            <Instagram className="w-4 h-4" />
            <span>Follow us on Instagram</span>
          </a>
          <a
            href="https://www.facebook.com/share/1J8GLuKahc/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-white font-medium text-sm bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
          >
            <Facebook className="w-4 h-4" />
            <span>Follow us on Facebook</span>
          </a>
          <a
            href="https://youtube.com/@majigam_na_raja"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-white font-medium text-sm bg-red-600 hover:bg-red-700 transition-colors duration-200"
          >
            <Youtube className="w-5 h-5" />
            <span className="text-sm font-medium">Subscribe on YouTube</span>
          </a>
        </div>

        <div className="w-full h-px bg-white/10 mb-6"></div>

        <div className="text-center text-xs text-gray-500 font-medium">
          <p>© {new Date().getFullYear()} મજીગામ ના રાજા (MAJIGAM NA RAJA). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

