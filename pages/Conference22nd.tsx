import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const images = [
  '/images/22nd-conference/286.jpg',
  '/images/22nd-conference/287.jpg',
  '/images/22nd-conference/IMG_9071.jpg',
  '/images/22nd-conference/PSX_20251025_112435.jpg',
  '/images/22nd-conference/PSX_20251025_133157.jpg',
  '/images/22nd-conference/PSX_20251025_133705.jpg',
];

const Conference22nd: React.FC = () => {
  return (
    <div className="bg-white">
      <section className="bg-linear-to-br from-ghana-green via-primary to-primary-dark text-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-white/80 font-bold uppercase tracking-widest text-sm mb-6">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <Link to="/events" className="hover:text-white">Events</Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <Link to="/events/conference-archive" className="hover:text-white">Conference Archive</Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-primary-light">22nd Conference</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-4">22nd Annual Conference</h1>
          <p className="text-white/90 text-lg md:text-xl max-w-3xl">
            Photo gallery from the 22nd GPAA Annual Conference celebrations and sessions.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 bg-background-light">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, idx) => (
              <motion.figure
                key={image}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="bg-white rounded-2xl overflow-hidden border border-[#e5e7eb] shadow-lg"
              >
                <img
                  src={image}
                  alt={`22nd conference photo ${idx + 1}`}
                  className="w-full h-72 object-cover"
                  loading="lazy"
                />
              </motion.figure>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/events/conference-archive"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Back to Archive
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Conference22nd;
