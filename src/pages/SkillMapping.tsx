import React, { useState } from 'react';
import type { Employee } from '../types';
import { MOCK_JOB_ROLES, MOCK_SKILL_GAPS } from '../data/mockData';
import { SkillBadge } from '../components/common/SkillBadge';
import { Target, CheckCircle2, AlertCircle, UserCheck, Briefcase, Zap } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface SkillMappingProps {
  employees: Employee[];
}

export const SkillMapping: React.FC<SkillMappingProps> = ({ employees }) => {
  const [selectedEmpId, setSelectedEmpId] = useState<string>(employees[0]?.id || '');
  const [selectedRoleId, setSelectedRoleId] = useState<string>(MOCK_JOB_ROLES[0]?.id || '');

  const selectedEmp = employees.find((e) => e.id === selectedEmpId) || employees[0];
  const selectedRole = MOCK_JOB_ROLES.find((r) => r.id === selectedRoleId) || MOCK_JOB_ROLES[0];

  // Calculated skill matching comparison
  const empSkillsLower = selectedEmp.skills.map((s) => s.toLowerCase());
  const matchedSkills = selectedRole.requiredSkills.filter((s) =>
    empSkillsLower.includes(s.toLowerCase())
  );
  const missingSkills = selectedRole.requiredSkills.filter(
    (s) => !empSkillsLower.includes(s.toLowerCase())
  );
  const matchPercentage = Math.round(
    (matchedSkills.length / selectedRole.requiredSkills.length) * 100
  );

  return (
    <div className="space-y-6">
      {/* Page Header Banner */}
      <div className="rounded-xl border border-indigo-100 bg-white p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Target className="h-6 w-6 text-indigo-600" />
            Workforce Skill Gap & Target Role Mapper
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Select an employee and target project role to compute skill compatibility, overlap, and missing gaps.
          </p>
        </div>
      </div>

      {/* Interactive Matcher Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Card: Employee & Target Role Selection */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            1. Select Employee & Target Role
          </h3>

          {/* Employee Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <UserCheck className="h-3.5 w-3.5 text-indigo-600" />
              Select Employee
            </label>
            <select
              value={selectedEmpId}
              onChange={(e) => setSelectedEmpId(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name} ({emp.department} - {emp.jobRole})
                </option>
              ))}
            </select>
          </div>

          {/* Target Role Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <Briefcase className="h-3.5 w-3.5 text-indigo-600" />
              Select Target Job / Project Profile
            </label>
            <select
              value={selectedRoleId}
              onChange={(e) => setSelectedRoleId(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {MOCK_JOB_ROLES.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.roleTitle} ({role.department})
                </option>
              ))}
            </select>
          </div>

          {/* Selected Employee Quick Card */}
          <div className="rounded-lg bg-slate-50 p-3 border border-slate-200 text-xs">
            <div className="flex items-center gap-3">
              <img
                src={selectedEmp.avatar}
                alt={selectedEmp.name}
                className="h-10 w-10 rounded-full object-cover border border-slate-200"
              />
              <div>
                <span className="font-bold text-slate-900 block">{selectedEmp.name}</span>
                <span className="text-[11px] text-slate-500">{selectedEmp.jobRole}</span>
                <span className="text-[10px] text-indigo-600 block font-semibold">{selectedEmp.experience} Years Exp</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Compatibility Score & Skill Comparison Result Card */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Skill Compatibility Engine Output</h3>
              <p className="text-xs text-slate-500">
                Comparing <span className="font-semibold text-slate-800">{selectedEmp.name}</span> against <span className="font-semibold text-slate-800">{selectedRole.roleTitle}</span>
              </p>
            </div>

            {/* Circular / Pill Score Display */}
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl">
              <Zap className={`h-5 w-5 ${matchPercentage >= 75 ? 'text-emerald-500' : matchPercentage >= 50 ? 'text-amber-500' : 'text-rose-500'}`} />
              <div>
                <span className="text-xs font-semibold text-slate-500 block">Match Score</span>
                <span className={`text-xl font-black ${matchPercentage >= 75 ? 'text-emerald-600' : matchPercentage >= 50 ? 'text-amber-600' : 'text-rose-600'}`}>
                  {matchPercentage}%
                </span>
              </div>
            </div>
          </div>

          {/* Compatibility Progress Bar */}
          <div>
            <div className="flex justify-between text-xs font-bold mb-1.5">
              <span className="text-slate-700">Matched Skills ({matchedSkills.length} / {selectedRole.requiredSkills.length})</span>
              <span className="text-slate-500">{selectedRole.requiredSkills.length - matchedSkills.length} Missing Gaps</span>
            </div>
            <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  matchPercentage >= 75 ? 'bg-emerald-500' : matchPercentage >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                }`}
                style={{ width: `${matchPercentage}%` }}
              />
            </div>
          </div>

          {/* Side-by-side Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* Current Employee Skills */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">
                Employee's Current Skills ({selectedEmp.skills.length})
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedEmp.skills.map((s) => (
                  <SkillBadge key={s} skill={s} />
                ))}
              </div>
            </div>

            {/* Target Role Required Skills */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">
                Target Role Requirements ({selectedRole.requiredSkills.length})
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedRole.requiredSkills.map((s) => (
                  <SkillBadge key={s} skill={s} />
                ))}
              </div>
            </div>
          </div>

          {/* Computed Results: Matched vs Missing Skill Gap */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-100 pt-4">
            {/* Matched Skills Box */}
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs mb-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Matched Skills ({matchedSkills.length})</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {matchedSkills.length > 0 ? (
                  matchedSkills.map((s) => <SkillBadge key={s} skill={s} variant="matched" />)
                ) : (
                  <span className="text-xs text-slate-400">No overlapping skills found</span>
                )}
              </div>
            </div>

            {/* Skill Gap Box */}
            <div className="rounded-xl border border-rose-200 bg-rose-50/60 p-4">
              <div className="flex items-center gap-2 text-rose-800 font-bold text-xs mb-2">
                <AlertCircle className="h-4 w-4 text-rose-600" />
                <span>Skill Gap / Missing Skills ({missingSkills.length})</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {missingSkills.length > 0 ? (
                  missingSkills.map((s) => <SkillBadge key={s} skill={s} variant="missing" />)
                ) : (
                  <span className="text-xs font-bold text-emerald-700">100% Perfect Match! No Skill Gap</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Department-level Skill Gap Summary Section */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="border-b border-slate-100 pb-3 mb-4">
          <h3 className="text-base font-bold text-slate-900">Department-Level Skill Gap Matrix</h3>
          <p className="text-xs text-slate-500">Summary of aggregate missing competencies across departments</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Table of Skill Gaps */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="py-2.5 px-3">Missing Competency</th>
                  <th className="py-2.5 px-3">Domain Category</th>
                  <th className="py-2.5 px-3 text-center">Missing Count</th>
                  <th className="py-2.5 px-3">Priority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {MOCK_SKILL_GAPS.map((sg) => (
                  <tr key={sg.skillName} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-bold text-slate-900">{sg.skillName}</td>
                    <td className="py-3 px-3 text-slate-600">{sg.category}</td>
                    <td className="py-3 px-3 text-center font-mono font-bold text-indigo-600">{sg.missingCount} Staff</td>
                    <td className="py-3 px-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        sg.priority === 'Critical'
                          ? 'bg-rose-100 text-rose-800'
                          : sg.priority === 'Moderate'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {sg.priority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Visual Bar Chart of Skill Gaps */}
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_SKILL_GAPS} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="skillName" tick={{ fill: '#475569', fontSize: 9, fontWeight: 600 }} angle={-15} textAnchor="end" />
                <YAxis tick={{ fill: '#475569', fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', fontSize: '12px' }} />
                <Bar dataKey="missingCount" name="Staff Missing Skill" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
