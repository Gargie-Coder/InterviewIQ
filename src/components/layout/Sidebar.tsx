"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../lib/utils";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  FileCheck2,
  Bot,
  Code2,
  Network,
  Compass,
  HelpCircle,
  Award,
  Milestone,
  GraduationCap,
  TrendingUp,
  User,
  Settings,
  LineChart,
} from "lucide-react";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const workingNavItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Resume Analyzer", href: "/resume-analyzer", icon: FileText },
    { name: "Job Match", href: "/job-match", icon: Briefcase },
    { name: "ATS Score", href: "/ats-score", icon: FileCheck2 },
    { name: "AI Interview", href: "/interview", icon: Bot },
  ];

  const comingSoonNavItems = [
    { name: "Coding Interview", href: "/coding", icon: Code2 },
    { name: "Skill Gaps", href: "/skill-gaps", icon: Network },
    { name: "Role Preparation", href: "/role-prep", icon: Compass },
    { name: "Question Bank", href: "/questions", icon: HelpCircle },
    { name: "Role Exams", href: "/exams", icon: Award },
    { name: "Learning Roadmap", href: "/roadmap", icon: Milestone },
    { name: "Courses", href: "/courses", icon: GraduationCap },
    { name: "Skill Improvement", href: "/skill-test", icon: TrendingUp },
    { name: "Progress Analytics", href: "/analytics", icon: LineChart },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-40 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Brand Header */}
        <div className="h-16 px-6 border-b border-slate-100 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white shadow-subtle group-hover:bg-brand-700 transition-colors">
              <span className="font-bold text-sm tracking-tight">IQ</span>
            </div>
            <div>
              <span className="font-bold text-base text-slate-900 tracking-tight block">
                InterviewIQ
              </span>
              <span className="text-[10px] text-slate-400 font-medium block -mt-0.5">
                Career Intelligence
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {/* WORKING NOW SECTION */}
          <div>
            <div className="px-3 mb-2 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Working Now
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-100"></span>
            </div>
            <ul className="space-y-0.5">
              {workingNavItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        isActive
                          ? "bg-brand-50 text-brand-700 font-semibold"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon
                          className={cn(
                            "w-4 h-4",
                            isActive ? "text-brand-600" : "text-slate-400"
                          )}
                        />
                        <span>{item.name}</span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* COMING SOON SECTION */}
          <div>
            <div className="px-3 mb-2 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Coming Soon
              </span>
              <span className="text-[10px] text-slate-400 font-medium px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200">
                Preview
              </span>
            </div>
            <ul className="space-y-0.5">
              {comingSoonNavItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        isActive
                          ? "bg-slate-100 text-slate-900 font-semibold"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon
                          className={cn(
                            "w-4 h-4",
                            isActive ? "text-slate-700" : "text-slate-400"
                          )}
                        />
                        <span>{item.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                        Soon
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Footer profile & settings */}
        <div className="p-3 border-t border-slate-100 space-y-0.5">
          <Link
            href="/profile"
            onClick={onClose}
            className={cn(
              "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              pathname === "/profile"
                ? "bg-brand-50 text-brand-700 font-semibold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            )}
          >
            <User className="w-4 h-4 text-slate-400" />
            <span>Profile</span>
          </Link>
          <Link
            href="/settings"
            onClick={onClose}
            className={cn(
              "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              pathname === "/settings"
                ? "bg-brand-50 text-brand-700 font-semibold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            )}
          >
            <Settings className="w-4 h-4 text-slate-400" />
            <span>Settings</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
