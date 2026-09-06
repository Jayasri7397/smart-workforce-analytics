import React from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';
import type { FilterState } from '../../types';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onReset: () => void;
  departments: string[];
  jobRoles?: string[];
  showRiskFilter?: boolean;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onReset,
  departments,
  jobRoles = [],
  showRiskFilter = true,
}) => {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
      {/* Search Field */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search employee by name, ID, or skill..."
          value={filters.searchQuery}
          onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      {/* Select Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mr-1">
          <Filter className="h-3.5 w-3.5" />
          <span className="font-medium hidden sm:inline">Filters:</span>
        </div>

        {/* Department */}
        <select
          value={filters.department}
          onChange={(e) => onFilterChange({ department: e.target.value })}
          className="rounded-lg border border-slate-200 bg-slate-50 py-2 px-3 text-xs font-medium text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        {/* Job Role */}
        {jobRoles.length > 0 && (
          <select
            value={filters.jobRole}
            onChange={(e) => onFilterChange({ jobRole: e.target.value })}
            className="rounded-lg border border-slate-200 bg-slate-50 py-2 px-3 text-xs font-medium text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="">All Job Roles</option>
            {jobRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        )}

        {/* Risk Level */}
        {showRiskFilter && (
          <select
            value={filters.riskLevel}
            onChange={(e) => onFilterChange({ riskLevel: e.target.value })}
            className="rounded-lg border border-slate-200 bg-slate-50 py-2 px-3 text-xs font-medium text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="">All Risk Levels</option>
            <option value="High">High Risk</option>
            <option value="Medium">Medium Risk</option>
            <option value="Low">Low Risk</option>
          </select>
        )}

        {/* Reset Button */}
        <button
          onClick={onReset}
          className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white py-2 px-3 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
          title="Reset Filters"
        >
          <RotateCcw className="h-3.5 w-3.5 text-slate-400" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>
    </div>
  );
};
