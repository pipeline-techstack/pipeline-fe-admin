import React from "react";
import { MetricCard } from "./metric-card";
import { Check, MessageCircle, Send, ThumbsUp } from "lucide-react";
import { Performance } from "@/lib/types/senders";
import { formatNumber } from "@/lib/utils";

const Metrics = ({ summary }: { summary?: Performance }) => {
  const safePercent = (num: number, denom: number) => {
    if (!denom || denom === 0) return 0;
    return ((num / denom) * 100).toFixed(1);
  };

  if (!summary) return null;

  const { sent, accepted, reply, interested } = summary;

  // 🔹 Derived metrics
  const acceptedRate = safePercent(accepted, sent);
  const replyRate = safePercent(reply, accepted);
  const interestedRate = safePercent(interested, reply);

  return (
    <div className="gap-4 grid grid-cols-1 md:grid-cols-4 mt-1 mb-3">
      <MetricCard
        title="Connections Sent"
        value={formatNumber(sent)}
        icon={<Send size={18} />}
      />

      <MetricCard
        title="Accepted"
        value={`${acceptedRate}%`}
        icon={<Check size={18} />}
      />

      <MetricCard
        title="Reply Rate"
        value={`${replyRate}%`}
        icon={<MessageCircle size={18} />}
      />

      <MetricCard
        title="Interested"
        value={interestedRate + "%"}
        icon={<ThumbsUp size={18} />}
      />
    </div>
  );
};

export default Metrics;
