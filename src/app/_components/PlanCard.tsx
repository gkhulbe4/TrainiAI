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

function PlanCard({ plan, index }: { plan: PlanType; index: number }) {
  // console.log(plan);
  return (
    <Link href={`profile/plan/${plan.id}`}>
      <div className="relative w-full h-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto">
        {index === 0 && (
          <div className="absolute top-0 right-0 z-10 px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold rounded-bl-xl shadow-md">
            Recently Added
          </div>
        )}

        <Card className="rounded-2xl shadow-xl border border-purple-700/50 hover:border-blue-500/70 hover:shadow-2xl transition-all duration-300 cursor-pointer h-full w-full bg-zinc-900/60 backdrop-blur-md">
          <CardHeader className="p-6 pb-4">
            <CardTitle className="text-2xl font-bold text-blue-300 mb-1">
              {plan.title}
            </CardTitle>
            <CardDescription className="text-base text-gray-400">
              {plan.goal}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 p-6 pt-0 max-h-64 overflow-y-auto custom-scrollbar">
            <p className="text-base text-gray-200 leading-relaxed">
              {plan.overview}
            </p>
            <div className="mt-4 text-sm text-gray-300 space-y-1">
              <p>
                <span className="font-semibold text-blue-400">
                  Workout Days:
                </span>{" "}
                {Array.isArray(plan.workout_days)
                  ? plan.workout_days.length === 1
                    ? `${plan.workout_days[0]} day a week`
                    : plan.workout_days.join(", ")
                  : plan.workout_days}
              </p>
              <p>
                <span className="font-semibold text-blue-400">Injuries:</span>{" "}
                {plan.injuries}
              </p>
              <p>
                <span className="font-semibold text-blue-400">
                  Dietary Restrictions:
                </span>{" "}
                {plan.dietetary_restrictions}
              </p>
            </div>
          </CardContent>

          <CardFooter className="p-6 pt-4 text-xs text-gray-200 border-t border-purple-800/40">
            Created on:{" "}
            {format(new Date(plan.createdAt), "dd MMM yyyy, h:mm a")}
          </CardFooter>
        </Card>
      </div>
    </Link>
  );
}

export default PlanCard;
