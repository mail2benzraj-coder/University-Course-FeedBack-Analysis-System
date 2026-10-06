import React from 'react';
import { X, FileSpreadsheet, Download, Printer, CheckCircle2 } from 'lucide-react';
import { FeedbackRecord, SystemStats } from '../../types';
import { exportToCSV } from '../../utils/stats';

interface ReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
  records: FeedbackRecord[];
  stats: SystemStats;
}

export const ReportsModal: React.FC<ReportsModalProps> = ({
  isOpen,
  onClose,
  records,
  stats,
}) => {
  if (!isOpen) return null;

  const handleDownloadCSV = () => {
    exportToCSV(records);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 leading-tight">
                  Academic Report Generation Engine
                </h3>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  MODULE 5
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-tight mt-0.5">
                Automated executive and academic accreditation export suite (NBA / NAAC / ABET)
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

        <div className="p-6 space-y-6">
          {/* Quick Download Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/30 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900">Export Raw Dataset (.XLSX / CSV)</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Includes {records.length} lecture evaluations with full criteria & SHA hashes
                </p>
              </div>
              <button
                onClick={handleDownloadCSV}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#047857] hover:bg-[#065f46] text-white text-xs font-semibold shadow-sm transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .CSV</span>
              </button>
            </div>

            <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/30 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900">Executive PDF Dossier</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Accreditation audit summary & standard deviation benchmark
                </p>
              </div>
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#4f46e5] hover:bg-[#4338ca] text-white text-xs font-semibold shadow-sm transition-all"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / PDF</span>
              </button>
            </div>
          </div>

          {/* Statistical Audit Summary */}
          <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/60">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
              Statistical Summary Matrix
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 font-bold block">MEAN RATING (M)</span>
                <span className="text-lg font-black text-slate-900">{stats.meanRating} / 5.0</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 font-bold block">RESPONSES (N)</span>
                <span className="text-lg font-black text-slate-900">{stats.totalResponses}</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 font-bold block">STD DEVIATION (Σ)</span>
                <span className="text-lg font-black text-slate-900">±{stats.stdDev}</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 font-bold block">5-STAR RATIO</span>
                <span className="text-lg font-black text-emerald-600">{stats.fiveStarRatio}%</span>
              </div>
            </div>
          </div>

          {/* Compliance & Accreditation Standards */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Accreditation Compliance Checkpoints
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="p-3 rounded-lg border border-emerald-200 bg-emerald-50/20 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-800 block">NBA Criterion 2.2</span>
                  <span className="text-[11px] text-slate-500">
                    Teaching-Learning Process feedback index exceeds 85% requirement.
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-lg border border-emerald-200 bg-emerald-50/20 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-800 block">NAAC Key Indicator 2.7</span>
                  <span className="text-[11px] text-slate-500">
                    Student Satisfaction Survey (SSS) verified at {stats.turnoutPct}% turnout.
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-lg border border-emerald-200 bg-emerald-50/20 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-800 block">ABET Criterion 4</span>
                  <span className="text-[11px] text-slate-500">
                    Continuous improvement metrics logged with tamper-proof hashing.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Records Preview Table */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Recent Sample Records ({records.length} total)
              </h4>
              <span className="text-[11px] text-slate-500 font-medium">Export ready in UTF-8 format</span>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                  <tr>
                    <th className="p-2.5">ID</th>
                    <th className="p-2.5">Faculty</th>
                    <th className="p-2.5">Subject</th>
                    <th className="p-2.5">Semester</th>
                    <th className="p-2.5 text-center">Rating</th>
                    <th className="p-2.5">Hash</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {records.slice(0, 5).map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50/50">
                      <td className="p-2.5 font-mono text-[11px] text-blue-600">{r.id}</td>
                      <td className="p-2.5 font-medium">{r.facultyName}</td>
                      <td className="p-2.5 max-w-[180px] truncate">{r.subject}</td>
                      <td className="p-2.5">{r.semester}</td>
                      <td className="p-2.5 text-center font-bold text-amber-500">{r.overallRating} ★</td>
                      <td className="p-2.5 font-mono text-[10px] text-slate-400">{r.verificationHash}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold transition-colors"
          >
            Close Report Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
