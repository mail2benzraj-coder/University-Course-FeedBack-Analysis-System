import React, { useState } from 'react';
import {
  X,
  Share2,
  Copy,
  Check,
  Globe,
  ExternalLink,
  Users,
  ShieldCheck,
  QrCode,
  Sparkles
} from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Use the shared app URL as primary public link
  const publicUrl =
    'https://ais-pre-jcgxbb7yghn6itqejzlioc-170132179204.asia-southeast1.run.app';

  const handleCopy = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenLink = () => {
    window.open(publicUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white dark:bg-slate-900 z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-900/40 border border-indigo-200 dark:border-indigo-700 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                  Public Dashboard Access
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
                  Live
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                Share institutional evaluation portal with all university members
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

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Public Link Card */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span>Public Shareable URL:</span>
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Zero Login Barrier / Open Access</span>
              </span>
            </label>

            <div className="flex items-center gap-2 p-1.5 pl-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 shadow-2xs">
              <input
                type="text"
                readOnly
                value={publicUrl}
                className="w-full bg-transparent text-xs font-mono text-slate-800 dark:text-slate-200 focus:outline-none truncate select-all"
              />
              <button
                type="button"
                onClick={handleCopy}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 shadow-2xs ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#4f46e5] hover:bg-[#4338ca] text-white'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>

          {/* Member Access Privileges */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
              Configured Roles Available For All Members:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="p-3 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/40 dark:bg-blue-900/20 space-y-1">
                <span className="text-base">👨‍🎓</span>
                <h5 className="font-bold text-slate-900 dark:text-white">Students</h5>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                  Rate faculty lectures & view verified session logs.
                </p>
              </div>

              <div className="p-3 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50/40 dark:bg-purple-900/20 space-y-1">
                <span className="text-base">👨‍🏫</span>
                <h5 className="font-bold text-slate-900 dark:text-white">Faculty</h5>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                  Audit pedagogical clarity, student feedback & ratings.
                </p>
              </div>

              <div className="p-3 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-900/20 space-y-1">
                <span className="text-base">🏛️</span>
                <h5 className="font-bold text-slate-900 dark:text-white">Deans / Admins</h5>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                  Export NBA / NAAC dossiers and compliance metrics.
                </p>
              </div>
            </div>
          </div>

          {/* Key Advantages */}
          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-white">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Universal Member Compatibility:</span>
            </div>
            <ul className="text-[11px] space-y-1 pl-5 list-disc text-slate-500 dark:text-slate-400">
              <li>Works directly across Chrome, Safari, Firefox, Edge on Mobile and Desktop</li>
              <li>PWA Offline caching enabled for unstable campus network connectivity</li>
              <li>Pre-loaded with sample benchmarks for immediate evaluation & audits</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 flex items-center justify-between">
          <button
            type="button"
            onClick={handleOpenLink}
            className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open in New Browser Window</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
