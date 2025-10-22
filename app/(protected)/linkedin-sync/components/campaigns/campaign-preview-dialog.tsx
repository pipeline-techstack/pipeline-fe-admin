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
import { displayValue } from "../../utils/campaign-utils";

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
    campaign_name?: string;
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
        <Label className="font-semibold text-slate-700 text-sm">{label}</Label>
      </div>
      <div className="bg-slate-50 p-4 border border-slate-200 rounded-lg">
        <div className="text-slate-700 text-sm break-words leading-relaxed whitespace-pre-wrap">
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
        <Label className="font-semibold text-slate-700 text-sm">{label}</Label>
      </div>
      <div className="bg-slate-50 p-4 border border-slate-200 rounded-lg">
        {url ? (
          <img src={url} alt={label} className="rounded max-w-full h-auto" />
        ) : (
          <span className="text-slate-400 text-sm italic">No image</span>
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
      <DialogContent className="flex flex-col bg-white p-0 max-w-[1000px] max-h-[90vh] overflow-hidden">
        <DialogHeader className="bg-gradient-to-br from-slate-50 to-white px-8 pt-8 pb-6 border-slate-200 border-b">
          <DialogTitle className="font-semibold text-slate-900 text-xl tracking-tight">
            Campaign Preview
          </DialogTitle>
          <DialogDescription className="mt-2 text-md text-slate-600">
            Review the campaign information before proceeding
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 px-8 py-6 overflow-y-auto">
          <div className="space-y-8">
            {/* Campaign Name */}
            <InfoSection
              label="Campaign Name"
              value={displayValue(selectedTask.fields?.campaign_name || selectedTask.campaign_name || "Unnamed Campaign")}
              icon={Briefcase}
            />

            {/* LinkedIn Senders */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-slate-500" />
                <Label className="font-semibold text-slate-700 text-sm">
                  LinkedIn Senders ({displayValue(senders.length)})
                </Label>
              </div>

              {senders.map((sender, index) => (
                <div key={index} className="space-y-4 bg-slate-50 p-6 border border-slate-200 rounded-lg">
                {/* <div className="flex items-center gap-3 pb-4 border-slate-200 border-b"> */}
                  <div className="pb-4 border-slate-200 border-b">
                    {/* {sender.profile_image_url && (
                      <img 
                        src={sender.profile_image_url} 
                        alt={sender.full_name}
                        className="rounded-full w-16 h-16 object-cover"
                      />
                    )}
                    <div> */}
                    <h4 className="font-semibold text-slate-900">{displayValue(sender.full_name)}</h4>
                    {sender.headline && (
                      <p className="mt-1 text-slate-600 text-sm">{displayValue(sender.headline)}</p>
                    )}
                  </div>

                  <div className="gap-4 grid grid-cols-2">
                    {sender.company_name && (
                      <div>
                        <div className="flex items-center gap-1 mb-1">
                          <Building2 className="w-3 h-3 text-slate-500" />
                          <span className="font-medium text-slate-500 text-xs">Company</span>
                        </div>
                        <p className="text-slate-700 text-sm">{displayValue(sender.company_name)}</p>
                      </div>
                    )}

                    {sender.location && (
                      <div>
                        <div className="flex items-center gap-1 mb-1">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          <span className="font-medium text-slate-500 text-xs">Location</span>
                        </div>
                        <p className="text-slate-700 text-sm">{displayValue(sender.location)}</p>
                      </div>
                    )}
                  </div>

                  {sender.about && (
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <FileText className="w-3 h-3 text-slate-500" />
                        <span className="font-medium text-slate-500 text-xs">About</span>
                      </div>
                      <p className="text-slate-700 text-sm">{displayValue(sender.about)}</p>
                    </div>
                  )}

                  {sender.work_experiences && sender.work_experiences.length > 0 && (
                    <div>
                      <div className="flex items-center gap-1 mb-2">
                        <Briefcase className="w-3 h-3 text-slate-500" />
                        <span className="font-medium text-slate-500 text-xs">Work Experience</span>
                      </div>
                      <div className="space-y-2">
                        {sender.work_experiences.map((exp, expIndex) => (
                          <div key={expIndex} className="pl-4 border-slate-300 border-l-2">
                            <p className="font-medium text-slate-900 text-sm">{displayValue(exp.title)}</p>
                            <p className="text-slate-600 text-sm">{displayValue(exp.company_name)}</p>
                            <p className="text-slate-500 text-xs">
                              {displayValue(exp.date_range)} • {displayValue(exp.location)}
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
                  <Label className="font-semibold text-slate-700 text-sm">
                    Campaign Sequence ({displayValue(sequence.length)} steps)
                  </Label>
                </div>

                <div className="space-y-3">
                  {sequence.map((step, index) => (
                    <div key={index} className="bg-slate-50 p-4 border border-slate-200 rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-3">
                          <Badge className="bg-blue-100 font-semibold text-[#4A5BAA]">
                            Step {displayValue(step.step_number)}
                          </Badge>
                          <Badge variant="outline" className="capitalize">
                            {displayValue(step.step_type.replace('_', ' '))}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 text-slate-600 text-sm">
                          <Clock className="w-3 h-3" />
                          <span>{displayValue(step.delay_days)} days</span>
                        </div>
                      </div>
                      <p className="text-slate-700 text-sm leading-relaxed">
                        {displayValue(step.message_template)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Information */}
            {Object.values(additionalInfo || {}).some(
              (val) => val && String(val).trim() !== ""
            ) && (
              <div className="space-y-4">
                <Label className="font-semibold text-slate-700 text-sm">
                  Additional Information
                </Label>

                <div className="gap-4 grid grid-cols-1">
                  {additionalInfo.email_address && (
                    <InfoSection
                      label="Email Address"
                      value={displayValue(additionalInfo.email_address)}
                      icon={Mail}
                    />
                  )}

                  {additionalInfo.calendar_link && (
                    <InfoSection
                      label="Calendar Link"
                      value={displayValue(additionalInfo.calendar_link)}
                      icon={Calendar}
                    />
                  )}

                  {additionalInfo.company_brochure_link && (
                    <InfoSection
                      label="Company Brochure"
                      value={displayValue(additionalInfo.company_brochure_link)}
                      icon={Link2}
                    />
                  )}

                  {additionalInfo.company_pitch_deck_link && (
                    <InfoSection
                      label="Pitch Deck"
                      value={displayValue(additionalInfo.company_pitch_deck_link)}
                      icon={Link2}
                    />
                  )}

                  {additionalInfo.company_product_overview_link && (
                    <InfoSection
                      label="Product Overview"
                      value={displayValue(additionalInfo.company_product_overview_link)}
                      icon={Link2}
                    />
                  )}

                  {additionalInfo.company_logo_link && (
                    <ImagePreview
                      label="Company Logo"
                      url={displayValue(additionalInfo.company_logo_link)}
                      icon={Image}
                    />
                  )}

                  {additionalInfo.company_linkedin_banner_link && (
                    <ImagePreview
                      label="LinkedIn Banner"
                      url={displayValue(additionalInfo.company_linkedin_banner_link)}
                      icon={Image}
                    />
                  )}
                </div>
              </div>
            )}

          </div>
          
        </div>

        <div className="flex justify-center gap-3 bg-gray-50 px-6 py-4 border-t">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="px-6 w-44 h-10"
          >
            Cancel
          </Button>
          <Button
            onClick={onProceed}
            className="px-8 w-44 h-10"
          >
            Proceed to Link
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignPreviewDialog;