import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  className?: string
}

export function MetricCard({
  title,
  value,
  icon,
  className,
}: MetricCardProps) {
  return (
    <Card
      className={cn(
        "bg-white shadow-none border rounded-md",
        className
      )}
    >
      <CardContent className="flex justify-between items-center p-4">
        
        {/* Left side */}
        <div className="flex flex-col">
          <p className="text-foreground text-2xl">
            {value}
          </p>
          <p className="text-muted-foreground text-sm">
            {title}
          </p>
        </div>

        {/* Right icon circle */}
        <div className="flex justify-center items-center bg-primary/10 rounded-md size-10">
          <div className="text-primary">
            {icon}
          </div>
        </div>

      </CardContent>
    </Card>
  )
}