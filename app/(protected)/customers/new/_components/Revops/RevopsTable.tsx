"use client";

import { RevopsTableTypes } from "@/lib/types/revops-table-types";
import React from "react";

import { DataTable } from "@/components/common/table/data-table";
import { Button } from "@/components/ui/button";
import SectionCard from "../Card";

function RevopsTable({
  title,
  subtitle,
  icon,
  data,
  handleViewMore,
  columns,
  loading,
  onEdit,
  editLabel,
}: RevopsTableTypes & {
  onEdit?: () => void;
  editLabel?: string;
}) {
  return (
    <div className="flex flex-col gap-5">
      <SectionCard
        title={title}
        subtitle={subtitle}
        icon={icon}
        onEdit={onEdit}          
        editLabel={editLabel}    
      >
        <div className="border border-gray-100 rounded-lg overflow-hidden">
          <DataTable
            data={data?.slice(0, 5) ?? []}
            columns={columns}
            loading={loading}
          />
        </div>

        <div className="flex justify-end mt-3">
          <Button
            variant="ghost"
            onClick={handleViewMore}
            className="text-muted-foreground hover:text-primary text-sm"
          >
            View More →
          </Button>
        </div>
      </SectionCard>
    </div>
  );
}

export default RevopsTable;
