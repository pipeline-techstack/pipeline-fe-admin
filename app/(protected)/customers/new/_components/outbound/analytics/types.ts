export interface CampaignMetrics {
  connectionSent: number;
  connectionAccepted: number;
  replies: number;
  interested: number;
}

export interface Campaign {
  id: string;
  name: string;
  color: string;
  metrics: CampaignMetrics;
}

export interface KpiCardData {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}

export interface ChartMetric {
  key: keyof CampaignMetrics;
  label: string;
}

export interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  campaignName: string;
  value: number;
  percent: number;
  metricLabel: string;
  color: string;
}