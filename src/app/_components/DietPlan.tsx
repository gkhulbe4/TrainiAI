import React from "react";

type DietPlan = {
  mealTime: string;
  meal: string[];
};

function getMealTime(mealTime: string) {
  if (mealTime === "breakfast") return "Breakfast";
  if (mealTime === "lunch") return "Lunch";
  if (mealTime === "dinner") return "Dinner";
  if (mealTime === "post_workout") return "Post Workout";
  if (mealTime === "pre_workout") return "Pre Workout";
  return "Unknown";
}

function DietPlanComponent({ dietPlan }: { dietPlan: DietPlan[] }) {
  return (
    <div className="space-y-4 p-6">
      {dietPlan.map((meal, index) => (
        <div
          key={index}
          className="border border-border rounded-lg overflow-hidden p-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <h4 className="font-mono text-primary">
              {getMealTime(meal.mealTime)}
            </h4>
          </div>
          <ul className="space-y-2">
            {meal.meal.map((food, foodIndex) => (
              <li
                key={foodIndex}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <span className="text-xs text-primary font-mono">
                  {String(foodIndex + 1).padStart(2, "0")}
                </span>
                {food}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default DietPlanComponent;
