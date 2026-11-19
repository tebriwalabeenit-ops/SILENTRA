import React from 'react';
import { DataOrigin } from '../../types';
import { cn } from '../../lib/utils';
import { Cpu, Sparkles } from 'lucide-react';

interface DataOriginBadgeProps {
  origin: DataOrigin;
  className?: string;
  size?: 'sm' | 'md';
}

export const DataOriginBadge: React.FC<DataOriginBadgeProps> = ({ 
  origin, 
  className,
  size = 'sm' 
}) => {
  if (origin === 'HARDWARE') {
    return (
      <span
        title="Physical ESP32 IoT Sensor Connection"
        className={cn(
          "inline-flex items-center gap-1 font-semibold rounded uppercase tracking-wider text-[#FAFAF7] bg-[#245B45] border border-[#173D30]",
          size === 'sm' ? "text-[10px] px-1.5 py-0.5" : "text-xs px-2 py-0.5",
          className
        )}
      >
        <Cpu className="w-2.5 h-2.5" />
        HARDWARE
      </span>
    );
  }

  return (
    <span
      title="Simulated Demo Data Feed — Isolated from physical hardware"
      className={cn(
        "inline-flex items-center gap-1 font-medium rounded uppercase tracking-wider text-[#252B28] bg-[#F1F3F0] border border-[#DDE2DC]",
        size === 'sm' ? "text-[10px] px-1.5 py-0.5" : "text-xs px-2 py-0.5",
        className
      )}
    >
      <Sparkles className="w-2.5 h-2.5 text-[#D9A441]" />
      DEMO
    </span>
  );
};
