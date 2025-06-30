"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Member, TeamMemberFormData } from "@/lib/types/member-types";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import PermissionCheckboxes from "../members/permission-checkboxes";
import { addTeamMember } from "@/services/member-apis";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { LoadingButton } from "@/components/loader-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface AddTeamMemberDialogProps {
  isAddMemberOpen: boolean;
  setIsAddMemberOpen: (open: boolean) => void;
  organizationId: string;
  onMemberAdded?: () => void;
}

export function AddTeamMemberDialog({
  isAddMemberOpen,
  setIsAddMemberOpen,
  organizationId,
  onMemberAdded,
}: AddTeamMemberDialogProps) {
  const queryClient = useQueryClient();
  const { id } = useParams();

  const [member, setMemberForm] = useState<TeamMemberFormData>({
    email: "",
    quota: "",
    role: "admin",
    permissions: {
      workbooks: [],
      prompt: [],
      CRM: [],
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.email);
  const isQuotaValid = member.quota && parseInt(member.quota) >= 0;
  const isFormValid = isEmailValid && isQuotaValid && member.role;

  const handleFormChange = (
    field: keyof TeamMemberFormData | "permissions",
    value: string,
    section?: keyof TeamMemberFormData["permissions"],
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

  const handleQuotaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || (parseInt(value) >= 0 && !isNaN(parseInt(value)))) {
      handleFormChange("quota", value);
    }
  };

  const handleSubmit = async () => {
    if (!isFormValid) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await addTeamMember({
        organizationId,
        email: member.email,
        quota: member.quota,
        role: member.role,
        permissions: member.permissions,
      });

      // Reset form
      setMemberForm({
        email: "",
        quota: "",
        role: "admin",
        permissions: {
          workbooks: [],
          prompt: [],
          CRM: [],
        },
      });

      setIsAddMemberOpen(false);
      queryClient.invalidateQueries({ queryKey: ["organization", id] });
      onMemberAdded?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add member");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAddMemberOpen) return null;

  return (
    <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
      <DialogContent className="p-0 max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <DialogHeader className="p-4">
          <DialogTitle>Add Team Member</DialogTitle>
          <DialogDescription className="text-gray-600">
            Add a member of your team. You can adjust role, quota, and
            permissions.
          </DialogDescription>
        </DialogHeader>

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
                htmlFor="quota"
                className="font-semibold text-gray-900 text-sm"
              >
                Add Quota
              </Label>
              <Input
                id="quota"
                type="number"
                min="0"
                value={member.quota}
                onChange={handleQuotaChange}
                placeholder="1000"
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
            onClick={() => setIsAddMemberOpen(false)}
            className="flex-1 hover:bg-gray-100 border-gray-300 text-gray-900"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <LoadingButton
            isLoading={isSubmitting}
            disabled={!isFormValid}
            loadingText="Adding member..."
            onClick={handleSubmit}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white disabled:text-gray-500 disabled:cursor-not-allowed"
          >
            Add Member
          </LoadingButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
