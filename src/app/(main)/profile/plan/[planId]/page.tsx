import prisma from "@/lib/prisma";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorkoutPlan from "@/app/_components/WorkoutPlan";
import DietPlan from "@/app/_components/DietPlan";

async function page({ params }: { params: { planId: string } }) {
  const { planId } = await params;

  const workoutPlan = await prisma.workoutPlan.findMany({
    where: {
      planId: parseInt(planId),
    },
    select: {
      day: true,
      title: true,
      _count: true,
      Exercises: {
        select: {
          title: true,
          sets: true,
          reps: true,
        },
      },
    },
    orderBy: {
      Day: {
        id: "asc",
      },
    },
  });

  const dietPlan = await prisma.dietPlan.findMany({
    where: {
      planId: parseInt(planId),
    },
    select: {
      mealTime: true,
      meal: true,
    },
  });

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 py-8 bg-zinc-950 min-h-screen text-gray-100">
      <Tabs defaultValue="workoutPlan" className="w-full max-w-4xl mx-auto">
        <TabsList className="w-full bg-zinc-950 mb-3 space-x-2">
          <TabsTrigger
            className="cursor-pointer text-md font-semibold text-gray-300 data-[state=active]:bg-gradient-to-r from-blue-600 to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:shadow-blue-800/20 data-[state=active]:border-blue-500/50 transition-all duration-300 border border-gray-700 py-4"
            value="workoutPlan"
          >
            Workout
          </TabsTrigger>
          <TabsTrigger
            className="cursor-pointer text-md font-semibold text-gray-300 data-[state=active]:bg-gradient-to-r from-blue-600 to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:shadow-blue-800/20 data-[state=active]:border-blue-500/50 transition-all duration-300 border-gray-700 py-4"
            value="dietPlan"
          >
            Diet
          </TabsTrigger>
        </TabsList>
        <TabsContent value="workoutPlan" className="p-0">
          <WorkoutPlan workoutPlan={workoutPlan} />
        </TabsContent>
        <TabsContent value="dietPlan" className="p-0">
          <DietPlan dietPlan={dietPlan} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default page;
