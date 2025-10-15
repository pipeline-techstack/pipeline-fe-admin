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
      <DialogContent className="sm:max-w-[540px] p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold text-gray-700 mb-2">
                Link Campaign
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Link your HeyReach campaign ID to this task.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="taskId" className="text-sm font-medium text-gray-900">
              Task ID
            </Label>
            <Input
              id="taskId"
              value={taskId}
              disabled
              className="h-12 border-gray-300 bg-gray-50 text-gray-600"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="heyreachCampaignId" className="text-sm font-medium text-gray-900">
              HeyReach Campaign ID
            </Label>
            <Input
              id="heyreachCampaignId"
              placeholder="Enter HeyReach campaign ID"
              value={heyreachCampaignId}
              onChange={(e) => setHeyreachCampaignId(e.target.value)}
              onKeyPress={handleKeyPress}
              className="h-12 border-gray-300 focus-visible:ring-blue-500"
              autoFocus
              disabled={isSubmitting}
            />
          </div>

          <div className="flex items-center justify-center gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="px-6 h-10 w-36"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!isValid || isSubmitting}
              className="px-6 h-10 w-36 bg-[#4A5BAA] hover:bg-[#3d4c92] text-white disabled:opacity-50"
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