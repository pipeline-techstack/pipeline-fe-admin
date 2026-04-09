"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, User, Bell } from "lucide-react";
import StepPageWrapper from "../../_components/step-wrapper";
import PageHeader from "@/components/ui/page-header";
import { Label } from "@/components/ui/label";

export default function NotificationStep(props: any) {
  return (
    <StepPageWrapper
      {...props}
      title="Notification Settings"
      subtitle="Set who will receive campaign notifications. Default will be the account owner."
    >

        {/* Form Card */}
        <div className="space-y-5 ">
          {/* Name */}
          <div className="space-y-2">
            <Label className="text-sm flex items-center gap-2">
              Notification Name
            </Label>

            <Input placeholder="e.g. Campaign Alerts - Alex" />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label className="text-sm flex items-center gap-2">
              Notification Email
            </Label>

            <Input placeholder="e.g. alex@company.com" />
          </div>

          {/* Helper text */}
          {/* <p className="text-xs text-muted-foreground">
            Notifications about campaign progress and errors will be sent to this email.
          </p> */}
      </div>
    </StepPageWrapper>
  );
}