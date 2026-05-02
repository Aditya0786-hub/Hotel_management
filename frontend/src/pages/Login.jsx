import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#f3f4f6] p-4 sm:p-8 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#d1d5db] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#e5e7eb] rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md z-10 animate-fade-in-up">
        {/* Luxury Steel Card */}
        <div className="bg-white border border-slate-200 shadow-2xl rounded-[40px] p-8 sm:p-14 transition-all duration-500">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-[28px] bg-[#2d3436] shadow-xl mb-8">
              <Building className="w-10 h-10 text-white" strokeWidth={1} />
            </div>
            <h1 className="text-3xl font-black text-[#2d3436] tracking-tight mb-2">
              HERITAGE
            </h1>
            <p className="text-slate-400 font-bold tracking-[0.2em] text-[10px] uppercase">
              Management System
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1" htmlFor="username">
                Username
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-300 group-focus-within:text-[#2d3436] transition-colors">
                  <User size={18} strokeWidth={1.5} />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="w-full pl-12 pr-5 py-4.5 bg-slate-50 border border-slate-100 rounded-2xl text-[#2d3436] placeholder-slate-300 focus:outline-none focus:border-slate-300 transition-all duration-300"
                  placeholder="admin_staff"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1" htmlFor="password">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-300 group-focus-within:text-[#2d3436] transition-colors">
                  <Lock size={18} strokeWidth={1.5} />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="w-full pl-12 pr-12 py-4.5 bg-slate-50 border border-slate-100 rounded-2xl text-[#2d3436] placeholder-slate-300 focus:outline-none focus:border-slate-300 transition-all duration-300"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-300 hover:text-[#2d3436] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} strokeWidth={1.5} /> : <Eye size={18} strokeWidth={1.5} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 border-slate-200 rounded accent-[#2d3436]"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <label htmlFor="rememberMe" className="ml-2 block text-xs font-bold text-slate-400 cursor-pointer select-none">
                  KEEP ME SIGNED IN
                </label>
              </div>
              <a href="#" className="text-xs font-bold text-[#2d3436] hover:opacity-70 transition-opacity">
                FORGOT?
              </a>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-5 px-4 bg-[#2d3436] text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-[#3d4446] transition-all transform active:scale-[0.98] mt-8 shadow-xl shadow-slate-200"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 text-slate-400 text-[10px] font-black tracking-[0.3em] z-10 uppercase">
        © 2026 HotelSoft Solutions
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
    </div>
  );
};

export default Login;
