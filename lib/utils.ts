import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { EditMemberFormData, Member } from "./types/member-types";
import { Permission, PostUserResourcesPyaload, User } from "./types/resource-types";
import { Feature } from "framer-motion";
import { DEFAULT_FEATURES } from "@/app/(protected)/customers/new/_components/customer.constants";

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
  permissions: Permission[] | null | undefined
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