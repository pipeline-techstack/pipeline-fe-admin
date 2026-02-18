"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MultiSelect from "@/components/multi-select";
import { useCustomerSearch } from "@/hooks/use-customers";
// import { useGetResource, useSetResource } from "@/hooks/use-resource";

const mockResources = [
  { id: "dashboard", name: "Dashboard", type: "mandatory" },
  { id: "data-library", name: "Data Library", type: "mandatory" },
  { id: "workbook", name: "Workbook", type: "mandatory" },
  { id: "enrichment", name: "Enrichment", type: "optional" },
  { id: "inbox", name: "Inbox", type: "optional" },
  { id: "crm", name: "CRM", type: "optional" },
  { id: "campaign", name: "Campaign", type: "optional" },
];

const mockExistingAllocations: Record<string, string[]> = {
  "john@example.com": ["dashboard", "crm", "campaign"],
  "sarah@example.com": ["data-library"],
};

const ResourceFormPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const mode = pathname.includes("edit") ? "edit" : "new";
  const { customers } = useCustomerSearch();

  const [email, setEmail] = useState("");
  const [selectedResources, setSelectedResources] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const resourceOptions = mockResources.map((r) => ({
    id: r.id,
    name: r.name,
  }));

  useEffect(() => {
    if (mode === "edit") {
      const emailFromQuery = searchParams.get("email");
      if (emailFromQuery) {
        setEmail(emailFromQuery);
        const existing = mockExistingAllocations[emailFromQuery] ;
        if (existing) setSelectedResources(existing);
      }
    }
  }, [mode, searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const mandatoryIds = mockResources
      .filter((r) => r.type === "mandatory")
      .map((r) => r.id);

    const hasMandatory = selectedResources.some((id) =>
      mandatoryIds.includes(id)
    );

    if (!hasMandatory) {
      alert("At least one mandatory feature must be selected");
      return;
    }

    if (selectedResources.length === 0) {
      alert("Select at least one feature");
      return;
    }

    setSaving(true);

    setTimeout(() => {
      alert(
        mode === "edit"
          ? "Resources updated successfully"
          : "Resources assigned successfully"
      );
      router.push("/resource");
    }, 800);
  };

//   const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();

//   const mandatoryIds = mockResources
//     .filter((r) => r.type === "mandatory")
//     .map((r) => r.id);

//   const hasMandatory = selectedResources.some((id) =>
//     mandatoryIds.includes(id)
//   );

//   if (!hasMandatory) {
//     alert("At least one mandatory feature must be selected");
//     return;
//   }

//   if (selectedResources.length === 0) {
//     alert("Select at least one feature");
//     return;
//   }

//   setSaving(true);

//   try {
//     const payload = {
//       email,
//       resources: selectedResources,
//     };

//     const response = await setResource(payload);

//     console.log("Set resource response:", response);

//     alert(
//       mode === "edit"
//         ? "Resources updated successfully"
//         : "Resources assigned successfully"
//     );

//     router.push("/resource");
//   } catch (error) {
//     console.error("Error setting resources:", error);
//   } finally {
//     setSaving(false);
//   }
// };

  return (
    <div className="bg-gray-50 px-4 py-8">
      <div className="bg-white shadow-sm mx-auto p-8 rounded-xl max-w-2xl">
        <h2 className="mb-4 font-bold text-gray-900 text-2xl">
          {mode === "edit" ? "Edit Resources" : "Assign Resources"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="block font-semibold text-gray-700 text-sm">
              Email *
            </label>
            {mode === "edit" ? (
              <Input value={email} disabled className="bg-gray-50" />
            ) : (
              <Input
                type="email"
                required
                placeholder="Enter user email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            )}
          </div>

          <div className="space-y-2 mt-6">
            <label className="block font-semibold text-gray-700 text-sm">
              Select Resources *
            </label>
            <MultiSelect
              options={resourceOptions}
              value={selectedResources}
              onChange={setSelectedResources}
              placeholder="Choose resources..."
            />
          </div>

          <div className="flex gap-3 mt-8">
            <Button
              type="submit"
              disabled={!email || saving}
              className="flex-1 bg-zinc-800 hover:bg-zinc-700"
            >
              {saving ? "Saving..." : "Save Allocation"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/resource")}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResourceFormPage;
