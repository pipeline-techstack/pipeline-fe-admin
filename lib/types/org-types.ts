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
  id?: string;
  organizationName: string;
  enterpriseId: string;
  email?: string;
  quota: number;
  addQuota?: number;
  removeQuota?: number;
  addSeats?: number;
  removeSeats?: number;
  seats?: number;
}
