"use client";

import PageWrapper from "@/components/common/page-wrapper";

import { configMap } from "@/lib/config/revops/revops-map";
import SectionCard from "../../../_components/Card";
import { DataTable } from "@/components/common/table/data-table";
import { CUSTOMER_DATA } from "../../../customers.data";
import { Tabs } from "@/components/ui/tabs";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";

// interface PageParams {
//   id: string;
//   type: 'workbooks' | 'enrichments'  | 'campbooks';
// }

function Page() {
  const params = useParams();
  const searchParams = useSearchParams();
  type ConfigType = keyof typeof configMap;
  const type = params.type as ConfigType;
  const customerName = searchParams.get("name");
  const customerEmail = searchParams.get("email");
  const data = CUSTOMER_DATA;
  const [datapage, setDatapage] = useState(1);

  const handleclick = (row) => {
    console.log("clicked");
  };

  return (
    <PageWrapper
      title={customerName || "Name"}
      subtitle={customerEmail || "Email"}
      onBack={() => history.back()}
    >
      {/* <CustomerHeader /> */}

      <Tabs defaultValue="revops-config" />

      <SectionCard
        title={configMap[type].title}
        subtitle={configMap[type].subtitle}
        icon={configMap[type].icon}
        className="mt-1.5"
      >
        <div className="flex flex-col h-[calc(100vh-200px)] overflow-hidden">
          {/* Table takes scroll */}
          <div className="flex-1 overflow-auto">
            {type === "workbooks" && (
              <DataTable
                data={data.workbooks}
                columns={configMap.workbooks.columns}
                footer={true}
                currentPage={datapage}
                onPageChange={setDatapage}
                onRowClick={handleclick}
              />
            )}

            {type === "enrichments" && (
              <DataTable
                data={data.enrichments}
                columns={configMap.enrichments.columns}
                footer={true}
                currentPage={datapage}
                onPageChange={setDatapage}
                onRowClick={handleclick}
              />
            )}

            {type === "campbooks" && (
              <DataTable
                data={data.wbConfigs}
                columns={configMap.campbooks.columns}
                footer={true}
                currentPage={datapage}
                onPageChange={setDatapage}
                onRowClick={handleclick}
              />
            )}
          </div>
        </div>
      </SectionCard>
    </PageWrapper>
  );
}

export default Page;
