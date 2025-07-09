import React from "react";
import CornerElements from "./CornerElements";
import { UserResource } from "@clerk/types";

function ProfileHeader({ user }: { user: UserResource }) {
  return (
    <div className="mb-10 relative bg-zinc-900/60 backdrop-blur-md border border-purple-700/50 p-8 rounded-2xl shadow-xl shadow-purple-900/30">
      <CornerElements />

      <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
        <div className="relative flex-shrink-0">
          {user.imageUrl ? (
            <div className="relative w-28 h-28 overflow-hidden rounded-xl border-2 border-blue-500/70">
              <img
                src={user.imageUrl}
                alt={user.fullName || "Profile"}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-28 h-28 rounded-xl bg-gradient-to-br from-blue-700/40 to-purple-700/40 flex items-center justify-center border-2 border-blue-500/70">
              <span className="text-5xl font-extrabold text-blue-300">
                {user.fullName?.charAt(0) || "U"}
              </span>
            </div>
          )}
          <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-green-500 border-3 border-zinc-900"></div>
        </div>

        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-50">
              {user.fullName}
            </h1>
            <div className="flex items-center bg-zinc-800/70 border border-green-600/50 rounded-full px-4 py-1.5 shadow-md">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse mr-2"></div>
              <p className="text-sm font-mono text-green-300 uppercase">
                User Active
              </p>
            </div>
          </div>
          <div className="h-0.5 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-70 my-3"></div>
          <p className="text-gray-300 font-mono text-base">
            {user.primaryEmailAddress?.emailAddress}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
