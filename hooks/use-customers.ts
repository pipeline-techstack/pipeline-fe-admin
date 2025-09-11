"use client";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Fuse from "fuse.js";
import { getCustomers } from "@/services/customers-apis";

export const useCustomerSearch = () => {
  const {
    data: customers = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });

  const [search, setSearch] = useState("");

  // 🔍 Setup Fuse.js for fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(customers, {
      keys: ["firstName", "lastName", "email", "phone_e164"],
      threshold: 0.3,
    });
  }, [customers]);

  const filteredCustomers = useMemo(() => {
    if (!search) return customers;
    return fuse.search(search).map((result) => result.item);
  }, [search, fuse, customers]);

  return {
    customers: filteredCustomers,
    isLoading,
    error,
    search,
    setSearch,
  };
};
