"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface UpdateCampaignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateCampaign: (campaignId: string) => void;
}

// Mock campaigns - replace with actual data from your API
const MOCK_CAMPAIGNS = [
  { id: "1", name: "Q4 Product Launch Campaign" },
  { id: "2", name: "Holiday Season Outreach" },
];

const UpdateCampaignDialog = ({
  open,
  onOpenChange,
  onUpdateCampaign,
}: UpdateCampaignDialogProps) => {
  const [selectedCampaign, setSelectedCampaign] = useState("");

  const handleSubmit = () => {
    if (selectedCampaign) {
      onUpdateCampaign(selectedCampaign);
      setSelectedCampaign("");
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    setSelectedCampaign("");
    onOpenChange(false);
  };

  // Prevent dialog from closing when selecting an item
  const handleDialogChange = (nextOpen: boolean) => {
    // Only allow closing, not reopening
    if (!nextOpen) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogContent className="sm:max-w-[540px] p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <div className="flex items-start justify-between">
            <div>
              {/* <DialogTitle className="text-2xl font-bold text-[#4A5BAA] mb-2"> */}
              <DialogTitle className="text-xl font-semibold text-gray-700 mb-2">
                Campaign Updation
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Compare and update existing campaign details.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="campaign" className="text-sm font-medium text-gray-900">
              Select Campaign
            </Label>
            <Select
              value={selectedCampaign}
              onValueChange={setSelectedCampaign}
            >
              <SelectTrigger
                id="campaign"
                className="h-12 border-2 focus:ring-blue-500"
              >
                <SelectValue placeholder="Choose a campaign" />
              </SelectTrigger>
              <SelectContent
                onClick={(e) => e.stopPropagation()}
              >
                {MOCK_CAMPAIGNS.map((campaign) => (
                  <SelectItem key={campaign.id} value={campaign.id}>
                    {campaign.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-center gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="px-6 h-10 w-36"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!selectedCampaign}
              className="px-6 h-10 w-36 bg-[#4A5BAA] hover:bg-[#3d4c92] text-white"
            >
              Update Campaign
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCampaignDialog;
