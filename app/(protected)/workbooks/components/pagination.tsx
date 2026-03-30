import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    return Array.from({ length: totalPages }, (_, i) => i + 1).filter(
      (pageNum) => pageNum >= currentPage - 2 && pageNum <= currentPage + 2,
    );
  };

  const visiblePages = getVisiblePages();

  const showFirstPage = currentPage > 3;
  const showLastPage = currentPage < totalPages - 2;
  const showFirstEllipsis = currentPage > 4;
  const showLastEllipsis = currentPage < totalPages - 3;

  const baseBtn =
    "h-9 min-w-[36px] px-3 rounded-md text-sm flex items-center justify-center transition-colors";

  return (
    <div className="flex items-center gap-2">
      {/* Previous */}
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${baseBtn} gap-1 hover:bg-muted`}
      >
        <ChevronLeft className="w-4 h-4" />
        Prev
      </Button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {showFirstPage && (
          <>
            <Button
              variant="outline"
              className={baseBtn}
              onClick={() => onPageChange(1)}
            >
              1
            </Button>
            {showFirstEllipsis && (
              <span className="px-2 text-muted-foreground text-sm">…</span>
            )}
          </>
        )}

        {visiblePages.map((pageNum) => {
          const isActive = pageNum === currentPage;

          return (
            <Button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              variant={isActive ? "default" : "outline"}
              className={`${baseBtn} ${
                isActive
                  ? "bg-[#4F46E5]/20 text-zinc-700 border hover:bg-[#4F46E5]/20"
                  : "hover:bg-muted"
              }`}
            >
              {pageNum}
            </Button>
          );
        })}

        {showLastPage && (
          <>
            {showLastEllipsis && (
              <span className="px-2 text-muted-foreground text-sm">…</span>
            )}
            <Button
              variant="outline"
              className={baseBtn}
              onClick={() => onPageChange(totalPages)}
            >
              {totalPages}
            </Button>
          </>
        )}
      </div>

      {/* Next */}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="outline"
        className={`${baseBtn} gap-1 hover:bg-muted`}
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};
