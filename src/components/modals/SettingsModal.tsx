import React, { useState } from 'react';
import { X, Settings, Shield, Bell, HardDrive, RefreshCw, Moon, Sun } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClearStorage: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onResetDarkMode: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onClearStorage,
  darkMode,
  onToggleDarkMode,
  onResetDarkMode,
}) => {
  const [anonMode, setAnonMode] = useState(true);
  const [offlineSync, setOfflineSync] = useState(true);
  const [auditNotifications, setAuditNotifications] = useState(true);
  const [clearedToast, setClearedToast] = useState(false);

  if (!isOpen) return null;

  const handleResetData = () => {
    onClearStorage();
    setClearedToast(true);
    setTimeout(() => setClearedToast(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                System Preferences & Settings
              </h3>
              <p className="text-xs text-slate-500 leading-tight mt-0.5">
                Evaluation platform parameters & storage configuration
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {clearedToast && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 text-center animate-fade-in">
              System database restored to default initial state!
            </div>
          )}

          {/* Theme Mode Preference & Reset */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {darkMode ? (
                  <Moon className="w-5 h-5 text-indigo-500" />
                ) : (
                  <Sun className="w-5 h-5 text-amber-500" />
                )}
                <div>
                  <span className="text-xs font-bold text-slate-800 block">
                    Appearance Theme
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Currently: {darkMode ? 'Dark Mode (Night)' : 'Light Mode (Original Screenshot)'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-xl">
                <button
                  type="button"
                  onClick={() => {
                    if (darkMode) onToggleDarkMode();
                  }}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    !darkMode
                      ? 'bg-amber-100 text-amber-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5 text-amber-600" />
                  <span>Light mode</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!darkMode) onToggleDarkMode();
                  }}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    darkMode
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5 text-indigo-300" />
                  <span>Dark mode</span>
                </button>
              </div>
            </div>
          </div>

          {/* Toggle 1: Anonymous Feedback */}
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  Anonymous Feedback Masking
                </span>
                <span className="text-[11px] text-slate-500">
                  Protect student identity during faculty review audits
                </span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={anonMode}
              onChange={(e) => setAnonMode(e.target.checked)}
              className="w-4 h-4 accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Toggle 2: Offline Synchronization */}
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
            <div className="flex items-start gap-3">
              <HardDrive className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  Offline IndexedDB Sync
                </span>
                <span className="text-[11px] text-slate-500">
                  Cache ratings locally when campus Wi-Fi disconnected
                </span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={offlineSync}
              onChange={(e) => setOfflineSync(e.target.checked)}
              className="w-4 h-4 accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Toggle 3: Real-time Notifications */}
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
            <div className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  Lecture Evaluation Alerts
                </span>
                <span className="text-[11px] text-slate-500">
                  Notify at end of scheduled lecture periods
                </span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={auditNotifications}
              onChange={(e) => setAuditNotifications(e.target.checked)}
              className="w-4 h-4 accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Reset Database */}
          <div className="pt-2">
            <button
              onClick={handleResetData}
              className="w-full py-2.5 px-4 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset Database to Default Screenshot State</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};
