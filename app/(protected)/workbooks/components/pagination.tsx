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
      (pageNum) =>
        pageNum === currentPage ||
        pageNum === currentPage - 1 ||
        pageNum === currentPage + 1 ||
        pageNum === currentPage - 2 ||
        pageNum === currentPage + 2
    );
  };

  const visiblePages = getVisiblePages();
  const showFirstPage = currentPage > 3;
  const showLastPage = currentPage < totalPages - 2;
  const showFirstEllipsis = currentPage > 4;
  const showLastEllipsis = currentPage < totalPages - 3;

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-28 flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-[#4A5BAA] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black transition-colors"
        >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </button>

      <div className="flex items-center gap-1">
        {showFirstPage && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors"
            >
              1
            </button>
            {showFirstEllipsis && <span className="px-2 text-gray-400">...</span>}
          </>
        )}

        {visiblePages.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`px-3 py-2 border rounded-md text-sm transition-colors ${
              pageNum === currentPage
                ? "bg-[#4A5BAA] text-white border-[#4A5BAA]"
                : "border-gray-300 hover:bg-gray-50"
            }`}
          >
            {pageNum}
          </button>
        ))}

        {showLastPage && (
          <>
            {showLastEllipsis && <span className="px-2 text-gray-400">...</span>}
            <button
              onClick={() => onPageChange(totalPages)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors"
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-28 flex items-center justify-end gap-1 px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-[#4A5BAA] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black transition-colors"
        >
        Next
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};
