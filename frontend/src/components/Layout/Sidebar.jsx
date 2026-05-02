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
          isCollapsed ? 'justify-center px-0 py-3' : 'justify-between px-5 py-3'
        } rounded-xl ${
          isActive 
            ? 'bg-[#F9F6ED] text-[#D4AF37]' 
            : 'text-slate-500 hover:text-[#D4AF37] hover:bg-slate-50'
        }`}
      >
        <div className={`flex items-center gap-4 ${isCollapsed ? 'justify-center' : ''}`}>
          <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
          {!isCollapsed && (
            <span className={`text-sm font-medium ${isActive ? 'text-[#334155]' : 'text-slate-600 group-hover:text-[#334155]'}`}>
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
          <div className="absolute left-full ml-4 px-3 py-2 bg-white text-[#334155] text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-md z-[100] whitespace-nowrap border border-slate-100">
            {item.title}
          </div>
        )}
      </Link>

      {!isCollapsed && hasSubItems && isExpanded && (
        <div className="ml-10 mt-1 mb-2 flex flex-col gap-1 border-l-2 border-slate-100 pl-4">
          {item.subItems.map((sub) => {
            const isSubActive = location.pathname === sub.path;
            return (
              <Link
                key={sub.path}
                to={sub.path}
                onClick={onClose}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${
                  isSubActive 
                    ? 'text-[#D4AF37] bg-[#F9F6ED]' 
                    : 'text-slate-500 hover:text-[#334155] hover:bg-slate-50'
                }`}
              >
                {isSubActive && <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>}
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
    <aside className="h-full w-full bg-white flex flex-col border-r border-slate-200 transition-all duration-500">
      
      {/* Header / Logo */}
      <div className={`mb-6 flex items-center ${isCollapsed ? 'justify-center p-6' : 'justify-between p-8'}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#e6c86a] rounded-xl flex items-center justify-center shrink-0 shadow-sm">
            <Hotel size={20} className="text-white" strokeWidth={2} />
          </div>
          {!isCollapsed && (
            <span className="text-xl font-bold text-[#334155] tracking-wide">Heritage</span>
          )}
        </div>
      </div>

      {/* Collapse Toggle Button (Desktop Only) */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden lg:flex absolute top-10 -right-3 w-6 h-6 bg-white rounded-full items-center justify-center shadow-md border border-slate-200 hover:scale-110 transition-transform z-[60] text-slate-400 hover:text-[#D4AF37]"
      >
        {isCollapsed ? <ChevronRight size={14} strokeWidth={2.5} /> : <ChevronLeft size={14} strokeWidth={2.5} />}
      </button>

      <nav className={`flex-1 overflow-y-auto no-scrollbar ${isCollapsed ? 'px-3' : 'px-6'}`}>
        {!isCollapsed && (
          <p className="px-5 mb-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Management</p>
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
      <div className={`${isCollapsed ? 'p-4 flex justify-center' : 'p-6'}`}>
        <Link 
          to="/login" 
          onClick={onClose}
          className={`flex items-center gap-3 rounded-xl text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all group ${
            isCollapsed ? 'p-3 justify-center' : 'px-5 py-3'
          }`}
        >
          <LogOut size={20} strokeWidth={1.5} />
          {!isCollapsed && (
            <span className="text-sm font-medium transition-colors">Sign Out</span>
          )}
        </Link>
      </div>
    </aside>
  )
}

export default Sidebar
