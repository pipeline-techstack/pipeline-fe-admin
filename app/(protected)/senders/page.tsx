"use client";

import { useEffect, useState } from "react";
import PageWrapper from "@/components/common/page-wrapper";
import { DataTable } from "@/components/common/table/data-table";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { columns } from "@/lib/config/senders/headers";
import { SenderFilters } from "./_components/sender-filters";
import Metrics from "./_components/metrics";
import { useSenders } from "@/hooks/use-senders";
import { getLast30DaysRange } from "@/lib/utils";

const INITIAL_FILTERS = {
  sender_name: "",
  companies: [],
  campaigns: [],
  ...getLast30DaysRange(),
};

const SenderPage = () => {
  const router = useRouter();

  // -----------------------
  // Pagination (server-driven)
  // -----------------------
  const [page, setPage] = useState(1);

  // -----------------------
  // Filters
  // -----------------------
  const [filters, setFilters] = useState(() => INITIAL_FILTERS);

  // -----------------------
  // Reset page when filters change
  // -----------------------
  useEffect(() => {
    setPage(1);
  }, [filters]);

  // -----------------------
  // API call
  // -----------------------
  const { data, isLoading, error } = useSenders({
    page,
    page_size: 25,
    sender_name: filters.sender_name,
    start_date: filters.start_date,
    end_date: filters.end_date,
    companies: filters.companies,
    campaign_names: filters.campaigns,
  });

  // -----------------------
  // Row click
  // -----------------------
  const handleClick = (row: any) => {
    router.push(`senders/${row._id}`);
  };

  // -----------------------
  // Pagination handlers
  // -----------------------
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <PageWrapper title="Sender Management">
      <div className="flex flex-col h-[calc(100vh-80px)] overflow-hidden">
        {/* ---------------- FILTERS ---------------- */}
        <div className="flex gap-12 mt-3 mb-4">
          <div className="flex-1">
            <SenderFilters filters={filters} onChange={setFilters} />
          </div>

          <Button>
            <Plus size={16} className="mr-2" />
            Add Senders
          </Button>
        </div>

        {/* ---------------- METRICS ---------------- */}

        <Metrics summary={data?.summary} />

        {/* ---------------- TABLE ---------------- */}
        <DataTable
          data={data?.senders || []}
          columns={columns}
          footer
          currentPage={data?.pagination?.page || page}
          totalPages={data?.pagination?.totalPages}
          onPageChange={handlePageChange}
          onRowClick={handleClick}
          loading={isLoading}
          isServerPagination={true}
          error={error}
        />
      </div>
    </PageWrapper>
  );
};

export default SenderPage;
