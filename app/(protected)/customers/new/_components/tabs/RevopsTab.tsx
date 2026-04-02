"use client";

import { useWorkbooks } from "@/hooks/use-wb";
import RevopsTable from "../RevopsTable";
import { BookOpen, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  cambookColumns,
  enrichmentColumns,
  workbookColumns,
} from "@/lib/config/revops/headers";
import { useEnrichments } from "@/hooks/use-enrichment";
import { useCambook } from "@/hooks/use-cambook";

export function RevopsTab({
  id,
  name,
  email,
}: {
  id: string;
  name: string;
  email: string;
}) {
  const router = useRouter();
  const wb = useWorkbooks(id);
  const enrich = useEnrichments(id);
  const cambook = useCambook(id);
  console.log("cambook data ", cambook);

  const handleWookbookViewMore = () => {
    router.push(
      `/customers/new/${id}/revops/workbooks?name=${name}&email=${email}`,
    );
  };
  const handleEnrichViewMore = () => {
    router.push(
      `/customers/new/${id}/revops/enrichments?name=${name}&email=${email}`,
    );
  };
  const handleCambookViewMore = () => {
    router.push(
      `/customers/new/${id}/revops/campbooks?name=${name}&email=${email}`,
    );
  };
  return (
    <div className="flex flex-col gap-5">
      <RevopsTable
        title="Workbooks"
        subtitle="Review owners and workbook operating costs."
        icon={<BookOpen className="w-4 h-4" />}
        data={wb.data?.workbooks}
        handleViewMore={handleWookbookViewMore}
        columns={workbookColumns}
        loading={wb.isLoading}
      />
      <RevopsTable
        title="Enrichments"
        subtitle="Prompt and config-driven enrichments."
        icon={<Zap className="w-4 h-4" />}
        data={enrich.data?.enrichments ?? []}
        handleViewMore={handleEnrichViewMore}
        columns={enrichmentColumns}
        loading={enrich.isLoading}
      />
      <RevopsTable
        title="Campbook"
        subtitle="Map workbooks to campaigns."
        icon={<Zap className="w-4 h-4" />}
        data={cambook.data?.cambooks ?? []}
        handleViewMore={handleCambookViewMore}
        columns={cambookColumns}
        loading={cambook.isLoading}
      />
    </div>
  );
}
