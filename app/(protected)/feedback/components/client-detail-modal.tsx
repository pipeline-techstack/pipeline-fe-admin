"use client";

import { useEffect, useRef } from "react";
import {
  X,
  Mail,
  Calendar,
  Users,
  Video,
  RotateCcw,
  FileText,
  MessageSquare,
} from "lucide-react";
import ClientAvatar from "./client-avatar";
import { FeedbackItem } from "../types/feedback";
import StatusBadge from "./status-badge";

interface ClientDetailModalProps {
  item: FeedbackItem;
  onClose: () => void;
}

const ClientDetailModal = ({ item, onClose }: ClientDetailModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [onClose]);

  if (!item) return null;

  const notes = item.feedback?.feedback_notes || "No notes available";
  const meetingStatus = item.feedback?.meeting_status || "unknown";
  const prospectFit = item.feedback?.prospect_fit || "unknown";

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 p-4" style={{ margin: 0, top: 0, left: 0, right: 0, bottom: 0 }}>
      <div
        ref={modalRef}
        className="relative bg-white shadow-2xl mx-4 rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="top-4 right-4 z-10 absolute text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-6 border-gray-100 border-b">
          <div className="flex items-start space-x-3 pr-8">
            <ClientAvatar name={item.company || item.client_name} avatar={item.avatar} size="lg" />
            <div className="flex-1 min-w-0">
              <h3 className="mb-1 font-semibold text-gray-900 text-xl break-words">
                {item.company || item.client_name}
              </h3>
              <p className="flex items-center text-gray-500 break-words">
                <span className="mr-2">Lead's name: </span>
                {item.lead_name}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6 p-6">
          {/* Email */}
          {item.client_email && (
            <div className="flex items-start space-x-3">
              <div className="flex flex-shrink-0 justify-center items-center bg-blue-100 rounded-full w-8 h-8">
                <Mail size={16} className="text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="mb-1 font-medium text-gray-600 text-sm">Client's email</p>
                <p className="font-medium text-sm break-all">{item.client_email}</p>
              </div>
            </div>
          )}

          {/* Meeting Status */}
          <div className="flex items-start space-x-3">
            <div className="flex flex-shrink-0 justify-center items-center bg-blue-100 rounded-full w-8 h-8">
              <Calendar size={16} className="text-blue-600" />
            </div>
            <div>
              <p className="mb-1 font-medium text-gray-600 text-sm">Meeting Status</p>
              <StatusBadge status={meetingStatus} size="sm" />
            </div>
          </div>

          {/* Prospect Fit */}
          <div className="flex items-start space-x-3">
            <div className="flex flex-shrink-0 justify-center items-center bg-green-100 rounded-full w-8 h-8">
              <Users size={16} className="text-green-600" />
            </div>
            <div>
              <p className="mb-1 font-medium text-gray-600 text-sm">Prospect Fit</p>
              <StatusBadge status={prospectFit} size="sm" />
            </div>
          </div>

          {/* Channel */}
          <div className="flex items-start space-x-3">
            <div className="flex flex-shrink-0 justify-center items-center bg-purple-100 rounded-full w-8 h-8">
              <Video size={16} className="text-purple-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="mb-1 font-medium text-gray-600 text-sm">Channel</p>
              <p className="text-gray-900 text-sm">{item.channel || "Not provided"}</p>
            </div>
          </div>

          {/* Reminder Cycle */}
          <div className="flex items-start space-x-3">
            <div className="flex flex-shrink-0 justify-center items-center bg-orange-100 rounded-full w-8 h-8">
              <RotateCcw size={16} className="text-orange-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="mb-1 font-medium text-gray-600 text-sm">Reminder Cycle</p>
              <p className="text-gray-900 text-sm">{item.reminder_cycle ?? "Not provided"}</p>
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
                <MessageSquare size={20} className="flex-shrink-0 mt-1 text-gray-400" />
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

export default ClientDetailModal;