import { formatCurrency } from '@/app/utils/formatters';

interface CostLegendProps {
  electricityCost: number;
  gasCost: number;
}

export default function CostLegend({
  electricityCost,
  gasCost,
}: CostLegendProps) {
  return (
    <div className="flex flex-wrap gap-6 justify-start items-center pl-2">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded bg-purple-500"></div>
        <span className="text-sm text-slate-600 dark:text-slate-400">
          {formatCurrency(electricityCost)} electricity
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded bg-blue-600"></div>
        <span className="text-sm text-slate-600 dark:text-slate-400">
          {formatCurrency(gasCost)} gas
        </span>
      </div>
    </div>
  );
}
