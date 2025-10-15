"use client";

import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import LinkedInSyncHeader from "./components/shared/ls-header";
import TabNavigation from "./components/shared/tab-nav";
import SendersHeader from "./components/senders/senders-header";
import SenderGrid from "./components/senders/sender-grid";
import CampaignsHeader from "./components/campaigns/campaigns-header";
import CampaignTable from "./components/campaigns/campaign-table";
import { useLinkedInSenders } from "./hooks/useLinkedInSenders";
import { useCampaignTasks } from "./hooks/useCampaignTasks";
import { updateCampaignTask } from "./services/campaign-apis";

const LinkedInSyncPage = () => {
  const [activeTab, setActiveTab] = useState('senders');
  
  // Sender data
  const { 
    senders, 
    total: senderTotal, 
    isLoading: sendersLoading, 
    error: senderError, 
    refreshSenders 
  } = useLinkedInSenders();
  
  // Campaign data
  const { 
    campaigns, 
    total: campaignTotal, 
    isLoading: campaignsLoading, 
    error: campaignError, 
    refreshCampaigns 
  } = useCampaignTasks();

  const handleSenderAction = (senderId: string, action: 'pause' | 'engage') => {
    console.log('Sender action:', senderId, action);
    toast.info(`Action "${action}" for sender ${senderId} - Coming soon`);
  };

  const handleAddSender = () => {
    console.log('Add new sender');
    toast.info("Add sender functionality - Coming soon");
  };

  const handleCampaignUpdate = async (taskId: string, heyreachCampaignId: string) => {
    try {
      toast.loading("Updating campaign task...", { id: "campaign-update" });
      
      await updateCampaignTask(taskId, heyreachCampaignId);
      
      toast.success("Campaign task updated successfully", { id: "campaign-update" });
    } catch (error) {
      console.error("Error updating campaign task:", error);
      toast.error("Failed to update campaign task", {
        id: "campaign-update",
        description: error instanceof Error ? error.message : "Unknown error"
      });
    }
  };

  const handleGlobalUpdate = async () => {
    try {
      toast.loading("Refreshing campaigns...", { id: "refresh-campaigns" });
      await refreshCampaigns();
      toast.success("Campaigns refreshed successfully", { id: "refresh-campaigns" });
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
        {activeTab === 'senders' && (
          <>
            <SendersHeader onAddSender={handleAddSender} />

            <SenderGrid 
              senders={senders} 
              onAction={handleSenderAction}
              isLoading={sendersLoading}
            />

            {senderError && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>
                  <strong>Error:</strong> {(senderError as Error).message}
                </AlertDescription>
              </Alert>
            )}
          </>
        )}
        
        {/* Campaign Task Tab */}
        {activeTab === 'campaigns' && (
          <>
            {!campaignsLoading && !campaignError && (
              <CampaignsHeader onUpdate={handleGlobalUpdate} total={campaignTotal} />
            )}

            <CampaignTable 
              campaigns={campaigns} 
              onUpdate={handleCampaignUpdate}
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