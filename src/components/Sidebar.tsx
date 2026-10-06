import React from 'react';
import {
  LayoutDashboard,
  MessageSquarePlus,
  History,
  GraduationCap,
  Sparkles,
  BarChart3,
  FileText,
  Settings,
  HelpCircle,
  Layers,
  Wifi,
  LogOut,
  LogIn
} from 'lucide-react';
import { SidebarTab, UserProfile } from '../types';

interface SidebarProps {
  currentUser: UserProfile | null;
  activeTab: SidebarTab;
  onSelectTab: (tab: SidebarTab) => void;
  onOpenModulesModal: () => void;
  onOpenOfflineModal: () => void;
  onOpenLogoutModal: () => void;
  onOpenLoginModal: () => void;
  onOpenProfileModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentUser,
  activeTab,
  onSelectTab,
  onOpenModulesModal,
  onOpenOfflineModal,
  onOpenLogoutModal,
  onOpenLoginModal,
  onOpenProfileModal,
}) => {
  return (
    <aside className="w-64 shrink-0 bg-white border-r border-slate-200 flex flex-col justify-between sticky top-0 h-screen overflow-y-auto p-4 select-none z-20">
      {/* Top Branding */}
      <div>
        <div className="flex items-center gap-3 px-2 py-1 mb-6 cursor-pointer" onClick={() => onSelectTab('dashboard')}>
          <div className="w-10 h-10 rounded-full bg-[#18182f] flex flex-col items-center justify-center text-white text-[11px] font-black leading-none tracking-tighter shadow-sm">
            <span>01</span>
            <span>10</span>
          </div>
          <div>
            <h1 className="text-[15px] font-bold text-slate-900 tracking-tight leading-tight">
              Feedback Analytics
            </h1>
            <p className="text-xs font-semibold text-[#4f46e5]">
              Data Science Platform
            </p>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="space-y-0.5">
          {/* 1. Dashboard */}
          <button
            onClick={() => onSelectTab('dashboard')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-[#4f46e5] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <LayoutDashboard className={`w-4 h-4 shrink-0 ${activeTab === 'dashboard' ? 'text-white' : 'text-slate-400'}`} />
            <div className="min-w-0">
              <div className={`text-xs font-bold leading-tight ${activeTab === 'dashboard' ? 'text-white' : 'text-slate-800'}`}>
                Dashboard
              </div>
              <div className={`text-[10px] leading-tight mt-0.5 ${activeTab === 'dashboard' ? 'text-indigo-100 font-normal' : 'text-slate-400'}`}>
                Overview & Visuals
              </div>
            </div>
          </button>

          {/* 2. Submit Feedback */}
          <button
            onClick={() => onSelectTab('submit-feedback')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all cursor-pointer ${
              activeTab === 'submit-feedback'
                ? 'bg-[#4f46e5] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <MessageSquarePlus className={`w-4 h-4 shrink-0 ${activeTab === 'submit-feedback' ? 'text-white' : 'text-slate-400'}`} />
            <div className="min-w-0">
              <div className={`text-xs font-semibold leading-tight ${activeTab === 'submit-feedback' ? 'text-white font-bold' : 'text-slate-800'}`}>
                Submit Feedback
              </div>
              <div className={`text-[10px] leading-tight mt-0.5 ${activeTab === 'submit-feedback' ? 'text-indigo-100' : 'text-slate-400'}`}>
                Lecture Star Ratings
              </div>
            </div>
          </button>

          {/* 3. Feedback History */}
          <button
            onClick={() => onSelectTab('feedback-history')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all cursor-pointer ${
              activeTab === 'feedback-history' || activeTab === 'rating-history'
                ? 'bg-[#4f46e5] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/60'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <History className={`w-4 h-4 shrink-0 ${activeTab === 'feedback-history' || activeTab === 'rating-history' ? 'text-white' : 'text-slate-400'}`} />
              <div className="min-w-0">
                <div className={`text-xs font-semibold leading-tight ${activeTab === 'feedback-history' || activeTab === 'rating-history' ? 'text-white font-bold' : 'text-slate-800 dark:text-slate-200'}`}>
                  Feedback History
                </div>
                <div className={`text-[10px] leading-tight mt-0.5 ${activeTab === 'feedback-history' || activeTab === 'rating-history' ? 'text-indigo-100' : 'text-slate-400'}`}>
                  Submissions & Audit Logs
                </div>
              </div>
            </div>
            <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
              activeTab === 'feedback-history' || activeTab === 'rating-history'
                ? 'bg-indigo-400/40 text-white'
                : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
            }`}>
              Audit
            </span>
          </button>

          {/* 4. Session History */}
          <button
            onClick={() => onSelectTab('session-history')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all cursor-pointer ${
              activeTab === 'session-history'
                ? 'bg-[#4f46e5] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <GraduationCap className={`w-4 h-4 shrink-0 ${activeTab === 'session-history' ? 'text-white' : 'text-slate-400'}`} />
              <div className="min-w-0">
                <div className={`text-xs font-semibold leading-tight ${activeTab === 'session-history' ? 'text-white font-bold' : 'text-slate-800'}`}>
                  Session History
                </div>
                <div className={`text-[10px] leading-tight mt-0.5 ${activeTab === 'session-history' ? 'text-indigo-100' : 'text-slate-400'}`}>
                  My Session Records
                </div>
              </div>
            </div>
            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
              Active
            </span>
          </button>

          {/* 5. Theme Analysis */}
          <button
            onClick={() => onSelectTab('theme-analysis')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all cursor-pointer ${
              activeTab === 'theme-analysis'
                ? 'bg-[#4f46e5] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Sparkles className={`w-4 h-4 shrink-0 ${activeTab === 'theme-analysis' ? 'text-white' : 'text-slate-400'}`} />
            <div className="min-w-0">
              <div className={`text-xs font-semibold leading-tight ${activeTab === 'theme-analysis' ? 'text-white font-bold' : 'text-slate-800'}`}>
                Theme Analysis
              </div>
              <div className={`text-[10px] leading-tight mt-0.5 ${activeTab === 'theme-analysis' ? 'text-indigo-100' : 'text-slate-400'}`}>
                Academic Pillars
              </div>
            </div>
          </button>

          {/* 6. Course Comparison */}
          <button
            onClick={() => onSelectTab('course-comparison')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all cursor-pointer ${
              activeTab === 'course-comparison'
                ? 'bg-[#4f46e5] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <BarChart3 className={`w-4 h-4 shrink-0 ${activeTab === 'course-comparison' ? 'text-white' : 'text-slate-400'}`} />
            <div className="min-w-0">
              <div className={`text-xs font-semibold leading-tight ${activeTab === 'course-comparison' ? 'text-white font-bold' : 'text-slate-800'}`}>
                Course Comparison
              </div>
              <div className={`text-[10px] leading-tight mt-0.5 ${activeTab === 'course-comparison' ? 'text-indigo-100' : 'text-slate-400'}`}>
                Benchmark Matrix
              </div>
            </div>
          </button>

          {/* 7. Report Generation */}
          <button
            onClick={() => onSelectTab('report-generation')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all cursor-pointer ${
              activeTab === 'report-generation'
                ? 'bg-[#4f46e5] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <FileText className={`w-4 h-4 shrink-0 ${activeTab === 'report-generation' ? 'text-white' : 'text-slate-400'}`} />
              <div className="min-w-0">
                <div className={`text-xs font-semibold leading-tight ${activeTab === 'report-generation' ? 'text-white font-bold' : 'text-slate-800'}`}>
                  Report Generation
                </div>
                <div className={`text-[10px] leading-tight mt-0.5 ${activeTab === 'report-generation' ? 'text-indigo-100' : 'text-slate-400'}`}>
                  PDF, Excel Export
                </div>
              </div>
            </div>
            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-700 tracking-wider">
              XLS
            </span>
          </button>

          {/* 8. Settings */}
          <button
            onClick={() => onSelectTab('settings')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-[#4f46e5] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Settings className={`w-4 h-4 shrink-0 ${activeTab === 'settings' ? 'text-white' : 'text-slate-400'}`} />
            <div className="min-w-0">
              <div className={`text-xs font-semibold leading-tight ${activeTab === 'settings' ? 'text-white font-bold' : 'text-slate-800'}`}>
                Settings
              </div>
              <div className={`text-[10px] leading-tight mt-0.5 ${activeTab === 'settings' ? 'text-indigo-100' : 'text-slate-400'}`}>
                Preferences
              </div>
            </div>
          </button>

          {/* 9. Help & Guide */}
          <button
            onClick={() => onSelectTab('help-guide')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all cursor-pointer ${
              activeTab === 'help-guide'
                ? 'bg-[#4f46e5] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <HelpCircle className={`w-4 h-4 shrink-0 ${activeTab === 'help-guide' ? 'text-white' : 'text-slate-400'}`} />
            <div className="min-w-0">
              <div className={`text-xs font-semibold leading-tight ${activeTab === 'help-guide' ? 'text-white font-bold' : 'text-slate-800'}`}>
                Help & Guide
              </div>
              <div className={`text-[10px] leading-tight mt-0.5 ${activeTab === 'help-guide' ? 'text-indigo-100' : 'text-slate-400'}`}>
                Instructions
              </div>
            </div>
          </button>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="space-y-2 pt-3">
        {/* 5 Project Modules Box */}
        <button
          onClick={onOpenModulesModal}
          className="w-full flex items-center justify-between p-2 rounded-lg border border-sky-200/80 bg-sky-50/40 hover:bg-sky-50 transition-colors text-left group cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-sky-600" />
            <span className="text-xs font-bold text-slate-800">5 Project Modules</span>
          </div>
          <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded-full bg-white text-sky-700 border border-sky-200 shadow-2xs">
            Viva
          </span>
        </button>

        {/* Offline Showcase Box */}
        <button
          onClick={onOpenOfflineModal}
          className="w-full flex items-center justify-between p-2 rounded-lg border border-emerald-200/80 bg-emerald-50/40 hover:bg-emerald-50 transition-colors text-left group cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Wifi className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-xs font-bold text-slate-800">Offline Showcase</span>
          </div>
          <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded-full bg-white text-emerald-700 border border-emerald-200 shadow-2xs">
            Cached
          </span>
        </button>

        {/* User Profile Card (Dynamic Login / Logout) */}
        <div className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          {currentUser ? (
            <>
              <div
                className="flex items-center gap-2 cursor-pointer hover:opacity-90"
                onClick={onOpenProfileModal}
                title="View Student Profile"
              >
                <div className="w-7 h-7 rounded-full bg-amber-50 dark:bg-amber-900/40 border border-amber-200 dark:border-amber-700 flex items-center justify-center text-sm shrink-0">
                  {currentUser.avatar}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {currentUser.name}
                  </h4>
                  <p className="text-[10px] font-semibold text-blue-600 dark:text-blue-400">
                    {currentUser.role} Account
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenLogoutModal}
                className="mt-2 w-full py-1 px-2.5 rounded-full border border-red-200 dark:border-red-800 bg-red-50/70 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                title="Log out of session"
              >
                <LogOut className="w-3 h-3" />
                <span>Log Out</span>
              </button>
            </>
          ) : (
            <>
              <div
                className="flex items-center gap-2 cursor-pointer hover:opacity-90"
                onClick={onOpenLoginModal}
              >
                <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-sm shrink-0">
                  👤
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Guest User</h4>
                  <p className="text-[10px] font-semibold text-slate-500">Not Signed In</p>
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenLoginModal}
                className="mt-2 w-full py-1 px-2.5 rounded-full border border-blue-200 dark:border-blue-700 bg-blue-50/90 dark:bg-blue-900/40 hover:bg-blue-100 text-blue-700 dark:text-blue-300 text-[11px] font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer shadow-2xs"
                title="Sign in to your account"
              >
                <LogIn className="w-3 h-3" />
                <span>Log In</span>
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
};
