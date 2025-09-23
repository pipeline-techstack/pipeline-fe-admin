"use client";
import LeadAvatar from "./lead-avatar";
import StatusBadge from "./status-badge";
import { FeedbackLead } from "../types/feedback";
import { formatTimeAgo } from "../utils/feedback-utils";

interface FeedbackCardProps {
  lead: FeedbackLead;
  onClick?: (lead: FeedbackLead) => void;
}

const FeedbackCard = ({ lead, onClick }: FeedbackCardProps) => {
  const handleClick = () => {
    onClick?.(lead);
  };

  return (
    <div 
      className="group bg-white hover:shadow-md p-4 border border-gray-200 hover:border-gray-300 rounded-lg transition-all cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex flex-1 items-center space-x-3 min-w-0">
          <LeadAvatar 
            name={lead.name}
            avatar={lead.avatar}
            size="md"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 group-hover:text-blue-800 text-sm truncate transition-colors">
              {lead.name}
            </h3>
            <p className="text-gray-500 text-xs truncate">
              {lead.company}
            </p>
          </div>
        </div>
        <span className="ml-2 text-gray-400 text-xs whitespace-nowrap">
          {formatTimeAgo(lead.updatedAt)}
        </span>
      </div>
      
      <div className="pt-2 flex justify-between items-center">
        <StatusBadge status={lead.status} size="md" className="px-16" />

        {lead.reminderCycle !== undefined && (
          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-200 text-gray-700 text-xs font-medium">
            {lead.reminderCycle}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackCard;