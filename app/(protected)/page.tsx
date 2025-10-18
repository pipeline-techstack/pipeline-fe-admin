"use client";
import React, { useState } from "react";
import { OrganizationTable } from "@/components/dashboard/org-table";
import { AddOrganizationDialog } from "@/components/dialog/add-organization";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col flex-1 space-y-6 h-full">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="mb-2 font-bold text-gray-900 text-2xl">
              Organization
            </h1>
            <p className="text-gray-600">
              See subscription details and status for all your organizations
            </p>
          </div>

          <Button
            className="bg-[#4A5BAA] hover:bg-[#3d4c92] text-white"
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
              seats: 1,
            }}
            isEditMode={false}
            onSuccess={() => {
              toast({
                title: "Organization Added",
                description: "New organization has been created successfully.",
                variant: "success",
              });
            }}
          />
        </div>

        <OrganizationTable />
      </div>
    </div>
  );
}
