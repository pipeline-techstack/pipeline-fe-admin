import { Customer } from "@/lib/types/customer-types";

export const CUSTOMER_DATA: Customer = {
  _id: "1",
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
    {
      id: "367738",
      name: "IU - Visharad - Ops Leaders - March",
      createdAt: "2026-03-18T23:29:30.251174Z",
      updatedAt: "2026-03-19T10:15:12.120000Z",
    },
    {
      id: "367739",
      name: "SMB Campaign List 4",
      createdAt: "2026-03-20T09:10:11.000000Z",
      updatedAt: "2026-03-21T11:45:00.000000Z",
    },
    {
      id: "367740",
      name: "Tech Internal Outreach Campaign",
      createdAt: "2026-03-21T08:00:00.000000Z",
      updatedAt: "2026-03-22T14:30:45.000000Z",
    },
    {
      id: "367741",
      name: "Enterprise Leads - Q1",
      createdAt: "2026-03-22T12:20:30.000000Z",
      updatedAt: "2026-03-23T16:10:05.000000Z",
    },
    {
      id: "367742",
      name: "LinkedIn Automation Batch A",
      createdAt: "2026-03-23T07:45:00.000000Z",
      updatedAt: "2026-03-24T09:25:30.000000Z",
    },
  ],

  workbooks: [
    {
      _id: "65f1b1b2c3d4e5f678901001",
      name: "EMEA ICP Expansion",
      owner: "Maria P.",
    },
    {
      _id: "65f1b1b2c3d4e5f678901002",
      name: "US Enterprise Targeting",
      owner: "John D.",
    },
    {
      _id: "65f1b1b2c3d4e5f678901003",
      name: "APAC Lead Builder",
      owner: "Aditi S.",
    },
    {
      _id: "65f1b1b2c3d4e5f678901004",
      name: "Healthcare ICP Filter",
      owner: "Rahul K.",
    },
    {
      _id: "65f1b1b2c3d4e5f678901005",
      name: "Fintech Decision Makers",
      owner: "Sneha R.",
    },
    {
      _id: "65f1b1b2c3d4e5f678901006",
      name: "Retail Prospect List",
      owner: "Vikas T.",
    },
    {
      _id: "65f1b1b2c3d4e5f678901007",
      name: "Startup Founders DB",
      owner: "Neha M.",
    },
    {
      _id: "65f1b1b2c3d4e5f678901008",
      name: "Logistics Companies DB",
      owner: "Arjun P.",
    },
    {
      _id: "65f1b1b2c3d4e5f678901009",
      name: "Manufacturing Leads",
      owner: "Kiran J.",
    },
    {
      _id: "65f1b1b2c3d4e5f67890100a",
      name: "Education Sector ICP",
      owner: "Pooja S.",
    },
    {
      _id: "65f1b1b2c3d4e5f67890100b",
      name: "Global Enterprise DB",
      owner: "Aman G.",
    },
    {
      _id: "65f1b1b2c3d4e5f678901006",
      name: "Retail Prospect List",
      owner: "Vikas T.",
    },
    {
      _id: "65f1b1b2c3d4e5f678901007",
      name: "Startup Founders DB",
      owner: "Neha M.",
    },
    {
      _id: "65f1b1b2c3d4e5f678901008",
      name: "Logistics Companies DB",
      owner: "Arjun P.",
    },
    {
      _id: "65f1b1b2c3d4e5f678901009",
      name: "Manufacturing Leads",
      owner: "Kiran J.",
    },
    {
      _id: "65f1b1b2c3d4e5f67890100a",
      name: "Education Sector ICP",
      owner: "Pooja S.",
    },
    {
      _id: "65f1b1b2c3d4e5f67890100b",
      name: "Global Enterprise DB",
      owner: "Aman G.",
    },
  ],

  wbConfigs: [
    {
      _id: "65f1c1b2c3d4e5f678901001",
      campaign: "Q1 Enterprise Outreach",
      workbook: "EMEA ICP Expansion",
    },
    {
      _id: "65f1c1b2c3d4e5f678901002",
      campaign: "Healthcare Vertical Push",
      workbook: "Healthcare ICP Filter",
    },
    {
      _id: "65f1c1b2c3d4e5f678901003",
      campaign: "Fintech Expansion Drive",
      workbook: "Fintech Decision Makers",
    },
    {
      _id: "65f1c1b2c3d4e5f678901004",
      campaign: "APAC Market Entry",
      workbook: "APAC Lead Builder",
    },
    {
      _id: "65f1c1b2c3d4e5f678901005",
      campaign: "Retail Growth Sprint",
      workbook: "Retail Prospect List",
    },
    {
      _id: "65f1c1b2c3d4e5f678901006",
      campaign: "SMB Outreach Campaign",
      workbook: "Startup Founders DB",
    },
    {
      _id: "65f1c1b2c3d4e5f678901007",
      campaign: "B2B SaaS Expansion",
      workbook: "Global Enterprise DB",
    },
    {
      _id: "65f1c1b2c3d4e5f678901008",
      campaign: "Logistics Industry Push",
      workbook: "Logistics Companies DB",
    },
    {
      _id: "65f1c1b2c3d4e5f678901009",
      campaign: "Manufacturing Leads Gen",
      workbook: "Manufacturing Leads",
    },
    {
      _id: "65f1c1b2c3d4e5f67890100a",
      campaign: "Startup Acquisition Drive",
      workbook: "Startup Founders DB",
    },
    {
      _id: "65f1c1b2c3d4e5f67890100b",
      campaign: "Education Sector Outreach",
      workbook: "Education Sector ICP",
    },
  ],

  enrichments: [
    {
      _id: "65f1d1b2c3d4e5f678901001",
      name: "Decision Maker Scoring",
      type: "Leads",
      createdOn: "2026-03-11",
    },
    {
      _id: "65f1d1b2c3d4e5f678901002",
      name: "Email Verification",
      type: "Leads",
      createdOn: "2026-03-12",
    },
    {
      _id: "65f1d1b2c3d4e5f678901003",
      name: "LinkedIn Scraper",
      type: "Exploratory",
      createdOn: "2026-03-13",
    },
    {
      _id: "65f1d1b2c3d4e5f678901004",
      name: "Company Size Detection",
      type: "Accounts",
      createdOn: "2026-03-14",
    },
    {
      _id: "65f1d1b2c3d4e5f678901005",
      name: "Industry Classification",
      type: "Accounts",
      createdOn: "2026-03-15",
    },
    {
      _id: "65f1d1b2c3d4e5f678901006",
      name: "Revenue Estimation",
      type: "Accounts",
      createdOn: "2026-03-16",
    },
    {
      _id: "65f1d1b2c3d4e5f678901007",
      name: "Contact Enrichment",
      type: "Leads",
      createdOn: "2026-03-17",
    },
    {
      _id: "65f1d1b2c3d4e5f678901008",
      name: "Tech Stack Detection",
      type: "Exploratory",
      createdOn: "2026-03-18",
    },
    {
      _id: "65f1d1b2c3d4e5f678901009",
      name: "Lead Scoring AI",
      type: "Leads",
      createdOn: "2026-03-19",
    },
    {
      _id: "65f1d1b2c3d4e5f67890100a",
      name: "Intent Signal Tracker",
      type: "Exploratory",
      createdOn: "2026-03-20",
    },
    {
      _id: "65f1d1b2c3d4e5f67890100b",
      name: "Custom Prompt Builder",
      type: "Exploratory",
      createdOn: "2026-03-21",
    },
  ],
};
