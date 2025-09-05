"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import MultiSelect from "@/components/multi-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useHeyreach } from "@/hooks/use-heyreach";
import { assignCampaignsApi, getUserCampaigns } from "@/services/heyreach-apis";

const CampaignFormPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { campaignsQuery } = useHeyreach({ enableCampaigns: true });
  const { data: campaigns = [] } = campaignsQuery;

  const mode = pathname.includes("edit") ? "edit" : "new";
  const [email, setEmail] = useState("");
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const campaignOptions = Array.isArray(campaigns) 
    ? campaigns.map(campaign => ({
        ...campaign,
        id: String(campaign.id)
      }))
    : Object.entries(campaigns || {}).map(([id, name]) => ({
        id,
        name: String(name)
      }));

  // 🔹 Fetch user campaigns in edit mode
  useEffect(() => {
    const fetchUserData = async () => {
      const emailFromQuery = searchParams.get("email");
      if (mode === "edit" && emailFromQuery) {
        setLoading(true);
        try {
          const data = await getUserCampaigns({ email: emailFromQuery });
          setEmail(data.email);

          // Normalize campaigns: object → array of IDs
          const campaignIds = Object.keys(data.heyreach?.campaigns || {});
          setSelectedCampaigns(campaignIds);
        } catch (err: any) {
          console.error("Failed to fetch user campaigns", err);

          setError(
            err.detail || "Failed to fetch user campaigns. Please try again."
          );
        } finally {
          setLoading(false);
        }
      }
    };
    fetchUserData();
  }, [mode, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await assignCampaignsApi({ email, campaign_ids: selectedCampaigns });
      alert("Permissions saved successfully");
    } catch (err: any) {
      console.error(err);
      alert("Failed to save permissions");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-gray-50 px-4 py-8">
      <div className="bg-white shadow-sm mx-auto p-8 rounded-xl max-w-2xl">
        <h2 className="mb-4 font-bold text-gray-900 text-2xl">
          {mode === "edit" ? "Edit Campaigns" : "Assign Campaigns"}
        </h2>

        {loading ? (
          <p className="text-gray-500">Loading user data...</p>
        ) : error ? (
          <p className="font-semibold text-red-500">{error}</p>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <label className="block font-semibold text-gray-700 text-sm">
              Email *
            </label>
            <Input
              type="email"
              required
              value={email}
              disabled={mode === "edit"}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter user email address"
            />

            {/* Campaigns */}
            <div className="mt-6">
              <label className="block font-semibold text-gray-700 text-sm">
                Select Campaigns *
              </label>
              <MultiSelect
                options={campaignOptions}
                value={selectedCampaigns}
                onChange={setSelectedCampaigns}
                placeholder="Choose campaigns..."
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <Button
                type="submit"
                disabled={!email || selectedCampaigns.length === 0 || saving}
                className="w-full"
              >
                {saving ? "Saving..." : "Save Permissions"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/permissions")}
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CampaignFormPage;