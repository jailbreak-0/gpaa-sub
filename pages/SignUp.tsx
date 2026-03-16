import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    // Store user data in session storage to pass to membership application
    sessionStorage.setItem('signupData', JSON.stringify({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
    }));

    // In production, this would call an API to create the account
    console.log('Account created:', formData);
    
    // Redirect to membership application with pre-filled data
    navigate('/membership/join?prefill=true');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-background-light py-12 px-4">
      <div className="max-w-120 mx-auto">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-black mb-4">Create Your Account</h1>
          <p className="text-[#617289] text-lg">
            Join the GPAA community. Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Log in</Link>
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-2 border-red-500 text-red-700 p-4 rounded-xl flex items-center gap-3">
                <span className="material-symbols-outlined">error</span>
                <span>{error}</span>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-bold mb-2">First Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#e5e7eb] focus:border-primary outline-none transition-all"
                  placeholder="Enter First Name"
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
              <label className="block font-bold mb-2">Password <span className="text-red-500">*</span></label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-[#e5e7eb] focus:border-primary outline-none transition-all"
                  placeholder="At least 8 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#617289] hover:text-primary"
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <div>
              <label className="block font-bold mb-2">Confirm Password <span className="text-red-500">*</span></label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-[#e5e7eb] focus:border-primary outline-none transition-all"
                  placeholder="Re-enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#617289] hover:text-primary"
                >
                  <span className="material-symbols-outlined">
                    {showConfirmPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <div className="bg-ghana-gold/10 border-2 border-ghana-gold p-6 rounded-xl">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-ghana-green text-2xl">info</span>
                <p className="text-sm text-[#617289]">
                  After creating your account, you'll be directed to complete your GPAA membership application with your information pre-filled for your convenience.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <input type="checkbox" required className="mt-1 size-5" />
              <span className="text-sm text-[#617289]">
                I agree to the <a href="#" className="text-primary font-bold hover:underline">Terms of Service</a> and <a href="#" className="text-primary font-bold hover:underline">Privacy Policy</a> <span className="text-red-500">*</span>
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-ghana-green text-white py-4 rounded-xl font-black text-lg hover:bg-green-dark transition-all shadow-lg hover:shadow-xl"
            >
              Create Account & Continue to Membership
            </button>

            <div className="text-center text-[#617289]">
              Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Log in here</Link>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-[#e5e7eb] text-sm font-bold text-[#111418] hover:border-primary hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-base">help</span>
                Need Help?
              </Link>
              <Link
                to="/membership"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-[#e5e7eb] text-sm font-bold text-[#111418] hover:border-primary hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-base">info</span>
                Membership Benefits
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;
