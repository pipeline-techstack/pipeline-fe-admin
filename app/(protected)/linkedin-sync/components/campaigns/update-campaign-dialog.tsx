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
import { ArrowRight, Calendar, Briefcase, MapPin, Mail, Link2, User, Medal } from "lucide-react";

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
    icon: Icon,
  }: {
    label: string;
    oldValue: string;
    newValue: string;
    icon?: any;
  }) => {
    const hasChanged = oldValue !== newValue;
    
    return (
      <div className="group relative">
        <div className="flex items-center gap-2 mb-3">
          {Icon && <Icon className="w-4 h-4 text-slate-500" />}
          <Label className="text-sm font-semibold text-slate-700">{label}</Label>
          {hasChanged && (
            <span className="ml-auto text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
              Modified
            </span>
          )}
        </div>
        
        <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-start">
          <div className="space-y-1.5">
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
              Previous
            </div>
            <div className={`p-4 rounded-lg border-2 transition-all ${
              hasChanged 
                ? 'bg-rose-50/50 border-rose-200 shadow-sm' 
                : 'bg-slate-50 border-slate-200'
            }`}>
              <p className="text-sm text-slate-700 whitespace-pre-wrap break-words leading-relaxed">
                {oldValue || <span className="text-slate-400 italic">Not set</span>}
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-center pt-8">
            <ArrowRight className={`w-5 h-5 ${
              hasChanged ? 'text-emerald-500' : 'text-slate-300'
            }`} />
          </div>
          
          <div className="space-y-1.5">
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
              Updated
            </div>
            <div className={`p-4 rounded-lg border-2 transition-all ${
              hasChanged 
                ? 'bg-emerald-50/50 border-emerald-200 shadow-sm' 
                : 'bg-slate-50 border-slate-200'
            }`}>
              <p className="text-sm text-slate-700 whitespace-pre-wrap break-words leading-relaxed">
                {newValue || <span className="text-slate-400 italic">Not set</span>}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
      <DialogContent className="max-w-[1000px] p-0 max-h-[90vh] overflow-hidden flex flex-col bg-white">
        <DialogHeader className="px-8 pt-8 pb-6 bg-gradient-to-br from-slate-50 to-white border-b border-slate-200">
          <DialogTitle className="text-xl font-semibold text-slate-900 tracking-tight">
            Campaign Update Review
          </DialogTitle>
          <DialogDescription className="text-md text-slate-600 mt-2">
            Compare changes and approve updates to your campaign
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="space-y-8">
            <ComparisonField
              label="Campaign Name"
              oldValue={oldCampaignName}
              newValue={newCampaignName}
              icon={Briefcase}
            />

            <ComparisonField
              label="LinkedIn Senders"
              oldValue={formatLinkedInSenders(oldSenders)}
              newValue={formatLinkedInSenders(newSenders)}
              icon={User}
            />

            <ComparisonField
              label="Email Address"
              oldValue={oldAdditionalInfo.email_address || ""}
              newValue={newAdditionalInfo.email_address || ""}
              icon={Mail}
            />

            <ComparisonField
              label="Headline"
              oldValue={oldSenders[0]?.headline || ""}
              newValue={newSenders[0]?.headline || ""}
              icon={Medal}
            />

            <ComparisonField
              label="Work Experience"
              oldValue={formatWorkExperiences(oldSenders)}
              newValue={formatWorkExperiences(newSenders)}
              icon={Briefcase}
            />

            <ComparisonField
              label="Additional Resources"
              oldValue={formatLinks(oldAdditionalInfo)}
              newValue={formatLinks(newAdditionalInfo)}
              icon={Link2}
            />

            <ComparisonField
              label="Location"
              oldValue={oldSenders[0]?.location || ""}
              newValue={newSenders[0]?.location || ""}
              icon={MapPin}
            />
          </div>
        </div>

        <div className="px-6 py-4 border-t bg-gray-50 flex justify-center gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
            className="px-6 w-44 h-10"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-8 h-10 w-44 bg-[#4A5BAA] hover:bg-[#3d4c92] text-white disabled:opacity-50"
          >
            {isSubmitting ? "Updating..." : "Mark as Updated"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCampaignDialog;