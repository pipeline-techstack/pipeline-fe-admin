import { getWorkbookConfiguration } from "@/app/(protected)/wb-config/services/config-apis";
import { FormData, Column } from "@/app/(protected)/wb-config/types/api";
import { useEffect, useState } from "react";

type WorkbookConfig = {
  workbookId: string;
  researchType: "company" | "lead";
  formData: FormData;
  columns: Column[];
};

export const usePrefillConfiguration = (
  mode: string,
  campaignId: string,
  setConfigs: React.Dispatch<React.SetStateAction<WorkbookConfig[]>>,
  loadColumns: (id: string) => Promise<Column[]>
) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const prefill = async () => {
      if (mode === "edit" && campaignId) {
        setLoading(true);
        const configResponse = await getWorkbookConfiguration(campaignId);

        if (configResponse?.workbooks?.length > 0) {
          const workbookConfigs: WorkbookConfig[] = [];

          for (const wb of configResponse.workbooks) {
            const cols = await loadColumns(wb.workbook_id);

            const campaignConfig = wb.campaign_configuration;
            const formData: FormData = {
              workbookName: wb.workbook_name,
              researchType: campaignConfig.company_research
                ? "company"
                : "lead",
              companyNameColumn: campaignConfig.company_name_column_id || "",
              companyLinkedInUrlColumn:
                campaignConfig.company_linkedin_url_column_id || "",
              accountScoringColumn:
                campaignConfig.account_scoring_column_id || "",
              leadLinkedInUrlColumn:
                campaignConfig.lead_linkedin_url_column_id || "",
              leadScoringColumn: campaignConfig.lead_scoring_column_id || "",
            };

            workbookConfigs.push({
              workbookId: wb.workbook_id,
              researchType: formData.researchType,
              formData,
              columns: cols,
            });
          }

          setConfigs(workbookConfigs);
          setLoading(false);
        }
      } else {
        // new mode → always start with one empty config
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
  }, [mode, campaignId]);
  return { loading };
};
