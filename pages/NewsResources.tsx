import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { NEWS } from '../constants';

const NewsResources: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'news' | 'research' | 'newsletters' | 'downloads'>('news');
  const [searchQuery, setSearchQuery] = useState('');

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

  const researchPapers = [
    {
      title: 'The Role of Physician Assistants in Ghana\'s Primary Healthcare System',
      authors: 'Mensah P., Boateng A., et al.',
      journal: 'Ghana Medical Journal',
      year: '2026',
      type: 'Research Paper'
    },
    {
      title: 'Impact of CHPS Zones on Maternal Mortality Rates in Northern Ghana',
      authors: 'Appiah K., Tetteh S.',
      journal: 'African Journal of Primary Healthcare',
      year: '2025',
      type: 'Original Research'
    },
    {
      title: 'Scope of Practice Expansion: International Lessons for Ghana',
      authors: 'GPAA Research Committee',
      journal: 'GPAA Quarterly Review',
      year: '2025',
      type: 'Review Article'
    },
    {
      title: 'Burnout and Mental Health Among Physician Assistants: A National Survey',
      authors: 'Owusu J., Addo M.',
      journal: 'West African Health Sciences',
      year: '2025',
      type: 'Survey Research'
    },
  ];

  const newsletters = [
    { month: 'February 2026', title: 'New Year, New Advocacy Goals', cover: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400' },
    { month: 'January 2026', title: 'AGM 2026: Save the Date', cover: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400' },
    { month: 'December 2025', title: '2025 Year in Review', cover: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400' },
  ];

  const downloads = [
    { title: 'GPAA Constitution (2024 Edition)', type: 'PDF', size: '2.4 MB', icon: 'gavel' },
    { title: 'CPD Credits Requirements & Guidelines', type: 'PDF', size: '1.8 MB', icon: 'school' },
    { title: 'Code of Professional Ethics', type: 'PDF', size: '890 KB', icon: 'verified' },
    { title: 'Membership Registration Form', type: 'PDF', size: '450 KB', icon: 'description' },
    { title: 'Annual Report 2025', type: 'PDF', size: '5.2 MB', icon: 'summarize' },
    { title: 'Financial Transparency Report 2025', type: 'PDF', size: '1.1 MB', icon: 'account_balance' },
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
              News & Resources
            </h1>
            <p className="text-white/90 text-xl max-w-2xl mx-auto mb-10">
              Stay informed with the latest updates and access professional publications, research, and resources
            </p>
            <div className="max-w-2xl mx-auto">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search news and resources..."
                  className="flex-1 px-6 py-4 rounded-xl outline-none text-lg bg-white placeholder:text-[#617289] transition-all focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
                />
                <button className="bg-white text-primary px-8 py-4 rounded-xl font-black hover:bg-slate-100 transition-all">
                  Search
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Resource Categories */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { title: 'News & Updates', icon: 'newsmode', count: '50+ Articles', color: 'bg-primary', key: 'news' },
            { title: 'Research & Journals', icon: 'science', count: '45+ Papers', color: 'bg-green-500', key: 'research' },
            { title: 'Newsletters', icon: 'newspaper', count: '120+ Issues', color: 'bg-purple-500', key: 'newsletters' },
            { title: 'Downloads', icon: 'download', count: '30+ Documents', color: 'bg-orange-500', key: 'downloads' },
          ].map((cat, idx) => (
            <motion.button
              key={idx}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setActiveTab(cat.key as any)}
              className={`p-6 md:p-8 rounded-2xl border-2 transition-all cursor-pointer group ${
                activeTab === cat.key
                  ? 'border-primary bg-primary/5 shadow-xl'
                  : 'border-[#e5e7eb] hover:border-primary hover:shadow-xl bg-white'
              }`}
            >
              <div className={`size-12 md:size-16 ${cat.color} rounded-2xl flex items-center justify-center text-white mb-4 md:mb-6 mx-auto group-hover:scale-110 transition-transform`}>
                <span className="material-symbols-outlined text-2xl md:text-3xl">{cat.icon}</span>
              </div>
              <h3 className="text-lg md:text-2xl font-black mb-2">{cat.title}</h3>
              <p className="text-[#617289] font-bold text-sm md:text-base">{cat.count}</p>
            </motion.button>
          ))}
        </div>
      </section>

      {/* News Section */}
      {activeTab === 'news' && (
        <>
          {/* Featured Story */}
          <section className="py-20 px-6 max-w-7xl mx-auto">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
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
          <section className="py-20 px-6 max-w-7xl mx-auto">
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
        </>
      )}

      {/* Research Section */}
      {activeTab === 'research' && (
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <h2 className="text-4xl font-black mb-12">Latest Research & Publications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {researchPapers.map((paper, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-2xl border border-[#e5e7eb] hover:shadow-lg transition-all group"
              >
                <span className="inline-block bg-primary/10 text-primary text-xs font-black px-3 py-1 rounded-full mb-4 uppercase">
                  {paper.type}
                </span>
                <h3 className="text-xl font-black mb-3 group-hover:text-primary transition-colors leading-tight">
                  {paper.title}
                </h3>
                <div className="text-[#617289] text-sm mb-4">
                  <p className="font-bold">{paper.authors}</p>
                  <p>{paper.journal} • {paper.year}</p>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 cursor-pointer bg-primary text-white py-2 px-4 rounded-lg font-bold text-sm hover:bg-primary-dark transition-all">
                    <span className="material-symbols-outlined text-sm align-middle mr-1">download</span>
                    Download PDF
                  </button>
                  <button className="bg-background-light cursor-pointer px-4 py-2 rounded-lg font-bold text-sm hover:bg-[#e5e7eb] transition-all">
                    <span className="material-symbols-outlined text-sm">share</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Newsletters Section */}
      {activeTab === 'newsletters' && (
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <h2 className="text-4xl font-black mb-12">GPAA Monthly Newsletter</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsletters.map((newsletter, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl overflow-hidden border border-[#e5e7eb] hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className="h-48 overflow-hidden">
                  <img src={newsletter.cover} alt={newsletter.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="text-primary font-bold text-sm mb-2">{newsletter.month}</div>
                  <h3 className="text-xl font-black mb-4">{newsletter.title}</h3>
                  <button className="w-full cursor-pointer bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-dark transition-all">
                    Read Online
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Downloads Section */}
      {activeTab === 'downloads' && (
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <h2 className="text-4xl font-black mb-12">Downloads Library</h2>
          <div className="space-y-4">
            {downloads.map((file, idx) => (
              <motion.div
                key={idx}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center justify-between bg-white p-6 rounded-xl border border-[#e5e7eb] hover:shadow-lg transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="size-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                    <span className="material-symbols-outlined">{file.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-black mb-1">{file.title}</h3>
                    <p className="text-sm text-[#617289]">{file.type} • {file.size}</p>
                  </div>
                </div>
                <button className="bg-primary cursor-pointer text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-dark transition-all flex items-center gap-2">
                  <span className="material-symbols-outlined">download</span>
                  Download
                </button>
              </motion.div>
            ))}
          </div>
        </section>
      )}

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

export default NewsResources;
