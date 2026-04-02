"use client";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { ChevronLeft, Crown } from "lucide-react";
import { Badge } from "@/app/(protected)/customers/new/_components/Card";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  classNameTitle?: string;
  classNameSub?: string;
  onBack?: () => {};
  showBadge?: boolean;
}

const PageHeader = ({
  title,
  subtitle,
  classNameTitle,
  classNameSub,
  onBack,
  showBadge,
}: PageHeaderProps) => {
  return (
    <div className="flex items-center gap-1 mb-3">
      <div className="flex items-center gap-3 shrink-0">
        {onBack && (
          <Button
            variant={"ghost"}
            size={"sm"}
            onClick={onBack}
            className="flex items-center gap-2"
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
          {showBadge && (
            <Badge
              label="Owner"
              variant="info"
              className="mx-3"
              logo={<Crown className="w-4 h-4" />}
            />
          )}
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
