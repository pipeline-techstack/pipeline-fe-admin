"use client";

import { useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import PageHeader from "@/components/ui/page-header";
import { useWorkbooks } from "@/hooks/use-wb-table";
import { Workbook } from "./types/wb-table";
import { duplicateWorkbook } from "@/services/wb-table-apis";
import { WorkbookSearch } from "./components/wb-search";
import { WorkbookTable } from "./components/wb-table";
import { TableFooter } from "./components/table-footer";
import { DuplicateWorkbookDialog } from "./components/duplicate-wb-dialog";

const WorkbooksPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedWorkbook, setSelectedWorkbook] = useState<Workbook | null>(null);
  const [newName, setNewName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isDuplicating, setIsDuplicating] = useState(false);

  const pageSize = 10;
  const { data, isLoading, error, refetch } = useWorkbooks(search, page, pageSize);

  const handleDuplicateClick = (workbook: Workbook) => {
    setSelectedWorkbook(workbook);
    setNewName(`${workbook.name} (Copy)`);
    setUserEmail("");
    setIsDialogOpen(true);
  };

  const handleDuplicate = async () => {
    if (!selectedWorkbook || !newName.trim() || !userEmail.trim()) {
      alert("Please fill in all fields");
      return;
    }

    setIsDuplicating(true);
    try {
      const response = await duplicateWorkbook({
        workbook_id: selectedWorkbook.id,
        user_email: userEmail.trim(),
        new_name: newName.trim(),
      });

      console.log("Duplicate success:", response);
      alert("Workbook duplicated successfully!");

      setIsDialogOpen(false);
      setNewName("");
      setUserEmail("");
      setSelectedWorkbook(null);
      refetch();
    } catch (err) {
      console.error("Error duplicating workbook:", err);
      alert(err instanceof Error ? err.message : "Failed to duplicate workbook");
    } finally {
      setIsDuplicating(false);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const totalPages = Math.ceil((data?.total || 0) / pageSize);

  return (
    <TooltipProvider>
      <div className="p-6 mx-auto max-w-7xl">
        <div className="flex justify-between items-start mb-6">
          <PageHeader title="Workbooks" subtitle="Manage your workbooks" />
          <WorkbookSearch value={search} onChange={handleSearchChange} />
        </div>

        <WorkbookTable
          workbooks={data?.workbooks || []}
          isLoading={isLoading}
          error={error}
          onDuplicate={handleDuplicateClick}
        />

        <TableFooter
          total={data?.total || 0}
          currentPage={page}
          pageSize={pageSize}
          totalPages={totalPages}
          onPageChange={setPage}
        />

        <DuplicateWorkbookDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          workbookName={selectedWorkbook?.name || ""}
          newName={newName}
          userEmail={userEmail}
          isLoading={isDuplicating}
          onNewNameChange={setNewName}
          onUserEmailChange={setUserEmail}
          onConfirm={handleDuplicate}
        />
      </div>
    </TooltipProvider>
  );
};

export default WorkbooksPage;