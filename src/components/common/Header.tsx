import React, { useState } from 'react';
import { Bell, Sparkles, Database } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
}

export const Header: React.FC<HeaderProps> = ({ activeTab }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showApiInfo, setShowApiInfo] = useState(false);

  const pageInfo: Record<string, { title: string; subtitle: string }> = {
    overview: {
      title: 'Workforce Overview Dashboard',
      subtitle: 'Real-time metrics on retention risks, department stats, and top skill gaps.',
    },
    employees: {
      title: 'Employee Directory & Management',
      subtitle: 'View employee information, filter by department, experience, and risk metrics.',
    },
    retention: {
      title: 'Retention & Attrition Predictive Analytics',
      subtitle: 'Machine learning retention risk scores, feature drivers, and mitigation plans.',
    },
    skills: {
      title: 'Skill Gap & Job Matching Engine',
      subtitle: 'Map individual employee skills against target job roles to pinpoint workforce gaps.',
    },
    reports: {
      title: 'HR Insights & Executive Reports',
      subtitle: 'Comprehensive summary reports, department matrixes, and export capabilities.',
    },
  };

  const current = pageInfo[activeTab] || pageInfo.overview;

  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-6 shadow-xs">
      {/* Page Title */}
      <div>
        <h1 className="text-lg font-bold tracking-tight text-slate-900">{current.title}</h1>
        <p className="hidden text-xs text-slate-500 sm:block">{current.subtitle}</p>
      </div>

      {/* Right Toolbar */}
      <div className="flex items-center gap-4">
        {/* Frontend Prototype API Ready Pill */}
        <div className="relative">
          <button
            onClick={() => setShowApiInfo(!showApiInfo)}
            className="flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50/80 px-3 py-1 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 transition-colors"
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-600 animate-pulse" />
            <span className="hidden md:inline">Frontend Prototype</span>
            <span className="rounded bg-indigo-200 px-1 py-0.2 text-[10px] uppercase tracking-wider text-indigo-900">
              API Ready
            </span>
          </button>

          {/* API Info Popover */}
          {showApiInfo && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl border border-slate-200 bg-white p-4 shadow-xl text-xs z-50">
              <div className="flex items-start gap-2.5">
                <Database className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900">Architecture Notice</h4>
                  <p className="mt-1 text-slate-600 leading-relaxed">
                    This UI currently runs on structured mock datasets. It is architected for drop-in REST connection with:
                  </p>
                  <ul className="mt-2 space-y-1 text-slate-700 font-mono text-[11px]">
                    <li className="flex items-center gap-1.5">• Spring Boot REST API</li>
                    <li className="flex items-center gap-1.5">• MySQL Database</li>
                    <li className="flex items-center gap-1.5">• Python ML Attrition Microservice</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
            title="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 rounded-xl border border-slate-200 bg-white p-3 shadow-xl z-50 text-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                <span className="font-bold text-slate-900">System Alerts</span>
                <span className="text-[10px] text-slate-400">2 New</span>
              </div>
              <div className="space-y-2">
                <div className="rounded-lg bg-rose-50 p-2 text-rose-800 border border-rose-100">
                  <p className="font-semibold">High Attrition Risk Alert</p>
                  <p className="text-[11px] text-rose-600 mt-0.5">Alex Rivera flagged at 86% retention risk.</p>
                </div>
                <div className="rounded-lg bg-amber-50 p-2 text-amber-800 border border-amber-100">
                  <p className="font-semibold">Skill Gap Alert</p>
                  <p className="text-[11px] text-amber-700 mt-0.5">14 Engineers missing Kubernetes/MLOps skill.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Vertical Divider */}
        <div className="h-6 w-[1px] bg-slate-200" />

        {/* HR User Profile */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700 text-sm border border-indigo-200">
            SJ
          </div>
          <div className="hidden lg:flex flex-col">
            <span className="text-xs font-bold text-slate-900 leading-tight">Dr. Sarah Jenkins</span>
            <span className="text-[10px] font-medium text-slate-500">HR Analytics Lead</span>
          </div>
        </div>
      </div>
    </header>
  );
};
