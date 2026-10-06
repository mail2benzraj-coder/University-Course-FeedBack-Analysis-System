import React, { useState } from 'react';
import {
  Database,
  Download,
  Moon,
  Sun,
  Layers,
  PlusCircle,
  ChevronDown,
  LogOut,
  LogIn,
  Share2,
  Check
} from 'lucide-react';
import { UserProfile } from '../types';

interface HeaderProps {
  currentUser: UserProfile | null;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenRateLecture: () => void;
  onOpenModulesModal: () => void;
  onOpenOfflineModal: () => void;
  onOpenInstallAppModal: () => void;
  onOpenProfileModal: () => void;
  onOpenLogoutModal: () => void;
  onOpenLoginModal: () => void;
  onOpenDataScienceModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  darkMode,
  onToggleDarkMode,
  onOpenRateLecture,
  onOpenModulesModal,
  onOpenOfflineModal,
  onOpenInstallAppModal,
  onOpenProfileModal,
  onOpenLogoutModal,
  onOpenLoginModal,
  onOpenDataScienceModal,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyPublicLink = async () => {
    const publicUrl = window.location.origin.includes('ais-dev')
      ? window.location.origin.replace('ais-dev', 'ais-pre')
      : window.location.origin;

    try {
      await navigator.clipboard.writeText(publicUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // fallback prompt if clipboard api restricted
      window.prompt('Copy public access link:', publicUrl);
    }
  };
  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-5 py-2.5 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Left: Branding & Subtitle */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#18182f] flex flex-col items-center justify-center text-white text-[9px] font-black leading-none tracking-tighter shrink-0 shadow-xs">
          <span>01</span>
          <span>10</span>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
              University Course Feedback
            </h2>
            <button
              onClick={onOpenDataScienceModal}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 text-[10px] font-semibold hover:bg-sky-100 transition-colors cursor-pointer"
            >
              <Database className="w-3 h-3" />
              <span>Data Science</span>
            </button>
          </div>
          <p className="text-[10px] font-normal text-slate-500 dark:text-slate-400 leading-tight">
            Multi-Tier Academic Evaluation & Faculty Lecture Audit System
          </p>
        </div>
      </div>

      {/* Right Controls - Grouped & Compacted */}
      <div className="flex items-center gap-2">
        {/* System Group: Offline & Install & Theme */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onOpenOfflineModal}
            className="flex items-center gap-1 px-2 py-1 rounded-lg border border-teal-300 dark:border-teal-700 bg-teal-50/70 dark:bg-teal-900/30 hover:bg-teal-100/70 text-teal-800 dark:text-teal-300 text-[11px] font-medium transition-colors cursor-pointer"
            title="PWA Offline Storage Active"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Offline Ready</span>
          </button>

          <button
            onClick={onOpenInstallAppModal}
            className="flex items-center gap-1 px-2 py-1 rounded-lg border border-sky-300 dark:border-sky-700 bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 text-[11px] font-medium hover:bg-sky-100 transition-colors cursor-pointer"
            title="Install as Progressive Web App"
          >
            <Download className="w-3 h-3" />
            <span>Install</span>
          </button>

          <button
            onClick={handleCopyPublicLink}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all cursor-pointer text-[11px] font-bold ${
              copiedLink
                ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 shadow-2xs'
                : 'border-indigo-300 dark:border-indigo-700 bg-indigo-50/80 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50'
            }`}
            title="Copy Public Access Link for Outsiders"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Link Copied!' : 'Public Link'}</span>
          </button>

          {/* Clear Dark Mode and Light Mode Switch */}
          <div className="flex items-center rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100/90 dark:bg-slate-850 p-0.5 text-[11px]">
            <button
              type="button"
              onClick={() => {
                if (darkMode) onToggleDarkMode();
              }}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                !darkMode
                  ? 'bg-white text-slate-900 shadow-2xs font-bold border border-slate-200/80'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
              title="Activate Light mode"
            >
              <Sun className="w-3 h-3 text-amber-500" />
              <span>Light mode</span>
            </button>
            <button
              type="button"
              onClick={() => {
                if (!darkMode) onToggleDarkMode();
              }}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                darkMode
                  ? 'bg-indigo-600 text-white shadow-2xs font-bold'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
              title="Activate Dark mode"
            >
              <Moon className="w-3 h-3 text-indigo-200" />
              <span>Dark mode</span>
            </button>
          </div>
        </div>

        <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-0.5 hidden sm:block" />

        {/* Action Group: 5 Modules & Rate Lecture */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onOpenModulesModal}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-sky-300 dark:border-sky-700 bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 text-[11px] font-semibold hover:bg-sky-100 transition-colors cursor-pointer"
          >
            <Layers className="w-3 h-3 text-sky-600 dark:text-sky-400" />
            <span>5 Modules</span>
          </button>

          <button
            onClick={onOpenRateLecture}
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-[#0284c7] hover:bg-[#0369a1] text-white text-[11px] font-bold shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
          >
            <PlusCircle className="w-3 h-3" />
            <span>Rate Lecture</span>
          </button>
        </div>

        <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-0.5 hidden sm:block" />

        {/* Account Group: Profile Pill & Logout/Login */}
        <div className="flex items-center gap-1.5">
          {currentUser ? (
            <div
              onClick={onOpenProfileModal}
              className="flex items-center gap-1.5 pl-1.5 pr-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-colors cursor-pointer"
              title="View User Profile & Credentials"
            >
              <div className="w-5 h-5 rounded-full bg-amber-50 dark:bg-amber-900/40 border border-amber-200 dark:border-amber-700 flex items-center justify-center text-[10px]">
                {currentUser.avatar}
              </div>
              <span className="text-[11px] font-bold text-slate-800 dark:text-white max-w-[90px] sm:max-w-[120px] truncate">
                {currentUser.name}
              </span>
              <span className="text-[9px] font-bold px-1 py-0.2 rounded bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 tracking-wider">
                {currentUser.role.toUpperCase()}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>
          ) : (
            <button
              onClick={onOpenLoginModal}
              className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] font-bold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              <span className="text-xs">👤</span>
              <span>Guest</span>
            </button>
          )}

          {currentUser ? (
            <button
              onClick={onOpenLogoutModal}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-[11px] font-semibold hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors cursor-pointer"
              title="Sign out of current account"
            >
              <LogOut className="w-3 h-3" />
              <span>Logout</span>
            </button>
          ) : (
            <button
              onClick={onOpenLoginModal}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-[11px] font-bold hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors cursor-pointer shadow-2xs"
              title="Sign in to your account"
            >
              <LogIn className="w-3 h-3" />
              <span>Login</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
