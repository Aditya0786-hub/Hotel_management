import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Calendar, 
  MapPin, 
  CreditCard, 
  Search, 
  Filter, 
  X, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  MoreVertical,
  Mail,
  Phone,
  Globe,
  DoorOpen
} from 'lucide-react';

const StatCard = ({ label, value, subtext, icon: Icon, color, bgClass }) => (
  <div className="bg-white p-8 rounded-[48px] border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.02)] flex flex-col justify-between h-52 group hover:shadow-xl transition-all duration-500">
    <div className="flex justify-between items-start">
      <div className={`p-4 ${bgClass} rounded-3xl ${color} group-hover:scale-110 transition-transform`}>
        <Icon size={24} strokeWidth={2.5} />
      </div>
      <div className="w-2 h-2 rounded-full bg-slate-100 group-hover:bg-black transition-colors"></div>
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-2">{label}</p>
      <div className="flex items-baseline gap-2">
        <p className="text-4xl font-black text-[#2d3436] tracking-tighter">{value}</p>
        <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">{subtext}</p>
      </div>
    </div>
  </div>
);

const AddGuestModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 animate-fade-in overflow-hidden">
      <div className="bg-white w-full sm:max-w-4xl max-h-[90vh] rounded-[48px] shadow-2xl overflow-hidden flex flex-col animate-slide-up relative">
        
        <div className="p-8 sm:p-12 border-b border-slate-50 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-3xl font-black text-[#2d3436] tracking-tighter">Register New Guest</h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Complete the onboarding form below</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-slate-50 rounded-xl transition-all">
            <X size={24} className="text-slate-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 sm:p-12 space-y-12 no-scrollbar">
          
          {/* Section: Guest Information */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <Users size={18} className="text-slate-300" />
              <h3 className="text-[12px] font-black text-[#2d3436] uppercase tracking-[0.25em]">Guest Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Guest Name *</label>
                <input type="text" placeholder="Full Name" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold focus:outline-none focus:bg-white focus:border-[#2d3436]/20 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number *</label>
                <input type="tel" placeholder="+91 00000 00000" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold focus:outline-none focus:bg-white focus:border-[#2d3436]/20 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                <input type="email" placeholder="email@example.com" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold focus:outline-none focus:bg-white focus:border-[#2d3436]/20 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nationality</label>
                <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold appearance-none focus:outline-none focus:bg-white focus:border-[#2d3436]/20 transition-all">
                  <option>Indian</option>
                  <option>International</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">ID Type *</label>
                <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold appearance-none focus:outline-none focus:bg-white focus:border-[#2d3436]/20 transition-all">
                  <option>Aadhar Card</option>
                  <option>Passport</option>
                  <option>Driving License</option>
                  <option>Voter ID</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">ID Number *</label>
                <input type="text" placeholder="Enter ID Number" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold focus:outline-none focus:bg-white focus:border-[#2d3436]/20 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Number of Guests</label>
                <input type="number" defaultValue={1} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold focus:outline-none focus:bg-white focus:border-[#2d3436]/20 transition-all" />
              </div>
            </div>
          </div>

          {/* Section: Booking Details */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-slate-300" />
              <h3 className="text-[12px] font-black text-[#2d3436] uppercase tracking-[0.25em]">Booking Details</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Check-in Date *</label>
                <input type="date" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold focus:outline-none focus:bg-white focus:border-[#2d3436]/20 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Check-out Date *</label>
                <input type="date" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold focus:outline-none focus:bg-white focus:border-[#2d3436]/20 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Booking Type</label>
                <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold appearance-none focus:outline-none focus:bg-white focus:border-[#2d3436]/20 transition-all">
                  <option>Walk-in</option>
                  <option>Online</option>
                  <option>OTA</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Room * (Showing Availability)</label>
              <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold appearance-none focus:outline-none focus:bg-white focus:border-[#2d3436]/20 transition-all">
                <option disabled>-- Select a Room --</option>
                <optgroup label="Floor 1">
                  <option>Room 101 - Deluxe (Available)</option>
                  <option>Room 102 - Suite (Available)</option>
                </optgroup>
                <optgroup label="Floor 2">
                  <option>Room 205 - Single (Available)</option>
                </optgroup>
              </select>
            </div>
          </div>
        </div>

        <div className="p-8 sm:p-12 bg-slate-50 border-t border-slate-100 flex gap-4 shrink-0">
          <button onClick={onClose} className="flex-1 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#2d3436]">Cancel</button>
          <button className="flex-[2] py-5 bg-[#2d3436] text-white rounded-[32px] text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-xl">Confirm Registration</button>
        </div>
      </div>
    </div>
  );
};

const GuestManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  const guests = [
    { name: 'John Doe', phone: '+91 98765 43210', email: 'john@example.com', room: '101', type: 'Deluxe', status: 'Checked In', payment: 'Paid', checkIn: 'Oct 24', checkOut: 'Oct 26' },
    { name: 'Ellen Ripley', phone: '+91 88888 77777', email: 'ripley@weyland.com', room: '203', type: 'Suite', status: 'Confirmed', payment: 'Pending', checkIn: 'Oct 25', checkOut: 'Oct 30' },
  ];

  return (
    <div className="space-y-12 sm:space-y-20 pb-20">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#2d3436] tracking-tighter">Guest Registry</h1>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mt-3">Onboarding & Occupancy Control</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-5 bg-[#2d3436] text-white rounded-[28px] text-[10px] font-black uppercase tracking-widest hover:opacity-90 shadow-xl transition-all"
        >
          <UserPlus size={16} /> New Reservation
        </button>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
        <StatCard label="Total Bookings" value="15" subtext="Units" icon={Users} color="text-[#2d3436]" bgClass="bg-slate-50" />
        <StatCard label="Upcoming" value="08" subtext="Arrivals" icon={Clock} color="text-blue-500" bgClass="bg-blue-50" />
        <StatCard label="In-House" value="05" subtext="Occupied" icon={DoorOpen} color="text-green-500" bgClass="bg-green-50" />
        <StatCard label="Confirmed" value="05" subtext="Booked" icon={CheckCircle2} color="text-indigo-500" bgClass="bg-indigo-50" />
      </div>

      {/* Registry List */}
      <div className="space-y-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex flex-wrap items-center gap-2 p-2 bg-slate-50 rounded-3xl w-full lg:w-auto">
            {['All', 'Upcoming', 'Confirmed', 'Checked In'].map(filter => (
              <button 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeFilter === filter ? 'bg-white text-[#2d3436] shadow-sm' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="relative group w-full lg:w-96">
            <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#2d3436] transition-colors" />
            <input 
              type="text" 
              placeholder="Search Name, Phone, Room..." 
              className="w-full pl-14 pr-6 py-5 bg-white border border-slate-100 rounded-[28px] text-sm font-bold focus:outline-none focus:border-[#2d3436]/20 shadow-sm transition-all" 
            />
          </div>
        </div>

        {guests.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {guests.map((guest, idx) => (
              <div key={idx} className="bg-white p-10 rounded-[56px] border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.01)] hover:shadow-2xl transition-all duration-500 group flex flex-col justify-between">
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center text-[#2d3436] group-hover:bg-[#2d3436] group-hover:text-white transition-all">
                      <span className="text-xl font-black">{guest.room}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-[#2d3436] tracking-tight leading-tight">{guest.name}</h3>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{guest.type} • {guest.phone}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest ${
                      guest.status === 'Checked In' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                      {guest.status}
                    </span>
                    <span className={`px-4 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest ${
                      guest.payment === 'Paid' ? 'bg-slate-100 text-[#2d3436]' : 'bg-orange-50 text-orange-600'
                    }`}>
                      {guest.payment}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-10 border-t border-slate-50 pt-8 mt-4">
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Check-in</p>
                    <p className="text-sm font-black text-[#2d3436]">{guest.checkIn}</p>
                  </div>
                  <div className="space-y-1 text-right">
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Check-out</p>
                    <p className="text-sm font-black text-[#2d3436]">{guest.checkOut}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-10">
                  <button className="flex-1 min-w-[140px] py-4 bg-slate-50 text-[#2d3436] rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center justify-center gap-3">
                    <Mail size={14} /> Send PDF
                  </button>
                  {guest.status === 'Checked In' && (
                    <button className="flex-1 min-w-[140px] py-4 bg-red-50 text-red-600 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-red-100 transition-all flex items-center justify-center gap-3 border border-red-100">
                      Quick Check-Out
                    </button>
                  )}
                  <button className="flex-1 min-w-[140px] py-4 bg-[#2d3436] text-white rounded-2xl text-[9px] font-black uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-lg">
                    Manage <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center bg-white rounded-[56px] border border-slate-100 shadow-sm">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <Users size={40} className="text-slate-200" />
            </div>
            <h3 className="text-2xl font-black text-[#2d3436]">No reservations found</h3>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-3">Create a new reservation to get started</p>
          </div>
        )}
      </div>

      <AddGuestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(60px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        .animate-slide-up { animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />
    </div>
  );
};

export default GuestManagement;
