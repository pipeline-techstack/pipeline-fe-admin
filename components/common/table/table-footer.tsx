import { Pagination } from "../../../app/(protected)/workbooks/components/pagination";

interface TableFooterProps {
  total: number;
  currentPage?: number;
  pageSize?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  showPagination?: boolean;
}

export const TableFooter = ({
  total,
  currentPage = 1,
  pageSize = total,
  totalPages = 1,
  onPageChange,
  showPagination = false,
}: TableFooterProps) => {
  const showingFrom = total > 0 ? (currentPage - 1) * pageSize + 1 : 0;
  const showingTo = Math.min(currentPage * pageSize, total);

  return (
    <div className="flex justify-between items-center">
      <div className="text-gray-500 text-sm">
        {total > 0
          ? `Showing ${showingFrom}-${showingTo} of ${total} items`
          : "No data"}
      </div>

      {showPagination && totalPages > 1 && onPageChange && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};