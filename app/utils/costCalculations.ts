import { CostBreakdown, ViewMode } from '../types/cost-savings';

export const CONSTANTS = {
  ELECTRICITY_RATE: 0.17,        // $ per kWh
  GAS_PRICE: 3.48,               // $ per gallon
  GAS_CAR_MPG: 24,               // miles per gallon
  EV_MAINTENANCE: 0.031,         // $ per mile
  GAS_MAINTENANCE: 0.061,        // $ per mile
  DAYS_PER_MONTH: 30.42,
  DAYS_PER_YEAR: 365,
};

function getDaysMultiplier(period: ViewMode): number {
  return period === 'monthly' ? CONSTANTS.DAYS_PER_MONTH : CONSTANTS.DAYS_PER_YEAR;
}

export function calculateElectricityCost(
  dailyMiles: number,
  efficiency: number,
  period: ViewMode
): number {
  const days = getDaysMultiplier(period);
  return (dailyMiles * efficiency / 100) * CONSTANTS.ELECTRICITY_RATE * days;
}

export function calculateGasCost(
  dailyMiles: number,
  period: ViewMode
): number {
  const days = getDaysMultiplier(period);
  return (dailyMiles * days / CONSTANTS.GAS_CAR_MPG) * CONSTANTS.GAS_PRICE;
}

export function calculateMaintenanceCost(
  dailyMiles: number,
  costPerMile: number,
  period: ViewMode
): number {
  const days = getDaysMultiplier(period);
  return dailyMiles * days * costPerMile;
}

export function calculateGasStationVisits(
  dailyMiles: number,
  period: ViewMode
): number {
  const days = getDaysMultiplier(period);
  const totalMiles = dailyMiles * days;
  // Assume average gas car range: 300 miles per tank
  return Math.round(totalMiles / 300);
}

export function calculateCosts(
  dailyMiles: number,
  efficiency: number,
  viewMode: ViewMode
): CostBreakdown {
  const evElectricityCost = calculateElectricityCost(dailyMiles, efficiency, viewMode);
  const evMaintenanceCost = calculateMaintenanceCost(
    dailyMiles,
    CONSTANTS.EV_MAINTENANCE,
    viewMode
  );
  const evTotalCost = evElectricityCost + evMaintenanceCost;

  const gasCarFuelCost = calculateGasCost(dailyMiles, viewMode);
  const gasCarMaintenanceCost = calculateMaintenanceCost(
    dailyMiles,
    CONSTANTS.GAS_MAINTENANCE,
    viewMode
  );
  const gasCarTotalCost = gasCarFuelCost + gasCarMaintenanceCost;

  const totalSavings = gasCarTotalCost - evTotalCost;
  const savingsPercentage = (totalSavings / gasCarTotalCost) * 100;

  const gasStationVisits = calculateGasStationVisits(dailyMiles, viewMode);

  return {
    viewMode,
    evElectricityCost,
    evMaintenanceCost,
    evTotalCost,
    gasCarFuelCost,
    gasCarMaintenanceCost,
    gasCarTotalCost,
    totalSavings,
    savingsPercentage,
    gasStationVisits,
  };
}
