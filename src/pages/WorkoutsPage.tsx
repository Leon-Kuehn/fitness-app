import { useState } from 'react';
import { Plus, Search, Filter, Dumbbell, Clock, Flame, ChevronRight, Play } from 'lucide-react';

const workouts = [
  {
    id: 1,
    name: 'Upper Body Strength',
    date: '2024-01-15',
    duration: 62,
    calories: 380,
    exercises: 8,
    category: 'Strength',
    completed: true,
  },
  {
    id: 2,
    name: 'HIIT Cardio Blast',
    date: '2024-01-13',
    duration: 35,
    calories: 420,
    exercises: 6,
    category: 'Cardio',
    completed: true,
  },
  {
    id: 3,
    name: 'Leg Day Power',
    date: '2024-01-11',
    duration: 75,
    calories: 450,
    exercises: 9,
    category: 'Strength',
    completed: true,
  },
  {
    id: 4,
    name: 'Core & Flexibility',
    date: '2024-01-09',
    duration: 40,
    calories: 220,
    exercises: 10,
    category: 'Flexibility',
    completed: true,
  },
];

const categories = ['All', 'Strength', 'Cardio', 'Flexibility', 'Sports'];

export default function WorkoutsPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = workouts.filter((w) => {
    const matchSearch = w.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'All' || w.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Workouts</h1>
          <p className="text-gray-400 text-sm mt-1">Track and log your training sessions</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Log Workout
        </button>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search workouts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-brand-400"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-surface border border-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat
                ? 'bg-brand-500 text-white'
                : 'bg-surface border border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((workout) => (
          <div key={workout.id} className="card card-hover flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center flex-shrink-0">
              <Dumbbell className="w-6 h-6 text-brand-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white truncate">{workout.name}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-400 flex-shrink-0">
                  {workout.category}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{workout.date}</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock className="w-3 h-3" /> {workout.duration} min
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Flame className="w-3 h-3" /> {workout.calories} kcal
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Dumbbell className="w-3 h-3" /> {workout.exercises} exercises
                </span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-600 flex-shrink-0" />
          </div>
        ))}
      </div>

      <div className="card border-dashed border-white/10 flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-brand-500/10 flex items-center justify-center mb-4">
          <Play className="w-8 h-8 text-brand-400" />
        </div>
        <h3 className="font-semibold text-white mb-2">Start a New Workout</h3>
        <p className="text-gray-500 text-sm mb-4">Choose from templates or create your own</p>
        <button className="btn-primary">Browse Templates</button>
      </div>
    </div>
  );
}
