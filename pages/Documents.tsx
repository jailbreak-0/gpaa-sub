import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SAMPLE_DOCUMENTS } from '../constants';

const Documents: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
  const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

  const categories = ['All', 'Financial', 'Reports', 'Calendar'];

  const filteredDocs = selectedCategory === 'All' 
    ? SAMPLE_DOCUMENTS.filter(doc => doc.category !== 'Forms' && doc.category !== 'Policies')
    : SAMPLE_DOCUMENTS.filter(doc => doc.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Financial': return 'account_balance';
      case 'Reports': return 'description';
      case 'Calendar': return 'event';
      default: return 'folder';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Financial': return 'text-ghana-green bg-ghana-green/10';
      case 'Reports': return 'text-primary bg-primary/10';
      case 'Calendar': return 'text-ghana-gold bg-ghana-gold/10';
      default: return 'text-[#617289] bg-[#617289]/10';
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-linear-to-br from-primary to-primary-dark py-20"
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
              Document Library
            </h1>
            <p className="text-white/90 text-xl max-w-3xl mx-auto">
              Access important GPAA documents including financial statements, reports, calendars, policies, and forms.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Category Filter */}
      <section className="py-12 px-6 bg-background-light border-b-2 border-[#e5e7eb]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-xl font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-ghana-green text-white shadow-lg scale-105'
                    : 'bg-white text-[#617289] hover:bg-ghana-green/10 border-2 border-[#e5e7eb]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Documents Grid */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="py-20 px-6"
      >
        <div className="max-w-7xl mx-auto">
          {filteredDocs.length === 0 ? (
            <div className="text-center py-20">
              <span className="material-symbols-outlined text-8xl text-[#617289]/30 mb-4">folder_open</span>
              <p className="text-[#617289] text-xl">No documents found in this category</p>
            </div>
          ) : (
            <motion.div variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocs.map((doc, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="bg-white rounded-2xl border-2 border-[#e5e7eb] hover:border-ghana-green hover:shadow-xl transition-all overflow-hidden group"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`size-14 rounded-xl flex items-center justify-center ${getCategoryColor(doc.category)}`}>
                        <span className="material-symbols-outlined text-3xl">{getCategoryIcon(doc.category)}</span>
                      </div>
                      <span className="text-xs font-bold text-[#617289] bg-background-light px-3 py-1 rounded-full">
                        {doc.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-black mb-3 group-hover:text-ghana-green transition-colors line-clamp-2">
                      {doc.title}
                    </h3>
                    
                    <p className="text-[#617289] text-sm mb-4 line-clamp-2">
                      {doc.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-[#617289] mb-4">
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">calendar_today</span>
                        {new Date(doc.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                      {doc.size && (
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">description</span>
                          {doc.size}
                        </div>
                      )}
                    </div>
                    
                    <a
                      href={doc.fileUrl}
                      download
                      className="flex items-center justify-center gap-2 bg-ghana-green text-white px-6 py-3 rounded-xl font-bold hover:bg-green-dark transition-all group-hover:scale-105 transform"
                    >
                      <span className="material-symbols-outlined">download</span>
                      Download
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Members Only Notice */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="py-16 px-6 bg-ghana-gold/10"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 md:p-12 rounded-3xl border-2 border-ghana-gold shadow-xl">
            <div className="flex items-start gap-6">
              <div className="size-16 rounded-full bg-ghana-gold/20 flex items-center justify-center text-ghana-gold shrink-0">
                <span className="material-symbols-outlined text-4xl">lock</span>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-black mb-4">Members Only Access</h3>
                <p className="text-[#617289] text-lg mb-6">
                  Some documents are restricted to current GPAA members. Please log in to access the full document library, 
                  including detailed financial reports, minutes of meetings, and confidential policy documents.
                </p>
                <a
                  href="/membership#login"
                  className="inline-flex items-center gap-2 bg-ghana-green text-white px-8 py-4 rounded-xl font-bold hover:bg-green-dark transition-all"
                >
                  <span className="material-symbols-outlined">login</span>
                  Member Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Documents;
