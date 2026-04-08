import { BookOpen, Layers, Shield, Zap } from "lucide-react";
import {
  campbookColumns,
  enrichmentColumns,
  workbookColumns,
} from "./headers";

import { useWorkbooks } from "@/hooks/use-wb";
import { useEnrichments } from "@/hooks/use-enrichment";
import { EnrichPromptsDialogue } from "@/app/(protected)/customers/new/_components/revops/EnrichPromptsDialogue";
import { useCampbook } from "@/hooks/use-campbook";

export const configMap = {
  workbooks: {
    title: "Workbooks",
    subtitle: "Review owners and workbook operating costs.",
    icon: <BookOpen className="w-4 h-4" />,
    getColumns: workbookColumns,
    hook: useWorkbooks,
    Dialog: null,
    dataKey: "workbooks",
    route: "workbooks",
    isPaginated: true,
  },

  campbooks: {
    title: "Campbook",
    subtitle: "Manage campaign configurations and settings.",
    icon: <Layers className="w-4 h-4" />,
    getColumns: campbookColumns,
    hook: useCampbook,
    Dialog: null,
    dataKey: "campbooks",
    route: "campbooks",
    isPaginated: false,
  },

  enrichments: {
    title: "Enrichments",
    subtitle: "Track and monitor enrichment processes.",
    icon: <Zap className="w-4 h-4" />,
    getColumns: enrichmentColumns,
    hook: useEnrichments,
    Dialog: EnrichPromptsDialogue,
    dataKey: "enrichments",
    route: "enrichments",
    isPaginated: false,
  },
};