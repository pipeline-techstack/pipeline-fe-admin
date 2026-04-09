"use client";

import { useState } from "react";
import PageWrapper from "@/components/common/page-wrapper";
import TemplateStep from "./steps/template-step";
import DetailsStep from "./steps/details-step";
import NotificationStep from "./steps/notification-step";
import SequenceStep from "./steps/sequence-step";
import HeyreachStep from "./steps/heyreach-step";
import Stepper from "./stepper";

const steps = [
  { label: "Template", component: TemplateStep },
  { label: "Details", component: DetailsStep },
  { label: "Notification", component: NotificationStep },
  { label: "Sequence", component: SequenceStep },
  { label: "Connect", component: HeyreachStep },
];

export default function CampaignFlowPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const StepComponent = steps[currentStep].component;

  return (
    <PageWrapper
      title="Complete Campaign"
      subtitle="Fill in the details to complete your campaign setup."
      onBack={()=>{}}
    >
      <Stepper steps={steps} currentStep={currentStep} />
      <StepComponent
      currentStep={currentStep}
      totalSteps={steps.length}
      onNext={() => {
        if (currentStep < steps.length - 1) {
          setCurrentStep((prev) => prev + 1);
        } else {
          console.log("Submit flow");
        }
      }}
      onPrev={() => setCurrentStep((prev) => prev - 1)}
      isFirstStep={currentStep === 0}
      isLastStep={currentStep === steps.length - 1}
    />
    </PageWrapper>
  );
}
