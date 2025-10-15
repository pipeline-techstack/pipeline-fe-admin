"use client";

interface LinkedInSyncHeaderProps {
  title?: string;
  subtitle?: string;
}

const LinkedInSyncHeader = ({ 
  title = "Pipeline AI",
  subtitle = "LinkedIn Engagement & Campaign Integration"
}: LinkedInSyncHeaderProps) => {
  return (
    <div className="flex flex-col mb-6">
      <h1 className="text-xl font-semibold text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-600 text-md">{subtitle}</p>
    </div>
  );
};

export default LinkedInSyncHeader;