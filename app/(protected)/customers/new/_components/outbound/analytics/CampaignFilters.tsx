"use client";

import React, { useRef, useEffect, useState } from "react";
import { ChevronDown, Check, X } from "lucide-react";
import { Campaign } from "./types";

interface CampaignFilterProps {
  campaigns: Campaign[];
  selected: string[];
  onChange: (ids: string[]) => void;
}

const CampaignFilter: React.FC<CampaignFilterProps> = ({
  campaigns = [],
  selected,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const allSelected = selected?.length === campaigns.length;

  const toggle = (id: string) => {
    if (selected?.includes(id)) {
      // Don't allow deselecting all
      if (selected?.length === 1) return;
      onChange(selected?.filter((s) => s !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  const toggleAll = () => {
    if (allSelected) {
      // Keep at least one selected — select just first
      onChange([campaigns[0].id]);
    } else {
      onChange(campaigns.map((c) => c.id));
    }
  };

  const label = allSelected
    ? `Campaigns (${campaigns.length}/${campaigns.length})`
    : `Campaigns (${selected?.length}/${campaigns.length})`;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-background text-sm text-secondary-foreground hover:bg-muted/50 transition-colors"
      >
        <span>{label}</span>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 z-50 bg-background border border-border rounded-xl shadow-lg w-56 max-h-72 overflow-y-auto py-1">
          {/* Select all row */}
          <button
            onClick={toggleAll}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-muted/50 transition-colors text-secondary-foreground font-medium"
          >
            <span
              className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                allSelected
                  ? "bg-blue-600 border-blue-600"
                  : "border-border"
              }`}
            >
              {allSelected && <Check className="w-3 h-3 text-white" />}
            </span>
            Select All
          </button>

          <div className="h-px bg-border mx-2 my-1" />

          {campaigns.map((campaign) => {
            const isSelected = selected?.includes(campaign.id);
            return (
              <button
                key={campaign.id}
                onClick={() => toggle(campaign.id)}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-muted/50 transition-colors text-secondary-foreground"
              >
                <span
                  className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors`}
                  style={{
                    backgroundColor: isSelected ? campaign.color : "transparent",
                    borderColor: isSelected ? campaign.color : undefined,
                  }}
                >
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </span>
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: campaign.color }}
                />
                <span className="truncate">{campaign.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CampaignFilter;