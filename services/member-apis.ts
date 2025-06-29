import { getToken } from "@/lib/auth";
import {
  EditMemberFormData,
  TeamMemberFormData,
  VALID_PERMISSIONS,
} from "@/lib/types/member-types";

export async function getMembers({ id }: { id: string }): Promise<any> {
  const token = getToken();

  if (!token) {
    throw new Error("Authentication required");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/payment/admin/organizations/${id}/members`,
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

// Add team member API call
export const addTeamMember = async ({
  organizationId,
  email,
  quota,
  role,
  permissions,
}: TeamMemberFormData): Promise<any> => {
  const token = getToken();
  if (!token) {
    throw new Error("Authentication required");
  }

  if (
    !organizationId ||
    organizationId === "undefined" ||
    organizationId.trim() === ""
  ) {
    throw new Error("Organization ID is required and cannot be empty");
  }

  const payload: any = {
    addMember: email,
    addQuota: Number(quota),
    role,
  };

  if (role === "admin") {
    payload.permissions = [];
  } else if (role === "member") {
    // Convert the object of arrays into flat array of { resource, permission }
    const formattedPermissions = Object.entries(permissions)
      .flatMap(([resource, values]) =>
        values.map((permission) => ({
          resource,
          permission,
        }))
      )
      .filter(({ resource, permission }) =>
        VALID_PERMISSIONS[resource as keyof typeof VALID_PERMISSIONS]?.includes(
          permission
        )
      );

    payload.permissions = formattedPermissions;
  }

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

//edit team member API call
export const editTeamMember = async ({
  organizationId,
  memberId,
  addQuota,
  reduceQuota,
  role,
  permissions,
}: EditMemberFormData): Promise<any> => {
  const token = getToken();
  if (!token) {
    throw new Error("Authentication required");
  }

  if (
    !organizationId ||
    organizationId === "undefined" ||
    organizationId.trim() === ""
  ) {
    throw new Error("Organization ID is required and cannot be empty");
  }

  const payload: any = {
    addQuota: Number(addQuota),
    reduceQuota: Number(reduceQuota),
    role,
  };

  if (role === "admin") {
    payload.permissions = [];
  } else if (role === "member") {
    // Convert the object of arrays into flat array of { resource, permission }
    const formattedPermissions = Object.entries(permissions)
      .flatMap(([resource, values]) =>
        values.map((permission) => ({
          resource,
          permission,
        }))
      )
      .filter(({ resource, permission }) =>
        VALID_PERMISSIONS[resource as keyof typeof VALID_PERMISSIONS]?.includes(
          permission
        )
      );

    payload.permissions = formattedPermissions;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/payment/admin/organizations/${organizationId}/members/${memberId}/quota`,
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
// remove team member API call
export const removeTeamMember = async ({
  organizationId,
  email,
}: {
  organizationId: string;
  email: string;
}): Promise<any> => {
  const token = getToken();
  if (!token) {
    throw new Error("Authentication required");
  }

  if (
    !organizationId ||
    organizationId === "undefined" ||
    organizationId.trim() === ""
  ) {
    throw new Error("Organization ID is required and cannot be empty");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/payment/admin/organizations/${organizationId}/properties`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        removeMember: email,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("API Error Response:", errorText);
    let errorMessage = "Failed to remove team member";
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
