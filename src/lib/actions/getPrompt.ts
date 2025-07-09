export default function getPrompt(userData: {
  age: string;
  height: string;
  weight: string;
  injuries: string;
  fitness_goal: string;
  workout_days: string;
  fitness_level: string;
  equipment_available: string;
  dietetary_restrictions: string;
}) {
  const prompt = `
Based on the following user profile:

{
  "age": "${userData.age}",
  "height": "${userData.height}",
  "weight": "${userData.weight}",
  "injuries": "${userData.injuries}",
  "fitness_goal": "${userData.fitness_goal}",
  "workout_days": "${userData.workout_days}",
  "fitness_level": "${userData.fitness_level}",
  "equipment_available": "${userData.equipment_available}",
  "dietetary_restrictions": "${userData.dietetary_restrictions}"
}

Generate a customized fitness plan for this user. Your response should be in JSON format and follow this structure exactly: Note: Make sure you make a personalised diet plan for each user based on their fitness level and dietary restrictions. below is the example of what the JSON response should look like and for the diet plan it should be based on the fitness level and dietary restrictions of the user. Timings of the meal will only be ["breakfast", "lunch", "dinner" , "post_workout" , "pre_workout"]:, and the title of the plan should be of max 4 words. Also , don't put days for rest , only give the days with exercises.

{
  "plan_name": "Fit & Active 5-Day Routine",
  "plan_overview": "Designed to boost full-body energy and mobility. Balanced strength and cardio training paired with a high-protein vegetarian diet for optimal recovery.",
  "workout_plan": [
    {
      "day": "Monday",
      "title": "Upper Body Strength",
      "exercises": [
        { "name": "Dumbbell Bench Press", "sets": 4, "reps": 10 },
        { "name": "Lat Pulldown", "sets": 3, "reps": 12 }
      ]
    },
    {
      "day": "Tuesday",
      "title": "Lower Body Conditioning",
      "exercises": [
        { "name": "Barbell Squats", "sets": 4, "reps": 8 },
        { "name": "Lunges", "sets": 3, "reps": 10 }
      ]
    }
    // Add other days similarly
  ],
  "diet_plan": [
    {
      "mealTime": "breakfast",
      "meal": [
        "60g oats with 200ml almond milk and 1 banana",
        "10 soaked almonds"
      ]
    },
    {
      "mealTime": "pre_workout",
      "meal": [
        "1 medium banana",
        "200ml black coffee"
      ]
    },
    {
      "mealTime": "post_workout",
      "meal": [
        "1 scoop (30g) whey protein with 300ml water"
      ]
    },
    {
      "mealTime": "lunch",
      "meal": [
        "2 multigrain chapatis",
        "1 cup mixed vegetable curry",
        "1 bowl low-fat curd"
      ]
    },
    {
      "mealTime": "dinner",
      "meal": [
        "1 bowl quinoa salad with chickpeas and veggies",
        "1 cup vegetable soup"
      ]
    }
  ]
}

Requirements:
- The "plan_name" should be catchy and tailored to the user’s goal and level.
- The "plan_overview" should be maximum 2 lines and clearly explain why this plan suits the user.
- "workout_plan" must be an array of days (length = workout_days), each with:
  - "day" (e.g. Monday)
  - "title" (summary of workout theme)
  - "exercises": list of at least 5 exercises with sets and reps.
- "diet_plan" must be an array of meals with:
  - "mealTime" (e.g. breakfast, lunch)
  - "meal": array of food items for that time.
- Meals must match dietary restrictions and support the user’s goal and recovery.
- Use basic nutrition logic like 1.6g protein per kg of body weight for recovery.
- Return only **valid JSON**. Do not include markdown, backticks, or explanation.
`;

  return prompt.trim();
}
