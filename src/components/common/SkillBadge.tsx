import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface SkillBadgeProps {
  skill: string;
  variant?: 'default' | 'matched' | 'missing';
  size?: 'sm' | 'md';
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({ skill, variant = 'default', size = 'md' }) => {
  let variantStyles = 'bg-slate-100 text-slate-700 border-slate-200';
  let Icon = null;

  if (variant === 'matched') {
    variantStyles = 'bg-emerald-50 text-emerald-800 border-emerald-200';
    Icon = CheckCircle2;
  } else if (variant === 'missing') {
    variantStyles = 'bg-rose-50 text-rose-800 border-rose-200 font-semibold';
    Icon = AlertCircle;
  }

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs font-medium'
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded-md border ${variantStyles} ${sizeStyles[size]}`}>
      {Icon && <Icon className={`h-3 w-3 ${variant === 'matched' ? 'text-emerald-600' : 'text-rose-600'}`} />}
      {skill}
    </span>
  );
};
