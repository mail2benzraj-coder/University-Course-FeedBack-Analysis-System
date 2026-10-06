import React from 'react';
import { X, BarChart3, TrendingUp, Layers } from 'lucide-react';

interface CourseComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CourseComparisonModal: React.FC<CourseComparisonModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const comparisonData = [
    {
      course: 'Advanced Data Structures & Algorithms',
      code: 'CS601',
      rating: 4.95,
      satisfaction: 98,
      difficulty: 'High',
      responses: 124,
      faculty: 'Viswanath sir',
    },
    {
      course: 'Deep Learning & Neural Networks',
      code: 'AI602',
      rating: 4.90,
      satisfaction: 96,
      difficulty: 'High',
      responses: 118,
      faculty: 'Prof. S. Sharma',
    },
    {
      course: 'Cloud Computing & DevOps Architecture',
      code: 'IT603',
      rating: 4.88,
      satisfaction: 95,
      difficulty: 'Medium',
      responses: 105,
      faculty: 'Prof. M. Vignesh',
    },
    {
      course: 'Discrete Mathematics & Graph Theory',
      code: 'CS402',
      rating: 4.92,
      satisfaction: 97,
      difficulty: 'Very High',
      responses: 132,
      faculty: 'Dr. Ananya Iyer',
    },
    {
      course: 'Database Engineering & Optimization',
      code: 'CS503',
      rating: 4.85,
      satisfaction: 93,
      difficulty: 'Medium',
      responses: 110,
      faculty: 'Dr. R. Senthil',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 leading-tight">
                  Course Comparison & Benchmark Matrix
                </h3>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800">
                  STATISTICAL BENCHMARK
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-tight mt-0.5">
                Cross-course comparative bar charts, difficulty ratings, and satisfaction percentiles
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
          {/* Top highlight */}
          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Layers className="w-6 h-6 text-blue-600 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">8 Engineering Semesters Benchmarked</h4>
                <p className="text-[11px] text-slate-600">
                  Mean Course Satisfaction: <strong className="text-blue-700">95.8%</strong> across all active STEM subjects.
                </p>
              </div>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-white text-blue-700 border border-blue-200">
              Top Tier Quartile
            </span>
          </div>

          {/* Matrix Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                <tr>
                  <th className="p-3">Course Title</th>
                  <th className="p-3">Faculty</th>
                  <th className="p-3 text-center">Score</th>
                  <th className="p-3">Satisfaction Index</th>
                  <th className="p-3">Perceived Difficulty</th>
                  <th className="p-3 text-right">Sample (N)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {comparisonData.map((c) => (
                  <tr key={c.code} className="hover:bg-slate-50/70">
                    <td className="p-3 font-semibold text-slate-900">
                      <div>{c.course}</div>
                      <span className="text-[10px] text-slate-400 font-mono">{c.code}</span>
                    </td>
                    <td className="p-3 text-slate-600">{c.faculty}</td>
                    <td className="p-3 text-center font-bold text-amber-500">{c.rating} ★</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${c.satisfaction}%` }}
                          />
                        </div>
                        <span className="font-bold text-emerald-600">{c.satisfaction}%</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          c.difficulty === 'Very High'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : c.difficulty === 'High'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}
                      >
                        {c.difficulty}
                      </span>
                    </td>
                    <td className="p-3 text-right font-mono text-slate-600">{c.responses}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
