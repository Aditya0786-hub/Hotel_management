import React, { useState, useEffect } from 'react';
import { 
  ChefHat, 
  Clock, 
  UtensilsCrossed, 
  DollarSign, 
  Plus, 
  Timer, 
  CheckCircle2, 
  AlertCircle, 
  Coffee,
  Pizza,
  Wine,
  MoreVertical,
  ChevronRight
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

const OrderCard = ({ order, onUpdate }) => {
  const [timer, setTimer] = useState(order.elapsed);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const getStatusStyles = (status, urgent) => {
    if (urgent) return 'border-red-200 bg-red-50/20 ring-4 ring-red-100 shadow-2xl animate-pulse-subtle';
    switch (status) {
      case 'New': return 'border-blue-200 bg-blue-50/20 ring-4 ring-blue-50/50 animate-pulse-subtle';
      case 'Preparing': return 'border-slate-200 bg-white';
      case 'Ready': return 'border-green-200 bg-green-50/20';
      default: return 'border-slate-100 bg-white';
    }
  };

  return (
    <div className={`p-6 rounded-2xl border-2 transition-all duration-500 flex flex-col h-full ${getStatusStyles(order.status, order.urgent)}`}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="text-lg font-bold text-[#334155] tracking-tight">{order.source}</h3>
            {order.urgent && (
              <span className="px-2 py-0.5 bg-red-600 text-white text-[8px] font-bold uppercase rounded-lg">Urgent</span>
            )}
          </div>
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">Order #{order.id} • {order.type}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-xl border border-slate-100 shadow-sm">
            <Timer size={14} className="text-slate-400" />
            <span className="text-xs font-bold text-[#334155]">{timer}m</span>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-3 mb-6">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-[10px] font-bold text-[#334155] border border-slate-100">
                {item.qty}x
              </span>
              <span className="text-sm font-medium text-slate-600">{item.name}</span>
            </div>
            {item.notes && <AlertCircle size={14} className="text-orange-400" title={item.notes} />}
          </div>
        ))}
      </div>

      <div className="pt-6 border-t border-slate-100 flex items-center gap-3">
        {order.status === 'New' && (
          <button 
            onClick={() => onUpdate(order.id, 'Preparing')}
            className="flex-1 py-3 bg-[#334155] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow-md"
          >
            Start Prep
          </button>
        )}
        {order.status === 'Preparing' && (
          <button 
            onClick={() => onUpdate(order.id, 'Ready')}
            className="flex-1 py-4 bg-green-600 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg"
          >
            Mark Ready
          </button>
        )}
        {order.status === 'Ready' && (
          <button 
            onClick={() => onUpdate(order.id, 'Served')}
            className="flex-1 py-4 bg-slate-100 text-[#2d3436] rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
          >
            Served
          </button>
        )}
        <button 
          onClick={() => onUpdate(order.id, 'toggleUrgent')}
          className={`p-4 rounded-2xl transition-all ${
            order.urgent ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-300 hover:text-[#2d3436]'
          }`}
        >
          <AlertCircle size={18} />
        </button>
      </div>
    </div>
  );
};

const KitchenPOS = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [orders, setOrders] = useState([
    { id: '1024', source: 'Room 302', type: 'Room Service', status: 'New', elapsed: 2, items: [
      { qty: 2, name: 'Club Sandwich', notes: 'No Mayo' },
      { qty: 1, name: 'Orange Juice', notes: 'Fresh' }
    ]},
    { id: '1025', source: 'Table 4', type: 'Dining', status: 'Preparing', elapsed: 12, items: [
      { qty: 1, name: 'Classic Margherita', notes: 'Extra Cheese' },
      { qty: 2, name: 'Coke Zero', notes: '' }
    ]},
    { id: '1026', source: 'Table 7', type: 'Dining', status: 'Ready', elapsed: 24, items: [
      { qty: 1, name: 'Grilled Salmon', notes: '' },
      { qty: 1, name: 'Chardonnay', notes: '' }
    ]},
    { id: '1027', source: 'Poolside', type: 'Dining', status: 'New', elapsed: 5, items: [
      { qty: 3, name: 'Virgin Mojito', notes: 'Extra Mint' }
    ]},
  ]);

  const updateOrderStatus = (id, action) => {
    if (action === 'Served') {
      setOrders(prev => prev.filter(o => o.id !== id));
    } else if (action === 'toggleUrgent') {
      setOrders(prev => prev.map(o => o.id === id ? { ...o, urgent: !o.urgent } : o));
    } else {
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status: action } : o));
    }
  };

  const filteredOrders = orders.filter(o => activeTab === 'All' || o.type === activeTab);

  return (
    <div className="space-y-12 sm:space-y-16 pb-20">
      
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-[#334155] tracking-tight">Kitchen & POS</h1>
          <p className="text-sm font-medium text-slate-400 mt-1 uppercase tracking-wider flex items-center gap-2">
            Service Board <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span> <span className="text-[#334155]">Real-time Operations</span>
          </p>
        </div>
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-[#D4AF37] text-white rounded-xl text-sm font-semibold hover:opacity-90 shadow-md transition-all">
          <Plus size={18} /> New POS Order
        </button>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
        <StatCard label="Active Orders" value={orders.length} subtext="Live" icon={ChefHat} color="text-[#334155]" bgClass="bg-slate-50" />
        <StatCard label="Total Sales" value="₹12.4K" subtext="Today" icon={DollarSign} color="text-green-500" bgClass="bg-green-50" />
        <StatCard label="Avg. Prep" value="18m" subtext="Target 15m" icon={Clock} color="text-[#D4AF37]" bgClass="bg-[#D4AF37]/10" />
        <StatCard label="Kitchen Load" value="Normal" subtext="Optimal" icon={UtensilsCrossed} color="text-orange-500" bgClass="bg-orange-50" />
      </div>

      {/* Tabs & Filtering */}
      <div className="space-y-8">
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-50 rounded-xl w-full sm:w-auto border border-slate-100">
          {['All', 'Dining', 'Room Service'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === tab ? 'bg-white text-[#D4AF37] shadow-sm' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
              <OrderCard key={order.id} order={order} onUpdate={updateOrderStatus} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-white rounded-2xl border border-slate-100">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <UtensilsCrossed size={28} className="text-slate-200" />
              </div>
              <h3 className="text-lg font-bold text-[#334155]">All Clear</h3>
              <p className="text-xs font-medium text-slate-400 mt-2 uppercase tracking-wider">No active orders in the queue.</p>
            </div>
          )}
        </div>
      </div>

      {/* Sales Snapshot Footer */}
      <div className="bg-[#334155] p-8 sm:p-10 rounded-2xl shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-48 -mt-48 group-hover:bg-white/10 transition-colors"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-10">
            <div className="hidden sm:flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                <Coffee size={18} />
              </div>
              <div className="text-white">
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Coffee Bar</p>
                <p className="text-xl font-bold">₹4.2K</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                <Pizza size={18} />
              </div>
              <div className="text-white">
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Main Kitchen</p>
                <p className="text-xl font-bold">₹6.8K</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                <Wine size={18} />
              </div>
              <div className="text-white">
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Lounge</p>
                <p className="text-xl font-bold">₹1.4K</p>
              </div>
            </div>
          </div>
          <button className="w-full lg:w-auto px-8 py-3.5 bg-white text-[#334155] rounded-xl text-sm font-semibold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
            Full Sales Analytics <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.95; transform: scale(0.995); }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 3s ease-in-out infinite;
        }
      `}} />

    </div>
  );
};

export default KitchenPOS;
