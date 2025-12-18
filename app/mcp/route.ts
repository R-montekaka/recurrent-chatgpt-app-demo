import { createMcpHandler } from "mcp-handler";
import { tool as demoWidgetTool, widget as demoWidget } from "./demo-widget";

const handler = createMcpHandler(async (server) => {
  await demoWidgetTool(server, await demoWidget(server))
});

export const GET = handler;
export const POST = handler;
