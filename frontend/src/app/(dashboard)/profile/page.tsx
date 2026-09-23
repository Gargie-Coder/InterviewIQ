"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "../../../context/AppContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import { User, CheckCircle2, Save } from "lucide-react";
import { RoleType } from "../../../types";

export default function ProfilePage() {
  const { user, updateUser } = useApp();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [targetRole, setTargetRole] = useState<RoleType>(user?.targetRole || "Software Engineer");
  const [experienceYears, setExperienceYears] = useState(user?.experienceYears || 1);
  const [education, setEducation] = useState(user?.education || "");
  const [skillsInput, setSkillsInput] = useState(user?.skills?.join(", ") || "");
  const [interviewType, setInterviewType] = useState(user?.preferredInterviewType || "Mixed");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setTargetRole(user.targetRole);
      setExperienceYears(user.experienceYears);
      setEducation(user.education);
      setSkillsInput(user.skills.join(", "));
      setInterviewType(user.preferredInterviewType);
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const parsedSkills = skillsInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const ok = await updateUser({
      name,
      targetRole,
      experienceYears: Number(experienceYears),
      education,
      skills: parsedSkills,
      preferredInterviewType: interviewType,
    });

    setIsSaving(false);
    if (ok) {
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    }
  };

  const getInitials = (n?: string) => {
    if (!n) return "U";
    return n
      .split(" ")
      .map((p) => p[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Candidate Profile
            </h1>
            <Badge variant="default" size="sm">
              Editable
            </Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Manage your personal qualifications, target track, and preferred mock interview settings.
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Profile updated successfully
          </div>
        )}
      </div>

      <Card>
        <CardHeader className="pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-slate-900 text-white text-base font-bold flex items-center justify-center">
              {getInitials(name)}
            </div>
            <div>
              <CardTitle className="text-lg">{name || "Candidate"}</CardTitle>
              <CardDescription>{targetRole} • {experienceYears} Years Experience</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  disabled
                  value={email}
                  className="w-full px-3 py-2 border border-slate-200 bg-slate-100 rounded-lg text-sm text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Career Role
                </label>
                <select
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value as RoleType)}
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
                  Years of Professional Experience
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Highest Academic Qualification
              </label>
              <input
                type="text"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                placeholder="e.g. B.S. Computer Science"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Technical Skills (comma separated)
              </label>
              <textarea
                rows={2}
                value={skillsInput}
                onChange={(e) => setSkillsInput(e.target.value)}
                placeholder="Python, SQL, React, Git, REST APIs..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Preferred Mock Interview Focus
              </label>
              <div className="grid grid-cols-3 gap-3 pt-1">
                {(["Mixed", "Technical", "Behavioral"] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setInterviewType(type)}
                    className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all ${
                      interviewType === type
                        ? "border-brand-600 bg-brand-50 text-brand-700 ring-2 ring-brand-500/20"
                        : "border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isSaving}
                className="font-semibold shadow-subtle"
              >
                <Save className="w-4 h-4 mr-1.5" />
                Save Profile Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
