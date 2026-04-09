"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link2, Info } from "lucide-react";
import StepPageWrapper from "../../_components/step-wrapper";

export default function HeyreachStep(props: any) {
  return (
    <StepPageWrapper
      {...props}
      title="Link to HeyReach"
      subtitle="Connect this setup flow to an existing HeyReach campaign."
    >
      <div className="mx-auto space-y-6">

        {/* Card */}
        {/* <div className="border rounded-xl p-6 space-y-5 bg-muted/20"> */}
          {/* Input */}
          <div className="space-y-2">
            <label className="text-sm">
              HeyReach Campaign ID
            </label>

            <Input placeholder="e.g. hr_12345" />
          </div>

          {/* Helper Info */}
          <div className="flex items-start gap-2 text-xs text-muted-foreground">
            <Info size={14} className="mt-[2px]" />
            <p>
              Use the exact campaign identifier from your HeyReach workspace to
              ensure proper syncing.
            </p>
          </div>
        </div>
      {/* </div> */}
    </StepPageWrapper>
  );
}