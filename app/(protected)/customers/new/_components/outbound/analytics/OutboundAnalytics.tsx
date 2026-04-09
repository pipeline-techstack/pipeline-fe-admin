"use client";

import React, { useMemo, useState } from "react";
import { Users, Send, MessageCircle, ThumbsUp } from "lucide-react";
import KpiCard from "./KpiCard";
import CampaignFilter from "./CampaignFilters";
import EffortOutcomeChart from "./Graph";
import { CAMPAIGNS, CHART_METRICS, computeKpis } from "./Data";
import { Campaign, KpiCardData } from "./types";

/**
 * OutboundAnalytics
 *
 * Props: pass `campaigns` to override dummy data (for API integration).
 * All internal logic derives from the campaigns array automatically.
 */
interface OutboundAnalyticsProps {
  campaigns?: Campaign[];
}

const OutboundAnalytics: React.FC<OutboundAnalyticsProps> = ({
  campaigns = CAMPAIGNS,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(
    campaigns.map((c) => c.id)
  );

  const kpis = useMemo(() => computeKpis(campaigns), [campaigns]);

  const kpiCards: KpiCardData[] = [
    {
      label: "Connection Accepted",
      value: kpis.totalAccepted.toLocaleString(),
      icon: <Users className="w-5 h-5" />,
    },
    {
      label: "Sent",
      value: kpis.totalSent.toLocaleString(),
      icon: <Send className="w-5 h-5" />,
    },
    {
      label: "Reply Rate",
      value: kpis.replyRate,
      icon: <MessageCircle className="w-5 h-5" />,
    },
    {
      label: "Interested",
      value: kpis.totalInterested.toLocaleString(),
      icon: <ThumbsUp className="w-5 h-5" />,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* KPI Cards */}
      <div className="flex gap-4 flex-wrap">
        {kpiCards.map((card) => (
          <KpiCard key={card.label} card={card} />
        ))}
      </div>

      {/* Effort vs Outcome */}
      <div className="border border-border rounded-xl p-6 shadow-sm">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h3 className="text-base text-secondary-foreground">
              Effort vs Outcome
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              100% distribution across campaigns
            </p>
          </div>
          <CampaignFilter
            campaigns={campaigns}
            selected={selectedIds}
            onChange={setSelectedIds}
          />
        </div>

        {/* Chart */}
        <EffortOutcomeChart
          campaigns={campaigns}
          selectedIds={selectedIds}
          metrics={CHART_METRICS}
        />
      </div>
    </div>
  );
};

export default OutboundAnalytics;