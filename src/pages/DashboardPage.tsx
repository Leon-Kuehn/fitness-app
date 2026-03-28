import Link from 'next/link'
import { Dumbbell, Apple, TrendingUp, Flame, Target, Calendar, ChevronRight } from 'lucide-react'
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
  { label: 'Calories today', value: '2,340', icon: Apple, color: 'text-green-400', bg: 'bg-green-400/10' },
  { label: 'Active streak', value: '12 days', icon: Flame, color: 'text-orange-400', bg: 'bg-orange-400/10' },
  { label: 'Goal progress', value: '78%', icon: Target, color: 'text-purple-400', bg: 'bg-purple-400/10' },
]

export function DashboardPage() {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Track your fitness journey</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center mb-3`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div className="text-2xl font-bold text-white">{value}</div>
            <div className="text-sm text-gray-400 mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Weight Chart */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Weight Progress</h2>
          <TrendingUp className="w-5 h-5 text-indigo-400" />
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={weightData}>
            <defs>
              <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: 8 }} labelStyle={{ color: '#f9fafb' }} />
            <Area type="monotone" dataKey="weight" stroke="#6366f1" fill="url(#weightGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Workouts */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Recent Workouts</h2>
          <Link href="/workouts" className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="space-y-3">
          {recentWorkouts.map((workout) => (
            <div key={workout.name} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-indigo-500/10 rounded-lg flex items-center justify-center">
                  <Dumbbell className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{workout.name}</div>
                  <div className="text-xs text-gray-400">{workout.exercises} exercises · {workout.duration}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Calendar className="w-3.5 h-3.5" />
                  {workout.date}
                </div>
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-4">
        <Link href="/workouts" className="bg-gray-900 border border-gray-800 hover:border-indigo-500/50 rounded-xl p-4 text-center transition-colors">
          <Dumbbell className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
          <div className="text-sm font-medium text-white">Workouts</div>
        </Link>
        <Link href="/nutrition" className="bg-gray-900 border border-gray-800 hover:border-green-500/50 rounded-xl p-4 text-center transition-colors">
          <Apple className="w-6 h-6 text-green-400 mx-auto mb-2" />
          <div className="text-sm font-medium text-white">Nutrition</div>
        </Link>
        <Link href="/progress" className="bg-gray-900 border border-gray-800 hover:border-purple-500/50 rounded-xl p-4 text-center transition-colors">
          <TrendingUp className="w-6 h-6 text-purple-400 mx-auto mb-2" />
          <div className="text-sm font-medium text-white">Progress</div>
        </Link>
      </div>
    </div>
  )
}
