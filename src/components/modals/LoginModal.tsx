import React, { useState } from 'react';
import {
  X,
  LogIn,
  UserCheck,
  Shield,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Lock,
  Loader2,
  ShieldCheck
} from 'lucide-react';
import { UserProfile } from '../../types';
import { DEFAULT_STUDENT_USER, DEFAULT_FACULTY_USER, DEFAULT_ADMIN_USER } from '../../data/mockData';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: UserProfile) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLogin,
}) => {
  const [customEmail, setCustomEmail] = useState('');
  const [customPassword, setCustomPassword] = useState('');
  const [customName, setCustomName] = useState('');
  const [customRole, setCustomRole] = useState<'Student' | 'Faculty' | 'Dean/Admin'>('Student');
  const [activeTab, setActiveTab] = useState<'quick' | 'custom'>('quick');

  // Animation States
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authStep, setAuthStep] = useState(0);
  const [targetUser, setTargetUser] = useState<UserProfile | null>(null);

  if (!isOpen) return null;

  const triggerLoginAnimation = (user: UserProfile) => {
    setTargetUser(user);
    setIsAuthenticating(true);
    setAuthStep(1);

    // Step 1: Verification
    setTimeout(() => {
      setAuthStep(2);
    }, 400);

    // Step 2: Session Token Granted
    setTimeout(() => {
      setAuthStep(3);
    }, 850);

    // Step 3: Complete and close
    setTimeout(() => {
      onLogin(user);
      setIsAuthenticating(false);
      setAuthStep(0);
      setTargetUser(null);
      onClose();
    }, 1300);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: UserProfile = {
      name: customName.trim() || (customRole === 'Student' ? 'V.Benjamin raj' : customRole === 'Faculty' ? 'Viswanath sir' : 'Bhaskar rao sir'),
      email: customEmail.trim() || (customRole === 'Student' ? 'mail2benzraj@gmail.com' : customRole === 'Faculty' ? 'viswanath.sir@university.edu' : 'bhaskar.rao@university.edu'),
      rollNo: customRole === 'Student' ? '2024CS' + Math.floor(1000 + Math.random() * 9000) : undefined,
      role: customRole,
      avatar: customRole === 'Student' ? '👨‍🎓' : customRole === 'Faculty' ? '👨‍🏫' : '🏛️',
      department: 'Computer Science & Engineering',
      semester: customRole === 'Student' ? 'Semester 6' : undefined,
    };
    triggerLoginAnimation(newUser);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-md w-full overflow-hidden transition-all duration-300">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-700 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <LogIn className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                Authentication & Sign In
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                Module 1 Role-Based Access Control (RBAC)
              </p>
            </div>
          </div>
          {!isAuthenticating && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Dynamic Authenticating Animation View */}
        {isAuthenticating && targetUser ? (
          <div className="p-8 text-center space-y-5 animate-in zoom-in-95 duration-300">
            {/* Pulsing Avatar Halo */}
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-blue-500/20 dark:bg-blue-400/20 animate-ping duration-1000" />
              <div className="absolute inset-1 rounded-full border-2 border-dashed border-blue-500 dark:border-blue-400 animate-spin" />
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-3xl shadow-lg border-2 border-white dark:border-slate-900">
                {targetUser.avatar}
              </div>
            </div>

            {/* User Title */}
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                {targetUser.name}
              </h4>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-0.5">
                {targetUser.role} Account • {targetUser.email}
              </p>
            </div>

            {/* Stepped Progress Indicator */}
            <div className="space-y-2 max-w-xs mx-auto">
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-600 to-emerald-500 h-full rounded-full transition-all duration-300"
                  style={{
                    width: authStep === 1 ? '40%' : authStep === 2 ? '75%' : '100%',
                  }}
                />
              </div>

              {/* Status Message */}
              <div className="flex items-center justify-center gap-2 text-xs font-semibold">
                {authStep === 1 && (
                  <span className="text-blue-600 dark:text-blue-400 flex items-center gap-1.5 animate-pulse">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Verifying institutional enrollment tokens...</span>
                  </span>
                )}
                {authStep === 2 && (
                  <span className="text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 animate-pulse">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Validating Module 1 RBAC privileges...</span>
                  </span>
                )}
                {authStep === 3 && (
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 animate-in zoom-in-50 duration-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Access Granted! Loading Workspace...</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Tab switcher */}
            <div className="flex border-b border-slate-100 dark:border-slate-800 px-6 pt-3 bg-slate-50/50 dark:bg-slate-900/50">
              <button
                type="button"
                onClick={() => setActiveTab('quick')}
                className={`pb-2.5 px-3 text-xs font-bold transition-colors border-b-2 ${
                  activeTab === 'quick'
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                Quick Select Persona
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('custom')}
                className={`pb-2.5 px-3 text-xs font-bold transition-colors border-b-2 ${
                  activeTab === 'custom'
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                Enter Credentials
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {activeTab === 'quick' ? (
                <div className="space-y-3">
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Choose an authenticated persona to sign into the academic audit portal:
                  </p>

                  {/* Persona 1: Default Student */}
                  <button
                    type="button"
                    onClick={() => triggerLoginAnimation(DEFAULT_STUDENT_USER)}
                    className="w-full p-3 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/60 dark:bg-blue-900/20 hover:bg-blue-100/60 dark:hover:bg-blue-900/40 flex items-center justify-between text-left transition-all group active:scale-[0.99] cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-700 flex items-center justify-center text-lg shadow-2xs group-hover:scale-110 transition-transform">
                        👨‍🎓
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <span>V.Benjamin raj</span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                            STUDENT
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          Roll: 2024CS8812 • B.Tech CSE (Sem 6)
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                      Login →
                    </span>
                  </button>

                  {/* Persona 2: Faculty */}
                  <button
                    type="button"
                    onClick={() => triggerLoginAnimation(DEFAULT_FACULTY_USER)}
                    className="w-full p-3 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-900/20 hover:bg-purple-100/50 dark:hover:bg-purple-900/40 flex items-center justify-between text-left transition-all group active:scale-[0.99] cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-purple-200 dark:border-purple-700 flex items-center justify-center text-lg shadow-2xs group-hover:scale-110 transition-transform">
                        👨‍🏫
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <span>Viswanath sir</span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                            FACULTY
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          viswanath.sir@university.edu • Faculty Auditor
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-purple-600 dark:text-purple-400 group-hover:translate-x-1 transition-transform">
                      Login →
                    </span>
                  </button>

                  {/* Persona 3: Admin */}
                  <button
                    type="button"
                    onClick={() => triggerLoginAnimation(DEFAULT_ADMIN_USER)}
                    className="w-full p-3 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-900/20 hover:bg-emerald-100/50 dark:hover:bg-emerald-900/40 flex items-center justify-between text-left transition-all group active:scale-[0.99] cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-700 flex items-center justify-center text-lg shadow-2xs group-hover:scale-110 transition-transform">
                        🏛️
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <span>Bhaskar rao sir</span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                            ADMIN
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          bhaskar.rao@university.edu • Academic Administration
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                      Login →
                    </span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCustomSubmit} className="space-y-3.5">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. V.Benjamin raj"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      University Email or Roll ID
                    </label>
                    <input
                      type="text"
                      placeholder="mail2benzraj@gmail.com or 2024CS8812"
                      value={customEmail}
                      onChange={(e) => setCustomEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Account Role
                    </label>
                    <select
                      value={customRole}
                      onChange={(e) => setCustomRole(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Student">Student (Feedback Ingestion)</option>
                      <option value="Faculty">Faculty (Lecture Audit & Benchmarking)</option>
                      <option value="Dean/Admin">Dean/Admin (Accreditation Officer)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={customPassword}
                      onChange={(e) => setCustomPassword(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer active:scale-[0.98]"
                  >
                    Sign In With Credentials
                  </button>
                </form>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between">
              <button
                type="button"
                onClick={() => triggerLoginAnimation(DEFAULT_STUDENT_USER)}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Reset to Original Student State</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
