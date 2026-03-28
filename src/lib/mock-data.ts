import { format, subDays } from "date-fns";

export const mockUser = {
  name: "Alex",
  avatar: "",
  streak: 7,
  totalWorkouts: 142,
};

export const mockWorkouts = [
  {
    id: "w1",
    name: "Upper Body Strength",
    date: format(subDays(new Date(), 1), "yyyy-MM-dd"),
    duration: 52,
    completed: true,
    exercises: [
      { name: "Bench Press", sets: [{ reps: 8, weight: 185 }, { reps: 8, weight: 185 }, { reps: 6, weight: 195 }] },
      { name: "Pull-Ups", sets: [{ reps: 10, weight: 0 }, { reps: 8, weight: 0 }, { reps: 7, weight: 0 }] },
      { name: "Shoulder Press", sets: [{ reps: 10, weight: 95 }, { reps: 10, weight: 95 }, { reps: 8, weight: 100 }] },
      { name: "Tricep Dips", sets: [{ reps: 12, weight: 0 }, { reps: 10, weight: 0 }] },
    ],
  },
  {
    id: "w2",
    name: "Leg Day",
    date: format(subDays(new Date(), 3), "yyyy-MM-dd"),
    duration: 65,
    completed: true,
    exercises: [
      { name: "Squats", sets: [{ reps: 8, weight: 225 }, { reps: 8, weight: 225 }, { reps: 6, weight: 245 }] },
      { name: "Romanian Deadlift", sets: [{ reps: 10, weight: 185 }, { reps: 10, weight: 185 }] },
      { name: "Leg Press", sets: [{ reps: 12, weight: 360 }, { reps: 12, weight: 360 }, { reps: 10, weight: 380 }] },
      { name: "Calf Raises", sets: [{ reps: 15, weight: 135 }, { reps: 15, weight: 135 }] },
    ],
  },
  {
    id: "w3",
    name: "Push Day",
    date: format(subDays(new Date(), 5), "yyyy-MM-dd"),
    duration: 48,
    completed: true,
    exercises: [
      { name: "Incline Bench Press", sets: [{ reps: 8, weight: 165 }, { reps: 8, weight: 165 }, { reps: 7, weight: 170 }] },
      { name: "Cable Flyes", sets: [{ reps: 12, weight: 40 }, { reps: 12, weight: 40 }] },
      { name: "Lateral Raises", sets: [{ reps: 15, weight: 20 }, { reps: 15, weight: 20 }, { reps: 12, weight: 25 }] },
    ],
  },
  {
    id: "w4",
    name: "Pull Day",
    date: format(subDays(new Date(), 7), "yyyy-MM-dd"),
    duration: 55,
    completed: true,
    exercises: [
      { name: "Deadlift", sets: [{ reps: 5, weight: 275 }, { reps: 5, weight: 275 }, { reps: 3, weight: 295 }] },
      { name: "Barbell Rows", sets: [{ reps: 8, weight: 155 }, { reps: 8, weight: 155 }, { reps: 8, weight: 165 }] },
      { name: "Face Pulls", sets: [{ reps: 15, weight: 50 }, { reps: 15, weight: 50 }] },
      { name: "Hammer Curls", sets: [{ reps: 12, weight: 35 }, { reps: 12, weight: 35 }, { reps: 10, weight: 40 }] },
    ],
  },
  {
    id: "w5",
    name: "Full Body HIIT",
    date: format(subDays(new Date(), 10), "yyyy-MM-dd"),
    duration: 35,
    completed: true,
    exercises: [
      { name: "Burpees", sets: [{ reps: 15, weight: 0 }, { reps: 15, weight: 0 }, { reps: 12, weight: 0 }] },
      { name: "Box Jumps", sets: [{ reps: 10, weight: 0 }, { reps: 10, weight: 0 }] },
      { name: "Kettlebell Swings", sets: [{ reps: 20, weight: 53 }, { reps: 20, weight: 53 }] },
    ],
  },
];

export const mockTodayWorkout = {
  id: "tw1",
  name: "Back and Biceps",
  date: format(new Date(), "yyyy-MM-dd"),
  duration: 55,
  completed: false,
  exercises: [
    { name: "Lat Pulldown", sets: [{ reps: 10, weight: 130 }, { reps: 10, weight: 130 }, { reps: 8, weight: 140 }] },
    { name: "Seated Cable Row", sets: [{ reps: 10, weight: 120 }, { reps: 10, weight: 120 }, { reps: 8, weight: 130 }] },
    { name: "Dumbbell Curls", sets: [{ reps: 12, weight: 35 }, { reps: 12, weight: 35 }, { reps: 10, weight: 40 }] },
    { name: "Concentration Curls", sets: [{ reps: 12, weight: 25 }, { reps: 12, weight: 25 }] },
    { name: "Straight Arm Pulldown", sets: [{ reps: 15, weight: 60 }, { reps: 15, weight: 60 }] },
  ],
};

export const mockPlans = [
  {
    id: "p1",
    name: "Push / Pull / Legs",
    color: "#6366f1",
    icon: "Dumbbell",
    description: "Classic 6-day PPL split for hypertrophy and strength",
    workouts: ["Push Day A", "Pull Day A", "Leg Day A", "Push Day B", "Pull Day B", "Leg Day B"],
  },
  {
    id: "p2",
    name: "5x5 Strength",
    color: "#10b981",
    icon: "TrendingUp",
    description: "Progressive overload focused on the big three lifts",
    workouts: ["Workout A (Squat/Bench/Row)", "Workout B (Squat/Press/Deadlift)"],
  },
  {
    id: "p3",
    name: "12-Week Cut",
    color: "#f59e0b",
    icon: "Flame",
    description: "High-volume training program paired with caloric deficit",
    workouts: ["Upper Hypertrophy", "Lower Hypertrophy", "Upper Strength", "Lower Strength", "HIIT Cardio"],
  },
  {
    id: "p4",
    name: "Calisthenics Fundamentals",
    color: "#ef4444",
    icon: "Activity",
    description: "Build foundational bodyweight strength and mobility",
    workouts: ["Push Fundamentals", "Pull Fundamentals", "Core and Legs", "Full Body Flow"],
  },
];

export const mockExercises = [
  { id: "e1", name: "Bench Press", muscleGroup: "Chest", equipment: "Barbell", difficulty: 3, description: "Classic compound chest exercise using a barbell on a flat bench.", tags: ["compound", "strength", "chest"] },
  { id: "e2", name: "Squat", muscleGroup: "Legs", equipment: "Barbell", difficulty: 3, description: "Fundamental lower body compound movement targeting quads and glutes.", tags: ["compound", "strength", "legs"] },
  { id: "e3", name: "Deadlift", muscleGroup: "Back", equipment: "Barbell", difficulty: 4, description: "Full-body hinge movement emphasizing posterior chain development.", tags: ["compound", "strength", "back"] },
  { id: "e4", name: "Pull-Ups", muscleGroup: "Back", equipment: "Bodyweight", difficulty: 3, description: "Upper body pulling movement targeting lats and biceps.", tags: ["compound", "bodyweight", "back"] },
  { id: "e5", name: "Shoulder Press", muscleGroup: "Shoulders", equipment: "Dumbbell", difficulty: 2, description: "Overhead pressing movement for shoulder development.", tags: ["compound", "shoulders"] },
  { id: "e6", name: "Dumbbell Curls", muscleGroup: "Arms", equipment: "Dumbbell", difficulty: 1, description: "Isolation exercise targeting the biceps brachii.", tags: ["isolation", "arms", "biceps"] },
  { id: "e7", name: "Tricep Pushdown", muscleGroup: "Arms", equipment: "Cable", difficulty: 1, description: "Cable isolation movement for tricep development.", tags: ["isolation", "arms", "triceps"] },
  { id: "e8", name: "Leg Press", muscleGroup: "Legs", equipment: "Machine", difficulty: 2, description: "Machine-based compound exercise targeting quads and glutes.", tags: ["compound", "legs", "machine"] },
  { id: "e9", name: "Lat Pulldown", muscleGroup: "Back", equipment: "Cable", difficulty: 2, description: "Cable machine exercise mimicking the pull-up movement pattern.", tags: ["compound", "back", "cable"] },
  { id: "e10", name: "Romanian Deadlift", muscleGroup: "Legs", equipment: "Barbell", difficulty: 3, description: "Hip hinge variation targeting hamstrings and glutes.", tags: ["compound", "legs", "hamstrings"] },
  { id: "e11", name: "Incline Bench Press", muscleGroup: "Chest", equipment: "Barbell", difficulty: 3, description: "Upper chest focused pressing movement on an inclined bench.", tags: ["compound", "chest", "upper"] },
  { id: "e12", name: "Cable Flyes", muscleGroup: "Chest", equipment: "Cable", difficulty: 2, description: "Isolation chest movement using cables for constant tension.", tags: ["isolation", "chest", "cable"] },
  { id: "e13", name: "Lateral Raises", muscleGroup: "Shoulders", equipment: "Dumbbell", difficulty: 1, description: "Isolation movement for lateral deltoid development.", tags: ["isolation", "shoulders"] },
  { id: "e14", name: "Face Pulls", muscleGroup: "Shoulders", equipment: "Cable", difficulty: 2, description: "Rear delt and rotator cuff exercise using a rope attachment.", tags: ["isolation", "shoulders", "rear delt"] },
  { id: "e15", name: "Plank", muscleGroup: "Core", equipment: "Bodyweight", difficulty: 1, description: "Isometric core exercise for stability and endurance.", tags: ["isometric", "core", "bodyweight"] },
  { id: "e16", name: "Russian Twists", muscleGroup: "Core", equipment: "Bodyweight", difficulty: 2, description: "Rotational core exercise targeting obliques.", tags: ["core", "obliques", "bodyweight"] },
  { id: "e17", name: "Box Jumps", muscleGroup: "Legs", equipment: "Bodyweight", difficulty: 3, description: "Plyometric exercise developing explosive lower body power.", tags: ["plyometric", "legs", "explosive"] },
  { id: "e18", name: "Kettlebell Swings", muscleGroup: "Back", equipment: "Kettlebell", difficulty: 2, description: "Dynamic hip hinge movement developing posterior chain power.", tags: ["compound", "back", "glutes", "kettlebell"] },
  { id: "e19", name: "Barbell Rows", muscleGroup: "Back", equipment: "Barbell", difficulty: 3, description: "Compound rowing movement building mid and upper back thickness.", tags: ["compound", "back", "barbell"] },
  { id: "e20", name: "Hammer Curls", muscleGroup: "Arms", equipment: "Dumbbell", difficulty: 1, description: "Neutral grip curl targeting biceps and brachialis.", tags: ["isolation", "arms", "biceps"] },
];

export const mockNutritionDays = Array.from({ length: 7 }, (_, i) => {
  const date = format(subDays(new Date(), i), "yyyy-MM-dd");
  const calories = 1800 + Math.floor(Math.random() * 500);
  const protein = 150 + Math.floor(Math.random() * 40);
  const carbs = 200 + Math.floor(Math.random() * 60);
  const fat = 60 + Math.floor(Math.random() * 20);
  return {
    date,
    calories,
    protein,
    carbs,
    fat,
    goal: { calories: 2200, protein: 180, carbs: 250, fat: 70 },
    meals: [
      { name: "Breakfast", calories: Math.floor(calories * 0.25), protein: Math.floor(protein * 0.2), carbs: Math.floor(carbs * 0.3), fat: Math.floor(fat * 0.2) },
      { name: "Lunch", calories: Math.floor(calories * 0.35), protein: Math.floor(protein * 0.35), carbs: Math.floor(carbs * 0.35), fat: Math.floor(fat * 0.3) },
      { name: "Dinner", calories: Math.floor(calories * 0.3), protein: Math.floor(protein * 0.35), carbs: Math.floor(carbs * 0.25), fat: Math.floor(fat * 0.35) },
      { name: "Snacks", calories: Math.floor(calories * 0.1), protein: Math.floor(protein * 0.1), carbs: Math.floor(carbs * 0.1), fat: Math.floor(fat * 0.15) },
    ],
  };
});

export const mockBodyMetrics = Array.from({ length: 30 }, (_, i) => {
  const progress = i / 29;
  const weight = 185 - progress * 5 + (Math.random() - 0.5) * 1.5;
  const bodyFat = 22 - progress * 2 + (Math.random() - 0.5) * 0.5;
  return {
    date: format(subDays(new Date(), 29 - i), "yyyy-MM-dd"),
    weight: parseFloat(weight.toFixed(1)),
    bodyFat: parseFloat(bodyFat.toFixed(1)),
    chest: parseFloat((42 - progress * 1 + (Math.random() - 0.5) * 0.5).toFixed(1)),
    waist: parseFloat((34 - progress * 2 + (Math.random() - 0.5) * 0.5).toFixed(1)),
    hips: parseFloat((40 - progress * 1 + (Math.random() - 0.5) * 0.5).toFixed(1)),
    bicep: parseFloat((15.5 + progress * 0.5 + (Math.random() - 0.5) * 0.2).toFixed(1)),
  };
});

export const mockCalendarEvents = [
  { id: "ce1", date: format(new Date(), "yyyy-MM-dd"), workoutName: "Back and Biceps", completed: false, type: "strength" },
  { id: "ce2", date: format(subDays(new Date(), 1), "yyyy-MM-dd"), workoutName: "Upper Body Strength", completed: true, type: "strength" },
  { id: "ce3", date: format(subDays(new Date(), 3), "yyyy-MM-dd"), workoutName: "Leg Day", completed: true, type: "strength" },
  { id: "ce4", date: format(subDays(new Date(), 5), "yyyy-MM-dd"), workoutName: "Push Day", completed: true, type: "strength" },
  { id: "ce5", date: format(subDays(new Date(), 7), "yyyy-MM-dd"), workoutName: "Pull Day", completed: true, type: "strength" },
  { id: "ce6", date: format(subDays(new Date(), 10), "yyyy-MM-dd"), workoutName: "Full Body HIIT", completed: true, type: "cardio" },
  { id: "ce7", date: format(subDays(new Date(), 12), "yyyy-MM-dd"), workoutName: "Leg Day", completed: true, type: "strength" },
  { id: "ce8", date: format(subDays(new Date(), 14), "yyyy-MM-dd"), workoutName: "Push Day", completed: true, type: "strength" },
  { id: "ce9", date: format(subDays(new Date(), 17), "yyyy-MM-dd"), workoutName: "Pull Day", completed: true, type: "strength" },
  { id: "ce10", date: format(subDays(new Date(), 19), "yyyy-MM-dd"), workoutName: "HIIT Cardio", completed: true, type: "cardio" },
  { id: "ce11", date: format(subDays(new Date(), 2), "yyyy-MM-dd"), workoutName: "Rest Day", completed: true, type: "rest" },
  { id: "ce12", date: format(subDays(new Date(), 4), "yyyy-MM-dd"), workoutName: "Rest Day", completed: true, type: "rest" },
  { id: "ce13", date: format(subDays(new Date(), 6), "yyyy-MM-dd"), workoutName: "Rest Day", completed: true, type: "rest" },
  { id: "ce14", date: format(subDays(new Date(), 8), "yyyy-MM-dd"), workoutName: "Mobility Work", completed: true, type: "mobility" },
  { id: "ce15", date: format(subDays(new Date(), 9), "yyyy-MM-dd"), workoutName: "Rest Day", completed: true, type: "rest" },
];

export const weeklyCalories: { day: string; calories: number; goal: number }[] = [
  { day: format(subDays(new Date(), 6), "EEE"), calories: 2050, goal: 2200 },
  { day: format(subDays(new Date(), 5), "EEE"), calories: 1920, goal: 2200 },
  { day: format(subDays(new Date(), 4), "EEE"), calories: 2180, goal: 2200 },
  { day: format(subDays(new Date(), 3), "EEE"), calories: 1850, goal: 2200 },
  { day: format(subDays(new Date(), 2), "EEE"), calories: 2310, goal: 2200 },
  { day: format(subDays(new Date(), 1), "EEE"), calories: 2090, goal: 2200 },
  { day: format(new Date(), "EEE"), calories: 1840, goal: 2200 },
];
