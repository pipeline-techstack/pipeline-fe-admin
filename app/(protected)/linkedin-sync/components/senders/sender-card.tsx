"use client";

import { Loader2, SquareArrowOutUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LinkedInSenderProfile } from "../../types/sender";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLinkedInSenders } from "../../hooks/useLinkedInSenders";
import { useEffect, useState } from "react";

interface SenderCardProps {
  sender: LinkedInSenderProfile;
  onAction?: (
    senderId: string,
    action: "pause" | "engage",
    newStatus: "active" | "inactive"
  ) => void;
  refetchLinkedinSender: (senderId: string) => Promise<LinkedInSenderProfile | null>;
}

const SenderCard = ({ sender, refetchLinkedinSender }: SenderCardProps) => {
  const [loader, setLoader] = useState(false);

  const handleRefresh = async (id: string) => {
    setLoader(true);
    await refetchLinkedinSender(id);
    setLoader(false);
  };
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-3">
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={sender.avatar} alt={sender.name} />
            <AvatarFallback className="bg-gradient-to-br from-indigo-100 to-indigo-200 font-semibold text-indigo-700">
              {getInitials(sender.name)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900 text-sm">
                {sender.name}
              </h3>

              {sender.profile_url && (
                <Link href={sender.profile_url} target="_blank">
                  <SquareArrowOutUpRight
                    className="w-4 h-4 text-[#4A5BAA]"
                    strokeWidth={2.5}
                  />
                </Link>
              )}
            </div>
            <p className="text-gray-600 text-xs">{sender.headline}</p>
          </div>
        </div>
        <Button
          onClick={() => handleRefresh(sender.id)}
          variant="secondary"
          className="w-full"
          disabled={loader}
        >
          {loader && <Loader2 className="w-6 h-6 animate-spin" />}
          Refetch linkedin profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default SenderCard;
