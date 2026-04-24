"use client";
import React, { use, useState } from "react";
import PageWrapper from "@/components/common/page-wrapper";
import { DataTable } from "@/components/common/table/data-table";
import { Send, Check, MessageCircle, ThumbsUp, Plus } from "lucide-react";
import { columns } from "@/lib/config/senders/headers";
import { senders } from "./dummy-data";
import { MetricCard } from "./_components/metric-card";
import { SenderFilters } from "./_components/sender-filters";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Metrics from "./_components/metrics";

const SenderPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);

  const handleclick = (row: any) => {
    router.push(`senders/${row._id}`);
  };

  return (
    <PageWrapper title="Sender Management">
      {/* Filters */}
      <div className="flex gap-12 mt-3 mb-4">
        <div className="flex-1">
          {" "}
          <SenderFilters />
        </div>

        <Button>
          <Plus size={16} className="mr-2" />
          Add Senders
        </Button>
      </div>

      {/* Global Stats */}
      {/* <span className="my-2 text-secondary-foreground text-sm">Global Stats</span> */}
     <Metrics />

      {/* Table */}
      <DataTable
        data={senders}
        columns={columns}
        footer={true}
        currentPage={page}
        onPageChange={setPage}
        onRowClick={handleclick}
        loading={false}
        error={null}
      />
    </PageWrapper>
  );
};

export default SenderPage;
