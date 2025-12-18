"use client";

import { useSearchParams } from 'next/navigation';
import CostSavingsCalculator from '../components/cost-savings/CostSavingsCalculator';

export default function Page() {
  const searchParams = useSearchParams();

  // Parse URL query parameters with defaults
  const milesParam = searchParams.get('miles');
  const efficiencyParam = searchParams.get('efficiency');

  const initialMiles = milesParam && !isNaN(parseFloat(milesParam))
    ? parseFloat(milesParam)
    : 37;

  const initialEfficiency = efficiencyParam && !isNaN(parseFloat(efficiencyParam))
    ? parseFloat(efficiencyParam)
    : 40.19;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CostSavingsCalculator
        initialMiles={initialMiles}
        initialEfficiency={initialEfficiency}
      />
    </div>
  );
}