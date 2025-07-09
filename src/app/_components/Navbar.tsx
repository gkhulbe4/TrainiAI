import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { DumbbellIcon, HomeIcon, UserIcon, ZapIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

async function Navbar() {
  const user = await currentUser();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-900/70 backdrop-blur-lg border-b border-purple-800/60 py-4 shadow-lg shadow-purple-900/20">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="p-2 bg-blue-700/20 rounded-lg shadow-inner shadow-blue-800/30">
            <ZapIcon className="w-5 h-5 text-blue-400 animate-pulse" />
          </div>
          <span className="text-2xl font-extrabold font-mono text-gray-50 tracking-wide">
            TrainiAI
          </span>
        </Link>

        <nav className="flex items-center gap-4 sm:gap-6">
          {user ? (
            <>
              <Link
                href="/generate"
                className="flex items-center gap-1.5 text-base text-gray-300 hover:text-blue-400 transition-colors duration-200"
              >
                <DumbbellIcon size={18} />
                <span className="hidden sm:inline">Generate</span>
              </Link>

              <Link
                href="/profile"
                className="flex items-center gap-1.5 text-base text-gray-300 hover:text-blue-400 transition-colors duration-200"
              >
                <UserIcon size={18} />
                <span className="hidden sm:inline">Profile</span>
              </Link>
              <UserButton />
            </>
          ) : (
            <>
              <SignInButton>
                <Button
                  variant={"outline"}
                  className="border-blue-600/70 text-blue-700 hover:text-white hover:bg-blue-700/30 px-4 py-2 rounded-lg text-base transition-all duration-200 cursor-pointer"
                >
                  Sign In
                </Button>
              </SignInButton>

              <SignUpButton>
                <Button
                  variant={"outline"}
                  className="border-blue-600/70 text-blue-700 hover:text-white hover:bg-blue-700/30 px-4 py-2 rounded-lg text-base transition-all duration-200 cursor-pointer"
                >
                  Sign Up
                </Button>
              </SignUpButton>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
