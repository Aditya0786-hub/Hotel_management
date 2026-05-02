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

const ChannelCard = ({ channel, onToggle }) => (
  <div className="bg-white p-8 rounded-[48px] border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.01)] hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
    {channel.status === 'Error' && (
      <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
    )}
    
    <div className="flex justify-between items-start mb-8">
      <div className="flex items-center gap-5">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500 ${
          channel.active ? 'bg-slate-50' : 'bg-slate-100 opacity-50'
        }`}>
          <Globe size={28} className={channel.active ? 'text-[#2d3436]' : 'text-slate-400'} />
        </div>
        <div>
          <h3 className="text-lg font-black text-[#2d3436] tracking-tight">{channel.name}</h3>
          <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mt-1">API Connection • {channel.mode}</p>
        </div>
      </div>
      <button 
        onClick={() => onToggle(channel.id)}
        className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
          channel.active ? 'bg-[#2d3436]' : 'bg-slate-200'
        }`}
      >
        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${
          channel.active ? 'left-7' : 'left-1'
        }`}></div>
      </button>
    </div>

    <div className="grid grid-cols-2 gap-6 mb-8">
      <div className="space-y-1">
        <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Last Sync</p>
        <p className="text-xs font-black text-[#2d3436] uppercase">{channel.lastSync}</p>
      </div>
      <div className="space-y-1 text-right">
        <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Sync Quality</p>
        <p className={`text-xs font-black ${
          channel.quality > 95 ? 'text-green-500' : 'text-orange-500'
        }`}>{channel.quality}%</p>
      </div>
    </div>

    {/* Markup Indicator */}
    <div className="mb-8 p-4 bg-blue-50/50 border border-blue-100 rounded-2xl flex items-center justify-between">
      <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest italic">Markup Rule</span>
      <span className="text-xs font-black text-blue-600">{channel.markup}</span>
    </div>

    <div className="flex items-center gap-3 pt-6 border-t border-slate-50">
      <button className="flex-1 py-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-[#2d3436] hover:text-white transition-all text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
        <Settings2 size={14} /> Configure
      </button>
      <button className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-100 transition-all">
        <RefreshCw size={16} />
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
    <div className="space-y-12 sm:space-y-20 pb-20">
      
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#2d3436] tracking-tighter">Channel Manager</h1>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mt-3 flex items-center gap-3">
            OTA Connectivity <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> <span className="text-[#2d3436]">Global Parity Active</span>
          </p>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <button 
            onClick={syncAll}
            disabled={isSyncing}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-3 px-8 py-5 rounded-[28px] text-[10px] font-black uppercase tracking-widest transition-all shadow-xl ${
              isSyncing ? 'bg-slate-100 text-slate-400' : 'bg-[#2d3436] text-white hover:opacity-90'
            }`}
          >
            <RefreshCw size={16} className={isSyncing ? 'animate-spin' : ''} /> 
            {isSyncing ? 'Syncing All...' : 'Sync All Now'}
          </button>
          <button className="hidden sm:flex items-center justify-center p-5 bg-white border border-slate-100 rounded-2xl hover:shadow-md transition-all text-[#2d3436]">
            <Plus size={20} />
          </button>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
        <StatCard label="Connected" value="04" subtext="Channels" icon={Link2} color="text-[#2d3436]" bgClass="bg-slate-50" />
        <StatCard label="Sync Health" value="98%" subtext="Parity" icon={Zap} color="text-yellow-500" bgClass="bg-yellow-50" />
        <StatCard label="Live Syncs" value="03" subtext="Active" icon={RefreshCw} color="text-blue-500" bgClass="bg-blue-50" />
        <StatCard label="Security" value="SSL" subtext="Verified" icon={ShieldCheck} color="text-green-500" bgClass="bg-green-50" />
      </div>

      {/* Main Channel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {channels.map((channel) => (
          <ChannelCard key={channel.id} channel={channel} onToggle={toggleChannel} />
        ))}
        
        {/* Add New Channel Placeholder */}
        <button className="group bg-slate-50 border-2 border-dashed border-slate-200 rounded-[48px] p-8 flex flex-col items-center justify-center gap-4 text-slate-300 hover:text-[#2d3436] hover:border-[#2d3436]/20 transition-all h-full min-h-[300px]">
          <div className="w-16 h-16 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Plus size={32} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest">Connect New Channel</span>
        </button>
      </div>

      {/* Global Availability Snapshot */}
      <div className="bg-[#2d3436] p-10 sm:p-12 rounded-[56px] shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-48 -mt-48 group-hover:bg-white/10 transition-colors"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-12">
            <div className="space-y-4">
              <h3 className="text-[12px] font-black text-white uppercase tracking-[0.25em] flex items-center gap-3">
                <Calendar size={18} className="text-white/40" /> 7-Day Parity Snapshot
              </h3>
              <p className="text-xs text-white/60 font-bold">Real-time inventory currently being broadcasted to all active OTAs.</p>
            </div>
            <button className="w-full md:w-auto px-10 py-5 bg-white text-[#2d3436] rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
              Full Inventory Grid <ArrowRight size={14} />
            </button>
          </div>
          
          {/* Simple Parity Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
              <div key={day} className="bg-white/5 border border-white/10 p-6 rounded-[32px] text-center group/day hover:bg-white/10 transition-colors">
                <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-3">{day}</p>
                <p className="text-2xl font-black text-white">14</p>
                <p className="text-[8px] font-black text-green-500 uppercase tracking-widest mt-2">In Sync</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default ChannelManager;
