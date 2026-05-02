import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Hotel, 
  Store, 
  CreditCard, 
  Settings2, 
  ChefHat, 
  ChevronDown, 
  ChevronRight,
  LogOut,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react'

const SidebarItem = ({ item, isActive, isExpanded, onToggle, isCollapsed, onClose }) => {
  const Icon = item.icon
  const hasSubItems = item.subItems && item.subItems.length > 0

  return (
    <div className="mb-1">
      <Link
        to={item.path || '#'}
        onClick={(e) => {
          if (hasSubItems) {
            e.preventDefault()
            onToggle()
          } else if (onClose) {
            onClose()
          }
        }}
        className={`flex items-center transition-all duration-300 group relative ${
          isCollapsed ? 'justify-center px-0 py-4' : 'justify-between px-6 py-4'
        } rounded-3xl ${
          isActive 
            ? 'bg-white text-[#2d3436] shadow-xl' 
            : 'text-slate-400 hover:text-white hover:bg-white/5'
        }`}
      >
        <div className={`flex items-center gap-4 ${isCollapsed ? 'justify-center' : ''}`}>
          <Icon size={18} strokeWidth={isActive ? 2.5 : 1.5} />
          {!isCollapsed && (
            <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'opacity-100' : 'opacity-80'}`}>
              {item.title}
            </span>
          )}
        </div>

        {!isCollapsed && hasSubItems && (
          <div className={`${isActive ? 'text-[#2d3436]' : 'text-slate-600'}`}>
            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </div>
        )}

        {/* Tooltip for Collapsed State */}
        {isCollapsed && (
          <div className="absolute left-full ml-4 px-3 py-2 bg-[#2d3436] text-white text-[10px] font-black uppercase tracking-widest rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-2xl z-[100] whitespace-nowrap border border-white/10">
            {item.title}
          </div>
        )}
      </Link>

      {!isCollapsed && hasSubItems && isExpanded && (
        <div className="ml-12 mt-2 mb-4 flex flex-col gap-1 border-l border-white/10 pl-4">
          {item.subItems.map((sub) => {
            const isSubActive = location.pathname === sub.path;
            return (
              <Link
                key={sub.path}
                to={sub.path}
                onClick={onClose}
                className={`relative px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.15em] rounded-xl transition-all flex items-center gap-2 ${
                  isSubActive 
                    ? 'text-white bg-white/5' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {isSubActive && <div className="w-1 h-1 rounded-full bg-white animate-pulse"></div>}
                {sub.title}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  )
}

const Sidebar = ({ isCollapsed, setIsCollapsed, onClose }) => {
  const location = useLocation()
  const [expandedItems, setExpandedItems] = useState(['Front Office', 'Store'])

  const menuItems = [
    { title: 'Overview', icon: LayoutDashboard, path: '/dashboard/overview' },
    { 
      title: 'Front Office', 
      icon: Hotel, 
      subItems: [
        { title: 'Guest Registry', path: '/dashboard/front-office/user' },
        { title: 'Stay Overview', path: '/dashboard/front-office/stay' },
        { title: 'Reservations', path: '/dashboard/front-office/reservations' },
        { title: 'Billing', path: '/dashboard/front-office/billing' },
      ]
    },
    { 
      title: 'Store', 
      icon: Store, 
      subItems: [
        { title: 'Inventory', path: '/dashboard/store/inventory' },
      ]
    },
    { title: 'Subscription', icon: CreditCard, path: '/dashboard/subscription' },
    { title: 'Channel Manager', icon: Settings2, path: '/dashboard/channel-manager' },
    { title: 'Kitchen & POS', icon: ChefHat, path: '/dashboard/kitchen-pos' },
  ]

  const toggleExpand = (title) => {
    setExpandedItems(prev => 
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    )
  }

  return (
    <aside className="h-full w-full bg-[#2d3436] flex flex-col border-r border-white/5 transition-all duration-500">
      
      {/* Header / Logo */}
      <div className={`mb-4 flex items-center ${isCollapsed ? 'justify-center p-6' : 'justify-between p-10'}`}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shrink-0">
            <Hotel size={18} className="text-[#2d3436]" strokeWidth={2.5} />
          </div>
          {!isCollapsed && (
            <span className="text-xl font-black text-white tracking-[0.2em] uppercase">Heritage</span>
          )}
        </div>
      </div>

      {/* Collapse Toggle Button (Desktop Only) */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden lg:flex absolute top-11 -right-3 w-6 h-6 bg-white rounded-full items-center justify-center shadow-xl border border-slate-100 hover:scale-110 transition-transform z-[60] text-[#2d3436]"
      >
        {isCollapsed ? <ChevronRight size={14} strokeWidth={3} /> : <ChevronLeft size={14} strokeWidth={3} />}
      </button>

      <nav className={`flex-1 overflow-y-auto no-scrollbar ${isCollapsed ? 'px-4' : 'px-8'}`}>
        {!isCollapsed && (
          <p className="px-6 mb-6 text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">Management Console</p>
        )}
        {menuItems.map((item) => (
          <SidebarItem 
            key={item.title} 
            item={item} 
            isCollapsed={isCollapsed}
            isActive={location.pathname === item.path || (item.subItems?.some(s => location.pathname === s.path))}
            isExpanded={expandedItems.includes(item.title)}
            onToggle={() => toggleExpand(item.title)}
            onClose={onClose}
          />
        ))}
      </nav>

      {/* Footer / Sign Out */}
      <div className={`${isCollapsed ? 'p-6 flex justify-center' : 'p-10'}`}>
        <Link 
          to="/login" 
          onClick={onClose}
          className={`flex items-center gap-4 rounded-2xl text-slate-400 hover:text-white transition-all group ${
            isCollapsed ? 'p-4 bg-white/5' : 'px-6 py-4 bg-white/5'
          }`}
        >
          <LogOut size={18} strokeWidth={1.5} />
          {!isCollapsed && (
            <span className="text-[10px] font-black uppercase tracking-widest transition-colors">Sign Out</span>
          )}
        </Link>
      </div>
    </aside>
  )
}

export default Sidebar
