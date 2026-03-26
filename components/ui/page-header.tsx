"use client";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { ChevronLeft } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  classNameTitle?: string;
  classNameSub?: string;
  onBack?: () => {};
}

const PageHeader = ({
  title,
  subtitle,
  classNameTitle,
  classNameSub,
  onBack,
}: PageHeaderProps) => {
  return (
    <div className="mb-3 flex gap-1 items-center">
      <div className="flex items-center gap-3 shrink-0">
        {onBack && (
          <Button
            variant={"ghost"}
            size={"sm"}
            onClick={onBack}
            className="flex gap-2 items-center"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
        )}
      </div>
      <div>
        <h1
          className={cn(
            "mb- text-secondary-foreground text-xl",
            classNameTitle,
          )}
        >
          {title}
        </h1>
        {subtitle && (
          <p className={cn("text-muted-foreground text-sm", classNameSub)}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
