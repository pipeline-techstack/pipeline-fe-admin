"use client";

import { useState } from "react";
import PageWrapper from "@/components/common/page-wrapper";
import { DataTable } from "@/components/common/table/data-table";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  User,
  CheckCircle,
  Megaphone,
  Users,
  PlayCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "../customers/new/_components/Card";

const campaignData = [
  {
    id: "1",
    name: "Annual Conference Follow-up",
    status: "Pending",
    owner: "Alex R.",
    type: "Create Campaign",
    taskcreatedat: "1w ago",
  },
  {
    id: "2",
    name: "Financial Services ABM",
    status: "Pending",
    owner: "Alex R.",
    type: "Create Campaign",
    taskcreatedat: "1w ago",
  },
  {
    id: "3",
    name: "Healthcare Vertical Push",
    status: "Pending",
    owner: "Alex R.",
    type: "Create Campaign",
    taskcreatedat: "1w ago",
  },
  {
    id: "4",
    name: "Product Launch - DevTools",
    status: "Completed",
    owner: "Alex R.",
    type: "Update Campaign",
    taskcreatedat: "1w ago",
  },
];

const columns = [
  {
    key: "name",
    header: "Campaign Name",
    width: 260,
    icon: <Megaphone size={16} />,
  },

  {
    key: "status",
    header: "Status",
    icon: <CheckCircle size={16} />,
    render: (row: any) => (
      <Badge
        variant={row.status === "Completed" ? "success" : "default"}
        label={row.status}
      />
    ),
  },

  {
    key: "owner",
    header: "Owner",
    icon: <User size={16} />,
  },

  {
    key: "type",
    header: "Type",
    icon: <Users size={16} />,
  },

  {
    key: "taskcreatedat",
    header: "Task Created At",
    icon: <Calendar size={16} />, // 📅 time-related
  },

  {
    key: "action",
    header: "Action",
    icon: <PlayCircle size={16} />, // ▶️ action / start / continue
    render: (row: any, router: any) => (
      <Button
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          router.push(`/campaigns/${row.id}`);
        }}
      >
        {row.status === "Completed" ? "Update" : "Complete"}
      </Button>
    ),
  },
];
export default function CampaignPage() {
  const [page, setPage] = useState(1);
  const router = useRouter();

  const mappedColumns = columns.map((col) => {
    if (col.key === "action") {
      return {
        ...col,
        render: (row: any) => col.render(row, router),
      };
    }
    return col;
  });

  return (
    <PageWrapper
      title="Campaign Setup"
      // subtitle="Complete your outreach campaigns."
    >
      <DataTable
        data={campaignData}
        columns={mappedColumns}
        footer
        currentPage={page}
        onPageChange={setPage}
      />
    </PageWrapper>
  );
}
