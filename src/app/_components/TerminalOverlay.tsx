import React from "react";

function TerminalOverlay() {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
      <div className="bg-zinc-900/80 backdrop-blur-sm border border-blue-700/50 rounded-xl p-4 shadow-lg shadow-blue-900/40 font-mono text-sm text-gray-200 relative overflow-hidden">
        <div className="flex justify-between items-center border-b border-zinc-700 pb-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse"></div>
            <p className="text-xs text-purple-300 tracking-wider">
              AI TERMINAL
            </p>
          </div>
          <p className="text-xs text-gray-400">ID# 78412.93</p>
        </div>

        <p className="text-primary mb-2">
          <span className="text-blue-400 font-bold">/</span> TRAINING SUMMARY
        </p>

        <ul className="space-y-1.5 text-gray-300 text-xs tracking-tight">
          <li className="flex gap-2">
            <span className="text-blue-500 font-semibold">[01]</span>
            30 mins strength (upper body)
          </li>
          <li className="flex gap-2">
            <span className="text-purple-500 font-semibold">[02]</span>
            20 mins HIIT cardio
          </li>
          <li className="flex gap-2">
            <span className="text-blue-500 font-semibold">[03]</span>
            10 mins flexibility and recovery
          </li>
        </ul>

        <div className="absolute inset-0 bg-[linear-gradient(transparent_48%,rgba(59,130,246,0.2)_50%,transparent_52%)] bg-[length:100%_8px] animate-scanline pointer-events-none" />
      </div>
    </div>
  );
}

export default TerminalOverlay;
