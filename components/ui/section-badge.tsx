"use client";

import React from "react";
import clsx from "clsx";
import { Badge } from "./badge";


type SectionBadgeVariant = "primary" | "secondary";

interface SectionBadgeProps {
  icon?: React.ReactNode;
  text: string;
  variant?: SectionBadgeVariant;
  className?: string;
}

const variantStyles: Record<SectionBadgeVariant, string> = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-gray-100/70 text-gray-600",
};

const SectionBadge: React.FC<SectionBadgeProps> = ({
  icon,
  text,
  variant = "primary",
  className,
}) => {
  return (
    <Badge
      variant="outline"
      className={clsx(
        "inline-flex items-center gap-1 backdrop-blur-md px-4 py-2 border-none rounded-full font-medium uppercase",
        variantStyles[variant],
        className
      )}
      style={{
        WebkitBackdropFilter: "blur(6px)", // Safari support
      }}
    >
      {icon && <span className="size-4">{icon}</span>}
      {text}
    </Badge>
  );
};

export default SectionBadge;
