"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { USER_PROGRAMS } from "@/constants";
import {
  Dumbbell,
  AppleIcon,
  ShieldIcon,
  Sparkles,
  Users,
  Clock,
} from "lucide-react";

export default function UserPrograms() {
  return (
    <section className="w-full px-6 py-24 bg-zinc-950 text-gray-100">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-extrabold">
            <span className="text-gray-100">AI-Generated</span>{" "}
            <span className="text-blue-400">Programs</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Explore fitness plans our AI has created for others — every program
            is uniquely built.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-10 pt-6 font-mono">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-400">500+</p>
              <p className="text-sm text-gray-400 uppercase tracking-widest">
                Programs
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-400">3min</p>
              <p className="text-sm text-gray-400 uppercase tracking-widest">
                Creation Time
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-400">100%</p>
              <p className="text-sm text-gray-400 uppercase tracking-widest">
                Personalized
              </p>
            </div>
          </div>
        </div>

        {/* Program Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {USER_PROGRAMS.map((program) => (
            <div
              key={program.id}
              className="group bg-zinc-900/70 border border-blue-700/30 rounded-2xl overflow-hidden shadow-md hover:shadow-blue-700/40 transition-all backdrop-blur-md"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-2 bg-zinc-800/60 border-b border-zinc-700">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-sm text-blue-400 font-mono">
                    USER.{program.id}
                  </span>
                </div>
                <span className="text-xs text-gray-400 uppercase">
                  {program.fitness_level}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 space-y-5">
                {/* User Info */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border border-zinc-700">
                    <img
                      src={program.profilePic}
                      alt={program.first_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-100">
                      {program.first_name}
                      <span className="text-purple-400">.exe</span>
                    </h3>
                    <p className="text-sm text-gray-400 font-mono">
                      {program.age}y • {program.workout_days}d/week
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 text-sm text-gray-300 font-mono">
                  <div className="flex items-start gap-2">
                    <Dumbbell className="w-4 h-4 text-blue-400 mt-0.5" />
                    <div>
                      <p className="font-semibold text-blue-300">
                        {program.workout_plan.title}
                      </p>
                      <p className="text-xs text-gray-400">
                        {program.equipment_access}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <AppleIcon className="w-4 h-4 text-purple-400 mt-0.5" />
                    <div>
                      <p className="font-semibold text-purple-300">
                        {program.diet_plan.title}
                      </p>
                      <p className="text-xs text-gray-400">
                        AI-optimized nutrition
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <ShieldIcon className="w-4 h-4 text-green-400 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-300">
                        AI Safety Protocols
                      </p>
                      <p className="text-xs text-gray-400">
                        Auto-adjusted difficulty
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-400 border-t border-zinc-700 pt-4">
                  <span className="text-blue-500">&gt;</span>{" "}
                  {program.workout_plan.description.substring(0, 110)}...
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center pt-12">
          <Link href="/generate">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-5 text-base font-mono shadow-lg shadow-blue-800/40 transition">
              Generate My Own Program
              <Sparkles className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          <p className="text-gray-400 text-sm mt-3 font-mono">
            Join 500+ users with AI-powered training plans.
          </p>
        </div>
      </div>
    </section>
  );
}
