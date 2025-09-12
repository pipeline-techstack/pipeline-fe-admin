import { useState, useMemo } from "react";
import { categoryConfigurations, dashboardData } from "../components/dashboard-data";

export const useDashboardFilters = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filters, setFilters] = useState({
    client: 'All Clients',
    campaign: 'All Campaigns',
    company: 'All Companies'
  });

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    console.log('Selected date:', date);
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    console.log(`${filterType} filter changed to:`, value);
  };

  return {
    selectedDate,
    filters,
    handleDateChange,
    handleFilterChange
  };
};

export const useDashboardNavigation = () => {
  const [activeTable, setActiveTable] = useState('pipeline');
  const [activeCategory, setActiveCategory] = useState('performance');

  return {
    activeTable,
    activeCategory,
    setActiveTable,
    setActiveCategory
  };
};

type DashboardTableKey = keyof typeof dashboardData;

type CategoryKey = keyof typeof categoryConfigurations;

export const useDashboardData = (
  activeTable: string,
  activeCategory: CategoryKey
) => {
  const currentTableData = useMemo(() => {
    const tableKey: DashboardTableKey = (['pipeline', 'client', 'campaign'].includes(activeTable) ? activeTable : 'pipeline') as DashboardTableKey;
    const data = dashboardData[tableKey];
    const category = categoryConfigurations[activeCategory] || categoryConfigurations.performance;

    return {
      data,
      columns: category.columns,
      title: `${category.name} - ${tableKey.charAt(0).toUpperCase() + tableKey.slice(1)} Level`
    };
  }, [activeTable, activeCategory]);

  return currentTableData;
};