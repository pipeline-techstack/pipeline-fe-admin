"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DataTable } from "@/components/common/table/data-table";
import { getOrganizations, disableOrganization } from "@/services/org-apis";
import { getOrganizationColumns } from "./org-columns";
import { DisableOrganizationDialog } from "./org-dialog";
import { toast } from "@/hooks/use-toast";
import { OrganizationData } from "@/lib/types/org-types";
import { AddOrganizationDialog } from "@/components/dialog/add-organization";

interface ExtendedOrganizationData extends OrganizationData {
  checked: boolean;
}

export function OrganizationTable() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [editOrg, setEditOrg] = useState<OrganizationData | null>(null);
  const [data, setData] = useState<ExtendedOrganizationData[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: "",
    message: "",
    id: "",
  });

  const {
    data: fetchedData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["organizations"],
    queryFn: getOrganizations,
    retry: false,
  });

  useEffect(() => {
    if (fetchedData) {
      setData(
        fetchedData.data.map((d: OrganizationData) => ({
          ...d,
          checked: false,
        })),
      );
    }
  }, [fetchedData]);

  // ✅ EDIT
  const handleEdit = (org: OrganizationData) => {
    setEditOrg(org);
    setIsModalOpen(true);
  };

  // ✅ OPEN DISABLE DIALOG
  const handleDisableClick = (id: string) => {
    setConfirmDialog({
      open: true,
      title: "Disable Organization",
      message: "Are you sure you want to disable this organization?",
      id,
    });
  };

  // ✅ CONFIRM DISABLE
  const handleDisable = async () => {
    try {
      setLoading(true);

      const res = await disableOrganization(confirmDialog.id);

      queryClient.invalidateQueries({ queryKey: ["organizations"] });

      setConfirmDialog((prev) => ({ ...prev, open: false }));

      if (res) {
        toast({
          title: "Organization Disabled",
          description: "Organization has been disabled successfully.",
          variant: "success",
        });
      }
    } catch (error) {
      console.error(error);

      toast({
        title: "Error",
        description: "Failed to disable the organization.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const columns = getOrganizationColumns(
    router,
    handleEdit,
    handleDisableClick, 
  );

  const pageSize = 10;
  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const totalPages = Math.ceil(data.length / pageSize);

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="border-gray-900 border-b-2 rounded-full w-8 h-8 animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 text-red-600">Error: {(error as Error).message}</div>
    );
  }

  return (
    <>
      <DataTable
        data={paginatedData}
        columns={columns}
        onRowClick={(row) => router.push(`/organization/${row._id}`)}
        footer={true}
        total={data.length}
        currentPage={currentPage}
        pageSize={pageSize}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* ✅ Disable Dialog */}
      <DisableOrganizationDialog
        open={confirmDialog.open}
        title={confirmDialog.title}
        message={confirmDialog.message}
        loading={loading}
        onConfirm={handleDisable}
        onClose={(open) => setConfirmDialog((prev) => ({ ...prev, open }))}
      />

      {/* ✅ Add/Edit Organization Dialog */}
      {isModalOpen && (
        <AddOrganizationDialog
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditOrg(null);
          }}
          defaultValues={{
            id: editOrg?._id,
            organizationName: editOrg?.name || "",
            email: editOrg?.email || "",
            quota: editOrg?.monthlyQuota || 0,
            enterpriseId: editOrg?.enterprisePriceId || "",
            seats: editOrg?.seats || 1,
          }}
          isEditMode={true}
        />
      )}
    </>
  );
}