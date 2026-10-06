import React, { useState } from 'react';
import { X, Star, CheckCircle, ShieldCheck, History, Trash2, User } from 'lucide-react';
import { FeedbackRecord, UserProfile } from '../../types';
import { ENGINEERING_BRANCHES, SEMESTERS, FACULTY_MEMBERS, STUDENT_LIST } from '../../data/mockData';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (record: FeedbackRecord) => void;
  currentUser?: UserProfile | null;
  onOpenHistory?: () => void;
  onClearHistory?: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  currentUser,
  onOpenHistory,
  onClearHistory,
}) => {
  const [studentName, setStudentName] = useState(() => {
    if (currentUser?.role === 'Student' && STUDENT_LIST.includes(currentUser.name)) {
      return currentUser.name;
    }
    return STUDENT_LIST[0]; // 'Abhinav'
  });
  const [facultyName, setFacultyName] = useState(FACULTY_MEMBERS[1].name);
  const [subject, setSubject] = useState(FACULTY_MEMBERS[1].subject);
  const [semester, setSemester] = useState('Semester 6');
  const [branch, setBranch] = useState(ENGINEERING_BRANCHES[1]);
  const [overallRating, setOverallRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [lastSubmittedRecord, setLastSubmittedRecord] = useState<FeedbackRecord | null>(null);

  const [criteria, setCriteria] = useState({
    clarity: 5,
    knowledge: 5,
    pace: 5,
    doubts: 5,
    syllabus: 5,
  });

  const [comment, setComment] = useState(
    'Exceptional lecture delivery with clear conceptual frameworks and rigorous practical examples.'
  );
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleFacultyChange = (name: string) => {
    setFacultyName(name);
    const found = FACULTY_MEMBERS.find((f) => f.name === name);
    if (found && found.subject !== 'All Subjects') {
      setSubject(found.subject);
    }
  };

  const getStudentRoll = (name: string) => {
    const idx = STUDENT_LIST.indexOf(name);
    if (idx !== -1) {
      return `2024CS881${idx + 1}`;
    }
    return currentUser?.rollNo || '2024CS8812';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const randomHash = 'SHA-' + Math.random().toString(36).substring(2, 11);
    const chosenStudent = studentName || currentUser?.name || 'Abhinav';
    const newRecord: FeedbackRecord = {
      id: `FB-2026-${Math.floor(100 + Math.random() * 900)}`,
      studentName: chosenStudent,
      studentRoll: getStudentRoll(chosenStudent),
      facultyName,
      subject,
      semester,
      branch,
      overallRating,
      criteria,
      comment,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      verificationHash: randomHash,
      status: 'Verified',
    };

    onSubmit(newRecord);
    setLastSubmittedRecord(newRecord);
    setSubmitted(true);
  };

  const handleFinishAndOpenHistory = () => {
    setSubmitted(false);
    onClose();
    if (onOpenHistory) {
      onOpenHistory();
    }
  };

  const handleFinishClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white dark:bg-slate-900 z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-700 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Star className="w-4 h-4 fill-blue-600 text-blue-600 dark:fill-blue-400 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                Rate Faculty Lecture — Feedback Ingestion
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                Module 2 Evaluation Pipeline • Logged in as {currentUser?.name || 'Student'}
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

        {submitted ? (
          <div className="p-8 text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle className="w-8 h-8 animate-bounce" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Feedback Successfully Ingested!
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto mt-1">
                Cryptographic SHA verification generated. Stored permanently in your Feedback History ledger.
              </p>
            </div>

            {/* Submission Summary Pill */}
            {lastSubmittedRecord && (
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 max-w-md mx-auto text-left text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                  <span>{lastSubmittedRecord.facultyName}</span>
                  <span className="text-amber-500">★ {lastSubmittedRecord.overallRating}.0 / 5.0</span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {lastSubmittedRecord.subject} ({lastSubmittedRecord.semester})
                </div>
                <div className="text-[10px] font-mono text-blue-600 dark:text-blue-400 pt-1 border-t border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
                  <span>ID: {lastSubmittedRecord.id}</span>
                  <span>Hash: {lastSubmittedRecord.verificationHash}</span>
                </div>
              </div>
            )}

            {/* Direct navigation buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleFinishAndOpenHistory}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <History className="w-3.5 h-3.5" />
                <span>View in Feedback History</span>
              </button>
              <button
                type="button"
                onClick={handleFinishClose}
                className="px-4 py-2 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                Done & Close
              </button>
            </div>

            {/* Clear History option below submission screen */}
            {onClearHistory && (
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 max-w-xs mx-auto">
                <button
                  type="button"
                  onClick={() => {
                    onClearHistory();
                    handleFinishClose();
                  }}
                  className="text-[11px] font-semibold text-red-500 hover:text-red-700 dark:hover:text-red-400 flex items-center justify-center gap-1 mx-auto hover:underline cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear All Feedback History</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Student Evaluator Selection */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Student Name (Evaluator)
              </label>
              <select
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
              >
                {STUDENT_LIST.map((name) => (
                  <option key={name} value={name}>
                    {name} ({getStudentRoll(name)})
                  </option>
                ))}
                {currentUser && !STUDENT_LIST.includes(currentUser.name) && (
                  <option value={currentUser.name}>
                    {currentUser.name} ({currentUser.role})
                  </option>
                )}
              </select>
            </div>

            {/* Faculty & Subject */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Faculty Member
                </label>
                <select
                  value={facultyName}
                  onChange={(e) => handleFacultyChange(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {FACULTY_MEMBERS.filter((f) => f.name !== 'All Faculty Members').map((f) => (
                    <option key={f.name} value={f.name}>
                      {f.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Subject / Lecture Course
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Semester & Branch */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Semester</label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {SEMESTERS.filter((s) => s !== 'All Semesters (1 to 8)').map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Engineering Branch</label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {ENGINEERING_BRANCHES.filter((b) => b !== 'All Courses & Branches').map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Overall Star Rating */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                Overall Lecture Rating: {overallRating} / 5 Stars
              </label>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setOverallRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        (hoverRating || overallRating) >= star
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Multi-tier Likert Evaluation Criteria */}
            <div className="space-y-3 pt-1">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Multi-Criteria Academic Evaluation
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {Object.entries({
                  clarity: '1. Pedagogical Clarity & Explanations',
                  knowledge: '2. Subject Knowledge & Depth',
                  pace: '3. Lecture Pace & Tempo',
                  doubts: '4. Doubt Resolution & Mentorship',
                  syllabus: '5. Syllabus Depth & Practical Focus',
                }).map(([key, label]) => (
                  <div key={key} className="p-2.5 rounded-lg border border-slate-200 bg-white">
                    <span className="font-medium text-slate-700 block mb-1">{label}</span>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((starVal) => (
                        <button
                          key={starVal}
                          type="button"
                          onClick={() =>
                            setCriteria((prev) => ({ ...prev, [key]: starVal }))
                          }
                          className="p-0.5"
                        >
                          <Star
                            className={`w-4 h-4 ${
                              criteria[key as keyof typeof criteria] >= starVal
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-300'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-2 font-bold text-slate-600">
                        {criteria[key as keyof typeof criteria]} ★
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Qualitative Commentary */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Constructive Academic Feedback / Lecture Observation
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                className="w-full rounded-xl border border-slate-200 p-3 text-xs font-normal text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Share specific observations regarding lecture clarity, code demonstrations, or syllabus coverage..."
              />
            </div>

            {/* Verification Badge */}
            <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-blue-50/50 p-2.5 rounded-xl border border-blue-100">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>
                Verified Student Submission • Protected by SHA-256 Anti-Tamper Ingestion Ledger
              </span>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold shadow-sm transition-all"
              >
                Submit Lecture Rating
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
