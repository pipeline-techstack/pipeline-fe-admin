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
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 p-4">
      <div
        ref={modalRef}
        className="relative bg-white shadow-2xl mx-4 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="top-4 right-4 z-10 absolute text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="p-6 border-gray-100 border-b">
          <div className="flex items-start space-x-3 pr-8">
            <LeadAvatar name={lead.company} avatar={lead.avatar} size="lg" />
            <div className="flex-1 min-w-0">
              <h3 className="mb-1 font-semibold text-gray-900 text-xl break-words">
                {lead.company}
              </h3>
              <p className="flex items-center text-gray-500 break-words">
                <span className="mr-2">Lead's name: </span>
                {lead.name}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6 p-6">
          {/* Email */}
          <div className="flex items-start space-x-3">
            <div className="flex flex-shrink-0 justify-center items-center bg-blue-100 rounded-full w-8 h-8">
              <Mail size={16} className="text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm break-all">
                {lead.email ?? "Email not provided"}
              </p>
            </div>
          </div>

          {/* Meeting Status */}
          <div className="flex items-start space-x-3">
            <div className="flex flex-shrink-0 justify-center items-center bg-blue-100 rounded-full w-8 h-8">
              <Calendar size={16} className="text-blue-600" />
            </div>
            <div>
              <p className="mb-2 font-medium text-gray-600 text-sm">
                Meeting Status
              </p>
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeStyle(
                  lead.feedback?.meetingStatus || "unknown"
                )}`}
              >
                <div className="bg-blue-500 mr-2 rounded-full w-1.5 h-1.5"></div>
                {lead.feedback?.meetingStatus || "Not provided"}
              </div>
            </div>
          </div>

          {/* Prospect Fit */}
          <div className="flex items-start space-x-3">
            <div className="flex flex-shrink-0 justify-center items-center bg-green-100 rounded-full w-8 h-8">
              <Users size={16} className="text-green-600" />
            </div>
            <div>
              <p className="mb-2 font-medium text-gray-600 text-sm">
                Prospect Fit
              </p>
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeStyle(
                  lead.feedback?.prospectFit || "unknown"
                )}`}
              >
                <div className="bg-green-500 mr-2 rounded-full w-1.5 h-1.5"></div>
                {lead.feedback?.prospectFit || "Not provided"}
              </div>
            </div>
          </div>

          {/* Channel */}
          <div className="flex items-start space-x-3">
            <div className="flex flex-shrink-0 justify-center items-center bg-purple-100 rounded-full w-8 h-8">
              <Video size={16} className="text-purple-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="mb-2 font-medium text-gray-600 text-sm">Channel</p>
              <p className="text-gray-900 text-sm">
                {lead.channel || "Not provided"}
              </p>
            </div>
          </div>

          {/* Reminder Cycle */}
          <div className="flex items-start space-x-3">
            <div className="flex flex-shrink-0 justify-center items-center bg-orange-100 rounded-full w-8 h-8">
              <RotateCcw size={16} className="text-orange-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="mb-2 font-medium text-gray-600 text-sm">
                Reminder Cycle
              </p>
              <p className="text-gray-900 text-sm">
                {lead.reminderCycle ?? "Not provided"}
              </p>
            </div>
          </div>

          {/* Notes */}
          <div className="flex items-start space-x-3">
            <div className="flex flex-shrink-0 justify-center items-center bg-purple-100 rounded-full w-8 h-8">
              <FileText size={16} className="text-purple-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="mb-3 font-medium text-gray-600 text-sm">Notes</p>
              <div className="relative flex items-start space-x-2 bg-gray-50 shadow-sm px-4 py-3 border border-gray-200 rounded-2xl">
                <MessageSquare
                  size={20}
                  className="flex-shrink-0 mt-1 text-gray-400"
                />
                <p className="text-gray-700 text-sm break-all leading-relaxed whitespace-pre-wrap">
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
