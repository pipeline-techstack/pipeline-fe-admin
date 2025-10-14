"use client";

import { useState } from "react";
import { Zap, Pause } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LinkedInSenderProfile } from "../../types/sender";

interface SenderCardProps {
  sender: LinkedInSenderProfile;
  onAction?: (senderId: string, action: 'pause' | 'engage', newStatus: 'active' | 'inactive') => void;
}

const SenderCard = ({ sender, onAction }: SenderCardProps) => {
  const [currentStatus, setCurrentStatus] = useState(sender.status);

  const handleAction = () => {
    const action = currentStatus === 'active' ? 'pause' : 'engage';
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    
    setCurrentStatus(newStatus);
    
    if (onAction) {
      onAction(sender.id, action, newStatus);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getStatusBadge = () => {
    if (currentStatus === 'active') {
      return (
        <Badge className="bg-[#4A5BAA] hover:bg-[#3d4c92] text-white">
          Active
        </Badge>
      );
    } else {
      return (
        <Badge variant="secondary" className="bg-gray-100 text-gray-700">
          Inactive
        </Badge>
      );
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={sender.avatar} alt={sender.name} />
            <AvatarFallback className="bg-gradient-to-br from-indigo-100 to-indigo-200 text-indigo-700 font-semibold">
              {getInitials(sender.name)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <h3 className="text-md font-semibold text-gray-900 mb-1">{sender.name}</h3>
            <p className="text-sm text-gray-600">{sender.email}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          {getStatusBadge()}
          <span className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{sender.messages_sent}</span> sent
          </span>
        </div>

        <Button
          onClick={handleAction}
          variant={currentStatus === 'active' ? 'outline' : 'default'}
          className={
            currentStatus === 'active' 
                ? "w-full" 
                : "w-full bg-[#4A5BAA] hover:bg-[#3d4c92] text-white"
            }

        >
          {currentStatus === 'active' ? (
            <>
              <Pause className="w-4 h-4 mr-2" />
              Pause
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 mr-2" />
              Engage
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SenderCard;