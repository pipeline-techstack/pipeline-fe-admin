import {
  WorkbookConfiguration,
  WorkbookApiResponse,
  Column,
  ColumnsApiResponse,
  WorkbookConfigurationRequest,
  WorkbookConfigurationResponse,
  Workbook,
} from "../types/api";

const BASE_URL = process.env.NEXT_PUBLIC_WORKBOOK_URL_DEV;

const getAuthToken = (): string | null => {
  return typeof window !== "undefined"
    ? localStorage.getItem("st_access_token")
    : null;
};

const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };
};

export async function fetchWorkbookConfigurations(): Promise<
  WorkbookConfiguration[]
> {
  try {
    const API_URL = `${BASE_URL}/admin/all/configure/workbook-campaign`;
    const res = await fetch(API_URL, {
      method: "GET",
      headers: getAuthHeaders(),
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch workbook configurations: ${res.status}`
      );
    }

    const data = await res.json();

    // Response Format:
    // { message, campaigns: [{ campaign_id, campaign_name, workbooks: [{ workbook_id, workbook_name }] }] }

    const campaigns = Array.isArray(data.campaigns) ? data.campaigns : [];

    return campaigns.map((campaign: any): WorkbookConfiguration => {
      const workbooks: Workbook[] =
        campaign.workbooks?.map((wb: any) => ({
          id: wb.workbook_id,
          name: wb.workbook_name,
        })) ?? [];

      return {
        campaign_id: campaign.campaign_id,
        campaign: campaign.campaign_name,
        workbooks,
        additionalCount: Math.max((workbooks.length || 0) - 2, 0), 
      };
    });
  } catch (error) {
    console.error("API error:", error);
    return [];
  }
}

export async function fetchWorkbookColumns(
  workbookId: string
): Promise<Column[]> {
  try {
    const API_URL = `${BASE_URL}/admin/columns/${workbookId}`;
    const res = await fetch(API_URL, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch columns: ${res.status}`);
    }

    const data: ColumnsApiResponse = await res.json();

    const columns: Column[] = Object.entries(data.column_metadata || {})
      .filter(([_, meta]) => !meta.deleted)
      .map(([id, meta]) => ({
        column_id: id,
        column_name: meta.column_name,
        column_type: meta.column_type,
        position: meta.position,
      }));

    return columns;
  } catch (error) {
    console.error("Error fetching columns:", error);
    return [];
  }
}

export async function getWorkbookConfiguration(
  campaignId: string
): Promise<WorkbookConfigurationResponse | null> {
  try {
    const API_URL = `${BASE_URL}/admin/configure/workbook-campaign/${campaignId}`;
    const res = await fetch(API_URL, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error(`Failed to get workbook configuration: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching workbook configuration:", error);
    return null;
  }
}

export async function saveWorkbookConfiguration(
  configurations: WorkbookConfigurationRequest[]
): Promise<WorkbookConfigurationResponse[]> {
  try {
    const API_URL = `${BASE_URL}/admin/configure/workbook-campaign`;
    const res = await fetch(API_URL, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(configurations),
    });

    if (!res.ok) {
      throw new Error(`Failed to save workbook configuration: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error saving workbook configuration:", error);
    throw error;
  }
}
