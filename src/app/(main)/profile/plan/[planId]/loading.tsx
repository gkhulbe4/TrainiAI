import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function loading() {
  return (
    <div className="flex flex-col gap-4 p-10">
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index} className="h-[70px] w-full rounded-xl" />
      ))}
    </div>
  );
}

export default loading;
