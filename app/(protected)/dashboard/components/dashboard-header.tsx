"use client";

interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
}

const DashboardHeader = ({ 
  title = "Pipeline AI Internal Dashboard",
  subtitle = "Lead Gen Agency Control Tower - Real-time Client and Campaign health monitoring"
}: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col mb-6 text-left">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-600">{subtitle}</p>
    </div>
  );
};

export default DashboardHeader;