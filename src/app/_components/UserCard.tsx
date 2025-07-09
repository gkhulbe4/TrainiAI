"use client";
import { Card } from "@/components/ui/card";
import React from "react";

function UserCard({ user }: any) {
  return (
    <Card className="bg-card/90 backdrop-blur-md border border-blue-700/40 shadow-md overflow-hidden relative">
      <div className="aspect-video flex flex-col items-center justify-center p-6 relative">
        {/* Glow animation */}
        <div className="absolute -z-10 size-40 rounded-full bg-purple-700/10 blur-2xl" />

        {/* Avatar */}
        <div className="relative size-32 mb-4">
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-lg animate-pulse" />
          <img
            src={user?.imageUrl}
            alt="User"
            className="size-full object-cover rounded-full border-2 border-primary shadow-inner"
          />
        </div>

        <h2 className="text-xl font-bold text-blue-800">You</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {user?.firstName || "Guest"}
        </p>

        <div className="mt-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-background border border-border text-sm font-mono text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-muted" />
          <span>Ready</span>
        </div>
      </div>
    </Card>
  );
}

export default UserCard;
