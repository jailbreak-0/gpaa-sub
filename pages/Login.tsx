import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // In production, this would call an API to authenticate
    console.log('Login attempt:', formData);
    
    // Mock authentication
    if (formData.email && formData.password) {
      // Store auth token (mock)
      sessionStorage.setItem('authToken', 'mock-token-' + Date.now());
      sessionStorage.setItem('user', JSON.stringify({
        email: formData.email,
        name: 'User Name' // This would come from the API
      }));
      
      // Redirect to homepage or dashboard
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  return (
    <div className="min-h-screen bg-background-light py-12 px-4">
      <div className="max-w-120 mx-auto">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-black mb-4">Welcome Back</h1>
          <p className="text-[#617289] text-lg">
            Log in to access your GPAA member portal. Don't have an account? <Link to="/signup" className="text-primary font-bold hover:underline">Sign up</Link>
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-xl p-8 md:p-12 max-w-120"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-2 border-red-500 text-red-700 p-4 rounded-xl flex items-center gap-3">
                <span className="material-symbols-outlined">error</span>
                <span>{error}</span>
              </div>
            )}

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
              <label className="block font-bold mb-2">Password <span className="text-red-500">*</span></label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-[#e5e7eb] focus:border-primary outline-none transition-all"
                  placeholder="Enter your password"
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

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="size-5"
                />
                <span className="text-sm font-semibold text-[#617289]">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm font-bold text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-ghana-green text-white py-4 rounded-xl font-black text-lg hover:bg-green-dark transition-all shadow-lg hover:shadow-xl"
            >
              Log In
            </button>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#e5e7eb]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-[#617289] font-semibold">OR</span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-[#617289] mb-4">New to GPAA?</p>
              <Link
                to="/signup"
                className="inline-block w-full bg-primary text-white py-4 rounded-xl font-black text-lg hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl"
              >
                Create Account & Apply for Membership
              </Link>
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

export default Login;
