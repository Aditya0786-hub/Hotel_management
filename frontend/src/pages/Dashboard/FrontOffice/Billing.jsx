import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  PieChart, 
  Receipt, 
  Search, 
  Filter, 
  Download,
  CreditCard,
  Building2,
  Globe,
  ArrowUpRight,
  MoreVertical,
  ChevronRight,
  X,
  FileText,
  User,
  Wallet
} from 'lucide-react';

const StatCard = ({ label, value, subtext, icon: Icon, color, trend }) => (
  <div className="bg-white p-8 rounded-[48px] border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.02)] flex flex-col justify-between h-52 group hover:shadow-xl transition-all duration-500">
    <div className="flex justify-between items-start">
      <div className={`p-4 bg-slate-50 rounded-3xl ${color} group-hover:scale-110 transition-transform`}>
        <Icon size={24} strokeWidth={2.5} />
      </div>
      {trend && (
        <div className="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black tracking-widest">
          <ArrowUpRight size={12} /> {trend}
        </div>
      )}
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

const InvoiceModal = ({ isOpen, onClose, bill }) => {
  if (!bill || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-8 animate-fade-in overflow-hidden">
      <div className="bg-white w-full sm:max-w-2xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col animate-slide-up relative">
        <div className="p-8 sm:p-12 border-b border-slate-50 flex items-center justify-between bg-[#2d3436] text-white">
          <div>
            <h2 className="text-2xl font-black tracking-tighter uppercase">Invoice Preview</h2>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Heritage Hotel & Resort</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-xl transition-all">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-8 sm:p-12 space-y-10 overflow-y-auto max-h-[60vh] no-scrollbar">
          <div className="flex justify-between items-start border-b border-slate-50 pb-8">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Bill To</p>
              <h4 className="text-lg font-black text-[#2d3436]">{bill.guest}</h4>
              <p className="text-xs font-bold text-slate-400">Room {bill.room}</p>
            </div>
            <div className="text-right space-y-1">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Date</p>
              <h4 className="text-sm font-black text-[#2d3436]">{bill.date}</h4>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Summary</p>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="font-bold text-slate-500 italic">Total Amount</span>
                <span className="font-black text-[#2d3436]">{bill.amount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-bold text-slate-500 italic">Method</span>
                <span className="font-black text-[#2d3436]">{bill.method}</span>
              </div>
              <div className="h-px bg-slate-50"></div>
              <div className="flex justify-between text-xl">
                <span className="font-black text-[#2d3436] uppercase tracking-tighter">Grand Total</span>
                <span className="font-black text-[#2d3436]">{bill.amount}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-4">
          <button onClick={onClose} className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Close</button>
          <button className="flex-[2] py-4 bg-[#2d3436] text-white rounded-[24px] text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-3">
            Download PDF <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

const Billing = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBill, setSelectedBill] = useState(null);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  const billingData = [
    { room: '101', guest: 'John Doe', amount: '₹12,450', method: 'Card', status: 'Paid', date: 'Oct 24, 2023' },
    { room: '203', guest: 'Ellen Ripley', amount: '₹8,900', method: 'UPI', status: 'Paid', date: 'Oct 24, 2023' },
    { room: '104', guest: 'Michael Scott', amount: '₹15,200', method: 'Cash', status: 'Pending', date: 'Oct 23, 2023' },
    { room: '302', guest: 'Sarah Connor', amount: '₹22,000', method: 'Card', status: 'Paid', date: 'Oct 22, 2023' },
    { room: '205', guest: 'Thomas Anderson', amount: '₹5,600', method: 'UPI', status: 'Partial', date: 'Oct 22, 2023' },
  ];

  const otaRevenue = [
    { channel: 'Booking.com', amount: '₹4,52,000', percentage: 45, icon: Globe },
    { channel: 'Expedia', amount: '₹2,80,000', percentage: 28, icon: Globe },
    { channel: 'Airbnb', amount: '₹1,20,000', percentage: 12, icon: Building2 },
    { channel: 'Direct / Others', amount: '₹1,50,000', percentage: 15, icon: TrendingUp },
  ];

  const gstSummary = {
    taxable: '₹10,02,450',
    cgst: '₹90,220',
    sgst: '₹90,220',
    total: '₹1,80,440'
  };

  return (
    <div className="space-y-12 sm:space-y-20 pb-20">
      
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#2d3436] tracking-tighter">Billing & Revenue</h1>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mt-3 flex items-center gap-2">
            Financial Overview • <span className="text-green-500 underline underline-offset-4 decoration-2">This Month</span>
          </p>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-3 px-8 py-5 bg-[#2d3436] text-white rounded-[28px] text-[10px] font-black uppercase tracking-widest hover:opacity-90 shadow-xl transition-all">
            <Download size={16} /> Export Report
          </button>
        </div>
      </div>

      {/* Main KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
        <StatCard label="Total Revenue" value="₹12.4L" subtext="INR" icon={DollarSign} color="text-[#2d3436]" trend="+12%" />
        <StatCard label="OTA Revenue" value="₹8.5L" subtext="INR" icon={Globe} color="text-blue-500" trend="+8%" />
        <StatCard label="GST Summary" value="₹1.8L" subtext="Collected" icon={Receipt} color="text-green-600" />
        <StatCard label="Pending" value="₹42K" subtext="Due" icon={CreditCard} color="text-orange-500" />
      </div>

      {/* Secondary Grid: OTA & GST Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* OTA Breakdown */}
        <div className="lg:col-span-1 bg-white p-10 rounded-[56px] border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.01)] flex flex-col h-full">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-[12px] font-black text-[#2d3436] uppercase tracking-[0.25em] flex items-center gap-3">
              <PieChart size={18} className="text-slate-300" /> OTA Revenue
            </h3>
            <button className="text-[10px] font-black text-slate-300 uppercase tracking-widest hover:text-[#2d3436] transition-colors">Details</button>
          </div>
          <div className="space-y-8 flex-1">
            {otaRevenue.map((item, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                  <span className="text-[#2d3436]">{item.channel}</span>
                  <span className="text-slate-400">{item.amount}</span>
                </div>
                <div className="h-3 bg-slate-50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#2d3436] rounded-full transition-all duration-1000" 
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GST Summary Block */}
        <div className="lg:col-span-2 bg-[#2d3436] p-10 rounded-[56px] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-white/10 transition-colors"></div>
          <div className="relative z-10">
            <h3 className="text-[12px] font-black text-white uppercase tracking-[0.25em] mb-12 flex items-center gap-3">
              <Receipt size={18} className="text-white/40" /> Tax & GST Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-white/10 pb-12">
              <div className="space-y-2">
                <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">Taxable Amount</p>
                <p className="text-3xl font-black text-white">{gstSummary.taxable}</p>
              </div>
              <div className="space-y-2">
                <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">CGST (9%)</p>
                <p className="text-3xl font-black text-white">{gstSummary.cgst}</p>
              </div>
              <div className="space-y-2">
                <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">SGST (9%)</p>
                <p className="text-3xl font-black text-white">{gstSummary.sgst}</p>
              </div>
            </div>
            <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">Total Tax Liability</p>
                <p className="text-4xl font-black text-white mt-1">{gstSummary.total}</p>
              </div>
              <button className="w-full sm:w-auto px-10 py-5 bg-white text-[#2d3436] rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
                Download GST Report <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Room-wise Billing Table/List */}
      <div className="bg-white rounded-[56px] border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.01)] overflow-hidden">
        <div className="p-10 border-b border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="relative group w-full sm:w-96">
            <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#2d3436] transition-colors" />
            <input 
              type="text" 
              placeholder="Search Room or Guest..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-[28px] text-sm font-bold focus:outline-none focus:bg-white focus:border-[#2d3436]/20 transition-all" 
            />
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none p-5 bg-slate-50 text-slate-400 rounded-2xl hover:text-[#2d3436] transition-all"><Filter size={18} /></button>
            <p className="hidden sm:block text-[10px] font-black text-slate-300 uppercase tracking-widest">Displaying Last 30 Days</p>
          </div>
        </div>

        <div className="p-10">
          {/* Desktop Table Header */}
          <div className="hidden md:grid grid-cols-6 gap-6 px-10 pb-8 border-b border-slate-50 mb-8">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Room / Guest</p>
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Check-out</p>
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Amount</p>
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Method</p>
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Status</p>
            <p className="text-right text-[10px] font-black text-slate-300 uppercase tracking-widest">Actions</p>
          </div>

          <div className="space-y-6">
            {billingData.map((bill, idx) => (
              <div key={idx} className="flex flex-col md:grid md:grid-cols-6 gap-4 md:gap-6 p-8 rounded-[40px] border border-slate-50 bg-white hover:border-[#2d3436]/10 hover:shadow-2xl transition-all duration-500 group items-center">
                <div className="flex items-center gap-6 w-full md:w-auto">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#2d3436] group-hover:text-white transition-all">
                    <span className="text-lg font-black tracking-tighter">{bill.room}</span>
                  </div>
                  <div>
                    <p className="text-sm font-black text-[#2d3436] tracking-tight">{bill.guest}</p>
                    <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mt-1">Transaction Verified</p>
                  </div>
                </div>

                <div className="w-full md:w-auto">
                  <p className="md:hidden text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Check-out</p>
                  <p className="text-[11px] font-black text-[#2d3436] uppercase tracking-widest">{bill.date}</p>
                </div>

                <div className="w-full md:w-auto">
                  <p className="md:hidden text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Amount</p>
                  <p className="text-lg font-black text-[#2d3436] tracking-tighter">{bill.amount}</p>
                </div>

                <div className="w-full md:w-auto">
                  <p className="md:hidden text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Method</p>
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{bill.method}</p>
                </div>

                <div className="w-full md:w-auto">
                  <p className="md:hidden text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                  <span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest ${
                    bill.status === 'Paid' ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'
                  }`}>
                    {bill.status}
                  </span>
                </div>

                <div className="w-full md:w-auto flex justify-end gap-3">
                  <button 
                    onClick={() => {
                      setSelectedBill(bill);
                      setIsInvoiceOpen(true);
                    }}
                    className="p-4 text-slate-300 hover:text-[#2d3436] bg-slate-50 hover:bg-white rounded-2xl transition-all border border-transparent hover:border-slate-100 shadow-sm"
                  >
                    <Search size={18} />
                  </button>
                  <button className="p-4 text-slate-300 hover:text-[#2d3436] bg-slate-50 hover:bg-white rounded-2xl transition-all border border-transparent hover:border-slate-100 shadow-sm">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <InvoiceModal 
        isOpen={isInvoiceOpen} 
        onClose={() => setIsInvoiceOpen(false)} 
        bill={selectedBill} 
      />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        .animate-slide-up { animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />

    </div>
  );
};

export default Billing;
