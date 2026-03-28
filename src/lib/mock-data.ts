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
