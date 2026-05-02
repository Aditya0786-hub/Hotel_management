import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Calendar, 
  User, 
  Phone, 
  Clock, 
  MoreHorizontal,
  X,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Clock4
} from 'lucide-react';

const StatCard = ({ label, value, icon: Icon, color, bgClass }) => (
  <div className="bg-white p-6 sm:p-8 rounded-[32px] sm:rounded-[40px] border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.02)] flex flex-col gap-4">
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${bgClass} ${color}`}>
      <Icon size={24} strokeWidth={2.5} />
    </div>
    <div>
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">{label}</p>
      <p className="text-3xl font-black text-[#2d3436] mt-1">{value}</p>
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    Confirmed: 'bg-green-50 text-green-700',
    Pending: 'bg-orange-50 text-orange-700',
    Cancelled: 'bg-slate-100 text-slate-500'
  };
  return (
    <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${styles[status]}`}>
      {status}
    </span>
  );
};

const PreReservationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 animate-fade-in">
      <div className="bg-white w-full sm:max-w-3xl max-h-[90vh] rounded-[40px] sm:rounded-[48px] shadow-2xl overflow-hidden flex flex-col animate-slide-up">
        
        {/* Mobile close button (Top Right) */}
        <div className="sm:hidden flex justify-end p-4 bg-white">
          <button onClick={onClose} className="p-2 bg-slate-50 rounded-xl">
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        {/* Modal Header */}
        <div className="p-6 sm:p-10 border-b border-slate-50 flex items-center justify-between shrink-0 bg-white">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#2d3436] tracking-tight">New Pre-Reservation</h2>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Hold accommodation without immediate payment</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-slate-50 rounded-xl transition-all hidden sm:block">
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-10 no-scrollbar bg-white">
          
          {/* Section: Guest Details */}
          <div>
            <h3 className="text-[10px] font-black text-[#2d3436] uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <span className="w-6 h-px bg-slate-200"></span> Guest Profile
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative group">
                  <User size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#2d3436] transition-colors" />
                  <input type="text" placeholder="John Doe" className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold focus:outline-none focus:bg-white focus:border-[#2d3436]/20 transition-all" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Contact Number</label>
                <div className="relative group">
                  <Phone size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#2d3436] transition-colors" />
                  <input type="tel" placeholder="+1 234 567 890" className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold focus:outline-none focus:bg-white focus:border-[#2d3436]/20 transition-all" />
                </div>
              </div>
            </div>
          </div>

          {/* Section: Stay Parameters */}
          <div>
            <h3 className="text-[10px] font-black text-[#2d3436] uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <span className="w-6 h-px bg-slate-200"></span> Stay Parameters
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Check-in Date</label>
                <div className="relative group">
                  <Calendar size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#2d3436] transition-colors" />
                  <input type="date" className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold focus:outline-none focus:bg-white focus:border-[#2d3436]/20 transition-all" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Check-out Date</label>
                <div className="relative group">
                  <Calendar size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#2d3436] transition-colors" />
                  <input type="date" className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold focus:outline-none focus:bg-white focus:border-[#2d3436]/20 transition-all" />
                </div>
              </div>
            </div>
          </div>

          {/* Section: Accommodation */}
          <div>
            <h3 className="text-[10px] font-black text-[#2d3436] uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <span className="w-6 h-px bg-slate-200"></span> Accommodation
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Room Preference</label>
                <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold appearance-none focus:outline-none focus:bg-white focus:border-[#2d3436]/20 transition-all">
                  <option>Any Available</option>
                  <option>Deluxe Suite</option>
                  <option>Premium Double</option>
                  <option>Executive Single</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Total Guests</label>
                <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold appearance-none focus:outline-none focus:bg-white focus:border-[#2d3436]/20 transition-all">
                  <option>1 Adult</option>
                  <option>2 Adults</option>
                  <option>2 Adults, 1 Child</option>
                  <option>Group (3+)</option>
                </select>
              </div>
            </div>
          </div>

        </div>

        {/* Action Footer */}
        <div className="p-6 sm:p-10 bg-slate-50 border-t border-slate-100 flex flex-row gap-4 shrink-0">
          <button onClick={onClose} className="flex-1 py-4 sm:py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#2d3436] transition-colors rounded-3xl border border-transparent hover:border-slate-200">
            Cancel
          </button>
          <button onClick={onConfirm} className="flex-1 py-4 sm:py-5 bg-[#2d3436] text-white text-[10px] font-black uppercase tracking-widest rounded-3xl hover:opacity-90 shadow-xl transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
            Create Pre-Reservation <ChevronRight size={14} />
          </button>
        </div>

      </div>
    </div>
  );
};

const Reservations = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy data for reservations
  const [reservations, setReservations] = useState([
    { id: 'RES-1042', guest: 'Michael Chen', dates: 'Oct 24 - Oct 28', type: 'Deluxe Suite', status: 'Confirmed', added: '2 hours ago' },
    { id: 'RES-1043', guest: 'Emma Watson', dates: 'Oct 25 - Oct 27', type: 'Premium Double', status: 'Pending', added: '5 hours ago' },
    { id: 'RES-1044', guest: 'Robert Davis', dates: 'Oct 26 - Oct 30', type: 'Executive Single', status: 'Confirmed', added: '1 day ago' },
    { id: 'RES-1045', guest: 'Sophia Taylor', dates: 'Oct 28 - Nov 02', type: 'Any Available', status: 'Pending', added: '1 day ago' },
    { id: 'RES-1046', guest: 'James Wilson', dates: 'Oct 22 - Oct 24', type: 'Deluxe Suite', status: 'Cancelled', added: '2 days ago' },
  ]);

  const filteredReservations = reservations.filter(res => 
    res.guest.toLowerCase().includes(searchQuery.toLowerCase()) || 
    res.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConfirm = () => {
    // Logic to add reservation would go here
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-10 sm:space-y-16 lg:space-y-24">
      
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#2d3436] tracking-tighter">Reservations</h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Manage Bookings & Pre-Reservations</p>
        </div>
        <div className="flex w-full sm:w-auto items-center gap-4">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[#2d3436] text-white rounded-3xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 shadow-xl transition-all active:scale-[0.98]"
          >
            <Plus size={16} /> New Pre-Reservation
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
        <StatCard label="Total Upcoming" value="142" icon={Calendar} color="text-[#2d3436]" bgClass="bg-slate-100" />
        <StatCard label="Pending" value="18" icon={Clock4} color="text-orange-500" bgClass="bg-orange-50" />
        <StatCard label="Confirmed" value="121" icon={CheckCircle2} color="text-green-500" bgClass="bg-green-50" />
        <StatCard label="Cancelled" value="3" icon={XCircle} color="text-slate-400" bgClass="bg-slate-50" />
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-[40px] sm:rounded-[56px] border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.02)] overflow-hidden">
        
        {/* Table Toolbar */}
        <div className="p-6 sm:p-10 border-b border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="relative group w-full sm:w-96">
            <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#2d3436] transition-colors" />
            <input 
              type="text" 
              placeholder="Search by name or ID..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold focus:outline-none focus:bg-white focus:border-[#2d3436]/20 transition-all" 
            />
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none px-6 py-4 bg-slate-50 text-slate-500 rounded-3xl text-[10px] font-black uppercase tracking-widest hover:text-[#2d3436] hover:bg-slate-100 transition-all">
              Filter
            </button>
            <button className="flex-1 sm:flex-none px-6 py-4 bg-slate-50 text-slate-500 rounded-3xl text-[10px] font-black uppercase tracking-widest hover:text-[#2d3436] hover:bg-slate-100 transition-all">
              Export
            </button>
          </div>
        </div>

        {/* Responsive List/Table */}
        <div className="p-6 sm:p-10">
          
          {/* Desktop Table Header */}
          <div className="hidden md:grid grid-cols-6 gap-6 px-6 pb-6 border-b border-slate-100 mb-6">
            <p className="col-span-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Guest Details</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Stay Dates</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Room Type</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</p>
            <p className="text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</p>
          </div>

          {/* List Content */}
          {filteredReservations.length > 0 ? (
            <div className="space-y-4">
              {filteredReservations.map((res, index) => (
                <div key={index} className="flex flex-col md:grid md:grid-cols-6 gap-4 md:gap-6 p-6 rounded-[32px] border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all items-start md:items-center group bg-white">
                  
                  {/* Guest & ID */}
                  <div className="col-span-2 flex items-center gap-4 w-full">
                    <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                      <span className="text-sm font-black text-[#2d3436]">{res.guest.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-black text-[#2d3436]">{res.guest}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">{res.id}</p>
                    </div>
                  </div>

                  {/* Dates (Mobile Layout Label included) */}
                  <div className="w-full md:w-auto">
                    <p className="md:hidden text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Dates</p>
                    <p className="text-xs font-bold text-slate-600">{res.dates}</p>
                  </div>

                  {/* Room Type */}
                  <div className="w-full md:w-auto">
                    <p className="md:hidden text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Room Type</p>
                    <p className="text-xs font-bold text-slate-600">{res.type}</p>
                  </div>

                  {/* Status */}
                  <div className="w-full md:w-auto">
                    <p className="md:hidden text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                    <StatusBadge status={res.status} />
                  </div>

                  {/* Actions */}
                  <div className="w-full md:w-auto flex justify-end md:justify-end mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-50">
                    <button className="p-3 text-slate-400 hover:text-[#2d3436] hover:bg-slate-50 rounded-xl transition-all">
                      <MoreHorizontal size={20} />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                <Search size={32} className="text-slate-300" />
              </div>
              <h3 className="text-lg font-black text-[#2d3436] mb-2">No Reservations Found</h3>
              <p className="text-xs font-bold text-slate-400 max-w-sm">We couldn't find any reservations matching your search criteria. Try adjusting your filters.</p>
            </div>
          )}

        </div>
      </div>

      <PreReservationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleConfirm}
      />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(60px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUpMobile {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        .animate-slide-up {
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-slide-up-mobile {
          animation: slideUpMobile 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
    </div>
  );
};

export default Reservations;
