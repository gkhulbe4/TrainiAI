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
    <div className="space-y-6 p-6 bg-zinc-800/50 rounded-xl border border-purple-700/50 shadow-lg">
      {dietPlan.map((meal, index) => (
        <div
          key={index}
          className="border border-blue-700/40 rounded-xl overflow-hidden bg-gradient-to-br from-zinc-800/70 to-zinc-900/70 shadow-xl shadow-blue-900/30 p-5 transition-all duration-300 ease-in-out hover:shadow-blue-700/40"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
            <h4 className="font-mono text-blue-300 text-xl font-semibold uppercase tracking-wide">
              {getMealTime(meal.mealTime)}
            </h4>
          </div>
          <ul className="space-y-3">
            {meal.meal.map((food, foodIndex) => (
              <li
                key={foodIndex}
                className="flex items-center gap-3 text-base text-gray-200 bg-zinc-700/60 rounded-lg px-4 py-3 border border-zinc-600/50 shadow-sm"
              >
                <span className="text-sm text-purple-400 font-mono flex-shrink-0">
                  {String(foodIndex + 1).padStart(2, "0")}.
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
