"use client";

import { useOpenAIGlobal } from "@/app/hooks";
import { useEffect } from "react";

export function ThemeSync() {
  const theme = useOpenAIGlobal("theme");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return null;
}
