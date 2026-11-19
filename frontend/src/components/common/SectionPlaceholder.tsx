import React from 'react';
import { LucideIcon, Construction, CheckCircle2 } from 'lucide-react';

interface SectionPlaceholderProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  targetPhase: string;
  scheduledFeatures: string[];
  metricsPreview?: Array<{ label: string; value: string }>;
  actionLabel?: string;
}

export const SectionPlaceholder: React.FC<SectionPlaceholderProps> = ({
  title,
  subtitle,
  icon: Icon,
  targetPhase,
  scheduledFeatures,
  metricsPreview,
  actionLabel,
}) => {
  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="bg-white border border-surface-border rounded p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-forest/10 border border-forest/30 flex items-center justify-center text-forest">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-surface-charcoal font-sans">
                {title}
              </h2>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-amber-50 text-[#D9A441] border border-[#D9A441]/30">
                Scheduled: {targetPhase}
              </span>
            </div>
            <p className="text-xs text-surface-charcoal/70 mt-0.5">
              {subtitle}
            </p>
          </div>
        </div>

        {actionLabel && (
          <button 
            disabled 
            className="px-3 py-1.5 rounded bg-surface-grey border border-surface-border text-surface-charcoal/50 text-xs font-semibold cursor-not-allowed"
          >
            {actionLabel}
          </button>
        )}
      </div>

      {/* Metrics Preview if available */}
      {metricsPreview && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {metricsPreview.map((m, idx) => (
            <div key={idx} className="bg-white border border-surface-border rounded p-3">
              <span className="text-[10px] font-bold text-surface-charcoal/60 uppercase tracking-wider block mb-1">
                {m.label}
              </span>
              <span className="text-lg font-bold text-surface-charcoal">
                {m.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Architectural Checklist & Implementation Status */}
      <div className="bg-white border border-surface-border rounded p-5">
        <div className="flex items-center gap-2 pb-3 mb-4 border-b border-surface-border">
          <Construction className="w-4 h-4 text-forest" />
          <h3 className="text-xs font-bold text-surface-charcoal uppercase tracking-wider">
            Architecture Specification & Scheduled Capabilities
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {scheduledFeatures.map((feat, idx) => (
            <div 
              key={idx}
              className="p-3 rounded bg-surface-grey/30 border border-surface-border flex items-start gap-2.5 text-xs"
            >
              <CheckCircle2 className="w-4 h-4 text-forest shrink-0 mt-0.5" />
              <span className="text-surface-charcoal font-medium leading-relaxed">
                {feat}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-4 border-t border-surface-border flex items-center justify-between text-xs text-surface-charcoal/60">
          <span>Module specifications established in Phase 0 Architecture documents.</span>
          <span className="font-mono text-[11px] text-forest font-semibold">Status: Planned in Monorepo</span>
        </div>
      </div>
    </div>
  );
};
