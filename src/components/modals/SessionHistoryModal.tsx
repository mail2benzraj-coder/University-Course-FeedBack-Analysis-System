import React from 'react';
import { X, GraduationCap, CheckCircle2, Clock, MapPin, Calendar } from 'lucide-react';
import { STUDENT_SESSION_RECORDS } from '../../data/mockData';

interface SessionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenFeedback: () => void;
}

export const SessionHistoryModal: React.FC<SessionHistoryModalProps> = ({
  isOpen,
  onClose,
  onOpenFeedback,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 leading-tight">
                  Student Session History & Lecture Records
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Active Session
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-tight mt-0.5">
                V.Benjamin raj (2024CS8812) • Biometric & Lecture Attendance Verified
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
        <div className="p-6 space-y-5 overflow-y-auto">
          {/* Active Session Info Box */}
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              <div>
                <h4 className="text-xs font-bold text-emerald-950">Active Academic Session 2026</h4>
                <p className="text-[11px] text-emerald-800/80">
                  Semester 6 • 94.2% Verified Lecture Attendance Rate
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenFeedback();
              }}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
            >
              + Rate Next Session
            </button>
          </div>

          {/* Session Cards */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Completed Lecture Audits & Records
            </h4>
            <div className="space-y-2.5">
              {STUDENT_SESSION_RECORDS.map((sess) => (
                <div
                  key={sess.id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-blue-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        {sess.id}
                      </span>
                      <h5 className="text-xs font-bold text-slate-900">{sess.subject}</h5>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
                      <span className="font-medium text-slate-700">{sess.faculty}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {sess.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {sess.room}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {sess.duration}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                      ★ {sess.rating} Stars
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {sess.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
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
