"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/ui/page-header";

interface StepPageWrapperProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  showBadge?: boolean;
  rightComponent?: ReactNode;
  children: ReactNode;

  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  isLastStep?: boolean;
  isFirstStep?: boolean;
  nextLabel?: string;
}

export default function StepPageWrapper({
  title,
  subtitle,
  onBack,
  showBadge,
  rightComponent,
  children,
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  isLastStep,
  isFirstStep,
  nextLabel,
}: StepPageWrapperProps) {
  return (
    <div className="flex flex-col h-[calc(100vh-220px)]">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <PageHeader
          title={title || ""}
          subtitle={subtitle}
          classNameTitle="text-xl"
          onBack={onBack}
          showBadge={showBadge}
        />

        {rightComponent && (
          <div className="flex items-center gap-2">
            {rightComponent}
          </div>
        )}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="bg-white border rounded-xl p-6 h-fit-content">
          {children}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 mt-4 border-t">
        <Button
          variant="outline"
          size="lg"
          onClick={onPrev}
          disabled={isFirstStep}
        >
          Back
        </Button>

        <span className="text-sm text-muted-foreground">
          Step {currentStep + 1} of {totalSteps}
        </span>

        <Button size="lg" onClick={onNext}>
          {isLastStep ? "Mark Campaign as Complete" : nextLabel || "Next"}
        </Button>
      </div>
    </div>
  );
}