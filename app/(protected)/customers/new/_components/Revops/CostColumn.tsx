"use client";

import React, { useEffect, useState } from "react";
import { getEstimatedCost } from "@/services/cost-estimate-apis";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";
import { useWorkbookColumns } from "@/hooks/use-workbook-columns";
import SpinLoader from "@/components/common/spin-loader";

interface CostColumnProps {
  workbookId: string | undefined;
  workbookTotalCost: number;
}

const CostColumn: React.FC<CostColumnProps> = ({
  workbookId,
  workbookTotalCost,
}) => {
  const { columns, loadColumns } = useWorkbookColumns();

  const [selectedColumnId, setSelectedColumnId] = useState<string>("");
  const [costData, setCostData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (workbookId) {
      loadColumns(workbookId);
    }
  }, [workbookId]);

  const handleColumnSelect = async (columnId: string) => {
    setSelectedColumnId(columnId);
    setCostData(null);
    setLoading(true);

    try {
      const res = await getEstimatedCost(workbookId ?? "", columnId);

      // Normalize the response
      const normalized = {
        ...res,
        cost: res.total_cost, // API → UI mapping
        contributionPercentage: Number(
          Math.ceil((res.total_cost / workbookTotalCost) * 100 * 100) / 100,
        ).toFixed(2),
      };

      setCostData(normalized);
    } catch (err) {
      console.error("Failed to fetch cost:", err);
    } finally {
      setLoading(false);
    }
  };

  const selectedColumn = columns.find((c) => c.column_id === selectedColumnId);

  return (
    <div className="space-y-3 max-w-4xl">
      {/* Column Selector */}
      <Card className="px-4 py-3 border">
        <p className="mb-2 text-muted-foreground text-sm">
          Select column to view cost
        </p>

        <Select
          value={selectedColumnId}
          onValueChange={(val) => handleColumnSelect(val)}
        >
          <SelectTrigger className="bg-white h-9">
            <SelectValue placeholder="Select a column" />
          </SelectTrigger>

          <SelectContent>
            {columns.map((col) => (
              <SelectItem key={col.column_id} value={col.column_id}>
                {col.column_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Card>

      {/* Selected Column Info */}
      {selectedColumn && (
        <div className="bg-white p-4 border rounded-md">
          <p className="text-gray-900 text-sm">{selectedColumn.column_name}</p>
          <p className="text-muted-foreground text-xs">
            Column ID: {selectedColumn.column_id}
          </p>
        </div>
      )}

      {/* Loader */}
      {loading && (
       <SpinLoader size="sm" fullScreen={true} />
      )}

      {/* Data */}
      {!loading && costData && (
        <>
          {/* Stats Row */}
          <div className="gap-3 grid grid-cols-3">
            <div className="bg-white px-4 py-3 border rounded-md">
              <p className="text-muted-foreground text-sm">Column Cost</p>
              <p className="text-gray-900 text-sm">
                ${costData.cost?.toFixed(3)}
              </p>
            </div>

            <div className="bg-white px-4 py-3 border rounded-md">
              <p className="text-muted-foreground text-sm">Workbook</p>
              <p className="text-gray-900 text-sm">{costData.workbook_name}</p>
            </div>

            <div className="bg-white px-4 py-3 border rounded-md">
              <p className="text-muted-foreground text-sm">Currency</p>
              <p className="text-gray-900 text-sm">{costData.currency}</p>
            </div>
          </div>

          {/* Contribution */}
          <div className="bg-white px-4 py-3 border rounded-md">
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground text-sm">
                This column contributes
              </span>
              <span className="text-gray-900 text-sm">
                {costData.contributionPercentage}%
              </span>
            </div>

            <Progress value={costData.contributionPercentage} className="h-2" />
          </div>
        </>
      )}

      {/* Empty States */}
      {!loading && selectedColumnId && !costData && (
        <p className="text-muted-foreground text-sm">No cost data available.</p>
      )}

      {!loading && !selectedColumnId && (
        <p className="text-muted-foreground text-sm">
          Select a column to view cost details.
        </p>
      )}
    </div>
  );
};

export default CostColumn;
