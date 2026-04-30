import React from 'react';
import { motion } from 'framer-motion';
import { NEWS } from '../constants';

const News: React.FC = () => {
  const allNews = [
    ...NEWS,
    {
      category: 'CPD Update',
      title: 'New Online Learning Platform Launched for Members',
      description: 'GPAA introduces state-of-the-art e-learning portal with over 100 accredited CPD courses available on-demand for professional members.',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800',
      date: 'Feb 15, 2026'
    },
    {
      category: 'Recognition',
      title: 'Three GPAA Members Awarded National Health Service Medals',
      description: 'Presidential honors bestowed upon PAs for exceptional service in rural healthcare delivery and emergency response during recent health crisis.',
      image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800',
      date: 'Feb 10, 2026'
    },
    {
      category: 'Partnership',
      title: 'WHO Collaborates with GPAA on Primary Healthcare Training',
      description: 'International partnership to strengthen PA competencies in maternal health and infectious disease management across West Africa.',
      image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800',
      date: 'Feb 5, 2026'
    },
  ];

  return (
    <div className="bg-white">
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
              News & Updates
            </h1>
            <p className="text-white/90 text-xl max-w-2xl mx-auto">
              Stay informed about the latest developments, announcements, and press releases from GPAA
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Story */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center bg-background-light rounded-3xl overflow-hidden"
        >
          <div className="h-full">
            <img
              src={allNews[0].image}
              alt={allNews[0].title}
              className="w-full h-full object-cover min-h-100"
            />
          </div>
          <div className="p-8 md:p-12">
            <span className="inline-block bg-primary text-white text-xs font-black px-4 py-2 rounded-full mb-4 uppercase">
              Featured Story
            </span>
            <h2 className="text-4xl font-black mb-6 leading-tight">{allNews[0].title}</h2>
            <p className="text-[#617289] text-lg mb-8 leading-relaxed">{allNews[0].description}</p>
            <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-dark transition-all">
              Read Full Article
            </button>
          </div>
        </motion.div>
      </section>

      {/* News Grid */}
      <section className="py-20 bg-background-light px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black mb-12">Recent Updates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allNews.slice(1).map((item, idx) => (
              <motion.article
                key={idx}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden border border-[#e5e7eb] hover:shadow-xl transition-all group cursor-pointer"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-primary text-xs font-black px-3 py-1 bg-primary/10 rounded-full uppercase">
                      {item.category}
                    </span>
                    {item.date && <span className="text-[#617289] text-sm font-bold">{item.date}</span>}
                  </div>
                  <h3 className="text-xl font-black mb-3 group-hover:text-primary transition-colors leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[#617289] mb-4 line-clamp-2">{item.description}</p>
                  <div className="flex items-center text-primary font-bold gap-2 group-hover:gap-3 transition-all">
                    Read More
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-20 px-6 max-w-250 mx-auto">
        <h2 className="text-4xl font-black mb-12">Official Press Releases</h2>
        <div className="space-y-6">
          {[
            { date: 'Feb 12, 2026', title: 'GPAA Statement on Proposed Health Sector Reforms', type: 'Policy Statement' },
            { date: 'Jan 28, 2026', title: 'Response to Media Reports on PA Scope of Practice', type: 'Press Release' },
            { date: 'Jan 15, 2026', title: 'GPAA Condemns Violence Against Healthcare Workers', type: 'Official Statement' },
            { date: 'Dec 20, 2025', title: 'Year-End Message from the National President', type: 'Announcement' },
          ].map((release, idx) => (
            <motion.div
              key={idx}
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-start gap-6 bg-background-light p-6 rounded-xl border border-[#e5e7eb] hover:bg-white hover:shadow-lg transition-all group cursor-pointer"
            >
              <div className="size-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                <span className="material-symbols-outlined">newsmode</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[#617289] text-sm font-bold">{release.date}</span>
                  <span className="text-primary text-xs font-black px-2 py-1 bg-primary/10 rounded uppercase">
                    {release.type}
                  </span>
                </div>
                <h3 className="text-xl font-black group-hover:text-primary transition-colors">{release.title}</h3>
              </div>
              <span className="material-symbols-outlined text-[#617289] group-hover:text-primary transition-colors">
                arrow_forward
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 px-6 bg-primary">
        <div className="max-w-200 mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-6">Never Miss an Update</h2>
          <p className="text-white/90 text-xl mb-10">
            Subscribe to our newsletter and get the latest news delivered to your inbox
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-xl outline-none"
            />
            <button className="bg-white text-primary px-8 py-4 rounded-xl font-black hover:bg-slate-100 transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;
