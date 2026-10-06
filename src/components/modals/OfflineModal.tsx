import React from 'react';
import { X, Wifi, CheckCircle2, Database, HardDrive, RefreshCw } from 'lucide-react';
import { FeedbackRecord } from '../../types';

interface OfflineModalProps {
  isOpen: boolean;
  onClose: () => void;
  recordsCount: number;
}

export const OfflineModal: React.FC<OfflineModalProps> = ({
  isOpen,
  onClose,
  recordsCount,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Wifi className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 leading-tight">
                  Offline Showcase & Storage Cache
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Cached
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-tight mt-0.5">
                Service Worker & IndexedDB Local Persistence Engine
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
          <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <div className="text-xs text-emerald-950">
              <strong className="block">Fully Functional Offline</strong>
              Your feedback ratings and statistics work seamlessly even when disconnected from college Wi-Fi.
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white">
              <div className="flex items-center gap-2 text-slate-700 font-medium">
                <HardDrive className="w-4 h-4 text-blue-600" />
                <span>Cached Evaluation Records</span>
              </div>
              <span className="font-bold text-slate-900">{recordsCount} records stored</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white">
              <div className="flex items-center gap-2 text-slate-700 font-medium">
                <Database className="w-4 h-4 text-purple-600" />
                <span>PWA Cache Storage Allocation</span>
              </div>
              <span className="font-bold text-slate-900">94.2 KB (IndexedDB)</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white">
              <div className="flex items-center gap-2 text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Background Sync Engine</span>
              </div>
              <span className="font-bold text-emerald-600">Active & Ready</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
