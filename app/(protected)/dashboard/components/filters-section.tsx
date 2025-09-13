"use client";
import { useQuery } from "@tanstack/react-query";
import { getOrganizations } from "@/services/org-apis";
import { useHeyreach } from "@/hooks/use-heyreach";
import MultiSelect from "@/components/multi-select";
import DateRangePicker from "./date-picker";
import { useState } from "react";
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

  console.log("orgsData", orgsData.data);
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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
        <label className="text-sm font-medium text-gray-700 mb-1">Client Filter</label>
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
        <label className="text-sm font-medium text-gray-700 mb-1">Campaign Filter</label>
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
        <label className="text-sm font-medium text-gray-700 mb-1">Threshold</label>
        <div className="flex items-center justify-start h-10 px-3 bg-white border border-gray-300 rounded-md">
          <span className="text-sm font-semibold text-gray-900">90% SLA</span>
        </div>
      </div>
    </div>
  );
};

export default FiltersSection;