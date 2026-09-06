import React from 'react';
import { MOCK_DEPARTMENT_STATS } from '../data/mockData';
import { FileText, Download, FileSpreadsheet, TrendingDown, Users, Target, Building } from 'lucide-react';

interface ReportsProps {
  onOpenExportModal: () => void;
}

export const Reports: React.FC<ReportsProps> = ({ onOpenExportModal }) => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Workforce Analytics Reports & Insights</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Executive summaries, department intelligence benchmarks, and exportable audit documents
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenExportModal}
            className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Download className="h-4 w-4" />
            <span>Generate & Export Report</span>
          </button>
        </div>
      </div>

      {/* 3 Core Summaries Row: Workforce, Attrition, Skill Gap */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1. Workforce Summary Card */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Users className="h-4 w-4 text-indigo-600" />
                Workforce Health Summary
              </span>
              <span className="rounded bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700">Q3 Audit</span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-700">
              <li className="flex justify-between border-b border-slate-50 pb-1.5">
                <span className="text-slate-500">Total Active Staff:</span>
                <span className="font-bold text-slate-900">148 Employees</span>
              </li>
              <li className="flex justify-between border-b border-slate-50 pb-1.5">
                <span className="text-slate-500">Departments Operating:</span>
                <span className="font-bold text-slate-900">5 Divisions</span>
              </li>
              <li className="flex justify-between border-b border-slate-50 pb-1.5">
                <span className="text-slate-500">Avg Employee Experience:</span>
                <span className="font-bold text-slate-900">4.8 Years</span>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-500">Workforce Satisfaction:</span>
                <span className="font-bold text-emerald-600">3.6 / 5.0 Benchmark</span>
              </li>
            </ul>
          </div>

          <div className="mt-4 rounded-lg bg-slate-50 p-2.5 border border-slate-100 text-[11px] text-slate-600">
            ✓ Headcount growth is steady with high stability in Marketing and HR divisions.
          </div>
        </div>

        {/* 2. Attrition Summary Card */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <TrendingDown className="h-4 w-4 text-rose-500" />
                Attrition Risk Summary
              </span>
              <span className="rounded bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-700">ML Predicted</span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-700">
              <li className="flex justify-between border-b border-slate-50 pb-1.5">
                <span className="text-slate-500">High Risk Count:</span>
                <span className="font-bold text-rose-600">14 Staff (9.4%)</span>
              </li>
              <li className="flex justify-between border-b border-slate-50 pb-1.5">
                <span className="text-slate-500">Medium Risk Count:</span>
                <span className="font-bold text-amber-600">32 Staff (21.6%)</span>
              </li>
              <li className="flex justify-between border-b border-slate-50 pb-1.5">
                <span className="text-slate-500">Highest Risk Dept:</span>
                <span className="font-bold text-slate-900">Engineering (42% OT)</span>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-500">Primary Risk Factor:</span>
                <span className="font-bold text-slate-900">Overtime & Salary Gap</span>
              </li>
            </ul>
          </div>

          <div className="mt-4 rounded-lg bg-rose-50/70 p-2.5 border border-rose-100 text-[11px] text-rose-900">
            ⚠ Urgent intervention needed for Senior Engineers on frequent overtime.
          </div>
        </div>

        {/* 3. Skill-Gap Summary Card */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Target className="h-4 w-4 text-emerald-600" />
                Skill Gap Summary
              </span>
              <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">5 Gaps Flagged</span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-700">
              <li className="flex justify-between border-b border-slate-50 pb-1.5">
                <span className="text-slate-500">Critical Skill Gaps:</span>
                <span className="font-bold text-rose-600">Kubernetes, MLOps, TS</span>
              </li>
              <li className="flex justify-between border-b border-slate-50 pb-1.5">
                <span className="text-slate-500">Staff Needing Upskilling:</span>
                <span className="font-bold text-slate-900">41 Employees</span>
              </li>
              <li className="flex justify-between border-b border-slate-50 pb-1.5">
                <span className="text-slate-500">Avg Skill Coverage:</span>
                <span className="font-bold text-slate-900">76% Target Match</span>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-500">Recommended Path:</span>
                <span className="font-bold text-indigo-600">Internal Cloud Bootcamp</span>
              </li>
            </ul>
          </div>

          <div className="mt-4 rounded-lg bg-emerald-50/70 p-2.5 border border-emerald-100 text-[11px] text-emerald-900">
            ✓ Internal upskilling program recommended to bridge MLOps and TypeScript gaps.
          </div>
        </div>
      </div>

      {/* Detailed Department Insights Table */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Department Performance & Risk Matrix</h3>
            <p className="text-xs text-slate-500">Comparative metrics across organizational divisions</p>
          </div>
          <button
            onClick={onOpenExportModal}
            className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
          >
            <FileSpreadsheet className="h-4 w-4" />
            <span>Download CSV</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4 text-center">Headcount</th>
                <th className="py-3 px-4 text-center">High Risk</th>
                <th className="py-3 px-4 text-center">Med Risk</th>
                <th className="py-3 px-4 text-center">Low Risk</th>
                <th className="py-3 px-4 text-center">Avg Satisfaction</th>
                <th className="py-3 px-4 text-center">Overtime Rate</th>
                <th className="py-3 px-4 text-center">Skill Gaps</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {MOCK_DEPARTMENT_STATS.map((dept) => (
                <tr key={dept.department} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                    <Building className="h-4 w-4 text-slate-400" />
                    {dept.department}
                  </td>
                  <td className="py-3 px-4 text-center font-bold text-slate-800">{dept.totalEmployees}</td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-rose-600">{dept.highRisk}</td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-amber-600">{dept.mediumRisk}</td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-emerald-600">{dept.lowRisk}</td>
                  <td className="py-3 px-4 text-center font-semibold text-slate-700">{dept.avgSatisfaction} / 5.0</td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-slate-800">{dept.avgOvertimeRate}%</td>
                  <td className="py-3 px-4 text-center font-semibold text-indigo-600">{dept.skillGapCount} Gaps</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export / Report UI Placeholder Box */}
      <div className="rounded-xl border border-dashed border-indigo-200 bg-indigo-50/40 p-6 text-center">
        <FileText className="mx-auto h-8 w-8 text-indigo-600 mb-2" />
        <h3 className="text-sm font-bold text-slate-900">Need Custom Executive Reports?</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-4">
          Select customized date ranges, department scopes, and ML risk thresholds to generate official PDF reports.
        </p>
        <button
          onClick={onOpenExportModal}
          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-colors shadow-sm"
        >
          <Download className="h-4 w-4" />
          Open Export Center
        </button>
      </div>
    </div>
  );
};
