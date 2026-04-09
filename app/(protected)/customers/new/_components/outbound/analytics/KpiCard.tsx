import React from "react";
import { KpiCardData } from "./types";

interface KpiCardProps {
  card: KpiCardData;
}

const KpiCard: React.FC<KpiCardProps> = ({ card }) => {
  return (
    <div className="flex-1 min-w-0 border border-border rounded-xl p-5 flex flex-col gap-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="text-muted-foreground">{card.icon}</div>
      </div>
      <div>
        <p className="text-3xl text-secondary-foreground tracking-tight font-semibold">
          {card.value}
        </p>
        <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
          {card.label}
        </p>
      </div>
    </div>
  );
};

export default KpiCard;