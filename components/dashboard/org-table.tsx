"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  MoreHorizontal,
  Edit,
  Trash2,
  FolderKanban,
  Loader2,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { disableOrganization, getOrganizations } from "@/services/org-apis";
import { formatDate } from "@/lib/utils";
import { OrganizationData } from "@/lib/types/org-types";
import { AddOrganizationDialog } from "@/components/dialog/add-organization";
import { toast } from "@/hooks/use-toast";

interface ExtendedOrganizationData extends OrganizationData {
  checked: boolean;
}

export function OrganizationTable() {
  const queryClient = useQueryClient();
  const [editOrg, setEditOrg] = useState<OrganizationData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<ExtendedOrganizationData[]>([]);
  const [loading, setLoading] = useState(false);
  const [orgId, setOrgId] = useState("");
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    title: string;
    message: string;
  }>({ open: false, title: "", message: "" });
  const router = useRouter();

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
        }))
      );
    }
  }, [fetchedData]);

  const allSelected = data.length > 0 && data.every((i) => i.checked);
  const someSelected = data.some((i) => i.checked) && !allSelected;
  const selectedCount = data.filter((i) => i.checked).length;

  const selectAllRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const input = selectAllRef.current?.querySelector("input");
    if (input) input.indeterminate = someSelected;
  }, [someSelected]);

  const toggleCheckbox = (id: string, checked: boolean) => {
    setData((prev) => prev.map((i) => (i._id === id ? { ...i, checked } : i)));
  };

  const toggleAll = (checked: boolean) =>
    setData((prev) => prev.map((i) => ({ ...i, checked })));

  const handleRowClick = (id: string, e: React.MouseEvent) => {
    const el = e.target as HTMLElement;
    if (el.closest("[role=checkbox], [data-dropdown-trigger], button")) return;
    router.push(`/organization/${id}`);
  };

  const showConfirm = (title: string, message: string) =>
    setConfirmDialog({ open: true, title, message });

  const handleEdit = (org: OrganizationData) => {
    setEditOrg(org);
    setIsModalOpen(true);
  };

  const handleDisable = async () => {
    try {
      setLoading(true);
      const res = await disableOrganization(orgId as string);
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
      setConfirmDialog((p) => ({ ...p, open: false }));
      if (res) {
        toast({
          title: "Organization Disabled",
          description: "Organization has been disabled successfully.",
          variant: "success",
        });
      }
    } catch (error) {
      console.error("Error disabling the organization:", error);
      toast({
        title: "Error",
        description: "Failed to disable the organization.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBulkDelete = () => {
    const count = data.filter((i) => i.checked).length;
    showConfirm(
      "Disable Organizations",
      `Are you sure you want to disable ${count} organization${
        count > 1 ? "s" : ""
      }? This cannot be undone.`
    );
  };

  if (isLoading)
    return (
      <div className="flex justify-center py-8">
        <div className="border-gray-900 border-b-2 rounded-full w-8 h-8 animate-spin"></div>
      </div>
    );
  if (isError)
    return (
      <div className="p-4 text-red-600">Error: {(error as Error).message}</div>
    );

  return (
    <>
      <div className="relative h-[calc(100vh-310px)]">
        {/* Fixed Header */}
        <Table className="bg-white">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="px-4 w-12">
                <Checkbox
                  ref={selectAllRef}
                  checked={allSelected}
                  onCheckedChange={(c) => toggleAll(c as boolean)}
                  aria-label="Select all organizations"
                  className="data-[state=checked]:bg-black data-[state=checked]:border-black"
                />
              </TableHead>
              <TableHead className="w-1/4">Company</TableHead>
              <TableHead className="w-1/5">Quota</TableHead>
              <TableHead className="w-1/5">Seats</TableHead>
              <TableHead className="w-1/5">Updated</TableHead>
              <TableHead className="w-1/5">Status</TableHead>
              <TableHead className="w-28">
                {selectedCount > 0 ? (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-red-100 text-red-600"
                    onClick={handleBulkDelete}
                    aria-label={`Delete ${selectedCount} selected organizations`}
                  >
                    <Trash2 className="size-5" />
                  </Button>
                ) : (
                  <span className="mr-2 text-black">Actions</span>
                )}
              </TableHead>
            </TableRow>
          </TableHeader>
        </Table>

        {/* Scrollable Body */}
        <div className="overflow-auto" style={{ height: "calc(100% - 60px)" }}>
          <Table className="bg-white">
            <TableBody className="bg-white">
              {data.map((item, index) => {
                const isSelected = item.checked;
                const isEven = index % 2 === 0;
                return (
                  <TableRow
                    key={item._id}
                    className={`cursor-pointer ${
                      isEven
                        ? "bg-[#F7F6FE] hover:bg-[#F7F6FE]"
                        : "bg-white hover:bg-white"
                    }`}
                    onClick={(e) => handleRowClick(item._id, e)}
                  >
                    <TableCell 
                      className="px-4 w-12"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-center">
                        <Checkbox
                      checked={item.checked}
                      onCheckedChange={(c) => toggleCheckbox(item._id, c as boolean)}
                      aria-label={`Select organization ${item.name}`}
                      className="data-[state=checked]:bg-black data-[state=checked]:border-black"
                    />
                      </div>
                    </TableCell>
                    <TableCell className="w-1/4">
                      <Button
                        variant="link"
                        className="justify-start p-0 max-w-60 text-black"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/organization/${item._id}`);
                        }}
                      >
                        <span className="truncate">{item.name}</span>
                      </Button>
                    </TableCell>
                    <TableCell className="w-1/5">
                      <span className="text-black">
                        {item.monthlyQuota?.toLocaleString() || "—"}
                      </span>
                    </TableCell>
                    <TableCell className="w-1/5">
                      <span className="text-black">{item.seats || "—"}</span>
                    </TableCell>
                    <TableCell className="w-1/5">
                      <span className="text-black">
                        {formatDate(item.updatedAt)}
                      </span>
                    </TableCell>
                    <TableCell className="w-1/5">
                      {item.status === "canceled" ? (
                        <div className="flex items-center gap-1">
                          <div className="size-2 rounded-full bg-red-500" />
                          <span className="text-black">Disabled</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <div className="size-2 rounded-full bg-green-500" />
                          <span className="text-black">Active</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell
                      className="w-28"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild data-dropdown-trigger>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-gray-100"
                          >
                            <MoreHorizontal className="size-4 text-gray-600" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              router.push(`/organization/${item._id}`)
                            }
                          >
                            <FolderKanban className="mr-2 w-4 h-4" /> View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(item)}>
                            <Edit className="mr-2 w-4 h-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setOrgId(item._id);
                              showConfirm(
                                "Disable Organization",
                                `Are you sure you want to disable "${item.name}"? This cannot be undone.`
                              );
                            }}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 w-4 h-4" /> Disable
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      <AlertDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog((p) => ({ ...p, open }))}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{confirmDialog.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {confirmDialog.message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <div className="flex justify-center gap-4 w-full">
              <AlertDialogCancel className="flex-1">
                Cancel
              </AlertDialogCancel>
              <Button
                className="flex-1 bg-red-600 hover:bg-red-700"
                onClick={handleDisable}
                disabled={loading}
              >
                {loading && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
                Disable
              </Button>
            </div>

          </AlertDialogFooter>

        </AlertDialogContent>
      </AlertDialog>

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