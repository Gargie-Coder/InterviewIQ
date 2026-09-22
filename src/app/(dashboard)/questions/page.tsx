"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import {
  Search,
  Filter,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Code2,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { DEMO_QUESTION_BANK } from "../../../lib/demoData";
import { QuestionBankItem } from "../../../types";

export default function QuestionBankPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [expandedId, setExpandedId] = useState<string | null>("qb-1");

  const topics = [
    "All",
    "Python",
    "SQL",
    "System Design",
    "Data Structures",
    "React",
    "Operating Systems",
    "Java",
    "Node.js",
    "DBMS",
    "Computer Networks",
  ];

  const difficulties = ["All", "Easy", "Medium", "Hard"];
  const types = ["All", "Conceptual", "Coding", "Scenario-based", "MCQ", "Debugging"];

  const filteredQuestions = DEMO_QUESTION_BANK.filter((q) => {
    const matchesSearch =
      searchQuery === "" ||
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTopic = selectedTopic === "All" || q.topic === selectedTopic;
    const matchesDiff = selectedDifficulty === "All" || q.difficulty === selectedDifficulty;
    const matchesType = selectedType === "All" || q.type === selectedType;

    return matchesSearch && matchesTopic && matchesDiff && matchesType;
  });

  const getDifficultyBadge = (diff: "Easy" | "Medium" | "Hard") => {
    if (diff === "Easy") return <Badge variant="success" size="sm">Easy</Badge>;
    if (diff === "Medium") return <Badge variant="warning" size="sm">Medium</Badge>;
    return <Badge variant="error" size="sm">Hard</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Topic-Based Question Bank
            </h1>
            <Badge variant="default" size="sm">
              Curated Repository
            </Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Searchable repository of foundational and scenario-based interview questions with model answers.
          </p>
        </div>

        <Badge variant="neutral" size="sm" className="self-start sm:self-auto">
          {filteredQuestions.length} Questions Displayed
        </Badge>
      </div>

      {/* Filter and Search Bar */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, question text, or keyword (e.g., 'LRU', 'GIL', 'Index')..."
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            {/* Topic Filter */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                Filter by Topic:
              </label>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-500"
              >
                {topics.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                Filter by Difficulty:
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-500"
              >
                {difficulties.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                Filter by Question Type:
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-500"
              >
                {types.map((tp) => (
                  <option key={tp}>{tp}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Question Cards List */}
      <div className="space-y-3">
        {filteredQuestions.map((q) => {
          const isExpanded = expandedId === q.id;
          return (
            <Card key={q.id} className="transition-all hover:border-slate-300">
              <div
                onClick={() => setExpandedId(isExpanded ? null : q.id)}
                className="p-5 cursor-pointer flex items-start justify-between gap-4 select-none"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                      {q.topic}
                    </span>
                    {getDifficultyBadge(q.difficulty)}
                    <Badge variant="neutral" size="sm">
                      {q.type}
                    </Badge>
                  </div>

                  <h3 className="font-semibold text-slate-900 text-sm sm:text-base pt-1">
                    {q.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {q.question}
                  </p>
                </div>

                <div className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex-shrink-0">
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </div>

              {/* Collapsible Answer Guidance */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/50">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                      <BookOpen className="w-4 h-4 text-brand-600" />
                      Model Answer Guidance & Key Talking Points
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {q.answerGuidance}
                    </p>
                  </div>
                </div>
              )}
            </Card>
          );
        })}

        {filteredQuestions.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200 p-6">
            <HelpCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-800">No questions matched the selected filters.</p>
            <p className="text-xs text-slate-500 mt-1">Try resetting the topic or difficulty dropdowns.</p>
          </div>
        )}
      </div>
    </div>
  );
}
