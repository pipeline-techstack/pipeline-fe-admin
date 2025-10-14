"use client";

import { useState, useEffect, useCallback } from 'react';
import { CampaignTask } from '../types/campaign';
import { getAdminTasks } from '../services/campaign-apis';
import { toast } from 'sonner';

export const useCampaignTasks = (statusFilter?: string) => {
  const [campaigns, setCampaigns] = useState<CampaignTask[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCampaigns = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await getAdminTasks(statusFilter);
      
      // The API returns { tasks: [...] }
      if (response.tasks && Array.isArray(response.tasks)) {
        setCampaigns(response.tasks);
        setTotal(response.total || response.tasks.length);
      } else {
        // Fallback if structure is different
        setCampaigns([]);
        setTotal(0);
      }
      
    } catch (err) {
      const error = err as Error;
      setError(error);
      console.error('Error fetching campaign tasks:', error);
      toast.error('Failed to fetch campaigns', {
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  const refreshCampaigns = async () => {
    await fetchCampaigns();
  };

  return {
    campaigns,
    total,
    isLoading,
    error,
    refreshCampaigns
  };
};