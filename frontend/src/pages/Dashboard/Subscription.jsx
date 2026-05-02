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

const AddEntryModal = ({ isOpen, onClose, onAdd }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full sm:max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-slide-up">
        
        <div className="p-6 sm:p-8 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-[#334155] tracking-tight">Add New Registry</h2>
            <p className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-wider">Track a service or legal document</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-lg transition-all">
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          <div className="space-y-3">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Registry Type</label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-50 rounded-xl border border-slate-100">
              <button className="py-2.5 bg-white text-[#334155] shadow-sm rounded-lg text-xs font-bold uppercase tracking-wider">Service</button>
              <button className="py-2.5 text-slate-400 rounded-lg text-xs font-bold uppercase tracking-wider hover:text-[#334155]">Legal Paper</button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Name</label>
              <input type="text" placeholder="e.g. WiFi Fiber Optic" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium focus:outline-none focus:bg-white focus:border-[#D4AF37] transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Provider/Authority</label>
              <input type="text" placeholder="e.g. Fire Dept / ISP" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium focus:outline-none focus:bg-white focus:border-[#D4AF37] transition-all" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Renewal/Expiry Date</label>
              <div className="relative">
                <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                <input type="date" className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium focus:outline-none focus:bg-white focus:border-[#D4AF37] transition-all" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Annual Cost (₹)</label>
              <div className="relative">
                <CreditCard size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                <input type="number" placeholder="12,000" className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium focus:outline-none focus:bg-white focus:border-[#D4AF37] transition-all" />
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 bg-slate-50 border-t border-slate-100 flex gap-4 shrink-0">
          <button onClick={onClose} className="flex-1 py-3.5 text-sm font-semibold text-slate-400 hover:text-[#334155] transition-all">Cancel</button>
          <button className="flex-[2] py-3.5 bg-[#334155] text-white rounded-xl text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow-md">Add Registry</button>
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
    <div className="space-y-12 sm:space-y-16 pb-20">
      
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-[#334155] tracking-tight">Subscriptions & Legal</h1>
          <p className="text-sm font-medium text-slate-400 mt-1 uppercase tracking-wider">Compliance & Service Registry</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-[#D4AF37] text-white rounded-xl text-sm font-semibold hover:opacity-90 shadow-md transition-all"
        >
          <Plus size={18} /> Add Registry
        </button>
      </div>

      {/* Critical Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-red-50 border border-red-100 p-6 rounded-2xl flex items-center justify-between group hover:shadow-md transition-all">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-red-500 border border-red-50">
              <FileText size={22} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider">Legal Expiry</p>
              <h4 className="text-base font-bold text-[#334155] mt-0.5">Trade License</h4>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-red-500 tracking-tight">02 Days</p>
            <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider">Left</p>
          </div>
        </div>
        <div className="bg-orange-50 border border-orange-100 p-6 rounded-2xl flex items-center justify-between group hover:shadow-md transition-all">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-orange-500 border border-orange-50">
              <Zap size={22} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-orange-400 uppercase tracking-wider">Service Due</p>
              <h4 className="text-base font-bold text-[#334155] mt-0.5">Maintenance Unit</h4>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-orange-500 tracking-tight">05 Days</p>
            <p className="text-[10px] font-bold text-orange-400 uppercase tracking-wider">Left</p>
          </div>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
        <StatCard label="Active Service" value="12" subtext="Units" icon={Zap} color="text-[#334155]" bgClass="bg-slate-50" />
        <StatCard label="Compliance" value="94%" subtext="Verified" icon={ShieldCheck} color="text-green-500" bgClass="bg-green-50" />
        <StatCard label="Monthly Cost" value="₹62K" subtext="Est." icon={CreditCard} color="text-blue-500" bgClass="bg-blue-50" />
        <StatCard label="Critical" value="02" subtext="Alerts" icon={AlertCircle} color="text-red-500" bgClass="bg-red-50" />
      </div>

      {/* Tabs */}
      <div className="space-y-8">
        <div className="flex items-center gap-6 border-b border-slate-100">
          {['Service', 'Legal'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-xs font-bold uppercase tracking-wider transition-all relative ${
                activeTab === tab ? 'text-[#D4AF37]' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab === 'Service' ? 'Service Subscriptions' : 'Legal Documents'}
              {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D4AF37] rounded-full"></div>}
            </button>
          ))}
        </div>

        {/* Content List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(activeTab === 'Service' ? services : legalDocs).map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between min-h-[300px]">
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                    item.status === 'Critical' ? 'bg-red-50 text-red-500' : 'bg-slate-50 text-slate-400'
                  } border border-slate-100 group-hover:bg-[#D4AF37] group-hover:text-white`}>
                    {activeTab === 'Service' ? <item.icon size={22} /> : <FileText size={22} />}
                  </div>
                  <button className="p-2 text-slate-400 hover:text-[#334155] rounded-lg transition-all border border-transparent hover:border-slate-100">
                    <MoreVertical size={16} />
                  </button>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-[#334155] tracking-tight">{item.name}</h3>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-1">{item.provider}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Cost</p>
                    <p className="text-sm font-bold text-[#334155]">{item.cost}</p>
                  </div>
                  <div className="space-y-0.5 text-right">
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Expiry</p>
                    <p className="text-sm font-bold text-[#334155]">{item.expiry}</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-50 flex items-center justify-between">
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                  item.status === 'Critical' ? 'bg-red-50 text-red-600' : 
                  item.status === 'Expiring Soon' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'
                }`}>
                  {item.status}
                </span>
                <button className="flex items-center gap-1.5 text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider hover:gap-2.5 transition-all">
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
