"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal, Edit, Trash2, FolderKanban, X } from "lucide-react";
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
import { useQuery } from "@tanstack/react-query";
import { disableOrganization, getOrganizations } from "@/services/org-apis";
import { formatDate } from "@/lib/utils";
import { OrganizationData } from "@/lib/types/org-types";
import { AddOrganizationDialog } from "@/components/dialog/add-organization";

interface ExtendedOrganizationData extends OrganizationData {
  checked: boolean;
}

export function OrganizationTable() {
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

  // const toggleCheckbox = (id: string, checked: boolean) =>
  //   setData((prev) => prev.map((i) => (i._id === id ? { ...i, checked } : i)));

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
      await disableOrganization(orgId as string);
    } catch (error) {
      console.error("Error disabling the organization:", error);
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
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
        {selectedCount > 0 && (
          <div className="flex justify-between items-center bg-gray-50 slide-in-from-top-2 px-6 py-3 border-b animate-in duration-300 ease-out">
            <div className="flex items-center space-x-3">
              <span className="font-medium text-sm animate-in duration-200 fade-in-0">
                {selectedCount} selected
              </span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => toggleAll(false)}
                className="hover:scale-105 transition-all duration-150"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        <div className="max-h-[calc(100vh-250px)] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                {/* <TableHead className="pl-6 w-12">
                  <Checkbox
                    ref={selectAllRef}
                    checked={allSelected}
                    onCheckedChange={(c) => toggleAll(c as boolean)}
                  />
                </TableHead> */}
                <TableHead className="font-semibold">Company</TableHead>
                <TableHead className="font-semibold">Quota</TableHead>
                <TableHead className="font-semibold">Seats</TableHead>
                <TableHead className="font-semibold">Updated</TableHead>
                <TableHead className="w-12 font-semibold">
                  <div className="transition-all duration-200 ease-in-out">
                    {selectedCount > 0 ? (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={handleBulkDelete}
                        className="slide-in-from-top-1 p-0 w-8 h-8 animate-in duration-200 fade-in-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    ) : (
                      <span className="slide-in-from-top-1 animate-in duration-200 fade-in-0">
                        Actions
                      </span>
                    )}
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow
                  key={item._id}
                  className={`hover:bg-gray-50 group cursor-pointer transition-colors duration-150 ${
                    item.checked ? "bg-blue-20" : ""
                  }`}
                  onClick={(e) => handleRowClick(item._id, e)}
                >
                  {/* <TableCell
                    className="pl-6"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Checkbox
                      checked={item.checked}
                      onCheckedChange={(c) =>
                        toggleCheckbox(item._id, c as boolean)
                      }
                      className="transition-all duration-150"
                    />
                  </TableCell> */}
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    {item.monthlyQuota?.toLocaleString() || "—"}
                  </TableCell>
                  <TableCell>{item.seats || "—"}</TableCell>
                  <TableCell className="text-gray-600">
                    {formatDate(item.updatedAt)}
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild data-dropdown-trigger>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-0 w-8 h-8"
                        >
                          <MoreHorizontal className="w-4 h-4" />
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
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="bg-gray-50 px-6 py-3 border-t">
          <p className="text-gray-600 text-sm">{data.length} organizations</p>
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
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => {
                handleDisable();
                setConfirmDialog((p) => ({ ...p, open: false }));
              }}
              disabled={loading}
            >
              Disable
            </AlertDialogAction>
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
            enterpriseId: `${process.env.NEXT_PUBLIC_PRICE_ID}`,
            seats: editOrg?.seats || 0,
          }}
          isEditMode={true}
        />
      )}
    </>
  );
}
