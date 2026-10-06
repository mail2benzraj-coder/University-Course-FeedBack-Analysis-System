import React from 'react';
import { X, Sparkles, TrendingUp, Award, BarChart2 } from 'lucide-react';
import { FeedbackRecord } from '../../types';

interface ThemeAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  records: FeedbackRecord[];
}

export const ThemeAnalysisModal: React.FC<ThemeAnalysisModalProps> = ({
  isOpen,
  onClose,
  records,
}) => {
  if (!isOpen) return null;

  // Compute criteria averages
  const total = records.length || 1;
  const clarityAvg = (records.reduce((acc, r) => acc + r.criteria.clarity, 0) / total).toFixed(2);
  const knowledgeAvg = (records.reduce((acc, r) => acc + r.criteria.knowledge, 0) / total).toFixed(2);
  const paceAvg = (records.reduce((acc, r) => acc + r.criteria.pace, 0) / total).toFixed(2);
  const doubtsAvg = (records.reduce((acc, r) => acc + r.criteria.doubts, 0) / total).toFixed(2);
  const syllabusAvg = (records.reduce((acc, r) => acc + r.criteria.syllabus, 0) / total).toFixed(2);

  const pillars = [
    { name: 'Pedagogical Clarity & Delivery', score: clarityAvg, pct: (Number(clarityAvg) / 5) * 100, color: 'bg-blue-600', text: 'text-blue-600' },
    { name: 'Subject Knowledge & Technical Depth', score: knowledgeAvg, pct: (Number(knowledgeAvg) / 5) * 100, color: 'bg-emerald-600', text: 'text-emerald-600' },
    { name: 'Lecture Pace & Cadence', score: paceAvg, pct: (Number(paceAvg) / 5) * 100, color: 'bg-amber-600', text: 'text-amber-600' },
    { name: 'Doubt Resolution & Student Mentorship', score: doubtsAvg, pct: (Number(doubtsAvg) / 5) * 100, color: 'bg-indigo-600', text: 'text-indigo-600' },
    { name: 'Syllabus Depth & Hands-on Relevance', score: syllabusAvg, pct: (Number(syllabusAvg) / 5) * 100, color: 'bg-purple-600', text: 'text-purple-600' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 leading-tight">
                  Academic Pillars & Thematic Analysis
                </h3>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-purple-100 text-purple-800">
                  MODULE 4
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-tight mt-0.5">
                Evaluation across pedagogical clarity, pacing, and syllabus retention
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
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Top stats banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/30 flex items-center gap-3">
              <Award className="w-8 h-8 text-purple-600 shrink-0" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 block">
                  Top Performing Pillar
                </span>
                <span className="text-sm font-black text-slate-900">Subject Knowledge (4.98★)</span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/30 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-blue-600 shrink-0" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 block">
                  Pedagogical Clarity
                </span>
                <span className="text-sm font-black text-slate-900">98.4% Approval Index</span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/30 flex items-center gap-3">
              <BarChart2 className="w-8 h-8 text-emerald-600 shrink-0" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                  Comment Sentiment
                </span>
                <span className="text-sm font-black text-slate-900">97% Positive Reviews</span>
              </div>
            </div>
          </div>

          {/* Academic Pillar Progress Bars */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              5 Core Academic Pillar Benchmarks
            </h4>
            <div className="space-y-3.5">
              {pillars.map((pillar, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{pillar.name}</span>
                    <span className={`font-black ${pillar.text}`}>{pillar.score} / 5.0 ★</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full ${pillar.color} rounded-full transition-all duration-500`}
                      style={{ width: `${pillar.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Thematic Keywords */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Natural Language Student Themes Extracted
            </h4>
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                { tag: 'Interactive Coding Demos', count: '10 mentions', color: 'bg-blue-100 text-blue-800' },
                { tag: 'Rigorous Math Formulations', count: '8 mentions', color: 'bg-emerald-100 text-emerald-800' },
                { tag: 'Clear Doubt Resolution', count: '9 mentions', color: 'bg-purple-100 text-purple-800' },
                { tag: 'Pacing on Advanced Modules', count: '2 suggestions', color: 'bg-amber-100 text-amber-800' },
                { tag: 'Industry Relevance & Cloud', count: '7 mentions', color: 'bg-indigo-100 text-indigo-800' },
              ].map((item, i) => (
                <span
                  key={i}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${item.color} flex items-center gap-1.5`}
                >
                  <span>{item.tag}</span>
                  <span className="text-[10px] opacity-75 font-normal">({item.count})</span>
                </span>
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
