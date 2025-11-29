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
          Math.ceil((res.total_cost / workbookTotalCost) * 100 * 100) / 100
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
    <div className="bg-gray-50 p-8 min-h-screen">
      <div className="bg-white shadow-sm mx-auto p-8 rounded-lg max-w-4xl">
        {/* Column Selector */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Select Column to View Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <Select
              value={selectedColumnId}
              onValueChange={(val) => handleColumnSelect(val)}
            >
              <SelectTrigger className="w-full">
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
          </CardContent>
        </Card>

        {selectedColumn && (
          <Card className="bg-blue-50 mb-6 border border-blue-200">
            <CardContent className="pt-6">
              <h2 className="font-semibold text-xl">
                {selectedColumn.column_name}
              </h2>
              <p className="text-gray-700 text-sm">
                Column ID: {selectedColumn.column_id}
              </p>
            </CardContent>
          </Card>
        )}

        {loading && (
          <div className="flex justify-center py-10">
            <div className="border-blue-600 border-b-2 rounded-full w-10 h-10 animate-spin" />
          </div>
        )}

        {!loading && costData && (
          <>
            <div className="gap-6 grid grid-cols-3 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-gray-600 text-sm">Column Cost</p>
                  <p className="font-bold text-4xl">
                    ${costData.cost?.toFixed(3)}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <p className="text-gray-600 text-sm">Workbook</p>
                  <p className="font-semibold text-xl">
                    {costData.workbook_name}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <p className="text-gray-600 text-sm">Currency</p>
                  <p className="font-semibold text-xl">{costData.currency}</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Contribution to Workbook Cost</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="flex justify-between mb-3">
                  <span className="text-gray-600 text-sm">
                    This column contributes:
                  </span>
                  <span className="font-semibold text-lg">
                    {costData.contributionPercentage}%
                  </span>
                </div>

                <Progress
                  value={costData.contributionPercentage}
                  className="h-3"
                />
              </CardContent>
            </Card>
          </>
        )}

        {!loading && selectedColumnId && !costData && (
          <div className="py-10 text-gray-500 text-center">
            No cost data available.
          </div>
        )}

        {!loading && !selectedColumnId && (
          <div className="py-10 text-gray-500 text-center">
            Select a column to view cost details.
          </div>
        )}
      </div>
    </div>
  );
};

export default CostColumn;
