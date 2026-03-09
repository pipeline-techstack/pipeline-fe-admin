"use client";
import { EnrichmentsTable } from "@/components/dashboard/prompts-table";
import { useQuery } from "@tanstack/react-query";
import { getEnrichments } from "@/services/enrichments";
import { Loader2 } from "lucide-react";
import PageWrapper from "@/components/common/page-wrapper";

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
    <PageWrapper
      title="Enrichments"
      subtitle="Manage and view all prompt engagements"
    >
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin" />
      </div>
    </PageWrapper>
  );

if (error)
  return (
    <PageWrapper
      title="Enrichments"
      subtitle="Manage and view all prompt engagements"
    >
      <div className="text-red-600">
        {(error as Error).message}
      </div>
    </PageWrapper>
  );

return (
  <PageWrapper
    title="Enrichments"
    subtitle="Manage and view all prompt engagements"
  >
    <EnrichmentsTable data={[...enrichments].reverse()} />
  </PageWrapper>
);
}
