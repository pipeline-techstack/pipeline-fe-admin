"use client";

import PageWrapper from "./page-wrapper";

type SpinLoaderProps = {
  size?: "sm" | "md" | "lg" | "xl";
  fullScreen?: boolean;
};

const sizeMap = {
  sm: "w-6 h-6",
  md: "w-10 h-10",
  lg: "w-14 h-14",
  xl: "w-20 h-20",
};

// 👇 thinner ring (inner circle almost same size)
const innerSizeMap = {
  sm: "w-[85%] h-[85%]",
  md: "w-[88%] h-[88%]",
  lg: "w-[90%] h-[90%]",
  xl: "w-[92%] h-[92%]",
};

const SpinLoader = ({ size = "md", fullScreen = true }: SpinLoaderProps) => {
  const loader = (
    <div
      className={`relative ${sizeMap[size]} rounded-full bg-loader animate-spin`}
    >
      {/* thin inner cut */}
      <div
        className={`absolute inset-0 m-auto ${innerSizeMap[size]} rounded-full bg-background`}
      />
    </div>
  );

  if (!fullScreen) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center">{loader}</div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {loader}
      </div>
    </PageWrapper>
  );
};

export default SpinLoader;
