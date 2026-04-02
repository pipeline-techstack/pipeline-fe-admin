"use client";
import { useState } from "react";
import CustomerDetailLayout, {
  type TabDef,
} from "@/app/(protected)/customers/new/_components/customer-layout-wrapper";
import PageWrapper from "@/components/common/page-wrapper";
import GeneralTab from "../_components/tabs/GeneralTab";
import { CUSTOMER_DATA } from "../customers.data";
import { useCustomerDetails } from "@/hooks/use-customer-details";
import { WorkbookConfigsTab } from "../_components/tabs/WorkbookConfigsTab";

type Tab = "general" | "workbook-configs";
const TABS: TabDef<Tab>[] = [
  { id: "general", label: "General" },
  { id: "workbook-configs", label: "RevOps config" },
];

export default function CustomerDetailPage() {
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
        {activeTab === "general" ? (
          <GeneralTab customer={data} />
        ) : (
          <WorkbookConfigsTab customer={customer} />
        )}
      </CustomerDetailLayout>
    </PageWrapper>
  );
}
