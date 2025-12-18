export type ViewMode = 'monthly' | 'yearly';

export interface CostBreakdown {
  viewMode: ViewMode;
  evElectricityCost: number;
  evMaintenanceCost: number;
  evTotalCost: number;
  gasCarFuelCost: number;
  gasCarMaintenanceCost: number;
  gasCarTotalCost: number;
  totalSavings: number;
  savingsPercentage: number;
  gasStationVisits: number;
}
