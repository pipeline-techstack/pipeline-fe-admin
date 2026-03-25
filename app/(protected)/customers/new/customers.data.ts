import { Customer } from "@/lib/types/customer-types";


export const CUSTOMER_DATA: Customer = {
  id: "cust-001",
  name: "Ava Johnson",
  email: "ava@acme.com",
  phone: "+1 (415) 555-0182",
  slackChannelId: "SLK-2011",
  teamsId: "TMS-8821",
  notificationMode: "Slack",
  dateAdded: "2025-11-14",
  role: "Owner",
  status: "active",

  features: [
    { id: "feat-1", label: "Credits Pool" },
    { id: "feat-2", label: "Priority Support" },
  ],

  organization: {
    company: "Acme Corp",
    quota: "25k credits",
    seats: 12,
    region: "North America",
    admins: 3,
    status: "active",
  },

  campaigns: [
    { id: "camp-1", role: "Owner", name: "Q1 Enterprise Outreach" },
    { id: "camp-2", role: "Owner", name: "Healthcare Vertical Push" },
  ],

  workbooks: [
    { id: "wb-1", name: "EMEA ICP Expansion", owner: "Maria P." },
  ],

  wbConfigs: [
    { id: "wbc-1", campaign: "Q1 Enterprise Outreach", workbook: "EMEA ICP Expansion" },
  ],

  enrichments: [
    { id: "enr-1", name: "Decision Maker Scoring", type: "Prompt", createdOn: "2026-03-11" },
  ],
};