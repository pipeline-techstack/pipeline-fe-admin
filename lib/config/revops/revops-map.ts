import { enrichmentColumns, wbConfigColumns, workbookColumns } from "./headers";

export const configMap = {
  workbooks: {
    title: "Workbooks",
    // api: getWorkbooks,
    columns: workbookColumns,
  },
  campbooks: {
    title: "Campbook",
    // api: getCampbooks,
    columns: wbConfigColumns,
  },
  enrichments: {
    title: "Enrichments",
    // api: getEnrichments,
    columns: enrichmentColumns,
  },
};