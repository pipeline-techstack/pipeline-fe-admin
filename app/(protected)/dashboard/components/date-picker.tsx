"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { DateRangePicker as ReactDateRangePicker, Range } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Calendar } from "lucide-react";
import { DashboardFilters } from "./filters-section";

interface DateRangePickerProps {
  filters: DashboardFilters;
  show: boolean;
  onToggle: () => void;
  onChange: (dateRange: { start: string; end: string }) => void;
  children?: ReactNode;
}

export default function DateRangePicker({
  filters,
  show,
  onToggle,
  onChange,
}: DateRangePickerProps) {
  const inputRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

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

  // Calculate dropdown position when showing
  useEffect(() => {
    if (show && inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      setDropdownPosition({
        top: rect.bottom + scrollTop + 8, // 8px gap
        left: rect.left,
      });
    }
  }, [show]);

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
      const target = event.target as Node;
      if (
        inputRef.current &&
        !inputRef.current.contains(target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
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
    <>
      <div className="relative w-full">
        <span className="block font-medium text-gray-700 text-sm mb-1">
          Select Date Range:
        </span>

        {/* Input container */}
        <div
          ref={inputRef}
          className="flex items-center justify-between bg-white px-3 py-[10px] border border-gray-300 hover:border-gray-400 rounded-md min-w-[240px] text-sm cursor-pointer"
          onClick={onToggle}
        >
          <span className="text-gray-900">
            {filters.dateRange.start || "Start"} – {filters.dateRange.end || "End"}
          </span>
          <Calendar className="w-4 h-4 text-gray-500 ml-2" />
        </div>
      </div>

      {/* Portal-style dropdown positioned absolutely */}
      {show && (
        <div
          ref={dropdownRef}
          className="fixed z-50 bg-white shadow-lg border border-gray-200 rounded-lg"
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
          }}
        >
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
    </>
  );
}
