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

interface AddTeamMemberDialogProps {
  isAddMemberOpen: boolean;
  setIsAddMemberOpen: (open: boolean) => void;
}

export function AddTeamMemberDialog({
  isAddMemberOpen,
  setIsAddMemberOpen,
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

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.email);
  const isFormValid =
    member.name && isEmailValid && member.quota && member.role;

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

  const handleSubmit = () => {
    if (!isFormValid) return;

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
  };

  if (!isAddMemberOpen) return null;

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-20 p-4">
      <div className="relative bg-white shadow-xl p-6 border rounded-lg w-screen max-w-5xl">
        <Button
          onClick={() => setIsAddMemberOpen(false)}
          className="top-4 right-4 absolute text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </Button>

        <div className="mb-6">
          <h2 className="font-semibold text-lg">Add New Team Member</h2>
          <p className="mt-1 text-gray-500 text-sm">
            Add a new member to your team. They will receive an invitation
            email.
          </p>
        </div>

        <div className="space-y-4">
          <div className="items-center gap-4 grid grid-cols-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={member.name}
              onChange={(e) => handleFormChange("name", e.target.value)}
              placeholder="John Doe"
              className="col-span-3"
            />
          </div>
          <div className="items-center gap-4 grid grid-cols-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={member.email}
              onChange={(e) => handleFormChange("email", e.target.value)}
              placeholder="john@example.com"
              className="col-span-3"
            />
          </div>
          <div className="items-center gap-4 grid grid-cols-4">
            <Label htmlFor="quota" className="text-right">
              Quota
            </Label>
            <Input
              id="quota"
              type="number"
              value={member.quota}
              onChange={(e) => handleFormChange("quota", e.target.value)}
              placeholder="1000"
              className="col-span-3"
            />
          </div>
          <div className="items-center gap-4 grid grid-cols-4">
            <Label htmlFor="role" className="text-right">
              Role
            </Label>
            <Select
              value={member.role}
              onValueChange={(value) => handleFormChange("role", value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="member"> Team Member</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {member.role !== "admin" && (
            <PermissionCheckboxes
              formPermissions={member.permissions}
              setFormPermissions={(section, value) =>
                handleFormChange("permissions", value, section)
              }
            />
          )}
        </div>

        <div className="flex gap-2 pt-4">
          <Button
            variant="outline"
            onClick={() => setIsAddMemberOpen(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
          >
            Add Member
          </Button>
        </div>
      </div>
    </div>
  );
}
