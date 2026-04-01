import { Feature } from "@/lib/types/customer-types";

export const WORKBOOK_COLS = ["Workbook", "Owner", "Actions"] as const;
export const WBCONFIG_COLS = ["Campaign", "Workbook", "Actions"] as const;
export const ENRICHMENT_COLS = ["Enrichment Name", "Type", "Created On", "Actions"] as const;

export const DEFAULT_FEATURES: Feature[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "crm", label: "CRM" },
  { id: "inbox", label: "Inbox" },
  { id: "campaign", label: "Campaign" },
];
