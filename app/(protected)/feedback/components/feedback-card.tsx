"use client";
import LeadAvatar from "./lead-avatar";
import StatusBadge from "./status-badge";
import { FeedbackLead } from "../types/feedback";

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
      className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md hover:border-gray-300 transition-all cursor-pointer group"
      onClick={handleClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <LeadAvatar 
            name={lead.name}
            avatar={lead.avatar}
            size="md"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-800 transition-colors">
              {lead.name}
            </h3>
            <p className="text-xs text-gray-500 truncate">
              {lead.company}
            </p>
          </div>
        </div>
        <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
          {lead.timestamp}
        </span>
      </div>
      
      <div className="flex items-center justify-between">
        <StatusBadge status={lead.status} />
        {/* {lead.hasFollowUp && (
          <div className="flex items-center">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default FeedbackCard;