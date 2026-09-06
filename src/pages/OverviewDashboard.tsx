import React from 'react';
import {
  Users,
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  Target,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { KpiCard } from '../components/common/KpiCard';
import { ChartCard } from '../components/common/ChartCard';
import { RiskBadge } from '../components/common/RiskBadge';
import type { Employee } from '../types';
import { MOCK_DEPARTMENT_STATS, MOCK_SKILL_GAPS } from '../data/mockData';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts';

interface OverviewDashboardProps {
  employees: Employee[];
  onSelectEmployee: (emp: Employee) => void;
  onNavigateToTab: (tab: string) => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  employees,
  onSelectEmployee,
  onNavigateToTab,
}) => {
  // Aggregate stats
  const totalEmployees = 148;
  const highRiskCount = employees.filter((e) => e.currentRiskLevel === 'High').length;
  const mediumRiskCount = employees.filter((e) => e.currentRiskLevel === 'Medium').length;
  const lowRiskCount = employees.filter((e) => e.currentRiskLevel === 'Low').length;
  const criticalSkillGapsCount = 18;

  // Donut Chart Data
  const riskDistributionData = [
    { name: 'High Risk', value: 14, color: '#ef4444' },
    { name: 'Medium Risk', value: 32, color: '#f59e0b' },
    { name: 'Low Risk', value: 102, color: '#10b981' },
  ];

  // Top skill gaps horizontal chart data
  const skillGapsChartData = MOCK_SKILL_GAPS.map((sg) => ({
    name: sg.skillName,
    count: sg.missingCount,
    priority: sg.priority,
  }));

  // High Priority Employees (Sort by attrition probability descending)
  const highPriorityEmployees = [...employees]
    .sort((a, b) => b.attritionProbability - a.attritionProbability)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Top Banner Notice */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-indigo-100 bg-gradient-to-r from-indigo-50/90 via-white to-slate-50 p-4 text-xs shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white shrink-0 shadow-xs">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 text-sm">Academic Project Demonstration Mode</h2>
            <p className="text-slate-600 mt-0.5">
              System is initialized with mock workforce data. Real machine-learning backend connects seamlessly via REST endpoints.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigateToTab('retention')}
          className="self-start sm:self-auto flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-white px-3 py-2 font-semibold text-indigo-700 hover:bg-indigo-50 transition-colors shadow-2xs"
        >
          <span>View Risk Engine</span>
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard
          title="Total Workforce"
          value={totalEmployees}
          subtext="Active full-time staff"
          trend={{ value: '+4%', isPositive: true }}
          icon={Users}
          iconBgColor="bg-slate-100"
          iconColor="text-slate-700"
          accentColor="bg-slate-800"
          onClick={() => onNavigateToTab('employees')}
        />

        <KpiCard
          title="High Attrition Risk"
          value={highRiskCount}
          subtext="Urgent HR retention plan"
          trend={{ value: 'Immediate Action', isNegative: true }}
          icon={AlertTriangle}
          iconBgColor="bg-rose-50"
          iconColor="text-rose-600"
          accentColor="bg-rose-500"
          onClick={() => onNavigateToTab('retention')}
        />

        <KpiCard
          title="Medium Risk"
          value={mediumRiskCount}
          subtext="Requires monitoring"
          trend={{ value: 'Elevated Overtime' }}
          icon={ShieldAlert}
          iconBgColor="bg-amber-50"
          iconColor="text-amber-600"
          accentColor="bg-amber-500"
          onClick={() => onNavigateToTab('retention')}
        />

        <KpiCard
          title="Low Risk"
          value={lowRiskCount}
          subtext="Stable retention score"
          trend={{ value: '69% of workforce', isPositive: true }}
          icon={ShieldCheck}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-600"
          accentColor="bg-emerald-500"
          onClick={() => onNavigateToTab('employees')}
        />

        <KpiCard
          title="Skill Gaps Identified"
          value={criticalSkillGapsCount}
          subtext="Target role mismatches"
          trend={{ value: '5 Critical Skills', isNegative: true }}
          icon={Target}
          iconBgColor="bg-indigo-50"
          iconColor="text-indigo-600"
          accentColor="bg-indigo-600"
          onClick={() => onNavigateToTab('skills')}
        />
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attrition Risk Distribution Donut */}
        <ChartCard
          title="Retention Risk Distribution"
          subtitle="Breakdown of total workforce by predicted attrition severity"
        >
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {riskDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: unknown) => [`${val} Employees`, 'Count']}
                  contentStyle={{
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    borderColor: '#cbd5e1',
                    fontSize: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-2 border-t border-slate-100 pt-3">
            {riskDistributionData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs font-semibold text-slate-700">
                  {item.name}: <span className="text-slate-900 font-bold">{item.value}</span>
                </span>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Department-wise Employee Risk Chart */}
        <ChartCard
          title="Department Risk Breakdown"
          subtitle="Distribution of employee risk categories across departments"
          className="lg:col-span-2"
        >
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_DEPARTMENT_STATS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="department" tick={{ fill: '#64748b', fontSize: 11 }} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    borderColor: '#cbd5e1',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="lowRisk" name="Low Risk" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
                <Bar dataKey="mediumRisk" name="Medium Risk" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
                <Bar dataKey="highRisk" name="High Risk" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Second Row: Top Skill Gaps & High Priority Employee Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Skill Gaps Horizontal Bar Chart */}
        <ChartCard
          title="Top Workforce Skill Gaps"
          subtitle="Most needed missing competencies required for enterprise projects"
          action={
            <button
              onClick={() => onNavigateToTab('skills')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
            >
              Analyze All Skills →
            </button>
          }
        >
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={skillGapsChartData}
                margin={{ top: 5, right: 20, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fill: '#64748b', fontSize: 11 }} />
                <YAxis dataKey="name" type="category" tick={{ fill: '#334155', fontSize: 10, fontWeight: 600 }} width={120} />
                <Tooltip
                  formatter={(val: unknown) => [`${val} Staff Missing`, 'Count']}
                  contentStyle={{
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    borderColor: '#cbd5e1',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="count" name="Staff Missing Skill" fill="#6366f1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* High Priority Attrition Table */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">High Attrition Action Desk</h3>
              <p className="text-xs text-slate-500">Employees requiring immediate HR intervention</p>
            </div>
            <button
              onClick={() => onNavigateToTab('retention')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
            >
              View All Attrition Risks →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="py-2.5 px-3">Employee</th>
                  <th className="py-2.5 px-3">Department</th>
                  <th className="py-2.5 px-3">Job Role</th>
                  <th className="py-2.5 px-3">Risk Level</th>
                  <th className="py-2.5 px-3 text-right">ML Prob.</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {highPriorityEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3">
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
                    <td className="py-3 px-3 text-slate-700">{emp.department}</td>
                    <td className="py-3 px-3 text-slate-700">{emp.jobRole}</td>
                    <td className="py-3 px-3">
                      <RiskBadge level={emp.currentRiskLevel} size="sm" />
                    </td>
                    <td className="py-3 px-3 text-right font-black text-rose-600 font-mono text-sm">
                      {emp.attritionProbability}%
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => onSelectEmployee(emp)}
                        className="rounded-lg bg-indigo-50 py-1 px-2.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 transition-colors"
                      >
                        Inspect Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
