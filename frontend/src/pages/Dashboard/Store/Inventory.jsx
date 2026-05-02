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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-[#334155] tracking-tight">Inventory</h1>
          <p className="text-sm font-medium text-slate-400 mt-1 uppercase tracking-wider">Stock Registry & Consumption Tracking</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-slate-200 text-[#334155] rounded-xl text-sm font-semibold hover:bg-slate-50 shadow-sm transition-all">
            <Filter size={18} /> Export
          </button>
          <button className="flex-[2] sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-[#D4AF37] text-white rounded-xl text-sm font-semibold hover:opacity-90 shadow-md transition-all">
            <Plus size={18} /> Add New Item
          </button>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
        <StatCard label="Total SKUs" value="1,240" subtext="Items" icon={Package} color="text-[#334155]" bgClass="bg-slate-50" />
        <StatCard label="Low Stock" value="08" subtext="Alerts" icon={AlertTriangle} color="text-orange-500" bgClass="bg-orange-50" />
        <StatCard label="Critical" value="03" subtext="Urgent" icon={TrendingDown} color="text-red-500" bgClass="bg-red-50" />
        <StatCard label="Restocked" value="42" subtext="This Week" icon={CheckCircle2} color="text-green-500" bgClass="bg-green-50" />
      </div>

      {/* Search & Tabs */}
      <div className="space-y-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-50 rounded-xl w-full lg:w-auto border border-slate-100">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-6 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === cat ? 'bg-white text-[#D4AF37] shadow-sm' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative group w-full lg:w-96">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#D4AF37] transition-colors" />
            <input 
              type="text" 
              placeholder="Search by Item or SKU..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/10 shadow-sm transition-all" 
            />
          </div>
        </div>

        {/* Inventory List */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                    item.status === 'Critical' ? 'bg-red-50 text-red-500' : 
                    item.status === 'Low' ? 'bg-orange-50 text-orange-500' : 'bg-slate-50 text-slate-400'
                  }`}>
                    <Box size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#334155] tracking-tight">{item.name}</h3>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">{item.id} • {item.category}</p>
                  </div>
                </div>
                <button className="p-2 text-slate-400 hover:text-[#334155] hover:bg-slate-50 rounded-lg transition-all border border-slate-100"><MoreVertical size={16} /></button>
              </div>

              <div className="flex items-end justify-between mb-6">
                <div>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Current Stock</p>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-3xl font-bold tracking-tight ${
                      item.status === 'Critical' ? 'text-red-500' : 
                      item.status === 'Low' ? 'text-orange-500' : 'text-[#334155]'
                    }`}>{item.stock}</span>
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{item.unit}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Status</p>
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                    item.status === 'Critical' ? 'bg-red-50 text-red-600' : 
                    item.status === 'Low' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2 pt-5 border-t border-slate-50">
                <button 
                  onClick={() => adjustStock(item.id, -1)}
                  className="p-2.5 bg-slate-50 text-slate-400 rounded-lg hover:bg-red-50 hover:text-red-500 transition-all border border-slate-100 flex items-center justify-center"
                >
                  <Minus size={16} />
                </button>
                <button 
                  onClick={() => adjustStock(item.id, 1)}
                  className="p-2.5 bg-slate-50 text-slate-400 rounded-lg hover:bg-green-50 hover:text-green-500 transition-all border border-slate-100 flex items-center justify-center"
                >
                  <Plus size={16} />
                </button>
                <button className="flex-1 py-2.5 bg-[#334155] text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-all shadow-sm">
                  Manage
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Movement Log Sidebar (Optional/Sub-section) */}
      <div className="bg-[#334155] p-8 rounded-2xl shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-white/10 transition-colors"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <History size={18} className="text-white/40" /> Stock Movements
            </h3>
            <p className="text-xs text-white/50 font-medium max-w-sm">Track every addition and consumption log across all departments in real-time.</p>
          </div>
          <button className="w-full md:w-auto px-6 py-3 bg-white text-[#334155] rounded-xl text-sm font-semibold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
            View Full Audit Log <ChevronRight size={18} />
          </button>
        </div>
      </div>

    </div>
  );
};

export default Inventory;
