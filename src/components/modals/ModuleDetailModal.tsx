import React from 'react';
import { X, CheckCircle2, ShieldCheck, Layers } from 'lucide-react';
import { CORE_MODULES_DATA } from '../../data/mockData';

interface ModuleDetailModalProps {
  moduleId: number | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectModule: (id: number) => void;
  onTriggerModuleAction: (id: number) => void;
}

export const ModuleDetailModal: React.FC<ModuleDetailModalProps> = ({
  moduleId,
  isOpen,
  onClose,
  onSelectModule,
  onTriggerModuleAction,
}) => {
  if (!isOpen || moduleId === null) return null;

  const currentModule = CORE_MODULES_DATA.find((m) => m.id === moduleId) || CORE_MODULES_DATA[0];

  const getActionName = (id: number) => {
    switch (id) {
      case 1:
        return 'Verify Access Roles & Tokens';
      case 2:
        return 'Launch Feedback Ingestion Form';
      case 3:
        return 'Inspect Historical Audit Logs';
      case 4:
        return 'Execute Statistical Benchmark Inference';
      case 5:
        return 'Generate Accreditation Report (.XLSX)';
      default:
        return 'Run Module';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header with Module switcher tabs */}
        <div className="p-5 border-b border-slate-200 sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                  {currentModule.number} SPECIFICATION
                </span>
                <h3 className="text-base font-bold text-slate-900 leading-tight">
                  {currentModule.title}
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Module Tabs */}
          <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-slate-100 overflow-x-auto">
            {CORE_MODULES_DATA.map((mod) => (
              <button
                key={mod.id}
                onClick={() => onSelectModule(mod.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  mod.id === currentModule.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Module {mod.id}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Overview */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Module Objective & Architectural Scope
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              {currentModule.description}
            </p>
          </div>

          {/* Key Engineering Features */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Key Engineering Modules & Deliverables
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentModule.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 p-2.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-700 font-medium"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Viva Presentation Notes */}
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
              <ShieldCheck className="w-4 h-4" />
              <span>Viva Voce Key Talking Points</span>
            </div>
            <p className="text-xs text-amber-900/90 leading-relaxed font-normal">
              {currentModule.vivaNotes}
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500">
            Target Audience: {currentModule.footer}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Close
            </button>
            <button
              onClick={() => onTriggerModuleAction(currentModule.id)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all"
            >
              {getActionName(currentModule.id)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
