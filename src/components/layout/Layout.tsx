'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Dumbbell,
  Apple,
  TrendingUp,
  Menu,
  X,
  Zap,
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/workout', icon: Dumbbell, label: 'Workouts' },
  { to: '/nutrition', icon: Apple, label: 'Nutrition' },
  { to: '/metrics', icon: TrendingUp, label: 'Progress' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-gray-950 overflow-hidden">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-gray-900 border-r border-gray-800">
        <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-800">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">FitFlow</span>
          <span className="ml-auto text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">Free</span>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => {
            const isActive = pathname === to;
            return (
              <Link
                key={to}
                href={to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                    : 'text-gray-400 hover:text-gray-100 hover:bg-gray-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            );
          })}
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
          <div className="w-7 h-7 bg-indigo-500 rounded-lg flex items-center justify-center">
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
      {/* Main Content */}
      <main className="flex-1 overflow-auto lg:pt-0 pt-14">
        <div className="max-w-5xl mx-auto px-4 py-6 lg:px-6">
          {children}
        </div>
      </main>
    </div>
  );
}
