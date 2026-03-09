"use client";

import React from "react";
import SectionBadge from "./section-badge";
import SectionHeader from "./section-header";

interface HeaderOrIntroProps {
  badge?: {
    text: string;
    icon?: React.ReactNode;
  };
  title: {
    text: string;
    highlight?: string;
  };
  subtitle?: React.ReactNode;
  className?: string;
}

const HeaderOrIntro: React.FC<HeaderOrIntroProps> = ({
  badge,
  title,
  subtitle,
  className,
}) => {
  return (
    <div
      className={[
        "flex flex-col items-center justify-center gap-4 text-center mb-10",
        className,
      ].join(" ")}
    >
      {/* Badge */}
      {badge && (
        <SectionBadge
          text={badge.text}
          icon={badge.icon}
        />
      )}

      {/* Header */}
      <SectionHeader
        text={title.text}
        highlight={title.highlight}
      />

      {/* Subtitle / Intro */}
      {subtitle && (
        <p className="max-w-2xl text-text-light text-sm sm:text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default HeaderOrIntro;
