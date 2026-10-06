import React from 'react';
import { Filter, ChevronDown, RotateCcw } from 'lucide-react';
import { AnalyticalFiltersState } from '../types';
import { ENGINEERING_BRANCHES, SEMESTERS, FACULTY_MEMBERS, STUDENT_NAMES_FILTER } from '../data/mockData';

interface AnalyticalFiltersProps {
  filters: AnalyticalFiltersState;
  onChangeFilter: (key: keyof AnalyticalFiltersState, value: string) => void;
  onResetFilters: () => void;
}

export const AnalyticalFilters: React.FC<AnalyticalFiltersProps> = ({
  filters,
  onChangeFilter,
  onResetFilters,
}) => {
  const isFiltered =
    filters.semester !== 'All Semesters (1 to 8)' ||
    filters.branch !== 'All Courses & Branches' ||
    filters.faculty !== 'All Faculty Members' ||
    (Boolean(filters.student) && filters.student !== 'All Students');

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 p-2.5 px-4 shadow-xs select-none transition-all">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Left Label & Reset Button */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-700 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Filter className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap">
            Analytical Filters:
          </span>
          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 text-[11px] text-blue-600 dark:text-blue-400 hover:text-blue-800 font-semibold px-2 py-0.5 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/40 transition-colors ml-1 cursor-pointer"
              title="Reset all filters to defaults"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* 4 Compact Select Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 flex-1 max-w-5xl">
          {/* SEMESTER */}
          <div className="relative">
            <select
              value={filters.semester}
              onChange={(e) => onChangeFilter('semester', e.target.value)}
              className="w-full appearance-none rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/80 px-2.5 py-1.5 pr-7 text-[11px] font-semibold text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer shadow-2xs truncate"
              title="Select Semester"
            >
              {SEMESTERS.map((sem) => (
                <option key={sem} value={sem}>
                  {sem}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* COURSE / ENGINEERING BRANCH */}
          <div className="relative">
            <select
              value={filters.branch}
              onChange={(e) => onChangeFilter('branch', e.target.value)}
              className="w-full appearance-none rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/80 px-2.5 py-1.5 pr-7 text-[11px] font-semibold text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer shadow-2xs truncate"
              title="Select Engineering Branch"
            >
              {ENGINEERING_BRANCHES.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* FACULTY & LECTURE SUBJECT */}
          <div className="relative">
            <select
              value={filters.faculty}
              onChange={(e) => onChangeFilter('faculty', e.target.value)}
              className="w-full appearance-none rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/80 px-2.5 py-1.5 pr-7 text-[11px] font-semibold text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer shadow-2xs truncate"
              title="Select Faculty Member"
            >
              {FACULTY_MEMBERS.map((f) => (
                <option key={f.name} value={f.name}>
                  {f.name} {f.subject !== 'All Subjects' ? `(${f.subject})` : ''}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* STUDENT NAME */}
          <div className="relative">
            <select
              value={filters.student || 'All Students'}
              onChange={(e) => onChangeFilter('student', e.target.value)}
              className="w-full appearance-none rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/80 px-2.5 py-1.5 pr-7 text-[11px] font-semibold text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer shadow-2xs truncate"
              title="Select Student Name"
            >
              {STUDENT_NAMES_FILTER.map((st) => (
                <option key={st} value={st}>
                  {st === 'All Students' ? 'All Students' : `Student: ${st}`}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};
