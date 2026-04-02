"use client";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Fuse from "fuse.js";
import { getCustomers } from "@/services/customers-apis";
import { formatDate } from "@/lib/utils";

export const useCustomers = () => {
  const {
    data: customers = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
    staleTime: 1000 * 60 * 5
  });

  const [search, setSearch] = useState("");

  // 🔍 Fuse setup on RAW data
  const fuse = useMemo(() => {
    return new Fuse(customers, {
      keys: ["firstName", "lastName", "email", "phone_e164"],
      threshold: 0.3,
    });
  }, [customers]);

  // 🔍 Filter RAW data first
  const filteredRawCustomers = useMemo(() => {
    if (!search) return customers;
    return fuse.search(search).map((result) => result.item);
  }, [search, fuse, customers]);

  // 🎯 FORMAT data for UI HERE
  const formattedCustomers = useMemo(() => {
    return filteredRawCustomers.map((item: any) => {
      const modes = [];

      if (item.slack_channel_id) modes.push("Slack");
      if (item.teams_webhook_url) modes.push("Teams");

      return {
        _id: item.userId,
        name: `${item.firstName || ""} ${item.lastName || ""}`.trim(),
        email: item.email || "",
        company: item.companyName || "",
        date: formatDate(item.createdAt),
        phone: item.phone_e164 || "",
        mode: modes, // 👈 now it's an array
      };
    });
  }, [filteredRawCustomers]);

  return {
    customers: formattedCustomers, // ✅ already formatted
    isLoading,
    error,
    search,
    setSearch,
  };
};
