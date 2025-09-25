import { getWorkbookConfiguration } from "@/app/(protected)/wb-config/services/config-apis";
import { FormData, Column } from "@/app/(protected)/wb-config/types/api";
import { useEffect } from "react";

type WorkbookConfig = {
  workbookId: string;
  researchType: "company" | "lead";
  formData: FormData;
  columns: Column[];
};

export const usePrefillConfiguration = (
  mode: string,
  workbookId: string,
  setConfigs: React.Dispatch<React.SetStateAction<WorkbookConfig[]>>,
  loadColumns: (id: string) => Promise<Column[]>
) => {
  useEffect(() => {
    if (workbookId) {
      const prefill = async () => {
        if (mode === "edit") {
          const cols = await loadColumns(workbookId);
          const config = await getWorkbookConfiguration(workbookId);

          if (config?.campaign_configuration) {
            const { campaign_configuration } = config;

            const formData: FormData = {
              workbookName: workbookId,
              researchType: campaign_configuration.company_research ? "company" : "lead",
              companyNameColumn: campaign_configuration.company_name_column_id || "",
              companyLinkedInUrlColumn: campaign_configuration.company_linkedin_url_column_id || "",
              accountScoringColumn: campaign_configuration.account_scoring_column_id || "",
              leadLinkedInUrlColumn: campaign_configuration.lead_linkedin_url_column_id || "",
              leadScoringColumn: campaign_configuration.lead_scoring_column_id || "",
            };

            setConfigs([{
              workbookId,
              researchType: formData.researchType,
              formData,
              columns: cols,
            }]);
          }
        } else {
          // new mode → always start with one empty config
          setConfigs([{
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
          }]);
        }
      };

      prefill();
    }
  }, [mode, workbookId]);
};
