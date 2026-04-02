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
const placeholder = () => alert("Dialog / action coming soon!");

export const workbookColumns = [
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
    className: "",
    render: (row) => (
      <div className="flex items-center gap-2">
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={placeholder}
          className=""
        >
          <DollarSign className="w-3 h-3" />
          Cost
        </Button>
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={placeholder}
          className=""
        >
          <Share className="w-3 h-3" />
          Share
        </Button>
      </div>
    ),
  },
];

export const cambookColumns = [
  {
    key: "campaign",
    header: "Campaign",
    className: "text-secondary-foreground",
  },
  {
    key: "workbooks",
    header: "Workbooks",
    className: " text-secondary-foreground",

    render: (row: any) => {
      const list = row.workbooks || [];
      const hidden = list.slice(2);

      return (
        <div className="flex flex-wrap gap-2">
          {/* visible badges */}
          {list.slice(0, 2).map((wb: string, i: number) => (
            <Badge key={i} label={wb} variant="info" />
          ))}

          {/* +X more with hover */}
          {hidden.length > 0 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Badge variant="outline" label={`+${hidden.length} more`} />
                  </div>
                </TooltipTrigger>

                <TooltipContent className="max-w-xs">
                  <div className="flex flex-col gap-1">
                    {hidden.map((wb: string, i: number) => (
                      <span key={i} className="text-sm">
                        {wb}
                      </span>
                    ))}
                  </div>
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
    className: "",
    render: (row: any) => (
      <Button variant="outline" size="sm">
        Edit
      </Button>
    ),
  },
];

export const enrichmentColumns = [
  {
    key: "name",
    header: "Enrichment Name",
    className: " text-secondary-foreground",
  },
  {
    key: "type",
    header: "Type",
    className: "",
    render: (row) => <Badge label={row.type} variant={"info"} />,
  },
  {
    key: "created_at",
    header: "Created At",
    className: " text-secondary-foreground",
  },
  {
    key: "actions",
    header: "Actions",
    className: "",
    render: () => (
      <Button
        variant={"outline"}
        size={"sm"}
        onClick={placeholder}
        className=""
      >
        Edit
      </Button>
    ),
  },
];
