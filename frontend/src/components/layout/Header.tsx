"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "../../context/AppContext";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Menu, LogOut, User as UserIcon } from "lucide-react";

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const { user, logout } = useApp();

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
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

        {user && (
          <div className="hidden sm:flex items-center gap-2">
            <Badge variant="neutral" size="md">
              Role: <strong className="ml-1 text-slate-800">{user.targetRole}</strong>
            </Badge>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        {user ? (
          <>
            <Link
              href="/profile"
              className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-semibold text-xs flex items-center justify-center">
                {getInitials(user.name)}
              </div>
              <div className="hidden md:block text-left">
                <span className="text-xs font-semibold text-slate-800 block leading-tight">
                  {user.name}
                </span>
                <span className="text-[11px] text-slate-400 block leading-tight">
                  {user.email}
                </span>
              </div>
            </Link>

            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-xs text-slate-600 hover:text-rose-600 hover:bg-rose-50"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5 mr-1" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </>
        ) : (
          <Link href="/login">
            <Button variant="primary" size="sm">
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}
