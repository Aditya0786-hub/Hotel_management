import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const location = useLocation()

  const getTitle = (path) => {
    const parts = path.split('/').filter(Boolean)
    if (parts.length <= 1) return 'DASHBOARD'
    const lastPart = parts[parts.length - 1]
    return lastPart.toUpperCase().replace('-', ' ')
  }

  return (
    <div className="min-h-screen bg-[#f9fafb] font-sans text-[#2d3436]">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-[#2d3436]/10 z-[60] lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-[70] transition-all duration-500 lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } ${isCollapsed ? 'w-24' : 'w-80'}`}>
        <Sidebar 
          isCollapsed={isCollapsed} 
          setIsCollapsed={setIsCollapsed} 
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main Content Area */}
      <div className={`flex flex-col min-h-screen transition-all duration-500 ${
        isCollapsed ? 'lg:ml-24' : 'lg:ml-80'
      }`}>
        <Header 
          title={getTitle(location.pathname)} 
          onMenuClick={() => setSidebarOpen(true)} 
        />
        <main className="flex-1 p-6 md:p-10 lg:p-16 bg-[#f9fafb]">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  )
}

export default DashboardLayout
