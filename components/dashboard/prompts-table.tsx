"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal, Trash2, Eye, Loader2 } from "lucide-react";

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
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";

/* -----------------------------
 Types
------------------------------ */

type Enrichment = {
  _id: string;
  flow_name: string;
  enrichment_type: string;
  created_at: string;
  status: string;
};

export function EnrichmentsTable({ data = [] }: { data: Enrichment[] }) {
  const router = useRouter();

  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: "",
    message: "",
  });

  /* -----------------------------
   Helpers
  ------------------------------ */

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // const openDeleteDialog = (id: string, name: string) => {
  //   setSelectedId(id);
  //   setConfirmDialog({
  //     open: true,
  //     title: "Delete Enrichment",
  //     message: `Are you sure you want to delete "${name}"? This action cannot be undone.`,
  //   });
  // };

  const handleRowClick = (
    id: string,
    e: React.MouseEvent,
  ) => {
    const target = e.target as HTMLElement;
    if (target.closest("[data-action]")) return;

    router.push(`/enrichments/${id}`);
  };

  return (
    <>
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Enrichment Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Created On</TableHead>
                <TableHead className="w-12 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((item) => (
                <TableRow
                  key={item._id}
                  onClick={(e) => handleRowClick(item._id, e)}
                  className="hover:bg-gray-50 transition cursor-pointer"
                >
                  <TableCell className="font-medium">
                    {item.flow_name}
                  </TableCell>

                  <TableCell className="text-gray-600 capitalize">
                    {item.enrichment_type}
                  </TableCell>

                  <TableCell className="text-gray-600">
                    {formatDate(item.created_at)}
                  </TableCell>

                  <TableCell
                    className="text-right"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" data-action>
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          data-action
                          onClick={() =>
                            router.push(`/enrichments/${item._id}`)
                          }
                        >
                          <Eye className="mr-2 w-4 h-4" />
                          View
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          data-action
                          className="text-red-600"
                          // onClick={() =>
                          //   openDeleteDialog(item._id, item.flow_name)
                          // }
                        >
                          <Trash2 className="mr-2 w-4 h-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}

              {data.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="py-10 text-gray-500 text-center"
                  >
                    No enrichments found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="bg-gray-50 px-6 py-3 border-t text-gray-600 text-sm">
          {data.length} enrichment{data.length !== 1 && "s"}
        </div>
      </div>

      {/* -----------------------------
          Delete Confirmation
      ------------------------------ */}

      <AlertDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog((prev) => ({ ...prev, open }))}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{confirmDialog.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {confirmDialog.message}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <Button
              variant="outline"
              onClick={() =>
                setConfirmDialog((prev) => ({ ...prev, open: false }))
              }
            >
              Cancel
            </Button>

            <Button
              className="bg-red-600 hover:bg-red-700"
              // onClick={handleDelete}
              // disabled={loading}
            >
              {/* {loading && <Loader2 className="mr-2 w-4 h-4 animate-spin" />} */}
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
