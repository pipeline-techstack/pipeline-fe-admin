export type CustomerStatus = "active" | "inactive";
export type EnrichmentType = "Prompt" | "Transformer" | "Lookup";
export type CampaignRole = "Owner" | "Viewer" | "Editor";

export interface Feature { id: string; label: string }
export interface CampaignPermission { id: string; role: CampaignRole; name: string }
export interface Workbook { id: string; name: string; owner: string }
export interface WBConfig { id: string; campaign: string; workbook: string }
export interface Enrichment { id: string; name: string; type: EnrichmentType; createdOn: string }

export interface Organization {
  company: string;
  quota: string;
  seats: number;
  region: string;
  admins: number;
  status: CustomerStatus;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  slackChannelId: string;
  teamsId: string;
  notificationMode: string;
  dateAdded: string;
  role: string;
  status: CustomerStatus;
  features: Feature[];
  organization: Organization;
  campaigns: CampaignPermission[];
  workbooks: Workbook[];
  wbConfigs: WBConfig[];
  enrichments: Enrichment[];
}