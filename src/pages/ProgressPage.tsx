import { TrendingUp, Award, Scale, Ruler, Calendar } from 'lucide-react';

const measurements = [
  { label: 'Weight', value: '78.5', unit: 'kg', change: '-1.2', positive: true },
  { label: 'Body Fat', value: '14.2', unit: '%', change: '-0.8', positive: true },
  { label: 'Muscle Mass', value: '65.1', unit: 'kg', change: '+0.5', positive: true },
  { label: 'BMI', value: '23.4', unit: '', change: '-0.4', positive: true },
];

const achievements = [
  { id: 1, title: '7-Day Streak', desc: 'Worked out 7 days in a row', icon: '🔥', earned: true },
  { id: 2, title: 'First 5K', desc: 'Completed your first 5K run', icon: '🏃', earned: true },
  { id: 3, title: 'Strength Master', desc: 'Lifted 100kg on bench press', icon: '💪', earned: true },
  { id: 4, title: '30-Day Challenge', desc: 'Complete 30 workouts in a month', icon: '🏆', earned: false },
  { id: 5, title: 'Nutrition Pro', desc: 'Hit macros perfectly for 7 days', icon: '🥗', earned: false },
  { id: 6, title: 'Century Club', desc: 'Complete 100 total workouts', icon: '💯', earned: false },
];

const weeklyData = [
  { day: 'Mon', workouts: 1, calories: 2100 },
  { day: 'Tue', workouts: 1, calories: 1950 },
  { day: 'Wed', workouts: 0, calories: 2200 },
  { day: 'Thu', workouts: 1, calories: 2050 },
  { day: 'Fri', workouts: 1, calories: 1900 },
  { day: 'Sat', workouts: 1, calories: 2300 },
  { day: 'Sun', workouts: 0, calories: 2150 },
];

const maxCalories = Math.max(...weeklyData.map((d) => d.calories));

export default function ProgressPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Progress</h1>
        <p className="text-gray-400 text-sm mt-1">Charts, measurements and achievements</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {measurements.map((m) => (
          <div key={m.label} className="card">
            <div className="flex items-center gap-1.5 mb-2">
              {m.label === 'Weight' ? <Scale className="w-3.5 h-3.5 text-brand-400" /> : <Ruler className="w-3.5 h-3.5 text-brand-400" />}
              <span className="text-xs text-gray-400">{m.label}</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {m.value}
              <span className="text-sm text-gray-500 font-normal ml-1">{m.unit}</span>
            </div>
            <div className={`text-xs mt-1 font-medium ${m.positive ? 'text-green-400' : 'text-red-400'}`}>
              {m.change} this month
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-brand-400" />
            Weekly Activity
          </h2>
          <span className="text-xs text-gray-500">This week</span>
        </div>
        <div className="flex items-end gap-2 h-32">
          {weeklyData.map((d) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex flex-col justify-end" style={{ height: '100px' }}>
                <div
                  className={`w-full rounded-t-md transition-all ${
                    d.workouts > 0 ? 'bg-brand-500/60' : 'bg-white/5'
                  }`}
                  style={{ height: `${(d.calories / maxCalories) * 100}px` }}
                />
              </div>
              <span className="text-xs text-gray-500">{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-4 h-4 text-yellow-400" />
          <h2 className="font-semibold text-white">Achievements</h2>
          <span className="text-xs text-gray-500 ml-auto">{achievements.filter((a) => a.earned).length}/{achievements.length} earned</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`card flex items-center gap-3 ${
                !achievement.earned && 'opacity-40'
              }`}
            >
              <div className="text-2xl">{achievement.icon}</div>
              <div className="flex-1">
                <div className="font-medium text-white text-sm">{achievement.title}</div>
                <div className="text-xs text-gray-500">{achievement.desc}</div>
              </div>
              {achievement.earned && (
                <TrendingUp className="w-4 h-4 text-green-400 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
