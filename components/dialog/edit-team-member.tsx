import React, { useEffect, useState } from "react";
import { LoadingButton } from "../loader-button";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import PermissionCheckboxes from "../members/permission-checkboxes";
import { EditMemberFormData } from "@/lib/types/member-types";
import { editTeamMember } from "@/services/member-apis";

interface EditTeamMemberProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  organizationId: string;
  members: any[]; // the full list from your API
  memberId: string;
}

const EditTeamMember: React.FC<EditTeamMemberProps> = ({
  isOpen,
  setIsOpen,
  organizationId,
  members,
  memberId,
}) => {
  const [member, setMemberForm] = useState<EditMemberFormData>({
    memberId: "",
    email: "",
    quota: "1000",
    role: "admin",
    addQuota: 0,
    reduceQuota: 0,
    permissions: {
      workbooks: [],
      prompt: [],
      CRM: [],
    },
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen && members.length > 0) {
      const matched = members.find((m) => m.userId === memberId);
      if (matched) {
        setMemberForm(matched);
      }
    }
  }, [isOpen, memberId, members]);

  const handleFormChange = (
    field: keyof EditMemberFormData | "permissions",
    value: string,
    section?: keyof EditMemberFormData["permissions"],
    isSelectAll = false
  ) => {
    if (field === "permissions" && section) {
      setMemberForm((prev) => {
        const current = prev.permissions[section];
        //@ts-expect-error Ignore type error
        const alreadyHas = current.includes(value);
        const updated =
          isSelectAll || !alreadyHas
            ? [...new Set([...current, value])]
            : current.filter((v) => v !== value);

        return {
          ...prev,
          permissions: {
            ...prev.permissions,
            [section]: updated,
          },
        };
      });
    } else {
      setMemberForm((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      await editTeamMember({
        memberId,
        organizationId,
        addQuota: Number(member.addQuota),
        reduceQuota: Number(member.reduceQuota),
        role: member.role,
        permissions: member.permissions,
        email: member.email,
        quota: member.quota,
      });

      setIsOpen(false); // Close modal
    } catch (err: any) {
      setError(err.message || "Failed to update team member");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = member.email.trim() !== "";

  if (!isOpen) return null;

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/50 p-4">
      <div className="relative flex flex-col bg-white shadow-xl rounded-lg w-full max-w-2xl max-h-[90vh]">
        {/* Header */}
        <div className="flex flex-shrink-0 justify-between items-center p-6 border-gray-200 border-b">
          <div>
            <h2 className="font-semibold text-gray-900 text-xl">
              Edit Team Member
            </h2>
            <p className="mt-1 text-gray-600 text-sm">
              Edita member to your team.
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="p-0 w-8 h-8 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Form Content - Scrollable */}
        <div className="flex-1 space-y-6 p-6 overflow-y-auto">
          {error && (
            <div className="bg-red-50 p-3 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="font-semibold text-gray-900 text-sm"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={member.email}
                onChange={(e) => handleFormChange("email", e.target.value)}
                placeholder="john@example.com"
                className="border-gray-300 w-full text-gray-900 placeholder:text-gray-500"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="addQuota"
                className="font-semibold text-gray-900 text-sm"
              >
                Add Quota
              </Label>
              <Input
                id="addQuota"
                type="number"
                min="0"
                value={member.addQuota}
                onChange={(e) => handleFormChange("addQuota", e.target.value)}
                placeholder="1000"
                className="border-gray-300 w-full text-gray-900 placeholder:text-gray-500"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="reduceQuota"
                className="font-semibold text-gray-900 text-sm"
              >
                Reduce Quota
              </Label>
              <Input
                id="reduceQuota"
                type="number"
                min="0"
                value={member.reduceQuota}
                onChange={(e) =>
                  handleFormChange("reduceQuota", e.target.value)
                }
                placeholder="500"
                className="border-gray-300 w-full text-gray-900 placeholder:text-gray-500"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label
                htmlFor="role"
                className="font-semibold text-gray-900 text-sm"
              >
                Role
              </Label>
              <Select
                value={member.role}
                onValueChange={(value) => handleFormChange("role", value)}
              >
                <SelectTrigger className="border-gray-300 w-full text-gray-900">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">Team Member</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Permissions Section */}
          {member.role !== "admin" && (
            <div className="pt-4 border-gray-200 border-t">
              <PermissionCheckboxes
                formPermissions={member.permissions}
                setFormPermissions={(section, value) =>
                  handleFormChange("permissions", value, section)
                }
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-shrink-0 gap-3 bg-gray-50 p-6 border-gray-200 border-t rounded-b-lg">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="flex-1 hover:bg-gray-100 border-gray-300 text-gray-900"
            // disabled={isSubmitting}
          >
            Cancel
          </Button>
          <LoadingButton
            isLoading={isSubmitting}
            disabled={!isFormValid}
            loadingText="Editing member..."
            onClick={handleSubmit}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white disabled:text-gray-500 disabled:cursor-not-allowed"
          >
            Edit Member
          </LoadingButton>
        </div>
      </div>
    </div>
  );
};

export default EditTeamMember;
