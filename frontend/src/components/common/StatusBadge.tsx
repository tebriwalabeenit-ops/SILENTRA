import React from 'react';
import { SeatStatus } from '../../types';
import { cn } from '../../lib/utils';

interface StatusBadgeProps {
  status: SeatStatus;
  className?: string;
  showDot?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  className,
  showDot = true 
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'AVAILABLE':
        return {
          label: 'Available',
          dotColor: 'bg-[#39966A]',
          textColor: 'text-[#245B45]',
          bgColor: 'bg-[#39966A]/10',
          borderColor: 'border-[#39966A]/30',
        };
      case 'OCCUPIED':
        return {
          label: 'Occupied',
          dotColor: 'bg-[#D95757]',
          textColor: 'text-[#D95757]',
          bgColor: 'bg-[#D95757]/10',
          borderColor: 'border-[#D95757]/30',
        };
      case 'SENSOR_OFFLINE':
      case 'MAINTENANCE':
        return {
          label: status === 'MAINTENANCE' ? 'Maintenance' : 'Sensor Offline',
          dotColor: 'bg-[#929B96]',
          textColor: 'text-[#929B96]',
          bgColor: 'bg-[#929B96]/10',
          borderColor: 'border-[#929B96]/30',
        };
      case 'UNCONFIGURED':
      default:
        return {
          label: 'Unconfigured',
          dotColor: 'bg-[#929B96]',
          textColor: 'text-[#929B96]',
          bgColor: 'bg-[#F1F3F0]',
          borderColor: 'border-[#DDE2DC]',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium border",
        config.bgColor,
        config.textColor,
        config.borderColor,
        className
      )}
    >
      {showDot && (
        <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", config.dotColor)} />
      )}
      {config.label}
    </span>
  );
};
