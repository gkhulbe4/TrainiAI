import { auth } from "@clerk/nextjs/server";
import prisma from "../prisma";
import { NextResponse } from "next/server";
import { userData, userPlanData } from "@/constants/types";

export default async function insertUserData(
  userPlanData: userPlanData,
  userData: userData,
  userId: string
) {
  try {
    const getUser = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!getUser) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    await prisma.$transaction(async (tx) => {
      const insertPlan = await tx.plan.create({
        data: {
          userId: getUser.id,
          title: userPlanData.plan_name,
          goal: userData.fitness_goal,
          overview: userPlanData.plan_overview,
          workout_days: userData.workout_days,
          injuries: userData.injuries,
          dietetary_restrictions: userData.dietetary_restrictions,
        },
      });

      // Workout plan insertion
      for (const dayPlan of userPlanData.workout_plan) {
        const day = await tx.day.findUnique({
          where: { name: dayPlan.day },
        });

        const workoutPlan = await tx.workoutPlan.create({
          data: {
            planId: insertPlan.id,
            day: dayPlan.day,
            title: dayPlan.title,
          },
        });

        for (const exercise of dayPlan.exercises) {
          await tx.exercise.create({
            data: {
              title: exercise.name,
              sets: exercise.sets.toString(),
              reps: exercise.reps.toString(),
              day: day?.name || dayPlan.day,
              workoutPlanId: workoutPlan.id,
            },
          });
        }
      }

      // Diet plan insertion
      for (const dietPlan of userPlanData.diet_plan) {
        const getMealTime = await tx.mealTime.findUnique({
          where: {
            name: dietPlan.mealTime,
          },
        });

        await tx.dietPlan.create({
          data: {
            planId: insertPlan.id,
            mealTime: getMealTime?.name || dietPlan.mealTime,
            meal: dietPlan.meal,
          },
        });
      }
    });

    return NextResponse.json(
      { message: "Data inserted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Transaction error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
