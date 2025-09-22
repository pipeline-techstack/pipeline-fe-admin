"use client";
import { FeedbackStatus } from "../types/feedback";

interface StatusBadgeProps {
  status: FeedbackStatus;
  size?: 'sm' | 'md';
}

const StatusBadge = ({ status, size = 'sm' }: StatusBadgeProps) => {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm'
  };

  const statusStyles = {
    [FeedbackStatus.FOLLOW_UP]: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    [FeedbackStatus.RESPONDED]: 'bg-green-100 text-green-800 border-green-200',
    // [FeedbackStatus.SENT]: 'bg-blue-100 text-blue-800 border-blue-200'
  };

  const statusLabels = {
    [FeedbackStatus.FOLLOW_UP]: 'Follow-up',
    [FeedbackStatus.RESPONDED]: 'Responded',
    // [FeedbackStatus.SENT]: 'Sent'
  };

  return (
    <span className={`inline-flex items-center rounded-full font-medium border ${sizeClasses[size]} ${statusStyles[status]}`}>
      {statusLabels[status]}
    </span>
  );
};

export default StatusBadge;