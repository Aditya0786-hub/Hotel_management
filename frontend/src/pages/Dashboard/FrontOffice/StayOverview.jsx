import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  X, 
  User, 
  Phone, 
  Calendar, 
  Users as UsersIcon, 
  CheckCircle2, 
  AlertTriangle,
  Info,
  CreditCard,
  MapPin,
  Clock,
  ChevronRight
} from 'lucide-react';

const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-48 group hover:shadow-md transition-all duration-300">
    <div className="flex justify-between items-start">
      <div className={`p-3 bg-slate-50 rounded-xl ${color} transition-all duration-300 group-hover:scale-110`}>
        <Icon size={22} strokeWidth={2} />
      </div>
    </div>
    <div>
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-3xl font-bold text-[#334155] tracking-tight">{value}</p>
    </div>
  </div>
);

const RoomCard = ({ room, onClick }) => {
  const getStatusStyles = (status) => {
    switch (status) {
      case 'available':
        return 'bg-white text-[#334155] border-slate-100 hover:border-[#D4AF37]/30 hover:shadow-md';
      case 'occupied':
        return 'bg-[#334155] text-white border-transparent hover:opacity-90 shadow-md';
      case 'maintenance':
        return 'bg-slate-100 text-slate-500 border-slate-200';
      case 'dirty':
        return 'bg-red-50 text-red-600 border-red-100 hover:shadow-md';
      default:
        return 'bg-slate-50 text-slate-400 border-slate-100';
    }
  };

  return (
    <button
      onClick={() => onClick(room)}
      className={`relative group h-32 sm:h-40 rounded-2xl border-2 transition-all duration-500 flex flex-col items-center justify-center gap-2 overflow-hidden ${getStatusStyles(room.status)}`}
    >
      {room.status === 'available' && (
        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-green-500"></div>
      )}
      
      {/* Cleaning Status Badge */}
      <div className={`absolute top-4 left-4 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
        room.isClean ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
      }`}>
        {room.isClean ? 'Clean' : 'Dirty'}
      </div>

      <span className="text-3xl font-bold tracking-tight transition-transform group-hover:scale-110 duration-500">{room.id}</span>
      <div className="flex flex-col items-center">
        <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
          room.status === 'occupied' ? 'bg-white/20' : 'bg-slate-50'
        }`}>
          {room.type}
        </span>
      </div>
      {room.guest && (
        <div className="absolute inset-x-0 bottom-0 bg-black/5 py-2 border-t border-black/5 opacity-0 group-hover:opacity-100 transition-opacity">
          <p className="text-[10px] font-bold uppercase tracking-widest truncate px-4">{room.guest}</p>
        </div>
      )}
    </button>
  );
};

const AddRoomModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({ id: '', type: 'Deluxe', floor: 1 });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-8 animate-fade-in overflow-hidden">
      <div className="bg-white w-full sm:max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-slide-up relative">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xl font-bold text-[#334155]">Add New Room</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-lg transition-all">
            <X size={20} className="text-slate-400" />
          </button>
        </div>
        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Room Number</label>
            <input 
              type="text" 
              placeholder="e.g. 101" 
              value={formData.id}
              onChange={(e) => setFormData({...formData, id: e.target.value})}
              className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:bg-white focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/10 transition-all" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Room Type</label>
            <select 
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium appearance-none focus:outline-none focus:bg-white focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/10 transition-all"
            >
              <option>Deluxe</option>
              <option>Single</option>
              <option>Double</option>
              <option>Suite</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Floor Number</label>
            <input 
              type="number" 
              value={formData.floor}
              onChange={(e) => setFormData({...formData, floor: parseInt(e.target.value)})}
              className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:bg-white focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/10 transition-all" 
            />
          </div>
        </div>
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 text-sm font-semibold text-slate-400 hover:text-[#334155] transition-colors">Cancel</button>
          <button 
            onClick={() => onAdd(formData)}
            className="flex-[2] py-3 bg-[#D4AF37] text-white rounded-xl text-sm font-semibold hover:opacity-90 shadow-md transition-all"
          >
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
};

const BookingModal = ({ room, isOpen, onClose, onConfirm }) => {
  if (!room || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 animate-fade-in">
      <div className="bg-white w-full sm:max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-slide-up">
        
        {/* Mobile close button (Top Right) */}
        <div className="sm:hidden flex justify-end p-4 bg-[#334155]">
          <button onClick={onClose} className="p-2 bg-white/10 rounded-lg">
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* Simplified Header with Room Context */}
        <div className="p-6 sm:p-8 bg-[#334155] text-white flex items-center justify-between relative overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16"></div>
          <div className="relative z-10 flex items-center gap-4 sm:gap-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/10 rounded-xl flex items-center justify-center border border-white/10">
              <Hotel size={24} strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Register Guest</p>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Room {room.id} • <span className="text-slate-400">{room.type}</span></h3>
            </div>
          </div>
          <button onClick={onClose} className="relative z-10 p-2 hover:bg-white/10 rounded-lg transition-all hidden sm:block">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 no-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#334155] uppercase tracking-wider ml-1">Guest Name</label>
              <div className="relative group">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#D4AF37] transition-colors" />
                <input type="text" placeholder="John Doe" className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:bg-white focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/10 transition-all" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#334155] uppercase tracking-wider ml-1">Mobile</label>
              <div className="relative group">
                <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#D4AF37] transition-colors" />
                <input type="tel" placeholder="+1 000 000" className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:bg-white focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/10 transition-all" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#334155] uppercase tracking-wider ml-1">Check-in</label>
              <input type="date" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:bg-white focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/10 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#334155] uppercase tracking-wider ml-1">Check-out</label>
              <input type="date" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:bg-white focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/10 transition-all" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#334155] uppercase tracking-wider ml-1">Occupancy Type</label>
            <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium appearance-none focus:outline-none focus:bg-white focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/10 transition-all">
              <option>Single</option>
              <option>Double</option>
              <option>Family</option>
            </select>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-row gap-4 shrink-0">
          <button onClick={onClose} className="flex-1 py-3.5 text-sm font-semibold text-slate-400 hover:text-[#334155] transition-colors">
            Cancel
          </button>
          <button onClick={() => onConfirm(room.id)} className="flex-1 py-3.5 bg-[#D4AF37] text-white text-sm font-semibold rounded-xl hover:opacity-90 shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
            Confirm Registration <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

const StayOverview = () => {
  const [roomsByFloor, setRoomsByFloor] = useState([
    {
      floor: 1,
      rooms: [
        { id: 101, type: 'Deluxe', status: 'available', isClean: true },
        { id: 102, type: 'Single', status: 'occupied', guest: 'John Doe', isClean: true },
        { id: 103, type: 'Double', status: 'available', isClean: false },
        { id: 104, type: 'Suite', status: 'maintenance', isClean: true },
        { id: 105, type: 'Deluxe', status: 'available', isClean: true },
        { id: 106, type: 'Single', status: 'occupied', guest: 'Sarah Connor', isClean: false },
      ]
    },
    {
      floor: 2,
      rooms: [
        { id: 201, type: 'Suite', status: 'available', isClean: true },
        { id: 202, type: 'Double', status: 'maintenance', isClean: true },
        { id: 203, type: 'Deluxe', status: 'occupied', guest: 'Ellen Ripley', isClean: true },
        { id: 204, type: 'Single', status: 'available', isClean: false },
      ]
    }
  ]);

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState(false);
  const [activeFloorForNewRoom, setActiveFloorForNewRoom] = useState(1);
  const [floorFilter, setFloorFilter] = useState('All');

  const handleRoomClick = (room) => {
    if (room.status === 'available') {
      setSelectedRoom(room);
      setIsBookingModalOpen(true);
    }
  };

  const handleBookingConfirm = (roomId) => {
    setRoomsByFloor(prev => prev.map(floorData => ({
      ...floorData,
      rooms: floorData.rooms.map(room => 
        room.id === roomId ? { ...room, status: 'occupied', guest: 'New Guest', isClean: true } : room
      )
    })));
    setIsBookingModalOpen(false);
  };

  const handleAddRoom = (newRoomData) => {
    setRoomsByFloor(prev => {
      // Check if floor exists
      const floorExists = prev.some(f => f.floor === newRoomData.floor);
      if (floorExists) {
        return prev.map(floorData => {
          if (floorData.floor === newRoomData.floor) {
            return {
              ...floorData,
              rooms: [...floorData.rooms, { id: parseInt(newRoomData.id), type: newRoomData.type, status: 'available' }]
            };
          }
          return floorData;
        });
      } else {
        // Create new floor
        return [...prev, {
          floor: newRoomData.floor,
          rooms: [{ id: parseInt(newRoomData.id), type: newRoomData.type, status: 'available', isClean: true }]
        }].sort((a, b) => a.floor - b.floor);
      }
    });
    setIsAddRoomModalOpen(false);
  };

  const filteredFloors = floorFilter === 'All' 
    ? roomsByFloor 
    : roomsByFloor.filter(f => f.floor === parseInt(floorFilter));

  return (
    <div className="space-y-12 sm:space-y-20 pb-20">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-[#334155] tracking-tight">Stay Overview</h1>
          <p className="text-sm font-medium text-slate-400 mt-1 uppercase tracking-wider">Live Occupancy & Room Control</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-200">
            {['All', '1', '2', '3'].map(floor => (
              <button 
                key={floor}
                onClick={() => setFloorFilter(floor)}
                className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all ${
                  floorFilter === floor ? 'bg-white text-[#D4AF37] shadow-sm' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {floor === 'All' ? 'All Floors' : `Floor ${floor}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-16 sm:space-y-24">
        {filteredFloors.map((floorData) => (
          <div key={floorData.floor} className="space-y-8">
            <div className="flex items-center justify-between px-4 border-l-4 border-[#D4AF37] py-1">
              <div>
                <h3 className="text-sm font-bold text-[#334155] uppercase tracking-widest">Floor {floorData.floor}</h3>
                <p className="text-xs font-medium text-slate-400 mt-0.5 uppercase">Management of {floorData.rooms.length} units</p>
              </div>
              <button 
                onClick={() => {
                  setActiveFloorForNewRoom(floorData.floor);
                  setIsAddRoomModalOpen(true);
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 shadow-sm text-slate-500 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 rounded-xl text-xs font-semibold transition-all active:scale-[0.98]"
              >
                <Plus size={16} /> New Room
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4 sm:gap-6">
              {floorData.rooms.map((room) => (
                <RoomCard key={room.id} room={room} onClick={handleRoomClick} />
              ))}
              <button 
                onClick={() => {
                  setActiveFloorForNewRoom(floorData.floor);
                  setIsAddRoomModalOpen(true);
                }}
                className="h-32 sm:h-40 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 text-slate-300 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all group"
              >
                <Plus size={28} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Add Room</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Professional Legend */}
      <div className="flex flex-wrap items-center gap-6 py-8 border-t border-slate-100">
        <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-100">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
          <span className="text-xs font-semibold text-[#334155] uppercase tracking-wider">Available</span>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-[#334155] rounded-xl shadow-md border border-transparent">
          <div className="w-2.5 h-2.5 rounded-full bg-white/40"></div>
          <span className="text-xs font-semibold text-white uppercase tracking-wider">Occupied</span>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-100">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
          <span className="text-xs font-semibold text-[#334155] uppercase tracking-wider">Maintenance</span>
        </div>
      </div>

      <BookingModal 
        room={selectedRoom} 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)}
        onConfirm={handleBookingConfirm}
      />

      <AddRoomModal 
        isOpen={isAddRoomModalOpen}
        onClose={() => setIsAddRoomModalOpen(false)}
        onAdd={handleAddRoom}
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

// Internal Import for Hotel icon since I missed it in the block
const Hotel = ({ size, strokeWidth }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 18 0"/><path d="M5 21V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14"/><path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"/><path d="M10 9h4"/><path d="M10 13h4"/></svg>
);

export default StayOverview;
