import React, { useState } from 'react';
import { 
  Package, 
  AlertTriangle, 
  TrendingDown, 
  History, 
  Plus, 
  Search, 
  Filter,
  ChevronRight,
  Minus,
  MoreVertical,
  CheckCircle2,
  Box
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

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const [items, setItems] = useState([
    { id: 'SKU-001', name: 'Luxury Soap Bar', category: 'Housekeeping', stock: 142, unit: 'pcs', reorder: 50, status: 'Healthy' },
    { id: 'SKU-002', name: 'Coffee Beans (Arabic)', category: 'F&B', stock: 12, unit: 'kg', reorder: 15, status: 'Low' },
    { id: 'SKU-003', name: 'Bath Towels (White)', category: 'Linen', stock: 85, unit: 'pcs', reorder: 30, status: 'Healthy' },
    { id: 'SKU-004', name: 'Light Bulbs (Warm)', category: 'Maintenance', stock: 4, unit: 'pcs', reorder: 10, status: 'Critical' },
    { id: 'SKU-005', name: 'Toilet Paper Rolls', category: 'Housekeeping', stock: 240, unit: 'pcs', reorder: 100, status: 'Healthy' },
  ]);

  const categories = ['All', 'Housekeeping', 'F&B', 'Linen', 'Maintenance'];

  const filteredItems = items.filter(item => 
    (activeTab === 'All' || item.category === activeTab) &&
    (item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.id.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const adjustStock = (id, amount) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, stock: Math.max(0, item.stock + amount) } : item
    ));
  };

  return (
    <div className="space-y-12 sm:space-y-20 pb-20">
      
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#2d3436] tracking-tighter">Inventory</h1>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mt-3">Stock Registry & Consumption Tracking</p>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-3 px-8 py-5 bg-white border border-slate-100 text-[#2d3436] rounded-[28px] text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 shadow-sm transition-all">
            <Filter size={16} /> Export
          </button>
          <button className="flex-[2] sm:flex-none flex items-center justify-center gap-3 px-8 py-5 bg-[#2d3436] text-white rounded-[28px] text-[10px] font-black uppercase tracking-widest hover:opacity-90 shadow-xl transition-all">
            <Plus size={16} /> Add New Item
          </button>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
        <StatCard label="Total SKUs" value="1,240" subtext="Items" icon={Package} color="text-[#2d3436]" bgClass="bg-slate-50" />
        <StatCard label="Low Stock" value="08" subtext="Alerts" icon={AlertTriangle} color="text-orange-500" bgClass="bg-orange-50" />
        <StatCard label="Critical" value="03" subtext="Urgent" icon={TrendingDown} color="text-red-500" bgClass="bg-red-50" />
        <StatCard label="Restocked" value="42" subtext="This Week" icon={CheckCircle2} color="text-green-500" bgClass="bg-green-50" />
      </div>

      {/* Search & Tabs */}
      <div className="space-y-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex flex-wrap items-center gap-2 p-2 bg-slate-50 rounded-3xl w-full lg:w-auto">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === cat ? 'bg-white text-[#2d3436] shadow-sm' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative group w-full lg:w-96">
            <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#2d3436] transition-colors" />
            <input 
              type="text" 
              placeholder="Search by Item or SKU..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-5 bg-white border border-slate-100 rounded-[28px] text-sm font-bold focus:outline-none focus:border-[#2d3436]/20 shadow-sm transition-all" 
            />
          </div>
        </div>

        {/* Inventory List */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white p-8 rounded-[48px] border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.01)] hover:shadow-2xl transition-all duration-500 group">
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    item.status === 'Critical' ? 'bg-red-50 text-red-500' : 
                    item.status === 'Low' ? 'bg-orange-50 text-orange-500' : 'bg-slate-50 text-slate-400'
                  }`}>
                    <Box size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-[#2d3436] tracking-tight">{item.name}</h3>
                    <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mt-1">{item.id} • {item.category}</p>
                  </div>
                </div>
                <button className="p-3 text-slate-300 hover:text-[#2d3436] rounded-xl transition-all"><MoreVertical size={18} /></button>
              </div>

              <div className="flex items-end justify-between mb-8">
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Current Stock</p>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-3xl font-black tracking-tighter ${
                      item.status === 'Critical' ? 'text-red-500' : 
                      item.status === 'Low' ? 'text-orange-500' : 'text-[#2d3436]'
                    }`}>{item.stock}</span>
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">{item.unit}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                  <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                    item.status === 'Critical' ? 'bg-red-50 text-red-500' : 
                    item.status === 'Low' ? 'bg-orange-50 text-orange-500' : 'bg-green-50 text-green-600'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-3 pt-6 border-t border-slate-50">
                <button 
                  onClick={() => adjustStock(item.id, -1)}
                  className="flex-1 py-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-100 hover:text-[#2d3436] transition-all flex items-center justify-center"
                >
                  <Minus size={16} />
                </button>
                <button 
                  onClick={() => adjustStock(item.id, 1)}
                  className="flex-1 py-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-100 hover:text-[#2d3436] transition-all flex items-center justify-center"
                >
                  <Plus size={16} />
                </button>
                <button className="flex-[2] py-4 bg-[#2d3436] text-white rounded-2xl text-[9px] font-black uppercase tracking-widest hover:opacity-90 transition-all">
                  Manage
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Movement Log Sidebar (Optional/Sub-section) */}
      <div className="bg-[#2d3436] p-10 sm:p-12 rounded-[56px] shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-white/10 transition-colors"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="space-y-4">
            <h3 className="text-[12px] font-black text-white uppercase tracking-[0.25em] flex items-center gap-3">
              <History size={18} className="text-white/40" /> Stock Movements
            </h3>
            <p className="text-xs text-white/60 max-w-sm font-bold">Track every addition and consumption log across all departments in real-time.</p>
          </div>
          <button className="w-full md:w-auto px-10 py-5 bg-white text-[#2d3436] rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
            View Full Audit Log <ChevronRight size={14} />
          </button>
        </div>
      </div>

    </div>
  );
};

export default Inventory;
