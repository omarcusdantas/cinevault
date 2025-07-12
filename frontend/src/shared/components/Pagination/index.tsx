"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  readonly currentPage: number;
  readonly totalPages: number;
  readonly search?: string;
}

export function Pagination({ currentPage, totalPages, search }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const currentPageNumber = Number(currentPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;

    const newParams = new URLSearchParams(params.toString());

    if (search) {
      newParams.set("search", search);
    }

    newParams.set("page", page.toString());
    router.push(`${pathname}?${newParams.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        onClick={() => handlePageChange(currentPageNumber - 1)}
        disabled={currentPageNumber <= 1}
        aria-label="Go to previous page"
        className={`rounded-md border p-2 transition-colors ${
          currentPageNumber > 1
            ? "border-gray-300 text-gray-700 hover:bg-gray-50"
            : "cursor-not-allowed border-gray-200 text-gray-400"
        }`}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <span className="px-4 py-2 text-sm text-gray-700">
        Page {currentPageNumber} of {totalPages}
      </span>

      <button
        onClick={() => handlePageChange(currentPageNumber + 1)}
        disabled={currentPageNumber >= totalPages}
        aria-label="Go to next page"
        className={`rounded-md border p-2 transition-colors ${
          currentPageNumber < totalPages
            ? "border-gray-300 text-gray-700 hover:bg-gray-50"
            : "cursor-not-allowed border-gray-200 text-gray-400"
        }`}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
