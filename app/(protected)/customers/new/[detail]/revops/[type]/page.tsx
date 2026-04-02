"use client";

import PageWrapper from "@/components/common/page-wrapper";
import { configMap } from "@/lib/config/revops/revops-map";
import SectionCard from "../../../_components/Card";
import { DataTable } from "@/components/common/table/data-table";
// import { Tabs } from "@/components/ui/tabs";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function Page() {
  const params = useParams();
  const { detail } = useParams();

  const id: string = Array.isArray(detail) ? detail[0] : detail || "";

  const searchParams = useSearchParams();

  type ConfigType = keyof typeof configMap;
  const type = params.type as ConfigType;

  const customerName = searchParams.get("name");
  const customerEmail = searchParams.get("email");

  const [datapage, setDatapage] = useState(1);
  const pageSize = 20;
  const {title, subtitle, icon, columns, hook} = configMap[type]
  const { data, isLoading } = hook(id, datapage, pageSize);

  useEffect(() => {
    setDatapage(1);
  }, [id]);

  const handleclick = (row: any) => {
    console.log("clicked", row);
  };
  return (
    <PageWrapper
      title={customerName || "Name"}
      subtitle={customerEmail || "Email"}
      onBack={() => history.back()}
    >
      {/* <Tabs defaultValue="revops-config" /> */}

      <SectionCard
        title={title}
        subtitle={subtitle}
        icon={icon}
        className="mt-1.5"
      >
        <div className="flex flex-col h-[calc(100vh-200px)] overflow-hidden">
          <div className="flex-1 overflow-auto">
            {/* ✅ WORKBOOKS (SERVER PAGINATION) */}
            {type === "workbooks" && (
              <DataTable
                data={data?.workbooks ?? []}
                columns={columns}
                total={data?.total ?? 0}
                currentPage={data?.page ?? datapage}
                pageSize={data?.pageSize ?? pageSize}
                totalPages={data?.totalPages}
                onPageChange={setDatapage}
                isServerPagination
                footer
                loading={isLoading}
              />
            )}

            {type === "enrichments" && (
              <DataTable
                data={data?.enrichments ?? []}
                columns={columns}
                footer
                currentPage={datapage}
                onPageChange={setDatapage}
                onRowClick={handleclick}
              />
            )}

            {type === "campbooks" && (
              <DataTable
                data={data?.cambooks ?? []}
                columns={columns}
                footer
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
