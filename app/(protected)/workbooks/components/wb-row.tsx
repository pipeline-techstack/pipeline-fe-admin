import { Copy, DollarSign } from "lucide-react";
import { Workbook } from "../types/wb-table";
import { OwnerBadges } from "./owner-badges";
import { Button } from "@/components/ui/button";

interface WorkbookRowProps {
  workbook: Workbook;
  onDuplicate: (workbook: Workbook) => void;
  openCost: (workbook: Workbook) => void;
}

export const WorkbookRow = ({ workbook, onDuplicate, openCost }: WorkbookRowProps) => {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <div className="font-medium text-gray-900 text-sm">{workbook.name}</div>
      </td>

      <td className="px-6 py-4">
        <OwnerBadges owners={workbook.owners} />
      </td>
      <div className="flex justify-end items-center gap-2">
        <td className="flex justify-end py-2">
          <button
            onClick={() => openCost(workbook)}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md text-sm transition-colors"
          >
            <DollarSign className="w-4 h-4" />
            Cost
          </button>
        </td>

        <td className="flex justify-end py-2">
          <button
            onClick={() => onDuplicate(workbook)}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md text-sm transition-colors"
          >
            <Copy className="w-4 h-4" />
            Duplicate
          </button>
        </td>
      </div>
    </tr>
  );
};
