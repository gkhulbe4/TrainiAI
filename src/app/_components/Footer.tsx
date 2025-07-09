import { ZapIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="border-t border-purple-800/60 bg-zinc-900/70 backdrop-blur-lg shadow-inner shadow-purple-900/20 mt-12">
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>

      <div className="container mx-auto px-4 py-8 sm:py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="p-2 bg-blue-700/20 rounded-lg shadow-inner shadow-blue-800/30">
                <ZapIcon className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-2xl font-extrabold font-mono text-gray-50 tracking-wide">
                TrainiAI
              </span>
            </Link>
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} TrainiAI - All rights reserved
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-12 gap-y-3 text-base text-center md:text-left">
            <Link
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-200 cursor-pointer"
            >
              About
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-200 cursor-pointer"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-200 cursor-pointer"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-200 cursor-pointer"
            >
              Contact
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-200 cursor-pointer"
            >
              Blog
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-200 cursor-pointer"
            >
              Help
            </Link>
          </div>

          <div className="flex items-center gap-3 px-4 py-2 border border-green-600/50 rounded-lg bg-zinc-800/70 shadow-md">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs font-mono text-green-300 uppercase tracking-wider">
              System Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
