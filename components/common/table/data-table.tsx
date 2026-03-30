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

  return (
    <div className="bg-white overflow-hidden">
      <div className="max-h-[calc(100vh-168px)] overflow-auto">
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

      {/* ✅ Footer Logic */}
      {footer && (
        <div className="px-6 py-3 border-t">
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
