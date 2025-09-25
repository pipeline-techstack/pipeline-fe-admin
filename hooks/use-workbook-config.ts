import { fetchWorkbookConfigurations } from "@/app/(protected)/wb-config/services/config-apis";
import { WorkbookConfiguration } from "@/app/(protected)/wb-config/types/api";
import { useEffect, useState } from "react";


export const useWorkbookConfigurations = () => {
  const [workbooks, setWorkbooks] = useState<WorkbookConfiguration[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchWorkbookConfigurations();
        setWorkbooks(data);
      } catch (e) {
        console.error("Error loading workbooks:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { workbooks, loading };
};
