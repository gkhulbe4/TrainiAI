import { ZapIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="border-t border-border bg-background/80 backdrop-blur-sm">
      {/* Top border glow */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo and Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="p-1 bg-primary/10 rounded">
                <ZapIcon className="w-4 h-4 text-primary" />
              </div>
              <span className="text-xl font-bold font-mono">TrainiAI</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} TrainiAI - All rights reserved
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-2 text-sm">
            <div className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
              About
            </div>
            <div className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
              Terms
            </div>
            <div className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
              Privacy
            </div>
            <div className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
              Contact
            </div>
            <div className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
              Blog
            </div>
            <div className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
              Help
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2 px-3 py-2 border border-border rounded-md bg-background/50">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-xs font-mono">SYSTEM OPERATIONAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
