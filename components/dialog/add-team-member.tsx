"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TeamMemberFormData } from "@/lib/types/member-types";
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
import { addTeamMember } from "@/lib/api";

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
  const [member, setMemberForm] = useState<TeamMemberFormData>({
    name: "",
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
        quota: parseInt(member.quota),
        role: member.role,
      });

      // Reset form
      setMemberForm({
        name: "",
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
      onMemberAdded?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add member");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAddMemberOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-lg shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Add New Team Member</h2>
            <p className="mt-1 text-sm text-gray-600">
              Add a new member to your team. They will receive an invitation email.
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsAddMemberOpen(false)}
            className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Form Content - Scrollable */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-gray-900">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={member.email}
                onChange={(e) => handleFormChange("email", e.target.value)}
                placeholder="john@example.com"
                className="w-full border-gray-300 text-gray-900 placeholder:text-gray-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quota" className="text-sm font-semibold text-gray-900">
                Add Quota
              </Label>
              <Input
                id="quota"
                type="number"
                min="0"
                value={member.quota}
                onChange={handleQuotaChange}
                placeholder="1000"
                className="w-full border-gray-300 text-gray-900 placeholder:text-gray-500"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="role" className="text-sm font-semibold text-gray-900">
                Role
              </Label>
              <Select
                value={member.role}
                onValueChange={(value) => handleFormChange("role", value)}
              >
                <SelectTrigger className="w-full border-gray-300 text-gray-900">
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
            <div className="pt-4 border-t border-gray-200">
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
        <div className="flex gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-lg flex-shrink-0">
          <Button
            variant="outline"
            onClick={() => setIsAddMemberOpen(false)}
            className="flex-1 border-gray-300 text-gray-900 hover:bg-gray-100"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid || isSubmitting}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Adding..." : "Add Member"}
          </Button>
        </div>
      </div>
    </div>
  );
}