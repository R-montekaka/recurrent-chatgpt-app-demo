import { createMcpHandler } from "mcp-handler";
import { tool as demoWidgetTool, widget as demoWidget } from "./demo-widget";
import { tool as vehicleCostSavingsTool, widget as vehicleCostSavings } from "./vehicle-cost-savings";

const handler = createMcpHandler(async (server) => {
  await demoWidgetTool(server, await demoWidget(server))
  await vehicleCostSavingsTool(server, await vehicleCostSavings(server))
});

export const GET = handler;
export const POST = handler;
