"use client";

import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import LinkedInSyncHeader from "./components/shared/ls-header";
import TabNavigation from "./components/shared/tab-nav";
import SendersHeader from "./components/senders/senders-header";
import SenderGrid from "./components/senders/sender-grid";
import CampaignsHeader from "./components/campaigns/campaigns-header";
import CampaignTable from "./components/campaigns/campaign-table";
import { useLinkedInSenders } from "./hooks/useLinkedInSenders";
import { useCampaignTasks } from "./hooks/useCampaignTasks";

const LinkedInSyncPage = () => {
  const [activeTab, setActiveTab] = useState('senders');
  
  // Sender data
  const { senders, total: senderTotal, isLoading: sendersLoading, error: senderError, refreshSenders } = useLinkedInSenders();
  
  // Campaign data
  const { campaigns, total: campaignTotal, isLoading: campaignsLoading, error: campaignError, refreshCampaigns } = useCampaignTasks();

  const handleSenderAction = (senderId: string, action: 'pause' | 'engage') => {
    console.log('Sender action:', senderId, action);
    // API call will be added here
  };

  const handleAddSender = () => {
    console.log('Add new sender');
    // Modal or navigation will be added here
  };

  const handleCampaignUpdate = (campaignId: string) => {
    console.log('Update campaign:', campaignId);
    // API call will be added here
  };

  const handleGlobalUpdate = () => {
    console.log('Trigger global campaign update');
    refreshCampaigns();
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