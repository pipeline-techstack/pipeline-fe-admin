"use client";
import DashboardHeader from "./components/dashboard-header";
import FiltersSection from "./components/filters-section";
import TableTabs from "./components/table-tabs";
import CategoryTabs from "./components/category-tabs";
import DataTable from "./components/data-table";
import { useDashboardFilters, useDashboardNavigation, useDashboardData } from "./hooks/useDashboard";

const DashboardPage = () => {
  // Custom hooks for state management
  const {
    selectedDate,
    filters,
    handleDateChange,
    handleFilterChange
  } = useDashboardFilters();

  const {
    activeTable,
    activeCategory,
    setActiveTable,
    setActiveCategory
  } = useDashboardNavigation();

  const typedActiveTable = activeTable as "performance" | "sla" | "health";
  const typedActiveCategory = activeCategory as "performance" | "sla" | "health";

  const currentTableData = useDashboardData(typedActiveTable, typedActiveCategory, filters);
  console.log("currentTableData", currentTableData)

  return (
    <div className="bg-gray-50 p-6 min-h-screen">
      {/* Header */}
      <DashboardHeader />

      {/* Filters Row */}
      <FiltersSection
        selectedDate={selectedDate}
        filters={filters}
        onDateChange={handleDateChange}
        onFilterChange={handleFilterChange}
      />

      {/* Table Navigation */}
      <div className="mb-6">
        <TableTabs activeTable={activeTable} onTableChange={setActiveTable} />
      </div>

      {/* Category Navigation */}
      <div className="mb-6">
        <CategoryTabs activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      </div>

      {/* Dynamic Table */}
      <div>
        <DataTable
          title={currentTableData.title}
          columns={currentTableData.columns}
          data={currentTableData.data}
        />
      </div>

      {/* Footer */}
      <div className="mt-4 text-gray-500 text-sm">
        Total records: {currentTableData.data.length}
      </div>
    </div>
  );
};

export default DashboardPage;