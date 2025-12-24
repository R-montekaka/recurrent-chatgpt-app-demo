"use client";

import { Badge } from "@openai/apps-sdk-ui/components/Badge";
import { SearchParams } from "../types";

interface SearchFilterBadgesProps {
  searchParams: SearchParams;
}

export function SearchFilterBadges({ searchParams }: SearchFilterBadgesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {searchParams.make && (
        <Badge color="secondary" variant="soft" size="sm">
          {searchParams.make}
        </Badge>
      )}
      {searchParams.model && (
        <Badge color="secondary" variant="soft" size="sm">
          {searchParams.model}
        </Badge>
      )}
      {searchParams.year && (
        <Badge color="secondary" variant="soft" size="sm">
          {searchParams.year}
        </Badge>
      )}
      {searchParams.city && (
        <Badge color="secondary" variant="soft" size="sm">
          {searchParams.city}
        </Badge>
      )}
    </div>
  );
}
