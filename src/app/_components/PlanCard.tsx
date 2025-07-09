import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlanType } from "@/constants/types";
import { format } from "date-fns";
import Link from "next/link";

function PlanCard({ plan }: PlanType) {
  //   console.log(plan);
  return (
    <Link href={`profile/plan/${plan.id}`}>
      <Card className="rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer h-max w-full max-w-md mx-auto sm:max-w-full sm:mx-0">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl font-semibold text-gray-900">
            {plan.title}
          </CardTitle>
          <CardDescription className="text-sm sm:text-base text-gray-600">
            {plan.goal}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-2 max-h-60 overflow-y-auto">
          <p className="text-sm sm:text-base text-black font-medium leading-relaxed">
            {plan.overview}
          </p>
          <div className="mt-4 text-sm sm:text-base text-gray-600">
            <span className="font-medium">Workout Days:</span>{" "}
            {plan.workout_days.length === 1
              ? `${plan.workout_days} day a week`
              : `${plan.workout_days}`}
            <br />
            <span className="font-medium">Injuries:</span> {plan.injuries}
            <br />
            <span className="font-medium">Dietary Restrictions:</span>{" "}
            {plan.dietetary_restrictions}
          </div>
        </CardContent>

        <CardFooter className="text-xs sm:text-sm text-gray-500">
          Created on: {format(new Date(plan.createdAt), "dd MMM yyyy, h:mm a")}
        </CardFooter>
      </Card>
    </Link>
  );
}

export default PlanCard;
