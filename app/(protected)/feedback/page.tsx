"use client";

import { useState } from "react";
import FeedbackHeader from "./components/feedback-header";
import FeedbackFilters from "./components/feedback-filters";
import FeedbackGrid from "./components/feedback-grid";
import { useFeedbackFilters, useFeedbackData } from "./hooks/useFeedback";

const FeedbackPage = () => {
  const { searchQuery, filters, handleSearchChange, handleFilterChange } =
    useFeedbackFilters();

  const [page, setPage] = useState(1);
  const limit = 12;

  const { feedbackData, total, isLoading, error } = useFeedbackData(
    filters,
    searchQuery,
    page,
    limit
  );

  const totalPages = Math.ceil(total / limit);

  const getButtonClasses = (enabled: boolean) =>
    enabled
      ? "w-28 px-4 py-2 rounded-lg bg-[#4A5BAA] text-white hover:bg-[#3b478a] active:bg-[#2d3566] transition"
      : "w-28 px-4 py-2 rounded-lg text-gray-600 bg-gray-100 cursor-not-allowed opacity-50";

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Main content */}
      <div className="flex-grow p-6">
        <FeedbackHeader />
        <FeedbackFilters
          filters={filters}
          searchQuery={searchQuery}
          onFilterChange={handleFilterChange}
          onSearchChange={handleSearchChange}
        />
        <FeedbackGrid data={feedbackData} isLoading={isLoading} />

        {error && (
          <div className="mt-4 text-red-500 text-sm">
            {(error as Error).message}
          </div>
        )}
      </div>

      {/* Fixed footer with pagination */}
      {!error && feedbackData.length > 0 && !isLoading && (
        <div className="bg-white p-3 flex items-center justify-center space-x-4 sticky bottom-0">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className={getButtonClasses(page !== 1)}
          >
            Previous
          </button>

          <span className="text-sm text-gray-700">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className={getButtonClasses(page !== totalPages)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default FeedbackPage;
