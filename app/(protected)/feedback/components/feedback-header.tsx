"use client";

interface FeedbackHeaderProps {
  title?: string;
  subtitle?: string;
}

const FeedbackHeader = ({ 
  title = "Customer Feedback",
  subtitle = "Our success is measured by the satisfaction of our clients. Here's what they have to say about working with us."
}: FeedbackHeaderProps) => {
  return (
    <div className="flex flex-col mb-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-600">{subtitle}</p>
    </div>
  );
};

export default FeedbackHeader;