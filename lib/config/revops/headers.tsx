"use client";

import { DollarSign, Share } from "lucide-react";
import { Badge } from "@/app/(protected)/customers/new/_components/Card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const workbookColumns = (handleCostClick, handleDuplicate) => [
  {
    key: "name",
    header: "Name",
    className: "text-secondary-foreground",
  },
  {
    key: "updated_at",
    header: "Updated At",
    className: "text-secondary-foreground",
  },
  {
    key: "actions",
    header: "Actions",
    render: (row) => (
      <div className="flex items-center gap-2">
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
    className: "text-secondary-foreground",
  },
  {
    key: "workbooks",
    header: "Workbooks",
    className: "text-secondary-foreground",
    render: (row: any) => {
      const list = row.workbooks || [];
      const hidden = list.slice(2);

      return (
        <div className="flex flex-wrap gap-2">
          {list.slice(0, 2).map((wb: string, i: number) => (
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
        Edit
      </Button>
    ),
  },
];

export const enrichmentColumns = (onView, onDelete) => [
  {
    key: "name",
    header: "Enrichment Name",
    className: "text-secondary-foreground",
  },
  {
    key: "type",
    header: "Type",
    render: (row) => <Badge label={row.type} variant={"info"} />,
  },
  {
    key: "created_at",
    header: "Created At",
  },
  {
    key: "actions",
    header: "Actions",
    render: (row) => (
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onView(row)}  
        >
          View
        </Button>

        {/* <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(row)}
        >
          Delete
        </Button> */}
      </div>
    ),
  },
];
