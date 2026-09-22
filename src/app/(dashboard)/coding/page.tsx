"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import {
  Code2,
  Play,
  Send,
  Terminal,
  Clock,
  Cpu,
  CheckCircle2,
  Info,
  ChevronDown,
  RotateCcw,
} from "lucide-react";

export default function CodingInterviewPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("Python (3.11)");
  const [activeTab, setActiveTab] = useState<"test1" | "test2" | "test3">("test1");

  const starterCode = `class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}  # key -> node
        # Double linked list pointers for O(1) eviction
        self.head, self.tail = Node(0, 0), Node(0, 0)
        self.head.next, self.tail.prev = self.tail, self.head

    def get(self, key: int) -> int:
        if key in self.cache:
            self._remove(self.cache[key])
            self._insert(self.cache[key])
            return self.cache[key].val
        return -1

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self._remove(self.cache[key])
        self.cache[key] = Node(key, value)
        self._insert(self.cache[key])
        if len(self.cache) > self.capacity:
            lru = self.head.next
            self._remove(lru)
            del self.cache[lru.key]
`;

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Live Coding Sandbox
            </h1>
            <Badge variant="coming-soon" size="sm">
              Sandbox Engine — Under Development
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Algorithmic problem-solving workspace designed for timed technical evaluations.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Badge variant="neutral" size="sm" className="hidden sm:inline-flex">
            Timer: 45:00 Remaining
          </Badge>
        </div>
      </div>

      {/* Planned Feature Architecture Banner */}
      <div className="p-3.5 rounded-xl bg-slate-100/90 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
        <Info className="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" />
        <div>
          <strong className="text-slate-800 font-semibold block mb-0.5">
            Isolated Sandboxed Execution Environment (Staged for Release)
          </strong >
          This module is designed to connect to an isolated gVisor/Firecracker micro-VM backend for sandboxed code execution, memory profiling, and dynamic test case validation. The layout below demonstrates the production candidate experience.
        </div>
      </div>

      {/* Split Pane IDE Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* LEFT PANE: Problem Statement */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="h-full flex flex-col justify-between">
            <CardHeader className="pb-3 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <Badge variant="warning" size="sm">
                  Medium
                </Badge>
                <span className="text-xs text-slate-400">Problem #146</span>
              </div>
              <CardTitle className="text-lg mt-1">LRU Cache Implementation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed pt-3 overflow-y-auto max-h-[520px]">
              <p>
                Design a data structure that follows the constraints of a <strong>Least Recently Used (LRU)</strong> cache.
              </p>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 font-mono text-xs space-y-1">
                <div><strong>LRUCache(int capacity)</strong>: Initialize the LRU cache with positive size capacity.</div>
                <div><strong>int get(int key)</strong>: Return the value of the key if it exists, otherwise return -1.</div>
                <div><strong>void put(int key, int value)</strong>: Update or insert the key-value pair.</div>
              </div>

              <div className="space-y-2">
                <strong className="text-slate-900 block text-xs uppercase tracking-wider">
                  Complexity Constraints:
                </strong>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className="px-2 py-1 bg-slate-100 rounded border border-slate-200">
                    Time: O(1) per op
                  </span>
                  <span className="px-2 py-1 bg-slate-100 rounded border border-slate-200">
                    Space: O(capacity)
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <strong className="text-slate-900 block text-xs uppercase tracking-wider">
                  Sample Test Scenario:
                </strong>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 font-mono text-xs text-slate-800 space-y-1">
                  <div>Input: ["LRUCache", "put", "put", "get", "put", "get"]</div>
                  <div>Values: [[2], [1, 1], [2, 2], [1], [3, 3], [2]]</div>
                  <div>Expected Output: [null, null, null, 1, null, -1]</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT PANE: Code Editor & Execution Sandbox */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="flex flex-col">
            {/* Editor Toolbar */}
            <div className="px-4 py-2.5 bg-slate-100/70 border-b border-slate-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700">Language:</span>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="bg-white border border-slate-300 rounded px-2 py-1 font-medium text-slate-800 text-xs focus:outline-none"
                >
                  <option>Python (3.11)</option>
                  <option>Java (OpenJDK 21)</option>
                  <option>TypeScript (Node 20)</option>
                  <option>C++ (GCC 13)</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-7 text-xs text-slate-600">
                  <RotateCcw className="w-3 h-3 mr-1" />
                  Reset Code
                </Button>
              </div>
            </div>

            {/* Code Body Area */}
            <div className="p-4 bg-slate-900 text-slate-100 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto min-h-[300px]">
              <pre className="text-slate-200">{starterCode}</pre>
            </div>

            {/* Editor Bottom Actions */}
            <div className="p-3 bg-white border-t border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  Time Limit: 2.0s
                </span>
                <span className="flex items-center gap-1">
                  <Cpu className="w-3.5 h-3.5" />
                  Memory Limit: 256MB
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => alert("Sandbox execution engine will be activated upon integration of isolated micro-VM runners.")}
                  className="text-xs"
                >
                  <Play className="w-3.5 h-3.5 mr-1 text-brand-600" />
                  Run Code
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => alert("Code submission will be scored against hidden benchmark test cases once sandbox is active.")}
                  className="text-xs font-semibold"
                >
                  <Send className="w-3.5 h-3.5 mr-1" />
                  Submit Solution
                </Button>
              </div>
            </div>
          </Card>

          {/* Test Cases Panel */}
          <Card>
            <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab("test1")}
                  className={`px-3 py-1 rounded text-xs font-semibold ${
                    activeTab === "test1" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  Test Case 1
                </button>
                <button
                  onClick={() => setActiveTab("test2")}
                  className={`px-3 py-1 rounded text-xs font-semibold ${
                    activeTab === "test2" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  Test Case 2
                </button>
                <button
                  onClick={() => setActiveTab("test3")}
                  className={`px-3 py-1 rounded text-xs font-semibold ${
                    activeTab === "test3" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  Test Case 3
                </button>
              </div>
              <Badge variant="coming-soon" size="sm">
                Sandbox Test Runner
              </Badge>
            </div>

            <CardContent className="p-4 text-xs font-mono space-y-2">
              <div className="text-slate-500">Input: capacity = 2, operations = ["put(1,1)", "put(2,2)", "get(1)"]</div>
              <div className="text-slate-500">Expected: [null, null, 1]</div>
              <div className="text-emerald-700 bg-emerald-50 p-2 rounded border border-emerald-200">
                Status: Staged for Sandbox Execution (Isolated Container)
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
