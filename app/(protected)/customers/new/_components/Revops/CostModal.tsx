import React, { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Workbook } from "../../../../workbooks/types/wb-table";
import { getEstimatedCost } from "@/services/cost-estimate-apis";
import CostColumn from "./CostColumn";
import SpinLoader from "@/components/common/spin-loader";
import { DataTable } from "@/components/common/table/data-table";
import { columnBreakdownColumns } from "@/lib/config/revops/headers";
import { formatCurrency } from "@/lib/utils";
import CustomerDetailLayout from "../customer-layout-wrapper";

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

  const tableData = useMemo(() => {
    if (!data?.columns_breakdown) return [];

    return data.columns_breakdown.map((col: any) => ({
      ...col,
      total_cost: data.total_cost,
    }));
  }, [data]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Workbook Cost</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="workbook" className="mt-2">
          <TabsList className="justify-start bg-transparent p-0 border-gray-200 border-b rounded-none w-full">
            <TabsTrigger
              value="workbook"
              className="data-[state=active]:bg-transparent mr-8 px-0 pb-3 border-transparent data-[state=active]:border-gray-900 border-b rounded-none font-normal data-[state=active]:text-gray-900"
            >
              Workbook
            </TabsTrigger>
            <TabsTrigger
              value="column"
              className="data-[state=active]:bg-transparent px-0 pb-3 border-transparent data-[state=active]:border-gray-900 border-b rounded-none font-normal data-[state=active]:text-gray-900"
            >
              Column
            </TabsTrigger>
          </TabsList>

          <TabsContent value="workbook" className="mt-4">
            {loading && <SpinLoader />}

            {error && (
              <div className="bg-red-50 p-4 rounded-lg text-red-500 text-sm">
                {error}
              </div>
            )}

            {data && !loading && !error && (
              <div className="space-y-4">
                {/* Total Cost Card */}
                <div className="bg-primary/5 px-6 py-4 border border-purple-200 rounded-md">
                  <div className="flex justify-between items-center">
                    {/* Left Section */}
                    <div className="space-y-1">
                      <h3 className="text-gray-900 text-sm">Total Cost</h3>

                      <p className="text-muted-foreground text-sm">
                        Sum of all column cost in {data.workbook_name}
                      </p>
                    </div>

                    {/* Right Section */}
                    <div className="font-semibold text-primary text-4xl">
                      {formatCurrency(data.total_cost)}
                    </div>
                  </div>
                </div>

                {/* Columns Breakdown */}
                {data.columns_breakdown?.length > 0 && (
                  <div className="bg-white px-4 py-6 border border-gray-200 rounded-md">
                    <div className="mb-2 px-4">
                      <h3 className="text-sm">Columns Breakdown</h3>
                      <p className="text-muted-foreground text-sm">
                        Detailed column breakdown cost in this workbook
                      </p>
                    </div>

                    <DataTable
                      data={tableData}
                      columns={columnBreakdownColumns}
                      loading={loading}
                      footer={false} // 👈 no pagination/footer
                    />
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="column" className="mt-6">
            <CostColumn
              workbookId={workbook?.id}
              workbookTotalCost={workbookTotalCost}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CostModal;
