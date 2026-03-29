import { format, subDays } from "date-fns";

// ─── Gym Platform Types ────────────────────────────────────────────────────

export interface GymEquipment {
  name: string;
  category: "Cardio" | "Strength" | "Free Weights" | "Functional";
  count: number;
  available: number;
}

export interface GymClass {
  id: string;
  name: string;
  instructor: string;
  day: string;
  time: string;
  duration: number;
  spots: number;
  enrolled: number;
}

export interface PricingTier {
  name: string;
  price: number;
  period: string;
  features: string[];
}

export interface GymStats {
  checkInsToday: number;
  peakHour: string;
  avgDailyVisits: number;
  popularDay: string;
}

export interface CheckInDay {
  day: string;
  count: number;
}

export interface HourlyTraffic {
  hour: string;
  count: number;
}

export interface Gym {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
  address: string;
  phone: string;
  website: string;
  openingHours: Record<string, string>;
  memberCount: number;
  hansefit: boolean;
  equipment: GymEquipment[];
  classes: GymClass[];
  pricing: PricingTier[];
  stats: GymStats;
  checkInHistory: CheckInDay[];
  hourlyTraffic: HourlyTraffic[];
}

export interface GymMember {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  plan: string;
  checkIns: number;
  lastVisit: string;
  hansefit: boolean;
}

// ─── Gym Data ─────────────────────────────────────────────────────────────

export const mockGyms: Gym[] = [
  {
    id: "gym1",
    name: "FitZone Premium",
    slug: "fitzone-premium",
    logo: "",
    description:
      "FitZone Premium is Freiburg's premier fitness destination, offering state-of-the-art equipment, expert personal trainers, and a welcoming community. Whether you're a beginner or a seasoned athlete, we have everything you need to reach your fitness goals.",
    address: "Kaiserstuhlstraße 12, 79110 Freiburg im Breisgau",
    phone: "+49 761 123 4567",
    website: "https://fitzpremium.de",
    openingHours: {
      Monday: "06:00 – 22:00",
      Tuesday: "06:00 – 22:00",
      Wednesday: "06:00 – 22:00",
      Thursday: "06:00 – 22:00",
      Friday: "06:00 – 21:00",
      Saturday: "08:00 – 20:00",
      Sunday: "09:00 – 18:00",
    },
    memberCount: 1240,
    hansefit: true,
    equipment: [
      { name: "Treadmill", category: "Cardio", count: 12, available: 8 },
      { name: "Elliptical Trainer", category: "Cardio", count: 8, available: 5 },
      { name: "Rowing Machine", category: "Cardio", count: 6, available: 4 },
      { name: "Stationary Bike", category: "Cardio", count: 10, available: 7 },
      { name: "Cable Machine", category: "Strength", count: 6, available: 4 },
      { name: "Smith Machine", category: "Strength", count: 3, available: 2 },
      { name: "Leg Press", category: "Strength", count: 4, available: 3 },
      { name: "Lat Pulldown", category: "Strength", count: 4, available: 3 },
      { name: "Barbell Rack", category: "Free Weights", count: 8, available: 5 },
      { name: "Dumbbell Set (5–50 kg)", category: "Free Weights", count: 1, available: 1 },
      { name: "Kettlebells", category: "Free Weights", count: 15, available: 12 },
      { name: "Battle Ropes", category: "Functional", count: 2, available: 2 },
      { name: "TRX Suspension", category: "Functional", count: 6, available: 4 },
      { name: "Plyo Boxes", category: "Functional", count: 8, available: 6 },
    ],
    classes: [
      { id: "c1", name: "HIIT Blast", instructor: "Laura Müller", day: "Monday", time: "07:00", duration: 45, spots: 20, enrolled: 18 },
      { id: "c2", name: "Yoga Flow", instructor: "Stefan Koch", day: "Monday", time: "18:00", duration: 60, spots: 15, enrolled: 10 },
      { id: "c3", name: "Spin Class", instructor: "Anna Bauer", day: "Tuesday", time: "06:30", duration: 50, spots: 18, enrolled: 18 },
      { id: "c4", name: "Power Lifting", instructor: "Markus Weber", day: "Wednesday", time: "17:00", duration: 60, spots: 12, enrolled: 9 },
      { id: "c5", name: "Pilates", instructor: "Julia Schmidt", day: "Thursday", time: "09:00", duration: 55, spots: 16, enrolled: 12 },
      { id: "c6", name: "Crossfit WOD", instructor: "Thomas Braun", day: "Friday", time: "07:00", duration: 60, spots: 14, enrolled: 11 },
      { id: "c7", name: "Zumba", instructor: "Maria Garcia", day: "Saturday", time: "10:00", duration: 60, spots: 25, enrolled: 20 },
      { id: "c8", name: "Stretching & Mobility", instructor: "Stefan Koch", day: "Sunday", time: "11:00", duration: 45, spots: 20, enrolled: 8 },
    ],
    pricing: [
      {
        name: "Basic",
        price: 29.9,
        period: "month",
        features: [
          "Unlimited gym access",
          "Locker room & showers",
          "2 group classes / month",
          "Fitness assessment",
        ],
      },
      {
        name: "Premium",
        price: 44.9,
        period: "month",
        features: [
          "Everything in Basic",
          "Unlimited group classes",
          "1 PT session / month",
          "Sauna & wellness area",
          "Guest pass (1/month)",
        ],
      },
      {
        name: "Elite",
        price: 59.9,
        period: "month",
        features: [
          "Everything in Premium",
          "3 PT sessions / month",
          "Nutrition coaching",
          "Priority class booking",
          "Towel service",
          "Guest passes (3/month)",
        ],
      },
    ],
    stats: {
      checkInsToday: 87,
      peakHour: "18:00",
      avgDailyVisits: 210,
      popularDay: "Monday",
    },
    checkInHistory: [
      { day: format(subDays(new Date(), 6), "EEE"), count: 195 },
      { day: format(subDays(new Date(), 5), "EEE"), count: 220 },
      { day: format(subDays(new Date(), 4), "EEE"), count: 180 },
      { day: format(subDays(new Date(), 3), "EEE"), count: 240 },
      { day: format(subDays(new Date(), 2), "EEE"), count: 205 },
      { day: format(subDays(new Date(), 1), "EEE"), count: 230 },
      { day: format(new Date(), "EEE"), count: 87 },
    ],
    hourlyTraffic: [
      { hour: "6am", count: 35 },
      { hour: "7am", count: 65 },
      { hour: "8am", count: 80 },
      { hour: "9am", count: 60 },
      { hour: "10am", count: 45 },
      { hour: "11am", count: 50 },
      { hour: "12pm", count: 70 },
      { hour: "1pm", count: 55 },
      { hour: "2pm", count: 40 },
      { hour: "3pm", count: 50 },
      { hour: "4pm", count: 75 },
      { hour: "5pm", count: 110 },
      { hour: "6pm", count: 130 },
      { hour: "7pm", count: 100 },
      { hour: "8pm", count: 65 },
      { hour: "9pm", count: 30 },
      { hour: "10pm", count: 10 },
    ],
  },
];

export const mockGymMembers: GymMember[] = [
  { id: "m1", name: "Max Mustermann", email: "max@example.com", joinDate: "2024-01-10", plan: "Premium", checkIns: 48, lastVisit: format(subDays(new Date(), 1), "yyyy-MM-dd"), hansefit: false },
  { id: "m2", name: "Lisa Wagner", email: "lisa@example.com", joinDate: "2024-02-14", plan: "Basic", checkIns: 22, lastVisit: format(subDays(new Date(), 3), "yyyy-MM-dd"), hansefit: true },
  { id: "m3", name: "Tom Schneider", email: "tom@example.com", joinDate: "2023-11-05", plan: "Elite", checkIns: 90, lastVisit: format(new Date(), "yyyy-MM-dd"), hansefit: false },
  { id: "m4", name: "Sarah Fischer", email: "sarah@example.com", joinDate: "2024-03-20", plan: "Basic", checkIns: 15, lastVisit: format(subDays(new Date(), 5), "yyyy-MM-dd"), hansefit: true },
  { id: "m5", name: "Jonas Weber", email: "jonas@example.com", joinDate: "2023-09-12", plan: "Premium", checkIns: 120, lastVisit: format(subDays(new Date(), 2), "yyyy-MM-dd"), hansefit: false },
  { id: "m6", name: "Emma Braun", email: "emma@example.com", joinDate: "2024-01-28", plan: "Elite", checkIns: 60, lastVisit: format(new Date(), "yyyy-MM-dd"), hansefit: true },
  { id: "m7", name: "Liam Hofmann", email: "liam@example.com", joinDate: "2024-04-01", plan: "Basic", checkIns: 8, lastVisit: format(subDays(new Date(), 7), "yyyy-MM-dd"), hansefit: false },
  { id: "m8", name: "Mia Richter", email: "mia@example.com", joinDate: "2023-12-15", plan: "Premium", checkIns: 75, lastVisit: format(subDays(new Date(), 1), "yyyy-MM-dd"), hansefit: true },
  { id: "m9", name: "Noah Klein", email: "noah@example.com", joinDate: "2024-02-28", plan: "Basic", checkIns: 30, lastVisit: format(subDays(new Date(), 4), "yyyy-MM-dd"), hansefit: false },
  { id: "m10", name: "Olivia Wolf", email: "olivia@example.com", joinDate: "2023-10-08", plan: "Premium", checkIns: 105, lastVisit: format(new Date(), "yyyy-MM-dd"), hansefit: true },
  { id: "m11", name: "Ben Schmitt", email: "ben@example.com", joinDate: "2024-05-10", plan: "Basic", checkIns: 5, lastVisit: format(subDays(new Date(), 10), "yyyy-MM-dd"), hansefit: false },
  { id: "m12", name: "Sophia Zimmermann", email: "sophia@example.com", joinDate: "2023-08-22", plan: "Elite", checkIns: 140, lastVisit: format(subDays(new Date(), 1), "yyyy-MM-dd"), hansefit: false },
  { id: "m13", name: "Elias Schwarz", email: "elias@example.com", joinDate: "2024-03-05", plan: "Premium", checkIns: 42, lastVisit: format(subDays(new Date(), 2), "yyyy-MM-dd"), hansefit: true },
  { id: "m14", name: "Hanna Meyer", email: "hanna@example.com", joinDate: "2024-01-18", plan: "Basic", checkIns: 20, lastVisit: format(subDays(new Date(), 6), "yyyy-MM-dd"), hansefit: true },
  { id: "m15", name: "Luis Schulz", email: "luis@example.com", joinDate: "2023-07-30", plan: "Elite", checkIns: 180, lastVisit: format(new Date(), "yyyy-MM-dd"), hansefit: false },
  { id: "m16", name: "Lena Krause", email: "lena@example.com", joinDate: "2024-04-15", plan: "Basic", checkIns: 12, lastVisit: format(subDays(new Date(), 3), "yyyy-MM-dd"), hansefit: false },
  { id: "m17", name: "Finn Becker", email: "finn@example.com", joinDate: "2024-02-02", plan: "Premium", checkIns: 55, lastVisit: format(subDays(new Date(), 1), "yyyy-MM-dd"), hansefit: true },
  { id: "m18", name: "Clara Hoffmann", email: "clara@example.com", joinDate: "2023-11-20", plan: "Basic", checkIns: 38, lastVisit: format(subDays(new Date(), 4), "yyyy-MM-dd"), hansefit: false },
  { id: "m19", name: "Paul Neumann", email: "paul@example.com", joinDate: "2024-03-12", plan: "Premium", checkIns: 28, lastVisit: format(subDays(new Date(), 2), "yyyy-MM-dd"), hansefit: true },
  { id: "m20", name: "Anna Lange", email: "anna@example.com", joinDate: "2023-06-25", plan: "Elite", checkIns: 220, lastVisit: format(new Date(), "yyyy-MM-dd"), hansefit: false },
];

// ─── Original Data ─────────────────────────────────────────────────────────

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

// ─── Gym Finder Types ────────────────────────────────────────────────────

export interface GymFinderGym {
  id: string;
  name: string;
  address: string;
  lat: number;
  lon: number;
  rating: number;
  amenities: string[];
  isHansefit: boolean;
  is24h: boolean;
  phone: string;
  openToday: string;
  distanceKm: string;
}

export const mockGymFinderGyms: GymFinderGym[] = [
  {
    id: "gf1",
    name: "FitZone Premium",
    address: "Kaiserstuhlstraße 12, 79110 Freiburg",
    lat: 48.0034,
    lon: 7.8274,
    rating: 4.7,
    amenities: ["Sauna", "Pool", "WiFi", "Parkplatz"],
    isHansefit: true,
    is24h: false,
    phone: "+49 761 123 4567",
    openToday: "06:00 – 22:00",
    distanceKm: "1.2",
  },
  {
    id: "gf2",
    name: "Clever Fit Freiburg",
    address: "Bissierstraße 16, 79114 Freiburg",
    lat: 48.0,
    lon: 7.855,
    rating: 4.3,
    amenities: ["WiFi", "Parkplatz"],
    isHansefit: true,
    is24h: true,
    phone: "+49 761 234 5678",
    openToday: "24h geöffnet",
    distanceKm: "2.5",
  },
  {
    id: "gf3",
    name: "McFIT Freiburg",
    address: "Merzhauserstraße 28, 79100 Freiburg",
    lat: 47.994,
    lon: 7.838,
    rating: 4.0,
    amenities: ["WiFi"],
    isHansefit: false,
    is24h: true,
    phone: "+49 761 345 6789",
    openToday: "24h geöffnet",
    distanceKm: "3.1",
  },
  {
    id: "gf4",
    name: "Fitness First Freiburg",
    address: "Rotteckring 12, 79098 Freiburg",
    lat: 47.998,
    lon: 7.843,
    rating: 4.5,
    amenities: ["Sauna", "Pool", "WiFi", "Parkplatz"],
    isHansefit: true,
    is24h: false,
    phone: "+49 761 456 7890",
    openToday: "07:00 – 22:00",
    distanceKm: "2.8",
  },
  {
    id: "gf5",
    name: "CrossFit Freiburg",
    address: "Güterbahnhofstraße 7, 79108 Freiburg",
    lat: 48.012,
    lon: 7.861,
    rating: 4.8,
    amenities: ["WiFi"],
    isHansefit: false,
    is24h: false,
    phone: "+49 761 567 8901",
    openToday: "06:00 – 21:00",
    distanceKm: "0.8",
  },
];

// ─── Achievement Types ───────────────────────────────────────────────────

export interface Achievement {
  id: string;
  icon: string;
  name: string;
  description: string;
  unlockHint: string;
  category: "workout" | "streak" | "nutrition" | "strength" | "gym" | "ai";
  xpReward: number;
  unlocked: boolean;
  unlockedDate?: string;
}

export const mockAchievements: Achievement[] = [
  { id: "a1", icon: "🏋️", name: "Erste Einheit", description: "Dein erstes Workout abgeschlossen", unlockHint: "Schließe dein erstes Workout ab", category: "workout", xpReward: 50, unlocked: true, unlockedDate: "01.01.2025" },
  { id: "a2", icon: "🏋️", name: "10 Workouts", description: "10 Workouts erfolgreich abgeschlossen", unlockHint: "Schließe 10 Workouts ab", category: "workout", xpReward: 100, unlocked: true, unlockedDate: "15.01.2025" },
  { id: "a3", icon: "🏋️", name: "50 Workouts", description: "50 Workouts – du bist ein Profi!", unlockHint: "Schließe 50 Workouts ab", category: "workout", xpReward: 300, unlocked: true, unlockedDate: "20.02.2025" },
  { id: "a4", icon: "🏋️", name: "100 Workouts", description: "100 Workouts – Legende!", unlockHint: "Schließe 100 Workouts ab", category: "workout", xpReward: 500, unlocked: false },
  { id: "a5", icon: "🔥", name: "3 Tage Streak", description: "3 Tage in Folge trainiert", unlockHint: "Trainiere 3 Tage hintereinander", category: "streak", xpReward: 30, unlocked: true, unlockedDate: "05.01.2025" },
  { id: "a6", icon: "🔥", name: "7 Tage Streak", description: "Eine Woche am Stück!", unlockHint: "Trainiere 7 Tage hintereinander", category: "streak", xpReward: 75, unlocked: true, unlockedDate: "10.01.2025" },
  { id: "a7", icon: "🔥", name: "30 Tage Streak", description: "30 Tage Streak – unglaublich!", unlockHint: "Trainiere 30 Tage hintereinander", category: "streak", xpReward: 200, unlocked: true, unlockedDate: "01.02.2025" },
  { id: "a8", icon: "🔥", name: "100 Tage Streak", description: "100 Tage – du bist nicht aufzuhalten", unlockHint: "Trainiere 100 Tage hintereinander", category: "streak", xpReward: 1000, unlocked: false },
  { id: "a9", icon: "🥗", name: "7 Tage Kalorien", description: "7 Tage lang Kalorien getrackt", unlockHint: "Tracke 7 Tage in Folge deine Kalorien", category: "nutrition", xpReward: 80, unlocked: true, unlockedDate: "12.01.2025" },
  { id: "a10", icon: "🥗", name: "Makroziel erreicht", description: "Alle Makros an einem Tag getroffen", unlockHint: "Erreiche alle Makroziele an einem Tag", category: "nutrition", xpReward: 60, unlocked: false },
  { id: "a11", icon: "💪", name: "Neues PR", description: "Ein neues Gewichts-Persönlichkeitsrekord gesetzt", unlockHint: "Setze ein neues Gewichts-PR", category: "strength", xpReward: 100, unlocked: true, unlockedDate: "20.01.2025" },
  { id: "a12", icon: "💪", name: "3 PRs in einer Woche", description: "3 neue PRs in einer Woche – stark!", unlockHint: "Setze 3 PRs in einer Woche", category: "strength", xpReward: 250, unlocked: false },
  { id: "a13", icon: "🗺️", name: "Studio verbunden", description: "Dein erstes Studio verbunden", unlockHint: "Verbinde ein Studio in deinem Profil", category: "gym", xpReward: 50, unlocked: true, unlockedDate: "01.01.2025" },
  { id: "a14", icon: "🗺️", name: "50 Check-ins", description: "50 Mal im Studio eingecheckt", unlockHint: "Checke 50 Mal ein", category: "gym", xpReward: 200, unlocked: false },
  { id: "a15", icon: "🤖", name: "Erster KI-Tipp", description: "Den ersten KI-Tipp erhalten", unlockHint: "Nutze den KI-Coach einmal", category: "ai", xpReward: 30, unlocked: true, unlockedDate: "03.01.2025" },
  { id: "a16", icon: "🤖", name: "10 KI-Gespräche", description: "10 Gespräche mit dem KI-Coach", unlockHint: "Führe 10 Gespräche mit dem KI-Coach", category: "ai", xpReward: 100, unlocked: false },
];

// ─── Workout History Types ───────────────────────────────────────────────

export interface WorkoutHistoryEntry {
  id: string;
  date: string;
  name: string;
  durationMin: number;
  volumeKg: number;
  exercisesCount: number;
  muscleGroups: string[];
  exercises: { name: string; sets: string }[];
}

export const mockWorkoutHistory: WorkoutHistoryEntry[] = [
  { id: "wh1", date: "2025-03-27", name: "Push Day A", durationMin: 65, volumeKg: 4200, exercisesCount: 6, muscleGroups: ["Chest", "Shoulders", "Triceps"], exercises: [{ name: "Bench Press", sets: "4×8 × 80 kg" }, { name: "Shoulder Press", sets: "3×10 × 50 kg" }, { name: "Incline Press", sets: "3×10 × 60 kg" }, { name: "Lateral Raise", sets: "3×15 × 10 kg" }, { name: "Tricep Pushdown", sets: "3×12 × 30 kg" }, { name: "Cable Fly", sets: "3×12 × 40 kg" }] },
  { id: "wh2", date: "2025-03-25", name: "Pull Day B", durationMin: 60, volumeKg: 3800, exercisesCount: 5, muscleGroups: ["Back", "Biceps"], exercises: [{ name: "Pull-ups", sets: "4×8 × +20 kg" }, { name: "Deadlift", sets: "3×5 × 140 kg" }, { name: "Barbell Row", sets: "4×10 × 70 kg" }, { name: "Bicep Curl", sets: "3×12 × 15 kg" }, { name: "Hammer Curl", sets: "3×12 × 14 kg" }] },
  { id: "wh3", date: "2025-03-23", name: "Leg Day", durationMin: 70, volumeKg: 6500, exercisesCount: 6, muscleGroups: ["Legs", "Glutes"], exercises: [{ name: "Squat", sets: "4×5 × 120 kg" }, { name: "Leg Press", sets: "4×12 × 180 kg" }, { name: "Lunges", sets: "3×10 × 40 kg" }, { name: "Leg Extension", sets: "3×15 × 60 kg" }, { name: "Leg Curl", sets: "3×15 × 50 kg" }, { name: "Calf Raise", sets: "4×15 × 80 kg" }] },
  { id: "wh4", date: "2025-03-20", name: "Push Day B", durationMin: 62, volumeKg: 4100, exercisesCount: 6, muscleGroups: ["Chest", "Shoulders", "Triceps"], exercises: [{ name: "Bench Press", sets: "4×8 × 82.5 kg" }, { name: "Shoulder Press", sets: "3×10 × 50 kg" }, { name: "Dips", sets: "3×12 × +10 kg" }, { name: "Lateral Raise", sets: "3×15 × 10 kg" }, { name: "Tricep Pushdown", sets: "3×12 × 32.5 kg" }, { name: "Cable Crossover", sets: "3×15 × 20 kg" }] },
  { id: "wh5", date: "2025-03-18", name: "Pull Day A", durationMin: 58, volumeKg: 3600, exercisesCount: 5, muscleGroups: ["Back", "Biceps"], exercises: [{ name: "Pull-ups", sets: "4×8 × +20 kg" }, { name: "Deadlift", sets: "3×5 × 140 kg" }, { name: "Barbell Row", sets: "4×10 × 72.5 kg" }, { name: "Bicep Curl", sets: "3×12 × 15 kg" }, { name: "Face Pulls", sets: "3×15 × 20 kg" }] },
  { id: "wh6", date: "2025-03-15", name: "Leg Day", durationMin: 68, volumeKg: 6200, exercisesCount: 6, muscleGroups: ["Legs", "Glutes"], exercises: [{ name: "Squat", sets: "4×5 × 115 kg" }, { name: "Leg Press", sets: "4×12 × 175 kg" }, { name: "Lunges", sets: "3×10 × 37.5 kg" }, { name: "Leg Extension", sets: "3×15 × 57.5 kg" }, { name: "Leg Curl", sets: "3×15 × 47.5 kg" }, { name: "Calf Raise", sets: "4×15 × 75 kg" }] },
  { id: "wh7", date: "2025-03-12", name: "Full Body", durationMin: 75, volumeKg: 5000, exercisesCount: 7, muscleGroups: ["Chest", "Back", "Legs"], exercises: [{ name: "Bench Press", sets: "3×8 × 80 kg" }, { name: "Squat", sets: "3×8 × 100 kg" }, { name: "Pull-ups", sets: "3×8 BW" }, { name: "Shoulder Press", sets: "3×10 × 45 kg" }, { name: "Deadlift", sets: "3×5 × 120 kg" }, { name: "Bicep Curl", sets: "3×12 × 12.5 kg" }, { name: "Tricep Pushdown", sets: "3×12 × 27.5 kg" }] },
];

// Heatmap data: 12 weeks × 7 days
export interface HeatmapDay {
  date: string;
  intensity: 0 | 1 | 2 | 3; // 0=none, 1=light, 2=medium, 3=intense
}

export function generateHeatmapData(): HeatmapDay[] {
  const days: HeatmapDay[] = [];
  const today = new Date();
  for (let i = 83; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    const rand = Math.random();
    const intensity: 0 | 1 | 2 | 3 = rand < 0.45 ? 0 : rand < 0.65 ? 1 : rand < 0.85 ? 2 : 3;
    days.push({ date: dateStr, intensity });
  }
  return days;
}
