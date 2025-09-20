"use client";
import { useEffect, useRef } from "react";
import { X, Mail, Calendar, User, FileText } from "lucide-react";
import LeadAvatar from "./lead-avatar";
import StatusBadge from "./status-badge";
import { FeedbackLead } from "../types/feedback";

interface LeadDetailModalProps {
  lead: FeedbackLead | null;
  isOpen: boolean;
  onClose: () => void;
}

const LeadDetailModal = ({ lead, isOpen, onClose }: LeadDetailModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !lead) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg max-w-md w-full mx-4 relative shadow-2xl"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-medium text-gray-600 mb-4">Lead Name</h2>
          
          <div className="flex items-start space-x-3">
            <LeadAvatar 
              name={lead.name}
              avatar={lead.avatar}
              size="lg"
            />
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                {lead.name}
              </h3>
              <p className="text-gray-500 flex items-center">
                <span className="mr-2">🏢</span>
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
            <div>
              <p className="text-sm text-blue-600 font-medium">
                {lead.email || `${lead.name.toLowerCase().replace(' ', '')}@${lead.company.toLowerCase().replace(' ', '')}.com`}
              </p>
            </div>
          </div>

          {/* Meeting Status */}
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Calendar size={16} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium mb-2">Meeting Status</p>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                Happened
              </div>
            </div>
          </div>

          {/* Prospect Fit */}
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <User size={16} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium mb-2">Prospect Fit</p>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                Qualified
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <FileText size={16} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium mb-2">Notes</p>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Good Experience
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetailModal;