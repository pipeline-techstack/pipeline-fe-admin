"use client";

import { DollarSign, Eye, Pencil, Share } from "lucide-react";
import { Badge } from "@/app/(protected)/customers/new/_components/Card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Column } from "@/lib/types/table-types";
import { calculatePercentage, formatCurrency } from "@/lib/utils";

export const workbookColumns = (handleCostClick, handleDuplicate) => [
  {
    key: "name",
    header: "Name",
    className: "min-w-[300px] text-secondary-foreground",
  },
  {
    key: "updated_at",
    header: "Updated At",
    className: "min-w-[200px] text-secondary-foreground",
  },
  {
    key: "actions",
    header: "Actions",
    render: (row) => (
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            handleCostClick(row); // ✅ your function
          }}
        >
          <DollarSign className="w-3 h-3" />
          Cost
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            handleDuplicate(row); // ✅ your function
          }}
        >
          <Share className="w-3 h-3" />
          Share
        </Button>
      </div>
    ),
  },
];

export const campbookColumns = (onEditCampbook) => [
  {
    key: "campaign",
    header: "Campaign",
    className: "min-w-[250px] text-secondary-foreground",
  },
  {
    key: "workbooks",
    header: "Workbooks",
    className: "min-w-[300px] text-secondary-foreground",
    render: (row: any) => {
      const list = row.workbooks || [];
      const hidden = list.slice(2);

      return (
        <div className="flex flex-wrap gap-2">
          {list.slice(0, 1).map((wb: string, i: number) => (
            <Badge key={i} label={wb.name} variant="info" />
          ))}

          {hidden.length > 0 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Badge variant="outline" label={`+${hidden.length} more`} />
                  </div>
                </TooltipTrigger>

                <TooltipContent>
                  {hidden.map((wb: string, i: number) => (
                    <div key={i}>{wb.name}</div>
                  ))}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      );
    },
  },
  {
    key: "actions",
    header: "Actions",
    render: (row: any) => (
      <Button
        variant="outline"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          onEditCampbook(row);
        }}
      >
        <Pencil className="w-3 h-3" />
        Edit
      </Button>
    ),
  },
];

export const enrichmentColumns = (onView, onDelete) => [
  {
    key: "name",
    header: "Enrichment Name",
    className: "min-w-[250px] text-secondary-foreground",
  },
  {
    key: "type",
    header: "Type",
    className: "min-w-[150px]",
  },
  {
    key: "created_at",
    header: "Created At",
    className: "min-w-[200px]",
  },
  {
    key: "actions",
    header: "Actions",
    // className:"w-1/4",
    render: (row) => (
      <div>
        <Button variant="outline" size="sm" onClick={() => onView(row)}>
          <Eye className="w-3 h-3" />
          View
        </Button>
      </div>
    ),
  },
];



export const columnBreakdownColumns: Column<any>[] = [
  {
    key: "column_name",
    header: "Column",
    render: (row) => (
      <div>
        <div className="">
          {row.column_name}
        </div>
        <div className="mt-1 text-gray-500 text-xs">
          {row.column_id}
        </div>
      </div>
    ),
  },
  {
    key: "column_type",
    header: "Type",
    render: (row) => (
      <span className="text-sm capitalize">
        {row.column_type.split("_").join(" ")}
      </span>
    ),
  },
  {
    key: "cost",
    header: "Cost (USD)",
    render: (row) => (
      <span className="">
        {formatCurrency(row.cost)}
      </span>
    ),
  },
  {
    key: "percentage",
    header: "% of Total",
    render: (row) => (
      <span className="">
        {calculatePercentage(row.cost, row.total_cost)}
      </span>
    ),
  },
];