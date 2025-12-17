import { getToken } from "@/lib/auth";

export const getEnrichments = async (): Promise<any> => {
  const token = getToken();
  if (!token) throw new Error("Authentication required");

  const url = `${process.env.NEXT_PUBLIC_ENRICHMENT_URL}/flows/admin`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error("Failed to get enrichments");

  return res.json();
};

export const getPrompts = async ({flow_id}: {flow_id: string}): Promise<any> => {
  const token = getToken();
  if (!token) throw new Error("Authentication required");

  const url = `${process.env.NEXT_PUBLIC_ENRICHMENT_URL}/flows/${flow_id}/prompts`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error("Failed to get prompts");

  return res.json();
};