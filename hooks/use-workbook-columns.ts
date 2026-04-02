import { fetchWorkbookColumns } from "@/services/cambook-apis";
import { Column } from "@/app/(protected)/wb-config/types/api";
import { useState } from "react";


export const useWorkbookColumns = () => {
  const [columns, setColumns] = useState<Column[]>([]);

  const loadColumns = async (workbookId: string): Promise<Column[]> => {
    try {
      const cols = await fetchWorkbookColumns(workbookId);
      setColumns(cols);
      return cols; // ✅ return the data
    } catch (error) {
      console.error("Error loading workbook columns:", error);
      setColumns([]);
      return [];
    }
  };

  return { columns, loadColumns };
};
