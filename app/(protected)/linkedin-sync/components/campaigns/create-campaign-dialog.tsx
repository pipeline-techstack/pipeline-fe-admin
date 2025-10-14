"use client";

import { useState } from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CreateCampaignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLinkCampaign: (campaignId: string) => void;
}

const CreateCampaignDialog = ({
  open,
  onOpenChange,
  onLinkCampaign,
}: CreateCampaignDialogProps) => {
  const [campaignId, setCampaignId] = useState("");

  const handleSubmit = () => {
    if (campaignId.trim()) {
      onLinkCampaign(campaignId.trim());
      setCampaignId("");
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    setCampaignId("");
    onOpenChange(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && campaignId.trim()) {
      handleSubmit();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[540px] p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold text-gray-700 mb-2">
                Campaign Creation
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Link your Heyreach campaign and fetch the campaign ID from inbox.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="campaignId" className="text-sm font-medium text-gray-900">
              Campaign ID
            </Label>
            <Input
              id="campaignId"
              placeholder="1"
              value={campaignId}
              onChange={(e) => setCampaignId(e.target.value)}
              onKeyPress={handleKeyPress}
              className="h-12 border-gray-300 focus-visible:ring-blue-500"
              autoFocus
            />
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
              disabled={!campaignId.trim()}
              className="px-6 h-10 w-36 bg-[#4A5BAA] hover:bg-[#3d4c92] text-white"
            >
              Link Campaign
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCampaignDialog;