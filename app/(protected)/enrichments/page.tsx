"use client";
import { EnrichmentsTable } from "@/components/dashboard/prompts-table";
import PageHeader from "@/components/ui/page-header";
import { useQuery } from "@tanstack/react-query";
import { getEnrichments } from "@/services/enrichments";
import { Loader2 } from "lucide-react";

export default function PromptsPage() {
  const {
    data: enrichments = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["enrichments"],
    queryFn: getEnrichments,
  });

  if (isLoading)
    return (
      <div className="flex flex-col flex-1 space-y-6 h-full">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <PageHeader
              title="Enrichments"
              subtitle="Manage and view all prompt engagements"
            />
          </div>

          <Loader2 className="mx-auto animate-spin" />
        </div>
      </div>
    );
  if (error)
    return (
      <div className="flex flex-col flex-1 space-y-6 h-full">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <PageHeader
              title="Enrichments"
              subtitle="Manage and view all prompt engagements"
            />
          </div>
          <div>{(error as Error).message}</div>;
        </div>
      </div>
    );
  return (
    <div className="flex flex-col flex-1 space-y-6 h-full">
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <PageHeader
            title="Enrichments"
            subtitle="Manage and view all prompt engagements"
          />
        </div>

       <EnrichmentsTable data={[...enrichments].reverse()} />
      </div>
    </div>
  );
}
