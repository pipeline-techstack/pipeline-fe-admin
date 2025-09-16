"use client";
import { useQuery } from "@tanstack/react-query";
import { getOrganizations } from "@/services/org-apis";
import { useHeyreach } from "@/hooks/use-heyreach";
import MultiSelect from "@/components/multi-select";
import DateRangePicker from "./date-picker";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

export interface DashboardFilters {
  client: string[];
  campaign: string[];
  dateRange: {
    start: string;
    end: string;
  };
}

interface FiltersSectionProps {
  selectedDate: Date;
  filters: DashboardFilters;
  onDateChange: (date: Date) => void;
  onFilterChange: (filterType: keyof DashboardFilters, value: any) => void;
}

const FiltersSection = ({
  selectedDate,
  filters,
  onDateChange,
  onFilterChange,
}: FiltersSectionProps) => {
  // Clients
  const {
    data: orgsData = [],
    isLoading: orgsLoading,
  } = useQuery({
    queryKey: ["organizations"],
    queryFn: getOrganizations,
    retry: false,
  });

  const clientOptions =
    orgsData?.data?.map((org: any) => ({
      id: org._id?.toString(),
      name: org.name,
    })) ?? [];

  // Campaigns
  const { campaignsQuery } = useHeyreach({ enableCampaigns: true });
  const { data: campaigns = [], isLoading: campaignsLoading } = campaignsQuery;

  const campaignOptions =
    campaigns?.map((c: any) => ({
      id: c.id?.toString(),
      name: c.name,
    })) ?? [];

  const [calendarOpen, setCalendarOpen] = useState(false);

  // 🟢 Set default date range (today - 6 days → today)
  useEffect(() => {
    if (!filters.dateRange.start || !filters.dateRange.end) {
      const today = new Date();
      const pastDate = new Date();
      pastDate.setDate(today.getDate() - 6);

      const formatDate = (d: Date) =>
        d.toISOString().split("T")[0]; // YYYY-MM-DD

      onFilterChange("dateRange", {
        start: formatDate(pastDate),
        end: formatDate(today),
      });
    }
  }, [filters.dateRange, onFilterChange]);

  return (
    <div className="gap-4 grid grid-cols-1 md:grid-cols-4 mb-6">
      {/* Date Range Filter */}
      <DateRangePicker
        filters={filters}
        show={calendarOpen}
        onToggle={() => setCalendarOpen((prev) => !prev)}
        onChange={(dateRange) => {
          onFilterChange("dateRange", dateRange);
          setCalendarOpen(false);
        }}
      >
        <Button variant="secondary" onClick={() => setCalendarOpen(true)}>
          <Calendar className="w-4 h-4" />
        </Button>
      </DateRangePicker>

      {/* Client Filter */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium text-gray-700 text-sm">Client Filter</label>
        <MultiSelect
          value={filters.client}
          onChange={(val) => onFilterChange("client", val)}
          options={clientOptions}
          placeholder="Select Clients..."
          isLoading={orgsLoading}
        />
      </div>

      {/* Campaign Filter */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium text-gray-700 text-sm">Campaign Filter</label>
        <MultiSelect
          value={filters.campaign}
          onChange={(val) => onFilterChange("campaign", val)}
          options={campaignOptions}
          placeholder="Select Campaigns..."
          isLoading={campaignsLoading}
        />
      </div>

      {/* Threshold */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium text-gray-700 text-sm">Threshold</label>
        <div className="flex justify-start items-center bg-white px-3 border border-gray-300 rounded-md h-10">
          <span className="font-semibold text-gray-900 text-sm">90% SLA</span>
        </div>
      </div>
    </div>
  );
};

export default FiltersSection;
