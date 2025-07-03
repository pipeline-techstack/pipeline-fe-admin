"use client";
import React, { useState } from "react";
import { OrganizationTable } from "@/components/dashboard/org-table";
import { AddOrganizationDialog } from "@/components/dialog/add-organization";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="flex flex-col flex-1 space-y-6 h-full">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="mb-2 font-medium text-gray-900 text-2xl">
              Organization
            </h1>
            <p className="text-gray-600">
              See subscription details and status for all your organizations
            </p>
          </div>

          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="mr-2 w-4 h-4" />
            Add Organization
          </Button>

          <AddOrganizationDialog
            open={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
            }}
            defaultValues={{
              organizationName: "",
              email: "",
              quota: 0,
              enterpriseId: "",
            }}
            isEditMode={false}
          />
        </div>
        <OrganizationTable />
      </div>
    </div>
  );
}
