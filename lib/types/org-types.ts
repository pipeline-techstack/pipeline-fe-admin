export interface OrganizationData {
  _id: string;
  name: string;
  email: string;
  monthlyQuota: number;
  seats: number;
  updatedAt: string;
  checked?: boolean;
}

export interface OrganizationFormData {
  organizationName: string;
  enterpriseId: string;
  email: string;
  quota: string;
}
