import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Workbook } from "../types/wb-table";
import { getEstimatedCost } from "@/services/cost-estimate-apis";
import CostColumn from "./cost-column";

interface CostModalProps {
  isOpen: boolean;
  onClose: () => void;
  workbook: Workbook | null;
}

const CostModal: React.FC<CostModalProps> = ({ isOpen, onClose, workbook }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<any>(null);
  const [workbookTotalCost, setWorkbookTotalCost] = useState<number>(0);

  useEffect(() => {
    if (!isOpen || !workbook) return;
    const loadCost = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await getEstimatedCost(workbook.id);
        setData(res);
        setWorkbookTotalCost(res.total_cost);
      } catch (e: any) {
        setError(e.message || "Failed to fetch usage cost");
      } finally {
        setLoading(false);
      }
    };
    loadCost();
  }, [isOpen, workbook]);

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(3)}`;
  };

  const calculatePercentage = (cost: number, total: number) => {
    return `${Math.round((cost / total) * 100)}%`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <Tabs defaultValue="workbook" className="mt-6">
          <TabsList className="justify-start bg-transparent p-0 border-gray-200 border-b rounded-none w-full">
            <TabsTrigger
              value="workbook"
              className="data-[state=active]:bg-transparent mr-8 px-0 pb-3 border-transparent data-[state=active]:border-blue-600 border-b-2 rounded-none"
            >
              Workbook
            </TabsTrigger>
            <TabsTrigger
              value="column"
              className="data-[state=active]:bg-transparent px-0 pb-3 border-transparent data-[state=active]:border-blue-600 border-b-2 rounded-none"
            >
              Column
            </TabsTrigger>
          </TabsList>

          <TabsContent value="workbook" className="mt-6">
            {loading && (
              <div className="py-8 text-gray-500 text-center">
                Loading workbook cost...
              </div>
            )}

            {error && (
              <div className="bg-red-50 p-4 rounded-lg text-red-500 text-sm">
                {error}
              </div>
            )}

            {data && !loading && !error && (
              <div className="space-y-6">
                {/* Header Section */}
                <div className="space-y-2">
                  <h2 className="font-semibold text-xl">
                    {data.workbook_name}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    ID: {data.workbook_id}
                  </p>
                  <div className="flex gap-3 mt-3">
                    <span className="bg-blue-50 px-3 py-1 rounded-full font-medium text-blue-700 text-sm">
                      ✨ Type :{" "}
                      {data.type.charAt(0).toUpperCase() + data.type.slice(1)}
                    </span>
                    <span className="bg-gray-100 px-3 py-1 rounded-full font-medium text-gray-700 text-sm">
                      $ Currency : {data.currency}
                    </span>
                  </div>
                </div>

                {/* Total Cost Card */}
                <div className="bg-blue-50 p-6 border border-blue-100 rounded-lg text-center">
                  <div className="flex justify-center items-center gap-2 mb-2">
                    <span className="text-blue-600">📚</span>
                    <h3 className="font-medium text-blue-900">Total Cost</h3>
                  </div>
                  <div className="mb-2 font-bold text-gray-900 text-4xl">
                    {formatCurrency(data.total_cost)}
                  </div>
                  <p className="text-gray-600 text-sm">
                    Sum of all column cost in this workbook
                  </p>
                </div>

                {/* Columns Breakdown */}
                {data.columns_breakdown?.length > 0 && (
                  <div>
                    <h3 className="mb-4 font-semibold text-gray-900 text-lg">
                      Columns Breakdown
                    </h3>

                    {/* Table Header */}
                    <div className="gap-4 grid grid-cols-12 bg-gray-50 px-4 py-3 border-gray-200 border-b rounded-t-lg">
                      <div className="col-span-4 font-semibold text-gray-700 text-sm">
                        Column
                      </div>
                      <div className="col-span-3 font-semibold text-gray-700 text-sm">
                        Type
                      </div>
                      <div className="col-span-3 font-semibold text-gray-700 text-sm">
                        Cost(USD)
                      </div>
                      <div className="col-span-2 font-semibold text-gray-700 text-sm">
                        % of Total
                      </div>
                    </div>

                    {/* Table Rows */}
                    <div className="border border-gray-200 rounded-b-lg">
                      {data.columns_breakdown?.map((col: any, idx: number) => (
                        <div
                          key={col.column_id}
                          className={`grid grid-cols-12 gap-4 px-4 py-4 ${
                            idx !== data.columns_breakdown.length - 1
                              ? "border-b border-gray-100"
                              : ""
                          } hover:bg-gray-50 transition-colors`}
                        >
                          <div className="col-span-4">
                            <div className="font-medium text-gray-900">
                              {col.column_name}
                            </div>
                            <div className="mt-1 text-gray-500 text-xs">
                              ID: {col.column_id}
                            </div>
                          </div>
                          <div className="flex items-center col-span-3">
                            <span className="text-gray-700 text-sm capitalize">
                              {col.column_type.split("_").join(" ")}
                            </span>
                          </div>
                          <div className="flex items-center col-span-3">
                            <span className="font-semibold text-gray-900 text-base">
                              {formatCurrency(col.cost)}
                            </span>
                          </div>
                          <div className="flex items-center col-span-2">
                            <span className="font-semibold text-gray-900 text-base">
                              {calculatePercentage(col.cost, data.total_cost)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="column" className="mt-6">
            <CostColumn workbookId={workbook?.id} workbookTotalCost={workbookTotalCost}/>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CostModal;
