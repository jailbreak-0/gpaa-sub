
import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import { EXECUTIVES, PARTNERS, REGIONAL_EXECUTIVES, GHANA_REGIONS } from '../constants';

const LeadershipCard: React.FC<{ leader: typeof EXECUTIVES[0], idx: number }> = ({ leader, idx }) => {
  const [isExpanded, setIsExpanded] = useState(idx === 0);
  const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

  return (
    <motion.div 
      variants={fadeInUp} 
      className="bg-white rounded-2xl border-2 border-[#e5e7eb] hover:border-green transition-all overflow-hidden"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 md:p-8 flex items-center gap-6 text-left hover:bg-background-light transition-all"
      >
        <div className="shrink-0">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden shadow-md border-2 border-green/20">
            <img 
              src={leader.image} 
              alt={leader.name} 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-2xl md:text-3xl font-black text-[#111418] mb-1">{leader.name}</h3>
          <p className="text-primary font-bold text-base md:text-lg uppercase tracking-wide">{leader.role}</p>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0"
        >
          <span className="material-symbols-outlined text-4xl text-green">expand_more</span>
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        {leader.bio && (
          <div className="px-6 md:px-8 pb-8 pt-4 border-t-2 border-green/10">
            <p className="text-[#617289] text-lg leading-relaxed">
              {leader.bio}
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const About: React.FC = () => {
  const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
  const stagger = { visible: { transition: { staggerChildren: 0.1 } } };
  
  // Partners Carousel Animation
  const partnersX = useMotionValue(0);
  const partnersRef = useRef<HTMLDivElement>(null);
  const [isScrollingPartners, setIsScrollingPartners] = useState(true);
  const [isDraggingPartners, setIsDraggingPartners] = useState(false);
  
  // Each partner card is 256px (w-64) + 24px gap = 280px
  // 17 partners × 280px = 4760px total width for one set
  const PARTNERS_WIDTH = 4760;
  
  useAnimationFrame((t) => {
    if (partnersRef.current && isScrollingPartners && !isDraggingPartners) {
      const xPos = partnersX.get();
      const newX = xPos - 0.4;
      // Reset seamlessly when scrolled exactly one full set
      if (newX <= -PARTNERS_WIDTH) {
        partnersX.set(newX + PARTNERS_WIDTH);
      } else {
        partnersX.set(newX);
      }
    }
  });

  const scrollPartnersLeft = () => {
    const currentX = partnersX.get();
    partnersX.set(currentX + 280); // Scroll one card width to the right
  };

  const scrollPartnersRight = () => {
    const currentX = partnersX.get();
    partnersX.set(currentX - 280); // Scroll one card width to the left
  };

  return (
    <div className="bg-white">
      {/* Page Hero */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative h-64 md:h-80 lg:h-100 flex items-center overflow-hidden"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCxhksdUPXXVk-NzwdM9rCSRElp9hD5tuwxIbb2oaSottS_n8CBn2KFYoOxhNMKmdPA0nLGXweg_lxOxW3fqn9VUylg2bOR3MqHBgAIo9-0qKpXDe-McBLKmUoGTxDDWVUHHeAtKw1tAqKoY3dUQbFIlfK4vqGO6v2qmdpaxZLC_fogOHpFItnF0fmN8aqKpffAS6KTUGwcGek6yN776X8glBgbU6LSuM02Qc3DL5N6qDlixxyHBsj4cK8_OWxUBhbufhrr7IwbACW7')` }}
        ></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 w-full">
          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex items-center gap-2 text-white/80 font-bold uppercase tracking-widest text-sm"
            >
              <a href="/" className="hover:text-white">Home</a>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="text-primary-light">About Us</span>
            </motion.div>
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6 leading-tight"
            >
              Advancing Clinical Excellence Across Ghana
            </motion.h1>
          </div>
        </div>
      </motion.section>

      {/* About Description */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="py-6 md:py-10 px-4 md:px-6 max-w-7xl mx-auto"
      >
        <div className="bg-[#f8f9fb] p-6 md:p-10 lg:p-16 rounded-2xl md:rounded-3xl border border-[#e5e7eb]">
          <p className="text-[#617289] text-base md:text-lg lg:text-xl leading-relaxed">
            The Ghana Physician Assistants Association formerly known as the Ghana Medical Assistants Association has been in existence for over four (4) decades and is a registered health profession association registered with the Trade Union Congress (TUC) of Ghana while the training and practice of the profession is regulated by the Medical and Dental Council (MDC)-Ghana.
          </p>
        </div>
      </motion.section>

      {/* Mission & Vision */}
      <motion.section
        id="mission"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="py-10 md:py-15 px-4 md:px-6 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <motion.div variants={fadeInUp} className="bg-[#f8f9fb] p-6 md:p-10 lg:p-12 rounded-2xl md:rounded-3xl border border-[#e5e7eb] hover:shadow-xl transition-all">
            <div className="size-12 md:size-16 bg-primary/10 rounded-xl md:rounded-2xl flex items-center justify-center text-primary mb-6 md:mb-8">
              <span className="material-symbols-outlined text-3xl md:text-4xl">target</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black mb-4 md:mb-6">Mission Statement</h2>
            <p className="text-[#617289] text-base md:text-lg lg:text-xl leading-relaxed">
              A highly respected, well-regulated, and influential Physician Assistant fraternity that leads in primary healthcare delivery, upholds excellence in professional practice, and contributes meaningfully to Ghana’s health system and global PA practice.
            </p>
          </motion.div>
          <motion.div variants={fadeInUp} className="bg-[#f8f9fb] p-6 md:p-10 lg:p-12 rounded-2xl md:rounded-3xl border border-[#e5e7eb] hover:shadow-xl transition-all">
            <div className="size-12 md:size-16 bg-primary/10 rounded-xl md:rounded-2xl flex items-center justify-center text-primary mb-6 md:mb-8">
              <span className="material-symbols-outlined text-3xl md:text-4xl">visibility</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black mb-4 md:mb-6">Our Vision</h2>
            <p className="text-[#617289] text-base md:text-lg lg:text-xl leading-relaxed">
              To promote quality healthcare delivery through effective advocacy, professional development, welfare support, research, ethical practice, and strong collaboration with national and international stakeholders, while uniting all Physician Assistants under one strong professional body dedicated to excellence and service.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Core Values Carousel */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="py-12 md:py-20 lg:py-24 px-4 md:px-6 bg-background-light"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">Our Core Values</h2>
            <div className="w-24 h-2 bg-primary mx-auto rounded-full"></div>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {[
              {
                icon: 'verified',
                title: 'Professionalism',
                description: 'Upholding the highest standards of clinical practice, ethical conduct, and continuous professional development',
                color: 'primary'
              },
              {
                icon: 'handshake',
                title: 'Collaboration and Partnership',
                description: 'Building strategic relationships with healthcare institutions, government bodies, and international PA associations',
                color: 'green'
              },
              {
                icon: 'health_and_safety',
                title: 'Service to Humanity',
                description: 'Dedicated to providing compassionate, patient-centered care that improves health outcomes across all communities',
                color: 'primary'
              },
              {
                icon: 'diversity_3',
                title: 'Unity and Solidarity',
                description: 'Fostering collaboration and solidarity among all PAs regardless of region, specialty, or level of practice',
                color: 'green'
              },
              {
                icon: 'workspace_premium',
                title: 'Innovation and Excellence',
                description: 'Commitment to quality healthcare delivery, evidence-based practice, and continuous improvement',
                color: 'primary'
              },
              {
                icon: 'balance',
                title: 'Equity and Fairness',
                description: 'Ensuring equal opportunities, fair treatment, and justice for all members of the association',
                color: 'green'
              },
              {
                icon: 'shield',
                title: 'Integrity',
                description: 'Maintaining honesty, transparency, and ethical standards in all professional and organizational activities',
                color: 'primary'
              },
              {
                icon: 'campaign',
                title: 'Advocacy',
                description: 'Championing the rights, welfare, and professional interests of all Physician Assistants across Ghana',
                color: 'green'
              },
              {
                icon: 'volunteer_activism',
                title: 'Community Commitment',
                description: 'Active engagement in community health initiatives and public service that benefits all Ghanaians',
                color: 'primary'
              }
            ].map((value, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="aspect-square bg-white p-4 md:p-5 rounded-xl md:rounded-2xl border-2 border-[#e5e7eb] hover:shadow-2xl transition-all group flex flex-col"
                whileHover={{ scale: 1.02 }}
              >
                <div className={`size-10 md:size-12 ${
                  value.color === 'green' 
                    ? 'bg-green/10 text-green' 
                    : 'bg-primary/10 text-primary'
                } rounded-lg md:rounded-xl flex items-center justify-center mb-2 md:mb-3 group-hover:scale-110 transition-all shrink-0`}>
                  <span className="material-symbols-outlined text-xl md:text-2xl">{value.icon}</span>
                </div>
                <h3 className="text-sm md:text-base lg:text-lg font-black mb-1 md:mb-2 leading-tight">{value.title}</h3>
                <p className="text-[#617289] text-xs md:text-sm leading-snug flex-1 overflow-hidden">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* President's Message */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="py-10 md:py-16 lg:py-20 bg-white px-4 md:px-6"
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-16 bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-[#e5e7eb]">
          <div className="w-full lg:w-2/5 aspect-4/5 bg-slate-200">
            <img 
              src="/images/president.jpg" 
              alt="GPAA President" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 md:p-8 lg:p-16 w-full lg:w-3/5">
            <div className="inline-block text-primary font-black uppercase tracking-widest text-xs md:text-sm mb-3 md:mb-4">Leadership Voice</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#111418] mb-6 md:mb-8 leading-tight">National President's Message</h2>
            <div className="relative">
              <span className="material-symbols-outlined text-5xl md:text-6xl lg:text-8xl absolute -top-6 md:-top-10 -left-4 md:-left-6 opacity-10 text-primary">format_quote</span>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl italic text-[#111418] leading-relaxed relative z-10 mb-6 md:mb-8 font-medium">
                "As Physician Assistants, we are often the first point of contact for patients across the length and breadth of our nation. Our commitment is to ensure every Ghanaian receives quality, compassionate care. Together, we are building a stronger, more resilient healthcare system for all."
              </p>
            </div>
            <div>
              <p className="text-lg sm:text-xl md:text-2xl font-black text-primary mb-1">Peter Akudugu Ayamba</p>
              <p className="text-sm sm:text-base md:text-lg text-[#617289] font-bold">National President, GPAA</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* History Timeline Preview */}
      <motion.section
        id="history"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="py-12 md:py-20 lg:py-24 px-4 md:px-6 max-w-7xl mx-auto"
      >
        <motion.div variants={fadeInUp} className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">Our Rich History</h2>
          <div className="w-24 h-2 bg-primary mx-auto rounded-full"></div>
        </motion.div>
        
        <motion.div variants={fadeInUp} className="bg-background-light p-6 md:p-10 lg:p-16 rounded-2xl md:rounded-3xl border border-[#e5e7eb]">
          <div className="prose prose-sm md:prose-lg max-w-none">
            <p className="text-[#617289] text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-4 md:mb-6">
              The Ghana Physician Assistants Association formerly known as the Ghana Medical Assistants Association has been in existence for over four (4) decades and had had many leaders.
            </p>
            <p className="text-[#617289] text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-4 md:mb-6">
              Prior to 1996 Delegates' congress in Koforidua at Eredec Hotel, Mr. Divine Kudjinu and Mr. Agyemfra, President and General Secretary respectively, and others of blessed memory steered the affairs of the Association.
            </p>
            <p className="text-[#617289] text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-4 md:mb-6">
              The Delegates' Conference held in 1996 at Koforidua led to the election of the following as executives:
            </p>
            <ul className="text-[#617289] text-sm sm:text-base md:text-lg leading-relaxed mb-4 md:mb-6 space-y-2">
              <li>Mr. Agyemfra - President</li>
              <li>Mr. Ralph Dagoe - Vice President</li>
              <li>Mr. Tebbi - General Secretary</li>
              <li>Mr. Dorho - General Vice Secretary</li>
              <li>Mr. Isaac Lamptey - Public Relations Officer (Late)</li>
              <li>Mr. Oppong - Financial Secretary</li>
              <li>Miss Korantema - Treasurer</li>
            </ul>
            <p className="text-[#617289] text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-4 md:mb-6">
              The newly elected officers in 1996 had their own internal conflicts which were unresolved. This led to internal strives which affected the organization of Delegates' Conference to elect new leaders until 2005 when there was a revolution which led to a Delegates' Conference in 2005 at the Crystal Rose Hotel in Kumasi-Ashanti Region.
            </p>
          </div>
          
          <div className="mt-6 md:mt-10 text-center">
            <a
              href="/about/history"
              className="inline-flex items-center gap-2 md:gap-3 bg-primary text-white px-6 md:px-10 py-3 md:py-5 rounded-lg md:rounded-xl font-black text-sm md:text-base lg:text-lg hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl"
            >
              Read Complete History
              <span className="material-symbols-outlined text-lg md:text-xl">arrow_forward</span>
            </a>
          </div>
        </motion.div>
      </motion.section>

      {/* Leadership - Collapsible */}
      <motion.section
        id="leadership"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="py-12 md:py-20 lg:py-24 bg-background-light px-4 md:px-6"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-12 md:mb-16 lg:mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6">National Leadership</h2>
            <p className="text-[#617289] text-sm sm:text-base md:text-lg lg:text-xl">The dedicated leaders steering our association forward with vision and integrity.</p>
          </motion.div>
          <motion.div variants={stagger} className="space-y-4 md:space-y-6">
            {EXECUTIVES.map((leader, idx) => (
              <LeadershipCard key={leader.name} leader={leader} idx={idx} />
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Regional Executives */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="py-12 md:py-20 lg:py-24 bg-white px-4 md:px-6"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6">Regional Executives</h2>
            <p className="text-[#617289] text-sm sm:text-base md:text-lg lg:text-xl">
              Our regional leaders ensuring representation and support across all 16 regions of Ghana.
            </p>
          </motion.div>
          <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GHANA_REGIONS.map((region) => {
              const regionExecs = REGIONAL_EXECUTIVES.filter(exec => exec.region === region);
              const chairman = regionExecs.find(exec => exec.role === 'Chairman');
              const secretary = regionExecs.find(exec => exec.role === 'Secretary');
              
              return (
                <motion.div 
                  key={region} 
                  variants={fadeInUp}
                  className="bg-background-light rounded-2xl p-6 border-2 border-[#e5e7eb] hover:border-ghana-green transition-all hover:shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b-2 border-ghana-gold/30">
                    <span className="material-symbols-outlined text-ghana-green text-3xl">location_on</span>
                    <h3 className="text-xl font-black text-[#111418]">{region} Region</h3>
                  </div>
                  <div className="space-y-4">
                    {chairman && (
                      <div>
                        <div className="text-xs font-bold text-primary uppercase tracking-wide mb-1">Chairman</div>
                        <div className="font-bold text-[#111418]">{chairman.name}</div>
                        {chairman.email && (
                          <a href={`mailto:${chairman.email}`} className="text-sm text-[#617289] hover:text-primary transition-colors">
                            {chairman.email}
                          </a>
                        )}
                      </div>
                    )}
                    {secretary && (
                      <div>
                        <div className="text-xs font-bold text-ghana-green uppercase tracking-wide mb-1">Secretary</div>
                        <div className="font-bold text-[#111418]">{secretary.name}</div>
                        {secretary.email && (
                          <a href={`mailto:${secretary.email}`} className="text-sm text-[#617289] hover:text-ghana-green transition-colors">
                            {secretary.email}
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Partners & Affiliations - Carousel */}
      <motion.section
        id="partners"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="py-12 md:py-20 lg:py-24 px-4 md:px-6 bg-white overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6">Partners & Affiliations</h2>
            <p className="text-[#617289] text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto mb-4">
              GPAA collaborates with key stakeholders in healthcare to enhance professional development, improve health service delivery, and advocate for policy reform.
            </p>
          </motion.div>
          <div ref={partnersRef} className="relative">
            <motion.div 
              className="grid grid-rows-2 gap-6 pb-4 cursor-grab active:cursor-grabbing"
              style={{ x: partnersX }}
              drag="x"
              dragConstraints={{ left: -PARTNERS_WIDTH * 2, right: 0 }}
              dragElastic={0.1}
              onDragStart={() => {
                setIsDraggingPartners(true);
                setIsScrollingPartners(false);
              }}
              onDragEnd={() => {
                setIsDraggingPartners(false);
                setIsScrollingPartners(true);
              }}
            >
              {/* Row 1 - First 9 partners */}
              <div className="flex gap-6">
                {[...Array(3)].flatMap(() => PARTNERS.slice(0, 9)).map((partner, idx) => (
                  <motion.div
                    key={`row1-${idx}`}
                    className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 bg-background-light p-4 md:p-5 rounded-xl md:rounded-2xl border-2 border-[#e5e7eb] hover:border-green hover:shadow-xl transition-all group shrink-0 flex flex-col justify-between"
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className="flex-1 flex items-center justify-center bg-white rounded-lg md:rounded-xl p-2 md:p-3 group-hover:bg-green/5 transition-all">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <h3 className="text-xs sm:text-sm font-black text-center group-hover:text-green transition-colors leading-tight mt-2 md:mt-3">
                      {partner.name}
                    </h3>
                  </motion.div>
                ))}
              </div>
              
              {/* Row 2 - Remaining 8 partners */}
              <div className="flex gap-6 ml-0 sm:ml-14 md:ml-32">
                {[...Array(3)].flatMap(() => PARTNERS.slice(9)).map((partner, idx) => (
                  <motion.div
                    key={`row2-${idx}`}
                    className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 bg-background-light p-4 md:p-5 rounded-xl md:rounded-2xl border-2 border-[#e5e7eb] hover:border-green hover:shadow-xl transition-all group shrink-0 flex flex-col justify-between"
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className="flex-1 flex items-center justify-center bg-white rounded-lg md:rounded-xl p-2 md:p-3 group-hover:bg-green/5 transition-all">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <h3 className="text-xs sm:text-sm font-black text-center group-hover:text-green transition-colors leading-tight mt-2 md:mt-3">
                      {partner.name}
                    </h3>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
