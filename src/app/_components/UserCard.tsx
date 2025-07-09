"use client";
import { Card } from "@/components/ui/card";
import React from "react";

function UserCard({ user }: any) {
  //   console.log(user);
  return (
    <Card
      className={`bg-card/90 backdrop-blur-sm border overflow-hidden relative`}
    >
      <div className="aspect-video flex flex-col items-center justify-center p-6 relative">
        {/* User Image */}
        <div className="relative size-32 mb-4">
          <img
            src={user?.imageUrl}
            alt="User"
            // ADD THIS "size-full" class to make it rounded on all images
            className="size-full object-cover rounded-full"
          />
        </div>

        <h2 className="text-xl font-bold text-foreground">You</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {user ? user.firstName : "Guest"}
        </p>

        {/* User Ready Text */}
        <div
          className={`mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-card border`}
        >
          <div className={`w-2 h-2 rounded-full bg-muted`} />
          <span className="text-xs text-muted-foreground">Ready</span>
        </div>
      </div>
    </Card>
  );
}

export default UserCard;
