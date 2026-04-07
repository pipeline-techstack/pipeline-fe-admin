import { Customer } from "@/lib/types/customer-types";
import CustomerDetails from "../general/customer-details";
import FeatureAllocationCard from "../general/feature-details";
import PaymentDetailsCard from "../general/payment-details";
import IntegrationsCard from "../general/platform-integration";
import OrganizationCard from "../general/organization-details";


export default function GeneralTab({ customer }: { customer: Customer }) {
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
    </div>
  );
}
