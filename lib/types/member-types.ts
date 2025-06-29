type RoleType = "owner" | "admin" | "member";
export type PermissionLevel = "Read" | "Exec" | "Editor" | "Admin";
export type Member = {
  userId: string;
  name?: string;
  email: string;
  organizationId: string;
  rowQuota: number;
  usedRows: number;
  role: RoleType; // Extend if needed
  permissions: {
    workbooks: [];
    prompt: [];
    CRM: [];
  };
  updatedAt: string;
};

export interface TeamMemberFormData {
  organizationId?: string;
  email: string;
  quota: string;
  role: RoleType;
  permissions: {
    workbooks: [];
    prompt: [];
    CRM: [];
  };
}

export interface EditMemberFormData extends TeamMemberFormData {
  memberId: string;
  addQuota: number;
  reduceQuota: number;
}
export const VALID_PERMISSIONS = {
  workbooks: ["Read", "Exec", "Editor", "Admin"],
  prompt: ["Read", "Admin"],
} as const;
