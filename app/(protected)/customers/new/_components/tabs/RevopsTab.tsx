"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RevopsTable from "../revops/RevopsTable";
import { configMap } from "@/lib/config/revops/revops-map";
import { DuplicateWorkbookDialog } from "@/app/(protected)/customers/new/_components/revops/DuplicateWorkbookDialog";
import CostModal from "@/app/(protected)/customers/new/_components/revops/CostModal";
import { CampbookDialog } from "../revops/CambookDialoguebox";

export function RevopsTab({ id, name, email }) {
  const router = useRouter();

  // For Enrichment
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeType, setActiveType] = useState(null);

  // For workbooks
  const [isDuplicateOpen, setIsDuplicateOpen] = useState(false);
  const [isCostOpen, setIsCostOpen] = useState(false);

  const [selectedWorkbook, setSelectedWorkbook] = useState<any>(null);
  const [costWorkbook, setCostWorkbook] = useState<any>(null);

  const [newName, setNewName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isDuplicating, setIsDuplicating] = useState(false);

  const handleCostClick = (row: any) => {
    setCostWorkbook(row);
    setIsCostOpen(true);
  };

  const handleDuplicate = (row: any) => {
    setSelectedWorkbook(row);
    setNewName(`${row.name} Copy`);
    setUserEmail(row.user_email || "");
    setIsDuplicateOpen(true);
  };

  // for Campbook
  const [isCampbookOpen, setIsCampbookOpen] = useState(false);
  const [campbookMode, setCampbookMode] = useState<"new" | "edit">("new");
  const [selectedCampbook, setSelectedCampbook] = useState<any>(null);
  const handleCreateCampbook = () => {
    setCampbookMode("new");
    setSelectedCampbook(null);
    setIsCampbookOpen(true);
  };

  const handleEditCampbook = (row: any) => {
    setCampbookMode("edit");
    setSelectedCampbook(row);
    setIsCampbookOpen(true);
  };
  return (
    <>
      <div className="flex flex-col gap-5">
        {Object.entries(configMap).map(([key, config]) => {
          const query = config.hook(id);

          const handleView = (item: any) => {
            setSelectedItem(item);
            setActiveType(key);
            setOpen(true);
          };

          const handleViewMore = () => {
            router.push(
              `/customers/new/${id}/revops/${config.route}?name=${name}&email=${email}`,
            );
          };

          const columns =
            typeof config.getColumns === "function"
              ? key === "workbooks"
                ? config.getColumns(handleCostClick, handleDuplicate)
                : key === "campbooks"
                  ? config.getColumns(handleEditCampbook, () => {})
                  : config.getColumns(handleView, () => {})
              : config.getColumns;

          return (
            <RevopsTable
              key={key}
              title={config.title}
              subtitle={config.subtitle}
              icon={config.icon}
              data={query.data?.[config.dataKey] ?? []}
              loading={query.isLoading}
              columns={columns}
              handleViewMore={handleViewMore}
              onEdit={key === "campbooks" ? handleCreateCampbook : undefined}
              editLabel={key === "campbooks" ? "Create" : undefined}
            />
          );
        })}
      </div>

      {/* ✅ Dynamic Dialog */}
      {activeType &&
        configMap[activeType].Dialog &&
        (() => {
          const Dialog = configMap[activeType].Dialog;
          return (
            <Dialog open={open} onOpenChange={setOpen} data={selectedItem} />
          );
        })()}

      {/* Duplicate Workbook Dialog */}
      <DuplicateWorkbookDialog
        isOpen={isDuplicateOpen}
        onClose={() => setIsDuplicateOpen(false)}
        workbookName={selectedWorkbook?.name || ""}
        newName={newName}
        userEmail={userEmail}
        isLoading={isDuplicating}
        onNewNameChange={setNewName}
        onUserEmailChange={setUserEmail}
        onConfirm={handleDuplicate}
      />

      {/* Cost Modal Workbook Dialog */}
      <CostModal
        isOpen={isCostOpen}
        onClose={() => setIsCostOpen(false)}
        workbook={costWorkbook}
      />

      {/* Campbook Modal */}
      <CampbookDialog
        open={isCampbookOpen}
        onClose={() => setIsCampbookOpen(false)}
        mode={campbookMode}
        campaignId={selectedCampbook?.campaignId || ""}
        selectedCampbook={selectedCampbook} 
      />
    </>
  );
}
