import { Bell, Search, Menu } from 'lucide-react'

const Header = ({ title, onMenuClick }) => {
  return (
    <header className="h-24 bg-white/80 backdrop-blur-md border-b border-slate-100 px-12 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-8">
        <button 
          onClick={onMenuClick}
          className="p-2.5 hover:bg-slate-50 rounded-xl lg:hidden transition-colors border border-transparent active:border-slate-100"
        >
          <Menu size={22} className="text-[#2d3436]" />
        </button>
        <h2 className="text-[10px] font-black text-black uppercase tracking-[0.4em]">{title}</h2>
      </div>

      <div className="flex items-center gap-8">
        <div className="hidden md:flex items-center bg-slate-50 border border-slate-100 rounded-2xl px-6 py-3 w-80 focus-within:bg-white focus-within:border-slate-200 transition-all duration-300">
          <Search size={14} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="SEARCH RECORDS..." 
            className="bg-transparent border-none focus:ring-0 text-[10px] font-black uppercase tracking-widest ml-4 w-full text-[#2d3436] placeholder-slate-300"
          />
        </div>

        <div className="flex items-center gap-3">
          <button className="relative p-3 hover:bg-slate-50 rounded-2xl transition-all group">
            <Bell size={18} className="text-[#2d3436]" strokeWidth={2} />
            <span className="absolute top-3 right-3 w-2 h-2 bg-[#2d3436] border-2 border-white rounded-full"></span>
          </button>
          
          <div className="h-10 w-px bg-slate-100 mx-3 hidden sm:block"></div>

          <button className="flex items-center gap-4 pl-3 pr-1 py-1 rounded-2xl hover:bg-slate-50 transition-all group">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-black text-[#2d3436] uppercase tracking-widest">Aditya Jaiswal</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">System Administrator</p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-[#2d3436] flex items-center justify-center text-white text-xs font-black">
              AJ
            </div>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
