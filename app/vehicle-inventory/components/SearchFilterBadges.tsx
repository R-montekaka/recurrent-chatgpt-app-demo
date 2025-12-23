"use client";

import { SearchParams } from "../types";

interface SearchFilterBadgesProps {
  searchParams: SearchParams;
}

export function SearchFilterBadges({ searchParams }: SearchFilterBadgesProps) {
  return (
    <div className="text-sm text-gray-600 flex flex-wrap gap-2">
      {searchParams.make && (
        <span className="bg-gray-100 px-2 py-1 rounded">
          {searchParams.make}
        </span>
      )}
      {searchParams.model && (
        <span className="bg-gray-100 px-2 py-1 rounded">
          {searchParams.model}
        </span>
      )}
      {searchParams.year && (
        <span className="bg-gray-100 px-2 py-1 rounded">
          {searchParams.year}
        </span>
      )}
      {searchParams.city && (
        <span className="bg-gray-100 px-2 py-1 rounded">
          {searchParams.city}
        </span>
      )}
    </div>
  );
}
