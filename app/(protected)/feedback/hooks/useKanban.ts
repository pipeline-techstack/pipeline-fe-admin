import { useMemo } from "react";
import { FeedbackItem } from "../types/feedback";

export interface KanbanCategories {
  meetingBooked: FeedbackItem[];
  reminder1: FeedbackItem[];
  reminder2: FeedbackItem[];
  reminder3: FeedbackItem[];
  feedbackReceived: FeedbackItem[];
  feedbackNotReceived: FeedbackItem[];
}

export const useKanban = (data: FeedbackItem[]) => {
  const categorizedData = useMemo(() => {
    const currentTime = new Date();
    
    const categories: KanbanCategories = {
      meetingBooked: [],
      reminder1: [],
      reminder2: [],
      reminder3: [],
      feedbackReceived: [],
      feedbackNotReceived: [],
    };

    data.forEach((item) => {
      const scheduledTime = new Date(item.scheduled_time);
      const timeDiffHours = (currentTime.getTime() - scheduledTime.getTime()) / (1000 * 60 * 60);

      // Meeting booked: current date&time < scheduled date&time && reminder_cycle == 0
      if (currentTime < scheduledTime && item.reminder_cycle === 0) {
        categories.meetingBooked.push(item);
      }
      // Reminder 1: reminder_cycle == 1
      else if (item.reminder_cycle === 1) {
        categories.reminder1.push(item);
      }
      // Reminder 2: reminder_cycle == 2
      else if (item.reminder_cycle === 2) {
        categories.reminder2.push(item);
      }
      // Reminder 3: reminder_cycle == 3 && scheduled_time <= 24hrs
      else if (item.reminder_cycle === 3 && timeDiffHours <= 24) {
        categories.reminder3.push(item);
      }
      // Feedback received/not received: reminder_cycle == 3 && scheduled_time > 24hrs
      else if (item.reminder_cycle === 3 && timeDiffHours > 24) {
        if (item.feedback && item.status === "verified") {
          categories.feedbackReceived.push(item);
        } else {
          categories.feedbackNotReceived.push(item);
        }
      }
      // Handle edge cases - items that don't fit the main categories
      else {
        // If scheduled time has passed but reminder_cycle is still 0
        if (currentTime >= scheduledTime && item.reminder_cycle === 0) {
          categories.reminder1.push(item);
        }
      }
    });

    return categories;
  }, [data]);

  const totalCounts = useMemo(() => {
    return {
      total: data.length,
      meetingBooked: categorizedData.meetingBooked.length,
      reminder1: categorizedData.reminder1.length,
      reminder2: categorizedData.reminder2.length,
      reminder3: categorizedData.reminder3.length,
      feedbackReceived: categorizedData.feedbackReceived.length,
      feedbackNotReceived: categorizedData.feedbackNotReceived.length,
    };
  }, [categorizedData, data.length]);

  const getItemsByStage = (stage: keyof KanbanCategories) => {
    return categorizedData[stage];
  };

  const getStageColor = (stage: keyof KanbanCategories) => {
    const colorMap = {
      meetingBooked: { bg: "bg-blue-50 border-blue-200", header: "bg-blue-100 text-blue-800" },
      reminder1: { bg: "bg-yellow-50 border-yellow-200", header: "bg-yellow-100 text-yellow-800" },
      reminder2: { bg: "bg-orange-50 border-orange-200", header: "bg-orange-100 text-orange-800" },
      reminder3: { bg: "bg-red-50 border-red-200", header: "bg-red-100 text-red-800" },
      feedbackReceived: { bg: "bg-green-50 border-green-200", header: "bg-green-100 text-green-800" },
      feedbackNotReceived: { bg: "bg-gray-50 border-gray-200", header: "bg-gray-100 text-gray-800" },
    };
    return colorMap[stage];
  };

  return {
    categorizedData,
    totalCounts,
    getItemsByStage,
    getStageColor,
  };
};