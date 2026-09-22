"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "../../context/AppContext";
import { Button } from "../../components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../components/ui/Card";
import { Sparkles } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const { loadDemoData } = useApp();
  const [name, setName] = useState("Alex Sharma");
  const [email, setEmail] = useState("alex.sharma@example.com");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadDemoData();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-brand-600 text-white font-bold text-base flex items-center justify-center shadow-subtle">
            IQ
          </div>
          <span className="font-bold text-2xl text-slate-900 tracking-tight">
            InterviewIQ
          </span>
        </Link>
        <h2 className="mt-4 text-xl font-bold text-slate-900">
          Create candidate account
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Start benchmarking your career profile with AI intelligence
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Role
                </label>
                <select
                  defaultValue="Software Engineer"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                >
                  <option>Software Engineer</option>
                  <option>Backend Developer</option>
                  <option>Frontend Developer</option>
                  <option>Full Stack Developer</option>
                  <option>Data Analyst</option>
                  <option>Data Scientist</option>
                  <option>DevOps Engineer</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  defaultValue="demoPassword123"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <Button type="submit" variant="primary" className="w-full mt-2 font-semibold">
                Complete Registration
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center text-xs text-slate-500">
            Already have an account?{" "}
            <Link href="/login" className="ml-1 text-brand-600 font-medium hover:underline">
              Sign In
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
