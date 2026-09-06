import React, { useState, useMemo } from 'react';
import { FilterBar } from '../components/common/FilterBar';
import { RiskBadge } from '../components/common/RiskBadge';
import { SkillBadge } from '../components/common/SkillBadge';
import type { Employee, FilterState } from '../types';
import { Star, UserPlus, Eye, Clock, FileSpreadsheet } from 'lucide-react';

interface EmployeeManagementProps {
  employees: Employee[];
  onSelectEmployee: (emp: Employee) => void;
  onOpenAddModal: () => void;
  onOpenExportModal: () => void;
  departments: string[];
}

export const EmployeeManagement: React.FC<EmployeeManagementProps> = ({
  employees,
  onSelectEmployee,
  onOpenAddModal,
  onOpenExportModal,
  departments,
}) => {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    department: '',
    jobRole: '',
    riskLevel: '',
  });

  // Extract unique job roles for filter dropdown
  const allJobRoles = useMemo(() => {
    const rolesSet = new Set<string>();
    employees.forEach((e) => rolesSet.add(e.jobRole));
    return Array.from(rolesSet);
  }, [employees]);

  // Filtered Employees calculation
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      // Search Query
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchesName = emp.name.toLowerCase().includes(q);
        const matchesId = emp.id.toLowerCase().includes(q);
        const matchesRole = emp.jobRole.toLowerCase().includes(q);
        const matchesSkill = emp.skills.some((s) => s.toLowerCase().includes(q));
        if (!matchesName && !matchesId && !matchesRole && !matchesSkill) return false;
      }
      // Department
      if (filters.department && emp.department !== filters.department) {
        return false;
      }
      // Job Role
      if (filters.jobRole && emp.jobRole !== filters.jobRole) {
        return false;
      }
      // Risk Level
      if (filters.riskLevel && emp.currentRiskLevel !== filters.riskLevel) {
        return false;
      }
      return true;
    });
  }, [employees, filters]);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({ searchQuery: '', department: '', jobRole: '', riskLevel: '' });
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Employee Directory & Analytics</h2>
          <p className="text-xs text-slate-500">
            Showing {filteredEmployees.length} of {employees.length} total staff members
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenExportModal}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
            <span>Export List</span>
          </button>

          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <UserPlus className="h-4 w-4" />
            <span>+ Add Employee</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
        departments={departments}
        jobRoles={allJobRoles}
      />

      {/* Main Employee Table Card */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="py-3 px-4">Employee ID & Name</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Job Role Title</th>
                <th className="py-3 px-4 text-center">Exp (Yrs)</th>
                <th className="py-3 px-4 text-center">Satisfaction</th>
                <th className="py-3 px-4 text-center">Overtime</th>
                <th className="py-3 px-4">Risk Level</th>
                <th className="py-3 px-4">Skills Inventory</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Employee Profile */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={emp.avatar}
                          alt={emp.name}
                          className="h-9 w-9 rounded-full object-cover border border-slate-200 shrink-0"
                        />
                        <div>
                          <span className="font-bold text-slate-900 block">{emp.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{emp.id}</span>
                        </div>
                      </div>
                    </td>

                    {/* Department */}
                    <td className="py-3 px-4 text-slate-700">
                      <span className="rounded-md bg-slate-100 px-2 py-1 text-slate-800 font-semibold">
                        {emp.department}
                      </span>
                    </td>

                    {/* Job Role */}
                    <td className="py-3 px-4 text-slate-800 font-semibold">{emp.jobRole}</td>

                    {/* Experience */}
                    <td className="py-3 px-4 text-center font-bold text-slate-700">
                      {emp.experience} yrs
                    </td>

                    {/* Job Satisfaction */}
                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 border border-amber-100 text-amber-800 font-bold">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <span>{emp.jobSatisfaction}/5</span>
                      </div>
                    </td>

                    {/* Overtime */}
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                          emp.overtime === 'Yes'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        <Clock className="h-3 w-3" />
                        {emp.overtime}
                      </span>
                    </td>

                    {/* Risk Level Badge */}
                    <td className="py-3 px-4">
                      <RiskBadge level={emp.currentRiskLevel} />
                    </td>

                    {/* Skills Tags */}
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {emp.skills.slice(0, 3).map((skill) => (
                          <SkillBadge key={skill} skill={skill} size="sm" />
                        ))}
                        {emp.skills.length > 3 && (
                          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-500">
                            +{emp.skills.length - 3} more
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Quick Action Button */}
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => onSelectEmployee(emp)}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white py-1.5 px-2.5 text-xs font-semibold text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 transition-colors shadow-2xs"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-400">
                    No employee records match the selected filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
