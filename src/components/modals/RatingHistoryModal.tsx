import React, { useState } from 'react';
import {
  X,
  Search,
  Star,
  Download,
  ShieldCheck,
  History,
  Trash2,
  RotateCcw,
  AlertTriangle,
  PlusCircle,
  CheckCircle2
} from 'lucide-react';
import { FeedbackRecord } from '../../types';
import { exportToCSV } from '../../utils/stats';

interface RatingHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  records: FeedbackRecord[];
  onClearHistory?: () => void;
  onResetDefaultHistory?: () => void;
  onOpenFeedbackModal?: () => void;
}

export const RatingHistoryModal: React.FC<RatingHistoryModalProps> = ({
  isOpen,
  onClose,
  records,
  onClearHistory,
  onResetDefaultHistory,
  onOpenFeedbackModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRating, setSelectedRating] = useState<number | 'all'>('all');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  if (!isOpen) return null;

  const filtered = records.filter((r) => {
    const matchesSearch =
      r.facultyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRating = selectedRating === 'all' || r.overallRating === selectedRating;

    return matchesSearch && matchesRating;
  });

  const handleConfirmClear = () => {
    if (onClearHistory) {
      onClearHistory();
    }
    setShowClearConfirm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white dark:bg-slate-900 z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-700 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <History className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                  Feedback History & Evaluation Records
                </h3>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300">
                  MODULE 3
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                Complete historical audit log of student lecture ratings & evaluations
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters & Search */}
        <div className="p-3.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search faculty, subject, student name, ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3.5 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-2xs"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Rating:</span>
            <div className="flex items-center gap-0.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-0.5 text-xs shadow-2xs">
              <button
                onClick={() => setSelectedRating('all')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors cursor-pointer ${
                  selectedRating === 'all'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                All ({records.length})
              </button>
              <button
                onClick={() => setSelectedRating(5)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors cursor-pointer ${
                  selectedRating === 5
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                5 ★
              </button>
              <button
                onClick={() => setSelectedRating(4)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors cursor-pointer ${
                  selectedRating === 4
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                4 ★
              </button>
            </div>

            <button
              onClick={() => exportToCSV(filtered)}
              disabled={filtered.length === 0}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white text-[11px] font-bold shadow-2xs disabled:opacity-50 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Table Body / Empty State */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {records.length === 0 ? (
            <div className="p-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-900/30 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto text-2xl">
                📋
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-800 dark:text-white">
                  Feedback History is Currently Empty
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1">
                  All previous evaluation records have been cleared. Submit a new lecture rating or restore the original sample records below.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                {onOpenFeedbackModal && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenFeedbackModal();
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>+ Submit New Feedback</span>
                  </button>
                )}
                {onResetDefaultHistory && (
                  <button
                    onClick={onResetDefaultHistory}
                    className="px-4 py-2 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restore Sample Data</span>
                  </button>
                )}
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-10 text-center border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-900/30">
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                No records match search filter "{searchTerm}"
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedRating('all');
                }}
                className="mt-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-x-auto shadow-2xs bg-white dark:bg-slate-900">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold text-[11px]">
                  <tr>
                    <th className="p-3">Ref ID & Time</th>
                    <th className="p-3">Evaluator</th>
                    <th className="p-3">Faculty & Course</th>
                    <th className="p-3">Branch & Sem</th>
                    <th className="p-3 text-center">Score</th>
                    <th className="p-3">Student Comment</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {filtered.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="p-3 align-top">
                        <div className="font-mono text-blue-600 dark:text-blue-400 font-bold">{r.id}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          {r.date} • {r.time}
                        </div>
                      </td>
                      <td className="p-3 align-top">
                        <div className="font-bold text-slate-900 dark:text-white">{r.studentName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{r.studentRoll}</div>
                      </td>
                      <td className="p-3 align-top max-w-[200px]">
                        <div className="font-bold text-slate-800 dark:text-slate-100">{r.facultyName}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{r.subject}</div>
                      </td>
                      <td className="p-3 align-top">
                        <div className="font-semibold text-slate-700 dark:text-slate-300">{r.semester}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[140px]">{r.branch}</div>
                      </td>
                      <td className="p-3 align-top text-center">
                        <div className="inline-flex items-center gap-1 font-bold text-amber-500 bg-amber-50 dark:bg-amber-900/30 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-800">
                          <span>{r.overallRating}</span>
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        </div>
                        <div className="text-[9px] text-slate-400 mt-0.5">Clarity: {r.criteria.clarity}★</div>
                      </td>
                      <td className="p-3 align-top max-w-[240px]">
                        <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2 italic">
                          "{r.comment}"
                        </p>
                      </td>
                      <td className="p-3 align-top">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          <span>{r.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Dedicated "Clear History" Action Bar below the History Table */}
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 flex items-center justify-center text-red-600 dark:text-red-400">
                <Trash2 className="w-3.5 h-3.5" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-slate-800 dark:text-white">
                  Feedback History Management
                </h5>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  Total records stored: {records.length} • All entries backed up in offline browser storage
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              {showClearConfirm ? (
                <div className="flex items-center gap-1.5 p-1 px-2 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-300 dark:border-red-800 animate-in zoom-in-95 duration-200">
                  <span className="text-[11px] font-bold text-red-700 dark:text-red-300 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Clear all {records.length} records?</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleConfirmClear}
                    className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold shadow-xs cursor-pointer"
                  >
                    Yes, Clear
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowClearConfirm(false)}
                    className="px-2 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[10px] font-semibold hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowClearConfirm(true)}
                  disabled={records.length === 0}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-800 bg-red-50/80 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs font-bold hover:bg-red-100 dark:hover:bg-red-900/60 transition-colors disabled:opacity-40 cursor-pointer"
                  title="Clear all feedback records"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear History</span>
                </button>
              )}

              {onResetDefaultHistory && (
                <button
                  type="button"
                  onClick={onResetDefaultHistory}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  title="Restore initial default feedback records"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                  <span>Restore Samples</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Showing {filtered.length} of {records.length} evaluation records</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
