"use client";

import { RevopsTableTypes } from "@/lib/types/revops-table-types";
import React from "react";
import SectionCard from "./Card";
import { DataTable } from "@/components/common/table/data-table";
import { Button } from "@/components/ui/button";

function RevopsTable({
  title,
  subtitle,
  icon,
  data,
  handleViewMore,
  columns,
  loading,
}: RevopsTableTypes) {
  return (
    <div className="flex flex-col gap-5">
      {/* Workbooks */}
      <SectionCard title={title} subtitle={subtitle} icon={icon}>
        <div className="border border-gray-100 rounded-lg overflow-hidden">
          <DataTable data={data?.slice(0, 5) ?? []} columns={columns} loading={loading} />
        </div>
        <div className="flex justify-end mt-3">
          <Button
            variant={"ghost"}
            onClick={handleViewMore}
            className="text-muted-foreground hover:text-primary text-sm"
          >
            View More →
          </Button>
        </div>
      </SectionCard>

      {/* Campbook */}
      {/* <SectionCard
          title="Campbook"
          subtitle="Map workbooks to campaigns."
          icon={<Layers className="w-4 h-4" />}
        >
          <div className="border border-gray-100 rounded-lg overflow-hidden">
            <DataTable data={customer.wbConfigs.slice(0, 5)} columns={wbConfigColumns} />
          </div>
          <div className="flex justify-end mt-3">
            <Button
              variant={"ghost"}
              onClick={() =>
                router.push(`/customers/new/${customer._id}/revops/campbooks?name=${customer.name}&email=${customer.email}`)
              }
              className="text-muted-foreground hover:text-primary text-sm"
            >
              View More →
            </Button>
          </div>
        </SectionCard> */}

      {/* Enrichments */}
      {/* <SectionCard
          title="Enrichments"
          subtitle="Prompt and config-driven enrichments."
          icon={<Zap className="w-4 h-4" />}
        >
          <div className="border border-gray-100 rounded-lg overflow-hidden">
            <DataTable
              data={customer.enrichments.slice(0, 5)}
              columns={enrichmentColumns}
            />
          </div>
          <div className="flex justify-end mt-3">
            <Button
              variant={"ghost"}
              onClick={() =>
                router.push(`/customers/new/${customer._id}/revops/enrichments?name=${customer.name}&email=${customer.email}`)
              }
                className="text-muted-foreground hover:text-primary text-sm"
            >
              View More →
            </Button>
          </div>
        </SectionCard> */}
    </div>
  );
}

export default RevopsTable;

{
  /* <SectionCard
        title="Workbooks"
        subtitle="Review owners and workbook operating costs."
        icon={<BookOpen className="w-4 h-4" />}
      >
        <div className="border border-gray-100 rounded-lg overflow-hidden">
          <DataTable data={customer.workbooks.slice(0, 5)} columns={workbookColumns} />
        </div>
        <div className="flex justify-end mt-3">
          <Button
            variant={"ghost"}
            onClick={() =>
              router.push(`/customers/new/${customer._id}/revops/workbooks?name=${customer.name}&email=${customer.email}`)
            }
            className="text-muted-foreground hover:text-primary text-sm"
          >
            View More →
          </Button>
        </div>
      </SectionCard> */
}
