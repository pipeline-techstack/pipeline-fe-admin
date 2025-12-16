"use client";
import React, { useState } from "react";
import { PromptsTable } from "@/components/dashboard/prompts-table";
import { AddPromptDialog } from "@/components/dialog/add-prompt-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PageHeader from "@/components/ui/page-header";

export default function PromptsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col flex-1 space-y-6 h-full">
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <PageHeader
            title="Prompts"
            subtitle="Manage and view all prompt engagements"
          />

          <Button
            className="bg-primary hover:bg-primary/90 text-white"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="mr-2 w-4 h-4" />
            Add Prompt
          </Button>
        </div>

        <PromptsTable />
      </div>

      <AddPromptDialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}