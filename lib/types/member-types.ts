type RoleType = "owner" | "admin" | "member";

export type Member = {
  _id: string;
  userId: string;
  name?: string;
  email: string;
  organizationId: string;
  rowQuota: number;
  usedRows: number;
  role: RoleType; // Extend if needed
  createdAt: string;
  updatedAt: string;
};

export interface TeamMemberFormData {
  name: string;
  email: string;
  quota: string;
  role: RoleType;
  permissions: {
    workbooks: [];
    prompt: [];
    CRM: [];
  };
}
