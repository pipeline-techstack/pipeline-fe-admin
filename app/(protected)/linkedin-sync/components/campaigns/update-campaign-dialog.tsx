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
  onUpdateCampaign: (campaignId: string) => void;
  selectedTask: CampaignTask | null;
}

const UpdateCampaignDialog = ({
  open,
  onOpenChange,
  onUpdateCampaign,
  selectedTask,
}: UpdateCampaignDialogProps) => {
  const handleSubmit = () => {
    if (selectedTask) {
      onUpdateCampaign(selectedTask.campaign_id);
    }
    onOpenChange(false);
  };

  const handleDialogChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      onOpenChange(false);
    }
  };

  // Helper function to format LinkedIn senders
  const formatLinkedInSenders = (senders: LinkedInSender[]) => {
    return senders.map(sender => sender.full_name).join(", ");
  };

  // Helper function to format work experiences
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

  // Helper function to format additional info links
  const formatLinks = (info: AdditionalInfo) => {
    const links = [];
    if (info.calendar_link) links.push(info.calendar_link);
    if (info.company_brochure_link) links.push(info.company_brochure_link);
    if (info.company_pitch_deck_link) links.push(info.company_pitch_deck_link);
    if (info.company_product_overview_link) links.push(info.company_product_overview_link);
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
        <Label className="text-xs font-medium text-gray-700">{label}</Label>
        <div className="p-3 bg-gray-50 border border-gray-200 rounded-md min-h-[44px] text-sm text-gray-800 whitespace-pre-wrap break-words">
          {oldValue}
        </div>
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs font-medium text-gray-700">{label}</Label>
        <div className="p-3 bg-purple-50 border border-purple-200 rounded-md min-h-[44px] text-sm text-gray-800 whitespace-pre-wrap break-words">
          {newValue}
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
            Compare the existing and updated campaign data
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-4">
            <ComparisonField
              label="Campaign Name"
              oldValue={oldCampaignName || "Not set"}
              newValue={newCampaignName || "Not set"}
            />

            <ComparisonField
              label="LinkedIn Senders"
              oldValue={formatLinkedInSenders(oldSenders)}
              newValue={formatLinkedInSenders(newSenders)}
            />

            <ComparisonField
              label="Email Address"
              oldValue={oldAdditionalInfo.email_address || "Not set"}
              newValue={newAdditionalInfo.email_address || "Not set"}
            />

            <ComparisonField
              label="Headline"
              oldValue={oldSenders[0]?.headline || "No headline"}
              newValue={newSenders[0]?.headline || "No headline"}
            />

            <ComparisonField
              label="Work Experiences"
              oldValue={formatWorkExperiences(oldSenders)}
              newValue={formatWorkExperiences(newSenders)}
            />

            <ComparisonField
              label="Links"
              oldValue={formatLinks(oldAdditionalInfo)}
              newValue={formatLinks(newAdditionalInfo)}
            />

            <ComparisonField
              label="Calendar Link"
              oldValue={oldAdditionalInfo.calendar_link || "Not set"}
              newValue={newAdditionalInfo.calendar_link || "Not set"}
            />

            <ComparisonField
              label="Location"
              oldValue={oldSenders[0]?.location || "Not set"}
              newValue={newSenders[0]?.location || "Not set"}
            />
          </div>
        </div>

        <div className="px-6 py-4 border-t bg-gray-50 flex justify-end">
          <Button
            onClick={handleSubmit}
            className="px-8 h-10 bg-[#4A5BAA] hover:bg-[#3d4c92] text-white"
          >
            Mark as Updated
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCampaignDialog;