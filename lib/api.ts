import { getToken } from "./auth";
import { OrganizationFormData } from "./types/org-types";

interface UsageData {
  email: string;
  count: number;
}

interface AddTeamMemberData {
  organizationId: string;
  email: string;
  quota: number;
  role: string;
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

// Manage subscription usage API call
export async function manageSubscriptionUsage(
  usageData: UsageData
): Promise<any> {
  const token = getToken();
  if (!token) {
    throw new Error("Authentication required");
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/payment/users/usage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(usageData),
    }
  );
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to update subscription usage");
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

// Add team member API call
export const addTeamMember = async ({
  organizationId,
  email,
  quota,
  role,
}: AddTeamMemberData): Promise<any> => {
  const token = getToken();
  if (!token) {
    throw new Error("Authentication required");
  }

  if (!organizationId || organizationId === "undefined" || organizationId.trim() === "") {
    throw new Error("Organization ID is required and cannot be empty");
  }
  
  const payload: any = {
    addMember: email,
    addQuota: quota,
  };

  if (role === "member") {
    payload.role = role;
    payload.permissions = {
      workbooks: [],
      prompt: [],
      CRM: [],
    };
  }

  console.log("Adding team member with:", { organizationId, email, quota, role, payload });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/payment/admin/organizations/${organizationId}/properties`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("API Error Response:", errorText);
    let errorMessage = "Failed to add team member";
    try {
      const errorData = JSON.parse(errorText);
      errorMessage = errorData.message || errorMessage;
    } catch {
      if (errorText.includes("CastError") && errorText.includes("ObjectId")) {
        errorMessage = "Invalid organization ID provided";
      } else {
        errorMessage = "Server error occurred while adding team member";
      }
    }
    
    throw new Error(errorMessage);
  }

  return response.json();
};
