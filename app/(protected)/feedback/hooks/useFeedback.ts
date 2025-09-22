"use client";
import { useState, useMemo } from "react";
import { FeedbackFilters, FeedbackLead, FeedbackStatus } from "../types/feedback";
import { useQuery } from "@tanstack/react-query";
// import { getFeedbackData } from "@/services/feedback-apis"; 

export const useFeedbackFilters = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FeedbackFilters>({
    status: 'all',
    searchQuery: '',
    dateRange: { start: "", end: "" }
  });

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setFilters(prev => ({
      ...prev,
      searchQuery: query
    }));
  };

  const handleFilterChange = <K extends keyof FeedbackFilters>(
    filterType: K,
    value: FeedbackFilters[K]
  ) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  return {
    searchQuery,
    filters,
    handleSearchChange,
    handleFilterChange
  };
};

export const useFeedbackData = (filters: FeedbackFilters, searchQuery: string) => {
  // Replace this with your actual API call
  const { data: apiData, isLoading, error } = useQuery({
    queryKey: ["feedback", filters],
    queryFn: () => mockFeedbackApi(filters), // Replace with: getFeedbackData(filters)
    retry: false,
  });

  const filteredData = useMemo(() => {
    if (!apiData) return [];
    
    let filtered = apiData;
    
    // Filter by status
    if (filters.status !== 'all') {
      filtered = filtered.filter(lead => lead.status === filters.status);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(lead => 
        lead.name.toLowerCase().includes(query) ||
        lead.company.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [apiData, filters, searchQuery]);

  return {
    feedbackData: filteredData || [],
    isLoading,
    error
  };
};

// Mock API function - replace with your actual API call
const mockFeedbackApi = async (filters: FeedbackFilters): Promise<FeedbackLead[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock data based on your screenshot - expanded with more realistic data
  const mockData: FeedbackLead[] = [
    {
      id: "1",
      name: "John Smith",
      company: "Scale Revenue",
      timestamp: "2d ago",
      status: FeedbackStatus.FOLLOW_UP,
      hasFollowUp: true,
      feedbackText: "Great service, looking forward to continued partnership",
      rating: 5
    },
    {
      id: "2", 
      name: "Sarah Johnson",
      company: "StartupXYZ",
      timestamp: "5d ago",
      status: FeedbackStatus.RESPONDED,
      feedbackText: "Very professional team, excellent results"
    },
    {
      id: "3",
      name: "Robert Wilson", 
      company: "Manufacturing Co",
      timestamp: "7d ago",
      status: FeedbackStatus.RESPONDED,
    },
    {
      id: "4",
      name: "Lisa Chen",
      company: "Digital Agency",
      timestamp: "10d ago", 
      status: FeedbackStatus.FOLLOW_UP,
      hasFollowUp: true
    },
    {
      id: "5",
      name: "Michael Brown",
      company: "Tech Solutions",
      timestamp: "12d ago",
      status: FeedbackStatus.RESPONDED,
      feedbackText: "Outstanding lead quality and response times"
    },
    {
      id: "6",
      name: "Emily Davis",
      company: "Growth Partners",
      timestamp: "15d ago",
      status: FeedbackStatus.FOLLOW_UP,
    },
    {
      id: "7",
      name: "James Miller",
      company: "Innovation Labs",
      timestamp: "18d ago",
      status: FeedbackStatus.RESPONDED,
      feedbackText: "Exceeded our expectations, highly recommend"
    },
    {
      id: "8",
      name: "Amanda Wilson",
      company: "Venture Capital",
      timestamp: "20d ago",
      status: FeedbackStatus.FOLLOW_UP
    }
  ];

  return mockData;
};