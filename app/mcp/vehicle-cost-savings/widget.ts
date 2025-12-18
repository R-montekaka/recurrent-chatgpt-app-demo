import { baseURL } from "@/baseUrl";
import {
  getAppsSdkCompatibleHtml,
  ContentWidget,
} from "@/utils/chatgpt-widget";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export const widget = async (server: McpServer) => {
  const html = await getAppsSdkCompatibleHtml(baseURL, "/vehicle-cost-savings");

  const contentWidget: ContentWidget = {
    id: "vehicle_cost_savings",
    title: "Vehicle Cost Savings",
    templateUri: "ui://widget/vehicle-cost-savings.html",
    invoking: "Loading content...",
    invoked: "Content loaded",
    html: html,
    description: "Displays the vehicle cost savings",
    widgetDomain: "https://nextjs.org/docs",
  };

  server.registerResource(
    "vehicle-cost-savings-widget",
    contentWidget.templateUri,
    {
      title: contentWidget.title,
      description: contentWidget.description,
      mimeType: "text/html+skybridge",
      _meta: {
        "openai/widgetDescription": contentWidget.description,
        "openai/widgetPrefersBorder": true,
      },
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/html+skybridge",
          text: `<html>${contentWidget.html}</html>`,
          _meta: {
            "openai/widgetDescription": contentWidget.description,
            "openai/widgetPrefersBorder": true,
            "openai/widgetDomain": contentWidget.widgetDomain,
          },
        },
      ],
    })
  );

  return contentWidget;
};
