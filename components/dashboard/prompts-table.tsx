"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  X,
  Loader2,
} from "lucide-react";
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
import { AddPromptDialog } from "@/components/dialog/add-prompt-dialog";

// Mock data
const MOCK_PROMPTS = [
  {
    _id: "1",
    title: "Customer Onboarding Flow",
    engagementDate: "2025-01-15",
  },
  {
    _id: "2",
    title: "Sales Pitch Generator",
    engagementDate: "2025-02-20",
  },
  {
    _id: "3",
    title: "Product Recommendation",
    engagementDate: "2025-03-10",
  },
  {
    _id: "4",
    title: "Support Ticket Analysis",
    engagementDate: "2025-01-25",
  },
  {
    _id: "5",
    title: "Content Marketing Assistant",
    engagementDate: "2025-02-05",
  },
];

interface PromptData {
  _id: string;
  title: string;
  engagementDate: string;
}

export function PromptsTable() {
  const [data, setData] = useState<PromptData[]>(MOCK_PROMPTS);
  const [editPrompt, setEditPrompt] = useState<PromptData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [promptId, setPromptId] = useState("");
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    title: string;
    message: string;
  }>({ open: false, title: "", message: "" });
  const router = useRouter();

  const handleRowClick = (id: string, e: React.MouseEvent) => {
    const el = e.target as HTMLElement;
    if (el.closest("[role=checkbox], [data-dropdown-trigger], button")) return;
    console.log("View prompt:", id);
  };

  const showConfirm = (title: string, message: string) =>
    setConfirmDialog({ open: true, title, message });

  const handleEdit = (prompt: PromptData) => {
    setEditPrompt(prompt);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setData((prev) => prev.filter((item) => item._id !== promptId));
      setConfirmDialog((p) => ({ ...p, open: false }));
      setLoading(false);
      console.log("Deleted prompt:", promptId);
    }, 1000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
        <div className="max-h-[calc(100vh-250px)] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Title</TableHead>
                <TableHead className="font-semibold">Engagement Date</TableHead>
                <TableHead className="w-12 font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow
                  key={item._id}
                  className="hover:bg-gray-50 group cursor-pointer transition-colors duration-150"
                  onClick={(e) => handleRowClick(item._id, e)}
                >
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell className="text-gray-600">
                    {formatDate(item.engagementDate)}
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
                          onClick={() => console.log("View:", item._id)}
                        >
                          <Eye className="mr-2 w-4 h-4" /> View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(item)}>
                          <Edit className="mr-2 w-4 h-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setPromptId(item._id);
                            showConfirm(
                              "Delete Prompt",
                              `Are you sure you want to delete "${item.title}"? This cannot be undone.`
                            );
                          }}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 w-4 h-4" /> Delete
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
          <p className="text-gray-600 text-sm">{data.length} prompts</p>
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
          <AlertDialogFooter className="sm:justify-between">
            <Button
              variant="outline"
              onClick={() => setConfirmDialog((p) => ({ ...p, open: false }))}
            >
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {isModalOpen && (
        <AddPromptDialog
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditPrompt(null);
          }}
          defaultValues={editPrompt}
        />
      )}
    </>
  );
}