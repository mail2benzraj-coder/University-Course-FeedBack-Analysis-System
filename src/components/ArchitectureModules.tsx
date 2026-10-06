import React from 'react';
import {
  GraduationCap,
  ShieldCheck,
  MessageSquare,
  Activity,
  BarChart3,
  FileText,
  ArrowUpRight
} from 'lucide-react';
import { CORE_MODULES_DATA } from '../data/mockData';

interface ArchitectureModulesProps {
  onSelectModule: (moduleId: number) => void;
  onOpenVivaModal: () => void;
}

export const ArchitectureModules: React.FC<ArchitectureModulesProps> = ({
  onSelectModule,
  onOpenVivaModal,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0" />;
      case 'MessageSquare':
        return <MessageSquare className="w-4 h-4 text-emerald-500 shrink-0" />;
      case 'Activity':
        return <Activity className="w-4 h-4 text-teal-500 shrink-0" />;
      case 'BarChart3':
        return <BarChart3 className="w-4 h-4 text-indigo-500 shrink-0" />;
      case 'FileText':
        return <FileText className="w-4 h-4 text-amber-500 shrink-0" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0 shadow-2xs">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 leading-tight">
              Project System Architecture — 5 Core Modules
            </h3>
            <p className="text-xs text-slate-500 leading-tight mt-0.5 font-normal">
              Interactive college evaluation suite for semester feedback & faculty lecture quality audit
            </p>
          </div>
        </div>

        <button
          onClick={onOpenVivaModal}
          className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/70 transition-colors"
        >
          Viva Showcase
        </button>
      </div>

      {/* 5 Core Module Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 mt-4">
        {CORE_MODULES_DATA.map((module) => (
          <div
            key={module.id}
            onClick={() => onSelectModule(module.id)}
            className={`rounded-xl border ${module.borderColor} ${module.hoverBorder} ${module.bgColor} p-3.5 flex flex-col justify-between cursor-pointer transition-all hover:shadow-sm active:scale-[0.99] group min-h-[148px]`}
          >
            {/* Top row */}
            <div>
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${module.labelColor}`}>
                  {module.number}
                </span>
                {getIcon(module.iconName)}
              </div>

              {/* Title & Description */}
              <h4 className="text-xs font-bold text-slate-900 mt-2 leading-snug group-hover:text-blue-600 transition-colors">
                {module.title}
              </h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed line-clamp-2">
                {module.description}
              </p>
            </div>

            {/* Bottom link with arrow */}
            <div className="pt-3 border-t border-slate-100/60 flex items-center justify-between mt-2">
              <span className={`text-[11px] font-semibold ${module.footerColor}`}>
                {module.footer}
              </span>
              <ArrowUpRight className={`w-3.5 h-3.5 ${module.footerColor} group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
