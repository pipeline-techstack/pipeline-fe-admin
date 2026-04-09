"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import StepPageWrapper from "../../_components/step-wrapper";
import PageHeader from "@/components/ui/page-header";
import { Label } from "@/components/ui/label";



export default function DetailsStep(props: any) {
  return (
    <StepPageWrapper
      {...props}
      title="Campaign Details"
      subtitle="Configure the basic campaign settings."
    >
      <div className=" mx-auto space-y-6">

        {/* Form Card */}
        {/* <div className="border rounded-xl p-6 space-y-5 bg-muted/20"> */}
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label className="text-sm">
                Campaign Name <span className="text-red-500">*</span>
              </Label>
              <Input placeholder="e.g. Q1 Outreach Campaign" />
            </div>

            <div className="space-y-2">
              <Label className="text-sm">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input placeholder="e.g. Acme Inc." />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label className="text-sm">
                Campaign Owner <span className="text-red-500">*</span>
              </Label>
              <Input placeholder="e.g. Alex Johnson" />
            </div>

            <div className="space-y-2">
              <Label className="text-sm">
                Calender link
              </Label>
              <Input placeholder="e.g. ABM, Cold Outreach" />
            </div>
          </div>
        </div>
      {/* </div> */}
    </StepPageWrapper>
  );
}