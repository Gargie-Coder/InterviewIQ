"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "../../context/AppContext";
import { Button } from "../../components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Modal } from "../../components/ui/Modal";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { loadDemoData } = useApp();
  const [email, setEmail] = useState("alex.sharma@example.com");
  const [password, setPassword] = useState("••••••••••••");
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const handleDemoLogin = () => {
    loadDemoData();
    router.push("/dashboard");
  };

  const handleStandardLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResetSent(true);
    setTimeout(() => {
      setResetSent(false);
      setIsForgotPasswordOpen(false);
    }, 2000);
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
          Sign in to your account
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          "Prepare smarter. Interview better."
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        {/* Quick Demo Login Callout */}
        <div className="mb-4 bg-brand-50/70 border border-brand-200 rounded-xl p-4 text-center">
          <Badge variant="default" size="sm" className="mb-2">
            Evaluator Fast Access
          </Badge>
          <p className="text-xs text-slate-600 mb-3">
            Skip manual credential entry and immediately launch the pre-populated candidate dashboard.
          </p>
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={handleDemoLogin}
            className="w-full font-semibold shadow-subtle flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-brand-200" />
            Continue with Demo Account (Alex Sharma)
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-400 font-medium">
                  Or enter credentials
                </span>
              </div>
            </div>

            <form onSubmit={handleStandardLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsForgotPasswordOpen(true)}
                    className="text-xs text-brand-600 hover:text-brand-700 font-medium"
                  >
                    Forgot password?
                  </button>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                />
              </div>

              <Button type="submit" variant="outline" className="w-full">
                Sign In
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center text-xs text-slate-500">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="ml-1 text-brand-600 font-medium hover:underline">
              Create one
            </Link>
          </CardFooter>
        </Card>
      </div>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
        title="Reset your password"
      >
        {resetSent ? (
          <div className="text-center py-4">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
            <h4 className="font-semibold text-slate-900">Reset Link Dispatched</h4>
            <p className="text-xs text-slate-500 mt-1">
              Instructions have been simulated for {forgotEmail || email}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleForgotSubmit} className="space-y-4">
            <p className="text-xs text-slate-600">
              Enter your verified email address and we will provide a recovery link.
            </p>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                required
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsForgotPasswordOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Send Reset Link
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
