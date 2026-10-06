import React from 'react';
import { X, LogOut } from 'lucide-react';
import { UserProfile } from '../../types';
import { DEFAULT_STUDENT_USER, DEFAULT_FACULTY_USER, DEFAULT_ADMIN_USER } from '../../data/mockData';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onOpenLogout: () => void;
  onSwitchUser?: (user: UserProfile) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onOpenLogout,
  onSwitchUser,
}) => {
  if (!isOpen) return null;

  const handleSelectRole = (user: UserProfile) => {
    if (onSwitchUser) {
      onSwitchUser(user);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white dark:bg-slate-900 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-900/40 border border-amber-200 dark:border-amber-700 flex items-center justify-center text-xl shadow-2xs shrink-0">
              {currentUser?.avatar || '👤'}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                User Profile & Account Switcher
              </h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs text-blue-600 dark:text-blue-400 font-bold leading-tight">
                  Currently: {currentUser ? `${currentUser.name} (${currentUser.role})` : 'Not Signed In'}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body - Only the 3 Login Options */}
        <div className="p-5 space-y-3">
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Select Account
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Choose an authenticated persona below to switch your role instantly:
            </p>
          </div>

          <div className="space-y-2.5 pt-1">
            {/* 1. Login with student account */}
            <button
              type="button"
              onClick={() => handleSelectRole(DEFAULT_STUDENT_USER)}
              className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition-all active:scale-[0.99] cursor-pointer ${
                currentUser?.role === 'Student'
                  ? 'border-blue-500 dark:border-blue-600 bg-blue-50/80 dark:bg-blue-950/40 shadow-xs ring-1 ring-blue-400/40'
                  : 'border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/60 border border-blue-200 dark:border-blue-700 flex items-center justify-center text-xl shrink-0">
                  👨‍🎓
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold flex items-center gap-1.5 text-slate-900 dark:text-white">
                    <span>Login with student account</span>
                    {currentUser?.role === 'Student' && (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-blue-600 text-white">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    V.Benjamin raj • Roll: 2024CS8812 • Sem 6
                  </div>
                </div>
              </div>
              <div className="shrink-0 text-right ml-2">
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg ${
                  currentUser?.role === 'Student'
                    ? 'bg-blue-600 text-white'
                    : 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100'
                }`}>
                  {currentUser?.role === 'Student' ? 'Active' : 'Login →'}
                </span>
              </div>
            </button>

            {/* 2. Login with faculty account */}
            <button
              type="button"
              onClick={() => handleSelectRole(DEFAULT_FACULTY_USER)}
              className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition-all active:scale-[0.99] cursor-pointer ${
                currentUser?.role === 'Faculty'
                  ? 'border-purple-500 dark:border-purple-600 bg-purple-50/80 dark:bg-purple-950/40 shadow-xs ring-1 ring-purple-400/40'
                  : 'border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-700 hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/60 border border-purple-200 dark:border-purple-700 flex items-center justify-center text-xl shrink-0">
                  👨‍🏫
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold flex items-center gap-1.5 text-slate-900 dark:text-white">
                    <span>Login with faculty account</span>
                    {currentUser?.role === 'Faculty' && (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-purple-600 text-white">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    Viswanath sir • Faculty Auditor
                  </div>
                </div>
              </div>
              <div className="shrink-0 text-right ml-2">
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg ${
                  currentUser?.role === 'Faculty'
                    ? 'bg-purple-600 text-white'
                    : 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100'
                }`}>
                  {currentUser?.role === 'Faculty' ? 'Active' : 'Login →'}
                </span>
              </div>
            </button>

            {/* 3. Login with admin account */}
            <button
              type="button"
              onClick={() => handleSelectRole(DEFAULT_ADMIN_USER)}
              className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition-all active:scale-[0.99] cursor-pointer ${
                currentUser?.role === 'Dean/Admin'
                  ? 'border-emerald-500 dark:border-emerald-600 bg-emerald-50/80 dark:bg-emerald-950/40 shadow-xs ring-1 ring-emerald-400/40'
                  : 'border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-700 hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-700 flex items-center justify-center text-xl shrink-0">
                  🏛️
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold flex items-center gap-1.5 text-slate-900 dark:text-white">
                    <span>Login with admin account</span>
                    {currentUser?.role === 'Dean/Admin' && (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-600 text-white">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    Bhaskar rao sir • Academic Administration / Dean
                  </div>
                </div>
              </div>
              <div className="shrink-0 text-right ml-2">
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg ${
                  currentUser?.role === 'Dean/Admin'
                    ? 'bg-emerald-600 text-white'
                    : 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 hover:bg-emerald-100'
                }`}>
                  {currentUser?.role === 'Dean/Admin' ? 'Active' : 'Login →'}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between sticky bottom-0">
          <button
            onClick={() => {
              onClose();
              onOpenLogout();
            }}
            className="text-xs font-semibold text-red-600 hover:text-red-700 dark:text-red-400 flex items-center gap-1 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out Session</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
