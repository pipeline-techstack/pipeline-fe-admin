import React from "react";
import { MetricCard } from "./metric-card";
import { Check, MessageCircle, Send, ThumbsUp } from "lucide-react";

const Metrics = () => {
  return (
    <div className="gap-4 grid grid-cols-1 md:grid-cols-4 mt-1 mb-3">
      <MetricCard
        title="Connection Sent"
        value="1,247"
        icon={<Send size={18} />}
      />
      <MetricCard title="Accepted" value="35%" icon={<Check size={18} />} />
      <MetricCard
        title="Reply Rate"
        value="13%"
        icon={<MessageCircle size={18} />}
      />
      <MetricCard
        title="Interested"
        value="341"
        icon={<ThumbsUp size={18} />}
      />
    </div>
  );
};

export default Metrics;
