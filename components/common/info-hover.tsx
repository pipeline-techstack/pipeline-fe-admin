"use client"

import { Info } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface InfoHoverProps {
  content: React.ReactNode
}

export function InfoHover({ content }: InfoHoverProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="text-muted-foreground hover:text-foreground transition">
            <Info className="w-4 h-4" />
          </button>
        </TooltipTrigger>

        <TooltipContent
          side="top"
          className="p-3 rounded-md max-w-[220px] text-sm"
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}