import { Customer } from "@/lib/types/customer-types";

export const CUSTOMER_DATA: Customer = {
  _id: "1",
  name: "Ava Johnson",
  email: "ava@acme.com",
  phone: "+1 (415) 555-0182",
  slackChannelId: "SLK-2011",
  teamsId: "TMS-8821",
  notificationMode: "Slack",
  role: "Admin",
  status: "active",
  integrations: [
    {
      name: "heyreach",
      connected: true,
    },
    {
      name: "salesforce",
      connected: true,
    },
    {
      name: "hubspot",
      connected: false,
    },
  ],
  features: [
    { id: "feat-1", label: "Credits Pool" },
    { id: "feat-2", label: "Priority Support" },
  ],

  paymentDetails: {
    payment_mode: "Credit Card",
    platform: "Stripe",
    payment_terms: "Monthly",
  },
  organization: {
    company: "Acme Corp",
    quota: "25k credits",
    seats: 12,
    region: "North America",
    admins: 3,
    status: "active",
  },

  // campaigns: [
  //   {
  //     id: "367738",
  //     name: "IU - Visharad - Ops Leaders - March",
  //     heyreach_id: 367738,
  //     createdAt: "Jan 19th, 2026",
  //     updatedAt: "Jan 19th, 2026",
  //     status: "Active",
  //   },
  //   {
  //     id: "367739",
  //     name: "SMB Campaign List 4",
  //     heyreach_id: 367738,
  //     createdAt: "Jan 19th, 2026",
  //     updatedAt: "Jan 19th, 2026",
  //     status: "Active",
  //   },
  //   {
  //     id: "367740",
  //     name: "Tech Internal Outreach Campaign",
  //     heyreach_id: 367738,
  //     createdAt: "Jan 19th, 2026",
  //     updatedAt: "Jan 19th, 2026",
  //     status: "Finished",
  //   },
  //   {
  //     id: "367741",
  //     name: "Enterprise Leads - Q1",
  //     heyreach_id: 367738,
  //     createdAt: "Jan 19th, 2026",
  //     updatedAt: "Jan 19th, 2026",
  //     status: "Finished",
  //   },
  //   {
  //     id: "367742",
  //     name: "LinkedIn Automation Batch A",
  //     createdAt: "Jan 19th, 2026",
  //     heyreach_id: 367738,
  //     updatedAt: "Jan 19th, 2026",
  //     status: "Finished",
  //   },
  // ],

  workbooks: [
    {
      _id: "65f1b1b2c3d4e5f678901001",
      name: "EMEA ICP Expansion",
      rows: 10,
    },
    {
      _id: "65f1b1b2c3d4e5f678901002",
      name: "US Enterprise Targeting",
      rows: 300,
    },
    {
      _id: "65f1b1b2c3d4e5f678901003",
      name: "APAC Lead Builder",
      rows: 35,
    },
    {
      _id: "65f1b1b2c3d4e5f678901004",
      name: "Healthcare ICP Filter",
      rows: 35,
    },
    {
      _id: "65f1b1b2c3d4e5f678901005",
      name: "Fintech Decision Makers",
      rows: 35,
    },
    {
      _id: "65f1b1b2c3d4e5f678901006",
      name: "Retail Prospect List",
      rows: 35,
    },
    {
      _id: "65f1b1b2c3d4e5f678901007",
      name: "Startup Founders DB",
      rows: 35,
    },
    {
      _id: "65f1b1b2c3d4e5f678901008",
      name: "Logistics Companies DB",
      rows: 35,
    },
    {
      _id: "65f1b1b2c3d4e5f678901009",
      name: "Manufacturing Leads",
      rows: 35,
    },
    {
      _id: "65f1b1b2c3d4e5f67890100a",
      name: "Education Sector ICP",
      rows: 35,
    },
    {
      _id: "65f1b1b2c3d4e5f67890100b",
      name: "Global Enterprise DB",
      rows: 35,
    },
    {
      _id: "65f1b1b2c3d4e5f678901006",
      name: "Retail Prospect List",
      rows: 500,
    },
    {
      _id: "65f1b1b2c3d4e5f678901007",
      name: "Startup Founders DB",
      rows: 500,
    },
    {
      _id: "65f1b1b2c3d4e5f678901008",
      name: "Logistics Companies DB",
      rows: 500,
    },
    {
      _id: "65f1b1b2c3d4e5f678901009",
      name: "Manufacturing Leads",
      rows: 500,
    },
    {
      _id: "65f1b1b2c3d4e5f67890100a",
      name: "Education Sector ICP",
      rows: 500,
    },
    {
      _id: "65f1b1b2c3d4e5f67890100b",
      name: "Global Enterprise DB",
      rows: 500,
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
