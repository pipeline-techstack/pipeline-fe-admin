"use client";

import React, { useState } from "react";
import SendersHeader from "./senders-header";
import SenderGrid from "./sender-grid";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLinkedInSenders } from "../../hooks/useLinkedInSenders";
import { toast } from "sonner";

const SenderTabComponent = () => {
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>("");

  const {
    senders,
    total: senderTotal,
    isLoading: sendersLoading,
    error: senderError,
    refreshSenders,
  } = useLinkedInSenders(selectedCampaignId);

  const handleSenderAction = (senderId: string, action: "pause" | "engage") => {
    toast.info(`Action "${action}" for sender ${senderId} - Coming soon`);
  };

  return (
    <div>
      <SendersHeader
        selectedCampaignId={selectedCampaignId}
        onCampaignChange={setSelectedCampaignId}
      />

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
    </div>
  );
};

export default SenderTabComponent;
