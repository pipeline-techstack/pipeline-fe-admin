import { Loader2 } from "lucide-react";
import React from "react";

const SpinLoader = () => {
  return (
    <Loader2 data-testid="spin-loader" className="mr-2 w-4 h-4 animate-spin" />
  );
};

export default SpinLoader;
