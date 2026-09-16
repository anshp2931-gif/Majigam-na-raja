// frontend/src/gallery/components/GalleryHero.jsx
import { Link } from 'react-router-dom';

export default function GalleryHero() {
  return (
    <section
      className="relative text-white py-12 sm:py-20 lg:py-28 px-4 overflow-hidden"
      style={{
        backgroundImage: "url('/ganpatibanner.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#0d1b4b',
      }}
    >
      <div className="absolute inset-0 bg-[#07163a]/25 pointer-events-none" />
      <div className="absolute inset-0 backdrop-blur-[1px] pointer-events-none" />

      {/* Decorative circles - Scaled down for mobile */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 -left-10 sm:-top-20 sm:-left-20 w-40 h-40 sm:w-72 sm:h-72 rounded-full opacity-10 bg-ualg-gold" />
        <div className="absolute -bottom-10 -right-10 sm:-bottom-16 sm:-right-16 w-40 h-40 sm:w-64 sm:h-64 rounded-full opacity-10 bg-purple-600" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 rounded-full opacity-[0.03] bg-ualg-gold" />
      </div>

      <div className="relative max-w-7xl mx-auto flex flex-col items-center text-center gap-8 z-10">
        {/* Hero Text */}
        <div className="flex-1">
          {/* Org name */}
          <p className="text-ualg-gold font-black tracking-widest text-xs sm:text-sm uppercase mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            મજીગામ ના રાજા • MAJIGAM NA RAJA
          </p>

          {/* Title */}
          <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-black mb-4 leading-tight tracking-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
            GANPATI{' '}
            <span className="text-ualg-gold">GALLERY</span>
          </h1>

          {/* Subtitle */}
          <p className="text-blue-100 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed drop-shadow-[0_3px_5px_rgba(0,0,0,0.9)]">
            Celebrating devotion, togetherness and unforgettable moments.
          </p>

        </div>

      </div>
    </section>
  );
}
