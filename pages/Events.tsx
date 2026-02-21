import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EVENTS } from '../constants';

const Events: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  const filteredEvents = filter === 'all' 
    ? EVENTS 
    : EVENTS.filter(e => e.type === filter);

  return (
    <div className="bg-white">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-linear-to-br from-primary via-primary-dark to-[#0a4296] py-24"
      >
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8">
              Events & Conferences
            </h1>
            <p className="text-white/90 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Join us at our professional development events, annual conferences, and community health outreaches across Ghana
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Filter Tabs */}
      <section className="sticky top-16 bg-white/95 backdrop-blur-md border-b border-[#e5e7eb] z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-center gap-4">
          {[
            { value: 'all', label: 'All Events' },
            { value: 'upcoming', label: 'Upcoming' },
            { value: 'past', label: 'Past Events' }
          ].map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setFilter(value as any)}
              className={`px-8 py-3 rounded-xl font-bold cursor-pointer transition-all ${
                filter === value
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-background-light text-[#617289] hover:bg-[#e5e7eb]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filteredEvents.map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden border-2 border-[#e5e7eb] hover:border-primary hover:shadow-2xl transition-all group"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className={`px-4 py-1 rounded-full text-xs font-black uppercase ${
                    event.type === 'upcoming'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {event.type}
                  </span>
                </div>
                <h3 className="text-2xl font-black mb-4 group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-3 text-[#617289]">
                    <span className="material-symbols-outlined text-primary">calendar_month</span>
                    <span className="font-bold">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#617289]">
                    <span className="material-symbols-outlined text-primary">location_on</span>
                    <span className="font-bold">{event.location}</span>
                  </div>
                </div>
                <p className="text-[#617289] leading-relaxed mb-6">{event.description}</p>
                <button className="w-full cursor-pointer bg-primary text-white py-3 rounded-xl font-bold hover:text-primary hover:bg-white hover:border-2 hover:border-primary transition-all">
                  {event.type === 'upcoming' ? 'Register Now' : 'View Details'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Annual Conference Archive */}
      <section className="py-24 bg-background-light px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Annual Conference Archive</h2>
            <p className="text-[#617289] text-xl">Celebrating over 20 years of professional excellence</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { year: '2025', theme: 'Digital Health Transformation' },
              { year: '2024', theme: 'Universal Health Coverage Now' },
              { year: '2023', theme: 'PAs Leading Primary Care' },
              { year: '2022', theme: 'Post-Pandemic Healthcare' },
              { year: '2021', theme: 'Resilience in Crisis' },
              { year: '2020', theme: 'Innovation & Technology' },
              { year: '2019', theme: 'Quality Healthcare for All' },
              { year: '2018', theme: 'Professional Excellence' },
              { year: '2017', theme: 'Community Health Impact' },
              { year: '2016', theme: '50 Years of Service' },
            ].map((conf, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white p-6 rounded-2xl border border-[#e5e7eb] hover:border-primary hover:shadow-lg transition-all text-center cursor-pointer group"
              >
                <div className="text-4xl font-black text-primary mb-3 group-hover:scale-110 transition-transform">{conf.year}</div>
                <div className="text-sm font-bold text-[#617289] leading-tight">{conf.theme}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-225 mx-auto bg-linear-to-br from-primary to-primary-dark rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-4xl font-black mb-6">Don't Miss Our Next Event</h2>
          <p className="text-white/90 text-xl mb-8">
            Subscribe to our newsletter to receive event updates and early registration access
          </p>
          <div className="flex gap-3 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-xl text-[#111418] outline-none bg-white placeholder:text-[#617289] transition-all focus:ring-2 focus:ring-primary focus:ring-offset-1"
            />
            <button className="bg-white cursor-pointer text-primary px-4 py-4 rounded-xl font-black hover:bg-primary hover:border-2 hover:text-white transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
