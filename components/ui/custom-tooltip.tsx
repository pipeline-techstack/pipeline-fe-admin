import { Portal } from "@radix-ui/react-tooltip";
import { HelpCircle } from "lucide-react";
import { JSX, ReactNode } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const CustomTooltip = ({
  icon = <HelpCircle className="w-4 h-4 text-gray-400" />,
  tooltip,
  side = "top",
}: {
  icon?: ReactNode;
  tooltip: string;
  side?: "top" | "bottom" | "left" | "right";
}) => {
  const markdownComponents: Components = {
    p: ({ children }: { children?: ReactNode }): JSX.Element => {
      return <p>{children}</p>;
    },
    li: ({ children }: { children?: ReactNode }): JSX.Element => {
      return <li>{children}</li>;
    },
    ul: ({ children }: { children?: ReactNode }): JSX.Element => {
      return <ul className="my-2 pl-6 list-disc">{children}</ul>;
    },
    ol: ({ children }: { children?: ReactNode }): JSX.Element => {
      return <ol className="my-2 pl-6 list-decimal">{children}</ol>;
    },
    h3: ({ children }: { children?: ReactNode }): JSX.Element => {
      return <h2 className="font-semibold text-sm">{children}</h2>;
    },
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild className="cursor-pointer">
          {/* Wrap to force consistent icon size */}
          <span className="inline-flex w-4 h-4 items-center justify-center ml-1">
            {icon}
          </span>
        </TooltipTrigger>
        <Portal>
          <TooltipContent className="z-[9999] bg-white p-2 border" side={side}>
            <p className="w-80 max-w-96 text-gray-500 text-sm text-wrap">
              <ReactMarkdown components={markdownComponents}>
                {tooltip}
              </ReactMarkdown>
            </p>
          </TooltipContent>
        </Portal>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CustomTooltip;
