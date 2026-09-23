"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import {
  Settings,
  Bell,
  Lock,
  Moon,
  Sun,
  Shield,
  CheckCircle2,
  Save,
} from "lucide-react";

export default function SettingsPage() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [anonymizeData, setAnonymizeData] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Platform Settings
            </h1>
            <Badge variant="default" size="sm">
              Preferences
            </Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Manage your account preferences, notification thresholds, and privacy controls.
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Preferences Saved
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Account Section */}
        <Card>
          <CardHeader className="pb-3 border-b border-slate-100">
            <CardTitle className="text-base flex items-center gap-2">
              <Lock className="w-4 h-4 text-brand-600" />
              Account & Credentials
            </CardTitle>
            <CardDescription className="text-xs">
              Manage authentication security and session lifetime.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4 space-y-3 text-xs sm:text-sm">
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <div>
                <strong className="text-slate-800 block">Password</strong>
                <span className="text-slate-500 text-xs">Last updated 14 days ago</span>
              </div>
              <Button variant="outline" size="sm" className="text-xs">
                Update Password
              </Button>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <strong className="text-slate-800 block">Two-Factor Authentication</strong>
                <span className="text-slate-500 text-xs">Protect your evaluation records with TOTP</span>
              </div>
              <Badge variant="neutral" size="sm">
                Disabled (Prototype)
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Appearance Section */}
        <Card>
          <CardHeader className="pb-3 border-b border-slate-100">
            <CardTitle className="text-base flex items-center gap-2">
              <Sun className="w-4 h-4 text-brand-600" />
              Interface Theme & Appearance
            </CardTitle>
            <CardDescription className="text-xs">
              InterviewIQ is calibrated light-first for optimal legibility during academic review.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-2 gap-4 max-w-sm">
              <div className="p-3 rounded-lg border-2 border-brand-600 bg-white shadow-subtle flex items-center gap-2.5">
                <Sun className="w-4 h-4 text-brand-600" />
                <div>
                  <strong className="text-xs text-slate-900 block">Clean Light</strong>
                  <span className="text-[10px] text-slate-500">Active Standard</span>
                </div>
              </div>
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 opacity-60 flex items-center gap-2.5 cursor-not-allowed">
                <Moon className="w-4 h-4 text-slate-400" />
                <div>
                  <strong className="text-xs text-slate-600 block">Dark Canvas</strong>
                  <span className="text-[10px] text-slate-400">Restricted by Spec</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications Section */}
        <Card>
          <CardHeader className="pb-3 border-b border-slate-100">
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="w-4 h-4 text-brand-600" />
              Evaluation Alerts & Notifications
            </CardTitle>
            <CardDescription className="text-xs">
              Select what events dispatch communications to your registered email.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4 space-y-3">
            <label className="flex items-center justify-between cursor-pointer py-1.5">
              <div className="text-xs">
                <strong className="text-slate-800 block">Mock Interview Completion Digest</strong>
                <span className="text-slate-500">Receive detailed scoring breakdown after each interview round</span>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer py-1.5">
              <div className="text-xs">
                <strong className="text-slate-800 block">Weekly Preparation Progress Report</strong>
                <span className="text-slate-500">Summary of skill deltas and completed roadmap stages</span>
              </div>
              <input
                type="checkbox"
                checked={weeklyDigest}
                onChange={(e) => setWeeklyDigest(e.target.checked)}
                className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300"
              />
            </label>
          </CardContent>
        </Card>

        {/* Privacy Section */}
        <Card>
          <CardHeader className="pb-3 border-b border-slate-100">
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="w-4 h-4 text-brand-600" />
              Privacy & Data Anonymization
            </CardTitle>
            <CardDescription className="text-xs">
              Data handling controls for candidate evaluation models.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4 space-y-3">
            <label className="flex items-center justify-between cursor-pointer py-1.5">
              <div className="text-xs">
                <strong className="text-slate-800 block">Anonymize Evaluation Telemetry</strong>
                <span className="text-slate-500">Strip personal identifiers before submitting research logs</span>
              </div>
              <input
                type="checkbox"
                checked={anonymizeData}
                onChange={(e) => setAnonymizeData(e.target.checked)}
                className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300"
              />
            </label>
          </CardContent>
        </Card>

        <div className="flex justify-end pt-2">
          <Button variant="primary" size="md" onClick={handleSave} className="font-semibold shadow-subtle">
            <Save className="w-4 h-4 mr-1.5" />
            Save Preferences
          </Button>
        </div>
      </div>
    </div>
  );
}
