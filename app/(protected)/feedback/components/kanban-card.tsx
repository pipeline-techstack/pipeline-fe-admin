"use client";

import { useState } from "react";
import { Calendar, Clock, Mail, Phone } from "lucide-react";
import { FeedbackItem } from "../types/feedback";
import ClientAvatar from "./client-avatar";
import StatusBadge from "./status-badge";
import ClientDetailModal from "./client-detail-modal";

interface KanbanCardProps {
  item: FeedbackItem;
}

const KanbanCard = ({ item }: KanbanCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      time: date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }),
    };
  };

  const { date, time } = formatDateTime(item.scheduled_time);

  const getChannelIcon = (channel?: string) => {
    switch (channel?.toLowerCase()) {
      case "zoom":
        return "🎥";
      case "phone":
        return "📞";
      case "email":
        return "✉️";
      default:
        return "📅";
    }
  };

  return (
    <>
      <div
        className="bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <ClientAvatar name={item.lead_name} size="sm" />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 text-sm truncate">{item.lead_name}</h4>
              <p className="text-xs text-gray-500 truncate">{item.client_name}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{date}</span>
          <Clock className="w-4 h-4 text-gray-400 ml-2" />
          <span className="text-sm text-gray-600">{time}</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm">{getChannelIcon(item.channel)}</span>
            <span className="text-xs text-gray-500 capitalize">{item.channel}</span>
          </div>
          {item.reminder_cycle > 0 && (
            <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
              Reminder {item.reminder_cycle}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <StatusBadge status={item.status} />
          {item.feedback && (
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-green-600">Feedback</span>
            </div>
          )}
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex flex-col space-y-1 text-xs text-gray-500">
            {item.lead_email && (
            <div className="flex items-center space-x-1">
                <Mail className="w-3 h-3" />
                <span>
                <span className="font-medium">{item.lead_name}:</span> {item.lead_email}
                </span>
            </div>
            )}
            {item.lead_phone && (
            <div className="flex items-center space-x-1">
                <Phone className="w-3 h-3" />
                <span>
                <span className="font-medium">{item.lead_name}:</span> {item.lead_phone}
                </span>
            </div>
            )}
        </div>
        </div>

      </div>

      {isModalOpen && <ClientDetailModal item={item} onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default KanbanCard;
