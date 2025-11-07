"use client";

interface LinkedInSyncHeaderProps {
  title?: string;
  subtitle?: string;
}

const LinkedInSyncHeader = ({ 
  title = "LinkedIn Engagement & Campaign Integration",
  subtitle = "Sync and manage LinkedIn connections with your campaigns"
}: LinkedInSyncHeaderProps) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-sm text-gray-600">{subtitle}</p>
    </div>
  );
};

export default LinkedInSyncHeader;