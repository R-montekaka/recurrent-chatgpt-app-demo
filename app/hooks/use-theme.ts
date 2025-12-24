"use client";

import { useOpenAIGlobal } from "./use-openai-global";

/**
 * Hook to get the current ChatGPT theme.
 * Returns "light" as default when theme is not available.
 *
 * @returns The current theme: "light" | "dark"
 *
 * @example
 * ```tsx
 * const theme = useTheme(); // "light" | "dark"
 * ```
 */
export function useTheme() {
  return useOpenAIGlobal("theme") ?? "light";
}
