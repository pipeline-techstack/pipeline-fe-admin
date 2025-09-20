"use client";
import FeedbackHeader from "./components/feedback-header";
import FeedbackFilters from "./components/feedback-filters";
import FeedbackGrid from "./components/feedback-grid";
import { useFeedbackFilters, useFeedbackData } from "./hooks/useFeedback";

const FeedbackPage = () => {
  const {
    searchQuery,
    filters,
    handleSearchChange,
    handleFilterChange
  } = useFeedbackFilters();

  const { feedbackData, isLoading } = useFeedbackData(filters, searchQuery);

  return (
    <div className="bg-gray-50 p-6 min-h-screen">
      {/* Header */}
      <FeedbackHeader />

      {/* Filters with Search */}
      <FeedbackFilters
        filters={filters}
        searchQuery={searchQuery}
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
      />

      {/* Feedback Grid */}
      <FeedbackGrid 
        data={feedbackData}
        isLoading={isLoading}
      />

      {/* Footer */}
      <div className="mt-4 text-gray-500 text-sm">
        Total feedback: {feedbackData.length}
      </div>
    </div>
  );
};

export default FeedbackPage;