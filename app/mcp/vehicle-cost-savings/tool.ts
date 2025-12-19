import { widgetMeta, ContentWidget } from "@/utils/chatgpt-widget";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
const apiUrl = "https://embeds.recurrentauto.com/api/cost-savings-used/api";

export const tool = async (server: McpServer, contentWidget: ContentWidget) => {
  server.registerTool(
    contentWidget.id,
    {
      title: contentWidget.title,
      description: "Fetch vehicle data using vehicle VIN",
      inputSchema: {
        vin: z.string().describe("Vehicle VIN").optional(),
        dailyDriven: z
          .number()
          .describe("Driven miles for average daily commute.")
          .optional(),
        postalCode: z.string().describe("Location zip code").optional(),
      },
      _meta: widgetMeta(contentWidget),
    },
    async ({ vin, postalCode, dailyDriven }) => {
      const params: Record<string, string> = {
        configuration_id: "86020a97-39f8-4b30-a00f-ad002b04aa4c",
      };
      if (vin) params["vin"] = vin;
      if (postalCode) params["postal_code"] = postalCode;

      const queryString = new URLSearchParams(params).toString();
      const fullUrl = `${apiUrl}?${queryString}`;

      const response = await fetch(fullUrl);
      console.log(`response?: ${response.ok}`);

      if (!response.ok) {
        return {
          content: [
            {
              type: "text",
              text: `Failed to fetch vehicle cost savings data (${response.status}).`,
            },
          ],
          structuredContent: {
            status: response.status,
            timestamp: new Date().toISOString(),
          },
          _meta: widgetMeta(contentWidget),
        };
      }

      const data = await response.json();
      console.log(`data?: ${data}`);
      const { vehicle, location } = data;
      const { type, expected_range_miles, combined_fuel_efficiency } =
        vehicle || {};
      const { gas_rate, electricity_rate } = location || {};

      return {
        content: [
          {
            type: "text",
            text: "Fetched vehicle cost savings data.",
          },
        ],
        structuredContent: {
          type,
          dailyDriven,
          expectedRangeMiles: expected_range_miles,
          combinedFuelEfficiency: combined_fuel_efficiency,
          gasRate: gas_rate,
          electricityRate: electricity_rate,
          timestamp: new Date().toISOString(),
        },
        _meta: widgetMeta(contentWidget),
      };
    }
  );
};
