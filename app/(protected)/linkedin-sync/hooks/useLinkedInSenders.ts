"use client";

import { useState, useEffect } from 'react';
import { LinkedInSenderProfile } from '../types/sender';

const mockSenders: LinkedInSenderProfile[] = [
  {
    id: 's1',
    name: 'Sarah Johnson',
    email: 'sarah.j@company.com',
    status: 'active',
    messages_sent: 142,
    engagement_rate: 24.5,
    created_at: '2024-01-01T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 's2',
    name: 'Michael Chen',
    email: 'michael.c@company.com',
    status: 'active',
    messages_sent: 98,
    engagement_rate: 19.8,
    created_at: '2024-01-01T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 's3',
    name: 'Emma Davis',
    email: 'emma.d@company.com',
    status: 'inactive',
    messages_sent: 67,
    engagement_rate: 15.2,
    created_at: '2024-01-01T10:00:00Z',
    updated_at: '2024-01-10T10:00:00Z'
  }
];

export const useLinkedInSenders = () => {
  const [senders, setSenders] = useState<LinkedInSenderProfile[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        setSenders(mockSenders);
        setTotal(mockSenders.length);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const refreshSenders = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setSenders(mockSenders);
      setTotal(mockSenders.length);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    senders,
    total,
    isLoading,
    error,
    refreshSenders
  };
};