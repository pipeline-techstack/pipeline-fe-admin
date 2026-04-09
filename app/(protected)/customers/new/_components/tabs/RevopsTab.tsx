"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { configMap } from "@/lib/config/revops/revops-map";

import { CampbookDialog } from "../Revops/CambookDialoguebox";
import { RevopsSection } from "../Revops/RevopsSection";
import CostModal from "../revops/CostModal";
import { DuplicateWorkbookDialog } from "../revops/DuplicateWorkbookDialog";

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
        {Object.entries(configMap).map(([key, config]) => (
          <RevopsSection
            key={key}
            configKey={key}
            config={config}
            id={id}
            name={name}
            email={email}
            handlers={{
              handleCostClick,
              handleDuplicate,
              handleEditCampbook,
              handleCreateCampbook,
              handleView: (item) => {
                setSelectedItem(item);
                setActiveType(key);
                setOpen(true);
              },
            }}
          />
        ))}
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
      {isCampbookOpen && (
        <CampbookDialog
          open={isCampbookOpen}
          onClose={() => setIsCampbookOpen(false)}
          mode={campbookMode}
          campaignId={selectedCampbook?.campaignId || ""}
          selectedCampbook={selectedCampbook}
        />
      )}
    </>
  );
}
