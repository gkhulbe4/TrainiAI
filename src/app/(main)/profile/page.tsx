import PlanCard from "@/app/_components/PlanCard";
import ProfileHeader from "@/app/_components/ProfileHeader";
import { PlanType, userPlanData } from "@/constants/types";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { UserResource } from "@clerk/types";
import React from "react";

async function page() {
  const user: any = await currentUser();
  if (!user)
    return (
      <div className="text-center text-red-400 text-lg py-10">
        Please log in to view your plans.
      </div>
    );

  const userDetails = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
  });

  const allPlans = await prisma.plan.findMany({
    where: {
      userId: userDetails?.id!,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex flex-col gap-8 px-4 sm:px-6 lg:px-8 py-8 bg-zinc-950 min-h-screen text-gray-100">
      <ProfileHeader user={user} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 border border-purple-800/50 rounded-xl shadow-inner shadow-purple-900/20 bg-zinc-900/40 backdrop-blur-sm">
        {allPlans.length > 0 ? (
          allPlans.map((p: PlanType, index: number) => (
            <PlanCard plan={p} key={p.id} index={index} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 text-xl py-10">
            No plans found. Start creating one!
          </div>
        )}
      </div>
    </div>
  );
}

export default page;
