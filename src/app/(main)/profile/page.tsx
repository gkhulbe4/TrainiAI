import PlanCard from "@/app/_components/PlanCard";
import ProfileHeader from "@/app/_components/ProfileHeader";
import { PlanType, userPlanData } from "@/constants/types";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { UserResource } from "@clerk/types";
import React from "react";

async function page() {
  const user: any = await currentUser();
  if (!user) return <div>Please log in</div>;
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
  // console.log(allPlans);
  return (
    <div className="flex flex-col gap-4 px-6 ">
      <ProfileHeader user={user} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-8 py-4 border border-gray-300 rounded-md">
        {allPlans.map((p) => (
          <PlanCard plan={p} key={p.id} />
        ))}
      </div>
    </div>
  );
}

export default page;
