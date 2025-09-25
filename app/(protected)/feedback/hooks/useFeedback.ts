"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FeedbackFilters, FeedbackLead, FeedbackItem } from "../types/feedback";
import { getFeedbackData } from "../services/feedback-apis";

export const useFeedbackData = () => {
  const { data, isLoading, error } = useQuery<{
    items: FeedbackItem[];
    total?: number;
  }>({
    queryKey: ["feedback-kanban"],
    queryFn: () => getFeedbackData(),
    retry: false,
  });

  return {
    feedbackData: data?.items || [],
    total: data?.total || data?.items?.length || 0,
    isLoading,
    error,
  };
};

// Legacy hook (keeping for backward compatibility with existing components)
export const useFeedbackDataPaginated = (
  filters: FeedbackFilters,
  searchQuery: string,
  page: number,
  limit: number
) => {
  const { data, isLoading, error } = useQuery<{
    data: FeedbackLead[];
    total: number;
  }>({
    queryKey: ["feedback", filters, searchQuery, page, limit],
    queryFn: () => getFeedbackDataLegacy(filters, searchQuery, page, limit),
    retry: false,
  });

  return {
    feedbackData: data?.data || [],
    total: data?.total || 0,
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

  const handleFilterChange = <K extends keyof FeedbackFilters>(
    filterType: K,
    value: FeedbackFilters[K]
  ) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  return { searchQuery, filters, handleSearchChange, handleFilterChange };
};

// Mock legacy function 
const getFeedbackDataLegacy = async (
  filters: FeedbackFilters,
  searchQuery: string,
  page: number,
  limit: number
): Promise<{ data: FeedbackLead[]; total: number }> => {
  return { data: [], total: 0 };
};