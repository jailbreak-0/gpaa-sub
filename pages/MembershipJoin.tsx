import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, Link } from 'react-router-dom';
import { MEMBERSHIP_CATEGORIES, GHANA_REGIONS, EMPLOYER_CATEGORIES } from '../constants';

const MembershipJoin: React.FC = () => {
  const [searchParams] = useSearchParams();
  const isPrefill = searchParams.get('prefill') === 'true';
  
  const [formData, setFormData] = useState({
    category: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    dateOfBirth: '',
    mdcLicenseNumber: '',
    staffId: '',
    employer: '',
    region: '',
    district: '',
    facility: '',
    address: '',
  });

  // Pre-fill data from signup if available
  useEffect(() => {
    if (isPrefill) {
      const signupData = sessionStorage.getItem('signupData');
      if (signupData) {
        const data = JSON.parse(signupData);
        setFormData(prev => ({
          ...prev,
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          phone: data.phone || '',
        }));
        // Clear the session storage after using it
        sessionStorage.removeItem('signupData');
      }
    }
  }, [isPrefill]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Application submitted successfully! We will contact you within 48 hours.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-background-light min-h-screen py-12">
      <div className="max-w-225 mx-auto px-6">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            {isPrefill ? 'Complete Your Membership Application' : 'Membership Application'}
          </h1>
          <p className="text-[#617289] text-xl">
            {isPrefill 
              ? 'Your account has been created. Now complete your GPAA membership application.'
              : 'Join Ghana\'s leading professional association for Physician Assistants'}
          </p>
          {!isPrefill && (
            <div className="mt-6 bg-ghana-gold/10 border-2 border-ghana-gold p-4 rounded-xl max-w-3xl mx-auto">
              <p className="text-[#617289]">
                <strong>Note:</strong> If you don't have a website account yet, we recommend{' '}
                <Link to="/signup" className="text-primary font-bold hover:underline">creating an account first</Link>
                {' '}to streamline your application process.
              </p>
            </div>
          )}
        </motion.div>

        {isPrefill && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-ghana-green/10 border-2 border-ghana-green p-6 rounded-2xl mb-8 max-w-3xl mx-auto"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-ghana-green text-3xl">check_circle</span>
              <div>
                <h3 className="font-black text-lg">Account Created Successfully!</h3>
                <p className="text-[#617289]">Your personal information has been pre-filled. Please complete the professional details below.</p>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Membership Category */}
            <div>
              <label className="block text-lg font-bold mb-3">
                Select Membership Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-4 rounded-xl border-2 border-[#e5e7eb] focus:border-primary outline-none transition-all text-lg"
              >
                <option value="">Choose a category</option>
                {MEMBERSHIP_CATEGORIES.map((cat, idx) => (
                  <option key={idx} value={cat.title}>{cat.title} - {cat.fees}</option>
                ))}
              </select>
            </div>

            {/* Personal Information */}
            <div>
              <h2 className="text-2xl font-black mb-6 text-primary">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-bold mb-2">First Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#e5e7eb] focus:border-primary outline-none transition-all"
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-2">Last Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#e5e7eb] focus:border-primary outline-none transition-all"
                    placeholder="Enter last name"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-2">Email Address <span className="text-red-500">*</span></label>
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
                  <label className="block font-bold mb-2">Gender <span className="text-red-500">*</span></label>
                  <select
                    name="gender"
                    required
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#e5e7eb] focus:border-primary outline-none transition-all"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Prefer not to say</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-2">Date of Birth <span className="text-red-500">*</span></label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    required
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#e5e7eb] focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div>
              <h2 className="text-2xl font-black mb-6 text-primary">Professional Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-bold mb-2">MDC License Number <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="mdcLicenseNumber"
                    required
                    value={formData.mdcLicenseNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#e5e7eb] focus:border-primary outline-none transition-all"
                    placeholder="PA/GH/XXXX/XXXX"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-2">Staff ID <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="staffId"
                    required
                    value={formData.staffId}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#e5e7eb] focus:border-primary outline-none transition-all"
                    placeholder="Enter your staff ID"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-2">Employer <span className="text-red-500">*</span></label>
                  <select
                    name="employer"
                    required
                    value={formData.employer}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#e5e7eb] focus:border-primary outline-none transition-all"
                  >
                    <option value="">Select employer</option>
                    {EMPLOYER_CATEGORIES.map((emp, idx) => (
                      <option key={idx} value={emp}>{emp}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-2">Region <span className="text-red-500">*</span></label>
                  <select
                    name="region"
                    required
                    value={formData.region}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#e5e7eb] focus:border-primary outline-none transition-all"
                  >
                    <option value="">Select region</option>
                    {GHANA_REGIONS.map((region, idx) => (
                      <option key={idx} value={region}>{region}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-2">District <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="district"
                    required
                    value={formData.district}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#e5e7eb] focus:border-primary outline-none transition-all"
                    placeholder="Enter your district"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-2">Facility <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="facility"
                    required
                    value={formData.facility}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#e5e7eb] focus:border-primary outline-none transition-all"
                    placeholder="Hospital/Clinic name"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block font-bold mb-2">Residential Address <span className="text-red-500">*</span></label>
                  <textarea
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#e5e7eb] focus:border-primary outline-none transition-all"
                    placeholder="Enter your full address"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Privacy Notice - No Document Upload Required */}
            <div className="bg-ghana-gold/10 border-2 border-ghana-gold p-6 rounded-xl">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-ghana-green text-3xl">info</span>
                <div>
                  <h3 className="font-black text-lg mb-2">Data Protection & Privacy</h3>
                  <p className="text-[#617289]">
                    In compliance with data protection and privacy regulations, we do not require scanned copies of documents during registration. 
                    All information provided will be verified through official channels and kept strictly confidential.
                  </p>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="bg-background-light p-6 rounded-xl">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" required className="mt-1 size-5" />
                <span className="text-[#617289]">
                  I confirm that all information provided is accurate and I agree to the <a href="#" className="text-primary font-bold hover:underline">GPAA Constitution</a> and <a href="#" className="text-primary font-bold hover:underline">Code of Ethics</a>. <span className="text-red-500">*</span>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-primary text-white py-5 rounded-xl font-black text-xl hover:bg-primary-dark transition-all shadow-xl"
              >
                Submit Application
              </button>
            </div>

            {/* Help Text */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 text-center">
              <p className="text-[#617289]">
                <strong>Need help?</strong> Contact our membership team at <a href="mailto:membership@gpaa.org.gh" className="text-primary font-bold hover:underline">membership@gpaa.org.gh</a> or call <a href="tel:+233302123456" className="text-primary font-bold hover:underline">+233 302 123 456</a>
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default MembershipJoin;
