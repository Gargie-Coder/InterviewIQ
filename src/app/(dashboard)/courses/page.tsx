"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import { ProgressBar } from "../../../components/ui/ProgressBar";
import {
  GraduationCap,
  Clock,
  BookOpen,
  CheckCircle2,
  Star,
  ExternalLink,
  Info,
} from "lucide-react";
import { DEMO_COURSES } from "../../../lib/demoData";
import { CourseItem } from "../../../types";

export default function CoursesPage() {
  const [courses, setCourses] = useState<CourseItem[]>(DEMO_COURSES);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Curated Course Recommendations
            </h1>
            <Badge variant="coming-soon" size="sm">
              Recommendation Engine — Coming Soon
            </Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Targeted instructional courses mapped to bridge candidate deficits identified during resume & interview evaluations.
          </p>
        </div>

        <Badge variant="neutral" size="sm" className="self-start sm:self-auto">
          Sample Course Catalog
        </Badge>
      </div>

      {/* Catalog Disclaimer Banner */}
      <div className="p-4 rounded-xl bg-slate-100/90 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
        <Info className="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" />
        <div>
          <strong className="text-slate-800 font-semibold block mb-0.5">
            Demonstration Curriculum Catalog
          </strong>
          These modules reflect representative educational pathways. Upon full integration with learning partner APIs, progress metrics will sync directly to candidate profile accounts.
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="flex flex-col justify-between hover:border-slate-300 transition-all">
            <CardHeader className="pb-3 border-b border-slate-100">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-brand-700">
                  {course.provider}
                </span>
                <div className="flex items-center gap-1 text-xs text-amber-600 font-medium">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{course.rating}</span>
                </div>
              </div>
              <CardTitle className="text-base sm:text-lg">
                {course.title}
              </CardTitle>
              <div className="flex items-center gap-3 text-xs text-slate-500 mt-2">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {course.duration}
                </span>
                <span>•</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 font-medium text-slate-700">
                  {course.level}
                </span>
              </div>
            </CardHeader>

            <CardContent className="pt-4 space-y-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  Skills Covered:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {course.skillsCovered.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {course.enrolled && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-600">
                    <span>Course Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <ProgressBar value={course.progress} size="sm" />
                </div>
              )}
            </CardContent>

            <CardFooter className="justify-between">
              <span className="text-xs text-slate-400">
                {course.enrolled ? "Currently Enrolled" : "Self-Paced Track"}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => alert(`Viewing demonstration syllabus for "${course.title}". Real external enrollment will be configured in production.`)}
                className="text-xs"
              >
                View Course (Demo)
                <ExternalLink className="w-3 h-3 ml-1 text-slate-400" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
