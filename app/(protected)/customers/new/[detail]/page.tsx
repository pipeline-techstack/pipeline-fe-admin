"use client";
import { useState } from "react";
import CustomerDetailLayout, {
  type TabDef,
} from "@/app/(protected)/customers/new/_components/customer-layout-wrapper";
import PageWrapper from "@/components/common/page-wrapper";
import GeneralTab from "../_components/tabs/GeneralTab";
import { RevopsTab } from "../_components/tabs/RevopsTab";
import { useParams } from "next/navigation";
import { useCustomerDetails } from "@/hooks/use-customer-details";
import OutboundTab from "../_components/tabs/OutboundTab";
import ErrorState from "@/components/common/error";
import SpinLoader from "@/components/common/spin-loader";


type Tab = "general" | "revops" | "outbound";
const TABS: TabDef<Tab>[] = [
  { id: "general", label: "General" },
  { id: "revops", label: "RevOps config" },
  { id: "outbound", label: "Outbound config" },
];

export default function CustomerDetailPage() {
  const {detail} = useParams()
  const id:string = Array.isArray(detail) ? detail[0] : detail || " "
  const [activeTab, setActiveTab] = useState<Tab>("general");
  const { customer: data, isLoading, error } = useCustomerDetails();

  if (isLoading) {
    return <SpinLoader size="lg"/>
  }

  if (error) {
  return (
    <div className="flex items-center justify-center h-full bg-white">
      <ErrorState />
    </div>
  );
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
