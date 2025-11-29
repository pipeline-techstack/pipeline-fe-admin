import { getToken } from "@/lib/auth";

export interface EstimatedCostResponse {
  success: boolean;
  workbook_cost?: number;
  column_cost?: number;
  message?: string;
  [key: string]: any;
}

export async function getEstimatedCost(
  workbookId: string,
  columnId?: string
): Promise<EstimatedCostResponse> {
  const token = getToken();
  if (!token) throw new Error("Authentication required");
  const url = new URL(
    `${process.env.NEXT_PUBLIC_WORKBOOK_URL_DEV}/admin/ai-usage-cost`
  );

  url.searchParams.append("workbook_id", workbookId);
  if (columnId) url.searchParams.append("column_id", columnId);

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Cost API error:", errorText);
    throw new Error(`Failed to fetch estimated cost: ${response.statusText}`);
  }

  const data = (await response.json()) as EstimatedCostResponse;
  return data;
}
