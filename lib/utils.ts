import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { EditMemberFormData, Member } from "./types/member-types";
import { PostUserResourcesPyaload, User } from "./types/resource-types";

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

// export function transformToEditForm(member: any): EditMemberFormData {
//   const permissionMap: EditMemberFormData["permissions"] = {
//     workbooks: [],
//     prompt: [],
//     CRM: [],
//   };

//   if (member.permissions && Array.isArray(member.permissions)) {
//     for (const perm of member.permissions) {
//       const resource = perm.resource as keyof typeof permissionMap;
//       if (permissionMap[resource]) {
//         permissionMap[resource].push(perm.permission);
//       }
//     }
//   }

//   return {
//     memberId: member.userId,
//     email: member.email,
//     organizationId: member.organizationId,
//     quota: String(member.rowQuota), // form expects string
//     addQuota: 0,
//     reduceQuota: 0,
//     role: member.role,
//     permissions: permissionMap,
//   };
// }


export const filterPermissions = (
  users: User[]
): PostUserResourcesPyaload[] => {
  if (!Array.isArray(users)) return [];

  return users
    .filter((user) => typeof user.email === "string")
    .map((user) => ({
      email: user.email,
      permissions: Array.isArray(user.permissions)
        ? user.permissions.map((perm) => ({
            ...perm,
            resource: perm.resource === "*" ? "all-tabs" : perm.resource,
          }))
        : [],
    }));
};

