import React, { useState } from 'react';
import { RiskBadge } from '../components/common/RiskBadge';
import { ChartCard } from '../components/common/ChartCard';
import type { Employee } from '../types';
import { AlertTriangle, TrendingDown, Clock, ShieldAlert, Sparkles, ChevronRight } from 'lucide-react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

interface RetentionAnalyticsProps {
  employees: Employee[];
  onSelectEmployee: (emp: Employee) => void;
}

export const RetentionAnalytics: React.FC<RetentionAnalyticsProps> = ({
  employees,
  onSelectEmployee,
}) => {
  const [selectedRiskCategory, setSelectedRiskCategory] = useState<string>('All');

  // Summary Computations
  const highRiskEmployees = employees.filter((e) => e.currentRiskLevel === 'High');
  const avgProbability = Math.round(
    employees.reduce((acc, curr) => acc + curr.attritionProbability, 0) / employees.length
  );
  const overtimeCount = employees.filter((e) => e.overtime === 'Yes').length;
  const overtimePercentage = Math.round((overtimeCount / employees.length) * 100);

  // ML Feature Importances Demo Data
  const featureImportances = [
    { factor: 'Overtime Workload Frequency', weight: 34, description: 'Sustained extra weekly work hours increases burnout probability by 3.2x' },
    { factor: 'Promotion Stagnation (>3 Yrs)', weight: 28, description: 'Lack of upward title progression correlates strongly with voluntary exit' },
    { factor: 'Job Satisfaction Score (<3/5)', weight: 22, description: 'Low survey sentiment rating signals immediate flight risk' },
    { factor: 'Below-Market Compensation', weight: 16, description: 'Salary gap vs industry benchmark drives competitive recruiting loss' },
  ];

  // Radar chart data for organizational retention health
  const radarHealthData = [
    { subject: 'Work-Life Balance', score: 62 },
    { subject: 'Compensation Growth', score: 55 },
    { subject: 'Promotion Pace', score: 48 },
    { subject: 'Role Autonomy', score: 78 },
    { subject: 'Team Satisfaction', score: 70 },
  ];

  // Filter employees by risk level selection
  const filteredRiskEmployees = employees.filter((e) => {
    if (selectedRiskCategory === 'All') return true;
    return e.currentRiskLevel === selectedRiskCategory;
  });

  return (
    <div className="space-y-6">
      {/* Page Prototype Disclaimer Banner */}
      <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-4 text-xs text-rose-900 flex items-start gap-3">
        <Sparkles className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
        <div>
          <h3 className="font-bold text-slate-900 text-sm">Machine Learning Risk Engine (Demo Data UI)</h3>
          <p className="mt-0.5 text-rose-800">
            Attrition risk probabilities and key feature weights below represent outputs from the predictive ML pipeline. 
            The system is designed to plug directly into a Python Scikit-Learn/XGBoost microservice.
          </p>
        </div>
      </div>

      {/* Summary KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-500">High Risk Employees</span>
            <AlertTriangle className="h-5 w-5 text-rose-500" />
          </div>
          <h3 className="mt-2 text-2xl font-bold text-slate-900">{highRiskEmployees.length} Staff</h3>
          <p className="mt-1 text-xs text-rose-600 font-semibold font-mono">
            {Math.round((highRiskEmployees.length / employees.length) * 100)}% of total team
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-500">Avg Attrition Probability</span>
            <TrendingDown className="h-5 w-5 text-indigo-500" />
          </div>
          <h3 className="mt-2 text-2xl font-bold text-slate-900">{avgProbability}%</h3>
          <p className="mt-1 text-xs text-slate-500">Calculated overall risk mean</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-500">Overtime Burnout Ratio</span>
            <Clock className="h-5 w-5 text-amber-500" />
          </div>
          <h3 className="mt-2 text-2xl font-bold text-slate-900">{overtimePercentage}%</h3>
          <p className="mt-1 text-xs text-amber-600 font-semibold">{overtimeCount} employees on overtime</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-500">Primary Risk Driver</span>
            <ShieldAlert className="h-5 w-5 text-rose-600" />
          </div>
          <h3 className="mt-2 text-base font-bold text-slate-900 truncate">Overtime & Promotion</h3>
          <p className="mt-1 text-xs text-slate-500">Top 2 predictive feature weights</p>
        </div>
      </div>

      {/* Visual Analytics: ML Feature Importances & Org Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ML Feature Importance Drivers */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="border-b border-slate-100 pb-3 mb-4">
            <h3 className="text-base font-bold text-slate-900">Machine Learning Attrition Drivers</h3>
            <p className="text-xs text-slate-500">Feature importance weight rankings generated by predictive model</p>
          </div>

          <div className="space-y-4">
            {featureImportances.map((item) => (
              <div key={item.factor} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-800">{item.factor}</span>
                  <span className="text-indigo-600 font-mono">{item.weight}% Weight</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                    style={{ width: `${item.weight * 2.5}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Retention Factors Radar */}
        <ChartCard
          title="Retention Index Radar"
          subtitle="Organizational health ratings across core satisfaction metrics"
        >
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarHealthData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 10, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 9 }} />
                <Radar name="Retention Health" dataKey="score" stroke="#4f46e5" fill="#6366f1" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Main Employee Attrition Risk Table */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Predictive Retention Risk Directory</h3>
            <p className="text-xs text-slate-500">Employee attrition probabilities, risk categories & key contributing factors</p>
          </div>

          {/* Risk Level Filter Pill */}
          <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
            {['All', 'High', 'Medium', 'Low'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedRiskCategory(cat)}
                className={`rounded-md px-3 py-1 text-xs font-semibold transition-all ${
                  selectedRiskCategory === cat
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat} Risk
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="py-3 px-4">Employee</th>
                <th className="py-3 px-4">Department & Role</th>
                <th className="py-3 px-4 text-center">ML Attrition Prob.</th>
                <th className="py-3 px-4">Risk Category</th>
                <th className="py-3 px-4">Primary Contributing Factors</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredRiskEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={emp.avatar}
                        alt={emp.name}
                        className="h-8 w-8 rounded-full object-cover border border-slate-200 shrink-0"
                      />
                      <div>
                        <span className="font-bold text-slate-900 block">{emp.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{emp.id}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-800 block">{emp.jobRole}</span>
                    <span className="text-[11px] text-slate-500">{emp.department}</span>
                  </td>

                  <td className="py-3 px-4 text-center font-mono font-black text-sm">
                    <span className={`inline-block px-2 py-0.5 rounded-md ${
                      emp.attritionProbability >= 70
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : emp.attritionProbability >= 40
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      {emp.attritionProbability}%
                    </span>
                    <span className="text-[9px] text-slate-400 block mt-0.5">DEMO DATA</span>
                  </td>

                  <td className="py-3 px-4">
                    <RiskBadge level={emp.currentRiskLevel} />
                  </td>

                  <td className="py-3 px-4 max-w-xs">
                    <div className="flex flex-wrap gap-1">
                      {emp.primaryRiskFactors.map((factor, idx) => (
                        <span
                          key={idx}
                          className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700 border border-slate-200"
                        >
                          {factor}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onSelectEmployee(emp)}
                      className="inline-flex items-center gap-1 rounded-lg bg-indigo-50 px-2.5 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 transition-colors"
                    >
                      <span>Analyze Details</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
