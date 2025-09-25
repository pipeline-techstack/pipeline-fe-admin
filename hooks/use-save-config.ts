import { saveWorkbookConfiguration } from "@/app/(protected)/wb-config/services/config-apis";
import { FormData, WorkbookConfigurationRequest } from "@/app/(protected)/wb-config/types/api";

export const useSaveConfiguration = (
  formDataList: FormData[],
  selectedWorkbooks: string[],
  campaignId: string,
  onSuccess: () => void,
  onError: () => void
) => {
  const save = async () => {
    if (selectedWorkbooks.length === 0) {
      alert("Please select at least one workbook");
      return;
    }

    if (!campaignId) {
      alert("Please select a campaign");
      return;
    }

    try {
      // build array payload
      const configRequests: WorkbookConfigurationRequest[] = formDataList.map(
        (formData, idx) => {
          const workbookId = selectedWorkbooks[idx];
          const config: WorkbookConfigurationRequest = {
            campaign_id: campaignId,
            workbook_id: workbookId,
            company_research: formData.researchType === "company",
          };

          if (formData.researchType === "company") {
            if (formData.companyNameColumn)
              config.company_name_column_id = formData.companyNameColumn;
            if (formData.companyLinkedInUrlColumn)
              config.company_linkedin_url_column_id =
                formData.companyLinkedInUrlColumn;
            if (formData.accountScoringColumn)
              config.account_scoring_column_id = formData.accountScoringColumn;
          } else {
            if (formData.leadLinkedInUrlColumn)
              config.lead_linkedin_url_column_id =
                formData.leadLinkedInUrlColumn;
            if (formData.leadScoringColumn)
              config.lead_scoring_column_id = formData.leadScoringColumn;
          }

          return config;
        }
      );

      await saveWorkbookConfiguration(configRequests);

      onSuccess();
    } catch (e) {
      console.error("Error saving configuration:", e);
      onError();
    }
  };

  return { save };
};
