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
  <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.04)] transition-all duration-500 group">
    <div className="flex justify-between items-start mb-8">
      <div className="p-4.5 bg-slate-50 rounded-3xl group-hover:bg-[#2d3436] group-hover:text-white transition-all duration-300">
        <Icon size={24} strokeWidth={1.5} />
      </div>
      <div className={`flex items-center gap-1 text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-tighter ${
        isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
      }`}>
        {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {change}
      </div>
    </div>
    <div>
      <h4 className="text-[10px] font-black text-black uppercase tracking-[0.2em] mb-3">{title}</h4>
      <p className="text-4xl font-black text-[#2d3436]">{value}</p>
    </div>
  </div>
)

const RecentActivity = () => (
  <div className="bg-white rounded-[56px] border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.02)] p-10">
    <div className="flex items-center justify-between mb-12">
      <h3 className="text-[11px] font-black text-black uppercase tracking-[0.3em]">RESIDENT STATUS</h3>
      <button className="p-3 hover:bg-slate-50 rounded-2xl transition-colors">
        <MoreHorizontal size={20} className="text-slate-300" />
      </button>
    </div>
    <div className="space-y-10">
      {[
        { user: 'Sarah Connor', room: 'Suite 402', status: 'Check-in', time: '10:30 AM', active: true },
        { user: 'John Doe', room: 'Deluxe 105', status: 'Check-out', time: '11:15 AM', active: false },
        { user: 'Ellen Ripley', room: 'Standard 203', status: 'In-Stay', time: 'Yesterday', active: true },
        { user: 'Thomas Muller', room: 'Suite 401', status: 'Pending', time: '12:00 PM', active: false },
      ].map((item, i) => (
        <div key={i} className="flex items-center justify-between group cursor-pointer">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center font-black text-[#2d3436] text-sm group-hover:bg-[#2d3436] group-hover:text-white transition-all duration-300">
              {item.user.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <p className="text-sm font-black text-[#2d3436] uppercase tracking-tight">{item.user}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{item.room}</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-[9px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest mb-2 inline-block ${
              item.active ? 'bg-[#2d3436] text-white' : 'bg-slate-100 text-slate-400'
            }`}>
              {item.status}
            </div>
            <p className="text-[9px] font-bold text-slate-300 uppercase tracking-tighter">{item.time}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
)

const Overview = () => {
  const [dateFilter, setDateFilter] = useState('Daily');

  return (
    <div className="space-y-14">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <StatCard title="TOTAL BOOKINGS" value="1,284" change="+12.5%" isPositive icon={CalendarCheck} />
        <StatCard title="AVAILABLE ROOMS" value="42 / 120" change="-2.4%" isPositive={false} icon={Bed} />
        <StatCard title="ACTIVE GUESTS" value="86" change="+4.3%" isPositive icon={Users} />
        <StatCard title="REVENUE (MTD)" value="$42,500" change="+18.2%" isPositive icon={TrendingUp} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 bg-white rounded-[56px] border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.02)] p-12 min-h-[500px] flex flex-col">
          <div className="flex items-center justify-between mb-16">
            <div>
              <h3 className="text-[11px] font-black text-black uppercase tracking-[0.3em]">ANALYTIC INSIGHTS</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Performance data for the current period</p>
            </div>
            <div className="flex gap-2 bg-slate-50 p-1 rounded-3xl border border-slate-100">
              {['Daily', 'Weekly', 'Monthly'].map(filter => (
                <button 
                  key={filter}
                  onClick={() => setDateFilter(filter)}
                  className={`px-6 py-3 text-[9px] font-black uppercase tracking-widest rounded-2xl transition-all ${
                    dateFilter === filter 
                      ? 'bg-[#2d3436] text-white shadow-lg' 
                      : 'text-slate-400 hover:text-[#2d3436]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex-1 flex items-end gap-4 sm:gap-8 px-2 sm:px-6 mt-8">
            {[
              { id: 'MON', val: 35 }, { id: 'TUE', val: 60 }, { id: 'WED', val: 40 }, 
              { id: 'THU', val: 75 }, { id: 'FRI', val: 90 }, { id: 'SAT', val: 50 }, { id: 'SUN', val: 70 }
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-5 group relative">
                {/* Tooltip */}
                <div className="absolute -top-12 bg-[#2d3436] text-white text-[10px] font-black px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {bar.val}%
                </div>
                <div 
                  className="w-full bg-slate-50 rounded-[24px] relative overflow-hidden transition-all duration-700 group-hover:bg-[#2d3436] group-hover:shadow-2xl cursor-pointer" 
                  style={{ height: `${bar.val}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
                </div>
                <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{bar.id}</span>
              </div>
            ))}
          </div>
        </div>

        <RecentActivity />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {[
          { title: 'NEW RESERVATION', subtitle: 'OPEN A NEW GUEST RECORD', icon: CalendarCheck },
          { title: 'GUEST MANAGEMENT', subtitle: 'VIEW RESIDENT DIRECTORY', icon: Users },
          { title: 'ROOM SERVICE', subtitle: 'HOUSEKEEPING & TASKS', icon: Clock },
        ].map((action, i) => (
          <button key={i} className="flex items-center gap-8 p-10 bg-white border border-slate-100 rounded-[48px] text-left hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all group">
            <div className="p-5 bg-slate-50 rounded-3xl group-hover:bg-[#2d3436] group-hover:text-white transition-all duration-300">
              <action.icon size={26} strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="text-[11px] font-black text-[#2d3436] uppercase tracking-widest mb-2">{action.title}</h4>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{action.subtitle}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Overview
