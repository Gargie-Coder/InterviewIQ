"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "../../context/AppContext";
import { Button } from "../../components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../components/ui/Card";
import { AlertCircle, ArrowRight, User, Mail, Lock, Briefcase } from "lucide-react";
import { RoleType } from "../../types";

export default function SignUpPage() {
  const router = useRouter();
  const { signup } = useApp();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [targetRole, setTargetRole] = useState<RoleType>("Software Engineer");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    setIsSubmitting(true);
    const result = await signup(name, email, password, targetRole);
    setIsSubmitting(false);

    if (result.success) {
      router.push("/dashboard");
    } else {
      setErrorMessage(result.error || "Failed to create account.");
    }
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
            {errorMessage && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Career Role
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <select
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value as RoleType)}
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
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
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password (min. 6 characters)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isSubmitting}
                className="w-full font-semibold shadow-subtle mt-2"
              >
                Create Account
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center text-xs text-slate-500">
            Already have an account?{" "}
            <Link href="/login" className="ml-1 text-brand-600 font-semibold hover:underline">
              Sign In
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
