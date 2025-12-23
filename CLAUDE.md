# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Next.js 15 application demonstrating OpenAI Apps SDK integration with MCP (Model Context Protocol). This app runs inside ChatGPT's iframe and exposes tools/widgets that ChatGPT can invoke.

## Commands

```bash
pnpm dev      # Start dev server with Turbopack (http://localhost:3000)
pnpm build    # Production build
pnpm start    # Run production build
```

MCP endpoint: `http://localhost:3000/mcp`

## Architecture

### MCP Server Pattern

The app exposes MCP tools that ChatGPT invokes. Two patterns exist:

**Pattern 1: Co-located with MCP route** (for simple/demo tools)
```
app/mcp/
├── route.ts         # MCP handler
└── {tool-name}/
    ├── tool.ts      # Tool registration
    ├── widget.ts    # Resource registration
    └── index.ts
```

**Pattern 2: Feature-based** (for tools with dedicated pages)
```
app/{feature}/
├── mcp/
│   ├── tool.ts      # Tool registration with Zod schema
│   ├── widget.ts    # Resource registration (serves HTML)
│   └── index.ts     # Exports
└── page.tsx         # React page (rendered in iframe)
```

Both patterns register tools in `app/mcp/route.ts`:
```typescript
const handler = createMcpHandler(async (server) => {
  await demoWidgetTool(server, await demoWidget(server));           // Pattern 1
  await vehicleCostSavingsTool(server, await vehicleCostSavings(server)); // Pattern 2
});
```

### Required OpenAI Metadata

Tools must include this metadata for widget rendering:
```typescript
{
  "openai/outputTemplate": widget.templateUri,      // Links to resource
  "openai/toolInvocation/invoking": "Loading...",   // Loading state
  "openai/toolInvocation/invoked": "Loaded",        // Completion state
  "openai/resultCanProduceWidget": true
}
```

### ChatGPT Iframe Integration

**Critical configurations for running inside ChatGPT's iframe:**

1. **Asset Prefix** (`next.config.ts`): Required to prevent 404s on `/_next/` assets
2. **CORS Middleware** (`middleware.ts`): Required for React Server Components fetching
3. **SDK Bootstrap** (`app/layout.tsx`): Patches `history`, `fetch`, and DOM to work in iframe

### React Hooks for ChatGPT API

Located in `app/hooks/`. Key hooks:
- `useWidgetProps<T>()` - Get tool output data
- `useDisplayMode()` - Current mode: 'pip' | 'inline' | 'fullscreen'
- `useCallTool()` - Call MCP tools from widgets
- `useSendMessage()` - Send messages to ChatGPT
- `useOpenExternal()` - Open external links (required for links in iframe)

### Widget Utilities

`utils/chatgpt-widget.ts` provides the `ContentWidget` type for tool/resource registration:
```typescript
type ContentWidget = {
  id: string;
  title: string;
  templateUri: string;
  html?: string;
  description: string;
  widgetDomain: string;
}
```

## Key Files

- `app/mcp/route.ts` - MCP server entry point (register all tools here)
- `app/layout.tsx` - Root layout with `<NextChatSDKBootstrap>` (must include)
- `middleware.ts` - CORS handling for RSC
- `baseUrl.ts` - Environment-aware URL detection (handles Vercel deployments)
- `app/hooks/types.ts` - TypeScript types for `window.openai` API

## Adding a New MCP Tool

1. Create `app/{feature}/mcp/tool.ts` with Zod input schema
2. Create `app/{feature}/mcp/widget.ts` to register the HTML resource
3. Create `app/{feature}/page.tsx` for the React UI
4. Register in `app/mcp/route.ts`

## ChatGPT App SDK Guidelines

Reference docs in `chatgpt-app-sdk/`:
- Design for conversational entry, not traditional app navigation
- Use inline cards for single actions, fullscreen for complex workflows
- Limit 2 primary actions per card, no nested scrolling
- Use system colors/fonts, brand colors only on accents
