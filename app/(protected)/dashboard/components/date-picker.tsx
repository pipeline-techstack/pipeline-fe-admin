"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { DateRangePicker as ReactDateRangePicker, Range } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DashboardFilters } from "./filters-section";

interface DateRangePickerProps {
  filters: DashboardFilters;
  show: boolean;
  onToggle: () => void;
  onChange: (dateRange: { start: string; end: string }) => void;
  children: ReactNode;
}

export default function DateRangePicker({
  filters,
  show,
  onToggle,
  onChange,
  children,
}: DateRangePickerProps) {
  const datePickerRef = useRef<HTMLDivElement>(null);

  // Convert YYYY-MM-DD string to Date
  const parseDate = (str: string) => {
    if (!str) return new Date();
    const [year, month, day] = str.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  // Format Date to YYYY-MM-DD
  const formatDate = (date: Date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
      date.getDate()
    ).padStart(2, "0")}`;

  // State for react-date-range
  const [selectionRange, setSelectionRange] = useState<Range>({
    startDate: parseDate(filters.dateRange.start),
    endDate: parseDate(filters.dateRange.end),
    key: "selection",
  });

  // Sync with external filters
  useEffect(() => {
    setSelectionRange({
      startDate: parseDate(filters.dateRange.start),
      endDate: parseDate(filters.dateRange.end),
      key: "selection",
    });
  }, [filters.dateRange]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        onToggle();
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [show, onToggle]);

  const handleSelect = (ranges: { [key: string]: Range }) => {
    const range = ranges.selection;
    setSelectionRange(range);

    if (range.startDate && range.endDate) {
      onChange({
        start: formatDate(range.startDate),
        end: formatDate(range.endDate),
      });
      onToggle();
    }
  };

  return (
    <div className="relative w-full max-w-md" ref={datePickerRef}>
      <div className="space-y-2">
        <span className="font-medium text-gray-700 text-sm">Select Date Range:</span>

        <div className="flex items-center gap-2 w-full">
          {/* Display current date range */}
          <div
            className="flex flex-1 items-center gap-2 bg-white px-4 py-2 border border-gray-300 hover:border-gray-400 rounded-md min-w-[240px] text-sm transition-colors cursor-pointer"
            onClick={onToggle}
          >
            <span className="whitespace-nowrap">
              {filters.dateRange.start || "Start"} – {filters.dateRange.end || "End"}
            </span>
          </div>
          {children}
        </div>
      </div>

      {show && (
        <div className="top-full left-0 z-20 absolute bg-white shadow-lg mt-2 border border-gray-200 rounded-lg">
          <ReactDateRangePicker
            ranges={[selectionRange]}
            onChange={handleSelect}
            showSelectionPreview
            moveRangeOnFirstSelection={false}
            months={1}
            direction="horizontal"
            className="border-0"
          />
        </div>
      )}
    </div>
  );
}