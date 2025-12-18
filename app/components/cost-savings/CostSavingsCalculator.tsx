"use client";

import { useState, useMemo } from 'react';
import { ViewMode } from '@/app/types/cost-savings';
import { calculateCosts } from '@/app/utils/costCalculations';
import ViewToggle from './ViewToggle';
import MilesSlider from './MilesSlider';
import SavingsDisplay from './SavingsDisplay';
import CostComparison from './CostComparison';

interface CostSavingsCalculatorProps {
  initialMiles: number;
  initialEfficiency: number;
}

export default function CostSavingsCalculator({
  initialMiles,
  initialEfficiency,
}: CostSavingsCalculatorProps) {
  const [dailyMiles, setDailyMiles] = useState<number>(initialMiles);
  const [viewMode, setViewMode] = useState<ViewMode>('monthly');

  const costs = useMemo(
    () => calculateCosts(dailyMiles, initialEfficiency, viewMode),
    [dailyMiles, initialEfficiency, viewMode]
  );

  return (
    <div className="max-w-xl mx-auto p-8 space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Estimate your savings
        </h1>
      </div>

      {/* View Toggle */}
      <div className="flex justify-center mb-6">
        <ViewToggle value={viewMode} onChange={setViewMode} />
      </div>

      {/* Miles Slider */}
      <MilesSlider
        value={dailyMiles}
        onChange={setDailyMiles}
        label="Miles driven:"
      />

      {/* Savings Display */}
      <div className="mt-8 mb-6">
        <SavingsDisplay savings={costs.totalSavings} period={viewMode} />
        <div className="mt-3">
          <span className="inline-block bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm px-4 py-2 rounded-full">
            ~ {costs.gasStationVisits} gas station {costs.gasStationVisits === 1 ? 'visit' : 'visits'} per {viewMode === 'monthly' ? 'month' : 'year'}
          </span>
        </div>
      </div>
    </div>
  );
}
