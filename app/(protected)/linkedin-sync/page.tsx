"use client";

import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import LinkedInSyncHeader from "./components/shared/ls-header";
import TabNavigation from "./components/shared/tab-nav";
import CampaignsHeader from "./components/campaigns/campaigns-header";
import CampaignTable from "./components/campaigns/campaign-table";
import { useCampaignTasks } from "./hooks/useCampaignTasks";
import SenderTabComponent from "./components/senders/SenderTabComponent";

const LinkedInSyncPage = () => {
  const [activeTab, setActiveTab] = useState("senders");

  // Campaign data
  const {
    campaigns,
    total: campaignTotal,
    isLoading: campaignsLoading,
    error: campaignError,
    refreshCampaigns,
  } = useCampaignTasks();

  const handleGlobalUpdate = async () => {
    try {
      toast.loading("Refreshing campaigns...", { id: "refresh-campaigns" });
      await refreshCampaigns();
      toast.success("Campaigns refreshed successfully", {
        id: "refresh-campaigns",
      });
    } catch (error) {
      toast.error("Failed to refresh campaigns", { id: "refresh-campaigns" });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-6">
        <LinkedInSyncHeader />

        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {/* LinkedIn Senders Tab */}
        {activeTab === "senders" && <SenderTabComponent />}

        {/* Campaign Task Tab */}
        {activeTab === "campaigns" && (
          <>
            {!campaignsLoading && !campaignError && (
              <CampaignsHeader
                onUpdate={handleGlobalUpdate}
                total={campaignTotal}
              />
            )}

            <CampaignTable
              campaigns={campaigns}
              onRefresh={refreshCampaigns}
              isLoading={campaignsLoading}
            />

            {campaignError && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>
                  <strong>Error:</strong> {(campaignError as Error).message}
                </AlertDescription>
              </Alert>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LinkedInSyncPage;
