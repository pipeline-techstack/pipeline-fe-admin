"use client";

import React from "react";
import PageHeader from "../ui/page-header";

interface PageWrapperProps {
  title: string;
  subtitle?: string;
  rightComponent?: React.ReactNode;
  children: React.ReactNode;
}

export default function PageWrapper({
  title,
  subtitle,
  rightComponent,
  children,
}: PageWrapperProps) {
  return (
    <div className="flex flex-col flex-1 min-h-0 ">
      <div className="p-6 flex flex-col flex-1 min-h-0">

        {/* Main Card Container */}
        <div className="flex flex-col flex-1 min-h-0 bg-white border border-gray-200 rounded-lg shadow-sm p-6 space-y-6">

          {/* Header */}
          <div className="flex justify-between items-start shrink-0">
            <PageHeader title={title} subtitle={subtitle} />

            {rightComponent && (
              <div className="flex items-center gap-2">
                {rightComponent}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 min-h-0">
            {children}
          </div>

        </div>

      </div>
    </div>
  );
}