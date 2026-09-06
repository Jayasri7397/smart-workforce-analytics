import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  trend?: {
    value: string;
    isPositive?: boolean;
    isNegative?: boolean;
  };
  icon: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
  accentColor?: string;
  onClick?: () => void;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  subtext,
  trend,
  icon: Icon,
  iconBgColor = 'bg-indigo-50',
  iconColor = 'text-indigo-600',
  accentColor,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md ${
        onClick ? 'cursor-pointer hover:border-slate-300' : ''
      }`}
    >
      {accentColor && (
        <div className={`absolute top-0 left-0 right-0 h-1 ${accentColor}`} />
      )}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{value}</h3>
          
          {(subtext || trend) && (
            <div className="mt-2 flex items-center gap-2 text-xs text-slate-600">
              {trend && (
                <span
                  className={`font-semibold ${
                    trend.isNegative
                      ? 'text-rose-600'
                      : trend.isPositive
                      ? 'text-emerald-600'
                      : 'text-slate-600'
                  }`}
                >
                  {trend.value}
                </span>
              )}
              {subtext && <span>{subtext}</span>}
            </div>
          )}
        </div>

        <div className={`rounded-xl p-3 ${iconBgColor} ${iconColor} shrink-0`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};
