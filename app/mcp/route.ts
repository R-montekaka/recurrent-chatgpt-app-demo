import { createMcpHandler } from "mcp-handler";
import { helloWorldWidget } from "./widgets/hello-world"
import { helloWorldTool } from "./tools/hello-world"

const handler = createMcpHandler(async (server) => {
  await helloWorldTool(server, await helloWorldWidget(server));
});

export const GET = handler;
export const POST = handler;
