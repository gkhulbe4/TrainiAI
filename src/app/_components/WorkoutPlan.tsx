import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function WorkoutPlan({ workoutPlan }: any) {
  //   console.log(workoutPlan);
  return (
    <Accordion type="multiple">
      {workoutPlan.map((plan: any) => (
        <AccordionItem
          key={plan.day}
          value={plan.day}
          className="border border-gray-300 rounded-lg mb-4 "
        >
          <AccordionTrigger className="flex font-semibold cursor-pointer hover:bg-gray-200 py-3 px-4 hover:no-underline">
            <p className="w-full"> {plan.day}</p>
            <p className="flex gap-2 w-max text-xs font-medium text-gray-500 ">
              {plan.Exercises.length} <span>EXERCISES</span>
            </p>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-3 mt-3 p-4">
            {plan.Exercises.map((exercise: any) => (
              <div
                key={exercise.title}
                className="flex justify-between border border-gray-300 rounded-lg px-4 py-3"
              >
                <p className="font-semibold text-foreground">
                  {exercise.title}
                </p>
                <div className="flex gap-2">
                  <p className="px-2 py-1 rounded bg-primary/20 text-primary text-xs font-mono">
                    {exercise.sets} SETS
                  </p>
                  <p className="px-2 py-1 rounded bg-secondary/20 text-primary text-xs font-mono">
                    {exercise.reps} REPS
                  </p>
                </div>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default WorkoutPlan;
