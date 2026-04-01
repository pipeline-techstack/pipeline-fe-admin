export type CustomerStatus = "active" | "inactive";
export type EnrichmentType = "Leads" | "Exploratory" | "Accounts";
export type CampaignRole = "Owner" | "Viewer" | "Editor";

export interface Feature {
  id: string;
  label: string;
}

export interface CampaignPermission {
  id: string;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  heyreach_id: number;
}
export interface Workbook {
  _id: string;
  name: string;
  rows: number;
}
export interface WBConfig {
  _id: string;
  campaign: string;
  workbook: string;
}
export interface Enrichment {
  _id: string;
  name: string;
  type: EnrichmentType;
  createdOn: string;
}

export interface Organization {
  company: string;
  quota: string;
  seats: number;
  region: string;
  admins: number;
  status: CustomerStatus;
}

export interface Payment {
  payment_mode: string;
  platform: string;
  payment_terms?: string;
  notes?: string;
}

export interface Integration {
  name: string;
  connected: boolean;
}
export interface Customer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  slackChannelId: string;
  teamsId: string;
  notificationMode: string;
  createdAt: string;
  role: string;
  features: Feature[];
  paymentDetails: Payment;
  integrations: Integration[];
  organization: Organization;
}
