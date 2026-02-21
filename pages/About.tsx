
import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import { EXECUTIVES, PARTNERS } from '../constants';

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
  
  // Core Values Carousel Animation
  const coreValuesX = useMotionValue(0);
  const coreValuesRef = useRef<HTMLDivElement>(null);
  const [isScrollingCoreValues, setIsScrollingCoreValues] = useState(true);
  
  // Each core value card is 350px (min-w-87.5) + 24px gap = 374px
  // 9 values × 374px = 3366px total width for one set
  const CORE_VALUES_WIDTH = 3366;
  
  useAnimationFrame((t) => {
    if (coreValuesRef.current && isScrollingCoreValues) {
      const xPos = coreValuesX.get();
      const newX = xPos - 0.5;
      // Reset seamlessly when scrolled exactly one full set
      if (newX <= -CORE_VALUES_WIDTH) {
        coreValuesX.set(newX + CORE_VALUES_WIDTH);
      } else {
        coreValuesX.set(newX);
      }
    }
  });

  const scrollCoreValuesLeft = () => {
    const currentX = coreValuesX.get();
    coreValuesX.set(currentX + 374); // Scroll one card width to the right
  };

  const scrollCoreValuesRight = () => {
    const currentX = coreValuesX.get();
    coreValuesX.set(currentX - 374); // Scroll one card width to the left
  };
  
  // Partners Carousel Animation
  const partnersX = useMotionValue(0);
  const partnersRef = useRef<HTMLDivElement>(null);
  const [isScrollingPartners, setIsScrollingPartners] = useState(true);
  
  // Each partner card is 280px (min-w-70) + 24px gap = 304px
  // 17 partners × 304px = 5168px total width for one set
  const PARTNERS_WIDTH = 5168;
  
  useAnimationFrame((t) => {
    if (partnersRef.current && isScrollingPartners) {
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
    partnersX.set(currentX + 304); // Scroll one card width to the right
  };

  const scrollPartnersRight = () => {
    const currentX = partnersX.get();
    partnersX.set(currentX - 304); // Scroll one card width to the left
  };

  return (
    <div className="bg-white">
      {/* Page Hero */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative h-100 flex items-center overflow-hidden"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCxhksdUPXXVk-NzwdM9rCSRElp9hD5tuwxIbb2oaSottS_n8CBn2KFYoOxhNMKmdPA0nLGXweg_lxOxW3fqn9VUylg2bOR3MqHBgAIo9-0qKpXDe-McBLKmUoGTxDDWVUHHeAtKw1tAqKoY3dUQbFIlfK4vqGO6v2qmdpaxZLC_fogOHpFItnF0fmN8aqKpffAS6KTUGwcGek6yN776X8glBgbU6LSuM02Qc3DL5N6qDlixxyHBsj4cK8_OWxUBhbufhrr7IwbACW7')` }}
        ></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
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
              className="text-white text-5xl md:text-7xl font-black mb-6 leading-tight"
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
        className="py-10 px-6 max-w-7xl mx-auto"
      >
        <div className="bg-[#f8f9fb] p-10 md:p-16 rounded-3xl border border-[#e5e7eb]">
          <p className="text-[#617289] text-xl leading-relaxed">
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
        className="py-15 px-6 max-w-7xl mx-auto"
      >
        <div className="grid md:grid-cols-2 gap-10">
          <motion.div variants={fadeInUp} className="bg-[#f8f9fb] p-12 rounded-3xl border border-[#e5e7eb] hover:shadow-xl transition-all">
            <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8">
              <span className="material-symbols-outlined text-4xl">target</span>
            </div>
            <h2 className="text-3xl font-black mb-6">Mission Statement</h2>
            <p className="text-[#617289] text-xl leading-relaxed">
              A highly respected, well-regulated, and influential Physician Assistant fraternity that leads in primary healthcare delivery, upholds excellence in professional practice, and contributes meaningfully to Ghana’s health system and global PA practice.
            </p>
          </motion.div>
          <motion.div variants={fadeInUp} className="bg-[#f8f9fb] p-12 rounded-3xl border border-[#e5e7eb] hover:shadow-xl transition-all">
            <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8">
              <span className="material-symbols-outlined text-4xl">visibility</span>
            </div>
            <h2 className="text-3xl font-black mb-6">Our Vision</h2>
            <p className="text-[#617289] text-xl leading-relaxed">
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
        className="py-24 px-6 bg-background-light overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Our Core Values</h2>
            <div className="w-24 h-2 bg-primary mx-auto rounded-full"></div>
          </motion.div>
          <div ref={coreValuesRef} className="relative group">
            {/* Manual scroll buttons */}
            <button
              onClick={scrollCoreValuesLeft}
              onMouseEnter={() => setIsScrollingCoreValues(false)}
              onMouseLeave={() => setIsScrollingCoreValues(true)}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-primary text-primary hover:text-white p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
              aria-label="Scroll left"
            >
              <span className="material-symbols-outlined text-3xl">chevron_left</span>
            </button>
            <button
              onClick={scrollCoreValuesRight}
              onMouseEnter={() => setIsScrollingCoreValues(false)}
              onMouseLeave={() => setIsScrollingCoreValues(true)}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-primary text-primary hover:text-white p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
              aria-label="Scroll right"
            >
              <span className="material-symbols-outlined text-3xl">chevron_right</span>
            </button>
            <motion.div 
              className="flex gap-6 pb-4"
              style={{ x: coreValuesX }}
            >
              {/* Duplicate array 3 times for seamless infinite loop */}
              {[...Array(3)].flatMap(() => [
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
            ]).map((value, idx) => (
              <motion.div
                key={idx}
                className="min-w-87.5 bg-white p-8 rounded-2xl border-2 border-[#e5e7eb] hover:shadow-2xl transition-all group shrink-0"
                whileHover={{ scale: 1.02 }}
              >
                <div className={`size-16 ${
                  value.color === 'green' 
                    ? 'bg-green/10 text-green' 
                    : 'bg-primary/10 text-primary'
                } rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all`}>
                  <span className="material-symbols-outlined text-3xl">{value.icon}</span>
                </div>
                <h3 className="text-2xl font-black mb-4">{value.title}</h3>
                <p className="text-[#617289] leading-relaxed">{value.description}</p>
              </motion.div>
            ))}            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* President's Message */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="py-20 bg-white px-6"
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#e5e7eb]">
          <div className="w-full lg:w-2/5 aspect-4/5 bg-slate-200">
            <img 
              src="/images/president.jpg" 
              alt="GPAA President" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8 lg:p-16 w-full lg:w-3/5">
            <div className="inline-block text-primary font-black uppercase tracking-widest text-sm mb-4">Leadership Voice</div>
            <h2 className="text-4xl md:text-5xl font-black text-[#111418] mb-8 leading-tight">National President's Message</h2>
            <div className="relative">
              <span className="material-symbols-outlined text-8xl absolute -top-10 -left-6 opacity-10 text-primary">format_quote</span>
              <p className="text-2xl italic text-[#111418] leading-relaxed relative z-10 mb-8 font-medium">
                "As Physician Assistants, we are often the first point of contact for patients across the length and breadth of our nation. Our commitment is to ensure every Ghanaian receives quality, compassionate care. Together, we are building a stronger, more resilient healthcare system for all."
              </p>
            </div>
            <div>
              <p className="text-2xl font-black text-primary mb-1">Peter Akudugu Ayamba</p>
              <p className="text-lg text-[#617289] font-bold">National President, GPAA</p>
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
        className="py-24 px-6 max-w-7xl mx-auto"
      >
        <motion.div variants={fadeInUp} className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-4">Our Rich History</h2>
          <div className="w-24 h-2 bg-primary mx-auto rounded-full"></div>
        </motion.div>
        
        <motion.div variants={fadeInUp} className="bg-background-light p-10 md:p-16 rounded-3xl border border-[#e5e7eb]">
          <div className="prose prose-lg max-w-none">
            <p className="text-[#617289] text-xl leading-relaxed mb-6">
              The Ghana Physician Assistants Association formerly known as the Ghana Medical Assistants Association has been in existence for over four (4) decades and had had many leaders.
            </p>
            <p className="text-[#617289] text-xl leading-relaxed mb-6">
              Prior to 1996 Delegates' congress in Koforidua at Eredec Hotel, Mr. Divine Kudjinu and Mr. Agyemfra, President and General Secretary respectively, and others of blessed memory steered the affairs of the Association.
            </p>
            <p className="text-[#617289] text-xl leading-relaxed mb-6">
              The Delegates' Conference held in 1996 at Koforidua led to the election of the following as executives:
            </p>
            <ul className="text-[#617289] text-lg leading-relaxed mb-6 space-y-2">
              <li>Mr. Agyemfra - President</li>
              <li>Mr. Ralph Dagoe - Vice President</li>
              <li>Mr. Tebbi - General Secretary</li>
              <li>Mr. Dorho - General Vice Secretary</li>
              <li>Mr. Isaac Lamptey - Public Relations Officer (Late)</li>
              <li>Mr. Oppong - Financial Secretary</li>
              <li>Miss Korantema - Treasurer</li>
            </ul>
            <p className="text-[#617289] text-xl leading-relaxed mb-6">
              The newly elected officers in 1996 had their own internal conflicts which were unresolved. This led to internal strives which affected the organization of Delegates' Conference to elect new leaders until 2005 when there was a revolution which led to a Delegates' Conference in 2005 at the Crystal Rose Hotel in Kumasi-Ashanti Region.
            </p>
          </div>
          
          <div className="mt-10 text-center">
            <a
              href="/about/history"
              className="inline-flex items-center gap-3 bg-primary text-white px-10 py-5 rounded-xl font-black text-lg hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl"
            >
              Read Complete History
              <span className="material-symbols-outlined">arrow_forward</span>
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
        className="py-24 bg-background-light px-6"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Leadership</h2>
            <p className="text-[#617289] text-xl">The dedicated leaders steering our association forward with vision and integrity.</p>
          </motion.div>
          <motion.div variants={stagger} className="space-y-6">
            {EXECUTIVES.map((leader, idx) => (
              <LeadershipCard key={leader.name} leader={leader} idx={idx} />
            ))}
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
        className="py-24 px-6 bg-white overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Partners & Affiliations</h2>
            <p className="text-[#617289] text-xl max-w-3xl mx-auto mb-4">
              GPAA collaborates with key stakeholders in healthcare to enhance professional development, improve health service delivery, and advocate for policy reform.
            </p>
          </motion.div>
          <div ref={partnersRef} className="relative group">
            {/* Manual scroll buttons */}
            <button
              onClick={scrollPartnersLeft}
              onMouseEnter={() => setIsScrollingPartners(false)}
              onMouseLeave={() => setIsScrollingPartners(true)}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-green text-green hover:text-white p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
              aria-label="Scroll left"
            >
              <span className="material-symbols-outlined text-3xl">chevron_left</span>
            </button>
            <button
              onClick={scrollPartnersRight}
              onMouseEnter={() => setIsScrollingPartners(false)}
              onMouseLeave={() => setIsScrollingPartners(true)}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-green text-green hover:text-white p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
              aria-label="Scroll right"
            >
              <span className="material-symbols-outlined text-3xl">chevron_right</span>
            </button>
            <motion.div 
              className="flex gap-6 pb-4"
              style={{ x: partnersX }}
            >
              {/* Duplicate array 3 times for seamless infinite loop */}
              {[...Array(3)].flatMap(() => PARTNERS).map((partner, idx) => (
              <motion.div
                key={idx}
                className="min-w-70 bg-background-light p-8 rounded-2xl border-2 border-[#e5e7eb] hover:border-green hover:shadow-xl transition-all group shrink-0"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="h-24 flex items-center justify-center mb-6 bg-white rounded-xl p-4 group-hover:bg-green/5 transition-all">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <h3 className="text-lg font-black text-center group-hover:text-green transition-colors">
                  {partner.name}
                </h3>
              </motion.div>
            ))}
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
