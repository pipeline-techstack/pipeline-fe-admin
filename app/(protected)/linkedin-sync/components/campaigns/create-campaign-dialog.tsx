"use client";

import { useState, useEffect } from "react";
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
  onLinkCampaign: (taskId: string, heyreachCampaignId: string) => Promise<void>;
  taskId?: string;
  selectedTask?: any;
}

const CreateCampaignDialog = ({
  open,
  onOpenChange,
  onLinkCampaign,
  taskId = "",
}: CreateCampaignDialogProps) => {
  const [heyreachCampaignId, setHeyreachCampaignId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (!open) {
      setHeyreachCampaignId("");
      setIsSubmitting(false);
    }
  }, [open]);

  const handleSubmit = async () => {
    if (!taskId.trim() || !heyreachCampaignId.trim() || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await onLinkCampaign(taskId.trim(), heyreachCampaignId.trim());
      onOpenChange(false);
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setHeyreachCampaignId("");
    onOpenChange(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && taskId.trim() && heyreachCampaignId.trim() && !isSubmitting) {
      handleSubmit();
    }
  };

  const isValid = taskId.trim() && heyreachCampaignId.trim();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 sm:max-w-[540px]">
        <DialogHeader className="px-6 pt-6 pb-4">
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="mb-2 font-semibold text-gray-700 text-xl">
                Link Campaign
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Link your HeyReach campaign ID to this task.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-5 px-6 pb-6">
          {/* <div className="space-y-2">
            <Label htmlFor="taskId" className="font-medium text-gray-900 text-sm">
              Task ID
            </Label>
            <Input
              id="taskId"
              value={taskId}
              disabled
              className="bg-gray-50 border-gray-300 h-12 text-gray-600"
            />
          </div> */}

          <div className="space-y-2">
            <Label htmlFor="heyreachCampaignId" className="font-medium text-gray-900 text-sm">
              HeyReach Campaign ID
            </Label>
            <Input
              id="heyreachCampaignId"
              placeholder="Enter HeyReach campaign ID"
              value={heyreachCampaignId}
              onChange={(e) => setHeyreachCampaignId(e.target.value)}
              onKeyPress={handleKeyPress}
              className="border-gray-300 focus-visible:ring-[#4A5BAA] h-12"
              autoFocus
              disabled={isSubmitting}
            />
          </div>

          <div className="flex justify-center items-center gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="px-6 w-36 h-10"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!isValid || isSubmitting}
              className="bg-[#4A5BAA] hover:bg-[#3d4c92] disabled:opacity-50 px-6 w-36 h-10 text-white"
            >
              {isSubmitting ? "Linking..." : "Link Campaign"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCampaignDialog;