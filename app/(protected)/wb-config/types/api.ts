// types/api.ts
export interface WorkbookConfiguration {
  campaign_id: string;
  campaign: string;
  workbooks: string[];
  additionalCount: number;
}

export interface WorkbookApiResponse {
  workbook_id: string;
  workbook_name: string;
  campaign_configuration: {
    campaign_id: string;
    campaign_name: string;
    company_research?: boolean;
    updated_at?: string;
    company_name_column_id?: string;
    company_linkedin_url_column_id?: string;
    account_scoring_column_id?: string;
  };
}

export interface Column {
  column_id: string;
  column_name: string;
  column_type?: string;
  position?: number;
}

export interface ColumnsApiResponse {
  message: string;
  column_metadata: Record<
    string,
    {
      column_name: string;
      column_type?: string;
      position?: number;
      deleted?: boolean;
    }
  >;
}
export interface WorkbookConfigurationRequest {
  campaign_id: string;
  workbook_id: string;
  company_research: boolean;
  company_name_column_id?: string;
  company_linkedin_url_column_id?: string;
  account_scoring_column_id?: string;
}

export interface WorkbookConfigurationResponse {
  workbook_id: string;
  workbook_name: string;
  campaign_configuration: {
    campaign_id: string;
    campaign_name: string;
    company_research: boolean;
    updated_at: string;
    company_name_column_id?: string;
    company_linkedin_url_column_id?: string;
    account_scoring_column_id?: string;
  };
}

export interface FormData {
  workbookName: string;
  researchType: 'company' | 'lead';
  companyNameColumn?: string;
  companyLinkedInUrlColumn?: string;
  accountScoringColumn?: string;
  leadLinkedInUrlColumn?: string;
  leadScoringColumn?: string;
}

export type Workbook = {
  id: string;
  name: string;
};

