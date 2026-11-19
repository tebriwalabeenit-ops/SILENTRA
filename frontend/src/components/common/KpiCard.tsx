import React from 'react';
import { cn } from '../../lib/utils';
import { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon: LucideIcon;
  badge?: React.ReactNode;
  trend?: {
    text: string;
    isPositive?: boolean;
    isNeutral?: boolean;
  };
  onClick?: () => void;
  className?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  label,
  value,
  subValue,
  icon: Icon,
  badge,
  trend,
  onClick,
  className,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-white border border-surface-border rounded p-3.5 flex flex-col justify-between transition-colors shadow-2xs",
        onClick ? "cursor-pointer hover:border-forest/40 hover:bg-surface-grey/30" : "",
        className
      )}
    >
      {/* Top Row: Label, Icon, Badge */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-[11px] font-semibold text-surface-charcoal/80 uppercase tracking-wider truncate">
          {label}
        </span>
        <div className="flex items-center gap-1.5 shrink-0">
          {badge}
          <div className="w-6 h-6 rounded bg-surface-grey flex items-center justify-center text-forest">
            <Icon className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Middle Row: Primary Metric & Trend */}
      <div className="flex items-baseline justify-between gap-2 my-0.5">
        <div className="text-2xl font-bold tracking-tight text-surface-charcoal">
          {value}
        </div>
        {trend && (
          <span
            className={cn(
              "text-[11px] font-semibold shrink-0",
              trend.isNeutral
                ? "text-surface-charcoal/60"
                : trend.isPositive
                ? "text-forest"
                : "text-status-occupied"
            )}
          >
            {trend.text}
          </span>
        )}
      </div>

      {/* Bottom Row: Contextual Secondary Subtitle */}
      {subValue && (
        <p className="text-[11px] text-surface-charcoal/70 mt-1 truncate">
          {subValue}
        </p>
      )}
    </div>
  );
};
