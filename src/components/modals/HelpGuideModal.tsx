import React from 'react';
import { X, HelpCircle, BookOpen, Calculator, Award } from 'lucide-react';

interface HelpGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpGuideModal: React.FC<HelpGuideModalProps> = ({
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
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                Help & Guide — Evaluation Manual & Formulas
              </h3>
              <p className="text-xs text-slate-500 leading-tight mt-0.5">
                Mathematical formulations & platform operational guidelines
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
        <div className="p-6 space-y-6">
          {/* Section 1: Dashboard Flow */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>1. System Overview & Evaluation Workflow</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              The <strong>University Course Feedback Analysis System</strong> is a multi-tier academic evaluation
              platform designed to provide real-time faculty lecture auditing across 8 engineering semesters.
              Students submit multi-criteria Likert ratings for pedagogical clarity, course pacing, and syllabus depth,
              with all submissions backed by anti-tamper SHA-256 hashes.
            </p>
          </div>

          {/* Section 2: Mathematical Formulations */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
              <Calculator className="w-4 h-4 text-emerald-600" />
              <span>2. Statistical Formulations</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1">
                <span className="font-bold text-slate-900 block">Mean Rating (M):</span>
                <code className="text-[11px] text-blue-600 font-mono block bg-blue-50/60 p-1.5 rounded">
                  M = (1/N) * Σ(x_i)
                </code>
                <p className="text-[11px] text-slate-500 mt-1">
                  Arithmetic mean of all lecture ratings submitted for the selected filter set.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1">
                <span className="font-bold text-slate-900 block">Sample Variance (σ²) & Std Dev (Σ):</span>
                <code className="text-[11px] text-blue-600 font-mono block bg-blue-50/60 p-1.5 rounded">
                  σ² = Σ(x_i - M)² / (N - 1)
                </code>
                <p className="text-[11px] text-slate-500 mt-1">
                  Quantifies consensus and distribution dispersion across student scores.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1">
                <span className="font-bold text-slate-900 block">95% Confidence Interval:</span>
                <code className="text-[11px] text-blue-600 font-mono block bg-blue-50/60 p-1.5 rounded">
                  CI = M ± 1.96 * (s / √N)
                </code>
                <p className="text-[11px] text-slate-500 mt-1">
                  Evaluates statistical significance with 95% certainty bounds.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1">
                <span className="font-bold text-slate-900 block">5-Star Benchmark Ratio:</span>
                <code className="text-[11px] text-blue-600 font-mono block bg-blue-50/60 p-1.5 rounded">
                  Ratio = (Count of 5★ / N) * 100%
                </code>
                <p className="text-[11px] text-slate-500 mt-1">
                  Proportion of ratings achieving top-tier satisfaction index.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Viva Tips */}
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Viva Voce Key Questions & Responses</span>
            </div>
            <ul className="text-xs text-amber-950/80 space-y-1 list-disc list-inside">
              <li><strong>Why 5 Core Modules?</strong> Modular separation of concerns for RBAC, Ingestion, Logging, Analytics, and Report Generation.</li>
              <li><strong>How is data integrity guaranteed?</strong> Cryptographic hashing and student enrollment session binding prevent forged submissions.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
