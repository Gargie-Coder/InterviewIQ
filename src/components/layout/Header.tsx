"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "../../context/AppContext";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Menu, Sparkles, Check, ChevronDown } from "lucide-react";

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const { user, isDemoMode, loadDemoData } = useApp();
  const [justReset, setJustReset] = React.useState(false);

  const handleLoadDemo = () => {
    loadDemoData();
    setJustReset(true);
    setTimeout(() => setJustReset(false), 2000);
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2">
          <Badge variant="neutral" size="md">
            Role: <strong className="ml-1 text-slate-800">{user.targetRole}</strong>
          </Badge>
          <Badge variant="success" size="sm">
            Prototype Demo Active
          </Badge>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Load Demo Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleLoadDemo}
          className="text-xs font-semibold text-brand-700 bg-brand-50/50 border-brand-200 hover:bg-brand-100 transition-colors"
          title="Reset to Alex Sharma demo candidate data"
        >
          {justReset ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600 mr-1" />
              <span>Demo Loaded</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-brand-600 mr-1" />
              <span>Load Demo Candidate</span>
            </>
          )}
        </Button>

        {/* User Avatar */}
        <Link
          href="/profile"
          className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-semibold text-xs flex items-center justify-center">
            AS
          </div>
          <div className="hidden md:block text-left">
            <span className="text-xs font-semibold text-slate-800 block leading-tight">
              {user.name}
            </span>
            <span className="text-[11px] text-slate-400 block leading-tight">
              Candidate
            </span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden md:block" />
        </Link>
      </div>
    </header>
  );
}
