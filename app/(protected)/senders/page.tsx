"use client";
import React, { useState } from "react";
import PageWrapper from "@/components/common/page-wrapper";
import { DataTable } from "@/components/common/table/data-table";
import { Send, Check, MessageCircle, ThumbsUp, Plus } from "lucide-react";
import { columns } from "@/lib/config/senders/headers";
import { senders } from "./dummy-data";
import { MetricCard } from "./_components/metric-card";
import { SenderFilters } from "./_components/sender-filters";
import { Button } from "@/components/ui/button";

const SenderPage = () => {
  const [page, setPage] = useState(1);

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
      <div className="gap-4 grid grid-cols-1 md:grid-cols-4 mt-1 mb-3">
        <MetricCard
          title="Connection Sent"
          value="1,247"
          icon={<Send size={18} />}
        />
        <MetricCard title="Accepted" value="35%" icon={<Check size={18} />} />
        <MetricCard
          title="Reply Rate"
          value="13%"
          icon={<MessageCircle size={18} />}
        />
        <MetricCard
          title="Interested"
          value="341"
          icon={<ThumbsUp size={18} />}
        />
      </div>

      {/* Table */}
      <DataTable
        data={senders}
        columns={columns}
        footer={true}
        currentPage={page}
        onPageChange={setPage}
        onRowClick={(row) => console.log(row)}
        loading={false}
        error={null}
      />
    </PageWrapper>
  );
};

export default SenderPage;
