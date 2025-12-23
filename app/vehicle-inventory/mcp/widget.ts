import { baseURL } from "@/baseUrl";
import {
  getAppsSdkCompatibleHtml,
  ContentWidget,
} from "@/utils/chatgpt-widget";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export const widget = async (server: McpServer) => {
  const html = await getAppsSdkCompatibleHtml(baseURL, "/vehicle-inventory");

  const contentWidget: ContentWidget = {
    id: "vehicle_inventory_lookup",
    title: "Vehicle Inventory",
    templateUri: "ui://widget/vehicle-inventory.html",
    invoking: "Searching inventory...",
    invoked: "Inventory loaded",
    html: html,
    description: "Displays available vehicle inventory with filters",
    widgetDomain: "https://recurrentauto.com",
  };

  server.registerResource(
    "vehicle-inventory-widget",
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
