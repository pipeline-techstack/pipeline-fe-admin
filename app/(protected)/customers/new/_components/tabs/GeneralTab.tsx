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
import PaymentDetailsCard from "../general/payment-details";
import IntegrationsCard from "../general/platform-integration";
import OrganizationCard from "../general/organization-details";





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


export default function GeneralTab({ customer }: { customer: Customer }) {
  // const paymentFields = buildPaymentFields(customer);
  // const orgFields = buildOrgFields(customer.organization);

  return (
    <div className="flex flex-col gap-5">
      {/* Customer Details */}
      <CustomerDetails customer={customer} />

      {/* Feature Allocation */}
      <FeatureAllocationCard customer={customer} />
   
      {/* Payment details */}
      <PaymentDetailsCard customer={customer} />
      
      {/* Platform Integrated */}
      <IntegrationsCard customer={customer} />
  
      {/* Organization */}
      <OrganizationCard org={customer.organization} />

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
