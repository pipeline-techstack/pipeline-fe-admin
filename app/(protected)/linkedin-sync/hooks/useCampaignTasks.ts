"use client";

import { useState, useEffect } from 'react';
import { CampaignTask } from '../types/campaign';

const mockCampaigns: CampaignTask[] = [
  {
    id: '1',
    campaign_id: 'camp_001',
    campaign_name: 'Q1 Outreach Campaign',
    linkedin_senders: [
      { id: 's1', name: 'Sarah Johnson' },
      { id: 's2', name: 'Michael Chen' }
    ],
    task_type: 'create',
    status: 'active',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    campaign_id: 'camp_002',
    campaign_name: 'Product Launch Sequence',
    linkedin_senders: [
      { id: 's3', name: 'Emma Davis' }
    ],
    task_type: 'update',
    status: 'active',
    created_at: '2024-01-10T10:00:00Z',
    updated_at: '2024-01-14T10:00:00Z'
  }
];

export const useCampaignTasks = () => {
  const [campaigns, setCampaigns] = useState<CampaignTask[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        setCampaigns(mockCampaigns);
        setTotal(mockCampaigns.length);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const refreshCampaigns = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setCampaigns(mockCampaigns);
      setTotal(mockCampaigns.length);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    campaigns,
    total,
    isLoading,
    error,
    refreshCampaigns
  };
};