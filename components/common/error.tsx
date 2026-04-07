"use client";

import { AlertCircle } from "lucide-react";

type ErrorStateProps = {
  message?: string;
  fullScreen?: boolean;
};

const ErrorState = ({
  message = "Something went wrong",
  fullScreen = false,
}: ErrorStateProps) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Icon Circle */}
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-red-100">
        <AlertCircle className="w-8 h-8 text-red-600" />
      </div>

      {/* Message */}
      <p className="text-lg text-secondary-foreground">
        {message}
      </p>
    </div>
  );

  if (!fullScreen) return content;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      {content}
    </div>
  );
};

export default ErrorState;