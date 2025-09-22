"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FeedbackFilters, FeedbackStatus, FeedbackLead } from "../types/feedback";
import { getFeedbackData } from "../services/feedback-apis";

export const useFeedbackData = (filters: FeedbackFilters, searchQuery: string) => {
  const { data: apiData, isLoading, error } = useQuery<FeedbackLead[]>({
    queryKey: ["feedback", filters, searchQuery],
    queryFn: () => getFeedbackData(),
    retry: false,
  });

  const filteredData = useMemo(() => {
    if (!apiData) return [];

    let filtered = apiData;

    // Filter by status
    if (filters.status !== "all") {
      filtered = filtered.filter((lead) => lead.status === filters.status);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (lead) =>
          lead.name?.toLowerCase().includes(query) || // <-- use `name` instead of `lead_name`
          lead.company?.toLowerCase().includes(query) // <-- use `company` instead of `client_name`
      );
    }

    return filtered;
  }, [apiData, filters, searchQuery]);

  return {
    feedbackData: filteredData || [],
    isLoading,
    error,
  };
};

export const useFeedbackFilters = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FeedbackFilters>({
    status: "all",
    searchQuery: "",
    dateRange: { start: "", end: "" },
  });

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  };

  const handleFilterChange = <K extends keyof FeedbackFilters>(filterType: K, value: FeedbackFilters[K]) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  return { searchQuery, filters, handleSearchChange, handleFilterChange };
};
