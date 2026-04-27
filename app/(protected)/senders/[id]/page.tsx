"use client";

import PageWrapper from "@/components/common/page-wrapper";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { useParams } from "next/navigation";
import { useSender } from "@/hooks/use-senders";
import SpinLoader from "@/components/common/spin-loader";
import { useMemo, useState } from "react";
import MultiSelect from "@/components/multi-select";
import { Share, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import DateFilter from "@/components/common/filters/date-filter";
import Metrics from "../_components/metrics";

const INITIAL_FILTERS = {
  start_date: "",
  end_date: "",
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0]?.payload;

    return (
      <div className="bg-white shadow-lg p-3 border rounded-lg text-sm">
        <p className="mb-2 text-gray-800">{label}</p>
        <p className="text-[#4A90E2]">Connections Sent: {data.connectionsSent}</p>
        <p className="text-[#2EC4B6]">Accepted: {data.accepted}</p>
        <p className="text-[#F5A623]">Reply Rate: {data.replyRate}%</p>
        <p className="text-[#27AE60]">Interested: {data.interested}%</p>
      </div>
    );
  }
  return null;
};

const Sender = () => {
  const params = useParams();
  const id = params.id;

  // -------------------------
  // APPLIED FILTERS (API)
  // -------------------------
  const [appliedFilters, setAppliedFilters] = useState(INITIAL_FILTERS);

  // -------------------------
  // LOCAL FILTERS (UI only)
  // -------------------------
  const [localFilters, setLocalFilters] = useState(INITIAL_FILTERS);

  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);

  // -------------------------
  // API ONLY RUNS ON APPLIED FILTERS
  // -------------------------
  const { data, isLoading, error } = useSender(id as string, appliedFilters);

  // -------------------------
  // APPLY FILTERS
  // -------------------------
  const handleApply = () => {
    setAppliedFilters(localFilters);
  };

  // -------------------------
  // CLEAR FILTERS
  // -------------------------
  const handleClear = () => {
    setLocalFilters(INITIAL_FILTERS);
    setAppliedFilters(INITIAL_FILTERS);
    setSelectedCampaigns([]);
  };

  // -------------------------
  // FILTERED CHART DATA
  // -------------------------
  const filteredCampaigns = useMemo(() => {
    if (!data?.campaigns) return [];

    if (selectedCampaigns.length === 0) return data.campaigns;

    return data.campaigns.filter((c: any) =>
      selectedCampaigns.includes(String(c.campaign_id)),
    );
  }, [data?.campaigns, selectedCampaigns]);

  if (isLoading) return <SpinLoader />;
  if (error) return <div>Something went wrong</div>;

  return (
    <PageWrapper
      title={data?.sender?.name || "Sender"}
      subtitle={data?.sender?.company}
      onBack={() => window.history.back()}
      rightComponent={
        <Button
          variant="outline"
          onClick={() => window.open(data?.sender?.linkedin, "_blank")}
        >
          View Profile <Share className="w-4 h-4" />
        </Button>
      }
    >
      {/* METRICS */}
      <Metrics
        summary={{
          sent: data?.metrics.sent,
          accepted: Number(data?.metrics.acceptedRate),
          reply: Number(data?.metrics.replyRate),
          interested: Number(data?.metrics.interested),
        }}
      />

      {/* FILTERS */}
      <div className="space-y-1">
        <span className="block text-secondary-foreground text-sm">
          Campaign Breakdown
        </span>

        <div className="flex items-center gap-2">
          {/* DATE FILTER (LOCAL ONLY) */}
          <DateFilter
            value={localFilters}
            onChange={(range: any) =>
              setLocalFilters((prev) => ({
                ...prev,
                ...range,
              }))
            }
          />

          {/* CAMPAIGNS */}
          <div className="max-w-[300px]">
            <MultiSelect
              value={selectedCampaigns}
              onChange={setSelectedCampaigns}
              options={
                data?.availableCampaigns?.map((c: any) => ({
                  id: String(c.campaign_id),
                  name: c.campaign_name,
                })) || []
              }
              placeholder="Select Campaigns"
            />
          </div>

          {/* APPLY / CLEAR BUTTONS */}
          <div className="flex border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleApply}
              className="hover:bg-green-500/30 rounded-tr-none rounded-br-none"
            >
              <Check className="size-4" />
            </Button>

            <div className="border-r" />

            <Button
              variant="ghost"
              size="icon"
              onClick={handleClear}
              className="hover:bg-red-500/30 rounded-tl-none rounded-bl-none"
            >
              <X className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* CHART */}
      <div className="bg-white shadow-sm mt-4 p-5 border rounded-md">
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredCampaigns}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />

              <Bar dataKey="connectionsSent" fill="#4A90E2" />
              <Bar dataKey="accepted" fill="#2EC4B6" />
              <Bar dataKey="replyRate" fill="#F5A623" />
              <Bar dataKey="interested" fill="#27AE60" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Sender;