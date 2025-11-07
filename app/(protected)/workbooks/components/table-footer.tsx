import { Pagination } from "./pagination";


interface TableFooterProps {
  total: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const TableFooter = ({
  total,
  currentPage,
  pageSize,
  totalPages,
  onPageChange,
}: TableFooterProps) => {
  const showingFrom = total > 0 ? (currentPage - 1) * pageSize + 1 : 0;
  const showingTo = Math.min(currentPage * pageSize, total);

  return (
    <div className="mt-4 flex items-center justify-between">
      <div className="text-gray-500 text-sm">
        {total > 0 ? (
          <>
            Showing {showingFrom}-{showingTo} of {total} workbooks
          </>
        ) : (
          "No workbooks"
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};