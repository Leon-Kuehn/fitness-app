import { useState } from 'react';
import { Apple, Plus, Target, Droplets, Search } from 'lucide-react';

const macroData = [
  { label: 'Calories', current: 1840, goal: 2200, unit: 'kcal', color: 'bg-brand-500' },
  { label: 'Protein', current: 142, goal: 180, unit: 'g', color: 'bg-blue-500' },
  { label: 'Carbs', current: 195, goal: 250, unit: 'g', color: 'bg-yellow-500' },
  { label: 'Fat', current: 58, goal: 70, unit: 'g', color: 'bg-purple-500' },
];

const meals = [
  {
    id: 1,
    name: 'Breakfast',
    time: '08:00',
    calories: 420,
    foods: ['Oatmeal with berries', 'Greek yogurt', 'Coffee'],
  },
  {
    id: 2,
    name: 'Lunch',
    time: '12:30',
    calories: 680,
    foods: ['Grilled chicken breast', 'Brown rice', 'Mixed vegetables'],
  },
  {
    id: 3,
    name: 'Snack',
    time: '15:30',
    calories: 200,
    foods: ['Protein shake', 'Banana'],
  },
  {
    id: 4,
    name: 'Dinner',
    time: '19:00',
    calories: 540,
    foods: ['Salmon fillet', 'Sweet potato', 'Broccoli'],
  },
];

export default function NutritionPage() {
  const [water, setWater] = useState(6);
  const waterGoal = 8;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Nutrition</h1>
          <p className="text-gray-400 text-sm mt-1">Track your calories and macros</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Log Food
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {macroData.map((macro) => (
          <div key={macro.label} className="card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-400">{macro.label}</span>
              <Target className="w-3 h-3 text-gray-500" />
            </div>
            <div className="text-xl font-bold text-white mb-1">
              {macro.current}
              <span className="text-xs text-gray-500 font-normal ml-1">{macro.unit}</span>
            </div>
            <div className="text-xs text-gray-500 mb-2">of {macro.goal}{macro.unit}</div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div
                className={`h-full ${macro.color} rounded-full`}
                style={{ width: `${Math.min((macro.current / macro.goal) * 100, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-blue-400" />
            <span className="font-medium text-white">Water Intake</span>
          </div>
          <span className="text-sm text-gray-400">{water} / {waterGoal} glasses</span>
        </div>
        <div className="flex gap-2">
          {Array.from({ length: waterGoal }).map((_, i) => (
            <button
              key={i}
              onClick={() => setWater(i + 1)}
              className={`flex-1 h-10 rounded-lg transition-colors ${
                i < water ? 'bg-blue-500/30 border border-blue-500/50' : 'bg-white/5 border border-white/10'
              }`}
            >
              <Droplets className={`w-4 h-4 mx-auto ${ i < water ? 'text-blue-400' : 'text-gray-600'}`} />
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-white">Today's Meals</h2>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search food..."
              className="bg-surface border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-400 w-40"
            />
          </div>
        </div>
        <div className="space-y-3">
          {meals.map((meal) => (
            <div key={meal.id} className="card">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Apple className="w-4 h-4 text-brand-400" />
                  <span className="font-medium text-white">{meal.name}</span>
                  <span className="text-xs text-gray-500">{meal.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">{meal.calories} kcal</span>
                  <button className="w-6 h-6 rounded-full bg-brand-500/10 flex items-center justify-center hover:bg-brand-500/20 transition-colors">
                    <Plus className="w-3 h-3 text-brand-400" />
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {meal.foods.map((food) => (
                  <span key={food} className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400">
                    {food}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
