"use client";

import { useSearchParams } from "next/navigation";
import CostSavingsCalculator from "../components/cost-savings/CostSavingsCalculator";
import {
  useWidgetProps,
  useIsChatGptApp,
} from "../hooks";

export default function Page() {
  const searchParams = useSearchParams();

  const toolOutput = useWidgetProps<{
    type?: string;
    expectedRangeMiles?: number;
    combinedFuelEfficiency?: number;
    gasRate?: number;
    electricityRate?: number;
    dailyDriven?: number;
    result?: {
      structuredContent?: {
        type?: string;
        dailyDriven?: number;
        expectedRangeMiles?: number;
        combinedFuelEfficiency?: number;
        gasRate?: number;
        electricityRate?: number;
      };
    };
  }>();

  const isChatGptApp = useIsChatGptApp();

  // get data from tools
  const dailyDriven =
    toolOutput?.result?.structuredContent?.dailyDriven ||
    toolOutput?.dailyDriven;
  const combinedFuelEfficiency =
    toolOutput?.result?.structuredContent?.combinedFuelEfficiency ||
    toolOutput?.combinedFuelEfficiency;

  // Parse URL query parameters with defaults
  const milesParam = searchParams.get("miles");
  const efficiencyParam = searchParams.get("efficiency");

  const initialMiles =
    milesParam && !isNaN(parseFloat(milesParam)) ? parseFloat(milesParam) : 37;

  const initialEfficiency =
    efficiencyParam && !isNaN(parseFloat(efficiencyParam))
      ? parseFloat(efficiencyParam)
      : 40.19;

  const componetDailyDriven = isChatGptApp ? dailyDriven : initialMiles;
  const componentInitialEfficiency = isChatGptApp ? combinedFuelEfficiency : initialEfficiency;  
    
  if(componetDailyDriven && componentInitialEfficiency) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <CostSavingsCalculator
          initialMiles={componetDailyDriven}
          initialEfficiency={componentInitialEfficiency}
        />
      </div>
    );
  }

  return null;
}
