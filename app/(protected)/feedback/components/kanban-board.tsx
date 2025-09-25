"use client";

import { useMemo } from "react";
import KanbanColumn from "./kanban-column";
import { FeedbackItem } from "../types/feedback";

interface KanbanBoardProps {
  data: FeedbackItem[];
  isLoading: boolean;
}

const KanbanBoard = ({ data, isLoading }: KanbanBoardProps) => {
  const categorizedData = useMemo(() => {
    const currentTime = new Date();
    
    const categories = {
      meetingBooked: [] as FeedbackItem[],
      reminder1: [] as FeedbackItem[],
      reminder2: [] as FeedbackItem[],
      reminder3: [] as FeedbackItem[],
      feedbackReceived: [] as FeedbackItem[],
      feedbackNotReceived: [] as FeedbackItem[],
    };

    data.forEach((item) => {
      // Handle items without scheduled_time (like email_info channel)
      if (!item.scheduled_time) {
        if (item.feedback && item.status === "verified") {
          categories.feedbackReceived.push(item);
        } else {
          categories.feedbackNotReceived.push(item);
        }
        return;
      }

      const scheduledTime = new Date(item.scheduled_time);
      const timeDiffHours = (currentTime.getTime() - scheduledTime.getTime()) / (1000 * 60 * 60);

      // Already verified items with feedback go to feedback received regardless of other conditions
      if (item.status === "verified" && item.feedback) {
        categories.feedbackReceived.push(item);
      }
      // Meeting booked:
      else if (currentTime < scheduledTime && item.reminder_cycle === 0 && item.status === "waiting_feedback") {
        categories.meetingBooked.push(item);
      }
      // Reminder 1: 
      else if (item.reminder_cycle === 1 && item.status === "waiting_feedback") {
        categories.reminder1.push(item);
      }
      // Reminder 2: 
      else if (item.reminder_cycle === 2 && item.status === "waiting_feedback") {
        categories.reminder2.push(item);
      }
      // Reminder 3: 
      else if (item.reminder_cycle === 3 && item.status === "waiting_feedback" && timeDiffHours <= 24) {
        categories.reminder3.push(item);
      }
      // Feedback not received: 
      else if (item.reminder_cycle === 3 && item.status === "waiting_feedback" && timeDiffHours > 24) {
        categories.feedbackNotReceived.push(item);
      }
      // Handle edge cases - items that don't fit the above categories
      else if (item.status === "waiting_feedback") {
        // If scheduled time has passed but still waiting feedback and reminder_cycle is 0
        if (currentTime >= scheduledTime && item.reminder_cycle === 0) {
          categories.reminder1.push(item);
        } else {
          // Any other waiting feedback items go to appropriate reminder based on cycle
          switch (item.reminder_cycle) {
            case 0:
              categories.meetingBooked.push(item);
              break;
            case 1:
              categories.reminder1.push(item);
              break;
            case 2:
              categories.reminder2.push(item);
              break;
            case 3:
              categories.reminder3.push(item);
              break;
            default:
              categories.feedbackNotReceived.push(item);
          }
        }
      }
    });

    return categories;
  }, [data]);

  const columns = [
    {
      id: "meeting-booked",
      title: "Meeting Booked",
      items: categorizedData.meetingBooked,
      color: "bg-blue-50 border-blue-200",
      headerColor: "bg-blue-100 text-blue-800",
      count: categorizedData.meetingBooked.length,
    },
    {
      id: "reminder-1",
      title: "Reminder 1",
      items: categorizedData.reminder1,
      color: "bg-yellow-50 border-yellow-200",
      headerColor: "bg-yellow-100 text-yellow-800",
      count: categorizedData.reminder1.length,
    },
    {
      id: "reminder-2", 
      title: "Reminder 2",
      items: categorizedData.reminder2,
      color: "bg-orange-50 border-orange-200",
      headerColor: "bg-orange-100 text-orange-800",
      count: categorizedData.reminder2.length,
    },
    {
      id: "reminder-3",
      title: "Reminder 3", 
      items: categorizedData.reminder3,
      color: "bg-red-50 border-red-200",
      headerColor: "bg-red-100 text-red-800",
      count: categorizedData.reminder3.length,
    },
    {
      id: "feedback-received",
      title: "Feedback Received",
      items: categorizedData.feedbackReceived,
      color: "bg-green-50 border-green-200", 
      headerColor: "bg-green-100 text-green-800",
      count: categorizedData.feedbackReceived.length,
    },
    {
      id: "feedback-not-received",
      title: "Feedback Not Received",
      items: categorizedData.feedbackNotReceived,
      color: "bg-gray-50 border-gray-200",
      headerColor: "bg-gray-100 text-gray-800", 
      count: categorizedData.feedbackNotReceived.length,
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4A5BAA]"></div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="flex gap-6 overflow-x-auto pb-6">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            id={column.id}
            title={column.title}
            items={column.items}
            color={column.color}
            headerColor={column.headerColor}
            count={column.count}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;