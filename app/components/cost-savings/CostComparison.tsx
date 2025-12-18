import { formatCurrency, formatPercentage } from '@/app/utils/formatters';

interface CostComparisonProps {
  gasTotal: number;
  evTotal: number;
  evElectricityCost: number;
  savingsPercentage: number;
}

export default function CostComparison({
  gasTotal,
  evTotal,
  evElectricityCost,
  savingsPercentage,
}: CostComparisonProps) {
  const evPercentage = (evTotal / gasTotal) * 100;

  return (
    <div className="relative w-full bg-slate-100 dark:bg-slate-800 rounded-2xl p-6">
      <div className="space-y-4">
        {/* Gas Car Bar */}
        <div className="relative">
          <div className="flex items-center justify-between mb-2">
            <span className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Gas Car
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-10 rounded-lg overflow-hidden">
              <div
                className="h-full bg-slate-900 dark:bg-slate-600 rounded-lg"
                style={{ width: '100%' }}
              />
            </div>
            <span className="text-base font-semibold text-slate-900 dark:text-slate-100 w-24 text-right">
              {formatCurrency(gasTotal)} / mo
            </span>
          </div>
        </div>

        {/* Your Cost Bar */}
        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Your Cost
            </span>
            <span className="inline-flex items-center px-2 py-1 rounded bg-green-600 text-white text-xs font-bold">
              ↓ {formatPercentage(savingsPercentage)}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-10 bg-slate-300 dark:bg-slate-700 rounded-lg overflow-hidden">
              <div
                className="h-full bg-purple-400 rounded-lg"
                style={{ width: `${Math.max(evPercentage, 10)}%` }}
              />
            </div>
            <span className="text-base font-semibold text-slate-900 dark:text-slate-100 w-24 text-right">
              {formatCurrency(evTotal)} / mo
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-6 mt-4 pt-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-purple-400"></div>
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {formatCurrency(evElectricityCost)} electricity
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-600"></div>
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {formatCurrency(0)} gas
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
