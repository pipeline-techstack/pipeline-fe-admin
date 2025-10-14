"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import SenderCard from "./sender-card";
import { LinkedInSenderProfile } from "../../types/sender";

interface SenderGridProps {
  senders: LinkedInSenderProfile[];
  onAction?: (senderId: string, action: 'pause' | 'engage') => void;
  isLoading?: boolean;
}

const SenderGrid = ({ senders, onAction, isLoading }: SenderGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <Skeleton className="w-16 h-16 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (senders.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-gray-600">No LinkedIn senders found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {senders.map((sender) => (
        <SenderCard key={sender.id} sender={sender} onAction={onAction} />
      ))}
    </div>
  );
};

export default SenderGrid;