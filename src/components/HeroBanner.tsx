import React from 'react';
import { Star, FileSpreadsheet, Settings, ShieldCheck, Users, GraduationCap, Award } from 'lucide-react';
import { SystemStats, UserProfile, FeedbackRecord } from '../types';

interface HeroBannerProps {
  currentUser: UserProfile | null;
  stats: SystemStats;
  allRecords?: FeedbackRecord[];
  onOpenRateLecture: () => void;
  onOpenReportModal: () => void;
  onOpenModelDetailModal?: () => void;
  onOpenLoginModal?: () => void;
  onSelectStudentFilter?: (student: string) => void;
  onSelectFacultyFilter?: (faculty: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  currentUser,
  stats,
  allRecords = [],
  onOpenRateLecture,
  onOpenReportModal,
  onOpenModelDetailModal,
  onOpenLoginModal,
  onSelectStudentFilter,
  onSelectFacultyFilter,
}) => {
  // Aggregate distinct students and faculty from feedback records
  const uniqueStudents = Array.from(new Set(allRecords.map((r) => r.studentName))).filter(Boolean);
  const uniqueFaculty = Array.from(new Set(allRecords.map((r) => r.facultyName))).filter(Boolean);

  // Faculty-specific feedback aggregation
  const facultyRecords = allRecords.filter(
    (r) =>
      currentUser?.role === 'Faculty' &&
      (r.facultyName.toLowerCase() === currentUser.name.toLowerCase() ||
        currentUser.name.toLowerCase().includes(r.facultyName.toLowerCase()) ||
        r.facultyName.toLowerCase().includes('viswanath'))
  );
  const facultyStudents = Array.from(new Set(facultyRecords.map((r) => r.studentName)));

  return (
    <div className="rounded-2xl bg-gradient-to-r from-[#0284c7] via-[#0284c7] to-[#2563eb] p-7 text-white shadow-md select-none">
      {/* Top row: Badges and Action buttons */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
        <div>
          {/* Top Pill Badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-3.5">
            <button
              onClick={onOpenModelDetailModal}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 text-white text-xs font-medium transition-colors"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Statistical Inference & Faculty Lecture Model</span>
            </button>

            {currentUser ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-medium">
                <span>{currentUser.avatar}</span>
                <span>Logged in: {currentUser.name} ({currentUser.role})</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={onOpenLoginModal}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 hover:bg-amber-400/30 backdrop-blur-sm border border-amber-300/40 text-amber-200 text-xs font-semibold transition-colors cursor-pointer"
              >
                <span>🔒</span>
                <span>Guest Mode • Click to Sign In</span>
              </button>
            )}
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
            Course Feedback Analysis System
          </h1>

          {/* Description */}
          <p className="text-sm text-blue-100 max-w-2xl leading-relaxed mt-2 font-normal">
            {currentUser
              ? `Welcome back, ${currentUser.name}! Real-time multi-branch course evaluation analytics across 8 engineering semesters. Analyzing student star ratings, faculty pedagogical clarity, and syllabus depth.`
              : 'Welcome to the University Course Feedback Analysis System! Real-time multi-branch course evaluation analytics across 8 engineering semesters. Please sign in to submit verified star ratings.'}
          </p>
        </div>

        {/* Right Action Buttons */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
          {/* Rate Faculty Lecture */}
          <button
            onClick={onOpenRateLecture}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-blue-50 text-[#0284c7] text-xs font-bold shadow-sm transition-all active:scale-[0.98] cursor-pointer"
          >
            <Star className="w-4 h-4 fill-[#0284c7] text-[#0284c7]" />
            <span>Rate Faculty Lecture</span>
          </button>

          {/* Generate Reports (PDF/Excel) */}
          <button
            onClick={onOpenReportModal}
            className="flex items-center justify-between gap-2.5 px-4 py-2.5 rounded-xl bg-[#047857] hover:bg-[#065f46] text-white text-xs font-semibold shadow-sm transition-all active:scale-[0.98] cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4" />
              <span>Generate Reports (PDF/Excel)</span>
            </div>
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#064e3b] text-emerald-300">
              .XLSX
            </span>
          </button>
        </div>
      </div>

      {/* Role-Specific Access & Student/Faculty Feedback Counters */}
      {currentUser?.role === 'Faculty' && (
        <div className="mt-5 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white animate-in fade-in duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider bg-purple-500/40 px-2.5 py-0.5 rounded-full border border-purple-300/40 text-purple-100 flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5" />
                  Faculty Dashboard • {currentUser.name}
                </span>
                <span className="text-[11px] text-emerald-300 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Access to All Students Feedback Active
                </span>
              </div>
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                <span>Students Submitted Feedback:</span>
                <span className="px-2 py-0.5 bg-amber-400 text-slate-900 rounded-lg text-sm font-black shadow-xs">
                  {facultyStudents.length} Students
                </span>
                <span className="text-xs font-normal text-blue-100">
                  ({facultyRecords.length} lecture evaluations recorded for your courses)
                </span>
              </h2>
              <p className="text-xs text-blue-100 leading-relaxed">
                As faculty, you have direct access to review all evaluations, ratings, and qualitative comments submitted by students below.
              </p>
            </div>

            {/* Quick student chips for faculty */}
            <div className="flex flex-col items-start md:items-end gap-1.5 shrink-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200">
                Participating Students:
              </span>
              <div className="flex flex-wrap gap-1 max-w-sm">
                {facultyStudents.map((st) => (
                  <button
                    key={st}
                    onClick={() => onSelectStudentFilter?.(st)}
                    className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-white/20 hover:bg-white/35 text-white border border-white/30 transition-all cursor-pointer shadow-2xs"
                    title={`Click to view feedback from ${st}`}
                  >
                    👤 {st}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {currentUser?.role === 'Dean/Admin' && (
        <div className="mt-5 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white animate-in fade-in duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider bg-emerald-500/40 px-2.5 py-0.5 rounded-full border border-emerald-300/40 text-emerald-100 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  Academic Administration Portal • {currentUser.name} (Dean)
                </span>
                <span className="text-[11px] text-emerald-300 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Full System Audit: All Students & Faculty Feedback Accessible
                </span>
              </div>
              <h2 className="text-base font-extrabold text-white flex flex-wrap items-center gap-2">
                <span>Submissions:</span>
                <span className="px-2 py-0.5 bg-white text-blue-900 rounded-lg text-xs font-black shadow-xs">
                  {uniqueStudents.length} Students Submitted
                </span>
                <span className="text-blue-200">•</span>
                <span className="px-2 py-0.5 bg-amber-400 text-slate-900 rounded-lg text-xs font-black shadow-xs">
                  {uniqueFaculty.length} Faculty Members Evaluated
                </span>
                <span className="text-xs font-normal text-blue-100">
                  ({allRecords.length} total institutional records)
                </span>
              </h2>
              <p className="text-xs text-blue-100 leading-relaxed">
                As Administrator/Dean, you have complete institutional access across all departments, courses, faculty members, and student submissions.
              </p>
            </div>
          </div>

          {/* Quick Filter Badges for Admin */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 pt-3 border-t border-white/15 text-xs">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200 block mb-1">
                Students Submitted ({uniqueStudents.length}):
              </span>
              <div className="flex flex-wrap gap-1">
                {uniqueStudents.map((st) => (
                  <button
                    key={st}
                    onClick={() => onSelectStudentFilter?.(st)}
                    className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/20 hover:bg-white/35 text-white border border-white/25 transition-all cursor-pointer shadow-2xs"
                  >
                    👤 {st}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200 block mb-1">
                Faculty Evaluated ({uniqueFaculty.length}):
              </span>
              <div className="flex flex-wrap gap-1">
                {uniqueFaculty.map((fc) => (
                  <button
                    key={fc}
                    onClick={() => onSelectFacultyFilter?.(fc)}
                    className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/20 hover:bg-white/35 text-white border border-white/25 transition-all cursor-pointer shadow-2xs"
                  >
                    👨‍🏫 {fc}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {currentUser?.role === 'Student' && (
        <div className="mt-5 p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in duration-300">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider bg-blue-500/40 px-2 py-0.5 rounded-full border border-blue-300/40 text-blue-100 flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                Student Portal • Logged in as {currentUser.name}
              </span>
              <span className="text-[11px] text-emerald-300 font-semibold">
                ✓ Available Students for Feedback: Abhinav, Akhil, Rajesh, Mahesh, Suresh, Somesh, Madhu
              </span>
            </div>
            <p className="text-xs text-blue-100 mt-1">
              Submit your verified evaluations for faculty lectures. Your ratings update the departmental pedagogical index in real time.
            </p>
          </div>
          <button
            onClick={onOpenRateLecture}
            className="px-3 py-1.5 rounded-lg bg-white text-[#0284c7] text-xs font-bold hover:bg-blue-50 shadow-2xs transition-colors shrink-0 cursor-pointer"
          >
            + Submit New Feedback
          </button>
        </div>
      )}

      {/* 4 Bottom Stat Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {/* Card 1: Mean Lecture Rating */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm text-slate-800 dark:text-slate-200 flex flex-col justify-between min-h-[96px] border border-slate-100 dark:border-slate-800">
          <div className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            MEAN LECTURE RATING (M)
          </div>
          <div className="flex items-center gap-1.5 my-1">
            <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {stats.meanRating.toFixed(1)}
            </span>
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
          </div>
          <div className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold">
            95% Conf. Interval: {stats.confIntervalLow} - {stats.confIntervalHigh}
          </div>
        </div>

        {/* Card 2: Total Student Responses */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm text-slate-800 dark:text-slate-200 flex flex-col justify-between min-h-[96px] border border-slate-100 dark:border-slate-800">
          <div className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            TOTAL STUDENT RESPONSES (N)
          </div>
          <div className="my-1">
            <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {stats.totalResponses}
            </span>
          </div>
          <div className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold">
            {uniqueStudents.length} Students Participated
          </div>
        </div>

        {/* Card 3: Rating Std. Deviation */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm text-slate-800 dark:text-slate-200 flex flex-col justify-between min-h-[96px] border border-slate-100 dark:border-slate-800">
          <div className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            RATING STD. DEVIATION (Σ)
          </div>
          <div className="my-1">
            <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              ±{stats.stdDev.toFixed(2)}
            </span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            Variance (σ²): {stats.variance}
          </div>
        </div>

        {/* Card 4: 5-Star Benchmark Ratio */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm text-slate-800 dark:text-slate-200 flex flex-col justify-between min-h-[96px] border border-slate-100 dark:border-slate-800">
          <div className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            5-STAR BENCHMARK RATIO
          </div>
          <div className="my-1">
            <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {stats.fiveStarRatio}%
            </span>
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
            Top Tier Satisfaction
          </div>
        </div>
      </div>
    </div>
  );
};
