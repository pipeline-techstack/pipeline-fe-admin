import { useState } from "react";
import { Zap } from "lucide-react";
import SectionCard, { Badge } from "../Card";
import { Customer } from "@/lib/types/customer-types";
import MultiSelect from "@/components/multi-select";
import { Label } from "@/components/ui/label";
import { postUserResources } from "@/services/resource-apis";

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
  const [features, setFeatures] = useState(customer.features);
  const [loading, setLoading] = useState(false);
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

  const handleEdit = () => {
    // If All Tabs is selected
    if (features.some((f) => f.id === "*")) {
      setSelectedMandatory(["*"]);
      setSelectedOptional([]);
    } else {
      setSelectedMandatory(
        features
          .filter((f) =>
            permissionsCatalog.find(
              (p) => p.id === f.id && p.type === "mandatory",
            ),
          )
          .map((f) => f.id),
      );

      setSelectedOptional(
        features
          .filter((f) =>
            permissionsCatalog.find(
              (p) => p.id === f.id && p.type === "optional",
            ),
          )
          .map((f) => f.id),
      );
    }

    setIsEditing(true);
  };

  const handleSave = async () => {
    setSubmitError(null);
    setLoading(true);
    if (selectedMandatory.length === 0) {
      setSubmitError("At least one mandatory feature is required.");
      return;
    }

    try {
      let finalFeatures = [...selectedMandatory, ...selectedOptional];

      if (finalFeatures.includes("*")) {
        finalFeatures = ["*"];
      }

      const payload = {
        email: customer.email,
        permissions: finalFeatures.map((resource) => ({
          resource,
          permission: "*",
        })),
      };

      await postUserResources(payload);

      // ✅ Update local state for UI
      const mappedFeatures = finalFeatures.map((id) => {
        const found = permissionsCatalog.find((p) => p.id === id);
        return {
          id,
          label: found?.name || id,
        };
      });

      setFeatures(mappedFeatures);

      setIsEditing(false);
    } catch (err) {
      setSubmitError("Failed to update features.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionCard
      title="Feature Allocation"
      subtitle="Assigned features to this customer."
      editLabel={isEditing ? "Save" : "Edit"}
      icon={<Zap className="w-4 h-4" />}
      onEdit={handleEdit}
      isEditing={isEditing}
      onCancel={() => setIsEditing(false)}
      onSave={handleSave}
      isLoading={loading}
    >
      {!isEditing ? (
        <div className="flex flex-wrap gap-2">
          {features.some((f) => f.id === "*") ? (
            <Badge label="All Tabs" variant="info" />
          ) : (
            features.map((f) => (
              <Badge key={f.id} label={f.label} variant="info" />
            ))
          )}
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
