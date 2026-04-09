"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useWorkbookConfigurations } from "@/hooks/use-workbook-config";
import { useWorkbookColumns } from "@/hooks/use-workbook-columns";
import { useHeyreach } from "@/hooks/use-heyreach";
import { useSaveConfiguration } from "@/hooks/use-save-config";

import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { SingleSelectComponent } from "@/app/(protected)/wb-config/_components/campaign-select";
import { WorkbookSelect } from "@/app/(protected)/wb-config/_components/workbook-select";
import { ResearchTypeSelector } from "@/app/(protected)/wb-config/_components/workbook-type-selector";
import { ConfigurationForm } from "@/app/(protected)/wb-config/_components/configurations-form";
import { ActionButtons } from "@/app/(protected)/wb-config/_components/action-buttons";
import SpinLoader from "@/components/common/spin-loader";

type Props = {
  open: boolean;
  onClose: () => void;
  mode: "new" | "edit";
  campaignId?: string;
  selectedCampbook?: any; // ✅ important
};

type WorkbookConfig = {
  workbookId: string;
  researchType: "company" | "lead";
  formData: any;
  columns: any[];
};

export function CampbookDialog({
  open,
  onClose,
  mode,
  campaignId = "",
  selectedCampbook, // ✅ FIXED
}: Props) {
  const { loadColumns: fetchColumns } = useWorkbookColumns();

  const [configs, setConfigs] = useState<WorkbookConfig[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingColumns, setLoadingColumns] = useState<number | null>(null);

  // Campaigns (only for NEW mode)
  const { campaignsQuery } = useHeyreach({ enableCampaigns: mode === "new" });
  const { data: campaigns = [], isLoading: campaignsLoading } = campaignsQuery;

  const campaignOptions =
    campaigns?.map((c: any) => ({
      id: c.id?.toString(),
      name: c.name,
    })) ?? [];

  useEffect(() => {
    const prefill = async () => {
      if (mode === "edit" && selectedCampbook) {
        setLoading(true);

        const configs: WorkbookConfig[] = [];

        for (const wb of selectedCampbook.workbooks || []) {
          const cols = await fetchColumns(wb.id);

          const config = wb.config || {};

          const researchType: "company" | "lead" = config.company_research
            ? "company"
            : "lead";

          const formData = {
            workbookName: wb.name,
            researchType,

            companyNameColumn: config.company_name_column_id || "",
            companyLinkedInUrlColumn:
              config.company_linkedin_url_column_id || "",
            accountScoringColumn: config.account_scoring_column_id || "",

            leadLinkedInUrlColumn: config.lead_linkedin_url_column_id || "",
            leadScoringColumn: config.lead_scoring_column_id || "",
          };

          configs.push({
            workbookId: wb.id,
            researchType,
            formData,
            columns: cols,
          });
        }

        setConfigs(configs);
        setLoading(false);
      } else {
        // NEW MODE
        setConfigs([
          {
            workbookId: "",
            researchType: "company",
            formData: {
              workbookName: "",
              researchType: "company",
              companyNameColumn: "",
              companyLinkedInUrlColumn: "",
              accountScoringColumn: "",
              leadLinkedInUrlColumn: "",
              leadScoringColumn: "",
            },
            columns: [],
          },
        ]);
      }
    };

    prefill();
  }, [mode, selectedCampbook]);

  // Workbooks (only for NEW mode)
  const {
    workbooks,
    hasMore,
    loadWorkbooks,
    loading: workbooksLoading,
    handleSearch,
  } = useWorkbookConfigurations(mode === "new" ? selectedCampaign : "");

  const { save } = useSaveConfiguration(
    configs.map((c) => c.formData),
    configs.map((c) => c.workbookId),
    mode === "new" ? selectedCampaign : campaignId || selectedCampaign,
    () => {
      alert("Configuration saved successfully!");
      onClose();
    },
    () => alert("Error saving configuration."),
  );

  const updateConfig = (index: number, changes: Partial<WorkbookConfig>) => {
    setConfigs((prev) =>
      prev.map((c, i) => (i === index ? { ...c, ...changes } : c)),
    );
  };

  const updateFormData = (index: number, field: string, value: string) => {
    setConfigs((prev) =>
      prev.map((c, i) =>
        i === index ? { ...c, formData: { ...c.formData, [field]: value } } : c,
      ),
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "new" ? "New Configuration" : "Edit Configuration"}
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center items-center py-3">
            <SpinLoader />
          </div>
        ) : (
          <div className="space-y-4">
            {/* Campaign select (NEW only) */}
            {mode === "new" && (
              <SingleSelectComponent
                value={selectedCampaign}
                options={campaignOptions}
                onChange={setSelectedCampaign}
                disabled={campaignsLoading}
              />
            )}

            {configs.map((config, idx) => (
              <div
                key={idx}
                className="space-y-4 bg-white shadow-sm p-4 border rounded-lg"
              >
                {/* EDIT → fixed workbook */}
                {mode === "edit" ? (
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-sm">Workbook:</span>
                    <span className="w-full text-sm">
                      {config.formData.workbookName}
                    </span>
                  </div>
                ) : (
                  <WorkbookSelect
                    value={config.workbookId}
                    workbooks={workbooks}
                    loadMore={loadWorkbooks}
                    hasMore={hasMore}
                    loading={workbooksLoading}
                    onSearch={handleSearch}
                    prefillName={config.formData.workbookName}
                    onChange={async (val) => {
                      updateConfig(idx, { workbookId: val });

                      const wb = workbooks.find((w) => w.id === val);
                      if (wb) {
                        updateFormData(idx, "workbookName", wb.name);
                      }

                      setLoadingColumns(idx);
                      const cols = await fetchColumns(val);
                      updateConfig(idx, { columns: cols });
                      setLoadingColumns(null);
                    }}
                  />
                )}

                {loadingColumns === idx && (
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <SpinLoader  />
                    Loading columns...
                  </div>
                )}

                {config.workbookId && (
                  <ResearchTypeSelector
                    value={config.researchType}
                    onChange={(val) => {
                      updateConfig(idx, { researchType: val });
                      updateFormData(idx, "researchType", val);
                    }}
                  />
                )}

                {config.workbookId && config.researchType && (
                  <ConfigurationForm
                    formData={config.formData}
                    columns={config.columns}
                    onChange={(field, value) =>
                      updateFormData(idx, field, value)
                    }
                  />
                )}
              </div>
            ))}

            {/* Add workbook */}
            <Button
              variant="outline"
              onClick={() =>
                setConfigs((prev) => [
                  ...prev,
                  {
                    workbookId: "",
                    researchType: "company",
                    formData: {
                      workbookName: "",
                      researchType: "company",
                      companyNameColumn: "",
                      companyLinkedInUrlColumn: "",
                      accountScoringColumn: "",
                      leadLinkedInUrlColumn: "",
                      leadScoringColumn: "",
                    },
                    columns: [],
                  },
                ])
              }
            >
              <Plus className="mr-2 w-4 h-4" /> Add Workbook
            </Button>

            <ActionButtons
              loading={loading}
              onSave={async () => {
                setLoading(true);
                await save();
                setLoading(false);
              }}
              onCancel={onClose}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
