import { saveWorkbookConfiguration } from "@/app/(protected)/wb-config/services/config-apis";
import { FormData, WorkbookConfigurationRequest } from "@/app/(protected)/wb-config/types/api";


export const useSaveConfiguration = (
  formData: FormData,
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
      for (const workbookId of selectedWorkbooks) {
        const configRequest: WorkbookConfigurationRequest = {
          campaign_id: campaignId,
          company_research: formData.researchType === "company",
        };

        if (formData.researchType === "company") {
          if (formData.companyNameColumn) configRequest.company_name_column_id = formData.companyNameColumn;
          if (formData.companyLinkedInUrlColumn) configRequest.company_linkedin_url_column_id = formData.companyLinkedInUrlColumn;
          if (formData.accountScoringColumn) configRequest.account_scoring_column_id = formData.accountScoringColumn;
        } else {
          if (formData.leadLinkedInUrlColumn) configRequest.lead_linkedin_url_column_id = formData.leadLinkedInUrlColumn;
          if (formData.leadScoringColumn) configRequest.lead_scoring_column_id = formData.leadScoringColumn;
        }

        await saveWorkbookConfiguration(workbookId, configRequest);
      }
      onSuccess();
    } catch (e) {
      console.error("Error saving configuration:", e);
      onError();
    }
  };

  return { save };
};
