import { Edit, Trash2, FolderKanban } from "lucide-react";
import { TableActions } from "@/components/common/table/table-actions";
import { formatDate } from "@/lib/utils";

export function getOrganizationColumns(router, onEdit, onDisableClick) {
  return [
    {
      key: "name",
      header: "Company",
    },
    {
      key: "monthlyQuota",
      header: "Quota",
      render: (row) => row.monthlyQuota?.toLocaleString() || "—",
    },
    {
      key: "seats",
      header: "Seats",
      render: (row) => row.seats || "—",
    },
    {
      key: "updatedAt",
      header: "Updated",
      render: (row) => formatDate(row.updatedAt),
    },
    {
      key: "status",
      header: "Status",
      render: (row) =>
        row.status === "canceled" ? (
          <span className="bg-red-500 px-2 py-1 rounded-full text-white">
            Disabled
          </span>
        ) : (
          "-"
        ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <div
          onClick={(e) => e.stopPropagation()} // 🚨 prevents row navigation
        >
          <TableActions
            actions={[
              {
                label: "View",
                icon: <FolderKanban className="w-4 h-4" />,
                onClick: () => router.push(`/organization/${row._id}`),
              },
              {
                label: "Edit",
                icon: <Edit className="w-4 h-4" />,
                onClick: () => onEdit(row),
              },
              {
                label: "Disable",
                icon: <Trash2 className="w-4 h-4" />,
                className: "text-red-600",
                onClick: () => onDisableClick(row._id), // ✅ pass id only
              },
            ]}
          />
        </div>
      ),
    },
  ];
}