import { BookOpen, Layers, Zap } from "lucide-react";
import { cambookColumns, enrichmentColumns, workbookColumns } from "./headers";
import { useWorkbooks } from "@/hooks/use-wb";
import { useCambook } from "@/hooks/use-cambook";
import { useEnrichments } from "@/hooks/use-enrichment";

export const configMap = {
  workbooks: {
    title: "Workbooks",
    subtitle: "Review owners and workbook operating costs.",
    icon: <BookOpen className="w-4 h-4" />,
    columns: workbookColumns,
    hook: useWorkbooks
  },
  campbooks: {
    title: "Campbook",
    subtitle: "Manage campaign configurations and settings.",
    icon: <Layers className="w-4 h-4" />,
    columns: cambookColumns,
    hook: useCambook
  },
  enrichments: {
    title: "Enrichments",
    subtitle: "Track and monitor enrichment processes.",
    icon: <Zap className="w-4 h-4" />,
    columns: enrichmentColumns,
    hook: useEnrichments
  },
};