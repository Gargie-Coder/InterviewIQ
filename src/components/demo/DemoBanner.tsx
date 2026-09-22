"use client";

import React from "react";
import { useApp } from "../../context/AppContext";
import { Info, Sparkles, RefreshCw } from "lucide-react";

export function DemoBanner() {
  const { isDemoMode, loadDemoData } = useApp();

  if (!isDemoMode) return null;

  return (
    <div className="bg-slate-900 text-slate-100 text-xs px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 shadow-subtle">
      <div className="flex items-center gap-2">
        <span className="p-1 rounded bg-slate-800 text-brand-300">
          <Info className="w-3.5 h-3.5" />
        </span>
        <span>
          <strong>Prototype Evaluation Mode:</strong> Populated with candidate profile{" "}
          <strong className="underline decoration-slate-500">Alex Sharma</strong> (Software Engineer). Core tools are functional; upcoming modules are marked with preview states.
        </span>
      </div>
      <button
        onClick={loadDemoData}
        className="text-[11px] font-medium text-slate-300 hover:text-white flex items-center gap-1 bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded transition-colors"
      >
        <RefreshCw className="w-3 h-3" />
        <span>Reset Candidate</span>
      </button>
    </div>
  );
}
