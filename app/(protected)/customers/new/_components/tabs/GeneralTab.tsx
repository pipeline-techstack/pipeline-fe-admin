import { Customer, Organization } from "@/lib/types/customer-types";
import SectionCard, { Badge, FieldGrid, FieldItem } from "../Card";
import {
  Building2,
  Copy,
  DollarSign,
  Link,
  Shield,
  User,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { DataTable } from "@/components/common/table/data-table";
import { Button } from "@/components/ui/button";
import ShowCompanyLogo from "@/components/common/show-company-logo";
import CustomerDetails from "../general/customer-details";
import FeatureAllocationCard from "../general/feature-details";

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
  {
    key: "heyreach_id",
    header: "Heyreach ID",
    render: (row: any) => (
      <span className="text-gray-800 text-sm">{row.heyreach_id}</span>
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
    render: () => (
      <Button className="" variant={"outline"} size={"sm"}>
        <Copy className="size-4" />
        Duplicate
      </Button>
    ),
  },
];

const placeholder = () => alert("Dialog / action coming soon!");

export default function GeneralTab({ customer }: { customer: Customer }) {
  // const paymentFields = buildPaymentFields(customer);
  // const orgFields = buildOrgFields(customer.organization);
  const [editing, setEditing] = useState<{
    customer: boolean;
    payment: boolean;
  }>({
    customer: false,
    payment: false,
  });
  const [formState, setFormState] = useState(customer);
  // const campaign = customer.campaigns;

  const toggleEdit = (key: "customer" | "payment") => {
    setEditing((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  return (
    <div className="flex flex-col gap-5">
      {/* Customer Details */}
      <CustomerDetails customer={customer} />

      {/* Feature Allocation */}
      <FeatureAllocationCard customer={customer} />
   
      {/* Payment details */}
      {/* <SectionCard
        title="Payment details"
        subtitle="Know where the dollar comes from."
        icon={<DollarSign className="w-4 h-4" />}
        onEdit={() => {
          if (editing.payment) {
            console.log("Saving payment...", formState);
          }
          toggleEdit("payment");
        }}
        editLabel={editing.payment ? "Save" : "Edit"}
      >
        <FieldGrid cols={3}>
          {paymentFields.map((f) => (
            <FieldItem
              key={f.id}
              label={f.label}
              value={formState[f.id as keyof Customer]}
              name={f.id}
              isEditing={editing.payment}
              onChange={(name, val) =>
                setFormState((prev) => ({ ...prev, [name]: val }))
              }
            >
              {f.isBadge && !editing.payment && (
                <Badge label={f.value} variant="info" />
              )}
            </FieldItem>
          ))}
        </FieldGrid>
      </SectionCard> */}

      {/* Platform Integrated */}
      {/* <SectionCard
        title="Platform Integrated"
        subtitle="Platforms this user is integrated with."
        icon={<Link className="w-4 h-4" />}
        // onEdit={placeholder}
      >
        <div className="flex flex-wrap gap-2">
          {customer.integrations.map((f) => (
            <Badge
              logo={<ShowCompanyLogo domain={f.name} />}
              key={f.name}
              label={f.name}
              variant={f.connected ? "success" : "warning"}
              disabled={!f.connected}
              className="capitalize"
            />
          ))}
        </div>
      </SectionCard> */}

      {/* Organization */}
      {/* <SectionCard
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
      </SectionCard> */}

      {/* Campaign Permissions */}
      {/* <SectionCard
        title="Campaigns"
        subtitle="All campaigns for this user, duplicate to give access to other users."
        icon={<Shield className="w-4 h-4" />}
        onEdit={placeholder}
      >
        <div className="flex flex-col h-[320px] overflow-hidden">
          <div className="flex-1 overflow-auto">
            <DataTable
              data={customer.campaigns}
              columns={campaignPermissionColumns}
              footer={false}
              pageSize={5}
            />
          </div>
        </div>
      </SectionCard> */}
    </div>
  );
}
