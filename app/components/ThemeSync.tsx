"use client";

import { useOpenAIGlobal } from "@/app/hooks";
import { useEffect } from "react";

export function ThemeSync() {
  const theme = useOpenAIGlobal("theme");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme ?? "light");
  }, [theme]);

  return null;
}
