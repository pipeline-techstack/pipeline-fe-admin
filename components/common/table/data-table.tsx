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
}

export function DataTable<T extends { _id?: string }>({
  data,
  columns,
  onRowClick,
  footer,

  total = data.length,
  currentPage = 1,
  pageSize = data.length,
  onPageChange,
}: DataTableProps<T>) {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(total / pageSize);
  console.log({
    total,
    dataLength: data.length,
    pageSize,
    currentPage,
    totalPages: Math.ceil(total / pageSize),
  });
  return (
    <div className="bg-white h-full flex flex-col">
      {/* Scrollable Table */}
      <div className="flex-1 overflow-auto max-h-[calc(100vh-168px)]">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={String(col.key)}>{col.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedData.map((row, index) => (
              <TableRow
                key={(row as any)._id ?? index}
                onClick={() => onRowClick?.(row)}
                className="hover:bg-gray-50 cursor-pointer"
              >
                {columns.map((col) => (
                  <TableCell key={String(col.key)} className={col.className}>
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
        <div className="px-6 py-3 border-t bg-white sticky bottom-0 z-10">
          {typeof footer === "boolean" ? (
            <TableFooter
              total={total}
              currentPage={currentPage}
              pageSize={pageSize}
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
