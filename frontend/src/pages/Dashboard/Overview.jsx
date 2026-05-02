import { useState } from 'react';
import { 
  Users, 
  Bed, 
  CalendarCheck, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  MoreHorizontal
} from 'lucide-react'

const StatCard = ({ title, value, change, isPositive, icon: Icon }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group">
    <div className="flex justify-between items-start mb-6">
      <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-[#D4AF37] group-hover:text-white transition-all duration-300 border border-slate-100">
        <Icon size={24} strokeWidth={2} className="text-slate-500 group-hover:text-white" />
      </div>
      <div className={`flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider ${
        isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
      }`}>
        {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {change}
      </div>
    </div>
    <div>
      <h4 className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider">{title}</h4>
      <p className="text-3xl font-bold text-[#334155] tracking-tight">{value}</p>
    </div>
  </div>
)

const RecentActivity = () => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8">
    <div className="flex items-center justify-between mb-8">
      <div>
        <h3 className="text-lg font-bold text-[#334155] tracking-tight">Resident Status</h3>
        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">Live Occupancy</p>
      </div>
      <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100">
        <MoreHorizontal size={20} className="text-slate-400" />
      </button>
    </div>
    <div className="space-y-6">
      {[
        { user: 'Sarah Connor', room: 'Suite 402', status: 'Check-in', time: '10:30 AM', active: true },
        { user: 'John Doe', room: 'Deluxe 105', status: 'Check-out', time: '11:15 AM', active: false },
        { user: 'Ellen Ripley', room: 'Standard 203', status: 'In-Stay', time: 'Yesterday', active: true },
        { user: 'Thomas Muller', room: 'Suite 401', status: 'Pending', time: '12:00 PM', active: false },
      ].map((item, i) => (
        <div key={i} className="flex items-center justify-between group cursor-pointer p-2 hover:bg-slate-50 rounded-xl transition-all">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center font-bold text-[#334155] group-hover:bg-[#D4AF37] group-hover:text-white transition-all">
              {item.user.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <p className="text-sm font-bold text-[#334155] tracking-tight">{item.user}</p>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{item.room}</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-[10px] font-bold px-2.5 py-1 rounded-lg mb-1 inline-block uppercase tracking-wider ${
              item.active ? 'bg-[#F9F6ED] text-[#D4AF37]' : 'bg-slate-50 text-slate-500'
            }`}>
              {item.status}
            </div>
            <p className="text-[10px] text-slate-400 font-medium">{item.time}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
)

const Overview = () => {
  const [dateFilter, setDateFilter] = useState('Daily');

  return (
    <div className="space-y-12 sm:space-y-16 pb-20">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-[#334155] tracking-tight">Executive Overview</h1>
          <p className="text-sm font-medium text-slate-400 mt-1 uppercase tracking-wider">Property Performance Snapshot</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
            {['Daily', 'Weekly', 'Monthly'].map(tab => (
              <button 
                key={tab}
                onClick={() => setDateFilter(tab)}
                className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all ${
                  dateFilter === tab ? 'bg-white text-[#D4AF37] shadow-sm' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
        <StatCard title="TOTAL BOOKINGS" value="1,284" change="+12.5%" isPositive icon={CalendarCheck} />
        <StatCard title="AVAILABLE ROOMS" value="42 / 120" change="-2.4%" isPositive={false} icon={Bed} />
        <StatCard title="ACTIVE GUESTS" value="86" change="+4.3%" isPositive icon={Users} />
        <StatCard title="REVENUE (MTD)" value="₹4.25L" change="+18.2%" isPositive icon={TrendingUp} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 min-h-[500px] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-[#334155] tracking-tight">Analytic Insights</h3>
              <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">Revenue & Occupancy Metrics</p>
            </div>
          </div>
          
          <div className="flex-1 flex items-end gap-4 sm:gap-8 px-2 sm:px-6 mt-8">
            {[
              { id: 'MON', val: 35 }, { id: 'TUE', val: 60 }, { id: 'WED', val: 40 }, 
              { id: 'THU', val: 75 }, { id: 'FRI', val: 90 }, { id: 'SAT', val: 50 }, { id: 'SUN', val: 70 }
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-4 group relative">
                {/* Tooltip */}
                <div className="absolute -top-10 bg-[#334155] text-white text-[10px] font-bold px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 uppercase tracking-widest shadow-xl">
                  {bar.val}%
                </div>
                <div 
                  className="w-full bg-slate-50 rounded-xl relative overflow-hidden transition-all duration-500 group-hover:bg-[#D4AF37] group-hover:shadow-lg cursor-pointer border border-slate-100 group-hover:border-transparent" 
                  style={{ height: `${bar.val}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
                </div>
                <span className="text-[10px] font-bold text-slate-400 group-hover:text-[#334155] transition-colors uppercase tracking-widest">{bar.id}</span>
              </div>
            ))}
          </div>
        </div>

        <RecentActivity />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'New Reservation', subtitle: 'Open a new guest record', icon: CalendarCheck },
          { title: 'Guest Management', subtitle: 'View resident directory', icon: Users },
          { title: 'Room Service', subtitle: 'Housekeeping & tasks', icon: Clock },
        ].map((action, i) => (
          <button key={i} className="flex items-center gap-5 p-6 bg-white border border-slate-100 rounded-2xl text-left hover:shadow-md hover:border-[#D4AF37]/30 transition-all group">
            <div className="p-4 bg-slate-50 rounded-xl group-hover:bg-[#334155] group-hover:text-white transition-all duration-300 text-slate-500 border border-slate-100 group-hover:border-transparent">
              <action.icon size={24} strokeWidth={2} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#334155] mb-1 tracking-tight">{action.title}</h4>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{action.subtitle}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Overview;
