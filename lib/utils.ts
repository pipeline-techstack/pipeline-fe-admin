import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  Permission,
} from "./types/resource-types";
import { Feature } from "framer-motion";
import { DEFAULT_FEATURES } from "@/app/(protected)/customers/new/_components/customer.constants";
import { normalizeStatus } from "./config/senders/headers";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date values (YYYY-MM-DD)
export const formatDate = (dateString: string) => {
  if (!dateString) return null;

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
};

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const getInitials = (email: string) => {
  const namePart = email?.split("@")[0];
  return (
    namePart
      ?.split(".")
      .map((part) => part[0]?.toUpperCase())
      .join("") || "U"
  );
};

export async function copyToClipboard(text: string): Promise<boolean> {
  if (!text) return false;

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Copy failed:", err);
    return false;
  }
}
export function normalizePermissions(
  permissions: Permission[] | null | undefined,
): Feature[] {
  // If API returns empty or invalid → fallback
  if (!permissions || permissions.length === 0) {
    return DEFAULT_FEATURES;
  }

  // Map API permissions → Feature[]
  const features: Feature[] = permissions.map((perm) => ({
    id: perm.resource,
    label: capitalize(perm.resource),
  }));

  return features;
}

export const formatCurrency = (amount: number) => {
  return `$${amount.toFixed(3)}`;
};

export const calculatePercentage = (cost: number, total: number) => {
  return `${Math.round((cost / total) * 100)}%`;
};

export const getStatusBg = (status: string): string => {
  switch (normalizeStatus(status)) {
    case "active":      return "bg-green-500";
    case "less active": return "bg-yellow-500";
    case "inactive":    return "bg-red-500";
    default:            return "bg-gray-300";
  }
};

export const getStatusTextColor = (status: string): string => {
  switch (normalizeStatus(status)) {
    case "active":      return "text-green-500";
    case "less active": return "text-yellow-500";
    case "inactive":    return "text-red-500";
    default:            return "text-gray-500";
  }
};

export const formatNumber = (num: number) => {
  return num.toLocaleString();
};

export const getLast30DaysRange = () => {
  const today = new Date();

  const end = new Date(today);
  const start = new Date(today);
  start.setDate(start.getDate() - 30);

  const format = (date: Date) =>
    date.toISOString().split("T")[0]; // YYYY-MM-DD

  return {
    start_date: format(start),
    end_date: format(end),
  };
};