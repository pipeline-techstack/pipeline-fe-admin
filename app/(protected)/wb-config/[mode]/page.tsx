"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Save, X } from "lucide-react";
import {
  Column,
  FormData,
  WorkbookConfiguration,
  WorkbookConfigurationRequest,
} from "../types/api";
import {
  fetchWorkbookColumns,
  fetchWorkbookConfigurations,
  getWorkbookConfiguration,
  saveWorkbookConfiguration,
} from "../services/config-apis";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import MultiSelect from "@/components/multi-select";
import { useHeyreach } from "@/hooks/use-heyreach";

const EditConfigurations = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Action will be "new" or "edit"
  const mode = params.mode;
  const workbookIdFromParams = searchParams.get("id") || "";
  const campaignIdFromParams = searchParams.get("campaignId") || "";

  const [selectedCampaign, setSelectedCampaign] = useState<string>("");
  const [workbooks, setWorkbooks] = useState<WorkbookConfiguration[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [selectedWorkbooks, setSelectedWorkbooks] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    workbookName: "",
    researchType: "company",
    companyNameColumn: "",
    companyLinkedInUrlColumn: "",
    accountScoringColumn: "",
    leadLinkedInUrlColumn: "",
    leadScoringColumn: "",
  });

  const { campaignsQuery } = useHeyreach({ enableCampaigns: mode === "new" });
  const { data: campaigns = [], isLoading: campaignsLoading } = campaignsQuery;

  const campaignOptions =
    campaigns?.map((c: any) => ({
      id: c.id?.toString(),
      name: c.name,
    })) ?? [];

  // Load available workbooks
  useEffect(() => {
    loadWorkbooks();
  }, []);

  // Prefill if editing
  useEffect(() => {
    if (mode === "edit") {
      prefillConfiguration(workbookIdFromParams);
    }
  }, [mode]);

  const loadWorkbooks = async () => {
    try {
      const data = await fetchWorkbookConfigurations();
      setWorkbooks(data);
    } catch (error) {
      console.error("Error loading workbooks:", error);
    }
  };

  const loadColumns = async (workbookId: string) => {
    try {
      const columnsData = await fetchWorkbookColumns(workbookId);
      setColumns(columnsData);
    } catch (error) {
      console.error("Error loading workbooks:", error);
    }
  };

  const prefillConfiguration = async (workbookId: string) => {
    try {
      await loadColumns(workbookId);
      const config = await getWorkbookConfiguration(workbookId);
      if (config?.campaign_configuration) {
        const { campaign_configuration } = config;

        setFormData({
          workbookName: workbookId,
          researchType: campaign_configuration.company_research
            ? "company"
            : "lead",
          companyNameColumn:
            campaign_configuration.company_name_column_id || "",
          companyLinkedInUrlColumn:
            campaign_configuration.company_linkedin_url_column_id || "",
          accountScoringColumn:
            campaign_configuration.account_scoring_column_id || "",
          leadLinkedInUrlColumn:
            campaign_configuration.lead_linkedin_url_column_id || "",
          leadScoringColumn:
            campaign_configuration.lead_scoring_column_id || "",
        });

        setSelectedWorkbooks([workbookId]);
      }
    } catch (error) {
      console.error("Error pre-filling configuration:", error);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    if (selectedWorkbooks.length === 0) {
      alert("Please select at least one workbook");
      return;
    }

    // Pick campaign id depending on mode/params
    const campaignId =
      mode === "new"
        ? selectedCampaign
        : campaignIdFromParams || selectedCampaign;

    if (!campaignId) {
      alert("Please select a campaign");
      return;
    }

    setLoading(true);
    try {
      for (const workbookId of selectedWorkbooks) {
        const configRequest: WorkbookConfigurationRequest = {
          campaign_id: campaignId,
          company_research: formData.researchType === "company",
        };

        if (formData.researchType === "company") {
          if (formData.companyNameColumn)
            configRequest.company_name_column_id = formData.companyNameColumn;
          if (formData.companyLinkedInUrlColumn)
            configRequest.company_linkedin_url_column_id =
              formData.companyLinkedInUrlColumn;
          if (formData.accountScoringColumn)
            configRequest.account_scoring_column_id =
              formData.accountScoringColumn;
        } else {
          if (formData.leadLinkedInUrlColumn)
            configRequest.lead_linkedin_url_column_id =
              formData.leadLinkedInUrlColumn;
          if (formData.leadScoringColumn)
            configRequest.lead_scoring_column_id = formData.leadScoringColumn;
        }

        await saveWorkbookConfiguration(workbookId, configRequest);
      }

      alert("Configuration saved successfully!");
      router.push("/wb-config");
    } catch (error) {
      console.error("Error saving configuration:", error);
      alert("Error saving configuration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/wb-config");
  };

  return (
    <div className="bg-white mx-auto p-6 max-w-2xl">
      <div className="space-y-6">
        {mode === "new" && (
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700 text-sm">
              Select Campaign
            </label>
            <Select
              value={selectedCampaign}
              onValueChange={(val) => setSelectedCampaign(val)}
              disabled={campaignsLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Campaign..." />
              </SelectTrigger>
              <SelectContent>
                {campaignOptions.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Workbook MultiSelect */}
        <div>
          <Label className="block mb-2">Workbook Name</Label>
          <Select
            value={formData.workbookName}
            onValueChange={(val) => {
              handleInputChange("workbookName", val); // store the workbookId
              setSelectedWorkbooks([val]); // keep compatibility with existing save logic
              loadColumns(val); // fetch columns using workbookId
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select workbook" />
            </SelectTrigger>
            <SelectContent>
              {workbooks.map((c) => (
                <SelectItem key={c.id} value={String(c.id)}>
                  {c.workbooks[0]} {/* show workbook name */}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Research Type */}
        <div>
          <Label className="block mb-4">Research Type</Label>
          <RadioGroup
            value={formData.researchType}
            onValueChange={(val) =>
              handleInputChange("researchType", val as "company" | "lead")
            }
            className="flex space-x-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="company" id="company" />
              <Label htmlFor="company">Company Search</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="lead" id="lead" />
              <Label htmlFor="lead">Lead Search</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Configuration Section */}
        <Card>
          <CardContent className="space-y-4 p-4">
            <h3 className="font-medium text-gray-700 text-lg">
              {formData.researchType === "company"
                ? "Company Research Configuration"
                : "Lead Research Configuration"}
            </h3>

            {formData.researchType === "company" ? (
              <>
                {/* Company Name Column */}
                <div>
                  <Label>Company Name Column</Label>
                  <Select
                    value={formData.companyNameColumn}
                    onValueChange={(val) =>
                      handleInputChange("companyNameColumn", val)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select column" />
                    </SelectTrigger>
                    <SelectContent>
                      {columns.map((c) => (
                        <SelectItem key={c.column_id} value={c.column_id}>
                          {c.column_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Company Domain Column */}
                <div>
                  <Label>Company Domain Column</Label>
                  <Select
                    value={formData.companyLinkedInUrlColumn}
                    onValueChange={(val) =>
                      handleInputChange("companyLinkedInUrlColumn", val)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select column" />
                    </SelectTrigger>
                    <SelectContent>
                      {columns.map((c) => (
                        <SelectItem key={c.column_id} value={c.column_id}>
                          {c.column_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Account Scoring Column */}
                <div>
                  <Label>Account Scoring Column</Label>
                  <Select
                    value={formData.accountScoringColumn}
                    onValueChange={(val) =>
                      handleInputChange("accountScoringColumn", val)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select column" />
                    </SelectTrigger>
                    <SelectContent>
                      {columns.map((c) => (
                        <SelectItem key={c.column_id} value={c.column_id}>
                          {c.column_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            ) : (
              <>
                {/* Lead LinkedIn URL Column */}
                <div>
                  <Label>Lead LinkedIn URL Column</Label>
                  <Select
                    value={formData.leadLinkedInUrlColumn}
                    onValueChange={(val) =>
                      handleInputChange("leadLinkedInUrlColumn", val)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select column" />
                    </SelectTrigger>
                    <SelectContent>
                      {columns.map((c) => (
                        <SelectItem key={c.column_id} value={c.column_id}>
                          {c.column_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Lead Scoring Column */}
                <div>
                  <Label>Lead Scoring Column</Label>
                  <Select
                    value={formData.leadScoringColumn}
                    onValueChange={(val) =>
                      handleInputChange("leadScoringColumn", val)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select column" />
                    </SelectTrigger>
                    <SelectContent>
                      {columns.map((c) => (
                        <SelectItem key={c.column_id} value={c.column_id}>
                          {c.column_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex space-x-4 pt-6">
          <Button onClick={handleSave} disabled={loading}>
            <Save className="mr-2 w-4 h-4" />
            {loading ? "Saving..." : "Save"}
          </Button>
          <Button variant="outline" onClick={handleCancel}>
            <X className="mr-2 w-4 h-4" />
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditConfigurations;
