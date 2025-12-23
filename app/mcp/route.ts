import { createMcpHandler } from "mcp-handler";
import { tool as demoWidgetTool, widget as demoWidget } from "./demo-widget";
import { tool as vehicleCostSavingsTool, widget as vehicleCostSavings } from "@/app/vehicle-cost-savings/mcp";
import { tool as vehicleInventoryTool, widget as vehicleInventory } from "@/app/vehicle-inventory/mcp";

const handler = createMcpHandler(async (server) => {
  await demoWidgetTool(server, await demoWidget(server));
  await vehicleCostSavingsTool(server, await vehicleCostSavings(server));
  await vehicleInventoryTool(server, await vehicleInventory(server));
});

export const GET = handler;
export const POST = handler;
