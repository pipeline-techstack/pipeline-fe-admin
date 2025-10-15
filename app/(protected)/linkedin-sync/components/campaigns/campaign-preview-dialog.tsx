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
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Building2, 
  MapPin, 
  Mail, 
  Calendar, 
  Link2, 
  FileText, 
  Briefcase,
  Medal,
  Image,
  MessageSquare,
  Clock
} from "lucide-react";

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
}

interface CampaignSequenceStep {
  step_number: number;
  step_type: string;
  message_template: string;
  delay_days: number;
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
  campaign_name?: string | null;
  fields?: {
    linkedin_senders?: LinkedInSender[];
    campaign_sequence?: CampaignSequenceStep[];
    additional_info?: AdditionalInfo;
  };
}

interface CampaignPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProceed: () => void;
  selectedTask: CampaignTask | null;
}

const CampaignPreviewDialog = ({
  open,
  onOpenChange,
  onProceed,
  selectedTask,
}: CampaignPreviewDialogProps) => {
  const InfoSection = ({ 
    label, 
    value, 
    icon: Icon 
  }: { 
    label: string; 
    value: string | React.ReactNode; 
    icon?: any;
  }) => (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-slate-500" />}
        <Label className="text-sm font-semibold text-slate-700">{label}</Label>
      </div>
      <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
        <div className="text-sm text-slate-700 whitespace-pre-wrap break-words leading-relaxed">
          {value || <span className="text-slate-400 italic">Not set</span>}
        </div>
      </div>
    </div>
  );

  const ImagePreview = ({ 
    label, 
    url, 
    icon: Icon 
  }: { 
    label: string; 
    url?: string; 
    icon?: any;
  }) => (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-slate-500" />}
        <Label className="text-sm font-semibold text-slate-700">{label}</Label>
      </div>
      <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
        {url ? (
          <img src={url} alt={label} className="max-w-full h-auto rounded" />
        ) : (
          <span className="text-slate-400 italic text-sm">No image</span>
        )}
      </div>
    </div>
  );

  if (!selectedTask) {
    return null;
  }

  const senders = selectedTask.fields?.linkedin_senders || [];
  const sequence = selectedTask.fields?.campaign_sequence || [];
  const additionalInfo = selectedTask.fields?.additional_info || {};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[1000px] p-0 max-h-[90vh] overflow-hidden flex flex-col bg-white">
        <DialogHeader className="px-8 pt-8 pb-6 bg-gradient-to-br from-slate-50 to-white border-b border-slate-200">
          <DialogTitle className="text-xl font-semibold text-slate-900 tracking-tight">
            Campaign Preview
          </DialogTitle>
          <DialogDescription className="text-md text-slate-600 mt-2">
            Review the campaign information before proceeding
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="space-y-8">
            {/* Campaign Name */}
            <InfoSection
              label="Campaign Name"
              value={selectedTask.campaign_name || "Unnamed Campaign"}
              icon={Briefcase}
            />

            {/* LinkedIn Senders */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-slate-500" />
                <Label className="text-sm font-semibold text-slate-700">
                  LinkedIn Senders ({senders.length})
                </Label>
              </div>

              {senders.map((sender, index) => (
                <div key={index} className="p-6 rounded-lg bg-slate-50 border border-slate-200 space-y-4">
                {/* <div className="flex items-center gap-3 pb-4 border-b border-slate-200"> */}
                  <div className="pb-4 border-b border-slate-200">
                    {/* {sender.profile_image_url && (
                      <img 
                        src={sender.profile_image_url} 
                        alt={sender.full_name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    )}
                    <div> */}
                    <h4 className="font-semibold text-slate-900">{sender.full_name}</h4>
                    {sender.headline && (
                      <p className="text-sm text-slate-600 mt-1">{sender.headline}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {sender.company_name && (
                      <div>
                        <div className="flex items-center gap-1 mb-1">
                          <Building2 className="w-3 h-3 text-slate-500" />
                          <span className="text-xs font-medium text-slate-500">Company</span>
                        </div>
                        <p className="text-sm text-slate-700">{sender.company_name}</p>
                      </div>
                    )}

                    {sender.location && (
                      <div>
                        <div className="flex items-center gap-1 mb-1">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          <span className="text-xs font-medium text-slate-500">Location</span>
                        </div>
                        <p className="text-sm text-slate-700">{sender.location}</p>
                      </div>
                    )}
                  </div>

                  {sender.about && (
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <FileText className="w-3 h-3 text-slate-500" />
                        <span className="text-xs font-medium text-slate-500">About</span>
                      </div>
                      <p className="text-sm text-slate-700">{sender.about}</p>
                    </div>
                  )}

                  {sender.work_experiences && sender.work_experiences.length > 0 && (
                    <div>
                      <div className="flex items-center gap-1 mb-2">
                        <Briefcase className="w-3 h-3 text-slate-500" />
                        <span className="text-xs font-medium text-slate-500">Work Experience</span>
                      </div>
                      <div className="space-y-2">
                        {sender.work_experiences.map((exp, expIndex) => (
                          <div key={expIndex} className="pl-4 border-l-2 border-slate-300">
                            <p className="text-sm font-medium text-slate-900">{exp.title}</p>
                            <p className="text-sm text-slate-600">{exp.company_name}</p>
                            <p className="text-xs text-slate-500">
                              {exp.date_range} • {exp.location}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Campaign Sequence */}
            {sequence.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-slate-500" />
                  <Label className="text-sm font-semibold text-slate-700">
                    Campaign Sequence ({sequence.length} steps)
                  </Label>
                </div>

                <div className="space-y-3">
                  {sequence.map((step, index) => (
                    <div key={index} className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Badge className="bg-blue-100 text-blue-800">
                            Step {step.step_number}
                          </Badge>
                          <Badge variant="outline" className="capitalize">
                            {step.step_type.replace('_', ' ')}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-slate-600">
                          <Clock className="w-3 h-3" />
                          <span>{step.delay_days} days</span>
                        </div>
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        {step.message_template}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Information */}
            <div className="space-y-4">
              <Label className="text-sm font-semibold text-slate-700">
                Additional Information
              </Label>

              <div className="grid grid-cols-1 gap-4">
                {additionalInfo.email_address && (
                  <InfoSection
                    label="Email Address"
                    value={additionalInfo.email_address}
                    icon={Mail}
                  />
                )}

                {additionalInfo.calendar_link && (
                  <InfoSection
                    label="Calendar Link"
                    value={additionalInfo.calendar_link}
                    icon={Calendar}
                  />
                )}

                {additionalInfo.company_brochure_link && (
                  <InfoSection
                    label="Company Brochure"
                    value={additionalInfo.company_brochure_link}
                    icon={Link2}
                  />
                )}

                {additionalInfo.company_pitch_deck_link && (
                  <InfoSection
                    label="Pitch Deck"
                    value={additionalInfo.company_pitch_deck_link}
                    icon={Link2}
                  />
                )}

                {additionalInfo.company_product_overview_link && (
                  <InfoSection
                    label="Product Overview"
                    value={additionalInfo.company_product_overview_link}
                    icon={Link2}
                  />
                )}

                {additionalInfo.company_logo_link && (
                  <ImagePreview
                    label="Company Logo"
                    url={additionalInfo.company_logo_link}
                    icon={Image}
                  />
                )}

                {additionalInfo.company_linkedin_banner_link && (
                  <ImagePreview
                    label="LinkedIn Banner"
                    url={additionalInfo.company_linkedin_banner_link}
                    icon={Image}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t bg-gray-50 flex justify-center gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="px-6 w-44 h-10"
          >
            Cancel
          </Button>
          <Button
            onClick={onProceed}
            className="px-8 h-10 w-44 bg-[#4A5BAA] hover:bg-[#3d4c92] text-white"
          >
            Proceed to Link
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignPreviewDialog;