import { getToken } from "@/lib/auth";
import {
  DuplicateWorkbookPayload,
  Workbook,
  WorkbookParams,
  WorkbooksResponse,
} from "@/app/(protected)/workbooks/wb-table";

const BASE_URL = process.env.NEXT_PUBLIC_WORKBOOK_URL_DEV;

if (!BASE_URL) {
  throw new Error("Missing NEXT_PUBLIC_WORKBOOK_URL_DEV in environment variables");
}

function normalizeWorkbooksResponse(result: any): WorkbooksResponse {
  return {
    workbooks: (result.items || []).map((item: any): Workbook => ({
      id: item.id,
      name: item.name,
      owners: item.user_email ? [item.user_email] : [],
      createdAt: item.createdAt || "",
    })),
    total: result.total || 0,
    page: result.page || 1,
    pageSize: result.page_size || 30,
  };
}

export const getWorkbooks = async (
  params: WorkbookParams = {}
): Promise<WorkbooksResponse> => {
  const token = getToken();
  if (!token) {
    throw new Error("Authentication required");
  }

  const queryParams = new URLSearchParams({
    page: String(params.page ?? 1),
    page_size: String(params.pageSize ?? 30),
    ...(params.search ? { search: params.search } : {}),
  });

  const response = await fetch(
    `${BASE_URL}/admin/workbooks?${queryParams.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch workbooks");
  }

  const result = await response.json();
  return normalizeWorkbooksResponse(result);
};

export const duplicateWorkbook = async (
  payload: DuplicateWorkbookPayload
): Promise<string> => {
  const token = getToken();
  if (!token) {
    throw new Error("Authentication required");
  }

  const response = await fetch(`${BASE_URL}/admin/workbook/duplicate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to duplicate workbook");
  }

  const result = await response.json();
  return result;
};
