import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle2, 
  Zap, 
  Settings2, 
  Link2,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Plus
} from 'lucide-react';

const StatCard = ({ label, value, subtext, icon: Icon, color, bgClass }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-48 group hover:shadow-md transition-all duration-300">
    <div className="flex justify-between items-start">
      <div className={`p-3 ${bgClass} rounded-xl ${color} group-hover:scale-110 transition-transform`}>
        <Icon size={22} strokeWidth={2} />
      </div>
    </div>
    <div>
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
      <div className="flex items-baseline gap-2">
        <p className="text-3xl font-bold text-[#334155] tracking-tight">{value}</p>
        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{subtext}</p>
      </div>
    </div>
  </div>
);

const ChannelCard = ({ channel, onToggle }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group relative overflow-hidden">
    {channel.status === 'Error' && (
      <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
    )}
    
    <div className="flex justify-between items-start mb-6">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
          channel.active ? 'bg-slate-50' : 'bg-slate-100 opacity-50'
        }`}>
          <Globe size={24} className={channel.active ? 'text-[#334155]' : 'text-slate-400'} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#334155] tracking-tight">{channel.name}</h3>
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">{channel.mode}</p>
        </div>
      </div>
      <button 
        onClick={() => onToggle(channel.id)}
        className={`relative w-10 h-5 rounded-full transition-all duration-300 ${
          channel.active ? 'bg-[#D4AF37]' : 'bg-slate-200'
        }`}
      >
        <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all duration-300 ${
          channel.active ? 'left-5.5' : 'left-0.5'
        }`}></div>
      </button>
    </div>

    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="space-y-0.5">
        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Last Sync</p>
        <p className="text-xs font-bold text-[#334155] uppercase">{channel.lastSync}</p>
      </div>
      <div className="space-y-0.5 text-right">
        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Health</p>
        <p className={`text-xs font-bold ${
          channel.quality > 95 ? 'text-green-500' : 'text-orange-500'
        }`}>{channel.quality}%</p>
      </div>
    </div>

    {/* Markup Indicator */}
    <div className="mb-6 p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider italic">Markup Rule</span>
      <span className="text-xs font-bold text-[#D4AF37]">{channel.markup}</span>
    </div>

    <div className="flex items-center gap-2 pt-5 border-t border-slate-50">
      <button className="flex-1 py-2.5 bg-[#334155] text-white rounded-lg hover:opacity-90 transition-all text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2">
        <Settings2 size={14} /> Configure
      </button>
      <button className="p-2.5 bg-slate-50 text-slate-400 rounded-lg hover:bg-slate-100 transition-all border border-slate-100">
        <RefreshCw size={14} />
      </button>
    </div>
  </div>
);

const ChannelManager = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [channels, setChannels] = useState([
    { id: 1, name: 'Booking.com', mode: 'Full Sync', active: true, lastSync: '2 min ago', quality: 99.8, status: 'Healthy', markup: '+15%' },
    { id: 2, name: 'Expedia', mode: 'Inventory Only', active: true, lastSync: '5 min ago', quality: 98.4, status: 'Healthy', markup: '+12%' },
    { id: 3, name: 'Airbnb', mode: 'iCal + API', active: true, lastSync: '12 min ago', quality: 92.1, status: 'Healthy', markup: '+10%' },
    { id: 4, name: 'Agoda', mode: 'Full Sync', active: false, lastSync: '--', quality: 0, status: 'Inactive', markup: '+18%' },
    { id: 5, name: 'HotelBeds', mode: 'XML', active: true, lastSync: '1 hour ago', quality: 85.0, status: 'Error', markup: '+15%' },
  ]);

  const toggleChannel = (id) => {
    setChannels(prev => prev.map(ch => 
      ch.id === id ? { ...ch, active: !ch.active, status: !ch.active ? 'Healthy' : 'Inactive' } : ch
    ));
  };

  const syncAll = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 3000);
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-20">
      
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-[#334155] tracking-tight">Channel Manager</h1>
          <p className="text-sm font-medium text-slate-400 mt-1 uppercase tracking-wider flex items-center gap-2">
            OTA Connectivity <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> <span className="text-[#334155]">Global Parity Active</span>
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button 
            onClick={syncAll}
            disabled={isSyncing}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all shadow-sm ${
              isSyncing ? 'bg-slate-100 text-slate-400' : 'bg-[#D4AF37] text-white hover:opacity-90'
            }`}
          >
            <RefreshCw size={18} className={isSyncing ? 'animate-spin' : ''} /> 
            {isSyncing ? 'Syncing...' : 'Sync All Channels'}
          </button>
          <button className="hidden sm:flex items-center justify-center p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-[#334155]">
            <Plus size={20} />
          </button>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
        <StatCard label="Connected" value="04" subtext="Channels" icon={Link2} color="text-[#334155]" bgClass="bg-slate-50" />
        <StatCard label="Sync Health" value="98%" subtext="Parity" icon={Zap} color="text-[#D4AF37]" bgClass="bg-[#D4AF37]/10" />
        <StatCard label="Live Syncs" value="03" subtext="Active" icon={RefreshCw} color="text-blue-500" bgClass="bg-blue-50" />
        <StatCard label="Security" value="SSL" subtext="Verified" icon={ShieldCheck} color="text-green-500" bgClass="bg-green-50" />
      </div>

      {/* Main Channel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {channels.map((channel) => (
          <ChannelCard key={channel.id} channel={channel} onToggle={toggleChannel} />
        ))}
        
        {/* Add New Channel Placeholder */}
        <button className="group bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 text-slate-300 hover:text-[#334155] hover:border-[#D4AF37]/40 transition-all h-full min-h-[250px]">
          <div className="w-12 h-12 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Plus size={24} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest">Connect New Channel</span>
        </button>
      </div>

      {/* Global Availability Snapshot */}
      <div className="bg-[#334155] p-8 sm:p-10 rounded-2xl shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-48 -mt-48 group-hover:bg-white/10 transition-colors"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Calendar size={18} className="text-white/40" /> 7-Day Parity Snapshot
              </h3>
              <p className="text-xs text-white/50 font-medium">Real-time inventory currently being broadcasted to all active OTAs.</p>
            </div>
            <button className="w-full md:w-auto px-8 py-3.5 bg-white text-[#334155] rounded-xl text-sm font-semibold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
              Full Inventory Grid <ArrowRight size={18} />
            </button>
          </div>
          
          {/* Simple Parity Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
              <div key={day} className="bg-white/5 border border-white/10 p-5 rounded-xl text-center group/day hover:bg-white/10 transition-colors">
                <p className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-2">{day}</p>
                <p className="text-xl font-bold text-white">14</p>
                <p className="text-[9px] font-bold text-green-400 uppercase tracking-wider mt-1">In Sync</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default ChannelManager;
