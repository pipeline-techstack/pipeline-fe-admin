"use client";
import { useState } from "react";
import CustomerDetailLayout, {
  type TabDef,
} from "@/app/(protected)/customers/new/_components/customer-layout-wrapper";
import PageWrapper from "@/components/common/page-wrapper";
import GeneralTab from "../_components/tabs/GeneralTab";
import { RevopsTab } from "../_components/tabs/RevopsTab";
import { CUSTOMER_DATA } from "../customers.data";
import { useParams } from "next/navigation";
import { useCustomerDetails } from "@/hooks/use-customer-details";
import OutboundTab from "../_components/tabs/OutboundTab";


type Tab = "general" | "revops" | "outbound";
const TABS: TabDef<Tab>[] = [
  { id: "general", label: "General" },
  { id: "revops", label: "RevOps config" },
  { id: "outbound", label: "Outbound config" },
];

export default function CustomerDetailPage() {
  const {detail} = useParams()
  const id:string = Array.isArray(detail) ? detail[0] : detail || " "
  const customer = CUSTOMER_DATA;
  const [activeTab, setActiveTab] = useState<Tab>("general");
  const { customer: data, isLoading, error } = useCustomerDetails();
  
  //TODO: Change these
  if (isLoading) {
    return <div>Loading customer...</div>;
  }

  if (error || !data) {
    return <div>Failed to load customer</div>;
  }
  const tabComponents = {
  general: <GeneralTab customer={data} />,
  revops: <RevopsTab id={id} name={data?.name} email={data?.email} />,
  outbound: <OutboundTab id={id} />,
};
  return (
    <PageWrapper
      title={data.name}
      subtitle={data.email}
      onBack={() => history.back()}
      showBadge={data.role === "owner"}
    >
      <CustomerDetailLayout
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      >
       {tabComponents[activeTab] || null}

      </CustomerDetailLayout>
    </PageWrapper>
  );
}
