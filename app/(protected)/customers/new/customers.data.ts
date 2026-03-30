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
      _id: "1",
      email: "ops.lead1@company.com",
      campaigns: ["IU - Visharad - Ops Leaders - March"],
      status: "FINISHED",
      totalUsers: 59,
      inProgress: 32,
      pending: 24,
      failed: 3,
      startedAt: "2026-03-18T23:30:20.021324Z",
    },
    {
      _id: "2",
      email: "vivek@techstack.management",
      campaigns: [
        "SMB Campaign List 4",
        "Tech Internal Campaign",
        "Campaign Alpha",
        "Campaign Beta",
      ],
      status: "IN_PROGRESS",
      totalUsers: 120,
      inProgress: 80,
      pending: 30,
      failed: 10,
      startedAt: "2026-03-20T10:15:00Z",
    },
    {
      _id: "3",
      email: "soumali+13@techstack.management",
      campaigns: ["Demo Outreach 1", "Signature Jets V3", "Campaign X"],
      status: "PENDING",
      totalUsers: 45,
      inProgress: 10,
      pending: 30,
      failed: 5,
      startedAt: "2026-03-22T08:45:10Z",
    },
    {
      _id: "4",
      email: "chinmay@techstack.management",
      campaigns: [
        "Internal Testing Campaign",
        "Feature Rollout Campaign",
        "Campaign 1",
        "Campaign 2",
      ],
      status: "FINISHED",
      totalUsers: 75,
      inProgress: 0,
      pending: 0,
      failed: 2,
      startedAt: "2026-03-15T14:20:00Z",
    },
    {
      _id: "5",
      email: "rishabh@addpipeline.ai",
      campaigns: [
        "LinkedIn Marketing Campaign (IT)",
        "Test Campaign",
        ...Array.from({ length: 20 }, (_, i) => `Campaign ${i + 1}`),
      ],
      status: "IN_PROGRESS",
      totalUsers: 200,
      inProgress: 150,
      pending: 40,
      failed: 10,
      startedAt: "2026-03-25T09:00:00Z",
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
