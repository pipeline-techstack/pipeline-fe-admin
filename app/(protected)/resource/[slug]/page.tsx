"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MultiSelect from "@/components/multi-select";
import { useGetResource, useSetResource } from "@/hooks/use-resource";

const resourcesCatalog = [
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

const ResourceFormPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const mode = pathname.includes("edit") ? "edit" : "new";
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { permissions } = useGetResource();
  const { setResource, loading, status } = useSetResource();

  const [email, setEmail] = useState("");
  const [selectedMandatory, setSelectedMandatory] = useState<string[]>([
    "workbook",
  ]);
  const [selectedOptional, setSelectedOptional] = useState<string[]>([]);

  const mandatoryOptions = resourcesCatalog
    .filter((r) => r.type === "mandatory")
    .map((r) => ({ id: r.id, name: r.name }));

  const optionalOptions = resourcesCatalog
    .filter((r) => r.type === "optional")
    .map((r) => ({ id: r.id, name: r.name }));

  // 🔥 Prefill for edit mode
  useEffect(() => {
    if (mode === "edit") {
      const emailFromQuery = searchParams.get("email");
      if (!emailFromQuery) return;

      setEmail(emailFromQuery);

      const user = permissions.find((p) => p.email === emailFromQuery);

      if (!user) return;

      const userResources = user.permissions.map((p) => p.resource);

      const mandatoryIds = mandatoryOptions.map((m) => m.id);

      setSelectedMandatory(
        userResources.filter((r) => mandatoryIds.includes(r)),
      );

      setSelectedOptional(
        userResources.filter((r) => !mandatoryIds.includes(r)),
      );
    }
  }, [mode, searchParams, permissions]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (selectedMandatory.length === 0) {
      setSubmitError("Please select at least one mandatory feature");
      return;
    }

    const finalResources = [...selectedMandatory, ...selectedOptional];

    const payload = {
      email,
      permissions: finalResources.map((resource) => ({
        resource,
        permission: "*",
      })),
    };

    await setResource(payload);
  };

  useEffect(() => {
    if (status === true) {
      router.push("/resource");
    }

    if (status === false) {
      setSubmitError("Failed to save permissions. Please try again.");
    }
  }, [status, router]);

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
              <Input value={email} disabled />
            ) : (
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            )}
          </div>

          <div className="space-y-2 mt-6">
            <label className="block font-semibold text-gray-700 text-sm">
              Mandatory Features *
            </label>
            <MultiSelect
              options={mandatoryOptions}
              value={selectedMandatory}
              onChange={setSelectedMandatory}
            />
          </div>

          <div className="space-y-2 mt-6">
            <label className="block font-semibold text-gray-700 text-sm">
              Optional Features
            </label>
            <MultiSelect
              options={optionalOptions}
              value={selectedOptional}
              onChange={setSelectedOptional}
            />
          </div>
          {submitError && (
            <div className="mt-4 rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-600">
              {submitError}
            </div>
          )}

          <div className="flex gap-3 mt-8">
            <Button
              type="submit"
              disabled={!email || loading}
              className="flex-1 bg-zinc-800 hover:bg-zinc-700"
            >
              {loading ? "Saving..." : "Save Allocation"}
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
