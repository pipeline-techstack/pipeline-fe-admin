"use client";

import PageWrapper from "@/components/common/page-wrapper";
import { configMap } from "@/lib/config/revops/revops-map";
import SectionCard from "../../../_components/Card";
import { DataTable } from "@/components/common/table/data-table";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// dialogs
import { DuplicateWorkbookDialog } from "@/app/(protected)/workbooks/components/duplicate-wb-dialog";
import CostModal from "@/app/(protected)/workbooks/components/cost-estimate-dialog";
import { CampbookDialog } from "../../../_components/Revops/CambookDialoguebox";

type ConfigType = keyof typeof configMap;

function Page() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const { detail, type } = params as {
    detail: string | string[];
    type: ConfigType;
  };

  const id: string = Array.isArray(detail) ? detail[0] : detail || "";

  const customerName = searchParams.get("name");
  const customerEmail = searchParams.get("email");

  const [datapage, setDatapage] = useState(1);
  const pageSize = 20;

  //  COMMON STATE (enrichment dialog)

  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [activeType, setActiveType] = useState<ConfigType | null>(null);

  //  WORKBOOK STATE

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

  //  CAMPBOOK STATE

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

  //  ENRICHMENT VIEW

  const handleView = (item: any) => {
    setSelectedItem(item);
    setActiveType(type);
    setOpen(true);
  };

  //  CONFIG

  const config = configMap[type];

  if (!config) return <div>Invalid type</div>;

  const { title, subtitle, icon, getColumns, hook, dataKey, isPaginated } =
    config;

  //  DATA FETCH
  const { data, isLoading } = hook(id, datapage, pageSize);
  const tableData = dataKey ? (data?.[dataKey] ?? []) : (data ?? []);

  //  COLUMN LOGIC (IMPORTANT)

  const columns =
    typeof getColumns === "function"
      ? type === "workbooks"
        ? getColumns(handleCostClick, handleDuplicate)
        : type === "campbooks"
          ? getColumns(handleEditCampbook, () => {})
          : getColumns(handleView, () => {})
      : getColumns;

  useEffect(() => {
    setDatapage(1);
  }, [id]);

  return (
    <>
      <PageWrapper
        title={customerName || "Name"}
        subtitle={customerEmail || "Email"}
        onBack={() => history.back()}
      >
        <SectionCard
          title={title}
          subtitle={subtitle}
          icon={icon}
          className="mt-1.5"
        >
          <div className="flex flex-col h-[calc(100vh-200px)] overflow-hidden">
            {/* CREATE BUTTON (campbooks only) */}
            {type === "campbooks" && (
              <div className="flex justify-end mb-3">
                <button
                  onClick={handleCreateCampbook}
                  className="bg-primary px-3 py-1.5 rounded-md text-white text-sm"
                >
                  Create Campbook
                </button>
              </div>
            )}

            <div className="flex-1 overflow-auto">
              <DataTable
                data={tableData}
                columns={columns ?? []}
                total={data?.total ?? tableData.length}
                currentPage={data?.page ?? datapage}
                pageSize={data?.pageSize ?? pageSize}
                totalPages={data?.totalPages}
                onPageChange={setDatapage}
                isServerPagination={isPaginated}
                footer
                loading={isLoading}
              />
            </div>
          </div>
        </SectionCard>
      </PageWrapper>

      {/*  ENRICHMENT DIALOG */}

      {activeType &&
        configMap[activeType].Dialog &&
        (() => {
          const Dialog = configMap[activeType].Dialog;
          return (
            <Dialog open={open} onOpenChange={setOpen} data={selectedItem} />
          );
        })()}

      {/*  WORKBOOK DIALOGS */}

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

      <CostModal
        isOpen={isCostOpen}
        onClose={() => setIsCostOpen(false)}
        workbook={costWorkbook}
      />

      {/*  CAMPBOOK DIALOG */}

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

export default Page;
