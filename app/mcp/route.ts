import { createMcpHandler } from "mcp-handler";
import { helloWorldResource } from "./resources/hello-world"
import { helloWorldTool } from "./tools/hello-world"

const handler = createMcpHandler(async (server) => {
  const resource = await helloWorldResource(server);
  const tool = await helloWorldTool(server, resource);

});

export const GET = handler;
export const POST = handler;
