"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddSenderDialog from "./add-sender-dialog";
import { SingleSelectComponent } from "@/app/(protected)/wb-config/_components/campaign-select";
import { useHeyreach } from "@/hooks/use-heyreach";

interface SendersHeaderProps {
  selectedCampaignId: string;
  onCampaignChange: (id: string) => void;
  onAddSender?: (data: { fullName: string; email: string }) => void;
}

const SendersHeader = ({
  selectedCampaignId,
  onCampaignChange,
  onAddSender,
}: SendersHeaderProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { campaignsQuery } = useHeyreach({ enableCampaigns: true });
  const { data: campaigns = [], isLoading: campaignsLoading } = campaignsQuery;

  const campaignOptions =
    campaigns?.map((c: any) => ({
      id: c.id?.toString(),
      name: c.name || `Campaign #${c.id}`,
    })) ?? [];

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="mb-1 font-semibold text-gray-900 text-lg">
            LinkedIn Senders
          </h2>
          <p className="text-gray-600 text-sm">
            Manage your LinkedIn sender profiles and engagement
          </p>
        </div>

        <div className="flex items-center gap-2">
          <SingleSelectComponent
            value={selectedCampaignId}
            options={campaignOptions}
            onChange={onCampaignChange} // 👈 call parent handler
            name="Campaigns"
            placeholder={
              campaignsLoading ? "Loading campaigns..." : "Select Campaign"
            }
            hideLabel
            disabled={campaignsLoading}
          />

          <Button
            onClick={() => setIsDialogOpen(true)}
            // disabled={!selectedCampaignId}
            className={`${
              // selectedCampaignId
                 "bg-[#4A5BAA] hover:bg-[#3d4c92]"
                // : "bg-gray-300 cursor-not-allowed"
            } text-white`}
          >
            <Plus className="mr-2 w-4 h-4" />
            Add New Sender
          </Button>
        </div>
      </div>

      <AddSenderDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
};

export default SendersHeader;
