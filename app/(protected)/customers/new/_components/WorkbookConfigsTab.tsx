"use client";

import { Customer } from "@/lib/types/customer-types";
import SectionCard, { Badge } from "./Card";
import { BookOpen, Copy, DollarSign, Layers, Zap } from "lucide-react";

import { Column } from "@/lib/types/table-types";
import {
  ENRICHMENT_BADGE_MAP,
} from "./customer.constants";
import { DataTable } from "@/components/common/table/data-table";

const placeholder = () => alert("Dialog / action coming soon!");

export function WorkbookConfigsTab({ customer }: { customer: Customer }) {

  /* ─────────────────────────────────────────────────────────────
     COLUMN DEFINITIONS
  ───────────────────────────────────────────────────────────── */

  const workbookColumns: Column<(typeof customer.workbooks)[0]>[] = [
    {
      key: "name",
      header: "Workbook",
      className: "w-1/2 text-gray-800",
    },
    {
      key: "owner",
      header: "Owner",
      className: "w-1/3 text-gray-500",
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      render: (row) => (
        <div className="flex justify-end items-center gap-2">
          <button
            onClick={placeholder}
            className="inline-flex items-center gap-1.5 hover:bg-gray-50 px-2.5 py-1.5 border border-gray-200 hover:border-gray-300 rounded-md text-gray-500 hover:text-gray-800 text-xs transition-all"
          >
            <DollarSign className="w-3 h-3" />
            Cost
          </button>
          <button
            onClick={placeholder}
            className="inline-flex items-center gap-1.5 hover:bg-gray-50 px-2.5 py-1.5 border border-gray-200 hover:border-gray-300 rounded-md text-gray-500 hover:text-gray-800 text-xs transition-all"
          >
            <Copy className="w-3 h-3" />
            Duplicate
          </button>
        </div>
      ),
    },
  ];

  const wbConfigColumns: Column<(typeof customer.wbConfigs)[0]>[] = [
    {
      key: "campaign",
      header: "Campaign",
      className: "w-1/2 text-gray-800",
    },
    {
      key: "workbook",
      header: "Workbook",
      className: "w-1/3 text-gray-500",
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      render: () => (
        <button
          onClick={placeholder}
          className="font-medium text-gray-500 hover:text-gray-800 text-xs transition-colors"
        >
          Edit
        </button>
      ),
    },
  ];

  const enrichmentColumns: Column<(typeof customer.enrichments)[0]>[] = [
    {
      key: "name",
      header: "Enrichment Name",
      className: "w-2/5 text-gray-800",
    },
    {
      key: "type",
      header: "Type",
      className: "w-1/5",
      render: (row) => (
        <Badge
          label={row.type}
          variant={ENRICHMENT_BADGE_MAP[row.type]}
        />
      ),
    },
    {
      key: "createdOn",
      header: "Created On",
      className: "w-1/5 text-gray-500",
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      render: () => (
        <button
          onClick={placeholder}
          className="font-medium text-gray-500 hover:text-gray-800 text-xs transition-colors"
        >
          Edit
        </button>
      ),
    },
  ];


  const workbooks = customer.workbooks.map(wb => ({
    ...wb,
    _id: wb.id,
  }));

  const wbConfigs = customer.wbConfigs.map(cfg => ({
    ...cfg,
    _id: cfg.id,
  }));

  const enrichments = customer.enrichments.map(enr => ({
    ...enr,
    _id: enr.id,
  }));


  /* ─────────────────────────────────────────────────────────────
     UI
  ───────────────────────────────────────────────────────────── */

return (
    <div className="flex flex-col gap-5">

      {/* Workbooks */}
      <SectionCard
        title="Workbooks"
        subtitle="Review owners and workbook operating costs."
        icon={<BookOpen className="w-4 h-4" />}
      >
        <div className="border border-gray-100 rounded-lg overflow-hidden">
          <DataTable
            data={workbooks}
            columns={workbookColumns}
          />
        </div>
      </SectionCard>

      {/* WB Config */}
      <SectionCard
        title="Campbook"
        subtitle="Map workbooks to campaigns."
        icon={<Layers className="w-4 h-4" />}
      >
        <div className="border border-gray-100 rounded-lg overflow-hidden">
          <DataTable
            data={wbConfigs}
            columns={wbConfigColumns}
          />
        </div>
      </SectionCard>

      {/* Enrichments */}
      <SectionCard
        title="Enrichments"
        subtitle="Prompt and config-driven enrichments."
        icon={<Zap className="w-4 h-4" />}
      >
        <div className="border border-gray-100 rounded-lg overflow-hidden">
          <DataTable
            data={enrichments}
            columns={enrichmentColumns}
          />
        </div>
      </SectionCard>

    </div>
  );
}