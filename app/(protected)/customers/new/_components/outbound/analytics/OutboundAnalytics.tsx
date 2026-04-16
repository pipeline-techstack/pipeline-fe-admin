"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Users, Send, MessageCircle, ThumbsUp } from "lucide-react";
import KpiCard from "./KpiCard";
import CampaignFilter from "./CampaignFilters";
import EffortOutcomeChart from "./Graph";
import { CHART_METRICS, computeKpis } from "./Data";
import { Campaign, KpiCardData } from "./types";
import SpinLoader from "@/components/common/spin-loader";
import ErrorState from "@/components/common/error";

interface OutboundAnalyticsProps {
  campaigns?: Campaign[];
  loading?: boolean;
  error?: Error | null;
}

const OutboundAnalytics: React.FC<OutboundAnalyticsProps> = ({
  campaigns,
  loading = false,
  error = null,
}) => {

  const [selectedIds, setSelectedIds] = useState<string[]>();
  useEffect(() => {
    if (campaigns && campaigns.length > 0) {
      setSelectedIds(campaigns.map((c) => c.id));
    }
  }, [campaigns]);
  const kpis = useMemo(() => computeKpis(campaigns), [campaigns]);

  const kpiCards: KpiCardData[] = [
    {
      label: "Sent",
      value: kpis.totalSent.toLocaleString(),
      icon: <Send className="w-5 h-5" />,
    },
    {
      label: "Accepted",
      value: kpis.totalAccepted.toLocaleString(),
      icon: <Users className="w-5 h-5" />,
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

  if (loading) return <SpinLoader />;
  if (error) return <ErrorState message={error.message} />;

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
