// services/api.ts
import {
  WorkbookConfiguration,
  WorkbookApiResponse,
  Column,
  ColumnsApiResponse,
  WorkbookConfigurationRequest,
  WorkbookConfigurationResponse,
} from '../types/api';

const BASE_URL = process.env.NEXT_PUBLIC_WORKBOOK_URL_DEV;

// Helper function to get auth token
const getAuthToken = (): string | null => {
  return typeof window !== "undefined" 
    ? localStorage.getItem("st_access_token") 
    : null;
};

// Helper function to create auth headers
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Authorization': token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json',
  };
};

export async function fetchWorkbookConfigurations(): Promise<WorkbookConfiguration[]> {
  try {
    const API_URL = `${BASE_URL}/admin/all/configure/workbook-campaign`;
    const res = await fetch(API_URL, {
      method: "GET",
      headers: getAuthHeaders(),
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch workbook configurations: ${res.status}`);
    }

    const data = await res.json();
    const workbooks: WorkbookApiResponse[] = Array.isArray(data.workbooks) ? data.workbooks : [];
    
    return workbooks.map((wb: WorkbookApiResponse) => ({
      id: wb.workbook_id,
      campaign_id: wb.campaign_configuration.campaign_id,
      campaign: wb.campaign_configuration.campaign_name,
      workbooks: [wb.workbook_name],
      additionalCount: 0,
    }));
  } catch (error) {
    console.error("API error:", error);
    return [];
  }
}

export async function fetchWorkbookColumns(workbookId: string): Promise<Column[]> {
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
      .filter(([_, meta]) => !meta.deleted) // skip deleted ones
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

export async function getWorkbookConfiguration(workbookId: string): Promise<WorkbookConfigurationResponse | null> {
  try {
    const API_URL = `${BASE_URL}/admin/configure/workbook-campaign/${workbookId}`;
    const res = await fetch(API_URL, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      if (res.status === 404) {
        // Configuration doesn't exist yet
        return null;
      }
      throw new Error(`Failed to get workbook configuration: ${res.status}`);
    }

    const data: WorkbookConfigurationResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching workbook configuration:", error);
    return null;
  }
}

export async function saveWorkbookConfiguration(
  workbookId: string,
  configuration: WorkbookConfigurationRequest
): Promise<WorkbookConfigurationResponse> {
  try {
    const API_URL = `${BASE_URL}/admin/configure/workbook-campaign/${workbookId}`;
    const res = await fetch(API_URL, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(configuration),
    });

    if (!res.ok) {
      throw new Error(`Failed to save workbook configuration: ${res.status}`);
    }

    const data: WorkbookConfigurationResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error saving workbook configuration:", error);
    throw error;
  }
}