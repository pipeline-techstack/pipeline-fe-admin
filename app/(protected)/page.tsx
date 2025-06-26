"use client";
import React from "react";
import { OrganizationTable } from "@/components/dashboard/org-table";
import { AddOrganizationDialog } from "@/components/dialog/add-organization";

export default function Home() {
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

          <AddOrganizationDialog />
        </div>
        <OrganizationTable />
      </div>
    </div>
  );
}
