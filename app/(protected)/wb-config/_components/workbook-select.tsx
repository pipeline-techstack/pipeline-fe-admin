"use client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Workbook } from "../types/api";
import { useEffect, useRef } from "react";

type Props = {
  value: string;
  workbooks: Workbook[];
  onChange: (val: string) => void;
  loadMore: () => void;
  hasMore: boolean;
  loading: boolean;
  onSearch: (val: string) => void;
  prefillName?: string;
};

export const WorkbookSelect = ({
  value,
  workbooks,
  onChange,
  loadMore,
  hasMore,
  loading,
  onSearch,
  prefillName,
}: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const displayName =
    workbooks.find((wb) => wb.id === value)?.name || prefillName || "";

  // Observer for infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      // Find the actual scrollable container within SelectContent
      const scrollableElement = document.querySelector('[data-radix-select-viewport]') as HTMLElement;
      
      if (!scrollableElement) return;      
      if (
        scrollableElement.scrollTop + scrollableElement.clientHeight >=
        scrollableElement.scrollHeight - 20 &&
        hasMore &&
        !loading
      ) {
        console.log("Loading more...");
        loadMore();
      }
    };

    // Use MutationObserver to detect when SelectContent is rendered
    const observer = new MutationObserver(() => {
      const scrollableElement = document.querySelector('[data-radix-select-viewport]');
      if (scrollableElement) {
        scrollableElement.addEventListener('scroll', handleScroll);
      }
    });

    // Start observing
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      // Clean up any existing scroll listeners
      const scrollableElement = document.querySelector('[data-radix-select-viewport]');
      if (scrollableElement) {
        scrollableElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [hasMore, loading, loadMore]);

  return (
    <div>
      <Label className="block mb-2">Workbook Name</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select workbook">{displayName}</SelectValue>
        </SelectTrigger>
        <SelectContent
          className="max-h-72 overflow-y-auto"
          position="popper"
          ref={contentRef}
        >
          {/* Search input */}
          <div className="top-0 z-10 sticky bg-white p-1">
            <Input
              placeholder="Search workbooks..."
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
          {workbooks.map((wb, idx) => (
            <SelectItem key={`${wb.id}-${idx}`} value={wb.id}>
              {wb.name}
            </SelectItem>
          ))}
          {loading && (
            <div className="p-2 text-muted-foreground text-sm">Loading...</div>
          )}
          {!hasMore && workbooks.length > 0 && !loading && (
            <div className="p-2 text-muted-foreground text-sm">
              No more workbooks
            </div>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};