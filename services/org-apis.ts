import { getToken } from "@/lib/auth";
import { OrganizationFormData } from "@/lib/types/org-types";

export async function getOrganizations(): Promise<any> {
  const token = getToken();

  if (!token) {
    throw new Error("Authentication required");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/payment/admin/get-orgs`,
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
    throw new Error(errorData.message || "Failed to fetch organizations");
  }

  return response.json();
}

// Add organization API call
export async function addOrganization(
  formData: OrganizationFormData
): Promise<any> {
  const token = getToken();
  if (!token) {
    throw new Error("Authentication required");
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/payment/admin/enterprise-organizations`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: formData.organizationName,
        enterprisePriceId: formData.enterpriseId,
        email: formData.email,
        quota: formData.quota,
      }),
    }
  );
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to add subscription");
  }
  return await response.json();
}

// Edit organization API call
export const editOrganization = async ({
  id,
  name,
  addQuota,
  removeQuota,
  addSeats,
  removeSeats,
}: {
  id: string;
  name: string;
  email: string;
  addQuota: number;
  removeQuota: number;
  addSeats: number;
  removeSeats: number;
}) => {
  const token = getToken();
  if (!token) {
    throw new Error("Authentication required");
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/payment/admin/organizations/${id}/properties`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        addQuota: addQuota,
        subtractQuota: removeQuota,
        addSeats: addSeats,
        subtractSeats: removeSeats,
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to edit organization");
  }

  return response.json();
};
