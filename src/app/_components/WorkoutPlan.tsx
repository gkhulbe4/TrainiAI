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
    <Accordion type="multiple" className="w-full space-y-5">
      {workoutPlan.map((plan: any) => (
        <AccordionItem
          key={plan.day}
          value={plan.day}
          className="border border-blue-700/40 rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-800/70 to-zinc-900/70 shadow-2xl shadow-blue-900/30 transition-all duration-300 ease-in-out hover:shadow-blue-700/40"
        >
          <AccordionTrigger className="flex font-extrabold cursor-pointer py-5 px-7 text-gray-50 hover:bg-zinc-700/50 hover:no-underline rounded-t-2xl data-[state=open]:rounded-b-none data-[state=open]:border-b border-blue-800/50 transition-colors duration-300">
            <p className="w-full text-blue-300 text-lg text-left tracking-wide">
              {" "}
              {plan.day}
            </p>
            <p className="flex justify-center items-center gap-2 w-max text-sm font-mono text-purple-400 flex-shrink-0 uppercase">
              {plan.Exercises.length} <span>EXERCISES</span>
            </p>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-5 mt-0 p-7 bg-zinc-900/60 rounded-b-2xl border-t border-zinc-800/50">
            {plan.Exercises.map((exercise: any) => (
              <div
                key={exercise.title}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center border border-zinc-700/60 rounded-xl px-5 py-4 bg-zinc-800/80 shadow-lg shadow-zinc-950/40 gap-3 sm:gap-5"
              >
                <p className="font-medium text-blue-200 text-lg  flex-grow">
                  {exercise.title}
                </p>
                <div className="flex gap-4 flex-shrink-0">
                  <p className="px-4 py-2 rounded-lg bg-purple-800/40 text-purple-200 border border-purple-700/60 text-xs font-mono uppercase">
                    {exercise.sets} SETS
                  </p>
                  <p className="px-4 py-2 rounded-lg bg-blue-800/40 text-blue-200 border border-blue-700/60 text-xs font-mono uppercase">
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
