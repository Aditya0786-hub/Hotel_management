import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Wifi, 
  Droplets, 
  Zap, 
  FileText, 
  AlertCircle, 
  Calendar, 
  CreditCard, 
  Plus, 
  Search, 
  ChevronRight,
  MoreVertical,
  X,
  ArrowRight
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

const AddEntryModal = ({ isOpen, onClose, onAdd }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 animate-fade-in overflow-hidden">
      <div className="bg-white w-full sm:max-w-2xl max-h-[90vh] rounded-[40px] sm:rounded-[48px] shadow-2xl overflow-hidden flex flex-col animate-slide-up relative">
        
        <div className="sm:hidden flex justify-end p-4">
          <button onClick={onClose} className="p-2 bg-slate-50 rounded-xl">
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        <div className="p-8 sm:p-12 border-b border-slate-50 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-2xl font-black text-[#2d3436] tracking-tight">Add New Registry</h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Track a service or legal document</p>
          </div>
          <button onClick={onClose} className="hidden sm:block p-3 hover:bg-slate-50 rounded-xl transition-all">
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 sm:p-12 space-y-8 no-scrollbar">
          <div className="space-y-4">
            <label className="text-[10px] font-black text-[#2d3436] uppercase tracking-widest ml-1">Registry Type</label>
            <div className="grid grid-cols-2 gap-4 p-2 bg-slate-50 rounded-3xl">
              <button className="py-4 bg-white text-[#2d3436] shadow-sm rounded-2xl text-[10px] font-black uppercase tracking-widest">Service</button>
              <button className="py-4 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:text-[#2d3436]">Legal Paper</button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-[#2d3436] uppercase tracking-widest ml-1">Name</label>
              <input type="text" placeholder="e.g. WiFi Fiber Optic" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold focus:outline-none focus:bg-white focus:border-[#2d3436]/20 transition-all" />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-[#2d3436] uppercase tracking-widest ml-1">Provider/Authority</label>
              <input type="text" placeholder="e.g. Fire Dept / ISP" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold focus:outline-none focus:bg-white focus:border-[#2d3436]/20 transition-all" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-[#2d3436] uppercase tracking-widest ml-1">Renewal/Expiry Date</label>
              <div className="relative">
                <Calendar size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" />
                <input type="date" className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold focus:outline-none focus:bg-white focus:border-[#2d3436]/20 transition-all" />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-[#2d3436] uppercase tracking-widest ml-1">Annual Cost (₹)</label>
              <div className="relative">
                <CreditCard size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" />
                <input type="number" placeholder="12,000" className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold focus:outline-none focus:bg-white focus:border-[#2d3436]/20 transition-all" />
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 sm:p-12 bg-slate-50 border-t border-slate-100 flex gap-4 shrink-0">
          <button onClick={onClose} className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#2d3436]">Cancel</button>
          <button className="flex-[2] py-4 bg-[#2d3436] text-white rounded-3xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-xl">Add Registry</button>
        </div>
      </div>
    </div>
  );
};

const Subscription = () => {
  const [activeTab, setActiveTab] = useState('Service');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [services, setServices] = useState([
    { id: 1, name: 'Fiber Internet (High Speed)', provider: 'Jio Business', cost: '₹2,499', freq: 'Monthly', expiry: 'Nov 12, 2023', status: 'Active', icon: Wifi, autoRenew: true },
    { id: 2, name: 'Water Supply (Commercial)', provider: 'Municipal Corp', cost: '₹8,500', freq: 'Monthly', expiry: 'Oct 30, 2023', status: 'Expiring Soon', icon: Droplets, autoRenew: false },
    { id: 3, name: 'Power Grid (Industrial)', provider: 'State Electricity', cost: '₹45,000', freq: 'Monthly', expiry: 'Nov 05, 2023', status: 'Active', icon: Zap, autoRenew: true },
  ]);

  const legalDocs = [
    { id: 101, name: 'Liquor License Renewal', provider: 'Excise Dept', cost: '₹2,50,000', freq: 'Yearly', expiry: 'Nov 02, 2023', status: 'Critical', days: 8 },
    { id: 102, name: 'Fire Safety Certificate', provider: 'Fire Authority', cost: '₹12,000', freq: 'Yearly', expiry: 'Dec 15, 2023', status: 'Active', days: 52 },
    { id: 103, name: 'Trade License', provider: 'MNC', cost: '₹5,000', freq: 'Yearly', expiry: 'Oct 28, 2023', status: 'Critical', days: 2 },
  ];

  return (
    <div className="space-y-12 sm:space-y-20 pb-20">
      
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#2d3436] tracking-tighter">Subscriptions</h1>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mt-3">Managed Recurring Costs & Compliance</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-5 bg-[#2d3436] text-white rounded-[28px] text-[10px] font-black uppercase tracking-widest hover:opacity-90 shadow-xl transition-all"
        >
          <Plus size={16} /> Add New Entry
        </button>
      </div>

      {/* Critical Alerts Section */}
      <div className="space-y-6">
        <h3 className="text-[12px] font-black text-red-500 uppercase tracking-[0.25em] flex items-center gap-3">
          <AlertCircle size={18} /> Critical Alerts
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-50/50 border border-red-100 p-8 rounded-[40px] flex items-center justify-between group hover:bg-red-50 transition-all cursor-pointer">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-red-500 border border-red-50">
                <FileText size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-red-400 uppercase tracking-widest">Legal Expiry</p>
                <h4 className="text-lg font-black text-[#2d3436] tracking-tight mt-1">Trade License</h4>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black text-red-500 tracking-tighter">02 Days</p>
              <p className="text-[9px] font-black text-red-400 uppercase tracking-widest">Left to Renew</p>
            </div>
          </div>
          <div className="bg-red-50/50 border border-red-100 p-8 rounded-[40px] flex items-center justify-between group hover:bg-red-50 transition-all cursor-pointer">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-red-500 border border-red-50">
                <FileText size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-red-400 uppercase tracking-widest">Legal Expiry</p>
                <h4 className="text-lg font-black text-[#2d3436] tracking-tight mt-1">Liquor License</h4>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black text-red-500 tracking-tighter">08 Days</p>
              <p className="text-[9px] font-black text-red-400 uppercase tracking-widest">Left to Renew</p>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
        <StatCard label="Active Service" value="12" subtext="Units" icon={Zap} color="text-[#2d3436]" bgClass="bg-slate-50" />
        <StatCard label="Legal Compliance" value="94%" subtext="Verified" icon={ShieldCheck} color="text-green-500" bgClass="bg-green-50" />
        <StatCard label="Monthly Cost" value="₹62K" subtext="Estimated" icon={CreditCard} color="text-blue-500" bgClass="bg-blue-50" />
        <StatCard label="Alerts" value="02" subtext="Critical" icon={AlertCircle} color="text-red-500" bgClass="bg-red-50" />
      </div>

      {/* Main Registry Tabs */}
      <div className="space-y-10">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-10">
            {['Service', 'Legal'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-[12px] font-black uppercase tracking-[0.25em] transition-all relative ${
                  activeTab === tab ? 'text-[#2d3436]' : 'text-slate-300 hover:text-slate-500'
                }`}
              >
                {tab === 'Service' ? 'Service Subscriptions' : 'Legal Paper Renewals'}
                {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#2d3436] rounded-full"></div>}
              </button>
            ))}
          </div>
        </div>

        {/* Content List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(activeTab === 'Service' ? services : legalDocs).map((item) => (
            <div key={item.id} className="bg-white p-8 rounded-[48px] border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.01)] hover:shadow-2xl transition-all duration-500 group flex flex-col justify-between min-h-[340px]">
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                    item.status === 'Critical' ? 'bg-red-50 text-red-500' : 'bg-slate-50 text-slate-400'
                  }`}>
                    {activeTab === 'Service' ? <item.icon size={24} /> : <FileText size={24} />}
                  </div>
                  <button className="p-3 text-slate-300 hover:text-[#2d3436] rounded-xl transition-all"><MoreVertical size={18} /></button>
                </div>
                
                <div>
                  <h3 className="text-xl font-black text-[#2d3436] tracking-tight leading-tight">{item.name}</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{item.provider}</p>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-2">
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{activeTab === 'Service' ? 'Monthly Cost' : 'Renewal Cost'}</p>
                    <p className="text-sm font-black text-[#2d3436]">{item.cost}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{activeTab === 'Service' ? 'Billing Date' : 'Expiry Date'}</p>
                    <p className="text-sm font-black text-[#2d3436]">{item.expiry}</p>
                  </div>
                </div>

                {activeTab === 'Service' && (
                  <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-50">
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest italic">Auto-Renew</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setServices(prev => prev.map(s => s.id === item.id ? { ...s, autoRenew: !s.autoRenew } : s));
                      }}
                      className={`relative w-10 h-5 rounded-full transition-all duration-300 ${item.autoRenew ? 'bg-green-500' : 'bg-slate-200'}`}
                    >
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all duration-300 ${item.autoRenew ? 'left-5.5' : 'left-0.5'}`}></div>
                    </button>
                  </div>
                )}
              </div>

              <div className="pt-8 mt-8 border-t border-slate-50 flex items-center justify-between">
                <span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest ${
                  item.status === 'Critical' ? 'bg-red-50 text-red-600' : 
                  item.status === 'Expiring Soon' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'
                }`}>
                  {item.status}
                </span>
                <button className="text-[10px] font-black text-[#2d3436] uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                  Manage <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddEntryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(60px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        .animate-slide-up { animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />
    </div>
  );
};

export default Subscription;
