import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Donate: React.FC = () => {
  const [donationType, setDonationType] = useState<'once' | 'monthly'>('once');
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');

  const quickAmounts = ['50', '100', '200', '500', '1000', '5000'];

  return (
    <div className="bg-white">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-linear-to-br from-primary via-primary-dark to-[#0a4296] py-24 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-250 mx-auto px-6 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8">
              Support Our Mission
            </h1>
            <p className="text-white/90 text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto">
              Your generous contribution helps us advocate for better healthcare, support our members, and serve communities across Ghana
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Donation Form */}
      <section className="py-20 bg-background-light px-6">
        <div className="max-w-200 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4">Make a Donation</h2>
            <p className="text-[#617289] text-xl">Every contribution makes a difference</p>
          </div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
          >
            {/* Donation Type Toggle */}
            <div className="flex bg-background-light p-2 rounded-xl mb-8">
              <button
                onClick={() => setDonationType('once')}
                className={`flex-1 cursor-pointer py-3 rounded-lg font-black transition-all ${
                  donationType === 'once'
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-[#617289]'
                }`}
              >
                One-Time
              </button>
              <button
                onClick={() => setDonationType('monthly')}
                className={`flex-1 cursor-pointer py-3 rounded-lg font-black transition-all ${
                  donationType === 'monthly'
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-[#617289]'
                }`}
              >
                Monthly
              </button>
            </div>

            {/* Amount Selection */}
            <div className="mb-8">
              <label className="block font-black text-lg mb-4">Select Amount (GH₵)</label>
              <div className="grid grid-cols-3 gap-4 mb-4">
                {quickAmounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => { setAmount(amt); setCustomAmount(''); }}
                    className={`py-4 cursor-pointer rounded-xl font-black text-lg transition-all ${
                      amount === amt
                        ? 'bg-primary text-white shadow-lg scale-105'
                        : 'bg-background-light text-[#617289] hover:bg-[#e5e7eb]'
                    }`}
                  >
                    ₵{amt}
                  </button>
                ))}
              </div>
              <div>
                <label className="block font-bold mb-2 text-sm">Or enter custom amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-lg text-[#617289]">GH₵</span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => { setCustomAmount(e.target.value); setAmount(''); }}
                    placeholder="0.00"
                    className="w-full pl-14 pr-4 py-4 rounded-xl border-2 border-[#e5e7eb] focus:border-primary outline-none transition-all text-lg font-bold"
                  />
                </div>
              </div>
            </div>

            {/* Donor Info */}
            <div className="space-y-6 mb-8">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-2">First Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#e5e7eb] focus:border-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-2">Last Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#e5e7eb] focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#e5e7eb] focus:border-primary outline-none transition-all"
                  placeholder="For receipt and updates"
                />
              </div>
              <div>
                <label className="block font-bold mb-2">Phone Number *</label>
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#e5e7eb] focus:border-primary outline-none transition-all"
                  placeholder="+233 XXX XXX XXX"
                />
              </div>
              <div>
                <label className="block font-bold mb-2">Message (Optional)</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#e5e7eb] focus:border-primary outline-none transition-all"
                  placeholder="Leave a message or dedication..."
                ></textarea>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-8">
              <label className="block font-black text-lg mb-4">Payment Method</label>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { name: 'Mobile Money', icon: 'phone_android' },
                  { name: 'Bank Transfer', icon: 'account_balance' },
                  { name: 'Card Payment', icon: 'credit_card' },
                ].map((method, idx) => (
                  <button
                    key={idx}
                    className="flex items-center gap-3 p-4 rounded-xl border-2 border-[#e5e7eb] hover:border-primary hover:bg-background-light transition-all"
                  >
                    <span className="material-symbols-outlined text-primary">{method.icon}</span>
                    <span className="font-bold">{method.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <button className="w-full bg-primary text-white py-5 rounded-xl font-black text-xl hover:bg-primary-dark transition-all shadow-xl">
              Complete Donation
            </button>

            <p className="text-center text-sm text-[#617289] mt-6">
              🔒 Your donation is secure and will be used to support GPAA programs and advocacy
            </p>
          </motion.div>
        </div>
      </section>

      {/* Alternative Ways to Give */}
      <section className="py-20 bg-background-light px-6">
        <div className="max-w-250 mx-auto">
          <h2 className="text-4xl font-black mb-12 text-center">Other Ways to Support</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-[#e5e7eb]">
              <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">account_balance</span>
                Bank Transfer - GCB
              </h3>
              <div className="space-y-2 text-[#617289]">
                <p><strong>Account Name:</strong> Ghana Physician Assistants Association</p>
                <p><strong>Account Number:</strong> 6011130017673</p>
                <p><strong>Bank:</strong> GCB Plc</p>
                <p><strong>Branch:</strong> Kumasi Main Branch</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-[#e5e7eb]">
              <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">account_balance</span>
                Bank Transfer - SCB
              </h3>
              <div className="space-y-2 text-[#617289]">
                <p><strong>Account Name:</strong> Ghana Physician Assistants Association</p>
                <p><strong>Account Number:</strong> 0100113743500</p>
                <p><strong>Bank:</strong> Standard Chartered Bank</p>
                <p><strong>Branch:</strong> Liberia Road</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 bg-white p-8 rounded-2xl border border-[#e5e7eb]">
            <h3 className="text-2xl font-black mb-4 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">phone_android</span>
              Mobile Money
            </h3>
            <div className="space-y-2 text-[#617289]">
              <p><strong>MTN:</strong> 0XX XXX XXXX</p>
              <p><strong>Vodafone:</strong> 0XX XXX XXXX</p>
              <p><strong>AirtelTigo:</strong> 0XX XXX XXXX</p>
              <p><strong>Name:</strong> GPAA Donations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '5,000+', label: 'Members Supported', icon: 'groups' },
            { value: '120+', label: 'Health Outreaches', icon: 'volunteer_activism' },
            { value: '50+', label: 'CPD Programs Annually', icon: 'school' },
            { value: '12+', label: 'Policy Wins', icon: 'emoji_events' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center p-6 bg-background-light rounded-2xl border border-[#e5e7eb]"
            >
              <span className="material-symbols-outlined text-primary text-4xl mb-3 block">{stat.icon}</span>
              <div className="text-4xl font-black text-primary mb-2">{stat.value}</div>
              <div className="text-sm font-bold text-[#617289] uppercase tracking-wide">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How Funds Are Used */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4">How Your Donation Helps</h2>
          <p className="text-[#617289] text-xl">Transparent allocation of funds for maximum impact</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { percent: '40%', title: 'CPD & Training', desc: 'Professional development programs for members', icon: 'school', color: 'bg-primary' },
            { percent: '30%', title: 'Advocacy', desc: 'Legislative lobbying and policy work', icon: 'gavel', color: 'bg-primary' },
            { percent: '20%', title: 'Community Outreach', desc: 'Free health screenings and awareness', icon: 'volunteer_activism', color: 'bg-primary' },
            { percent: '10%', title: 'Operations', desc: 'Administrative and operational costs', icon: 'settings', color: 'bg-primary' },
          ].map((fund, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-2xl border-2 border-[#e5e7eb] hover:shadow-xl transition-all text-center"
            >
              <div className={`size-16 ${fund.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-6`}>
                <span className="material-symbols-outlined text-3xl">{fund.icon}</span>
              </div>
              <div className="text-4xl font-black text-green-700 mb-3">{fund.percent}</div>
              <h3 className="text-xl font-black mb-2">{fund.title}</h3>
              <p className="text-[#617289]">{fund.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Donate;
