import React from 'react';
import type { RiskLevel } from '../../types';

interface RiskBadgeProps {
  level: RiskLevel;
  showDot?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level, showDot = true, size = 'md' }) => {
  let badgeStyles = '';
  let dotStyles = '';

  switch (level) {
    case 'High':
      badgeStyles = 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100';
      dotStyles = 'bg-rose-500';
      break;
    case 'Medium':
      badgeStyles = 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100';
      dotStyles = 'bg-amber-500';
      break;
    case 'Low':
      badgeStyles = 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100';
      dotStyles = 'bg-emerald-500';
      break;
  }

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs font-medium',
    lg: 'px-3 py-1.5 text-sm font-medium',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border transition-colors ${badgeStyles} ${sizeStyles[size]}`}>
      {showDot && <span className={`h-1.5 w-1.5 rounded-full ${dotStyles}`} />}
      {level} Risk
    </span>
  );
};
