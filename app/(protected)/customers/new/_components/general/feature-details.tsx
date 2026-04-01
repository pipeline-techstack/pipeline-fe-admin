import { useState, useMemo } from "react";
import { Zap } from "lucide-react";
import SectionCard, { Badge } from "../Card";
import { Customer } from "@/lib/types/customer-types";
import MultiSelect from "@/components/multi-select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const permissionsCatalog = [
  { id: "*", name: "All Tabs", type: "mandatory" },
  { id: "dashboard", name: "Dashboard", type: "mandatory" },
  { id: "data-library", name: "Data Library", type: "mandatory" },
  { id: "workbook", name: "Workbook", type: "mandatory" },
  { id: "enrichment", name: "Enrichment", type: "optional" },
  { id: "inbox", name: "Inbox", type: "optional" },
  { id: "crm", name: "CRM", type: "optional" },
  { id: "campaign", name: "Campaign", type: "optional" },
  { id: "overview", name: "Overview", type: "optional" },
];

function FeatureAllocationCard({ customer }: { customer: Customer }) {
  const [isEditing, setIsEditing] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // split catalog
  const mandatoryOptions = permissionsCatalog
    .filter((r) => r.type === "mandatory")
    .map((r) => ({ id: r.id, name: r.name }));

  const optionalOptions = permissionsCatalog
    .filter((r) => r.type === "optional")
    .map((r) => ({ id: r.id, name: r.name }));
  // initial selection from customer
  const [selectedMandatory, setSelectedMandatory] = useState<string[]>(
    customer.features
      .filter((f) =>
        permissionsCatalog.find((p) => p.id === f.id && p.type === "mandatory"),
      )
      .map((f) => f.id),
  );

  const [selectedOptional, setSelectedOptional] = useState<string[]>(
    customer.features
      .filter((f) =>
        permissionsCatalog.find((p) => p.id === f.id && p.type === "optional"),
      )
      .map((f) => f.id),
  );

  const handleSave = async () => {
    setSubmitError(null);

    if (selectedMandatory.length === 0) {
      setSubmitError("At least one mandatory feature is required.");
      return;
    }

    try {
      const finalFeatures = [...selectedMandatory, ...selectedOptional];

      console.log("Saving features:", finalFeatures);

      // 👉 call API here

      setIsEditing(false);
    } catch (err) {
      setSubmitError("Failed to update features.");
    }
  };

  return (
    <SectionCard
      title="Feature Allocation"
      subtitle="Assigned resources and entitlements."
      editLabel={isEditing ? "Save" : "Edit"}
      icon={<Zap className="w-4 h-4" />}
      onEdit={() => {
        setIsEditing(!isEditing);
      }}
      isEditing={isEditing}
      onCancel={() => setIsEditing(false)}
      onSave={handleSave}
    >
      {!isEditing ? (
        <div className="flex flex-wrap gap-2">
          {customer.features.map((f) => (
            <Badge key={f.id} label={f.label} variant="info" />
          ))}
        </div>
      ) : (
        <>
          {/* Mandatory */}
          <div className="space-y-2 mt-4">
            <Label className="block text-gray-700 text-sm">
              Mandatory Features *
            </Label>
            <MultiSelect
              options={mandatoryOptions}
              value={selectedMandatory}
              onChange={setSelectedMandatory}
            />
          </div>

          {/* Optional */}
          <div className="space-y-2 mt-6">
            <Label className="block text-gray-700 text-sm">
              Optional Features
            </Label>
            <MultiSelect
              options={optionalOptions}
              value={selectedOptional}
              onChange={setSelectedOptional}
            />
          </div>

          {/* Error */}
          {submitError && (
            <div className="bg-red-50 mt-4 px-3 py-2 border border-red-200 rounded-md text-red-600 text-sm">
              {submitError}
            </div>
          )}
        </>
      )}
    </SectionCard>
  );
}

export default FeatureAllocationCard;
