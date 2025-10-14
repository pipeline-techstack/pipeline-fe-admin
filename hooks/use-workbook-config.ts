import { Workbook } from "@/app/(protected)/wb-config/types/api";
import { getWorkbooks } from "@/services/workbook-apis";
import { useState, useEffect, useCallback, useRef } from "react";

export const useWorkbookConfigurations = () => {
  const [workbooks, setWorkbooks] = useState<Workbook[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const pageRef = useRef(page);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  const loadWorkbooks = useCallback(
    async (reset: boolean = false) => {
      if (loading) return;
      setLoading(true);

      try {
        const currentPage = reset ? 1 : pageRef.current;

        const data = await getWorkbooks(currentPage, 30, searchTerm);

        const transformed = data.items.map((item: any) => ({
          id: item.id,
          name: item.name,
        }));

        if (reset) {
          setWorkbooks(transformed);
          setPage(2); // next page
        } else {
          setWorkbooks((prev) => [...prev, ...transformed]);
          setPage((prev) => prev + 1);
        }

        setHasMore(data.has_more ?? false);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [loading, searchTerm]
  );

  const handleSearch = (term: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      setSearchTerm(term);
      setPage(1);
      setWorkbooks([]);
      setHasMore(false);
    }, 300);
  };

  // Initial load and reload on searchTerm change
  useEffect(() => {
    loadWorkbooks(true);
  }, [searchTerm]);

  return { workbooks, loading, hasMore, loadWorkbooks, handleSearch };
};
