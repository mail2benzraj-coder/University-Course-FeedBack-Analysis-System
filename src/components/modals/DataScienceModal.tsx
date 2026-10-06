import React from 'react';
import { X, Database, Cpu, Binary, BarChart2, Layers } from 'lucide-react';

interface DataScienceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DataScienceModal: React.FC<DataScienceModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                Analytics & Data Science Platform Architecture
              </h3>
              <p className="text-xs text-slate-500 leading-tight mt-0.5">
                Statistical Inference & Faculty Lecture Model Technical Dossier
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
        <div className="p-6 space-y-5">
          <div className="p-4 rounded-xl bg-gradient-to-r from-sky-500/10 to-indigo-500/10 border border-sky-200 space-y-1">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-sky-600" />
              Real-time Ingestion & Statistical Pipeline
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              This platform bridges academic administration with data science algorithms. Rather than simple averages,
              it implements parametric Likert models, variance bounding (σ² = 0.1), and two-tailed Student t-distribution
              confidence intervals to eliminate sample skew.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Binary className="w-4 h-4 text-indigo-600" />
                <span>Parametric Likert Modeling</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Transforms ordinal star ratings into continuous interval estimates with weighted criteria for pedagogical clarity and syllabus retention.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <BarChart2 className="w-4 h-4 text-emerald-600" />
                <span>Accreditation Normalization</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Calibrates raw evaluations against department-wide historical baselines to identify statistically significant outliers and faculty excellence.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Layers className="w-4 h-4 text-blue-600" />
                <span>5 Integrated Core Modules</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Decoupled pipeline comprising Auth RBAC, Feedback Ingestion, Temporal Logs, Thematic Analytics, and Accreditation Exporting.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Database className="w-4 h-4 text-purple-600" />
                <span>Zero-Latency Offline Cache</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                PWA Service Worker caches evaluation payloads in local storage with automatic optimistic update synchronization.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
