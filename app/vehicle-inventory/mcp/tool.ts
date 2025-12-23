import { widgetMeta, ContentWidget } from "@/utils/chatgpt-widget";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getRecurrentApiClient } from "@/lib/recurrent-api";

export const tool = async (server: McpServer, contentWidget: ContentWidget) => {
  server.registerTool(
    contentWidget.id,
    {
      title: contentWidget.title,
      description:
        "Search and display available vehicle inventory from dealers. Filter by make, model, year, price range, battery range, and location.",
      inputSchema: {
        make: z
          .string()
          .describe("Vehicle manufacturer (e.g., Tesla, Ford, Rivian)")
          .optional(),
        model: z.string().describe("Vehicle model name").optional(),
        year: z.number().describe("Model year").optional(),
        type: z.string().describe("Vehicle type (e.g., BEV, PHEV)").optional(),
        battery_range_miles_min: z
          .number()
          .describe("Minimum battery range in miles")
          .optional(),
        battery_range_miles_max: z
          .number()
          .describe("Maximum battery range in miles")
          .optional(),
        price_min: z.number().describe("Minimum price in dollars").optional(),
        price_max: z.number().describe("Maximum price in dollars").optional(),
        city: z.string().describe("City to search for vehicles").optional(),
        limit: z
          .number()
          .describe("Maximum number of results (default 20, max 1000)")
          .optional(),
      },
      _meta: widgetMeta(contentWidget),
    },
    async (params) => {
      const client = getRecurrentApiClient();

      try {
        const response = await client.getVehicleListings({
          make: params.make,
          model: params.model,
          year: params.year,
          type: params.type,
          battery_range_miles_min: params.battery_range_miles_min,
          battery_range_miles_max: params.battery_range_miles_max,
          price_min: params.price_min,
          price_max: params.price_max,
          city: params.city,
          limit: params.limit || 20,
          inventory_status: "active"
        });

        // Transform snake_case to camelCase for frontend
        const vehicles = response.vehicles.map((v) => ({
          vin: v.vin,
          year: v.year,
          make: v.make,
          model: v.model,
          trim: v.trim,
          type: v.type,
          batteryRangeMiles: v.battery_range_miles,
          odometer: v.odometer,
          price: v.price,
          stockNumber: v.stock_number,
          exteriorColor: v.exterior_color,
          inventoryStatus: v.inventory_status,
          photo: v.photo,
        }));

        const summaryText =
          vehicles.length > 0
            ? `Found ${vehicles.length} vehicle${vehicles.length > 1 ? "s" : ""} matching your criteria.`
            : "No vehicles found matching your criteria.";

        return {
          content: [
            {
              type: "text",
              text: summaryText,
            },
          ],
          structuredContent: {
            vehicles,
            searchParams: {
              make: params.make,
              model: params.model,
              year: params.year,
              city: params.city,
              priceMin: params.price_min,
              priceMax: params.price_max,
            },
            totalCount: vehicles.length,
            timestamp: new Date().toISOString(),
          },
          _meta: widgetMeta(contentWidget),
        };
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error occurred";

        return {
          content: [
            {
              type: "text",
              text: `Failed to fetch vehicle inventory: ${errorMessage}`,
            },
          ],
          structuredContent: {
            vehicles: [],
            searchParams: params,
            totalCount: 0,
            timestamp: new Date().toISOString(),
            error: errorMessage,
          },
          _meta: widgetMeta(contentWidget),
        };
      }
    }
  );
};
