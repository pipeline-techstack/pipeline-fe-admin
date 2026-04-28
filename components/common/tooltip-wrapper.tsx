import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TooltipWrapperProps {
  content: string;
  children: React.ReactNode;
}

export const TooltipWrapper = ({
  content,
  children,
}: TooltipWrapperProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {/* span ensures tooltip works even if child is disabled */}
          <span className="inline-flex">{children}</span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};