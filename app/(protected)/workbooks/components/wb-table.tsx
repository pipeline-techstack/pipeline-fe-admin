import { Loader2, AlertCircle } from "lucide-react";
import { Workbook } from "../types/wb-table";
import { WorkbookRow } from "./wb-row";

interface WorkbookTableProps {
  workbooks: Workbook[];
  isLoading: boolean;
  error: Error | null;
  onDuplicate: (workbook: Workbook) => void;
  openCost: (workbook: Workbook) => void;
}

export const WorkbookTable = ({
  workbooks,
  isLoading,
  error,
  onDuplicate,
  openCost
}: WorkbookTableProps) => {
  return (
    <>
      {error && (
        <div className="flex items-center gap-2 bg-red-50 mb-4 p-4 border border-red-200 rounded-lg text-red-700">
          <AlertCircle className="w-5 h-5" />
          <span>Error loading workbooks: {error.message}</span>
        </div>
      )}

      <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
        <div className="max-h-[620px] overflow-y-auto">
          <table className="w-full border-collapse">
            <thead className="top-0 z-10 sticky bg-gray-50 border-gray-200 border-b">
              <tr>
                <th className="px-6 py-3 font-semibold text-gray-900 text-sm text-left">
                  Workbooks
                </th>
                <th className="px-6 py-3 font-semibold text-gray-900 text-sm text-left">
                  Owner
                </th>
                <th className="px-6 py-3 font-semibold text-gray-900 text-sm text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center">
                    <div className="flex justify-center items-center gap-2 text-gray-500">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Loading workbooks...</span>
                    </div>
                  </td>
                </tr>
              ) : workbooks.length > 0 ? (
                workbooks.map((workbook) => (
                  <WorkbookRow
                    key={workbook.id}
                    workbook={workbook}
                    onDuplicate={onDuplicate}
                    openCost={openCost}
                  />
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-8 text-gray-500 text-sm text-center"
                  >
                    No matching workbooks found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
