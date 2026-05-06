// src/components/ui/pagination.tsx
import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { cn } from "@/src/lib/utils/classNames";
import { Button } from "@/src/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  className?: string;
}

function Pagination({
  currentPage,
  totalPages,
  totalCount,
  limit,
  onPageChange,
  onLimitChange,
  className,
}: PaginationProps) {
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const handleLimitChange = (newLimit: string) => {
    if (onLimitChange) {
      onLimitChange(Number(newLimit));
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row items-center justify-between gap-4 w-full",
        className
      )}
    >
      <div className="flex items-center gap-4">
        {onLimitChange && (
          <div className="flex items-center gap-3">
            <Select value={limit.toString()} onValueChange={handleLimitChange}>
              <SelectTrigger className="h-9 w-32 border rounded-md">
                <SelectValue placeholder="Select limit" />
              </SelectTrigger>
              <SelectContent className="shadow-none">
                <SelectItem value="5">5 Per page</SelectItem>
                <SelectItem value="10">10 Per page</SelectItem>
                <SelectItem value="25">25 Per page</SelectItem>
                <SelectItem value="50">50 Per page</SelectItem>
                <SelectItem value="100">100 Per page</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <nav className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="gap-1 px-3"
          onClick={() => canGoPrevious && onPageChange(currentPage - 1)}
          disabled={!canGoPrevious}
        >
          <ChevronLeftIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Previous</span>
        </Button>

        <div className="flex items-center gap-1">
          {pageNumbers.map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(page)}
              className={cn(
                "h-9 w-9 min-w-9 p-0",
                currentPage === page && "bg-primary text-primary-foreground"
              )}
            >
              {page}
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          className="gap-1 px-3"
          onClick={() => canGoNext && onPageChange(currentPage + 1)}
          disabled={!canGoNext}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </nav>
    </div>
  );
}

export { Pagination };
