import React, { useState } from 'react';
import { X, Download, Monitor, Smartphone, CheckCircle } from 'lucide-react';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [installed, setInstalled] = useState(false);

  if (!isOpen) return null;

  const handleSimulateInstall = () => {
    setInstalled(true);
    setTimeout(() => {
      setInstalled(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                Install Offline Application
              </h3>
              <p className="text-xs text-slate-500 leading-tight mt-0.5">
                Progressive Web App (PWA) Standalone Installation
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
          {installed ? (
            <div className="p-6 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">App Icon Added to Your Desktop!</h4>
              <p className="text-xs text-slate-500">
                You can now launch the Course Feedback Analysis System directly from your app dock or homescreen.
              </p>
            </div>
          ) : (
            <>
              <p className="text-xs text-slate-600 leading-relaxed">
                Install the Academic Feedback & Lecture Audit dashboard to run with full native performance, zero latency, and persistent offline access.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col items-center text-center">
                  <Monitor className="w-6 h-6 text-slate-700 mb-1.5" />
                  <span className="text-xs font-bold text-slate-800">Desktop / Laptop</span>
                  <span className="text-[10px] text-slate-500 mt-0.5">Chrome, Edge, Safari</span>
                </div>

                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col items-center text-center">
                  <Smartphone className="w-6 h-6 text-slate-700 mb-1.5" />
                  <span className="text-xs font-bold text-slate-800">Mobile & Tablet</span>
                  <span className="text-[10px] text-slate-500 mt-0.5">iOS & Android</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>
          {!installed && (
            <button
              onClick={handleSimulateInstall}
              className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-sm transition-all"
            >
              Install App Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
