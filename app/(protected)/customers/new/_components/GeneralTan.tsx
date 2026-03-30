import {
  Customer,
  Organization,
} from "@/lib/types/customer-types";
import SectionCard, { Badge, FieldGrid, FieldItem } from "./Card";
import { Building2, Shield, User, Zap } from "lucide-react";
import { useState } from "react";
import { DataTable } from "@/components/common/table/data-table";

const buildCustomerFields = (c: Customer) => [
  { id: "name", label: "Name", value: c.name, isBadge: false },
  { id: "email", label: "Email", value: c.email, isBadge: false },
  { id: "phone", label: "Phone", value: c.phone, isBadge: false },
  {
    id: "slack",
    label: "Slack Channel ID",
    value: c.slackChannelId,
    isBadge: false,
  },
  { id: "teams", label: "Teams ID", value: c.teamsId, isBadge: false },
  {
    id: "notif",
    label: "Notification Mode",
    value: c.notificationMode,
    isBadge: false,
  },
  { id: "date", label: "Date Added", value: c.dateAdded, isBadge: false },
  {
    id: "role",
    label: "Role",
    value: c.role,
    isBadge: true,
    badgeVariant: "outline" as const,
  },
];

const buildOrgFields = (o: Organization) => [
  { id: "company", label: "Company", value: o.company, isBadge: false },
  { id: "quota", label: "Quota", value: o.quota, isBadge: false },
  { id: "seats", label: "Seats", value: String(o.seats), isBadge: false },
  { id: "region", label: "Region", value: o.region, isBadge: false },
  { id: "admins", label: "Admins", value: String(o.admins), isBadge: false },
  // {
  //   id: "status",
  //   label: "Status",
  //   value: o.status,
  //   isBadge: true,
  //   badgeVariant: "success" as const,
  // },
];

export const campaignPermissionColumns = [
  {
    key: "campaigns",
    header: "Assigned Campaigns",
    render: (row: any) => (
      <span className="text-gray-800 text-sm">{row.name}</span>
    ),
  },
  // {
  //   key: "created at",
  //   header: "Created At",
  //   render: (row: any) => (
  //     <span className="text-gray-800 text-sm">{row.createdAt}</span>
  //   ),
  // },
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
  // {
  //   key: "actions",
  //   header: "Actions",
  //   render: () => (
  //     <Button className="" variant={"outline"}>Edit</Button>
  //   ),
  // },
];

const placeholder = () => alert("Dialog / action coming soon!");

export default function GeneralTab({ customer }: { customer: Customer }) {
  const customerFields = buildCustomerFields(customer);
  const orgFields = buildOrgFields(customer.organization);
  const [isEditing, setIsEditing] = useState(false);
  const [formState, setFormState] = useState(customer);
  const campaign = customer.campaigns;

  return (
    <div className="flex flex-col gap-5">
      {/* Customer Details */}
      <SectionCard
        title="Customer Details"
        subtitle="Contact, communication, and integration identifiers."
        icon={<User className="w-4 h-4" />}
        onEdit={() => {
          if (isEditing) {
            // SAVE
            console.log("Saving...", formState);
            // TODO: API call here
          }
          setIsEditing(!isEditing);
        }}
        editLabel={isEditing ? "Save" : "Edit"}
      >
        <FieldGrid cols={3}>
          {customerFields.map((f) => (
            <FieldItem
              key={f.id}
              label={f.label}
              value={formState[f.id as keyof Customer]}
              name={f.id}
              isEditing={isEditing}
              onChange={(name, val) =>
                setFormState((prev) => ({ ...prev, [name]: val }))
              }
            >
              {f.isBadge && !isEditing && (
                <Badge label={f.value} variant={"info"} />
              )}
            </FieldItem>
          ))}
        </FieldGrid>
      </SectionCard>

      {/* Feature Allocation */}
      <SectionCard
        title="Feature Allocation"
        subtitle="Assigned resources and entitlements."
        icon={<Zap className="w-4 h-4" />}
        onEdit={placeholder}
      >
        <div className="flex flex-wrap gap-2">
          {customer.features.map((f) => (
            <Badge key={f.id} label={f.label} variant="info" />
          ))}
        </div>
      </SectionCard>

      {/* Organization */}
      <SectionCard
        title="Organization"
        subtitle="Tenant capacity and status."
        icon={<Building2 className="w-4 h-4" />}
        onEdit={placeholder}
      >
        <FieldGrid cols={3}>
          {orgFields.map((f) => (
            <FieldItem key={f.id} label={f.label} value={f.value}>
              {f.isBadge && (
                <Badge label={f.value} variant={f.badgeVariant ?? "success"} />
              )}
            </FieldItem>
          ))}
        </FieldGrid>
      </SectionCard>

      {/* Campaign Permissions */}
      <SectionCard
        title="Campaign Permissions"
        subtitle="Campaign access based on users."
        icon={<Shield className="w-4 h-4" />}
        onEdit={placeholder}
      >
        <div className="flex flex-col h-[320px] overflow-hidden">
          <div className="flex-1 overflow-auto">
            <DataTable
              data={customer.campaigns}
              columns={campaignPermissionColumns}
              footer={false}
              pageSize={10}
            />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
