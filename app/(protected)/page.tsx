"use client";
import React from "react";
import { OrganizationTable } from "@/components/dashboard/org-table";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 space-y-6 h-full">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="mb-2 font-bold text-gray-900 text-2xl">
            Organization
          </h1>
          <p className="text-gray-600">
            See subscription details and status for all your organizations
          </p>
        </div>
        <OrganizationTable />
      </div>
    </div>
  );
}
