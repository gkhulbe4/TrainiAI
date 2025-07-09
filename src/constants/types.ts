export type workoutPlan = {
  day: string;
  title: string;
  exercises: [
    {
      name: string;
      sets: string;
      reps: string;
    }
  ];
};

export type dietPlan = {
  mealTime: string;
  meal: string[];
};

export type userPlanData = {
  plan_name: string;
  plan_overview: string;
  workout_plan: workoutPlan[];
  diet_plan: dietPlan[];
};

export type userData = {
  age: string;
  height: string;
  weight: string;
  injuries: string;
  fitness_goal: string;
  workout_days: string;
  fitness_level: string;
  equipment_available: string;
  dietetary_restrictions: string;
};

export type PlanType = {
  plan: {
    id: number;
    createdAt: Date;
    userId: number;
    title: string;
    goal: string;
    overview: string;
    workout_days: string;
    injuries: string;
    dietetary_restrictions: string;
  };
};
