import { Badge } from "@/app/(protected)/customers/new/_components/Card";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCw, Share, Upload } from "lucide-react";

export const campaignsColumns = (handleShare: (row: any) => void , handleUpdateOwner: (row: any) => void) => [
  {
    key: "campaigns",
    header: "Name",
    render: (row: any) => (
      <span className="text-gray-800 text-sm">{row.name}</span>
    ),
  },
  {
    key: "heyreach_id",
    header: "Heyreach ID",
    render: (row: any) => (
      <span className="text-gray-800 text-sm">{row.heyreach_id}</span>
    ),
  },
  {
    key: "senders_counts",
    header: "No of Senders",
    render: (row: any) => (
      <span className="text-gray-800 text-sm">{row.senders_counts}</span>
    ),
  },
  {
    key: "updated at",
    header: "Updated At",
    render: (row: any) => (
      <span className="text-gray-800 text-sm">{row.updatedAt}</span>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (row: any) => {
      const status = row.status;

      let variant: "success" | "info" | "default" = "default";

      if (status === "Active") variant = "success";
      else if (status === "Finished") variant = "info";

      return <Badge label={status} variant={variant} />;
    },
  },
  {
    key: "actions",
    header: "Actions",
    render: (row: any) => (
      <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare(row)} 
      >
        <Share className="size-4" />
        Share
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleUpdateOwner(row)} 
      >
        <RefreshCw className="size-4" />
        Owner
      </Button>
      </div>
    ),
  },
];