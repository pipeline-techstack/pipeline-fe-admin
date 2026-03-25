import {
  CampaignPermission,
  Customer,
  Organization,
} from "@/lib/types/customer-types";
import SectionCard, { Badge, FieldGrid, FieldItem } from "./Card";
import { Building2, Shield, User, Zap } from "lucide-react";

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
  {
    id: "status",
    label: "Status",
    value: o.status,
    isBadge: true,
    badgeVariant: "success" as const,
  },
];
const placeholder = () => alert("Dialog / action coming soon!");

export default function GeneralTab({ customer }: { customer: Customer }) {

  const customerFields = buildCustomerFields(customer);
  const orgFields = buildOrgFields(customer.organization);

  const campaignsByRole = customer.campaigns.reduce<
    Record<string, CampaignPermission[]>
  >((acc, c) => ({ ...acc, [c.role]: [...(acc[c.role] ?? []), c] }), {});

  return (
    <div className="flex flex-col gap-5">
      
      {/* Customer Details */}
      <SectionCard
        title="Customer Details"
        subtitle="Contact, communication, and integration identifiers."
        icon={<User className="w-4 h-4" />}
        onEdit={placeholder}
      >
        <FieldGrid cols={3}>
          {customerFields.map((f) => (
            <FieldItem key={f.id} label={f.label} value={f.value}>
              {f.isBadge && (
                <Badge label={f.value} variant={f.badgeVariant ?? "outline"} />
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
            <Badge key={f.id} label={f.label} variant="outline" />
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
        subtitle="Campaign access based on role."
        icon={<Shield className="w-4 h-4" />}
        onEdit={placeholder}
      >
        <div className="flex flex-col gap-4">
          {Object.entries(campaignsByRole).map(([role, camps]) => (
            <div key={role}>
              {/* role group header */}
              <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                    <Shield className="w-3.5 h-3.5 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-sm text-secondary-foreground">
                      {role}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {camps.length} campaign{camps.length !== 1 ? "s" : ""}{" "}
                      allocated to this {role.toLowerCase()}
                    </p>
                  </div>
                </div>
                <span className="text-sm text-secondary-foreground">
                  {camps.length}
                </span>
              </div>

              {/* scrollable list – ~4 rows then scroll */}
              <div className="border border-gray-100 rounded-lg overflow-hidden">
                <div className="overflow-y-auto max-h-44">
                  {camps.map((c, idx) => (
                    <div
                      key={c.id}
                      className={`flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50/70 transition-colors ${
                        idx !== 0 ? "border-t border-gray-100" : ""
                      }`}
                    >
                      <Badge label={c.role} variant="outline" />
                      <span className="text-sm text-muted-forground">{c.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
