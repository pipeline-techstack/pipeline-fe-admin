"use client";

import React from "react";
import clsx from "clsx";

interface SectionHeaderProps {
  text: string;
  highlight?: string;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  text,
  highlight,
  className,
}) => {
  if (!highlight) {
    return (
      <h2
        className={clsx(
          "font-bold text-dark text-3xl sm:text-4xl leading-tight",
          className
        )}
      >
        {text}
      </h2>
    );
  }

  const parts = text.split(highlight);

  return (
    <h2
      className={clsx(
        "font-bold text-gray-900 text-3xl sm:text-4xl leading-tight",
        className
      )}
    >
      {parts[0]}
      <span className="bg-clip-text bg-gradient-to-r from-gray-900 via-gray-900/80 to-gray-900/60 text-transparent">
        {highlight}
      </span>
      {parts[1]}
    </h2>
  );
};

export default SectionHeader;
