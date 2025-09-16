"use client";
import { useState } from "react";
import { ChevronDown, Filter } from "lucide-react";
import DatePicker from "./date-picker";
import { FilterDropdownProps } from "../types/dashboard";

const FilterDropdown = ({
  label,
  value,
  options = [],
  isDatePicker = false,
  onDateChange,
  onChange,
}: FilterDropdownProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedValue, setSelectedValue] = useState(value);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    if (onDateChange) {
      onDateChange(date);
    }
  };

  const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const hasFilterIcon =
    label === "Client Filter" ||
    label === "Campaign Filter" ||
    label === "Company Filter";

  // if (isDatePicker) {
  //   return (
  //     <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
  //       <div className="relative">
  //         <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
  //           {hasFilterIcon && <Filter className="h-4 w-4 text-gray-500" />}
  //           {label}
  //         </label>
  //         <DatePicker
  //           selected={selectedDate}
  //           onChange={handleDateChange}
  //           placeholderText="Select date"
  //         />
  //       </div>
  //     </div>
  //   );
  // }

  const selectId = `filter-dropdown-${
    label?.toString().replace(/\s+/g, "-").toLowerCase() || "select"
  }`;

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
      <div className="relative">
        <label
          htmlFor={selectId}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
        >
          {hasFilterIcon && <Filter className="h-4 w-4 text-gray-500" />}
          {label}
        </label>
        <div className="relative">
          <select
            id={selectId}
            value={selectedValue}
            onChange={handleSelectChange}
            className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 text-sm
                       focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-800 appearance-none"
          >
            <option value={value}>{value}</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default FilterDropdown;
