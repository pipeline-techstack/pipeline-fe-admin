"use client";
import FilterDropdown from "./filter-dropdown";

interface FiltersSectionProps {
  selectedDate: Date;
  filters: {
    client: string;
    campaign: string;
    company: string;
  };
  onDateChange: (date: Date) => void;
  onFilterChange: (filterType: string, value: string) => void;
}

const FiltersSection = ({
  selectedDate,
  filters,
  onDateChange,
  onFilterChange
}: FiltersSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
      <FilterDropdown 
        label="Date" 
        value="Select Date" 
        isDatePicker={true}
        onDateChange={onDateChange}
      />
      <FilterDropdown 
        label="Client Filter" 
        value={filters.client} 
        options={['All Clients', 'Tech Solutions Inc', 'Global Marketing Co', 'Enterprise Corp']}
        onChange={(value) => onFilterChange('client', value)}
      />
      <FilterDropdown 
        label="Campaign Filter" 
        value={filters.campaign} 
        options={['All Campaigns', 'Q1 Outreach Campaign', 'Lead Generation Drive', 'Enterprise Outbound']}
        onChange={(value) => onFilterChange('campaign', value)}
      />
      <FilterDropdown 
        label="Company Filter" 
        value={filters.company} 
        options={['All Companies', 'Pipeline AI', 'Partner Companies']}
        onChange={(value) => onFilterChange('company', value)}
      />
      
      {/* Threshold Card */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex flex-col justify-center">
        <div className="text-sm font-medium text-gray-700 mb-2">Threshold</div>
        <div className="text-lg font-semibold text-gray-900">90% SLA</div>
      </div>
    </div>
  );
};

export default FiltersSection;