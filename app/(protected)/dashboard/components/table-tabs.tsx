"use client";
import { TableTabsProps } from "../types/dashboard";

const TableTabs = ({ activeTable, onTableChange }: TableTabsProps) => {
  const tabs = [
    { id: 'pipeline', label: 'Pipeline Overview' },
    { id: 'client', label: 'Client KPIs' },
    { id: 'campaign', label: 'Campaign Performance' }
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTableChange(tab.id)}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTable === tab.id
                ? 'border-gray-800 text-gray-800 font-semibold'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TableTabs;