"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Column } from "@/lib/types/table-types";
import { TableFooter } from "./table-footer";
import { Skeleton } from "@/components/ui/skeleton";
import { useDynamicPageSize } from "@/hooks/use-dynamic-page";

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;

  footer?: boolean | React.ReactNode;

  // pagination support
  total?: number;
  currentPage?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  loading?: boolean;
  isServerPagination?: boolean;
  totalPages?: number
}

export function DataTable<T extends { _id?: string }>({
  data,
  columns,
  onRowClick,
  footer,
  loading,
  total = data?.length,
  currentPage = 1,
  pageSize,
  onPageChange,
  isServerPagination = false,
  totalPages: totalPagesProp,

}: DataTableProps<T>) {
  const dynamicPageSize = useDynamicPageSize({
    rowHeight: 48,
    min: 20,
    max: 80,
    offset: 168,
  });

  const effectivePageSize = pageSize ?? dynamicPageSize;

  // ✅ Only slice for client-side pagination
  const paginatedData = isServerPagination
    ? data
    : data?.slice(
        (currentPage - 1) * effectivePageSize,
        currentPage * effectivePageSize
      );

  const totalPages = isServerPagination
  ? (totalPagesProp ?? 1)
  : Math.ceil(total / effectivePageSize);
  // console.log({
  //   total,
  //   dataLength: data?.length,
  //   effectivePageSize,
  //   currentPage,
  //   totalPages: Math.ceil(total / effectivePageSize),
  //   data
  // });
  return (
    <div className="flex flex-col bg-white h-full">
      {/* Scrollable Table */}
      <div className="flex-1 max-h-[calc(100vh-168px)] overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead
                  key={String(col.key)}
                  style={{ width: col.width || 200 }}
                  className="whitespace-nowrap"
                >
                  <div className="flex items-center gap-2">
                    {col.icon && (
                      <span className="flex items-center">{col.icon}</span>
                    )}
                    <span>{col.header}</span>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {!loading && paginatedData.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="py-6 text-center"
                >
                  No data available
                </TableCell>
              </TableRow>
            )}
            {loading
              ? Array.from({ length: effectivePageSize || 5 }).map((_, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {columns.map((col, colIndex) => (
                      <TableCell key={colIndex}>
                        <Skeleton className="w-full h-4" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : paginatedData.map((row, index) => (
                  <TableRow
                    key={(row as any)._id ?? index}
                    onClick={() => onRowClick?.(row)}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    {columns.map((col) => (
                      <TableCell
                        key={String(col.key)}
                        className={col.className}
                      >
                        {col.render
                          ? col.render(row)
                          : (row as any)[col.key as keyof T]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>

      {/* ✅ Sticky Footer */}
      {footer && (
        <div className="bottom-0 z-10 sticky bg-white px-6 py-3 border-t">
          {typeof footer === "boolean" ? (
            <TableFooter
              total={total}
              currentPage={currentPage}
              pageSize={effectivePageSize}
              totalPages={totalPages}
              onPageChange={onPageChange}
              showPagination={!!onPageChange}
            />
          ) : (
            footer
          )}
        </div>
      )}
    </div>
  );
}
