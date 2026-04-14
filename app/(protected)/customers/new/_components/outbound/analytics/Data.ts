import { Campaign, ChartMetric } from "./types";

export const CAMPAIGNS: Campaign[] = [
  {
    id: "vip-jets",
    name: "VIP Jets",
    color: "#2563EB",
    metrics: { connectionSent: 180, connectionAccepted: 82, replies: 38, interested: 14 },
  },
  {
    id: "enterprise-sales",
    name: "Enterprise Sales",
    color: "#7C3AED",
    metrics: { connectionSent: 145, connectionAccepted: 70, replies: 32, interested: 12 },
  },
  {
    id: "luxury-travel",
    name: "Luxury Travel",
    color: "#9333EA",
    metrics: { connectionSent: 130, connectionAccepted: 58, replies: 27, interested: 10 },
  },
  {
    id: "tech-startup",
    name: "Tech Startup",
    color: "#A78BFA",
    metrics: { connectionSent: 98, connectionAccepted: 44, replies: 20, interested: 8 },
  },
  {
    id: "healthcare",
    name: "Healthcare",
    color: "#10B981",
    metrics: { connectionSent: 112, connectionAccepted: 52, replies: 24, interested: 9 },
  },
  {
    id: "finance-leads",
    name: "Finance Leads",
    color: "#F59E0B",
    metrics: { connectionSent: 140, connectionAccepted: 64, replies: 30, interested: 11 },
  },
  {
    id: "real-estate",
    name: "Real Estate",
    color: "#EF4444",
    metrics: { connectionSent: 125, connectionAccepted: 57, replies: 26, interested: 10 },
  },
  {
    id: "saas-outreach",
    name: "SaaS Outreach",
    color: "#06B6D4",
    metrics: { connectionSent: 108, connectionAccepted: 49, replies: 23, interested: 9 },
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    color: "#84CC16",
    metrics: { connectionSent: 95, connectionAccepted: 43, replies: 20, interested: 7 },
  },
  {
    id: "consulting",
    name: "Consulting",
    color: "#F97316",
    metrics: { connectionSent: 118, connectionAccepted: 54, replies: 25, interested: 10 },
  },
  {
    id: "legal-firms",
    name: "Legal Firms",
    color: "#38BDF8",
    metrics: { connectionSent: 88, connectionAccepted: 40, replies: 18, interested: 7 },
  },
  {
    id: "education",
    name: "Education",
    color: "#34D399",
    metrics: { connectionSent: 102, connectionAccepted: 46, replies: 22, interested: 8 },
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    color: "#FBBF24",
    metrics: { connectionSent: 90, connectionAccepted: 41, replies: 19, interested: 7 },
  },
  {
    id: "retail-chain",
    name: "Retail Chain",
    color: "#EC4899",
    metrics: { connectionSent: 115, connectionAccepted: 52, replies: 24, interested: 9 },
  },
  {
    id: "media-agency",
    name: "Media Agency",
    color: "#14B8A6",
    metrics: { connectionSent: 78, connectionAccepted: 36, replies: 17, interested: 6 },
  },
  {
    id: "logistics",
    name: "Logistics",
    color: "#8B5CF6",
    metrics: { connectionSent: 85, connectionAccepted: 38, replies: 18, interested: 7 },
  },
  {
    id: "hospitality",
    name: "Hospitality",
    color: "#FB923C",
    metrics: { connectionSent: 92, connectionAccepted: 42, replies: 19, interested: 7 },
  },
  {
    id: "insurance",
    name: "Insurance",
    color: "#60A5FA",
    metrics: { connectionSent: 82, connectionAccepted: 37, replies: 17, interested: 6 },
  },
  {
    id: "pharma",
    name: "Pharma",
    color: "#F43F5E",
    metrics: { connectionSent: 75, connectionAccepted: 34, replies: 16, interested: 6 },
  },
  {
    id: "energy-sector",
    name: "Energy Sector",
    color: "#22C55E",
    metrics: { connectionSent: 66, connectionAccepted: 25, replies: 12, interested: 5 },
  },
];

export const CHART_METRICS: ChartMetric[] = [
  { key: "connectionSent", label: "Sent" },
  { key: "connectionAccepted", label: "Connection Accepted" },
  { key: "replies", label: "Replies" },
  { key: "interested", label: "Interested" },
];

/** Compute aggregate KPI totals from all campaigns */
export function computeKpis(campaigns: Campaign[]) {
  const totalSent = campaigns.reduce((s, c) => s + c.metrics.connectionSent, 0);
  const totalAccepted = campaigns.reduce((s, c) => s + c.metrics.connectionAccepted, 0);
  const totalReplies = campaigns.reduce((s, c) => s + c.metrics.replies, 0);
  const totalInterested = campaigns.reduce((s, c) => s + c.metrics.interested, 0);
  const replyRate = totalSent > 0 ? ((totalReplies / totalSent) * 100).toFixed(1) + "%" : "0%";

  return { totalSent, totalAccepted, replyRate, totalInterested };
}