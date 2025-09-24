export interface WorkbookConfiguration {
  id: number;
  campaign: string;
  workbooks: string[];
  additionalCount: number;
}

interface WorkbookApiResponse {
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

const BASE_URL = process.env.NEXT_PUBLIC_WORKBOOK_URL_DEV;
const API_URL = `${BASE_URL}/admin/all/configure/workbook-campaign`;

export async function fetchWorkbookConfigurations(): Promise<WorkbookConfiguration[]> {
  try {
    const token = typeof window !== "undefined"
      ? localStorage.getItem("st_access_token")
      : null;

    const res = await fetch(API_URL, {
      method: "GET",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch workbook configurations: ${res.status}`);
    }

    const data = await res.json();

    const workbooks: WorkbookApiResponse[] = Array.isArray(data.workbooks) ? data.workbooks : [];

    return workbooks.map((wb: WorkbookApiResponse) => ({
      id: Number(wb.campaign_configuration.campaign_id),
      campaign: wb.campaign_configuration.campaign_name,
      workbooks: [wb.workbook_name],
      additionalCount: 0, 
    }));
  } catch (error) {
    console.error("API error:", error);
    return [];
  }
}
