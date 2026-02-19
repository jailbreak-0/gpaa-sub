import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Volunteer: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    area: '',
    availability: '',
    experience: '',
    message: ''
  });

  const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
  const stagger = { visible: { transition: { staggerChildren: 0.15 } } };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Volunteer form submitted:', formData);
    alert('Thank you for your interest in volunteering with GPAA! We will contact you soon.');
    setFormData({ name: '', email: '', phone: '', area: '', availability: '', experience: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const volunteerAreas = [
    {
      title: 'Community Health Outreach',
      description: 'Participate in health screening programs, health education, and community engagement activities across Ghana.',
      icon: 'health_and_safety',
      color: 'bg-blue-500',
      requirements: ['Active PA/Medical background', 'Weekend availability', 'Good communication skills']
    },
    {
      title: 'CPD Program Support',
      description: 'Assist in organizing and facilitating Continuing Professional Development workshops and training sessions.',
      icon: 'school',
      color: 'bg-green-500',
      requirements: ['Relevant expertise', 'Teaching/training experience', 'Time commitment: 4-8 hours/month']
    },
    {
      title: 'Advocacy & Policy',
      description: 'Support legislative advocacy efforts, policy research, and stakeholder engagement initiatives.',
      icon: 'gavel',
      color: 'bg-purple-500',
      requirements: ['Research skills', 'Policy interest', 'Good writing ability']
    },
    {
      title: 'Event Coordination',
      description: 'Help organize conferences, seminars, and GPAA events including logistics and participant management.',
      icon: 'event',
      color: 'bg-orange-500',
      requirements: ['Organizational skills', 'Team player', 'Flexible schedule']
    },
    {
      title: 'Digital & Communications',
      description: 'Contribute to social media management, content creation, website updates, and member communications.',
      icon: 'campaign',
      color: 'bg-pink-500',
      requirements: ['Digital literacy', 'Creative mindset', 'Communication skills']
    },
    {
      title: 'Mentorship Program',
      description: 'Guide and mentor newly qualified PAs and students through their professional development journey.',
      icon: 'diversity_3',
      color: 'bg-indigo-500',
      requirements: ['5+ years experience', 'Leadership qualities', 'Passion for teaching']
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-linear-to-br from-primary to-primary-dark py-24 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-white/80 font-bold uppercase tracking-widest text-sm mb-6"
          >
            <a href="/" className="hover:text-white">Home</a>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <a href="/get-involved" className="hover:text-white">Get Involved</a>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-white">Volunteer</span>
          </motion.div>
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-black text-white mb-8"
          >
            Volunteer with GPAA
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white/90 text-xl md:text-2xl max-w-3xl mx-auto"
          >
            Use your skills and passion to make a lasting impact on healthcare delivery and professional development across Ghana
          </motion.p>
        </div>
      </motion.section>

      {/* Why Volunteer */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">Why Volunteer?</h2>
          <p className="text-[#617289] text-xl max-w-3xl mx-auto">
            Volunteering with GPAA offers meaningful opportunities to give back while developing professionally
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: 'volunteer_activism', title: 'Make an Impact', desc: 'Directly improve healthcare in communities' },
            { icon: 'group_add', title: 'Network', desc: 'Connect with healthcare professionals nationwide' },
            { icon: 'school', title: 'Learn & Grow', desc: 'Gain experience and earn CPD hours' },
            { icon: 'workspace_premium', title: 'Recognition', desc: 'Receive volunteer certificates and awards' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-background-light p-8 rounded-2xl border border-[#e5e7eb] text-center hover:shadow-xl transition-all"
            >
              <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
                <span className="material-symbols-outlined text-3xl">{item.icon}</span>
              </div>
              <h3 className="text-xl font-black mb-3">{item.title}</h3>
              <p className="text-[#617289]">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Volunteer Areas */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="py-24 bg-background-light px-6"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Volunteer Opportunities</h2>
            <p className="text-[#617289] text-xl">Choose an area that matches your skills and interests</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {volunteerAreas.map((area, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-white rounded-2xl border-2 border-[#e5e7eb] overflow-hidden hover:border-primary hover:shadow-xl transition-all"
              >
                <div className={`${area.color} p-6 text-white`}>
                  <span className="material-symbols-outlined text-5xl mb-3 block">{area.icon}</span>
                  <h3 className="text-2xl font-black mb-2">{area.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-[#617289] mb-4 leading-relaxed">{area.description}</p>
                  <h4 className="font-black text-sm mb-2 uppercase tracking-wide">Requirements:</h4>
                  <ul className="space-y-2">
                    {area.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#617289]">
                        <span className="material-symbols-outlined text-primary text-base mt-0.5">check_circle</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Application Form */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black mb-4">Apply to Volunteer</h2>
          <p className="text-[#617289] text-xl">Fill out the form below and we'll get in touch with you</p>
        </div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-[#e5e7eb]"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-bold mb-2">Full Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#e5e7eb] focus:border-primary outline-none transition-all"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block font-bold mb-2">Email <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#e5e7eb] focus:border-primary outline-none transition-all"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold mb-2">Phone Number <span className="text-red-500">*</span></label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-[#e5e7eb] focus:border-primary outline-none transition-all"
                placeholder="+233 XXX XXX XXX"
              />
            </div>

            <div>
              <label className="block font-bold mb-2">Volunteer Area <span className="text-red-500">*</span></label>
              <select
                name="area"
                required
                value={formData.area}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-[#e5e7eb] focus:border-primary outline-none transition-all"
              >
                <option value="">Select area of interest</option>
                <option value="Community Health Outreach">Community Health Outreach</option>
                <option value="CPD Program Support">CPD Program Support</option>
                <option value="Advocacy & Policy">Advocacy & Policy</option>
                <option value="Event Coordination">Event Coordination</option>
                <option value="Digital & Communications">Digital & Communications</option>
                <option value="Mentorship Program">Mentorship Program</option>
              </select>
            </div>

            <div>
              <label className="block font-bold mb-2">Availability <span className="text-red-500">*</span></label>
              <select
                name="availability"
                required
                value={formData.availability}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-[#e5e7eb] focus:border-primary outline-none transition-all"
              >
                <option value="">Select your availability</option>
                <option value="Weekdays">Weekdays</option>
                <option value="Weekends">Weekends</option>
                <option value="Both">Both Weekdays & Weekends</option>
                <option value="Flexible">Flexible</option>
              </select>
            </div>

            <div>
              <label className="block font-bold mb-2">Relevant Experience</label>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border-2 border-[#e5e7eb] focus:border-primary outline-none transition-all"
                placeholder="Tell us about any relevant experience or skills..."
              ></textarea>
            </div>

            <div>
              <label className="block font-bold mb-2">Why do you want to volunteer?</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border-2 border-[#e5e7eb] focus:border-primary outline-none transition-all"
                placeholder="Share your motivation..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-5 rounded-xl font-black text-lg hover:bg-primary-dark transition-all shadow-xl"
            >
              Submit Application
            </button>
          </form>
        </motion.div>
      </section>
    </div>
  );
};

export default Volunteer;
