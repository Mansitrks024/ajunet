import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalItems,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (currentPage <= 3) {
      for (let i = 1; i <= maxVisible; i++) {
        pages.push(i);
      }
    } else if (currentPage >= totalPages - 2) {
      for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  return (
    <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-card border-2 border-border rounded-2xl p-4">
      <p className="text-sm text-muted-foreground">
        Showing{" "}
        <span className="font-semibold text-foreground">{startIndex + 1}</span>{" "}
        to{" "}
        <span className="font-semibold text-foreground">
          {Math.min(endIndex, totalItems)}
        </span>{" "}
        of <span className="font-semibold text-foreground">{totalItems}</span>{" "}
        products
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
            currentPage === 1
              ? "bg-muted text-muted-foreground/50 cursor-not-allowed"
              : "bg-muted text-foreground hover:bg-muted/80 hover:shadow-md"
          }`}
        >
          <ChevronLeft size={14} />
          <span className="hidden sm:inline">Previous</span>
        </button>
        <div className="hidden sm:flex items-center gap-1">
          {getPageNumbers().map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all duration-200 ${
                currentPage === pageNum
                  ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground hover:shadow-md"
              }`}
            >
              {pageNum}
            </button>
          ))}
        </div>
        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
            currentPage === totalPages
              ? "bg-muted text-muted-foreground/50 cursor-not-allowed"
              : "bg-muted text-foreground hover:bg-muted/80 hover:shadow-md"
          }`}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
