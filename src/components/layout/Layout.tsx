import { Outlet, NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Dumbbell,
  Apple,
  TrendingUp,
  Menu,
  X,
  Zap,
} from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/workouts', icon: Dumbbell, label: 'Workouts' },
  { to: '/nutrition', icon: Apple, label: 'Nutrition' },
  { to: '/progress', icon: TrendingUp, label: 'Progress' },
]

export function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="flex h-screen bg-gray-950 overflow-hidden">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-gray-900 border-r border-gray-800">
        <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-800">
          <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">FitFlow</span>
          <span className="ml-auto badge badge-green">Free</span>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20'
                    : 'text-gray-400 hover:text-gray-100 hover:bg-gray-800'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="px-4 py-4 border-t border-gray-800">
          <p className="text-xs text-gray-500 text-center">
            FitFlow v0.1.0 &bull; Open Source
          </p>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-brand-500 rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white">FitFlow</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="w-64 h-full bg-gray-900 border-r border-gray-800 pt-16"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="px-3 py-4 space-y-1">
              {navItems.map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-brand-500/10 text-brand-400'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto lg:p-8 p-4 pt-20 lg:pt-8">
        <Outlet />
      </main>
    </div>
  )
}
