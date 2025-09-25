"use client";

import { FeedbackStatus } from "../types/feedback";
import clsx from "clsx";

interface StatusBadgeProps {
  status: FeedbackStatus | string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const StatusBadge = ({ status, size = "sm", className }: StatusBadgeProps) => {
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1 text-md",
  };

  const normalizedStatus = status?.toString().toLowerCase();

  const statusStyles: Record<string, string> = {
    // Feedback statuses
    [FeedbackStatus.FOLLOW_UP]: "bg-yellow-100 text-yellow-800 border-yellow-200",
    [FeedbackStatus.RESPONDED]: "bg-green-100 text-green-800 border-green-200",
    // [FeedbackStatus.SENT]: "bg-blue-100 text-blue-800 border-blue-200",
    waiting_feedback: "bg-yellow-100 text-yellow-800 border-yellow-200",
    verified: "bg-green-100 text-green-800 border-green-200",
    
    // Meeting statuses
    happened: "bg-blue-100 text-blue-800 border-blue-200",
    "no-show": "bg-red-100 text-red-800 border-red-200",
    cancelled: "bg-gray-100 text-gray-800 border-gray-200",
    rescheduled: "bg-orange-100 text-orange-800 border-orange-200",
    
    // Prospect fit statuses
    qualified: "bg-green-100 text-green-800 border-green-200",
    "not qualified": "bg-red-100 text-red-800 border-red-200",
    unqualified: "bg-red-100 text-red-800 border-red-200",
    "maybe qualified": "bg-yellow-100 text-yellow-800 border-yellow-200",
    
    // Default
    unknown: "bg-gray-100 text-gray-800 border-gray-200",
  };

  const statusLabels: Record<string, string> = {
    // Feedback statuses
    [FeedbackStatus.FOLLOW_UP]: "Follow-up",
    [FeedbackStatus.RESPONDED]: "Responded",
    // [FeedbackStatus.SENT]: "Sent",
    waiting_feedback: "Waiting Feedback",
    verified: "Verified",
    
    // Meeting statuses
    happened: "Happened",
    "no-show": "No Show",
    cancelled: "Cancelled",
    rescheduled: "Rescheduled",
    
    // Prospect fit statuses
    qualified: "Qualified",
    "not qualified": "Not Qualified",
    unqualified: "Not Qualified",
    "maybe qualified": "Maybe Qualified",
    
    // Default
    unknown: "Unknown",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full font-medium border",
        sizeClasses[size],
        statusStyles[normalizedStatus] || statusStyles.unknown,
        className
      )}
    >
      {statusLabels[normalizedStatus] || statusLabels.unknown}
    </span>
  );
};

export default StatusBadge;