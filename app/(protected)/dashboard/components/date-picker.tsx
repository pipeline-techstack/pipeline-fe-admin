"use client";

import { useState, useEffect, ReactNode } from "react";
import {
  DateRangePicker as ReactDateRangePicker,
  Range,
} from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Calendar } from "lucide-react";
import { DashboardFilters } from "./filters-section";

import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
} from "@floating-ui/react";

interface DateRangePickerProps {
  filters: DashboardFilters;
  show: boolean;
  onToggle: () => void;
  onChange: (dateRange: { start: string; end: string }) => void;
  children?: ReactNode;
  label?: string;
}

export default function DateRangePicker({
  filters,
  show,
  onToggle,
  onChange,
  label = "Select data range",
}: DateRangePickerProps) {
  // -----------------------------
  // Floating UI setup (POPUP logic)
  // -----------------------------
  const { refs, floatingStyles, update } = useFloating({
    placement: "bottom-start",
    middleware: [offset(8), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  // -----------------------------
  // Date utils
  // -----------------------------
  const parseDate = (str: string) => {
    if (!str) return new Date();
    const [year, month, day] = str.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const formatDate = (date: Date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
      date.getDate()
    ).padStart(2, "0")}`;

  // -----------------------------
  // Local selection state
  // -----------------------------
  const [selectionRange, setSelectionRange] = useState<Range>({
    startDate: parseDate(filters.dateRange.start),
    endDate: parseDate(filters.dateRange.end),
    key: "selection",
  });

  // Sync external filters → internal state
  useEffect(() => {
    setSelectionRange({
      startDate: parseDate(filters.dateRange.start),
      endDate: parseDate(filters.dateRange.end),
      key: "selection",
    });
  }, [filters.dateRange]);

  // Force reposition when opening
  useEffect(() => {
    if (show) {
      update();
    }
  }, [show, update]);

  // -----------------------------
  // Selection handler
  // -----------------------------
  const handleSelect = (ranges: { [key: string]: Range }) => {
    const range = ranges.selection;
    setSelectionRange(range);

    if (range.startDate && range.endDate) {
      onChange({
        start: formatDate(range.startDate),
        end: formatDate(range.endDate),
      });

      onToggle(); // close after selection
    }
  };

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <>
      {/* Trigger */}
      <div className="relative w-[250px]">
        {label && (
          <span className="block mb-1 font-medium text-gray-700 text-sm">
            {label}
          </span>
        )}

        <div
          ref={refs.setReference}
          className="flex justify-between items-center bg-white px-3 border border-gray-200 rounded-md h-10 text-sm cursor-pointer"
          onClick={onToggle}
        >
          <span className="text-muted-foreground">
            {filters.dateRange.start || "Start"} –{" "}
            {filters.dateRange.end || "End"}
          </span>

          <Calendar className="ml-2 w-4 h-4 text-gray-500" />
        </div>
      </div>

      {/* Popover */}
      {show && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className="z-50 bg-white shadow-lg border border-gray-200 rounded-lg"
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