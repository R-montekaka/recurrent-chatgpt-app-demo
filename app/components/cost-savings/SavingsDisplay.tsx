import { formatCurrency } from '@/app/utils/formatters';
import { ViewMode } from '@/app/types/cost-savings';

interface SavingsDisplayProps {
  savings: number;
  period: ViewMode;
}

export default function SavingsDisplay({ savings, period }: SavingsDisplayProps) {
  return (
    <div className="flex items-center gap-2">
      <h2 className="text-3xl text-slate-900 dark:text-slate-100">
        <span className="font-bold">{formatCurrency(savings)}</span>
        <span className="font-normal text-slate-600 dark:text-slate-400"> saved every {period === 'monthly' ? 'month' : 'year'}</span>
      </h2>
      <div className="relative group">
        <svg
          className="w-5 h-5 text-slate-400 dark:text-slate-500 cursor-help"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" strokeWidth="2"/>
          <path strokeWidth="2" d="M12 16v-4M12 8h.01"/>
        </svg>
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-72 z-10">
          <div className="bg-slate-800 dark:bg-slate-900 text-white text-sm rounded-lg p-3 shadow-lg">
            Based on average electricity rate of $0.17/kWh and gas price of $3.48/gallon.
            Includes maintenance savings (EV: $0.031/mile vs Gas: $0.061/mile).
            <div className="absolute left-1/2 -translate-x-1/2 top-full -mt-1 border-4 border-transparent border-t-slate-800 dark:border-t-slate-900"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
