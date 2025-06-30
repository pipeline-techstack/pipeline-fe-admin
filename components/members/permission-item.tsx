import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface PermissionItemProps {
  icon: LucideIcon;
  label: string;
  permissions: string[];
  color?: string;
  permissionType: "workbooks" | "prompt" | "CRM";
}
const PermissionItem = ({
  icon: Icon,
  label,
  permissions,
  color,
  permissionType,
}: PermissionItemProps) => {
  if (!permissions || permissions.length === 0) {
    return (
      <div className="flex items-center gap-2 text-gray-400">
        <Icon className="w-4 h-4" />
        <span className="text-sm">{label}: No access</span>
      </div>
    );
  }

  const getPermissionBadgeStyle = (permission: string, type: string) => {
    const styles = {
      workbooks: {
        Editor: "bg-blue-100 text-blue-800",
        Exec: "bg-purple-100 text-purple-800",
      },
      prompt: {
        Editor: "bg-green-100 text-green-800",
      },
      CRM: {
        Get: "bg-orange-100 text-orange-800",
        Admin: "bg-red-100 text-red-800",
      },
    };
    //@ts-expect-error ignore error
    return styles[type]?.[permission] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="flex items-start gap-2">
      <Icon className={`w-4 h-4 mt-0.5 ${color}`} />
      <div className="flex gap-5">
        <div className="font-medium text-gray-700 text-sm">{label}</div>
        <div className="flex flex-wrap gap-1 mt-1">
          {permissions.map((permission, index) => (
            <Badge
              key={index}
              variant="secondary"
              className={`text-xs ${getPermissionBadgeStyle(
                permission,
                permissionType
              )}`}
            >
              {permission}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PermissionItem;
