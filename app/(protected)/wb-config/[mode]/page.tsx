"use client";
import { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useWorkbookConfigurations } from "@/hooks/use-workbook-config";
import { useWorkbookColumns } from "@/hooks/use-workbook-columns";
import { FormData, Column } from "../types/api";
import { useHeyreach } from "@/hooks/use-heyreach";
import { usePrefillConfiguration } from "@/hooks/use-prefill-config";
import { useSaveConfiguration } from "@/hooks/use-save-config";
import { WorkbookSelect } from "../_components/workbook-select";
import { ResearchTypeSelector } from "../_components/workbook-type-selector";
import { ConfigurationForm } from "../_components/configurations-form";
import { ActionButtons } from "../_components/action-buttons";
import { SingleSelectComponent } from "../_components/campaign-select";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";

type WorkbookConfig = {
  workbookId: string;
  researchType: "company" | "lead";
  formData: FormData;
  columns: Column[];
};

const EditConfigurations = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const mode = params.mode as string;
  const campaignIdFromParams = searchParams.get("campaign") || "";

  const {
    workbooks,
    hasMore,
    loadWorkbooks,
    loading: workbooksLoading,
    handleSearch,
  } = useWorkbookConfigurations();
  const { loadColumns: fetchColumns } = useWorkbookColumns();

  const [configs, setConfigs] = useState<WorkbookConfig[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [loadingColumns, setLoadingColumns] = useState<number | null>(null);

  const { campaignsQuery } = useHeyreach({ enableCampaigns: mode === "new" });
  const { data: campaigns = [], isLoading: campaignsLoading } = campaignsQuery;
  const campaignOptions =
    campaigns?.map((c: any) => ({ id: c.id?.toString(), name: c.name })) ?? [];

  // Prefill edit mode
  const { loading: prefillLoading } = usePrefillConfiguration(
    mode,
    campaignIdFromParams,
    setConfigs,
    fetchColumns
  );

  const { save } = useSaveConfiguration(
    configs.map((c) => c.formData),
    configs.map((c) => c.workbookId),
    mode === "new"
      ? selectedCampaign
      : campaignIdFromParams || selectedCampaign,
    () => {
      alert("Configuration saved successfully!");
      router.push("/wb-config");
    },
    () => alert("Error saving configuration. Please try again.")
  );

  const updateConfig = (index: number, changes: Partial<WorkbookConfig>) => {
    setConfigs((prev) =>
      prev.map((c, i) => (i === index ? { ...c, ...changes } : c))
    );
  };

  const updateFormData = (
    index: number,
    field: keyof FormData,
    value: string
  ) => {
    setConfigs((prev) =>
      prev.map((c, i) =>
        i === index ? { ...c, formData: { ...c.formData, [field]: value } } : c
      )
    );
  };

  if (prefillLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin" />
      </div>
    );
  }
  return (
    <div className="space-y-6 bg-white mx-auto p-6 max-w-2xl">
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
          className="relative space-y-4 shadow-sm p-4 border rounded-lg"
        >
          {/* Workbook selector */}
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

              // find workbook name by id
              const wb = workbooks.find((w) => w.id === val);
              if (wb) {
                updateFormData(idx, "workbookName", wb.name);
              }

              // fetch columns
              setLoadingColumns(idx);
              const cols = await fetchColumns(val);
              updateConfig(idx, { columns: cols });
              setLoadingColumns(null);
            }}
          />

          {loadingColumns === idx && (
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Loader2 className="w-4 h-4 animate-spin" /> Loading columns...
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
              onChange={(field, value) => updateFormData(idx, field, value)}
            />
          )}
        </div>
      ))}

      {/* Add workbook */}
      <Button
        type="button"
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

      {/* Save + Cancel */}
      <ActionButtons
        loading={loading}
        onSave={async () => {
          setLoading(true);
          await save();
          setLoading(false);
        }}
        onCancel={() => router.push("/wb-config")}
      />
    </div>
  );
};

export default EditConfigurations;
