import { BookOpen, Layers, Zap } from "lucide-react";
import { enrichmentColumns, wbConfigColumns, workbookColumns } from "./headers";

export const configMap = {
  workbooks: {
    title: "Workbooks",
    subtitle: "Review owners and workbook operating costs.",
    icon: <BookOpen className="w-4 h-4" />,
    columns: workbookColumns,
  },
  campbooks: {
    title: "Campbook",
    subtitle: "Manage campaign configurations and settings.",
    icon: <Layers className="w-4 h-4" />,
    columns: wbConfigColumns,
  },
  enrichments: {
    title: "Enrichments",
    subtitle: "Track and monitor enrichment processes.",
    icon: <Zap className="w-4 h-4" />,
    columns: enrichmentColumns,
  },
};