"use client";
import { FeedbackFilters as FeedbackFiltersType } from "../types/feedback";
import FeedbackSearch from "./feedback-search";
import FilterButton from "./filter-button";

interface FeedbackFiltersProps {
  filters: FeedbackFiltersType;
  searchQuery: string;
  onFilterChange: (filterType: keyof FeedbackFiltersType, value: any) => void;
  onSearchChange: (query: string) => void;
}

const FeedbackFilters = ({ 
  filters, 
  searchQuery, 
  onFilterChange, 
  onSearchChange 
}: FeedbackFiltersProps) => {
  const filterTabs = [
    { key: 'all', label: 'Feedback Follow-up' },
    { key: 'responded', label: 'Responded' },
    { key: 'sent', label: 'Sent' }
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
      {/* Filter Tabs */}
<div className="grid grid-cols-3 gap-1 bg-white rounded-lg p-1 border border-gray-200">
  {filterTabs.map((tab) => (
    <button
      key={tab.key}
      onClick={() => onFilterChange('status', tab.key)}
      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors text-center whitespace-nowrap
        ${filters.status === tab.key
          ? 'bg-[#4A5BAA] text-white'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`}
    >
      {tab.label}
    </button>
  ))}
</div>

{/* Search and Filter */}
      <div className="flex items-center gap-2">
        <FeedbackSearch 
          value={searchQuery}
          onChange={onSearchChange}
        />
        <FilterButton
  filter={{
    campaign: filters.campaign ?? false,
    dateOfMeeting: filters.dateOfMeeting ?? false,
    dateOfMeetingRange: filters.dateOfMeetingRange,
    selectedCampaigns: filters.selectedCampaigns,
    status: filters.status ?? "all",
    responded: filters.responded ?? false,
    sent: filters.sent ?? false,
  }}
        setFilter={(updatedFilter) => {
            Object.entries(updatedFilter).forEach(([key, value]) => {
            onFilterChange(key as keyof FeedbackFiltersType, value);
            });
        }}
        />
      </div>
    </div>
  );
};

export default FeedbackFilters;