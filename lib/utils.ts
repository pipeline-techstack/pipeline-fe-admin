import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Member } from "./types/member-types";

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

export function normalizePermissions(
  flatPermissions: { resource: string; permission: string }[]
): Member["permissions"] {
  const grouped: Member["permissions"] = {
    workbooks: [],
    prompt: [],
    CRM: [],
  };

  flatPermissions.forEach(({ resource, permission }) => {
    const key = resource as keyof Member["permissions"];
    if (grouped[key]) {
      //@ts-expect-error Ignore type error
      grouped[key].push(permission);
    }
  });

  return grouped;
}
