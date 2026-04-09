"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Stepper({
  steps,
  currentStep,
}: {
  steps: { label: string }[];
  currentStep: number;
}) {
  return (
    <div className="flex items-center justify-between my-5 border-b pb-8 pt-2">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div key={index} className="flex items-center w-full">
            {/* Circle */}
            <div
              className={cn(
                "w-8 h-8 flex items-center justify-center rounded-full text-xs font-medium",
                isCompleted && "bg-primary text-white",
                isActive && "border-2 border-primary text-primary",
                !isCompleted && !isActive && "bg-gray-200 text-gray-500"
              )}
            >
              {isCompleted ? <Check size={14} /> : index + 1}
            </div>

            {/* Label */}
            <span className="ml-2 text-sm">{step.label}</span>

            {/* Line */}
            {index !== steps.length - 1 && (
              <div className="flex-1 h-[1px] bg-gray-300 mx-4" />
            )}
          </div>
        );
      })}
    </div>
  );
}