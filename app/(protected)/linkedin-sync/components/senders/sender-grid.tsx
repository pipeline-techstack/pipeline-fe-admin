"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import SenderCard from "./sender-card";
import { LinkedInSenderProfile } from "../../types/sender";

interface SenderGridProps {
  senders: LinkedInSenderProfile[];
  onAction?: (senderId: string, action: 'pause' | 'engage') => void;
  isLoading?: boolean;
  refetchLinkedinSender: (senderId: string) => Promise<LinkedInSenderProfile | null>
}

const SenderGrid = ({ senders, onAction, isLoading , refetchLinkedinSender}: SenderGridProps) => {
  if (isLoading) {
    return (
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <Skeleton className="rounded-full w-16 h-16" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="w-32 h-5" />
                  <Skeleton className="w-48 h-4" />
                </div>
              </div>
              <Skeleton className="w-full h-10" />
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
    <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {senders.map((sender) => (
        <SenderCard key={sender.id} sender={sender} onAction={onAction} refetchLinkedinSender={refetchLinkedinSender}/>
      ))}
    </div>
  );
};

export default SenderGrid;