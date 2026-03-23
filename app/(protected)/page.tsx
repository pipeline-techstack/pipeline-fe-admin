"use client";
import { useState } from "react";

import { AddOrganizationDialog } from "@/components/dialog/add-organization";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import PageWrapper from "@/components/common/page-wrapper";
import { OrganizationTable } from "./organization/_components/org-table";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <PageWrapper
      title="Organizations"
      subtitle="See subscription details and status for all your organizations"
      rightComponent={
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 w-4 h-4" />
          Add Organization
        </Button>
      }
    >
      <OrganizationTable />

      <AddOrganizationDialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
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
            description:
              "New organization has been created successfully.",
            variant: "success",
          });
        }}
      />
    </PageWrapper>
  );
}