import prisma from "@/lib/prisma";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorkoutPlan from "@/app/_components/WorkoutPlan";
import DietPlan from "@/app/_components/DietPlan";

async function page({ params }: { params: { planId: string } }) {
  const { planId } = await params;
  // console.log(planId);

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
  // console.log(workoutPlan);

  const dietPlan = await prisma.dietPlan.findMany({
    where: {
      planId: parseInt(planId),
    },
    select: {
      mealTime: true,
      meal: true,
    },
  });
  // console.log(dietPlan);

  return (
    <div className="w-full px-10">
      <Tabs defaultValue="workoutPlan" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger className="cursor-pointer" value="workoutPlan">
            Workout
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="dietPlan">
            Diet
          </TabsTrigger>
        </TabsList>
        <TabsContent value="workoutPlan" className="p-6">
          <WorkoutPlan workoutPlan={workoutPlan} />
        </TabsContent>
        <TabsContent value="dietPlan">
          <DietPlan dietPlan={dietPlan} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default page;
