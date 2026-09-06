import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { RiskBadge } from '../common/RiskBadge';
import { SkillBadge } from '../common/SkillBadge';
import type { Employee } from '../../types';
import { MOCK_JOB_ROLES } from '../../data/mockData';
import { Star, Clock, AlertTriangle, ShieldCheck, Award, Briefcase, Mail, Building, TrendingUp } from 'lucide-react';

interface EmployeeDetailModalProps {
  employee: Employee | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EmployeeDetailModal: React.FC<EmployeeDetailModalProps> = ({
  employee,
  isOpen,
  onClose,
}) => {
  const [selectedRole, setSelectedRole] = useState<string>(MOCK_JOB_ROLES[0].id);

  if (!employee) return null;

  const currentRoleObj = MOCK_JOB_ROLES.find((r) => r.id === selectedRole) || MOCK_JOB_ROLES[0];
  const matchedSkills = currentRoleObj.requiredSkills.filter((s) =>
    employee.skills.map((es) => es.toLowerCase()).includes(s.toLowerCase())
  );
  const missingSkills = currentRoleObj.requiredSkills.filter(
    (s) => !employee.skills.map((es) => es.toLowerCase()).includes(s.toLowerCase())
  );
  const matchPercentage = Math.round(
    (matchedSkills.length / currentRoleObj.requiredSkills.length) * 100
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Employee Intelligence Profile"
      subtitle={`Comprehensive analytics & risk mapping for ${employee.name} (${employee.id})`}
      maxWidth="4xl"
    >
      <div className="space-y-6">
        {/* Header Profile Summary Card */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-4">
            <img
              src={employee.avatar}
              alt={employee.name}
              className="h-16 w-16 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900">{employee.name}</h2>
                <RiskBadge level={employee.currentRiskLevel} />
              </div>
              <p className="text-xs font-semibold text-indigo-600 mt-0.5">{employee.jobRole}</p>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Building className="h-3.5 w-3.5 text-slate-400" />
                  {employee.department}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5 text-slate-400" />
                  {employee.email}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="h-3.5 w-3.5 text-slate-400" />
                  {employee.experience} yrs exp
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end border-t sm:border-t-0 sm:border-l border-slate-200 pt-3 sm:pt-0 sm:pl-6 w-full sm:w-auto">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
              Retention Risk Score
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className={`text-3xl font-black ${
                employee.currentRiskLevel === 'High'
                  ? 'text-rose-600'
                  : employee.currentRiskLevel === 'Medium'
                  ? 'text-amber-600'
                  : 'text-emerald-600'
              }`}>
                {employee.attritionProbability}%
              </span>
              <span className="text-xs text-slate-500 font-medium">attrition prob.</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono mt-0.5">ML Model Output (Demo)</span>
          </div>
        </div>

        {/* Core Indicators Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-3">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Job Satisfaction</span>
            <div className="mt-1 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < employee.jobSatisfaction
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-200'
                  }`}
                />
              ))}
              <span className="ml-1 text-xs font-bold text-slate-700">{employee.jobSatisfaction}/5</span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-3">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Overtime Demand</span>
            <div className="mt-1 flex items-center gap-1.5">
              <Clock className={`h-4 w-4 ${employee.overtime === 'Yes' ? 'text-rose-500' : 'text-emerald-500'}`} />
              <span className={`text-sm font-bold ${employee.overtime === 'Yes' ? 'text-rose-700' : 'text-emerald-700'}`}>
                {employee.overtime === 'Yes' ? 'Frequent Overtime' : 'Normal Hours'}
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-3">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Salary Benchmark</span>
            <div className="mt-1 flex items-center gap-1.5">
              <Award className="h-4 w-4 text-indigo-500" />
              <span className="text-sm font-bold text-slate-800">{employee.salaryTier}</span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-3">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Last Promotion</span>
            <div className="mt-1 flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-bold text-slate-800">{employee.lastPromotionYears} yrs ago</span>
            </div>
          </div>
        </div>

        {/* Attrition ML Contributing Factors & Mitigation Strategy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-2 text-rose-700 font-semibold text-sm mb-3">
              <AlertTriangle className="h-4 w-4 text-rose-500" />
              <span>Primary Retention Risk Drivers</span>
            </div>
            <ul className="space-y-2 text-xs">
              {employee.primaryRiskFactors.map((factor, idx) => (
                <li key={idx} className="flex items-start gap-2 rounded-lg bg-rose-50/60 p-2 text-rose-900 border border-rose-100">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500 mt-1 shrink-0" />
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-2 text-indigo-700 font-semibold text-sm mb-3">
              <ShieldCheck className="h-4 w-4 text-indigo-600" />
              <span>HR Action Plan / Mitigation</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed rounded-lg bg-indigo-50/50 p-3 border border-indigo-100">
              {employee.mitigationStrategy || 'Maintain standard quarterly growth check-ins.'}
            </p>
          </div>
        </div>

        {/* Skill Mapping against Target Role */}
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b border-slate-100 pb-3">
            <div>
              <h4 className="text-sm font-bold text-slate-900">Target Role Skill Mapping</h4>
              <p className="text-xs text-slate-500">Evaluate employee against enterprise job profiles</p>
            </div>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {MOCK_JOB_ROLES.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.roleTitle}
                </option>
              ))}
            </select>
          </div>

          {/* Match Score Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-slate-700">Skill Compatibility Score</span>
              <span className={matchPercentage >= 75 ? 'text-emerald-600' : matchPercentage >= 50 ? 'text-amber-600' : 'text-rose-600'}>
                {matchPercentage}% Match ({matchedSkills.length}/{currentRoleObj.requiredSkills.length} skills)
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  matchPercentage >= 75 ? 'bg-emerald-500' : matchPercentage >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                }`}
                style={{ width: `${matchPercentage}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-2">
                ✓ Matched Skills ({matchedSkills.length})
              </span>
              <div className="flex flex-wrap gap-1.5">
                {matchedSkills.length > 0 ? (
                  matchedSkills.map((s) => <SkillBadge key={s} skill={s} variant="matched" />)
                ) : (
                  <span className="text-xs text-slate-400">No overlapping skills found</span>
                )}
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-rose-800 uppercase tracking-wider block mb-2">
                ⚠ Missing Skill Gaps ({missingSkills.length})
              </span>
              <div className="flex flex-wrap gap-1.5">
                {missingSkills.length > 0 ? (
                  missingSkills.map((s) => <SkillBadge key={s} skill={s} variant="missing" />)
                ) : (
                  <span className="text-xs text-emerald-600 font-semibold">100% Skill coverage achieved!</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
