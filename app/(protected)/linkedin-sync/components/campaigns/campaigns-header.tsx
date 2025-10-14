"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import UpdateCampaignDialog from "./update-campaign-dialog";

interface CampaignsHeaderProps {
  onUpdate: (campaignId: string) => void;
  total: number;
}

const CampaignsHeader = ({ onUpdate, total }: CampaignsHeaderProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-1">Campaign Tasks</h2>
          <p className="text-md text-gray-600">Link and manage your Heyreach campaigns</p>
        </div>
        <Button 
          onClick={() => setIsDialogOpen(true)}
          className="bg-[#4A5BAA] hover:bg-[#3d4c92] text-white"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Campaign Updation
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-md font-semibold text-gray-900">Campaign Overview</h3>
            <div className="text-sm text-gray-600">
              Total Campaigns: <span className="font-medium">{total}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <UpdateCampaignDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onUpdateCampaign={onUpdate}
      />
    </>
  );
};

export default CampaignsHeader;