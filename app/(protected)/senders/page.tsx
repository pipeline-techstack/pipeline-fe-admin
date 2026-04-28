"use client";

import { useEffect, useState } from "react";
import PageWrapper from "@/components/common/page-wrapper";
import { DataTable } from "@/components/common/table/data-table";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { getColumns } from "@/lib/config/senders/headers";
import { SenderFilters } from "./_components/sender-filters";
import Metrics from "./_components/metrics";
import { useRefetchLinkedinSender, useSenders } from "@/hooks/use-senders";
import { getLast30DaysRange } from "@/lib/utils";
import { refetchLinkedinSenderApi } from "@/services/linkedin-senders";
import AddSenderDialog from "./_components/add-sender-dialog";

const INITIAL_FILTERS = {
  sender_name: "",
  companies: [],
  campaigns: [],
  ...getLast30DaysRange(),
};

const SenderPage = () => {
  const router = useRouter();
  const { refetchLinkedinSender } = useRefetchLinkedinSender();

  // -----------------------
  // Pagination (server-driven)
  // -----------------------
  const [page, setPage] = useState(1);

  // -----------------------
  // Filters
  // -----------------------
  const [filters, setFilters] = useState(() => INITIAL_FILTERS);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [openAddSender, setOpenAddSender] = useState(false);

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

  const handleRefresh = async (id: string) => {
    setLoadingId(id);
    await refetchLinkedinSender(id);
    setLoadingId(null);
  };

  const columns = getColumns(handleRefresh, loadingId);
  return (
    <PageWrapper
      title="Sender Management"
      subtitle="Overview of all the senders working for us"
      rightComponent={
        <div className="flex items-center gap-3">
          {/* Search */}
          <Button onClick={() => setOpenAddSender(true)}>
            <Plus size={16} className="mr-2" />
            Add Senders
          </Button>
        </div>
      }
    >
      <div className="flex flex-col h-[calc(100vh-80px)] overflow-hidden">
        {/* ---------------- FILTERS ---------------- */}
        <div className="mt-3 mb-4">
          <SenderFilters filters={filters} onChange={setFilters} />
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
      <AddSenderDialog open={openAddSender} onOpenChange={setOpenAddSender} />
    </PageWrapper>
  );
};

export default SenderPage;
