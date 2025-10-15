"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface LinkedInSender {
  full_name: string;
  profile_image_url?: string;
  banner_image_url?: string;
  company_name?: string;
  headline?: string;
  location?: string;
  about?: string;
  work_experiences?: Array<{
    title: string;
    company_name: string;
    date_range: string;
    location: string;
    description?: string | null;
  }>;
  linkedin_sender_id?: number;
}

interface AdditionalInfo {
  email_address?: string;
  calendar_link?: string;
  company_brochure_link?: string | null;
  company_logo_link?: string | null;
  company_linkedin_banner_link?: string | null;
  company_pitch_deck_link?: string | null;
  company_product_overview_link?: string | null;
}

interface CampaignTask {
  _id: string;
  type: string;
  campaign_id: string;
  changes?: {
    linkedin_senders?: {
      old: LinkedInSender[];
      new: LinkedInSender[];
    };
    additional_info?: {
      old: AdditionalInfo;
      new: AdditionalInfo;
    };
    campaign_name?: {
      old: string | null;
      new: string;
    };
  };
}

interface UpdateCampaignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateCampaign: (taskId: string) => Promise<void>;
  selectedTask: CampaignTask | null;
}

const UpdateCampaignDialog = ({
  open,
  onOpenChange,
  onUpdateCampaign,
  selectedTask,
}: UpdateCampaignDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selectedTask || isSubmitting) return;
    
    try {
      setIsSubmitting(true);
      await onUpdateCampaign(selectedTask._id);
      onOpenChange(false);
    } catch (error) {
      // Error handling is done in parent component
      setIsSubmitting(false);
    }
  };

  const handleDialogChange = (nextOpen: boolean) => {
    if (!nextOpen && !isSubmitting) {
      onOpenChange(false);
    }
  };

  const formatLinkedInSenders = (senders: LinkedInSender[]) => {
    return senders.map(sender => sender.full_name).join(", ");
  };

  const formatWorkExperiences = (senders: LinkedInSender[]) => {
    return senders.map(sender => {
      if (!sender.work_experiences || sender.work_experiences.length === 0) {
        return "No work experience";
      }
      return sender.work_experiences
        .map(exp => `${exp.title} at ${exp.company_name} (${exp.date_range || "N/A"})`)
        .join("\n");
    }).join("\n\n");
  };

  const formatLinks = (info: AdditionalInfo) => {
    const links = [];
    if (info.calendar_link) links.push(`Calendar: ${info.calendar_link}`);
    if (info.company_brochure_link) links.push(`Brochure: ${info.company_brochure_link}`);
    if (info.company_pitch_deck_link) links.push(`Pitch Deck: ${info.company_pitch_deck_link}`);
    if (info.company_product_overview_link) links.push(`Product Overview: ${info.company_product_overview_link}`);
    return links.length > 0 ? links.join("\n") : "No links available";
  };

  const ComparisonField = ({
    label,
    oldValue,
    newValue,
  }: {
    label: string;
    oldValue: string;
    newValue: string;
  }) => (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-1.5">
        <Label className="text-xs font-medium text-gray-700">Old {label}</Label>
        <div className="p-3 bg-red-50 border border-red-200 rounded-md min-h-[44px] text-sm text-gray-800 whitespace-pre-wrap break-words">
          {oldValue || "Not set"}
        </div>
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs font-medium text-gray-700">New {label}</Label>
        <div className="p-3 bg-green-50 border border-green-200 rounded-md min-h-[44px] text-sm text-gray-800 whitespace-pre-wrap break-words">
          {newValue || "Not set"}
        </div>
      </div>
    </div>
  );

  if (!selectedTask || !selectedTask.changes) {
    return null;
  }

  const oldSenders = selectedTask.changes.linkedin_senders?.old || [];
  const newSenders = selectedTask.changes.linkedin_senders?.new || [];
  const oldAdditionalInfo = selectedTask.changes.additional_info?.old || {};
  const newAdditionalInfo = selectedTask.changes.additional_info?.new || {};
  const oldCampaignName = selectedTask.changes.campaign_name?.old || "";
  const newCampaignName = selectedTask.changes.campaign_name?.new || "";

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogContent className="max-w-[900px] p-0 max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Campaign Update Comparison
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Review the changes and mark as updated when ready
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-4">
            <ComparisonField
              label="Campaign Name"
              oldValue={oldCampaignName}
              newValue={newCampaignName}
            />

            <ComparisonField
              label="LinkedIn Senders"
              oldValue={formatLinkedInSenders(oldSenders)}
              newValue={formatLinkedInSenders(newSenders)}
            />

            <ComparisonField
              label="Email Address"
              oldValue={oldAdditionalInfo.email_address || ""}
              newValue={newAdditionalInfo.email_address || ""}
            />

            <ComparisonField
              label="Headline"
              oldValue={oldSenders[0]?.headline || ""}
              newValue={newSenders[0]?.headline || ""}
            />

            <ComparisonField
              label="Work Experiences"
              oldValue={formatWorkExperiences(oldSenders)}
              newValue={formatWorkExperiences(newSenders)}
            />

            <ComparisonField
              label="Additional Links"
              oldValue={formatLinks(oldAdditionalInfo)}
              newValue={formatLinks(newAdditionalInfo)}
            />

            <ComparisonField
              label="Location"
              oldValue={oldSenders[0]?.location || ""}
              newValue={newSenders[0]?.location || ""}
            />
          </div>
        </div>

        <div className="px-6 py-4 border-t bg-gray-50 flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
            className="px-6"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-8 h-10 bg-[#4A5BAA] hover:bg-[#3d4c92] text-white disabled:opacity-50"
          >
            {isSubmitting ? "Updating..." : "Mark as Updated"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCampaignDialog;