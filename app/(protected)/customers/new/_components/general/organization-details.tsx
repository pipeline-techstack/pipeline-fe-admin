import { Organization } from "@/lib/types/customer-types";
import SectionCard, { Badge, FieldGrid, FieldItem } from "../Card";
import { Building2 } from "lucide-react";

const buildOrgFields = (o: Organization) => [
  { id: "company", label: "Company", value: o.company, isBadge: false },
  { id: "quota", label: "Quota", value: o.quota, isBadge: false },
  { id: "seats", label: "Seats", value: String(o.seats), isBadge: false },
  { id: "plan", label: "Plan", value: o.plan, isBadge: false }, // badge
  {
    id: "billingCycle",
    label: "Billing Cycle",
    value: o.billingCyvle,
    isBadge: false,
  },
  { id: "status", label: "Status", value: o.status, isBadge: true }, // badge
];

function OrganizationCard({ org }: { org: Organization }) {
  const fields = buildOrgFields(org);

  return (
    <SectionCard
      title="Organization"
      subtitle="Tenant capacity and status."
      icon={<Building2 className="w-4 h-4" />}
    >
      <FieldGrid cols={4}>
        {fields.map((f) =>
          f.isBadge ? (
            <div key={f.id} className="flex flex-col space-y-1">
              <span className="text-gray-500 text-sm">{f.label}</span>
              <Badge
                key={f.value}
                label={f.value as string}
                variant={f.value === "active" ? "success" : "default"}
                className="capitalize"
              />
            </div>
          ) : (
            <FieldItem key={f.id} label={f.label} value={f.value} />
          ),
        )}
      </FieldGrid>
    </SectionCard>
  );
}

export default OrganizationCard;
