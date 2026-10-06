import React, { useState } from 'react';
import {
  X,
  LogOut,
  UserCheck,
  Shield,
  BookOpen,
  Lock,
  Loader2,
  CheckCircle2,
  ArrowRightLeft
} from 'lucide-react';
import { UserProfile } from '../../types';
import { DEFAULT_STUDENT_USER, DEFAULT_FACULTY_USER, DEFAULT_ADMIN_USER } from '../../data/mockData';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onConfirmLogout: () => void;
  onSwitchUser: (user: UserProfile) => void;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onConfirmLogout,
  onSwitchUser,
}) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutStep, setLogoutStep] = useState(0);
  const [switchingUser, setSwitchingUser] = useState<UserProfile | null>(null);

  if (!isOpen) return null;

  const triggerLogoutAnimation = () => {
    setIsLoggingOut(true);
    setLogoutStep(1);

    // Step 1: Revoking token
    setTimeout(() => {
      setLogoutStep(2);
    }, 350);

    // Step 2: Purging cache
    setTimeout(() => {
      setLogoutStep(3);
    }, 700);

    // Step 3: Complete
    setTimeout(() => {
      onConfirmLogout();
      setIsLoggingOut(false);
      setLogoutStep(0);
      onClose();
    }, 1100);
  };

  const triggerSwitchAnimation = (target: UserProfile) => {
    setSwitchingUser(target);
    setIsLoggingOut(true);
    setLogoutStep(1);

    setTimeout(() => {
      setLogoutStep(2);
    }, 350);

    setTimeout(() => {
      onSwitchUser(target);
      setIsLoggingOut(false);
      setLogoutStep(0);
      setSwitchingUser(null);
      onClose();
    }, 850);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-md w-full overflow-hidden transition-all duration-300">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-900/40 border border-red-200 dark:border-red-700 flex items-center justify-center text-red-600 dark:text-red-400">
              <LogOut className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                Authentication & Sign Out
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                Module 1 RBAC Session Management
              </p>
            </div>
          </div>
          {!isLoggingOut && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Dynamic Logging Out Animation View */}
        {isLoggingOut ? (
          <div className="p-8 text-center space-y-5 animate-in zoom-in-95 duration-300">
            {/* Animated Padlock or Switch Ring */}
            <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-red-500/20 dark:bg-red-400/20 animate-ping duration-1000" />
              <div className="absolute inset-1 rounded-full border-2 border-dashed border-red-500 dark:border-red-400 animate-spin" />
              <div className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-red-600 to-rose-700 flex items-center justify-center text-white shadow-lg">
                {switchingUser ? (
                  <ArrowRightLeft className="w-6 h-6 animate-pulse" />
                ) : (
                  <Lock className="w-6 h-6 animate-bounce" />
                )}
              </div>
            </div>

            {/* Title */}
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                {switchingUser
                  ? `Switching to ${switchingUser.name}...`
                  : 'Invalidating Session Credentials...'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {switchingUser
                  ? `Re-scoping RBAC token to ${switchingUser.role} permissions`
                  : 'Terminating cryptographic tokens & audit log seals'}
              </p>
            </div>

            {/* Stepped Progress Bar */}
            <div className="space-y-2 max-w-xs mx-auto">
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-red-600 to-amber-500 h-full rounded-full transition-all duration-300"
                  style={{
                    width: logoutStep === 1 ? '45%' : logoutStep === 2 ? '80%' : '100%',
                  }}
                />
              </div>

              {/* Status Message */}
              <div className="flex items-center justify-center gap-2 text-xs font-semibold">
                {logoutStep === 1 && (
                  <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1.5 animate-pulse">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Flushing local session tokens...</span>
                  </span>
                )}
                {logoutStep === 2 && (
                  <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1.5 animate-pulse">
                    <Shield className="w-3.5 h-3.5" />
                    <span>Sealing access audit ledger...</span>
                  </span>
                )}
                {logoutStep === 3 && (
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 animate-in zoom-in-50 duration-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Signed Out Successfully!</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Content */}
            <div className="p-6 space-y-4">
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-900/40 border border-amber-200 dark:border-amber-700 flex items-center justify-center text-xl shrink-0">
                  {currentUser?.avatar || '👤'}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {currentUser?.name || 'Active Session'}
                  </div>
                  <div className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">
                    {currentUser?.role || 'Guest'} Account • {currentUser?.email || 'Logged In'}
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300">
                Are you sure you want to end this academic evaluation session? You can sign out or switch to another user persona below:
              </p>

              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  Quick Role Switch (Module 1 RBAC Demo)
                </span>

                {/* Student */}
                <button
                  type="button"
                  onClick={() => triggerSwitchAnimation(DEFAULT_STUDENT_USER)}
                  className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-xs text-left transition-all active:scale-[0.99] cursor-pointer ${
                    currentUser?.role === 'Student'
                      ? 'border-blue-300 dark:border-blue-700 bg-blue-50/70 dark:bg-blue-900/30'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <UserCheck className="w-4 h-4 text-blue-600" />
                    <span className="font-bold text-slate-800 dark:text-white">
                      Student Account (V.Benjamin raj)
                    </span>
                  </div>
                  {currentUser?.role === 'Student' ? (
                    <span className="text-[10px] font-bold text-blue-600 bg-white dark:bg-slate-900 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
                      Current
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-500 hover:text-blue-600">Switch →</span>
                  )}
                </button>

                {/* Faculty */}
                <button
                  type="button"
                  onClick={() => triggerSwitchAnimation(DEFAULT_FACULTY_USER)}
                  className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-xs text-left transition-all active:scale-[0.99] cursor-pointer ${
                    currentUser?.role === 'Faculty'
                      ? 'border-purple-300 dark:border-purple-700 bg-purple-50/70 dark:bg-purple-900/30'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="w-4 h-4 text-purple-600" />
                    <span className="font-semibold text-slate-800 dark:text-white">
                      Faculty Auditor (Viswanath sir)
                    </span>
                  </div>
                  {currentUser?.role === 'Faculty' ? (
                    <span className="text-[10px] font-bold text-purple-600 bg-white dark:bg-slate-900 px-2 py-0.5 rounded-full border border-purple-200 dark:border-purple-800">
                      Current
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-500 hover:text-purple-600">Switch →</span>
                  )}
                </button>

                {/* Admin */}
                <button
                  type="button"
                  onClick={() => triggerSwitchAnimation(DEFAULT_ADMIN_USER)}
                  className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-xs text-left transition-all active:scale-[0.99] cursor-pointer ${
                    currentUser?.role === 'Dean/Admin'
                      ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50/70 dark:bg-emerald-900/30'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Shield className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold text-slate-800 dark:text-white">
                      Academic Administrator (Bhaskar rao sir)
                    </span>
                  </div>
                  {currentUser?.role === 'Dean/Admin' ? (
                    <span className="text-[10px] font-bold text-emerald-600 bg-white dark:bg-slate-900 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                      Current
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-500 hover:text-emerald-600">Switch →</span>
                  )}
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={triggerLogoutAnimation}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer active:scale-[0.98]"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out Session</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
