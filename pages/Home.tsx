
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PILLARS, NEWS, PARTNERS } from '../constants';

const Home: React.FC = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const stagger = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-white">
        <div className="max-w-350 mx-auto p-4 md:p-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-linear-to-br from-slate-900 via-primary-dark to-primary min-h-150 flex flex-col justify-end p-8 md:p-20 shadow-2xl"
          >
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center opacity-70 mix-blend-overlay scale-105" 
              style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBVuTLDhlHybXyBhB5LhYTWIhMrqrELWIPLFC9xjF4kcDu3ewQRaPETCsuy2iEygh9zC41olCEwbQVutbr24ODBX0IGWssYpPe0HOLIkWE9w3SN7HTSNM9qz2wFlrHXfPykDc3mAoNAphXEwvf1_Bp-U2oxLcb134UZv7WyWGeQdcjvbpSlU00IJN126CIbBnaUPfrzk9yfQcjgBeAyxt12OPVidh0iD7mdPyJgRpEfk6Sts28-3QVrfdKlph07dd8RJkAyeJSRZon9')` }}
            ></div>
            <div className="absolute inset-0 z-0 bg-linear-to-t from-black/90 via-black/40 to-transparent"></div>
            
            <div className="relative z-10 max-w-4xl">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-white text-5xl md:text-7xl font-black leading-[1.05] tracking-tight mb-8 drop-shadow-lg"
              >
                Empowering Physician Assistants, Advancing Healthcare for Ghana
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-white/90 text-xl md:text-2xl font-medium mb-10 max-w-2xl leading-relaxed drop-shadow"
              >
                The official professional association for Physician Assistants in Ghana. Dedicated to advancing clinical excellence, professional development, and quality healthcare delivery nationwide since 1980.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-wrap gap-5"
              >
                <Link
                  to="/membership/join"
                  className="px-10 py-5 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary-dark transition-all transform hover:-translate-y-1 shadow-lg shadow-primary/25"
                >
                  Join GPAA Today
                </Link>
                <Link to="/about#history" className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-xl font-bold text-lg hover:bg-white/20 transition-all text-center">
                  Learn Our Story
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section Overview */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="py-20 md:py-32 bg-white px-6"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div variants={fadeInUp} className="relative">
            <div className="rounded-3xl overflow-hidden aspect-video lg:aspect-square shadow-2xl ring-8 ring-background-light/50">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsEjnzETfysxph7bsFcZWTxIvnlheAo9-96REquKX0D_dxrjo_kW39qBOr8w0aJp6weqWuo9bAs76UK0prb0wwWd6UfFeUgUfQEWx5_960vJ8fOEG_iGAEBfmE1wY_bgo6--geeqNoTUP6b5x1BmohnvS8ROfrl_hX4Z2JU40hXzi1W3dwfDadORY6YNYmtjP99L6A1M7NWyRDjmTL6VJuEuKlEErAiouc51Yr8teJERtC8alZeAiQGdjG9HIVgxNKQvcMsDNrYG8u" 
                alt="Ghanaian clinical staff"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-primary text-white p-10 rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform hidden md:block border-4 border-white">
              <p className="text-5xl font-black mb-1">50+</p>
              <p className="text-sm font-bold uppercase tracking-widest opacity-90">Years of Excellence</p>
            </div>
          </motion.div>

          <div className="flex flex-col gap-8">
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full w-fit">
              <span className="material-symbols-outlined text-sm">medical_services</span>
              <span className="font-bold tracking-widest uppercase text-xs">About GPAA</span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-black text-[#111418] leading-tight">
              Advancing the Profession with Integrity and Care
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-[#617289] text-xl leading-relaxed">
              The Ghana Physician Assistants Association (GPAA) is the sole professional body representing the interests of all Physician Assistants in Ghana. We ensure excellence in clinical practice, healthcare delivery, and professional ethics across all regions.
            </motion.p>
            <motion.ul variants={stagger} className="space-y-5">
              {[
                'Registered Professional Association under the Laws of Ghana',
                'Advocating for better working conditions and career paths',
                'Promoting continuous learning and medical research'
              ].map((text, i) => (
                <motion.li key={i} variants={fadeInUp} className="flex items-start gap-4 group">
                  <span className="material-symbols-outlined text-primary bg-primary/10 p-1 rounded-full text-xl group-hover:scale-110 transition-transform">check_circle</span>
                  <span className="text-[#111418] font-bold text-lg mt-1">{text}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </motion.section>

      {/* Pillars Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="py-24 bg-[#f8f9fb] px-6"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-[#111418] mb-6">Our Core Strategic Pillars</h2>
            <p className="text-[#617289] text-xl">
              We work tirelessly to support our members through three main channels of engagement and service.
            </p>
          </motion.div>
          <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {PILLARS.map((pillar) => (
              <motion.div key={pillar.title} variants={fadeInUp} className="bg-white p-10 rounded-2xl border border-[#e5e7eb] hover:shadow-2xl transition-all hover:-translate-y-2 group">
                <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <span className="material-symbols-outlined text-4xl">{pillar.icon}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#111418]">{pillar.title}</h3>
                <p className="text-[#617289] text-lg leading-relaxed">{pillar.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Latest Updates Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="py-24 bg-white px-6"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl font-black text-[#111418] mb-3">Latest Updates</h2>
              <p className="text-[#617289] text-lg">Stay informed about policy changes, association news, and medical updates across the country.</p>
            </div>
            <a href="/news" className="flex items-center gap-3 text-primary-light font-bold text-lg hover:text-primary-dark transition-all group shrink-0">
              View All News 
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
            </a>
          </motion.div>

          <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {NEWS.map((item, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="group cursor-pointer">
                <div className="rounded-2xl overflow-hidden mb-6 aspect-16/10 shadow-lg">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                </div>
                <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase bg-primary/5 px-3 py-1 rounded-md">{item.category}</span>
                <h3 className="text-2xl font-extrabold mt-4 text-[#111418] group-hover:text-primary transition-colors leading-tight">
                  {item.title}
                </h3>
                <p className="text-[#617289] text-lg mt-4 line-clamp-2 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="py-20 px-6"
      >
        <div className="max-w-7xl mx-auto bg-primary rounded-[2.5rem] p-10 md:p-20 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-2/5 h-full opacity-10 pointer-events-none translate-x-1/4">
            <svg fill="none" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
              <circle cx="200" cy="200" r="180" stroke="white" strokeWidth="20"></circle>
              <circle cx="200" cy="200" r="120" stroke="white" strokeWidth="20"></circle>
              <circle cx="200" cy="200" r="60" stroke="white" strokeWidth="20"></circle>
            </svg>
          </div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl text-center lg:text-left">
              <h2 className="text-white text-4xl md:text-6xl font-black mb-6 leading-tight">Strengthen Our Voice</h2>
              <p className="text-white/80 text-xl md:text-2xl leading-relaxed">
                Your membership powers our advocacy. Join the association today or contribute to our development fund to advance healthcare in Ghana.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-5 shrink-0 w-full lg:w-auto">
              <a href="/membership/join">
                <button className="bg-white cursor-pointer text-primary px-10 py-5 rounded-xl font-black text-xl hover:bg-slate-100 transition-all shadow-xl hover:-translate-y-1 w-full sm:w-auto">
                  Become a Member
                </button>
              </a>
              <a href="/donate">
                <button className="bg-primary-dark/30 cursor-pointer backdrop-blur-md border-2 border-white/40 text-white px-10 py-5 rounded-xl font-black text-xl hover:bg-white/10 transition-all w-full sm:w-auto">
                  Support Our Mission
                </button>
              </a>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
