import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MEMBERSHIP_CATEGORIES } from '../constants';

const MembershipJoin: React.FC = () => {
  const [formData, setFormData] = useState({
    category: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    dateOfBirth: '',
    licenseNumber: '',
    staffId: '',
    employer: '',
    institution: '',
    region: '',
    district: '',
    workplace: '',
    address: '',
  });

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
          <h1 className="text-4xl md:text-6xl font-black mb-4">Membership Application</h1>
          <p className="text-[#617289] text-xl">Join Ghana's leading professional association for Physician Assistants</p>
        </motion.div>

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
                  <label className="block font-bold mb-2">PA License Number <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="licenseNumber"
                    required
                    value={formData.licenseNumber}
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
                    <option value="GHS">Ghana Health Service (GHS)</option>
                    <option value="CHAG">Christian Health Association of Ghana (CHAG)</option>
                    <option value="PS">Prison Service (PS)</option>
                    <option value="MS">Military Service (MS)</option>
                    <option value="PP">Private Practice (PP)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-2">Training Institution <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="institution"
                    required
                    value={formData.institution}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#e5e7eb] focus:border-primary outline-none transition-all"
                    placeholder="University/College name"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-2">Current Workplace <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="workplace"
                    required
                    value={formData.workplace}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#e5e7eb] focus:border-primary outline-none transition-all"
                    placeholder="Hospital/Clinic name"
                  />
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
                    <option value="Greater Accra">Greater Accra</option>
                    <option value="Ashanti">Ashanti</option>
                    <option value="Central">Central</option>
                    <option value="Eastern">Eastern</option>
                    <option value="Western">Western</option>
                    <option value="Northern">Northern</option>
                    <option value="Upper East">Upper East</option>
                    <option value="Upper West">Upper West</option>
                    <option value="Volta">Volta</option>
                    <option value="Oti">Oti</option>
                    <option value="Bono">Bono</option>
                    <option value="Bono East">Bono East</option>
                    <option value="Ahafo">Ahafo</option>
                    <option value="Western North">Western North</option>
                    <option value="Savannah">Savannah</option>
                    <option value="North East">North East</option>
                  </select>
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

            {/* Document Upload */}
            <div>
              <h2 className="text-2xl font-black mb-6 text-primary">Required Documents</h2>
              <div className="space-y-4">
                <div className="bg-background-light p-6 rounded-xl">
                  <label className="block font-bold mb-3">PA License (PDF/Image) <span className="text-red-500">*</span></label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="w-full cursor-pointer bg-gray-200 rounded-lg border-2 border-gray-500 p-4 text-center text-sm text-[#617289] hover:bg-gray-300 transition-all "
                  />
                </div>
                <div className="bg-background-light p-6 rounded-xl">
                  <label className="block font-bold mb-3">National ID (PDF/Image) <span className="text-red-500">*</span></label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="w-full cursor-pointer bg-gray-200 rounded-lg border-2 border-gray-500 p-4 text-center text-sm text-[#617289] hover:bg-gray-300 transition-all "
                  />
                </div>
                <div className="bg-background-light p-6 rounded-xl">
                  <label className="block font-bold mb-3">Passport Photo (Image) <span className="text-red-500">*</span></label>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    className="w-full cursor-pointer bg-gray-200 rounded-lg border-2 border-gray-500 p-4 text-center text-sm text-[#617289] hover:bg-gray-300 transition-all "
                  />
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
