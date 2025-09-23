"use client";
import { useEffect, useRef } from "react";
import {
  X,
  Mail,
  Calendar,
  User,
  FileText,
  MessageSquare,
  Users,
  Video,
  RotateCcw,
} from "lucide-react";
import LeadAvatar from "./lead-avatar";
import { FeedbackLead, FeedbackStatus } from "../types/feedback";

interface LeadDetailModalProps {
  lead: FeedbackLead | null;
  isOpen: boolean;
  onClose: () => void;
}

const LeadDetailModal = ({ lead, isOpen, onClose }: LeadDetailModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  // Escape key to close
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [isOpen, onClose]);

  if (!isOpen || !lead) return null;

  // Map status for display
  const meetingStatus =
    lead.status === FeedbackStatus.FOLLOW_UP ? "Follow Up" : "Responded";

  const notes = lead.feedback?.feedbackNotes || "No notes available";

  // Helper function to get status badge colors
  const getStatusBadgeStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "happened":
        return "bg-blue-100 text-blue-800";
      case "qualified":
        return "bg-green-100 text-green-800";
      case "responded":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-lg max-w-md w-full mx-4 relative shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-start space-x-3 pr-8">
            <LeadAvatar name={lead.name} avatar={lead.avatar} size="lg" />
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-semibold text-gray-900 mb-1 break-words">
                {lead.name}
              </h3>
              <p className="text-gray-500 flex items-center break-words">
                <span className="mr-2">Client's name: </span>
                {lead.company}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Email */}
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Mail size={16} className="text-blue-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-blue-600 font-medium break-all">
                {lead.email ||
                  `${lead.name.toLowerCase().replace(" ", "")}@${lead.company
                    .toLowerCase()
                    .replace(" ", "")}.com`}
              </p>
            </div>
          </div>

          {/* Meeting Status */}
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Calendar size={16} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium mb-2">
                Meeting Status
              </p>
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeStyle(
                  lead.feedback?.meetingStatus || "unknown"
                )}`}
              >
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                {lead.feedback?.meetingStatus || "Not provided"}
              </div>
            </div>
          </div>

          {/* Prospect Fit */}
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Users size={16} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium mb-2">
                Prospect Fit
              </p>
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeStyle(
                  lead.feedback?.prospectFit || "unknown"
                )}`}
              >
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                {lead.feedback?.prospectFit || "Not provided"}
              </div>
            </div>
          </div>

          {/* Channel */}
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Video size={16} className="text-purple-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-gray-600 font-medium mb-2">Channel</p>
              <p className="text-sm text-gray-900">
                {lead.channel || "Not provided"}
              </p>
            </div>
          </div>

          {/* Reminder Cycle */}
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
              <RotateCcw size={16} className="text-orange-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-gray-600 font-medium mb-2">
                Reminder Cycle
              </p>
              <p className="text-sm text-gray-900">
                {lead.reminderCycle ?? "Not provided"}
              </p>
            </div>
          </div>

          {/* Notes */}
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <FileText size={16} className="text-purple-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-gray-600 font-medium mb-3">Notes</p>
              <div className="relative bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 shadow-sm flex items-start space-x-2">
                <MessageSquare
                  size={20}
                  className="text-gray-400 flex-shrink-0 mt-1"
                />
                <p className="text-sm text-gray-700 leading-relaxed break-all whitespace-pre-wrap">
                  {notes}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetailModal;
