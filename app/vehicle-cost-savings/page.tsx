"use client";

import CostSavingsCalculator from "../components/cost-savings/CostSavingsCalculator";
import {
  useWidgetProps,
  useIsChatGptApp,
} from "../hooks";

export default function Page() {
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

  if(isChatGptApp) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <p>Daily Driven: {dailyDriven}</p>
        <p>combinedFuelEfficiency: {combinedFuelEfficiency}</p>
      </div>
    )
    // if (dailyDriven && combinedFuelEfficiency ) {
    //   return (
    //     <div className="min-h-screen bg-background text-foreground">
    //       <CostSavingsCalculator
    //         initialMiles={dailyDriven}
    //         initialEfficiency={combinedFuelEfficiency}
    //       />
    //     </div>
    //   );
    // }

    // return null;
  } else {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <CostSavingsCalculator
          initialMiles={32}
          initialEfficiency={23}
        />
      </div>      
    )
  }
}
