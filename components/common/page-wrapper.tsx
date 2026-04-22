"use client";

import React from "react";
import PageHeader from "../ui/page-header";

interface PageWrapperProps {
  title?: string;
  subtitle?: string;

  /** NEW */
  sectionTitle?: string;
  sectionSubtitle?: string;

  rightComponent?: React.ReactNode;
  children: React.ReactNode;
showBadge?: boolean
  onBack?: ()=>void
}

export default function PageWrapper({
  title,
  subtitle,
  sectionTitle,
  sectionSubtitle,
  rightComponent,
  children,
  showBadge,
  onBack
}: PageWrapperProps) {
  return (
    <div className="flex flex-col bg-white shadow-sm border border-gray-200 h-screen">
      <div className="flex flex-col space-y- px-6 py-4 h-screen">
        <div className="flex flex-col gap-2 shrink-0">
          <div className="flex justify-between items-start border-gray-200 border-b w-full shrink-0">
            <PageHeader
              title={title || ""}
              subtitle={subtitle}
              classNameTitle="text-2xl"
              onBack={onBack}
              showBadge={showBadge}
            />
            {rightComponent && (
                <div className="flex items-center gap-2">{rightComponent}</div>
              )}
          </div>
          

          {/* DIVIDER */}
          <div className="" />

          {/* SECOND ROW */}
          {(sectionTitle || sectionSubtitle) && (
            <div className="flex justify-between items-center w-full">
              <div>
                <PageHeader
                  title={sectionTitle || ""}
                  subtitle={sectionSubtitle}
                />
              </div>

            </div>
          )}
        </div>

        {/* CONTENT */}
        <div className="flex flex-col flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
