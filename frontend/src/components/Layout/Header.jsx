import { Bell, Search, Menu } from 'lucide-react'

const Header = ({ title, onMenuClick }) => {
  return (
    <header className="h-24 bg-white/80 backdrop-blur-md border-b border-slate-100 px-12 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-6">
        <button 
          onClick={onMenuClick}
          className="p-2 hover:bg-slate-50 rounded-lg lg:hidden transition-colors text-slate-500"
        >
          <Menu size={22} />
        </button>
        <h2 className="text-lg font-semibold text-[#334155] tracking-wide">{title}</h2>
      </div>

      <div className="flex items-center gap-8">
        <div className="hidden md:flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 w-80 focus-within:bg-white focus-within:border-[#D4AF37] focus-within:ring-2 focus-within:ring-[#D4AF37]/20 transition-all duration-300 shadow-sm">
          <Search size={16} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Search records..." 
            className="bg-transparent border-none focus:ring-0 text-sm font-medium ml-3 w-full text-[#334155] placeholder-slate-400"
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2.5 hover:bg-slate-50 rounded-lg transition-all text-slate-500 hover:text-[#D4AF37]">
            <Bell size={20} strokeWidth={1.5} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#D4AF37] border-2 border-white rounded-full"></span>
          </button>
          
          <div className="h-8 w-px bg-slate-200 mx-2 hidden sm:block"></div>

          <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-xl hover:bg-slate-50 transition-all group">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-[#334155]">Aditya Jaiswal</p>
              <p className="text-xs text-slate-400 font-medium">System Administrator</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#e6c86a] flex items-center justify-center text-white text-sm font-bold shadow-sm">
              AJ
            </div>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
