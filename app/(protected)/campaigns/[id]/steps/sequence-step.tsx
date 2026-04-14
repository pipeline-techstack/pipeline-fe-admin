"use client";

import StepPageWrapper from "../../_components/step-wrapper";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";

const sequenceSteps = [
  { title: "Connection Request", delay: 2, unit: "hours" },
  { title: "Message 1", delay: 1, unit: "days" },
  { title: "Message 2", delay: 1, unit: "days" },
  { title: "Message 3", delay: 2, unit: "days" },
  { title: "Message 4", delay: 2, unit: "days" },
  { title: "Message 5", delay: 3, unit: "days" },
];

export default function SequenceStep(props: any) {
  return (
    <StepPageWrapper
      {...props}
      title="Sequences"
      subtitle="Verify outreach messages for each step."
    >
      <div className=" mx-auto space-y-5">
        {sequenceSteps.map((step, index) => (
          <div
            key={index}
            className="border rounded-xl p-5 space-y-4 hover:shadow-sm transition"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-sm">{step.title}</h3>

              <button className="text-muted-foreground hover:text-destructive">
                <Trash2 size={16} />
              </button>
            </div>

            {/* Textarea */}
            {index != 0 && (
              <Textarea
                disabled
                className={`w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 `}
                rows={3}
                placeholder={
                  index === 0
                  ? "Write your connection request message..."
                  : "Write your follow-up message..."
                }
              />
            )}

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              {/* Character count */}
              {index != 0 && (
              <span>0 characters</span>
              )}
              {/* Cadence Controls */}
              <div className="flex items-center gap-2">
                <span>Delay</span>

                <input
                  type="number"
                  defaultValue={step.delay}
                  className="w-14 border rounded-md px-2 py-1 text-sm"
                />

                <select className="border rounded-md px-2 py-1 text-sm">
                  <option>hours</option>
                  <option>days</option>
                </select>

                <span className="ml-3">Send at</span>

                <input
                  type="time"
                  defaultValue="09:00"
                  className="border rounded-md px-2 py-1 text-sm"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </StepPageWrapper>
  );
}