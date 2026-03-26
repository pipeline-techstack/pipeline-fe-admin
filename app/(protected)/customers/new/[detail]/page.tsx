"use client";
import { useState } from "react";
import CustomerDetailLayout, {
  type TabDef,
} from "@/app/(protected)/customers/new/_components/customer-layout-wrapper";
import PageWrapper from "@/components/common/page-wrapper";
import GeneralTab from "../_components/GeneralTan";
import { WorkbookConfigsTab } from "../_components/WorkbookConfigsTab";
import { CUSTOMER_DATA } from "../customers.data";

type Tab = "general" | "workbook-configs";
const TABS: TabDef<Tab>[] = [
  { id: "general", label: "General" },
  { id: "workbook-configs", label: "Workbook Configs" },
];

export default function CustomerDetailPage() {
  const customer = CUSTOMER_DATA;
  const [activeTab, setActiveTab] = useState<Tab>("general");

  return (
    <PageWrapper
      title={customer.name}
      subtitle={customer.email}
      onBack={() => history.back()}
    >
      <CustomerDetailLayout
        customer={{
          name: customer.name,
          email: customer.email,
          company: customer.organization.company,
          status: customer.status,
        }}
        
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      >
        {activeTab === "general" ? (
          <GeneralTab customer={customer} />
        ) : (
          <WorkbookConfigsTab customer={customer} />
        )}
      </CustomerDetailLayout>
    </PageWrapper>
  );
}
