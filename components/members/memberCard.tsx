import React from "react";
import { Member } from "@/lib/types/member-types";
import { MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils"; // assuming you're using a utility like Tailwind's `clsx`

const getInitials = (email: string) => {
  const namePart = email?.split("@")[0];
  return (
    namePart
      ?.split(".")
      .map((part) => part[0]?.toUpperCase())
      .join("") || "U"
  );
};

const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const MemberCard = ({ member }: { member: Member }) => (
  <div className="group relative bg-white hover:shadow-sm p-6 rounded-5xl text-center transition-shadow">
    <button
      type="button"
      className="top-4 right-4 absolute opacity-0 group-hover:opacity-100 p-1 transition-opacity"
      title="More options"
    >
      <MoreVertical className="w-4 h-4 text-gray-400" />
    </button>

    <div className="flex flex-col items-center">
      <div className="flex justify-center items-center bg-gray-100 mb-4 rounded-full w-20 h-20 font-semibold text-gray-600 text-3xl">
        {getInitials(member.email)}
      </div>
      <h3 className="mb-1 font-semibold text-gray-900 text-lg">
        {member.email.split("@")[0]}
      </h3>
      <p className="mb-6 text-gray-500 text-sm">{member.email}</p>
      <span
        className={cn(
          "inline-block w-full py-2 px-4 rounded text-sm font-medium capitalize",
          member.role === "admin" || member.role === "owner"
            ? "bg-blue-50 text-blue-700 border border-blue-200"
            : "bg-gray-50 text-gray-700 border border-gray-200"
        )}
      >
        {capitalize(member.role)}
      </span>

      <div className="text-sm text-gray-500 mt-2">
        <p>
          <span className="font-medium">Used Rows:</span> {member.usedRows || 0}
        </p>
        <p>
          <span className="font-medium">Row Quota:</span> {member.rowQuota || 0}
        </p>

      </div>
    </div>
  </div>
);

export default MemberCard;
