import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function loading() {
  return (
    <div className="flex flex-col gap-10 px-6 ">
      <Skeleton className="h-[200px] w-full rounded-xl" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index}>
            <Skeleton className="h-[500px] w-full rounded-xl" />
            {/* <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default loading;
