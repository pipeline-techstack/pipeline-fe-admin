"use client";

import { useState } from "react";
import FeedbackHeader from "./components/feedback-header";
import KanbanBoard from "./components/kanban-board";
import { useFeedbackData } from "./hooks/useFeedback";

const FeedbackPage = () => {
  const { feedbackData, total, isLoading, error } = useFeedbackData();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Main content */}
      <div className="p-6">
        <FeedbackHeader />
        
        {/* Summary stats */}
        {!isLoading && !error && (
          <div className="mb-6 bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Pipeline Overview</h2>
              <div className="text-sm text-gray-600">
                Total Items: <span className="font-medium">{total}</span>
              </div>
            </div>
          </div>
        )}

        <KanbanBoard data={feedbackData} isLoading={isLoading} />

        {error && (
          <div className="mt-4 text-red-500 text-sm bg-red-50 p-4 rounded-lg">
            <strong>Error:</strong> {(error as Error).message}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;