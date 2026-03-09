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
    <div className="flex flex-col flex-1 h-full">
      <div className="p-6 space-y-6">

        {/* Header Section */}
        <div className="flex justify-between items-start">
          <PageHeader
            title={title}
            subtitle={subtitle}
          />

          {rightComponent && (
            <div className="flex items-center gap-2">
              {rightComponent}
            </div>
          )}
        </div>

        {/* Page Content */}
        <div className="flex flex-col flex-1">
          {children}
        </div>

      </div>
    </div>
  );
}