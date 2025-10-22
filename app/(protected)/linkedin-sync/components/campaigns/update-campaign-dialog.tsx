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
import { ArrowRight, Calendar, Briefcase, MapPin, Mail, Link2, User, Medal, FileText, Image, Building2, Download, ExternalLink } from "lucide-react";
import { LinkedInSender, UpdateCampaignDialogProps } from "../../types/campaign";


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

  const handleDownload = async (url: string, fileName: string) => {
    const apiUrl = `/api/download?url=${encodeURIComponent(url)}`;
    const link = document.createElement("a");
    link.href = apiUrl;
    link.download = fileName; 
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRedirect = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const isValidUrl = (value: string) => {
    if (!value) return false;
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  const ComparisonField = ({
    label,
    oldValue,
    newValue,
    icon: Icon,
    isImage = false,
    isLink = false,
  }: {
    label: string;
    oldValue: string;
    newValue: string;
    icon?: any;
    isImage?: boolean;
    isLink?: boolean;
  }) => {
    const hasChanged = oldValue !== newValue;
    
    const renderContent = (value: string, type: "old" | "new") => {
      if (isImage && value) {
        return (
          <div className="space-y-3">
            <img src={value} alt={type === "old" ? "Previous" : "Updated"} className="rounded max-w-full h-auto" />
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDownload(value, `${type}-${label.toLowerCase().replace(/\s+/g, '-')}.jpg`)}
              className="w-full text-xs"
            >
              <Download className="mr-1 w-3 h-3" />
              Download
            </Button>
          </div>
        );
      }

      if (isLink && isValidUrl(value)) {
        const showDownload = !label.includes("Calendar");
        return (
          <div className="space-y-3">
            <span className="block text-slate-700 text-sm break-all">
              {value}
            </span>
            <div className={`flex gap-2 ${showDownload ? '' : 'justify-start'}`}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleRedirect(value)}
                className={showDownload ? "flex-1 text-xs" : "w-full text-xs"}
              >
                <ExternalLink className="mr-1 w-3 h-3" />
                Redirect
              </Button>
              {showDownload && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(value, `${type}-${label.toLowerCase().replace(/\s+/g, '-')}`)}
                  className="flex-1 text-xs"
                >
                  <Download className="mr-1 w-3 h-3" />
                  Download
                </Button>
              )}
            </div>
          </div>
        );
      }

      if (label.includes("Email") && value) {
        return (
          <a
            href={`mailto:${value}`}
            className="block font-semibold text-[#4A5BAA] hover:text-[#3B4D7A] text-sm underline break-all"
          >
            {value}
          </a>
        );
      }

      return (
        <p className="text-slate-700 text-sm break-words leading-relaxed whitespace-pre-wrap">
          {value || <span className="text-slate-400 italic">Not set</span>}
        </p>
      );
    };
    
    return (
      <div className="group relative">
        <div className="flex items-center gap-2 mb-3">
          {Icon && <Icon className="w-4 h-4 text-slate-500" />}
          <Label className="font-semibold text-slate-700 text-sm">{label}</Label>
          {hasChanged && (
            <span className="bg-amber-50 ml-auto px-2 py-0.5 rounded-full font-medium text-amber-600 text-xs">
              Modified
            </span>
          )}
        </div>
        
        <div className="items-start gap-3 grid grid-cols-[1fr_auto_1fr]">
          <div className="space-y-1.5">
            <div className="mb-2 font-medium text-slate-500 text-xs uppercase tracking-wide">
              Previous
            </div>
            <div className={`p-4 rounded-lg border-2 transition-all ${
              hasChanged 
                ? 'bg-rose-50/50 border-rose-200 shadow-sm' 
                : 'bg-slate-50 border-slate-200'
            }`}>
              {renderContent(oldValue, "old")}
            </div>
          </div>
          
          <div className="flex justify-center items-center pt-8">
            <ArrowRight className={`w-5 h-5 ${
              hasChanged ? 'text-emerald-500' : 'text-slate-300'
            }`} />
          </div>
          
          <div className="space-y-1.5">
            <div className="mb-2 font-medium text-slate-500 text-xs uppercase tracking-wide">
              Updated
            </div>
            <div className={`p-4 rounded-lg border-2 transition-all ${
              hasChanged 
                ? 'bg-emerald-50/50 border-emerald-200 shadow-sm' 
                : 'bg-slate-50 border-slate-200'
            }`}>
              {renderContent(newValue, "new")}
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
      <DialogContent className="flex flex-col bg-white p-0 max-w-[1000px] max-h-[90vh] overflow-hidden">
        <DialogHeader className="bg-gradient-to-br from-slate-50 to-white px-8 pt-8 pb-6 border-slate-200 border-b">
          <DialogTitle className="font-semibold text-slate-900 text-xl tracking-tight">
            Campaign Update Review
          </DialogTitle>
          <DialogDescription className="mt-2 text-md text-slate-600">
            Compare changes and approve updates to your campaign
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 px-8 py-6 overflow-y-auto">
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
              label="Profile Image URL"
              oldValue={oldSenders[0]?.profile_image_url || ""}
              newValue={newSenders[0]?.profile_image_url || ""}
              icon={Image}
              isImage={true}
            />

            <ComparisonField
              label="Banner Image URL"
              oldValue={oldSenders[0]?.banner_image_url || ""}
              newValue={newSenders[0]?.banner_image_url || ""}
              icon={Image}
              isImage={true}
            />

            <ComparisonField
              label="Company Name"
              oldValue={oldSenders[0]?.company_name || ""}
              newValue={newSenders[0]?.company_name || ""}
              icon={Building2}
            />

            <ComparisonField
              label="Headline"
              oldValue={oldSenders[0]?.headline || ""}
              newValue={newSenders[0]?.headline || ""}
              icon={Medal}
            />

            <ComparisonField
              label="Location"
              oldValue={oldSenders[0]?.location || ""}
              newValue={newSenders[0]?.location || ""}
              icon={MapPin}
            />

            <ComparisonField
              label="About"
              oldValue={oldSenders[0]?.about || ""}
              newValue={newSenders[0]?.about || ""}
              icon={FileText}
            />

            <ComparisonField
              label="Work Experience"
              oldValue={formatWorkExperiences(oldSenders)}
              newValue={formatWorkExperiences(newSenders)}
              icon={Briefcase}
            />

            <ComparisonField
              label="Email Address"
              oldValue={oldAdditionalInfo.email_address || ""}
              newValue={newAdditionalInfo.email_address || ""}
              icon={Mail}
            />

            <ComparisonField
              label="Calendar Link"
              oldValue={oldAdditionalInfo.calendar_link || ""}
              newValue={newAdditionalInfo.calendar_link || ""}
              icon={Calendar}
              isLink={true}
            />

            <ComparisonField
              label="Company Brochure Link"
              oldValue={oldAdditionalInfo.company_brochure_link || ""}
              newValue={newAdditionalInfo.company_brochure_link || ""}
              icon={Link2}
              isLink={true}
            />

            <ComparisonField
              label="Company Logo Link"
              oldValue={oldAdditionalInfo.company_logo_link || ""}
              newValue={newAdditionalInfo.company_logo_link || ""}
              icon={Image}
              isImage={true}
            />

            <ComparisonField
              label="Company LinkedIn Banner Link"
              oldValue={oldAdditionalInfo.company_linkedin_banner_link || ""}
              newValue={newAdditionalInfo.company_linkedin_banner_link || ""}
              icon={Image}
              isImage={true}
            />

            <ComparisonField
              label="Company Pitch Deck Link"
              oldValue={oldAdditionalInfo.company_pitch_deck_link || ""}
              newValue={newAdditionalInfo.company_pitch_deck_link || ""}
              icon={Link2}
              isLink={true}
            />

            <ComparisonField
              label="Company Product Overview Link"
              oldValue={oldAdditionalInfo.company_product_overview_link || ""}
              newValue={newAdditionalInfo.company_product_overview_link || ""}
              icon={Link2}
              isLink={true}
            />
          </div>
        </div>

        <div className="flex justify-center gap-3 bg-gray-50 px-6 py-4 border-t">
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
          >
            {isSubmitting ? "Updating..." : "Mark as Updated"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCampaignDialog;