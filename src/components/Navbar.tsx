import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Dumbbell, Apple, TrendingUp, Zap } from 'lucide-react';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/workouts', icon: Dumbbell, label: 'Workouts' },
  { to: '/nutrition', icon: Apple, label: 'Nutrition' },
  { to: '/progress', icon: TrendingUp, label: 'Progress' },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <>
      {/* Top header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-white">
            <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            FitTrack
          </Link>
          <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-full">Open Source</span>
        </div>
      </header>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-t border-white/5">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex">
            {navItems.map(({ to, icon: Icon, label }) => {
              const active = location.pathname.startsWith(to);
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex-1 flex flex-col items-center py-3 gap-1 transition-colors ${
                    active ? 'text-brand-400' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
