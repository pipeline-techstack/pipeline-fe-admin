import { CUSTOMER_DATA } from "@/app/(protected)/customers/new/customers.data";
import { Column } from "@/lib/types/table-types";
import { Copy, DollarSign } from "lucide-react";
import { Badge } from "@/app/(protected)/customers/new/_components/Card";
import { Button } from "@/components/ui/button";
const customer = CUSTOMER_DATA;
const placeholder = () => alert("Dialog / action coming soon!");

export const workbookColumns: Column<(typeof customer.workbooks)[0]>[] = [
  {
    key: "name",
    header: "Name",
    className: "w-1/2 text-secondary-foreground",
  },
  {
    key: "rows",
    header: "Rows",
    className: "w-1/2 text-secondary-foreground",
  },
  {
    key: "actions",
    header: "Actions",
    className: "text-left",
    render: (row) => (
      <div className="flex items-center gap-2">
        <Button
          variant={'outline'}
          size={'sm'}
          onClick={placeholder}
          className=""
        >
          <DollarSign className="w-3 h-3" />
          Cost
        </Button>
        <Button
          variant={'outline'}
          size={'sm'}
          onClick={placeholder}
          className=""
        >
          <Copy className="w-3 h-3" />
          Duplicate
        </Button>
      </div>
    ),
  },
];

export const wbConfigColumns: Column<(typeof customer.wbConfigs)[0]>[] = [
  {
    key: "campaign",
    header: "Campaign",
    className: "w-1/2 text-secondary-foreground",
  },
  {
    key: "workbook",
    header: "Workbook",
    className: "w-1/3 text-secondary-foreground",
  },
  {
    key: "actions",
    header: "Actions",
    className: "text-left",
    render: () => (
      <Button
        variant={'outline'}
          size={'sm'}
          onClick={placeholder}
          className=""
      >
        Edit
      </Button>
    ),
  },
];

export const enrichmentColumns: Column<(typeof customer.enrichments)[0]>[] = [
  {
    key: "name",
    header: "Enrichment Name",
    className: "w-2/5 text-secondary-foreground",
  },
  {
    key: "type",
    header: "Type",
    className: "w-1/5",
    render: (row) => (
      <Badge label={row.type} variant={'info'} />
    ),
  },
  {
    key: "createdOn",
    header: "Created On",
    className: "w-1/5 text-secondary-foreground",
  },
  {
    key: "actions",
    header: "Actions",
    className: "text-left",
    render: () => (
      <Button
       variant={'outline'}
          size={'sm'}
          onClick={placeholder}
          className=""
      >
        Edit
      </Button>
    ),
  },
];
