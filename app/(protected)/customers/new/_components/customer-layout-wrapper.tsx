"use client";
import React from "react";
import { ChevronLeft } from "lucide-react";
import { Badge } from "./Card";
import PageHeader from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
/* ─────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────── */

export interface CustomerMeta {
  name: string;
  email: string;
  company: string;
  status: "active" | "inactive";
}

export interface TabDef<T extends string = string> {
  id: T;
  label: string;
}

interface CustomerDetailLayoutProps<T extends string> {
  /** Customer identity shown in the fixed header */
  customer: CustomerMeta;
  /** Called when the back chevron is clicked */
  onBack?: () => void;
  /** Tab definitions – drives the tab bar */
  tabs: TabDef<T>[];
  /** Currently active tab id */
  activeTab: T;
  /** Called when a tab is clicked */
  onTabChange: (id: T) => void;
  /** The scrollable content for the active tab */
  children: React.ReactNode;
}

export default function CustomerDetailLayout<T extends string>({
  customer,
  onBack,
  tabs,
  activeTab,
  onTabChange,
  children,
}: CustomerDetailLayoutProps<T>) {
  return (

    <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
      
      {/* <div className="flex items-center gap-3 shrink-0">
        {onBack && (
          <Button
            variant={"ghost"}
            size={"sm"}
            onClick={onBack}
            className="flex gap-2 items-center"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </Button>
        )}
       
      </div> */}

      <div className="flex gap-1 border-b border-gray-200 shrink-0">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => onTabChange(t.id)}
            className={`px-4 py-2 text-sm border-b -mb-px transition-colors ${
              activeTab === t.id
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="h-[calc(100vh-168px)] overflow-y-auto pt-4 pr-1">
        {children}
      </div>
    </div>
  );
}