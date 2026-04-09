"use client";


import { Button } from "@/components/ui/button";
import { FileText, Download, UploadCloud } from "lucide-react";
import StepPageWrapper from "../../_components/step-wrapper";

export default function TemplateStep(props: any) {
  return (
    <StepPageWrapper
      {...props}
      title="Template"
      subtitle="Download the lead template, complete it, and upload it back for validation."
    //   rightComponent={<Button variant="outline">Save Draft</Button>}
    >
      <div className="space-y-">
        {/* Download Card */}
        <div className="flex items-center justify-between border rounded-xl p-5 hover:shadow-sm transition">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-md bg-primary/10">
              <FileText className="text-primary" size={18} />
            </div>

            <div>
              <h3 className="text-sm ">Lead Import Template</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Contains column names for dynamic messages in sequence
              </p>
            </div>
          </div>

          <Button variant="outline" size="sm" className="gap-2">
            <Download size={14} />
            Download
          </Button>
        </div>

        {/* Upload Card */}
        {/* <div className="border-2 border-dashed rounded-xl p-6 text-center hover:bg-muted/30 transition cursor-pointer">
          <UploadCloud className="mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm font-medium">Upload completed template</p>
          <p className="text-xs text-muted-foreground">
            Drag & drop or click to upload
          </p>
        </div> */}
      </div>
    </StepPageWrapper>
  );
}