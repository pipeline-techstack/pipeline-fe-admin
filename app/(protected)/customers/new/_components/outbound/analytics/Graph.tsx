"use client";

import React, { useState, useRef, useCallback } from "react";
import { Campaign, ChartMetric, TooltipState } from "./types";

interface EffortOutcomeChartProps {
  campaigns: Campaign[];
  selectedIds: string[];
  metrics: ChartMetric[];
}

const EffortOutcomeChart: React.FC<EffortOutcomeChartProps> = ({
  campaigns,
  selectedIds,
  metrics,
}) => {
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    x: 0,
    y: 0,
    campaignName: "",
    value: 0,
    percent: 0,
    metricLabel: "",
    color: "",
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const getSegments = useCallback(
    (metricKey: ChartMetric["key"]) => {
      const totalAll = campaigns.reduce(
        (sum, c) => sum + c.metrics[metricKey],
        0
      );
      const selected = campaigns.filter((c) => selectedIds.includes(c.id));
      const selectedTotal = selected.reduce(
        (sum, c) => sum + c.metrics[metricKey],
        0
      );

      return selected.map((c) => {
        const value = c.metrics[metricKey];
        const widthPct = selectedTotal > 0 ? (value / selectedTotal) * 100 : 0;
        const realPct = totalAll > 0 ? (value / totalAll) * 100 : 0;
        return { campaign: c, value, widthPct, realPct };
      });
    },
    [campaigns, selectedIds]
  );

  const handleMouseEnter = (
    e: React.MouseEvent,
    campaignName: string,
    value: number,
    percent: number,
    metricLabel: string,
    color: string
  ) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltip({
      visible: true,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      campaignName,
      value,
      percent,
      metricLabel,
      color,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!tooltip.visible) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltip((t) => ({
      ...t,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }));
  };

  const handleMouseLeave = () => {
    setTooltip((t) => ({ ...t, visible: false }));
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      onMouseMove={handleMouseMove}
    >
      {/* Chart rows */}
      <div className="flex flex-col gap-5">
        {metrics.map((metric) => {
          const segments = getSegments(metric.key);
          return (
            <div key={metric.key} className="flex items-center gap-4">
              {/* Label */}
              <div className="w-40 flex-shrink-0 text-left  ">
                <span className="text-sm  text-secondary-foreground leading-tight">
                  {metric.label}
                </span>
              </div>

              {/* Bar */}
              <div className="flex-1 h-9 rounded-lg overflow-hidden flex">
                {segments.map(({ campaign, value, widthPct, realPct }, i) => (
                  <div
                    key={campaign.id}
                    className="h-full transition-all duration-300 cursor-pointer relative group"
                    style={{
                      width: `${widthPct}%`,
                      backgroundColor: campaign.color,
                      marginLeft: i === 0 ? 0 : "1px",
                    }}
                    onMouseEnter={(e) =>
                      handleMouseEnter(
                        e,
                        campaign.name,
                        value,
                        realPct,
                        metric.label,
                        campaign.color
                      )
                    }
                    onMouseLeave={handleMouseLeave}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* X-axis labels */}
      <div className="flex ml-44 mt-2">
        {[0, 30, 60, 100].map((v) => (
          <span
            key={v}
            className="text-xs text-muted-foreground"
            style={{
              position: "absolute",
              left: `calc(${v === 0 ? "11rem" : v === 100 ? "calc(100% - 1rem)" : `calc(11rem + ${v}% * ((100% - 11rem) / 100))`})`,
            }}
          >
            {v}%
          </span>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2 ml-44">
        {campaigns.map((c) => {
          const isSelected = selectedIds.includes(c.id);
          return (
            <div
              key={c.id}
              className="flex items-center gap-1.5"
              style={{ opacity: isSelected ? 1 : 0.3 }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: c.color }}
              />
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {c.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="pointer-events-none absolute z-50 rounded-xl border border-border bg-background shadow-xl px-3.5 py-2.5 min-w-[170px]"
          style={{
            left: tooltip.x + 14,
            top: tooltip.y - 60,
            transform: "translateY(-50%)",
          }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: tooltip.color }}
            />
            <span className="text-xs  text-secondary-foreground truncate">
              {tooltip.campaignName}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-0.5">
            {tooltip.metricLabel}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-base  text-secondary-foreground">
              {tooltip.value.toLocaleString()}
            </span>
            <span
              className="text-xs "
              style={{ color: tooltip.color }}
            >
              {tooltip.percent.toFixed(1)}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EffortOutcomeChart;