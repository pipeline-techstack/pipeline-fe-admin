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
  totalPages?: number;
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
  totalPages = 1,
  onPageChange,
}: DataTableProps<T>) {
  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
      <div className="max-h-[calc(100vh-250px)] overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              {columns.map((col) => (
                <TableHead key={String(col.key)} className="font-semibold">
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((row, index) => (
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
        <div className="bg-gray-50 px-6 py-3 border-t">
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
