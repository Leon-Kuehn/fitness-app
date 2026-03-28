import { Dumbbell, Apple, TrendingUp, Flame, Target, Calendar, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const weightData = [
  { date: 'Jan', weight: 85 },
  { date: 'Feb', weight: 84.2 },
  { date: 'Mar', weight: 83.5 },
  { date: 'Apr', weight: 82.8 },
  { date: 'May', weight: 82.1 },
  { date: 'Jun', weight: 81.5 },
  { date: 'Jul', weight: 80.9 },
]

const recentWorkouts = [
  { name: 'Push Day A', exercises: 6, duration: '52 min', date: 'Today' },
  { name: 'Leg Day', exercises: 7, duration: '65 min', date: 'Yesterday' },
  { name: 'Pull Day B', exercises: 6, duration: '48 min', date: '2d ago' },
]

const stats = [
  { label: 'Workouts this week', value: '4', icon: Dumbbell, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { label: 'Calories today', value: '2,340', icon: Apple, color: 'text-brand-400', bg: 'bg-brand-400/10' },
  { label: 'Active streak', value: '12 days', icon: Flame, color: 'text-orange-400', bg: 'bg-orange-400/10' },
  { label: 'Goal progress', value: '78%', icon: Target, color: 'text-purple-400', bg: 'bg-purple-400/10' },
]

export function DashboardPage() {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="page-header">Dashboard</h1>
        <p className="page-subheader">Welcome back! Here is your fitness overview.</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="stat-card">
            <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div className="text-2xl font-bold text-white mt-2">{value}</div>
            <div className="text-sm text-gray-500">{label}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-title mb-0">Weight Progress</h2>
            <Link to="/progress" className="text-sm text-brand-400 hover:text-brand-300 flex items-center gap-1">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={weightData}>
              <defs>
                <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis domain={['auto', 'auto']} tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} width={35} />
              <Tooltip contentStyle={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '8px', color: '#f9fafb' }} />
              <Area type="monotone" dataKey="weight" stroke="#10b981" strokeWidth={2} fill="url(#weightGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title mb-0">Recent Workouts</h2>
          </div>
          <div className="space-y-3">
            {recentWorkouts.map((w) => (
              <div key={w.name} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
                <div className="w-9 h-9 bg-blue-400/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Dumbbell className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-white text-sm truncate">{w.name}</div>
                  <div className="text-xs text-gray-500">{w.exercises} exercises - {w.duration}</div>
                </div>
                <div className="text-xs text-gray-500 flex-shrink-0">{w.date}</div>
              </div>
            ))}
          </div>
          <Link to="/workouts" className="btn-secondary w-full text-sm mt-4 flex items-center justify-center gap-2">
            <Calendar className="w-4 h-4" />
            Log Workout
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        {[
          { to: '/workouts', icon: Dumbbell, label: 'Log Workout', desc: 'Track your training', color: 'text-blue-400', bg: 'bg-blue-400/10' },
          { to: '/nutrition', icon: Apple, label: 'Log Food', desc: 'Track calories and macros', color: 'text-brand-400', bg: 'bg-brand-400/10' },
          { to: '/progress', icon: TrendingUp, label: 'View Progress', desc: 'Charts and measurements', color: 'text-purple-400', bg: 'bg-purple-400/10' },
        ].map(({ to, icon: Icon, label, desc, color, bg }) => (
          <Link key={to} to={to} className="card-hover flex items-center gap-4">
            <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div>
              <div className="font-semibold text-white text-sm">{label}</div>
              <div className="text-xs text-gray-500">{desc}</div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-600 ml-auto" />
          </Link>
        ))}
      </div>
    </div>
  )
}
