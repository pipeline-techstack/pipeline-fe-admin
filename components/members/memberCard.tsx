import React from "react";
import { Member } from "@/lib/types/member-types";
import {
  MoreVertical,
  Edit3,
  Trash2,
  Shield,
  Database,
  MessageSquare,
  Users,
} from "lucide-react";
import { cn, getInitials } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import PermissionItem from "./permission-item";

interface MemberCardProps {
  member: Member;
  onEdit?: (userId: string) => void;
  onRemove?: (member: Member) => void;
}

const MemberCard = ({ member, onEdit, onRemove }: MemberCardProps) => {
  const getUsagePercentage = (used: number, quota: number): number => {
    if (quota <= 0) return 0;
    return Math.round((used / quota) * 100);
  };

  const usagePercentage = getUsagePercentage(member.usedRows, member.rowQuota);

  return (
    <div
      key={member.organizationId}
      className="relative flex flex-col items-center bg-accent p-4 border rounded-xl"
    >
      {/* Top Right Menu Icon */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="top-2 right-2 absolute"
          >
            <MoreVertical className="w-4 h-4 text-gray-500" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="space-y-1 p-1 w-32">
          <Button
            variant="ghost"
            className="justify-start hover:bg-gray-100 w-full text-gray-700 text-sm"
            onClick={() => {
              onEdit?.(member._id as string);
            }}
          >
            <Edit3 className="mr-2 w-4 h-4" />
            Edit
          </Button>
          <Button
            variant="ghost"
            className="justify-start hover:bg-red-50 w-full text-red-600 text-sm"
            onClick={() => {
              // TODO: Add delete logic here
              console.log("Delete clicked");
            }}
          >
            <Trash2 className="mr-2 w-4 h-4" />
            Delete
          </Button>
        </PopoverContent>
      </Popover>

      {/* Avatar */}
      <Avatar className="mb-2 w-16 h-16">
        <AvatarFallback className="bg-primary text-white">
          {getInitials(member.email as string)}
        </AvatarFallback>
      </Avatar>

      {/* Email */}
      <div className="text-center">
        <div className="text-gray-600 text-sm">{member.email}</div>
      </div>

      {/* Role Badge */}
      <Badge
        variant="secondary"
        className={`mt-2 px-3 py-1 rounded-full text-sm font-medium capitalize ${
          member.role === "admin" || member.role === "owner"
            ? "bg-green-100 text-green-700"
            : "bg-blue-100 text-blue-700"
        }`}
      >
        {member.role}
      </Badge>

      {/* Quota Usage */}
      <div className="mt-4 w-full">
        <div className="mb-1 text-gray-500 text-xs">Quota usage</div>
        <div className="bg-gray-200 rounded-full w-full h-2 overflow-hidden">
          <div
            className={`h-2 transition-all duration-300 rounded-full ${
              usagePercentage >= 90
                ? "bg-red-500"
                : usagePercentage >= 70
                ? "bg-orange-500"
                : "bg-green-500"
            }`}
            style={{ width: `${Math.min(usagePercentage, 100)}%` }}
          />
        </div>
        <div className="mt-1 text-gray-700 text-xs text-right">
          {/* {member.used.toLocaleString()} / {member.quota.toLocaleString()} rows */}
          ({usagePercentage}%)
        </div>
      </div>

      {/* Permissions Toggle */}
      <div className="mt-4 pt-3 border-t w-full">
        <button
          // onClick={() => setOpenPermissionsId(isOpen ? null : member.id)}
          className="flex justify-between items-center w-full font-medium text-gray-700 text-sm cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Permissions
          </span>
        </button>

        {/* Permissions List */}
        <div className="space-y-2 mt-3 pl-2">
          <PermissionItem
            icon={Database}
            label="Workbooks"
            permissions={member.permissions.workbooks}
            permissionType="workbooks"
            color="text-blue-600"
          />
          <PermissionItem
            icon={MessageSquare}
            label="Prompt"
            permissions={member.permissions.prompt}
            permissionType="prompt"
            color="text-green-600"
          />
          <PermissionItem
            icon={Users}
            label="CRM"
            permissions={member.permissions.CRM}
            permissionType="CRM"
            color="text-purple-600"
          />
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
