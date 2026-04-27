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
  //     <div className="bg-white shadow-sm p-4 border border-gray-200 rounded-lg">
  //       <div className="relative">
  //         <label className="flex items-center gap-2 mb-2 font-medium text-gray-700 text-sm">
  //           {hasFilterIcon && <Filter className="w-4 h-4 text-gray-500" />}
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
    <div className="bg-white shadow-sm p-4 border border-gray-200 rounded-lg">
      <div className="relative">
        <label
          htmlFor={selectId}
          className="flex items-center gap-2 mb-2 font-medium text-gray-700 text-sm"
        >
          {hasFilterIcon && <Filter className="w-4 h-4 text-gray-500" />}
          {label}
        </label>
        <div className="relative">
          <select
            id={selectId}
            value={selectedValue}
            onChange={handleSelectChange}
            className="bg-white px-3 py-2 pr-8 border border-gray-200 focus:border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 w-full text-sm appearance-none"
          >
            <option value={value}>{value}</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown className="top-1/2 right-2 absolute w-4 h-4 text-gray-400 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default FilterDropdown;
